# Rate Limiter

Privacy-focused rate limiting system for Voice Agent APIs.

## Features

- **No IP Tracking**: Uses anonymous session tokens instead of IP addresses
- **Session-Based**: Each browser session gets its own anonymous identifier
- **Automatic Cleanup**: Inactive sessions are removed after 2 hours
- **Multiple Endpoints**: Different limits for chat, voice, and TTS endpoints

## Rate Limits

### Chat Endpoint (`/api/chat`)
- **Requests**: 30 per hour
- **Message Length**: Max 500 characters
- **Purpose**: Prevent text-based abuse and control LLM costs

### Voice Endpoint (`/api/voice`)
- **Requests**: 20 per hour
- **Voice Time**: 10 minutes total per hour
- **File Size**: Max 10MB per file
- **Purpose**: Control Whisper transcription costs and prevent audio abuse

### TTS Endpoint (`/api/tts`)
- **Requests**: 40 per hour
- **Text Length**: Max 1000 characters
- **Purpose**: Control text-to-speech generation costs

## How It Works

1. **Session Creation**: First request generates an anonymous session ID stored in a cookie
2. **Request Tracking**: Each request is logged with timestamp (no personal data)
3. **Limit Checking**: Before processing, checks if session is within limits
4. **Auto Reset**: Limits reset automatically after 1 hour
5. **Cleanup**: Old sessions are automatically removed to prevent memory leaks

## Privacy Guarantees

- No IP addresses stored
- No user identification
- Session IDs are anonymous and temporary
- Sessions auto-expire after 2 hours of inactivity
- No tracking across sessions or devices

## Adjusting Limits

Edit `RATE_LIMITS` in `rateLimiter.js`:

```javascript
export const RATE_LIMITS = {
  CHAT: {
    maxRequests: 30,        // Requests per hour
    window: 60 * 60 * 1000, // Time window (1 hour)
    maxMessageLength: 500    // Max characters
  },
  VOICE: {
    maxRequests: 20,
    window: 60 * 60 * 1000,
    maxVoiceTime: 10 * 60,  // 10 minutes in seconds
    maxFileSizeBytes: 10 * 1024 * 1024
  },
  TTS: {
    maxRequests: 40,
    window: 60 * 60 * 1000,
    maxTextLength: 1000
  }
};
```

## Error Responses

When rate limit is exceeded, API returns:

```json
{
  "error": "Too Many Requests",
  "message": "Too many requests. Please wait X minutes.",
  "retryAfter": 120,
  "stats": {
    "requestCount": 30,
    "voiceTimeUsed": 600
  }
}
```

## Headers

All responses include rate limit headers:

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in window
- `X-Voice-Time-Used`: Voice time used (voice endpoint only)
- `X-Voice-Time-Limit`: Voice time limit (voice endpoint only)
- `Retry-After`: Seconds until retry (when rate limited)

## Testing

To test rate limits:

```bash
# Test chat endpoint
for i in {1..35}; do
  curl -X POST http://localhost:3000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message":"test"}' \
    -c cookies.txt -b cookies.txt
done

# Should return 429 after 30 requests
```

## Cost Protection

The rate limiter helps control API costs:

- **OpenAI Whisper**: ~$0.006 per minute → Max $0.06/hour per session
- **OpenAI GPT-4o-mini**: ~$0.15 per 1M tokens → Controlled by message limits
- **OpenAI TTS**: ~$15 per 1M characters → Max $0.04/hour per session

Total estimated max cost: **~$0.10 per hour per session** with current limits.
