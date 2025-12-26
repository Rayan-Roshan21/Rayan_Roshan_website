# Voice Agent Deployment Guide

## Local Development

### Prerequisites
- Node.js >= 18.0.0
- Valid OpenAI API key

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   VOICE_AGENT_ENABLED=true
   VITE_VOICE_API_BASE=/api
   ```

3. Run both services:
   ```bash
   # Terminal 1: Backend (for local dev/testing)
   npm run voice:dev

   # Terminal 2: Frontend
   npm run dev
   ```

4. Test the voice agent:
   - Open http://localhost:5173
   - Click the mic button (bottom-right) or press Alt+Space
   - Speak, then stop; transcription appears in the panel

## Vercel Deployment

### Initial Setup
1. Push your code to GitHub/GitLab/Bitbucket

2. Import project in Vercel Dashboard

3. Configure environment variables in Vercel project settings:
   - `OPENAI_API_KEY` = your OpenAI key
   - `VOICE_AGENT_ENABLED` = `true`

4. Deploy! Vercel will:
   - Build the Vite frontend
   - Deploy serverless functions from `api/` directory
   - Route `/api/*` requests to the functions

### Environment Variables
- **OPENAI_API_KEY** (required): Your OpenAI API key for Whisper STT
- **VOICE_AGENT_ENABLED** (required): Set to `true` to enable the voice endpoint
- **VITE_VOICE_API_BASE** (optional): API base URL; defaults to `/api`

### Vercel Secrets (CLI)
```bash
vercel env add OPENAI_API_KEY
# Paste your key when prompted

vercel env add VOICE_AGENT_ENABLED
# Enter: true
```

### Testing Production
After deployment:
1. Visit your-site.vercel.app/api/health
   - Should return: `{"status":"ok","enabled":true}`
2. Use the voice agent UI normally

## Architecture

### Serverless Functions
- **api/voice.js**: Main voice endpoint; handles audio upload and transcription
- **api/health.js**: Health check endpoint for monitoring

### Security Notes
- Never commit `.env` with real secrets
- Use Vercel environment variables for production
- OpenAI API key is server-side only; not exposed to client
- CORS is enabled for frontend access

### Troubleshooting

**"Voice agent disabled" error:**
- Ensure `VOICE_AGENT_ENABLED=true` in Vercel environment variables
- Redeploy after adding env vars

**"Failed to fetch" in UI:**
- Check DevTools Network tab for request details
- Verify `/api/voice` returns proper status
- Ensure no CORS or mixed-content issues

**Transcription fails:**
- Verify OpenAI API key is valid and has credits
- Check Vercel function logs for detailed errors
- Ensure audio format is supported (webm/opus)

## API Reference

### POST /api/voice
Upload audio and get transcription.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: `audio` field with audio/webm file

**Response:**
```json
{
  "text": "Transcribed text here"
}
```

**Errors:**
- 400: No audio provided
- 503: Voice agent disabled
- 500: Transcription failed

### GET /api/health
Check service status.

**Response:**
```json
{
  "status": "ok",
  "enabled": true,
  "timestamp": "2025-12-25T..."
}
```
