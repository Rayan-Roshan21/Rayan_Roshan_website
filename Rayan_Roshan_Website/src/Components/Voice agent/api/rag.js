import 'dotenv/config';
import fs from "fs";
import path from "path";
import { cosineSimilarity } from "./utils/cosine.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const KNOWLEDGE_PATH = path.join(
  process.cwd(),
  "src/Components/Voice agent/api/RAG/Embeddings",
  "knowledge.json"
);
const knowledgeBase = JSON.parse(fs.readFileSync(KNOWLEDGE_PATH, "utf-8"));

const MIN_SIMILARITY = 0.15;
const TOP_K = 6;

async function embedQuery(text) {
  const result = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text
  });
  return result.data[0].embedding;
}

export async function retrieveContext(query) {
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