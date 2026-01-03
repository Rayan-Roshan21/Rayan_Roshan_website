/**
 * Privacy-focused rate limiter using anonymous session tokens
 * No IP tracking - uses session-based limits with automatic cleanup
 */

class RateLimiter {
  constructor() {
    // Store: { sessionId: { requests: [], voiceTime: 0, lastActivity: timestamp } }
    this.sessions = new Map();
    
    // Cleanup inactive sessions every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Get or create session data
   */
  getSession(sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        requests: [],
        voiceTime: 0,
        lastActivity: Date.now()
      });
    }
    
    const session = this.sessions.get(sessionId);
    session.lastActivity = Date.now();
    return session;
  }

  /**
   * Check if a request should be rate limited
   */
  checkLimit(sessionId, limits) {
    const session = this.getSession(sessionId);
    const now = Date.now();
    
    // Filter requests within the time window
    session.requests = session.requests.filter(
      timestamp => now - timestamp < limits.window
    );

    // Check request count
    if (session.requests.length >= limits.maxRequests) {
      const oldestRequest = Math.min(...session.requests);
      const retryAfter = Math.ceil((limits.window - (now - oldestRequest)) / 1000);
      return {
        allowed: false,
        reason: `Too many requests. Please wait ${Math.ceil(retryAfter / 60)} minutes.`,
        retryAfter
      };
    }

    // Check voice time limit if applicable
    if (limits.maxVoiceTime && session.voiceTime >= limits.maxVoiceTime) {
      return {
        allowed: false,
        reason: `Voice usage limit reached. Maximum ${Math.floor(limits.maxVoiceTime / 60)} minutes per hour.`,
        retryAfter: 60
      };
    }

    return { allowed: true };
  }

  /**
   * Record a request
   */
  recordRequest(sessionId) {
    const session = this.getSession(sessionId);
    session.requests.push(Date.now());
  }

  /**
   * Record voice usage time in seconds
   */
  recordVoiceTime(sessionId, seconds) {
    const session = this.getSession(sessionId);
    session.voiceTime += seconds;
  }

  /**
   * Cleanup inactive sessions (older than 2 hours)
   */
  cleanup() {
    const now = Date.now();
    const maxInactivity = 2 * 60 * 60 * 1000; // 2 hours
    
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.lastActivity > maxInactivity) {
        this.sessions.delete(sessionId);
      }
    }
    
    console.log(`[RateLimiter] Cleanup: ${this.sessions.size} active sessions`);
  }

  /**
   * Get current usage stats
   */
  getStats(sessionId) {
    const session = this.getSession(sessionId);
    const now = Date.now();
    
    const activeRequests = session.requests.filter(
      timestamp => now - timestamp < 60 * 60 * 1000
    );
    
    return {
      requestCount: activeRequests.length,
      voiceTimeUsed: Math.floor(session.voiceTime)
    };
  }

  /**
   * Reset session limits (for testing or manual reset)
   */
  resetSession(sessionId) {
    if (this.sessions.has(sessionId)) {
      this.sessions.delete(sessionId);
    }
  }
}

// Rate limit configurations
export const RATE_LIMITS = {
  // Chat endpoint: 30 requests per hour, max 500 chars
  CHAT: {
    maxRequests: 30,
    window: 60 * 60 * 1000, // 1 hour
    maxMessageLength: 500
  },
  
  // Voice endpoint: 20 requests per hour + 10 minutes total
  VOICE: {
    maxRequests: 20,
    window: 60 * 60 * 1000, // 1 hour
    maxVoiceTime: 10 * 60, // 10 minutes in seconds
    maxFileSizeBytes: 10 * 1024 * 1024 // 10MB
  },
  
  // TTS endpoint: 40 requests per hour, max 1000 chars
  TTS: {
    maxRequests: 40,
    window: 60 * 60 * 1000, // 1 hour
    maxTextLength: 1000
  }
};

// Singleton instance
const rateLimiter = new RateLimiter();

/**
 * Extract or generate session ID from request
 * Uses a simple cookie-based session without storing personal data
 */
export function getSessionId(req) {
  // Check for session cookie
  const cookies = req.headers.cookie?.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {});
  
  return cookies?.['va_session'] || 'default';
}

/**
 * Generate a random session ID
 */
export function generateSessionId() {
  return `va_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export default rateLimiter;
