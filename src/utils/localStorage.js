import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_ROOT = path.resolve(
  process.env.UPLOAD_ROOT || "/data/uploads"
);

const STORAGE_CATEGORIES = {
  "avatars/mentors": "public/avatars/mentors",
  "avatars/students": "public/avatars/students",
  "avatars/mentees": "public/avatars/mentees",

  documents: "private/documents",
  internships: "private/internships",
  projects: "private/projects",
  academics: "private/academics",
};

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

const getSafePath = (relativePath) => {
  if (
    typeof relativePath !== "string" ||
    !relativePath ||
    path.isAbsolute(relativePath) ||
    relativePath.includes("\\")
  ) {
    throw new Error("Invalid storage path.");
  }

  const resolvedPath = path.resolve(
    UPLOAD_ROOT,
    relativePath
  );

  if (
    !resolvedPath.startsWith(`${UPLOAD_ROOT}${path.sep}`)
  ) {
    throw new Error("Access outside upload directory denied.");
  }

  return resolvedPath;
};

const ensureStorageDirectory = async (directory) => {
  await fs.mkdir(UPLOAD_ROOT, {
    recursive: true,
    mode: 0o750,
  });

  await fs.mkdir(directory, {
    recursive: true,
    mode: 0o750,
  });

  const realRoot = await fs.realpath(UPLOAD_ROOT);
  const realDirectory = await fs.realpath(directory);

  if (
    realDirectory !== realRoot &&
    !realDirectory.startsWith(`${realRoot}${path.sep}`)
  ) {
    throw new Error("Invalid storage directory.");
  }

  return realDirectory;
};

const getExtension = (filename = "") => {
  const extension = path.extname(filename).toLowerCase();

  if (!/^\.[a-z0-9]{1,10}$/.test(extension)) {
    return "";
  }

  return extension;
};

export const uploadLocalFile = async (
  file,
  category,
  subfolders = []
) => {
  if (
    !file?.buffer ||
    !Buffer.isBuffer(file.buffer)
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

  const expectedPath = path.join(realDirectory, filename);

  if (absolutePath !== expectedPath) {
    throw new Error("Invalid file destination.");
  }

  await fs.writeFile(absolutePath, file.buffer, {
    flag: "wx",
    mode: 0o640,
  });

  const isPublic = storageDirectory.startsWith("public/");

  return {
    publicId: storageKey,
    storageKey,

    url: isPublic
      ? `/files/${storageKey}`
      : null,

    fileType:
      extension.replace(".", "") ||
      file.mimetype?.split("/").pop() ||
      "file",

    fileSize: file.buffer.length,

    resourceType: file.mimetype?.startsWith("image/")
      ? "image"
      : "raw",

    originalFilename: file.originalname || "document",

    deliveryType: isPublic ? "public" : "private",

    version: null,

    mimeType: file.mimetype || "application/octet-stream",
  };
};

export const getLocalFilePath = async (storageKey) => {
  const absolutePath = getSafePath(storageKey);

  const realRoot = await fs.realpath(UPLOAD_ROOT);
  const realFile = await fs.realpath(absolutePath);

  if (!realFile.startsWith(`${realRoot}${path.sep}`)) {
    throw new Error("Invalid stored file path.");
  }

  const stats = await fs.lstat(absolutePath);

  if (!stats.isFile() || stats.isSymbolicLink()) {
    throw new Error("Stored file not found.");
  }

  return realFile;
};

export const deleteLocalFile = async (storageKey) => {
  if (!storageKey) {
    return false;
  }

  const absolutePath = getSafePath(storageKey);

  try {
    const stats = await fs.lstat(absolutePath);

    if (!stats.isFile() || stats.isSymbolicLink()) {
      throw new Error("Invalid stored file.");
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

export default {
  uploadLocalFile,
  getLocalFilePath,
  deleteLocalFile,
};
