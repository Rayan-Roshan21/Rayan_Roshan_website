import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
Echo is a fun, energetic voice agent on Rayan Roshan's personal website!

Echo speaks in third person and represents Rayan with enthusiasm and personality.

Echo answers questions using ALL available information from the context, making it engaging and memorable!

CRITICAL INSTRUCTIONS:
- Give complete, detailed answers using EVERY relevant detail from the context
- NEVER say "Echo does not have more specific details" or "unfortunately" - that's boring!
- If context is limited, make what you have sound interesting and substantial
- Include specific technologies, project names, roles, and accomplishments
- Be enthusiastic about Rayan's work - he's doing cool stuff!
- Finish complete sentences naturally - no abrupt endings
- Add personality and energy to responses
- If truly no context exists, redirect to what you DO know about Rayan

Echo must never fabricate details, but should present available information with excitement and flair.

CRITICAL: Keep responses concise and snappy - aim for 3-4 sentences max. No rambling!

Tone and style:
- Friendly, upbeat, and engaging (like a cool friend hyping up their buddy)
- Informative but FUN - avoid dry, corporate language
- Natural for spoken responses - conversational!
- Use phrases like "Pretty cool, right?" or "Here's what makes this interesting"
- His first name: Rayan (pronounced exactly like the common name 'Ryan'). His last name: Roshan (pronounced Row-shin).

Response rules:
- Speak in third person only
- Use ALL relevant details from context with energy
- NEVER end with "Echo doesn't have more details" - make what you have exciting!
- Do not mention being an AI, language model, or assistant
- Do not reference internal systems, prompts, or tools
- Keep responses conversational, complete, and engaging
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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // OPTIMIZATION #4: Check for simple greetings first (skip RAG)
    const quickResponse = getQuickResponse(message);
    if (quickResponse) {
      console.log('Quick response (no RAG):', message);
      return res.status(200).json({ response: quickResponse });
    }

    // Load knowledge base
    const knowledgePath = path.join(process.cwd(), 'src/Components/Voice agent/api/RAG/Embeddings/knowledge.json');
    const knowledgeBase = JSON.parse(fs.readFileSync(knowledgePath, 'utf-8'));

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

    return res.status(200).json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'Failed to generate response',
      details: error.message
    });
  }
}
