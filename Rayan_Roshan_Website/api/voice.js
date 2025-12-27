import formidable from 'formidable';
import fs from 'fs';
import OpenAI from 'openai';
import { promisify } from 'util';
import { pipeline } from 'stream';

const streamPipeline = promisify(pipeline);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Vercel serverless config
export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseMultipartForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable({ 
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });
    
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Formidable parse error:', err);
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
}

async function speechToText(filePath) {
  try {
    console.log('Starting STT for file:', filePath);
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1',
      language: 'en'
    });
    console.log('STT successful:', transcription.text);
    return transcription.text.trim();
  } catch (error) {
    console.error('STT Error:', error.message, error.response?.data);
    throw new Error('Speech-to-text failed: ' + error.message);
  }
}

export default async function handler(req, res) {
  console.log('Voice endpoint called:', req.method);
  
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
    // Check environment variables
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not set');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    if (!process.env.VOICE_AGENT_ENABLED || process.env.VOICE_AGENT_ENABLED !== 'true') {
      console.log('Voice agent disabled');
      return res.status(503).json({ error: 'Voice agent disabled' });
    }

    const { files } = await parseMultipartForm(req);
    console.log('Files received:', Object.keys(files));
    
    const audioFile = files.audio?.[0] || files.audio;

    if (!audioFile) {
      console.error('No audio file in request');
      return res.status(400).json({ error: 'No audio provided' });
    }

    console.log('Processing audio:', audioFile.originalFilename, audioFile.size, 'bytes');
    const transcript = await speechToText(audioFile.filepath);

    // Cleanup temp file
    try {
      fs.unlinkSync(audioFile.filepath);
    } catch (cleanupErr) {
      console.warn('Cleanup warning:', cleanupErr.message);
    }

    return res.status(200).json({ text: transcript });
  } catch (error) {
    console.error('Voice API error:', error.message, error.stack);
    return res.status(500).json({
      error: 'Speech recognition unavailable',
      details: error.message
    });
  }
}
