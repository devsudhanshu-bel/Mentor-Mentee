import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_ROOT = path.resolve(
  process.env.UPLOAD_ROOT || "/data/uploads"
);

const STORAGE_CATEGORIES = Object.freeze({
  "avatars/mentors": "public/avatars/mentors",
  "avatars/students": "public/avatars/students",
  "avatars/mentees": "public/avatars/mentees",

  documents: "private/documents",
  internships: "private/internships",
  projects: "private/projects",
  academics: "private/academics",
});

// ==========================================================
// PATH VALIDATION
// ==========================================================

const isInsideDirectory = (parent, target) => {
  const relative = path.relative(parent, target);

  return (
    relative !== "" &&
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
};

const validateStorageKey = (storageKey) => {
  if (
    typeof storageKey !== "string" ||
    !storageKey ||
    storageKey.includes("\0") ||
    storageKey.includes("\\") ||
    path.posix.isAbsolute(storageKey)
  ) {
    throw new Error("Invalid storage path.");
  }

  const segments = storageKey.split("/");

  if (
    segments.some(
      (segment) =>
        !segment ||
        segment === "." ||
        segment === ".."
    )
  ) {
    throw new Error("Invalid storage path.");
  }

  return segments;
};

const getSafePath = (relativePath) => {
  validateStorageKey(relativePath);

  const resolvedPath = path.resolve(
    UPLOAD_ROOT,
    ...relativePath.split("/")
  );

  if (!isInsideDirectory(UPLOAD_ROOT, resolvedPath)) {
    throw new Error("Access outside upload directory denied.");
  }

  return resolvedPath;
};

// ==========================================================
// DIRECTORY VALIDATION
// ==========================================================

const ensureStorageDirectory = async (directory) => {
  await fs.mkdir(UPLOAD_ROOT, {
    recursive: true,
    mode: 0o750,
  });

  const realRoot = await fs.realpath(UPLOAD_ROOT);

  if (realRoot !== UPLOAD_ROOT) {
    throw new Error(
      "Upload root must not resolve through a symlink."
    );
  }

  await fs.mkdir(directory, {
    recursive: true,
    mode: 0o750,
  });

  const realDirectory = await fs.realpath(directory);

  if (
    realDirectory !== directory ||
    !isInsideDirectory(realRoot, realDirectory)
  ) {
    throw new Error("Invalid storage directory.");
  }

  return realDirectory;
};

// ==========================================================
// FILE EXTENSION
// ==========================================================

const getExtension = (filename = "") => {
  if (typeof filename !== "string") {
    return "";
  }

  const extension = path.extname(filename).toLowerCase();

  if (!/^\.[a-z0-9]{1,10}$/.test(extension)) {
    return "";
  }

  return extension;
};

// ==========================================================
// SUBFOLDER VALIDATION
// ==========================================================

const validateSubfolders = (subfolders = []) => {
  if (!Array.isArray(subfolders)) {
    throw new Error("Invalid storage subfolders.");
  }

  return subfolders.map((folder) => {
    if (
      typeof folder !== "string" ||
      !/^[a-zA-Z0-9_-]+$/.test(folder)
    ) {
      throw new Error("Invalid storage folder name.");
    }

    return folder;
  });
};

// ==========================================================
// UPLOAD LOCAL FILE
// ==========================================================

export const uploadLocalFile = async (
  file,
  category,
  subfolders = []
) => {
  if (
    !file?.buffer ||
    !Buffer.isBuffer(file.buffer) ||
    file.buffer.length === 0
  ) {
    throw new Error("A valid file buffer is required.");
  }

  const storageDirectory = STORAGE_CATEGORIES[category];

  if (!storageDirectory) {
    throw new Error("Invalid storage category.");
  }

  const safeSubfolders = validateSubfolders(subfolders);

  const relativeDirectory = path.posix.join(
    storageDirectory,
    ...safeSubfolders
  );

  const directoryPath = getSafePath(relativeDirectory);

  const realDirectory = await ensureStorageDirectory(
    directoryPath
  );

  const extension = getExtension(file.originalname);

  const filename = `${randomUUID()}${extension}`;

  const storageKey = path.posix.join(
    relativeDirectory,
    filename
  );

  const absolutePath = getSafePath(storageKey);

  const expectedPath = path.join(
    realDirectory,
    filename
  );

  if (absolutePath !== expectedPath) {
    throw new Error("Invalid file destination.");
  }

  await fs.writeFile(absolutePath, file.buffer, {
    flag: "wx",
    mode: 0o640,
  });

  const isPublic = storageDirectory.startsWith("public/");

  const mimeType =
    typeof file.mimetype === "string"
      ? file.mimetype
      : "application/octet-stream";

  return {
    publicId: storageKey,
    storageKey,

    url: isPublic
      ? `/uploads/${storageKey.replace(/^public\//, "")}`
      : null,

    fileType:
      extension.replace(".", "") ||
      mimeType.split("/").pop() ||
      "file",

    fileSize: file.buffer.length,

    resourceType: mimeType.startsWith("image/")
      ? "image"
      : "raw",

    originalFilename: file.originalname || "document",

    deliveryType: isPublic ? "public" : "private",

    version: null,

    mimeType,
  };
};

// ==========================================================
// GET LOCAL FILE PATH
// ==========================================================

export const getLocalFilePath = async (storageKey) => {
  const absolutePath = getSafePath(storageKey);

  const realRoot = await fs.realpath(UPLOAD_ROOT);

  const stats = await fs.lstat(absolutePath);

  if (
    !stats.isFile() ||
    stats.isSymbolicLink()
  ) {
    throw new Error("Stored file not found.");
  }

  const realFile = await fs.realpath(absolutePath);

  if (
    !isInsideDirectory(realRoot, realFile) ||
    realFile !== absolutePath
  ) {
    throw new Error("Invalid stored file path.");
  }

  return realFile;
};

// ==========================================================
// DELETE LOCAL FILE
// ==========================================================

export const deleteLocalFile = async (storageKey) => {
  if (!storageKey) {
    return false;
  }

  const absolutePath = getSafePath(storageKey);

  try {
    const stats = await fs.lstat(absolutePath);

    if (
      !stats.isFile() ||
      stats.isSymbolicLink()
    ) {
      throw new Error("Invalid stored file.");
    }

    const realRoot = await fs.realpath(UPLOAD_ROOT);
    const realFile = await fs.realpath(absolutePath);

    if (
      !isInsideDirectory(realRoot, realFile) ||
      realFile !== absolutePath
    ) {
      throw new Error("Invalid stored file path.");
    }

    await fs.unlink(absolutePath);

    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }

    throw error;
  }
};

// ==========================================================
// EXPORTS
// ==========================================================

export default {
  uploadLocalFile,
  getLocalFilePath,
  deleteLocalFile,
};