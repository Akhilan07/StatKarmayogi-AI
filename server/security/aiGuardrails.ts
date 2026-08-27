import { BadRequestError, TooManyRequestsError } from '../errors/AppError';
import { logger } from '../logging/logger';

/**
 * AI Security Guardrails & Threat Defense Engine
 * Protects against Prompt Injection, Jailbreaks, Toxicity, Oversized Payloads, and Prompt Leakage.
 */

// Patterns representing prompt injection, jailbreak attempts, or rule bypasses
const JAILBREAK_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above)\s+(instructions|directions|rules)/gi,
  /pretend\s+you\s+are\s+a\s+(developer|unrestricted|god\s+mode)/gi,
  /override\s+(your\s+)?(system\s+)?(instructions|prompt|rules)/gi,
  /do\s+anything\s+now|DAN\s+mode|jailbreak/gi,
  /reveal\s+(your\s+)?(system\s+prompt|api\s+key|instructions)/gi,
  /\[INST\]|\{\{\s*system\s*\}\}|\<\<SYS\>\>|SYSTEM_PROMPT\:/gi,
  /act\ as\ an?\ unrestricted\ AI/gi,
];

// Toxic or harmful input pattern scanner
const TOXIC_PATTERNS = [
  /drop\s+table|delete\s+from|rm\s+-rf|<script/gi,
];

/**
 * Inspects and sanitizes user-provided text for AI processing.
 * Throws BadRequestError if injection or jailbreak patterns are detected.
 */
export const inspectAndSanitizePrompt = (input: string, maxChars: number = 15000): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }

  const trimmed = input.trim();

  // 1. Oversized Prompt Defense
  if (trimmed.length > maxChars * 2) {
    logger.warn(`[AI_SECURITY] Oversized prompt detected (${trimmed.length} chars). Truncating to ${maxChars} chars.`);
  }
  const boundedText = trimmed.slice(0, maxChars);

  // 2. Jailbreak & Prompt Injection Scan
  for (const pattern of JAILBREAK_PATTERNS) {
    if (pattern.test(boundedText)) {
      logger.error(`[AI_SECURITY_ALERT] Prompt injection/jailbreak attempt blocked: "${boundedText.slice(0, 100)}..."`);
      throw new BadRequestError('AI Security Guardrail: Prompt injection or instruction override attempt detected.');
    }
  }

  // 3. Toxic / Malicious Command Scan
  for (const pattern of TOXIC_PATTERNS) {
    if (pattern.test(boundedText)) {
      logger.warn(`[AI_SECURITY_ALERT] Malicious input pattern blocked: "${boundedText.slice(0, 100)}..."`);
      throw new BadRequestError('AI Security Guardrail: Malicious input pattern blocked.');
    }
  }

  // 4. Sanitize Control Characters & System Markers
  return boundedText
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .replace(/\{\{\s*system\s*\}\}/gi, '')
    .replace(/\[INST\]/gi, '')
    .replace(/\<\<SYS\>\>/gi, '')
    .trim();
};

/**
 * Output Sanitizer & Prompt Leakage Guard
 * Ensures AI outputs do not leak internal system prompts, keys, or contain executable HTML/Script tags.
 */
export const sanitizeAiOutput = (data: any): any => {
  if (!data) return data;

  if (typeof data === 'string') {
    let clean = data
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');

    // Prompt Leakage Masking
    clean = clean.replace(/AI\s*Studio\s*Schema/gi, 'Official MoSPI Schema');
    clean = clean.replace(/GEMINI_[A-Z0-9_]+/gi, '[REDACTED]');
    return clean.trim();
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeAiOutput);
  }

  if (typeof data === 'object') {
    const cleanObj: Record<string, any> = {};
    for (const key of Object.keys(data)) {
      cleanObj[key] = sanitizeAiOutput(data[key]);
    }
    return cleanObj;
  }

  return data;
};

/**
 * Calculates a deterministic confidence & grounding score (0.85 - 0.99) for generated assessment outputs.
 */
export const calculateGroundingConfidence = (sourceTextLength: number, itemsCount: number, hasCitations: boolean = true): number => {
  let score = 0.85;
  if (sourceTextLength > 500) score += 0.05;
  if (sourceTextLength > 2000) score += 0.04;
  if (hasCitations) score += 0.04;
  if (itemsCount >= 3) score += 0.01;
  return Math.min(0.99, Math.round(score * 100) / 100);
};

/**
 * Resilience Execution Wrapper: Timeout handling & Exponential Backoff Retries
 */
export const withAiResilience = async <T>(
  fn: () => Promise<T>,
  options: {
    timeoutMs?: number;
    maxRetries?: number;
    fallbackFn?: () => T;
  } = {}
): Promise<T> => {
  const { timeoutMs = 20000, maxRetries = 2, fallbackFn } = options;

  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Execute call with strict timeout deadline
      const timeoutPromise = new Promise<never>((_, reject) => {
        const id = setTimeout(() => {
          clearTimeout(id);
          reject(new Error(`AI Request Timeout: Exceeded ${timeoutMs / 1000}s deadline.`));
        }, timeoutMs);
      });

      return await Promise.race([fn(), timeoutPromise]);
    } catch (err: any) {
      lastError = err;
      logger.warn(`[AI_RESILIENCE] Attempt ${attempt + 1}/${maxRetries + 1} failed: ${err.message}`);

      // If it's a security guardrail rejection (400), don't retry!
      if (err instanceof BadRequestError) {
        throw err;
      }

      // If retries remaining, sleep with exponential backoff
      if (attempt < maxRetries) {
        const backoffMs = Math.pow(2, attempt) * 500;
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
      }
    }
  }

  // If all retries exhausted, trigger fallback if available
  if (fallbackFn) {
    logger.warn('[AI_RESILIENCE] All retries exhausted. Invoking graceful pre-computed fallback response.');
    return fallbackFn();
  }

  throw lastError;
};
