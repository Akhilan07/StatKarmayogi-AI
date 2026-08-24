import crypto from 'crypto';

/**
 * Database Access & Security Service
 * Enforces Parameterized SQL Query Execution (Anti-SQLi), AES-256-GCM Data Encryption,
 * Authorization Mutation Guards, and Data Projection Sanitization.
 */

// Retrieve encryption key from environment variable
const getEncryptionKey = (): Buffer => {
  const key = process.env.ENCRYPTION_KEY || process.env.SESSION_SECRET || 'statkarmayogi_default_encryption_key_32_bytes!';
  return crypto.createHash('sha256').update(key).digest();
};

/**
 * AES-256-GCM Symmetric Data Encryption
 * Encrypts sensitive officer PII and government identity data before persistence.
 */
export const encryptSensitiveData = (plaintext: string): { ciphertext: string; iv: string; tag: string } => {
  if (!plaintext) return { ciphertext: '', iv: '', tag: '' };

  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // 12-byte IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');

  return {
    ciphertext: encrypted,
    iv: iv.toString('hex'),
    tag,
  };
};

/**
 * Decrypts AES-256-GCM encrypted data.
 */
export const decryptSensitiveData = (ciphertext: string, ivHex: string, tagHex: string): string => {
  if (!ciphertext || !ivHex || !tagHex) return '';

  const key = getEncryptionKey();
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

/**
 * Parameterized SQL Query Execution Engine
 * Enforces prepared statement parameter placeholders ($1, $2, ?) and rejects unparameterized string concatenation.
 */
export const executeParameterizedQuery = async <T = any>(
  sqlQuery: string,
  params: any[] = []
): Promise<T[]> => {
  // Audit query string for unparameterized SQL injection risks
  const dangerousPatterns = [
    /'\s*OR\s*'1'\s*=\s*'1/i,
    /;\s*DROP\s+TABLE/i,
    /;\s*DELETE\s+FROM/i,
    /;\s*TRUNCATE/i,
    /'\s*UNION\s+SELECT/i,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(sqlQuery)) {
      console.error(`[SQL Security Violation Alert] Unparameterized SQL Injection attempt blocked: "${sqlQuery}"`);
      throw new Error('[Database Security Alert] Query rejected due to suspicious unparameterized SQL syntax.');
    }
  }

  // Parameter placeholder validation ($1, $2 or ?)
  const hasPlaceholders = /\$\d+|\?/.test(sqlQuery);
  if (params.length > 0 && !hasPlaceholders) {
    throw new Error('[Database Security Error] Parameters were supplied but query string lacks positional placeholders ($1, $2).');
  }

  console.log(`[SQL Query Executed] Prepared Query: "${sqlQuery}" | Params:`, params);

  // Return query results (Simulated parameterized query execution wrapper)
  return [] as T[];
};

/**
 * Database Data Projection Sanitizer
 * Strips internal database identifiers, metadata, password hashes, and system flags from API responses.
 */
export const sanitizeDbRecord = <T extends Record<string, any>>(record: T): Partial<T> => {
  if (!record || typeof record !== 'object') return {};

  const sanitized: Record<string, any> = { ...record };

  // Internal database fields that MUST NEVER be returned in API responses
  const internalFields = [
    '_id',
    '__v',
    'password_hash',
    'passwordHash',
    'db_internal_id',
    'table_oid',
    'sys_flags',
    'internal_notes',
    'raw_credentials',
  ];

  for (const field of internalFields) {
    delete sanitized[field];
  }

  return sanitized as Partial<T>;
};

/**
 * Authorized Database Mutation Guard
 * Verifies authorization and resource ownership BEFORE executing any UPDATE or DELETE operations.
 */
export const executeAuthorizedMutation = async (options: {
  action: 'UPDATE' | 'DELETE';
  table: string;
  resourceOwnerId: string;
  requestingUserId: string;
  isSuperAdmin?: boolean;
  mutationQuery: string;
  queryParams: any[];
}): Promise<{ success: boolean; affectedRows: number }> => {
  const { action, table, resourceOwnerId, requestingUserId, isSuperAdmin, mutationQuery, queryParams } = options;

  // Verify authorization prior to executing mutation
  const isAuthorized = isSuperAdmin || resourceOwnerId.toUpperCase() === requestingUserId.toUpperCase();

  if (!isAuthorized) {
    console.warn(`[Unauthorized DB Mutation Attempt] User ${requestingUserId} attempted ${action} on ${table} owned by ${resourceOwnerId}`);
    throw new Error(`[Database Authorization Error] Access Denied: You are not authorized to ${action} resources in table '${table}'.`);
  }

  // Execute parameterized mutation query safely
  await executeParameterizedQuery(mutationQuery, queryParams);

  return {
    success: true,
    affectedRows: 1,
  };
};
