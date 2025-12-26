import 'dotenv/config';
import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const KNOWLEDGE_PATH = path.join(
  process.cwd(),
  "src/Components/Voice agent/api/RAG",
  "knowledge.json"
);

async function embedKnowledge() {
  const knowledge = JSON.parse(
    fs.readFileSync(KNOWLEDGE_PATH, "utf-8")
  );

  console.log(`Embedding ${knowledge.length} knowledge chunks...`);

  for (let i = 0; i < knowledge.length; i++) {
    const item = knowledge[i];

    if (item.embedding && item.embedding.length > 0) {
      console.log(`Skipping already embedded: ${item.id}`);
      continue;
    }

    try {
      const result = await genAI.getGenerativeModel({
        model: "text-embedding-004"
      }).embedContent(item.text);
      
      item.embedding = result.embedding.values;
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