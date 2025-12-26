import formidable from 'formidable';
import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Disable Next.js body parsing for multipart uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ keepExtensions: true });
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

async function speechToText(filePath) {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1',
      language: 'en'
    });
    return transcription.text.trim();
  } catch (error) {
    console.error('STT Error:', error.message);
    throw new Error('Speech-to-text failed');
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.VOICE_AGENT_ENABLED || process.env.VOICE_AGENT_ENABLED !== 'true') {
      return res.status(503).json({ error: 'Voice agent disabled' });
    }

    const { files } = await parseMultipartForm(req);
    const audioFile = files.audio?.[0] || files.audio;

    if (!audioFile) {
      return res.status(400).json({ error: 'No audio provided' });
    }

    const transcript = await speechToText(audioFile.filepath);

    // Cleanup temp file
    try {
      fs.unlinkSync(audioFile.filepath);
    } catch {}

    return res.status(200).json({ text: transcript });
  } catch (error) {
    console.error('Voice API error:', error);
    return res.status(500).json({
      error: 'Speech recognition unavailable',
      details: error.message
    });
  }
}
