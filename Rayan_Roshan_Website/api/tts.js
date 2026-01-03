import OpenAI from 'openai';
import rateLimiter, { RATE_LIMITS, getSessionId, generateSessionId } from './utils/rateLimiter.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  console.log('TTS endpoint called:', req.method);
  
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
  const limitCheck = rateLimiter.checkLimit(sessionId, RATE_LIMITS.TTS);
  
  if (!limitCheck.allowed) {
    const stats = rateLimiter.getStats(sessionId);
    res.setHeader('X-RateLimit-Limit', RATE_LIMITS.TTS.maxRequests);
    res.setHeader('X-RateLimit-Remaining', 0);
    res.setHeader('Retry-After', limitCheck.retryAfter);
    
    return res.status(429).json({
      error: 'Too Many Requests',
      message: limitCheck.reason,
      retryAfter: limitCheck.retryAfter,
      stats: stats
    });
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

    // Text length validation
    if (text.length > RATE_LIMITS.TTS.maxTextLength) {
      return res.status(400).json({ 
        error: 'Text too long',
        message: `Maximum text length is ${RATE_LIMITS.TTS.maxTextLength} characters. Your text is ${text.length} characters.`
      });
    }

    // Record request
    rateLimiter.recordRequest(sessionId);

    console.log('Generating speech for text:', text.substring(0, 50) + '...');

    // Use tts-1 (cheaper, faster) with shimmer voice (warm, expressive)
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'shimmer',
      input: text,
      speed: 1.0
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    
    // Add rate limit headers
    const stats = rateLimiter.getStats(sessionId);
    res.setHeader('X-RateLimit-Limit', RATE_LIMITS.TTS.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, RATE_LIMITS.TTS.maxRequests - stats.requestCount));
    
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
