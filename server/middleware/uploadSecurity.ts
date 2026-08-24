import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

/**
 * File Upload Security Middleware
 * Restricts file types to JPG, JPEG, PNG, PDF with a 5MB maximum size limit.
 * Generates randomized filenames, validates MIME types & extensions, and blocks Path Traversal attacks.
 */

// Maximum file size limit: 5MB (5 * 1024 * 1024 bytes)
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

// Allowed extensions and corresponding valid MIME types
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf'];
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

// Explicit list of dangerous executable extensions to block
const EXECUTABLE_EXTENSIONS = [
  '.exe', '.sh', '.bat', '.cmd', '.js', '.php', '.py', '.pl',
  '.dll', '.scr', '.vbs', '.msi', '.jar', '.html', '.svg', '.asp', '.aspx',
];

// Ensure secure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Storage engine generating randomized, sanitized filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Prevent Path Traversal by extracting basename and sanitizing extension
    const originalExt = path.extname(file.originalname).toLowerCase();
    const safeExt = ALLOWED_EXTENSIONS.includes(originalExt) ? originalExt : '.bin';

    // Generate cryptographically secure random filename
    const randomName = `sec_doc_${Date.now()}_${crypto.randomBytes(12).toString('hex')}${safeExt}`;
    cb(null, randomName);
  },
});

// Strict File Filter checking extension, MIME type, and executable protection
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Sanitize original filename to prevent Path Traversal injections (e.g. "../../../etc/passwd")
  const sanitizedOriginalName = path.basename(file.originalname).toLowerCase();
  const ext = path.extname(sanitizedOriginalName);

  // 1. Block known executable extensions immediately
  if (EXECUTABLE_EXTENSIONS.includes(ext) || file.mimetype.includes('executable') || file.mimetype.includes('javascript')) {
    console.warn(`[File Upload Security Alert] Blocked attempt to upload executable file: ${sanitizedOriginalName} (${file.mimetype})`);
    return cb(new Error(`Security Error: Executable files (${ext}) are strictly prohibited.`));
  }

  // 2. Validate allowed file extension
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return cb(new Error(`Validation Error: File extension '${ext}' is not permitted. Only JPG, JPEG, PNG, and PDF files are allowed.`));
  }

  // 3. Validate allowed MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype.toLowerCase())) {
    return cb(new Error(`Validation Error: Invalid MIME type '${file.mimetype}'. Allowed types: JPG, JPEG, PNG, PDF.`));
  }

  cb(null, true);
};

// Multer upload middleware instance
export const secureUpload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_BYTES, // 5MB limit
    files: 1, // Allow 1 file per upload request
  },
  fileFilter,
});

/**
 * Upload Error Handling Middleware
 * Intercepts Multer validation/limit errors and returns meaningful HTTP 400 responses.
 */
export const handleUploadErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File Upload Error: File size exceeds the maximum permitted limit of 5MB.',
      });
    }
    return res.status(400).json({
      success: false,
      error: `File Upload Error: ${err.message}`,
    });
  }

  if (err && err.message) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  next(err);
};
