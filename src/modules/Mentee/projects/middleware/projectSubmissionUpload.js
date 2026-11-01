import multer from "multer";
import path from "node:path";

// ==========================================================
// CONFIGURATION
// ==========================================================

const MAX_FILE_SIZE = 30 * 1024 * 1024;

const BLOCKED_EXTENSIONS = new Set([
  ".exe", ".dll", ".bat", ".cmd", ".com",
  ".msi", ".sh", ".ps1", ".scr", ".jar",
  ".apk", ".app", ".dmg", ".php", ".phtml",
  ".js", ".mjs", ".cjs", ".html", ".htm",
  ".svg", ".vbs", ".psm1",
]);

const MIME_BY_EXTENSION = {
  ".pdf": ["application/pdf"],
  ".doc": ["application/msword"],
  ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ".xls": ["application/vnd.ms-excel"],
  ".xlsx": ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ".ppt": ["application/vnd.ms-powerpoint"],
  ".pptx": ["application/vnd.openxmlformats-officedocument.presentationml.presentation"],

  ".jpg": ["image/jpeg"],
  ".jpeg": ["image/jpeg"],
  ".png": ["image/png"],
  ".webp": ["image/webp"],

  ".zip": ["application/zip", "application/x-zip-compressed"],

  ".txt": ["text/plain"],
  ".csv": ["text/csv", "application/csv", "application/vnd.ms-excel"],

  ".mp3": ["audio/mpeg"],
  ".wav": ["audio/wav", "audio/x-wav"],
  ".ogg": ["audio/ogg"],
  ".m4a": ["audio/mp4"],
  ".aac": ["audio/aac"],

  ".mp4": ["video/mp4"],
  ".webm": ["video/webm"],
  ".mov": ["video/quicktime"],
  ".avi": ["video/x-msvideo"],
  ".mkv": ["video/x-matroska"],
};

const storage = multer.memoryStorage();

// ==========================================================
// FILE SIGNATURE VALIDATION
// ==========================================================

const hasSignature = (buffer, extension) => {
  const hex = buffer.subarray(0, 12).toString("hex");

  switch (extension) {
    case ".pdf":
      return buffer.subarray(0, 5).toString() === "%PDF-";

    case ".jpg":
    case ".jpeg":
      return hex.startsWith("ffd8ff");

    case ".png":
      return hex.startsWith("89504e470d0a1a0a");

    case ".webp":
      return (
        buffer.subarray(0, 4).toString() === "RIFF" &&
        buffer.subarray(8, 12).toString() === "WEBP"
      );

    case ".zip":
    case ".docx":
    case ".xlsx":
    case ".pptx":
      return ["504b0304", "504b0506", "504b0708"].includes(
        buffer.subarray(0, 4).toString("hex")
      );

    case ".doc":
    case ".xls":
    case ".ppt":
      return hex.startsWith("d0cf11e0a1b11ae1");

    case ".mp3":
      return (
        buffer.subarray(0, 3).toString() === "ID3" ||
        (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0)
      );

    case ".wav":
      return (
        buffer.subarray(0, 4).toString() === "RIFF" &&
        buffer.subarray(8, 12).toString() === "WAVE"
      );

    case ".ogg":
      return buffer.subarray(0, 4).toString() === "OggS";

    case ".mp4":
    case ".m4a":
      return buffer.subarray(4, 8).toString() === "ftyp";

    case ".webm":
    case ".mkv":
      return buffer.subarray(0, 4).toString("hex") === "1a45dfa3";

    case ".avi":
      return (
        buffer.subarray(0, 4).toString() === "RIFF" &&
        buffer.subarray(8, 12).toString() === "AVI "
      );

    case ".mov":
      return buffer.subarray(4, 8).toString() === "ftyp";

    case ".txt":
    case ".csv":
      return !buffer.includes(0);

    default:
      // Formats without a reliable simple signature
      // require deeper validation before production.
      return false;
  }
};

// ==========================================================
// FILE FILTER
// ==========================================================

const fileFilter = (_req, file, callback) => {
  const extension = path.extname(file.originalname).toLowerCase();

  if (BLOCKED_EXTENSIONS.has(extension)) {
    return callback(
      new Error("Executable and script files are not allowed."),
      false
    );
  }

  const allowedMimeTypes = MIME_BY_EXTENSION[extension];

  if (
    !allowedMimeTypes ||
    !allowedMimeTypes.includes(file.mimetype)
  ) {
    return callback(
      new Error("Unsupported file type or mismatched MIME type."),
      false
    );
  }

  callback(null, true);
};

// ==========================================================
// MULTER INSTANCE
// ==========================================================

const upload = multer({
  storage,

  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
    fields: 10,
    parts: 12,
  },

  fileFilter,
});

// ==========================================================
// VALIDATED SINGLE FILE UPLOAD
// ==========================================================

const projectSubmissionUpload = {
  single(fieldName) {
    const middleware = upload.single(fieldName);

    return (req, res, next) => {
      middleware(req, res, (error) => {
        if (error) {
          return next(error);
        }

        if (!req.file) {
          return next();
        }

        const extension = path.extname(
          req.file.originalname
        ).toLowerCase();

        if (!hasSignature(req.file.buffer, extension)) {
          return next(
            new Error(
              "File content does not match the selected file type."
            )
          );
        }

        next();
      });
    };
  },
};

export default projectSubmissionUpload;