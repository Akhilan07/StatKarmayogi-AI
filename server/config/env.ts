import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment Variables Schema & Validation
 * Enforces strict typing and presence of required production configuration keys.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('3000')
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => !Number.isNaN(val) && val > 0, { message: 'PORT must be a positive integer' }),
  GEMINI_API_KEY: z.string().optional(),
  SESSION_SECRET: z.string().default('default_statkarmayogi_dev_secret_2026'),
  JWT_SECRET: z.string().default('statkarmayogi_jwt_secret_key_2026'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000,http://localhost:5173'),
  COOKIE_DOMAIN: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info'),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Environment configuration validation failed:', result.error.format());
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Invalid environment configuration in production.');
    }
  }
  return result.success
    ? result.data
    : {
        NODE_ENV: (process.env.NODE_ENV as any) || 'development',
        PORT: Number.parseInt(process.env.PORT || '3000', 10) || 3000,
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        SESSION_SECRET: process.env.SESSION_SECRET || 'default_statkarmayogi_dev_secret_2026',
        JWT_SECRET: process.env.JWT_SECRET || 'statkarmayogi_jwt_secret_key_2026',
        ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5173',
        COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
        LOG_LEVEL: (process.env.LOG_LEVEL as any) || 'info',
      };
};

export const env = parseEnv();
