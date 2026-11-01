import multer from "multer";
import path from "node:path";

// ==========================================================
// CONFIGURATION
// ==========================================================

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const storage = multer.memoryStorage();

// ==========================================================
// UPLOAD ERROR HANDLER
// ==========================================================

const createUploadError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// ==========================================================
// TEXT VALIDATION
// ==========================================================

const isValidText = (buffer) => {
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(buffer);
    return true;
  } catch {
    return false;
  }
};

// ==========================================================
// ALLOWED FILE TYPES
// ==========================================================

const ALLOWED_TYPES = {
  ".pdf": {
    mimeTypes: ["application/pdf"],
    signatures: [
      (buffer) => buffer.subarray(0, 5).toString() === "%PDF-",
    ],
  },

  ".doc": {
    mimeTypes: ["application/msword"],
    signatures: [
      (buffer) =>
        buffer.subarray(0, 8).toString("hex") ===
        "d0cf11e0a1b11ae1",
    ],
  },

  ".docx": {
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    signatures: [
      (buffer) =>
        buffer.subarray(0, 4).toString("hex") === "504b0304",
    ],
  },

  ".xls": {
    mimeTypes: ["application/vnd.ms-excel"],
    signatures: [
      (buffer) =>
        buffer.subarray(0, 8).toString("hex") ===
        "d0cf11e0a1b11ae1",
    ],
  },

  ".xlsx": {
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    signatures: [
      (buffer) =>
        buffer.subarray(0, 4).toString("hex") === "504b0304",
    ],
  },

  ".ppt": {
    mimeTypes: ["application/vnd.ms-powerpoint"],
    signatures: [
      (buffer) =>
        buffer.subarray(0, 8).toString("hex") ===
        "d0cf11e0a1b11ae1",
    ],
  },

  ".pptx": {
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
    signatures: [
      (buffer) =>
        buffer.subarray(0, 4).toString("hex") === "504b0304",
    ],
  },

  ".jpg": {
    mimeTypes: ["image/jpeg", "image/jpg"],
    signatures: [
      (buffer) =>
        buffer[0] === 0xff &&
        buffer[1] === 0xd8 &&
        buffer[2] === 0xff,
    ],
  },

  ".jpeg": {
    mimeTypes: ["image/jpeg", "image/jpg"],
    signatures: [
      (buffer) =>
        buffer[0] === 0xff &&
        buffer[1] === 0xd8 &&
        buffer[2] === 0xff,
    ],
  },

  ".png": {
    mimeTypes: ["image/png"],
    signatures: [
      (buffer) =>
        buffer.subarray(0, 8).toString("hex") ===
        "89504e470d0a1a0a",
    ],
  },

  ".webp": {
    mimeTypes: ["image/webp"],
    signatures: [
      (buffer) =>
        buffer.subarray(0, 4).toString() === "RIFF" &&
        buffer.subarray(8, 12).toString() === "WEBP",
    ],
  },

  ".txt": {
    mimeTypes: ["text/plain"],
    signatures: [isValidText],
  },

  ".csv": {
    mimeTypes: ["text/csv"],
    signatures: [isValidText],
  },

  ".zip": {
    mimeTypes: [
      "application/zip",
      "application/x-zip-compressed",
    ],
    signatures: [
      (buffer) =>
        [
          "504b0304",
          "504b0506",
          "504b0708",
        ].includes(buffer.subarray(0, 4).toString("hex")),
    ],
  },
};

// ==========================================================
// MIME TYPE FILTER
// ==========================================================

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  const typeConfig = ALLOWED_TYPES[extension];

  if (
    !typeConfig ||
    !typeConfig.mimeTypes.includes(file.mimetype)
  ) {
    return cb(
      createUploadError("Unsupported file type.")
    );
  }

  cb(null, true);
};

// ==========================================================
// FILE SIGNATURE VALIDATION
// ==========================================================

const validateFileSignature = (file) => {
  const extension = path.extname(file.originalname).toLowerCase();

  const typeConfig = ALLOWED_TYPES[extension];

  if (
    !typeConfig ||
    !Buffer.isBuffer(file.buffer) ||
    file.buffer.length === 0
  ) {
    return false;
  }

  if (!typeConfig.mimeTypes.includes(file.mimetype)) {
    return false;
  }

  return typeConfig.signatures.some((check) =>
    check(file.buffer)
  );
};

// ==========================================================
// MULTER CONFIGURATION
// ==========================================================

const upload = multer({
  storage,

  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1,
    fields: 20,
    parts: 25,
  },

  fileFilter,
});

// ==========================================================
// VALIDATED UPLOAD MIDDLEWARE
// ==========================================================

const validatedUpload = {
  // --------------------------------------------------------
  // SINGLE FILE
  // --------------------------------------------------------

  single(fieldName) {
    const middleware = upload.single(fieldName);

    return (req, res, next) => {
      middleware(req, res, (error) => {
        if (error) {
          return next(error);
        }

        if (req.file && !validateFileSignature(req.file)) {
          req.file.buffer = null;
          req.file = undefined;

          return next(
            createUploadError(
              "File content does not match the selected file type."
            )
          );
        }

        next();
      });
    };
  },

  // --------------------------------------------------------
  // MULTIPLE FILES
  // --------------------------------------------------------

  array(fieldName, maxCount) {
    const middleware = upload.array(fieldName, maxCount);

    return (req, res, next) => {
      middleware(req, res, (error) => {
        if (error) {
          return next(error);
        }

        const files = req.files || [];

        const invalidFile = files.some(
          (file) => !validateFileSignature(file)
        );

        if (invalidFile) {
          for (const file of files) {
            file.buffer = null;
          }

          req.files = [];

          return next(
            createUploadError(
              "One or more files have invalid file contents."
            )
          );
        }

        next();
      });
    };
  },
};

export default validatedUpload;