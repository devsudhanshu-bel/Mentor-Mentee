import fs from "node:fs";
import path from "node:path";

import filesService from "./files.service.js";
import ApiError from "../../utils/ApiError.js";

// ==========================================================
// ALLOWED MIME TYPES
// ==========================================================

const MIME_TYPES = {
  ".pdf": "application/pdf",

  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",

  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  ".xls": "application/vnd.ms-excel",
  ".xlsx":
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  ".txt": "text/plain",
  ".csv": "text/csv",
  ".zip": "application/zip",
};

// ==========================================================
// INLINE FILE TYPES
// ==========================================================

const INLINE_EXTENSIONS = new Set([
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);

// ==========================================================
// FILENAME SANITIZATION
// ==========================================================

const sanitizeFilename = (filename) => {
  return String(filename || "document")
    .replace(/[\r\n"\\/:*?<>|]/g, "_")
    .replace(/[^\x20-\x7E]/g, "_")
    .trim()
    .slice(0, 150) || "document";
};

// ==========================================================
// DOWNLOAD FILENAME
// ==========================================================

const getDownloadFilename = (documentName, filePath) => {
  const extension = path.extname(filePath).toLowerCase();

  let filename = sanitizeFilename(documentName);

  if (!path.extname(filename)) {
    filename += extension;
  }

  return filename;
};

// ==========================================================
// PRIVATE FILE DELIVERY
// ==========================================================

const getPrivateFile = async (req, res, next) => {
  try {
    // ------------------------------------------------------
    // VALIDATE ACCESS TOKEN
    // ------------------------------------------------------

    const token = req.query.token;

    if (
      !token ||
      typeof token !== "string" ||
      token.length > 4096
    ) {
      throw new ApiError(400, "Invalid or missing file access token");
    }

    // ------------------------------------------------------
    // FETCH AUTHORIZED FILE
    // ------------------------------------------------------

    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    const file = await filesService.getPrivateFile(
      req.user,
      token
    );

    if (!file?.filePath) {
      throw new ApiError(404, "File not found");
    }

    // ------------------------------------------------------
    // VALIDATE FILE EXTENSION
    // ------------------------------------------------------

    const extension = path.extname(file.filePath).toLowerCase();

    const contentType = MIME_TYPES[extension];

    if (!contentType) {
      throw new ApiError(415, "Unsupported file type");
    }

    // ------------------------------------------------------
    // PREPARE RESPONSE HEADERS
    // ------------------------------------------------------

    const filename = getDownloadFilename(
      file.documentName,
      file.filePath
    );

    const disposition = INLINE_EXTENSIONS.has(extension)
      ? "inline"
      : "attachment";

    res.setHeader("Content-Type", contentType);

    res.setHeader(
      "Content-Disposition",
      `${disposition}; filename="${filename}"`
    );

    res.setHeader("X-Content-Type-Options", "nosniff");

    res.setHeader(
      "Cache-Control",
      "private, no-store, max-age=0"
    );

    res.setHeader("Pragma", "no-cache");

    res.setHeader("Referrer-Policy", "no-referrer");

    // ------------------------------------------------------
    // STREAM FILE
    // ------------------------------------------------------

    const stream = fs.createReadStream(file.filePath);

    stream.on("error", (error) => {
      if (res.headersSent) {
        res.destroy(error);
        return;
      }

      if (error.code === "ENOENT") {
        return next(new ApiError(404, "File not found"));
      }

      if (error.code === "EACCES") {
        return next(new ApiError(403, "File access denied"));
      }

      return next(error);
    });

    stream.pipe(res);

  } catch (error) {
    next(error);
  }
};

// ==========================================================
// EXPORTS
// ==========================================================

export default {
  getPrivateFile,
};