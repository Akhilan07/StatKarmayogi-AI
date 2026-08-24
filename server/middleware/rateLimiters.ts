import rateLimit from 'express-rate-limit';

/**
 * Express Rate Limiters Configuration
 * Prevents Brute-Force, Denial of Service (DoS), and API Quota Exhaustion attacks.
 */

// Rate Limiter for Login & Authentication Routes (Tight restriction)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 5, // Maximum 5 login attempts per IP per 15 minutes
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  message: {
    success: false,
    error: 'Too many login authentication attempts from this IP. Please try again after 15 minutes.',
    retryAfterMinutes: 15,
  },
});

// Rate Limiter for AI Gemini Generation Endpoints
export const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 30, // Maximum 30 AI generations per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'AI assessment generation rate limit exceeded. Please wait a few minutes before submitting new requests.',
    retryAfterMinutes: 15,
  },
});

// Rate Limiter for File Upload & Manual Parsing Routes
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 20, // Maximum 20 document parses per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Manual analysis & file upload limit exceeded. Please try again later.',
    retryAfterMinutes: 15,
  },
});

// General Fallback Rate Limiter for all /api/* routes
export const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 100, // Maximum 100 requests per IP per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many API requests from this client IP address. Please try again later.',
  },
});
