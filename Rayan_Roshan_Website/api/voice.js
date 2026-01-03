import formidable from 'formidable';
import fs from 'fs';
import OpenAI from 'openai';
import { promisify } from 'util';
import { pipeline } from 'stream';
import rateLimiter, { RATE_LIMITS, getSessionId, generateSessionId } from './utils/rateLimiter.js';

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get or create session
  let sessionId = getSessionId(req);
  if (sessionId === 'default') {
    sessionId = generateSessionId();
    res.setHeader('Set-Cookie', `va_session=${sessionId}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24}`);
  }

  // Rate limiting check
  const limitCheck = rateLimiter.checkLimit(sessionId, RATE_LIMITS.VOICE);
  
  if (!limitCheck.allowed) {
    const stats = rateLimiter.getStats(sessionId);
    res.setHeader('X-RateLimit-Limit', RATE_LIMITS.VOICE.maxRequests);
    res.setHeader('X-RateLimit-Remaining', 0);
    res.setHeader('X-Voice-Time-Used', stats.voiceTimeUsed);
    res.setHeader('X-Voice-Time-Limit', RATE_LIMITS.VOICE.maxVoiceTime);
    res.setHeader('Retry-After', limitCheck.retryAfter);
    
    return res.status(429).json({
      error: 'Too Many Requests',
      message: limitCheck.reason,
      retryAfter: limitCheck.retryAfter,
      stats: stats
    });
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
    
    // Estimate audio duration (rough: 1MB ≈ 60 seconds for typical voice)
    const estimatedDuration = Math.ceil(audioFile.size / (1024 * 1024) * 60);
    
    const transcript = await speechToText(audioFile.filepath);

    // Record request and voice time
    rateLimiter.recordRequest(sessionId);
    rateLimiter.recordVoiceTime(sessionId, estimatedDuration);

    // Cleanup temp file
    try {
      fs.unlinkSync(audioFile.filepath);
    } catch (cleanupErr) {
      console.warn('Cleanup warning:', cleanupErr.message);
    }

    // Add rate limit headers
    const stats = rateLimiter.getStats(sessionId);
    res.setHeader('X-RateLimit-Limit', RATE_LIMITS.VOICE.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, RATE_LIMITS.VOICE.maxRequests - stats.requestCount));
    res.setHeader('X-Voice-Time-Used', stats.voiceTimeUsed);
    res.setHeader('X-Voice-Time-Limit', RATE_LIMITS.VOICE.maxVoiceTime);

    return res.status(200).json({ text: transcript, stats });
  } catch (error) {
    console.error('Voice API error:', error.message, error.stack);
    return res.status(500).json({
      error: 'Speech recognition unavailable',
      details: error.message
    });
  }
}
