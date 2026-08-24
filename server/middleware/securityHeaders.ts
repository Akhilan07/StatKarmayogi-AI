import helmet from 'helmet';
import { RequestHandler } from 'express';

/**
 * Helmet Security Headers Middleware Configuration
 * Applies strict HTTP headers for production security compliance.
 */
export const configureSecurityHeaders = (): RequestHandler => {
  const isProduction = process.env.NODE_ENV === 'production';

  return helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // Required for Vite HMR in development & dynamic charts
          "'unsafe-eval'",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Tailwind & dynamic UI inline styles
          "https://fonts.googleapis.com",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "data:",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://images.unsplash.com",
          "https://igotkarmayogi.gov.in",
        ],
        connectSrc: [
          "'self'",
          "http://localhost:*",
          "ws://localhost:*",
          "wss://localhost:*",
          "https://generativelanguage.googleapis.com",
        ],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: isProduction ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false, // Prevents cross-origin asset blocking (images/fonts)
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    dnsPrefetchControl: { allow: false },
    frameguard: { action: "deny" }, // Protection against clickjacking
    hsts: {
      maxAge: 31536000, // 1 Year HSTS enforcement
      includeSubDomains: true,
      preload: true,
    },
    ieNoOpen: true,
    noSniff: true, // Prevents MIME-type sniffing
    originAgentCluster: true,
    permittedCrossDomainPolicies: { permittedPolicies: "none" },
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    xssFilter: true, // Anti-XSS header
  });
};
