import 'dotenv/config';
import fs from "fs";
import path from "path";
import OpenAI from "openai";

// Must match the query embedding model used in api/chat.js — mismatched
// dimensions score NaN in cosine similarity and are silently never retrieved.
const EMBEDDING_MODEL = "text-embedding-3-small";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const KNOWLEDGE_PATH = path.join(process.cwd(), "api", "knowledge.json");

async function embedKnowledge() {
  const knowledge = JSON.parse(
    fs.readFileSync(KNOWLEDGE_PATH, "utf-8")
  );

  const seenIds = new Set();
  for (const item of knowledge) {
    if (seenIds.has(item.id)) {
      console.error(`Duplicate knowledge chunk id: "${item.id}" — retrieval silently favors whichever copy wins similarity, fix before embedding.`);
      process.exit(1);
    }
    seenIds.add(item.id);
  }

  console.log(`Embedding ${knowledge.length} knowledge chunks...`);

  for (let i = 0; i < knowledge.length; i++) {
    const item = knowledge[i];

    if (item.embedding && item.embedding.length > 0) {
      console.log(`Skipping already embedded: ${item.id}`);
      continue;
    }

    try {
      const result = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: item.text
      });

      item.embedding = result.data[0].embedding;
      console.log(`Embedded: ${item.id}`);
    } catch (error) {
      console.error(`Failed embedding ${item.id}:`, error.message);
      process.exit(1);
    }
  }

  fs.writeFileSync(
    KNOWLEDGE_PATH,
    JSON.stringify(knowledge, null, 2)
  );

  console.log("✅ Embedding generation complete.");
}

embedKnowledge();
export { embedKnowledge };
