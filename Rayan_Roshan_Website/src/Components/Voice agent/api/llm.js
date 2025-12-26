import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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

export async function generateResponse({ context, memory, userText }) {
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