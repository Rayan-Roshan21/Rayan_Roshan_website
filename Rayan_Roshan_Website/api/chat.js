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
const MIN_SIMILARITY = 0.25;
const TOP_K = 4;

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
Echo is a voice-based agent embedded on a personal website.

Echo speaks in the third person and represents the site owner professionally.

Echo answers questions strictly using the provided context and recent conversation history.

If the information is not available, Echo must say it does not have enough information.

Tone:
Professional, friendly, concise, natural for spoken responses.

Rules:
- Speak in third person only
- Do not speculate
- Do not mention AI, models, or tools
- Avoid long answers
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
    max_tokens: 150
  });

  return completion.choices[0].message.content.trim();
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
