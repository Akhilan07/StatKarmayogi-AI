import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

/**
 * Production-Grade Winston Logger & Monitoring Architecture
 * Features Daily Log Rotation, Secrets Masking (Passwords/API Keys/Tokens),
 * Domain-Specific Telemetry (Auth, AI, Uploads, API Failures), and Multiple Log Levels.
 */

// Ensure logs directory exists
const LOGS_DIR = path.join(process.cwd(), 'logs');
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

// Keys that MUST be sanitized and masked in all log outputs
const SENSITIVE_KEYS = [
  'password',
  'passwordHash',
  'pass',
  'token',
  'secret',
  'session_secret',
  'jwt_secret',
  'authorization',
  'cookie',
  'apiKey',
  'gemini_api_key',
  'encryption_key',
];

/**
 * Winston Custom Format: Sensitive Data Masking Engine
 * Recursively inspects log objects and replaces passwords, tokens, and API keys with [REDACTED_SECRET].
 */
const maskSensitiveData = winston.format((info) => {
  const sanitize = (obj: any): any => {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }

    const cleanObj: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      const lowerKey = key.toLowerCase();
      if (SENSITIVE_KEYS.some((sensitive) => lowerKey.includes(sensitive))) {
        cleanObj[key] = '[REDACTED_SECRET]';
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        cleanObj[key] = sanitize(obj[key]);
      } else {
        cleanObj[key] = obj[key];
      }
    }
    return cleanObj;
  };

  return sanitize(info);
});

// Configure Log Formats
const logFormat = winston.format.combine(
  maskSensitiveData(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  maskSensitiveData(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `[${timestamp}] ${level}: ${message} ${metaStr}`;
  })
);

// Daily Rotating File Transports
const appRotateTransport = new DailyRotateFile({
  filename: path.join(LOGS_DIR, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info',
});

const errorRotateTransport = new DailyRotateFile({
  filename: path.join(LOGS_DIR, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  level: 'error',
});

const securityRotateTransport = new DailyRotateFile({
  filename: path.join(LOGS_DIR, 'security-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '60d',
  level: 'warn',
});

// Create Core Winston Logger Instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: logFormat,
  defaultMeta: { service: 'statkarmayogi-engine' },
  transports: [
    appRotateTransport,
    errorRotateTransport,
    securityRotateTransport,
    new winston.transports.Console({
      format: consoleFormat,
    }),
  ],
});

/**
 * Domain-Specific Logger: Authentication Attempts
 */
export const logAuthAttempt = (details: {
  karmayogiId: string;
  success: boolean;
  ip: string;
  reason?: string;
}) => {
  const level = details.success ? 'info' : 'warn';
  logger.log(level, `[AUTH] Officer authentication ${details.success ? 'SUCCESS' : 'FAILED'} for ${details.karmayogiId}`, {
    category: 'AUTH_AUDIT',
    karmayogiId: details.karmayogiId,
    success: details.success,
    ip: details.ip,
    reason: details.reason || (details.success ? 'Authenticated' : 'Invalid credentials'),
  });
};

/**
 * Domain-Specific Logger: AI Generation Requests
 */
export const logAiRequest = (details: {
  endpoint: string;
  officerRole?: string;
  topic?: string;
  status: 'STARTED' | 'SUCCESS' | 'FAILED';
  durationMs?: number;
  error?: string;
}) => {
  const level = details.status === 'FAILED' ? 'error' : 'info';
  logger.log(level, `[AI_ENGINE] ${details.endpoint} call ${details.status}`, {
    category: 'AI_TELEMETRY',
    endpoint: details.endpoint,
    officerRole: details.officerRole,
    topic: details.topic,
    status: details.status,
    durationMs: details.durationMs,
    error: details.error,
  });
};

/**
 * Domain-Specific Logger: Secure File Uploads
 */
export const logFileUpload = (details: {
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  ip: string;
}) => {
  logger.info(`[FILE_UPLOAD] Secure upload completed: ${details.originalName} -> ${details.filename}`, {
    category: 'UPLOAD_AUDIT',
    filename: details.filename,
    originalName: details.originalName,
    mimeType: details.mimeType,
    sizeBytes: details.sizeBytes,
    ip: details.ip,
  });
};

/**
 * Domain-Specific Logger: API Exceptions & Failures
 */
export const logApiFailure = (req: Request, error: Error, statusCode: number = 500) => {
  logger.error(`[API_FAILURE] ${req.method} ${req.originalUrl} - HTTP ${statusCode}: ${error.message}`, {
    category: 'API_ERROR',
    url: req.originalUrl,
    method: req.method,
    statusCode,
    ip: req.ip,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
};
