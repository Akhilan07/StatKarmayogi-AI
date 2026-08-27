import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";

// Centralized Environment Config & Error Handling
import { env } from "./server/config/env";
import { centralizedErrorHandler } from "./server/middleware/errorHandler";
import { NotFoundError } from "./server/errors/AppError";

// Modular Production Security & Middleware Stack
import { requestIdMiddleware } from "./server/middleware/requestId";
import { httpLoggerMiddleware } from "./server/middleware/httpLogger";
import { enforceHttps } from "./server/middleware/httpsRedirect";
import { configureSecurityHeaders } from "./server/middleware/securityHeaders";
import { configureCors } from "./server/middleware/corsConfig";
import { configureCompression } from "./server/middleware/compressionConfig";
import { generalApiLimiter } from "./server/middleware/rateLimiters";
import { sanitizeResponseProjection, authorizeDatabaseMutation } from "./server/middleware/dbSecurity";

// Master API v1 Router
import v1Router from "./server/routes/v1Router";
import { logger } from "./server/logging/logger";

const app = express();
const PORT = env.PORT;

// 1. Request ID Middleware (Attaches unique X-Request-ID header & correlation ID)
app.use(requestIdMiddleware);

// 2. HTTP Telemetry & Access Access Logger
app.use(httpLoggerMiddleware);

// 3. Force HTTPS in production environments
app.use(enforceHttps);

// 4. Helmet HTTP Security Headers (CSP, HSTS, Anti-XSS, Frameguard, NoSniff)
app.use(configureSecurityHeaders());

// 5. CORS Origin restriction middleware
app.use(configureCors());

// 6. Response Payload Compression (Gzip / Deflate for fast JSON & asset delivery)
app.use(configureCompression());

// 7. Secure Cookie Parser
app.use(cookieParser(env.SESSION_SECRET));

// 8. Body Parser with 10MB payload limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 9. Global Rate Limiting on API endpoints
app.use("/api", generalApiLimiter);

// 10. Database Response Projection Sanitizer & Mutation Guard
app.use("/api", sanitizeResponseProjection);
app.use("/api", authorizeDatabaseMutation);

// 11. Mount API Routes with API Versioning (/api/v1/* and legacy /api/* backward compatibility)
app.use("/api/v1", v1Router);
app.use("/api", v1Router); // Alias for seamless frontend compatibility without modifying frontend code

// 12. Catch undefined API routes with 404 NotFoundError before SPA routing
app.use("/api/*", (req, res, next) => {
  next(new NotFoundError(`API endpoint '${req.originalUrl}' does not exist on this server.`));
});

// 13. Centralized Error Handler (Handles AppErrors, validation, status codes, and sanitizes stack traces)
app.use(centralizedErrorHandler);

// 14. Server Bootstrap & Vite SPA Integration
async function startServer() {
  if (env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`🚀 Production-Quality Backend initialized & running on port ${PORT}`, {
      environment: env.NODE_ENV,
      port: PORT,
      version: "v1.0.0",
    });
  });
}

startServer();
