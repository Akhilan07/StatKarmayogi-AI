import cors, { CorsOptions } from 'cors';
import { RequestHandler } from 'express';

/**
 * CORS Origin Security Middleware Configuration
 * Restricts API access strictly to production frontend domain and local development origins.
 */
export const configureCors = (): RequestHandler => {
  // Parse allowed origins from environment variable or fallback to defaults
  const rawOrigins = process.env.ALLOWED_ORIGINS || '';
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ];

  const allowedOrigins = Array.from(
    new Set([
      ...defaultOrigins,
      ...rawOrigins.split(',').map((o) => o.trim()).filter(Boolean),
    ])
  );

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server, same-origin SPA requests)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }

      console.warn(`[CORS Security Alert] Blocked request from unauthorized origin: ${origin}`);
      return callback(new Error(`CORS policy violation: Origin '${origin}' is not permitted.`));
    },
    credentials: true, // Allow HttpOnly security cookies across allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    exposedHeaders: ['Set-Cookie'],
    maxAge: 86400, // Preflight caching for 24 hours (86400s)
  };

  return cors(corsOptions);
};
