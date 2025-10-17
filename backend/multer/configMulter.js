const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Check if we're in Vercel serverless environment
const IS_VERCEL = process.env.VERCEL || process.env.NOW_REGION;

// Use /tmp directory in serverless (only temp storage)
const UPLOAD_ROOT = IS_VERCEL
  ? "/tmp/uploads"
  : path.join(__dirname, "..", "..", "public", "uploads");

function ensureDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (error) {
    console.error("Failed to create directory:", error.message);
    // Don't throw error, just log it
  }
}

function storageConfig(subdir = "uploads") {
  const dest = path.join(UPLOAD_ROOT, subdir);

  // Only try to create dir if not in Vercel or if it's /tmp
  if (!IS_VERCEL || dest.startsWith('/tmp')) {
    ensureDir(dest);
  }

  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dest),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path
        .basename(file.originalname, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
      cb(null, `${Date.now()}-${base}${ext}`);
    },
  });
}

function fileFilter(_req, file, cb) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
    "video/x-msvideo",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Unsupported file type"), false);
  }
  cb(null, true);
}

// Optional middleware - allows requests to proceed even without files
function optionalSingleUpload({
  subdir = "uploads",
  fieldName = "file",
  maxSizeMB = 20,
} = {}) {
  const upload = multer({
    storage: storageConfig(subdir),
    fileFilter,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
  }).single(fieldName);

  // Wrap multer to make it non-blocking
  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        // Continue anyway, file upload is optional
        return next();
      } else if (err) {
        console.error("Upload error:", err);
        // Continue anyway
        return next();
      }
      next();
    });
  };
}

module.exports.singleUpload = ({
  subdir = "uploads",
  fieldName = "file",
  maxSizeMB = 20,
} = {}) =>
  IS_VERCEL
    ? optionalSingleUpload({ subdir, fieldName, maxSizeMB })
    : multer({
        storage: storageConfig(subdir),
        fileFilter,
        limits: { fileSize: maxSizeMB * 1024 * 1024 },
      }).single(fieldName);

module.exports.multiUpload = ({
  subdir = "uploads",
  fieldName = "files",
  maxCount = 10,
  maxSizeMB = 20,
} = {}) =>
  multer({
    storage: storageConfig(subdir),
    fileFilter,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
  }).array(fieldName, maxCount);
