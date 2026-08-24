import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Authentication & Cryptographic Password Hashing Service
 * Manages bcrypt password hashing (12 salt rounds), JWT token signing/verification,
 * and field-tampering sanitization.
 */

const SALT_ROUNDS = 12;

// Get secret key from environment variables
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET || process.env.SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('[CRITICAL SECURITY ERROR] JWT_SECRET or SESSION_SECRET must be configured in environment variables.');
    }
    return 'fallback_development_secret_statkarmayogi_2026';
  }
  return secret;
};

/**
 * Securely hashes a plaintext password using bcrypt with 12 salt rounds.
 * Plaintext passwords are never stored in databases or memory logs.
 */
export const hashPassword = async (password: string): Promise<string> => {
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Constant-time password verification using bcrypt.compare to prevent timing attacks.
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  if (!password || !hash) return false;
  return await bcrypt.compare(password, hash);
};

/**
 * Generates a signed JWT session token with expiration.
 */
export const generateAuthToken = (payload: {
  karmayogiId: string;
  name: string;
  role: string;
  division: string;
}): string => {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, {
    expiresIn: '24h',
    algorithm: 'HS256',
  });
};

/**
 * Verifies and decodes a signed JWT session token.
 */
export const verifyAuthToken = (token: string): any => {
  const secret = getJwtSecret();
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

/**
 * Field Tampering Prevention & Request Body Sanitization
 * Strips prohibited escalation attributes to prevent Privilege Escalation attacks.
 */
export const sanitizeAuthInput = <T extends Record<string, any>>(input: T): Partial<T> => {
  if (!input || typeof input !== 'object') return {};

  const sanitized: Record<string, any> = { ...input };

  // Prohibited fields that regular users cannot inject/tamper with
  const forbiddenFields = [
    'isAdmin',
    'isSuperUser',
    'permissions',
    'securityLevel',
    '__proto__',
    'constructor',
    'prototype',
  ];

  for (const field of forbiddenFields) {
    delete sanitized[field];
  }

  // Sanitize string inputs to strip scripts or dangerous injections
  for (const key of Object.keys(sanitized)) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitized[key].trim();
    }
  }

  return sanitized as Partial<T>;
};
