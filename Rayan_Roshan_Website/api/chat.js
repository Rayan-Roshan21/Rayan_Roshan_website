import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import rateLimiter, { RATE_LIMITS, getSessionId, generateSessionId } from './utils/rateLimiter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Loaded once per cold start rather than per request — it was previously
// re-read and re-parsed (2.5MB) on every single chat message.
const knowledgePath = path.join(__dirname, 'knowledge.json');
const knowledgeBase = JSON.parse(fs.readFileSync(knowledgePath, 'utf-8'));

// Cosine similarity calculation
function cosineSimilarity(a, b) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// RAG retrieval
const MIN_SIMILARITY = 0.15;
const TOP_K = 6;

async function embedQuery(text) {
  const result = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });
  return result.data[0].embedding;
}

async function retrieveContext(query, knowledgeBase) {
  const queryEmbedding = await embedQuery(query);

  const scored = knowledgeBase.map(chunk => ({
    text: chunk.text,
    score: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));

  const filtered = scored
    .filter(item => item.score >= MIN_SIMILARITY)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K);

  if (filtered.length === 0) {
    return "";
  }

  return filtered.map(c => `- ${c.text}`).join("\n");
}

// LLM response generation
const SYSTEM_PROMPT = `
Echo is the voice agent on Rayan Roshan's personal website.

Echo speaks in third person and represents Rayan.

GROUNDING — this is the most important rule:
- Answer only from the provided context. Never infer, extrapolate, or fill gaps.
- If the context does not cover the question, say so briefly and pivot to the
  closest thing you do know: "That's not something I have on hand, but Rayan
  did build X, which is related."
- Echo must never fabricate details, numbers, technologies, or accomplishments.
- Prefer specifics over adjectives. Name the technology, the number, the outcome.

CRITICAL: Keep responses concise and snappy - aim for 3-4 sentences max. No rambling!

Tone and style:
- Confident and specific. Let the work speak for itself rather than talking it up.
- Informative but conversational - avoid dry, corporate language
- Natural for spoken responses
- His first name: Rayan (pronounced exactly like the common name 'Ryan'). His last name: Roshan (pronounced Row-shin).

Response rules:
- Speak in third person only
- Use specifics from context: technology names, numbers, outcomes
- Do not mention being an AI, language model, or assistant
- Do not reference internal systems, prompts, or tools
- Keep responses conversational and complete
`.trim();

async function generateResponse({ context, memory, userText }) {
  const memoryText = memory
    .slice(-5)
    .map(m => `${m.role === "user" ? "User" : "Echo"}: ${m.content}`)
    .join("\n");

  const userPrompt = `
Context:
${context || "No relevant context available."}

Conversation History:
${memoryText || "No prior conversation."}

User Question:
${userText}
`.trim();

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 100  // Balanced for complete, snappy responses that fit in conversation
  });

  return completion.choices[0].message.content.trim();
}

// OPTIMIZATION #4: Quick responses for simple greetings (skip RAG)
function getQuickResponse(message) {
  const lowerMsg = message.toLowerCase().trim();

  if (/^(hi|hello|hey|yo|sup|wassup)[\s!?.,]*$/i.test(lowerMsg)) {
    return "Hi there! Echo is here to help you learn about Rayan. What would you like to know?";
  }
  if (/^(thanks|thank you|thx)[\s!?.,]*$/i.test(lowerMsg)) {
    return "You're welcome! Feel free to ask anything else about Rayan.";
  }
  if (/^(bye|goodbye|see you|later)[\s!?.,]*$/i.test(lowerMsg)) {
    return "Goodbye! Come back anytime you want to learn more about Rayan.";
  }

  return null; // Not a simple greeting, use full RAG
}

export default async function handler(req, res) {
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
  const limitCheck = rateLimiter.checkLimit(sessionId, RATE_LIMITS.CHAT);

  if (!limitCheck.allowed) {
    const stats = rateLimiter.getStats(sessionId);
    res.setHeader('X-RateLimit-Limit', RATE_LIMITS.CHAT.maxRequests);
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
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Message length validation
    if (message.length > RATE_LIMITS.CHAT.maxMessageLength) {
      return res.status(400).json({
        error: 'Message too long',
        message: `Maximum message length is ${RATE_LIMITS.CHAT.maxMessageLength} characters. Your message is ${message.length} characters.`
      });
    }

    // Record request
    rateLimiter.recordRequest(sessionId);

    // OPTIMIZATION #4: Check for simple greetings first (skip RAG)
    const quickResponse = getQuickResponse(message);
    if (quickResponse) {
      console.log('Quick response (no RAG):', message);
      return res.status(200).json({ response: quickResponse });
    }

    // Retrieve context from RAG
    const context = await retrieveContext(message, knowledgeBase);

    // Prepare conversation memory
    const memory = (history || []).map(h => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: h.text || h.content || h.message
    }));

    // Generate response using LLM
    const response = await generateResponse({
      context,
      memory,
      userText: message
    });

    // Add rate limit headers
    const stats = rateLimiter.getStats(sessionId);
    res.setHeader('X-RateLimit-Limit', RATE_LIMITS.CHAT.maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, RATE_LIMITS.CHAT.maxRequests - stats.requestCount));

    return res.status(200).json({ response, stats });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'Failed to generate response',
      details: error.message
    });
  }
}
