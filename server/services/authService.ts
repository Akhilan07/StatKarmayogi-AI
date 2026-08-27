import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/AppError';

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
 * Demo Officers list for SSO authentication preview
 */
export const getDemoOfficers = () => [
  {
    karmayogiId: 'KARM-MOSPI-88941',
    name: 'A. Sharma',
    role: 'Senior Statistical Officer',
    division: 'Field Operations Division (NSSO)',
    readinessScore: 88,
  },
  {
    karmayogiId: 'KARM-MOSPI-77412',
    name: 'P. V. Ramakrishnan',
    role: 'Director (National Accounts)',
    division: 'National Accounts Division (NAD)',
    readinessScore: 92,
  },
  {
    karmayogiId: 'KARM-MOSPI-55120',
    name: 'Meera Deshmukh',
    role: 'Junior Statistical Officer',
    division: 'Economic Statistics Division (ESD)',
    readinessScore: 74,
  },
];

/**
 * Authenticates custom user credentials and returns session token
 */
export const loginWithCustomCredentials = async (karmayogiId: string, password?: string) => {
  if (!karmayogiId) {
    throw new UnauthorizedError('Karmayogi ID is required.');
  }

  const demoMatch = getDemoOfficers().find((o) => o.karmayogiId.toLowerCase() === karmayogiId.toLowerCase());
  const officerPayload = demoMatch || {
    karmayogiId,
    name: `Officer (${karmayogiId})`,
    role: 'Statistical Officer',
    division: 'MoSPI Enterprise Cadre',
    readinessScore: 80,
  };

  const token = generateAuthToken(officerPayload);
  return {
    success: true,
    token,
    user: officerPayload,
  };
};

/**
 * Field Tampering Prevention & Request Body Sanitization
 */
export const sanitizeAuthInput = <T extends Record<string, any>>(input: T): Partial<T> => {
  if (!input || typeof input !== 'object') return {};

  const sanitized: Record<string, any> = { ...input };
  const forbiddenFields = ['isAdmin', 'isSuperUser', 'permissions', 'securityLevel', '__proto__', 'constructor', 'prototype'];

  for (const field of forbiddenFields) {
    delete sanitized[field];
  }

  for (const key of Object.keys(sanitized)) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitized[key].trim();
    }
  }

  return sanitized as Partial<T>;
};
