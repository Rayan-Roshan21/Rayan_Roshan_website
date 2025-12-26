# Voice Agent Vercel Deployment Guide

## Prerequisites
1. Vercel account connected to your GitHub repository
2. API keys ready:
   - `OPENAI_API_KEY` (for Whisper STT and GPT-4o-mini LLM)
   - `VOICE_AGENT_ENABLED` set to `true`

## Deployment Steps

### 1. Set Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables and add:

```
OPENAI_API_KEY=sk-...your-key...
VOICE_AGENT_ENABLED=true
VITE_VOICE_API_BASE=/api
```

**Important:** Mark all variables as available for Production, Preview, and Development environments.

### 2. Deploy

#### Option A: Deploy via Git Push
```bash
git add .
git commit -m "Add voice agent feature"
git push origin main
```

Vercel will automatically detect the push and deploy.

#### Option B: Deploy via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Verify Deployment

After deployment completes, test the endpoints:

**Health Check:**
```bash
curl https://your-domain.vercel.app/api/health
```

Expected response:
```json
{"status":"ok","enabled":true,"timestamp":"2025-12-25T..."}
```

**Test Voice Agent:**
1. Visit your deployed site
2. Press Alt+Space or click the microphone button
3. Speak a question (e.g., "Tell me about your projects")
4. Verify transcription appears
5. Verify AI response is generated using RAG context

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/voice` - Speech-to-text (Whisper)
- `POST /api/chat` - RAG + LLM response (GPT-4o-mini)

## Architecture

### Frontend (React + Vite)
- **VoiceAgent.jsx**: Voice UI component with MediaRecorder
- Auto-deploys as static files to Vercel CDN

### Backend (Serverless Functions)
- **api/voice.js**: Handles audio upload → Whisper transcription
- **api/chat.js**: Handles message → RAG retrieval → GPT-4o-mini response
- **api/health.js**: Health check endpoint

### Knowledge Base
- **knowledge.json**: 29 embedded chunks about Rayan Roshan
- Embeddings created with OpenAI text-embedding-3-small
- Included in deployment, loaded by chat.js

## Cost Optimization

Current setup uses the cheapest models:
- **Whisper**: ~$0.006 per minute of audio
- **GPT-4o-mini**: ~$0.15 per 1M input tokens, $0.60 per 1M output
- **Embeddings**: ~$0.02 per 1M tokens (only used for queries)

With max_tokens=150 per response, expect ~$0.0001 per conversation turn.

## Troubleshooting

**Issue:** "Voice agent disabled" error
- **Fix:** Ensure `VOICE_AGENT_ENABLED=true` in Vercel environment variables

**Issue:** "OPENAI_API_KEY not found"
- **Fix:** Add `OPENAI_API_KEY` in Vercel project settings

**Issue:** "Failed to load knowledge.json"
- **Fix:** Knowledge base is included in deployment. Check Vercel build logs for errors.

**Issue:** CORS errors
- **Fix:** All API functions include CORS headers. If issues persist, check Vercel function logs.

**Issue:** Timeout errors
- **Fix:** Increased maxDuration to 30s in vercel.json. Check OpenAI API status.

## Monitoring

View function logs in Vercel:
1. Go to your project dashboard
2. Click "Functions" tab
3. Select endpoint to view logs
4. Check for errors or performance issues

## Future Enhancements

- [ ] Add text-to-speech for voice responses
- [ ] Implement conversation persistence (database)
- [ ] Add usage analytics and rate limiting
- [ ] Optimize embedding cache for faster retrieval
- [ ] A/B test different LLM models for cost/quality balance
