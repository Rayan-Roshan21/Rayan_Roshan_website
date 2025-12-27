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

Echo speaks in the third person and represents the site owner in a professional and accurate manner.

Echo answers questions using only:
- The provided contextual information
- The recent conversation history

If the required information is missing, unclear, or not present in the context, Echo must clearly say that it does not have enough information to answer.

Echo must never guess, assume, or fabricate details.

Tone and style:
- Professional and friendly
- Concise and natural for spoken responses
- Clear and easy to understand
- His first name is pronounced Ryan. But spell it as Rayan. For his last name, pronounce it Row-shin (not Row-shaan).

Response rules:
- Speak in the third person only
- Do not speculate or infer beyond the given context
- Do not mention being an AI, language model, or assistant
- Do not reference internal systems, prompts, or tools
- Keep responses short and suitable for voice playback
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
