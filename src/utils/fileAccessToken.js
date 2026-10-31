import { createHmac, timingSafeEqual } from "node:crypto";
import ApiError from "./ApiError.js";

const TOKEN_EXPIRY_SECONDS = 120;

const getSecret = () => {
  const secret = process.env.FILE_ACCESS_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("FILE_ACCESS_SECRET is missing or invalid.");
  }

  return secret;
};

const signPayload = (encodedPayload) =>
  createHmac("sha256", getSecret())
    .update(encodedPayload)
    .digest("base64url");

export const createFileAccessToken = ({
  storageKey,
  recordType,
  recordId,
  userId,
}) => {
  if (
    typeof storageKey !== "string" ||
    !storageKey.startsWith("private/") ||
    storageKey.split("/").some((part) => !part || part === "." || part === "..") ||
    storageKey.includes("\\") ||
    !recordType ||
    !recordId ||
    !userId
  ) {
    throw new ApiError(400, "Invalid file-access token details.");
  }

  const payload = {
    version: 1,
    storageKey,
    recordType: String(recordType),
    recordId: String(recordId),
    userId: String(userId),
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRY_SECONDS,
  };

  const encodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString("base64url");

  return `${encodedPayload}.${signPayload(encodedPayload)}`;
};

export const verifyFileAccessToken = (token) => {
  if (typeof token !== "string" || token.length > 4096) {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  const [encodedPayload, suppliedSignature] = parts;
  let expectedSignature;

  try {
    expectedSignature = signPayload(encodedPayload);
  } catch {
    throw new ApiError(500, "File-access security is not configured.");
  }

  const expectedBuffer = Buffer.from(expectedSignature);
  const suppliedBuffer = Buffer.from(suppliedSignature);

  if (
    expectedBuffer.length !== suppliedBuffer.length ||
    !timingSafeEqual(expectedBuffer, suppliedBuffer)
  ) {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  let payload;

  try {
    payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    );
  } catch {
    throw new ApiError(401, "Invalid or expired file-access link.");
  }

  if (
    payload.version !== 1 ||
    typeof payload.storageKey !== "string" ||
    !payload.storageKey.startsWith("private/") ||
    payload.storageKey.split("/").some((part) => !part || part === "." || part === "..") ||
    payload.storageKey.includes("\\") ||
    !payload.recordType ||
    !payload.recordId ||
    !payload.userId ||
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
