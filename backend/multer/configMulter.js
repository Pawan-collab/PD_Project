const path = require("path");
const fs = require("fs");
const multer = require("multer");

const UPLOAD_ROOT = path.join(__dirname, "..", "..", "public", "uploads");

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function storageConfig(subdir = "uploads") {
  const dest = path.join(UPLOAD_ROOT, subdir);
  ensureDir(dest);
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

module.exports.singleUpload = ({
  subdir = "uploads",
  fieldName = "file",
  maxSizeMB = 20,
} = {}) =>
  multer({
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
