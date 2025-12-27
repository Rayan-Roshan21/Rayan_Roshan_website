import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  console.log('TTS endpoint called:', req.method);
  
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
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not set');
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log('Generating speech for text:', text.substring(0, 50) + '...');

    // Use tts-1 (cheaper, faster) with shimmer voice (warm, expressive)
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'shimmer',
      input: text,
      speed: 1.0
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length);
    return res.status(200).send(buffer);
  } catch (error) {
    console.error('TTS API error:', error.message);
    return res.status(500).json({
      error: 'Text-to-speech unavailable',
      details: error.message
    });
  }
}
