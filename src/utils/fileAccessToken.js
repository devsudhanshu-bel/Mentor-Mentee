
import { createHmac, timingSafeEqual } from "node:crypto";
import ApiError from "./ApiError.js";

const TOKEN_EXPIRY_SECONDS = 120;
const MAX_TOKEN_LENGTH = 4096;

const getSecret = () => {
  const secret = process.env.FILE_ACCESS_SECRET;

  if (
    typeof secret !== "string" ||
    Buffer.byteLength(secret, "utf8") < 32
  ) {
    throw new Error("FILE_ACCESS_SECRET is missing or invalid.");
  }

  return secret;
};

const isValidStorageKey = (storageKey) => {
  if (
    typeof storageKey !== "string" ||
    storageKey.length > 1024 ||
    !storageKey.startsWith("private/") ||
    storageKey.includes("\\") ||
    storageKey.includes("\0")
  ) {
    return false;
  }

  const segments = storageKey.split("/");

  return segments.every(
    (part) =>
      part.length > 0 &&
      part !== "." &&
      part !== ".." &&
      /^[a-zA-Z0-9._-]+$/.test(part)
  );
};

const isValidIdentifier = (value) =>
  typeof value === "string" &&
  value.length > 0 &&
  value.length <= 256;

const signPayload = (encodedPayload) =>
  createHmac("sha256", getSecret())
    .update(encodedPayload)
    .digest("base64url");

// ==========================================================
// CREATE FILE ACCESS TOKEN
// ==========================================================

export const createFileAccessToken = ({
  storageKey,
  recordType,
  recordId,
  userId,
}) => {
  if (
    !isValidStorageKey(storageKey) ||
    !isValidIdentifier(recordType) ||
    !isValidIdentifier(recordId) ||
    !isValidIdentifier(userId)
  ) {
    throw new ApiError(400, "Invalid file-access token details.");
  }

  const payload = {
    version: 1,
    storageKey,
    recordType,
    recordId,
    userId,
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY_SECONDS,
  };

  const encodedPayload = Buffer
    .from(JSON.stringify(payload), "utf8")
    .toString("base64url");

  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

// ==========================================================
// VERIFY FILE ACCESS TOKEN
// ==========================================================

export const verifyFileAccessToken = (token) => {
  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > MAX_TOKEN_LENGTH
  ) {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  const [encodedPayload, suppliedSignature] = parts;

  // Reject malformed Base64URL components.
  if (
    !/^[A-Za-z0-9_-]+$/.test(encodedPayload) ||
    !/^[A-Za-z0-9_-]{43}$/.test(suppliedSignature)
  ) {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  let expectedSignature;

  try {
    expectedSignature = signPayload(encodedPayload);
  } catch {
    throw new ApiError(500, "File-access security is not configured.");
  }

  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const suppliedBuffer = Buffer.from(suppliedSignature, "utf8");

  if (
    expectedBuffer.length !== suppliedBuffer.length ||
    !timingSafeEqual(expectedBuffer, suppliedBuffer)
  ) {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  let payload;

  try {
    const decodedPayload = Buffer
      .from(encodedPayload, "base64url")
      .toString("utf8");

    payload = JSON.parse(decodedPayload);
  } catch {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload) ||
    payload.version !== 1 ||
    !isValidStorageKey(payload.storageKey) ||
    !isValidIdentifier(payload.recordType) ||
    !isValidIdentifier(payload.recordId) ||
    !isValidIdentifier(payload.userId) ||
    !Number.isInteger(payload.exp) ||
    payload.exp <= Math.floor(Date.now() / 1000)
  ) {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  return payload;
};

export default {
  createFileAccessToken,
  verifyFileAccessToken,
};
