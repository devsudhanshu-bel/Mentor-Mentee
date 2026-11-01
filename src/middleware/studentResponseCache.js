
import { createHash } from "node:crypto";

import {
  getCachedJson,
  setCachedJson,
  invalidateCachedKeysForUser,
  registerCachedKeyForUser,
} from "../utils/upstashCache.js";

const TTL_SECONDS = 5;
const PREFIX = "student:v1:response";

/**
 * Detect responses containing short-lived private file URLs.
 * These responses must not be cached.
 */
const containsPrivateFileUrl = (value) => {
  if (typeof value === "string") {
    return value.includes("/api/files/private?token=");
  }

  if (Array.isArray(value)) {
    return value.some(containsPrivateFileUrl);
  }

  if (value && typeof value === "object") {
    return Object.values(value).some(containsPrivateFileUrl);
  }

  return false;
};

/**
 * Mount only after authenticate + authorize("STUDENT").
 * Caches successful JSON GET responses per authenticated student and URL.
 * Write requests invalidate that student's indexed responses.
 */
export async function studentResponseCache(req, res, next) {
  const userId = req.user?.id;

  if (!userId) return next();

  if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    await invalidateCachedKeysForUser(userId, "student");
    return next();
  }

  if (req.method !== "GET") return next();

  const bypassRead =
    /no-cache|no-store/i.test(req.get("Cache-Control") || "") ||
    /no-cache/i.test(req.get("Pragma") || "");

  const urlHash = createHash("sha256")
    .update(req.originalUrl)
    .digest("hex");

  const cacheKey = `${PREFIX}:${userId}:${urlHash}`;

  if (!bypassRead) {
    const cached = await getCachedJson(cacheKey);

    if (
      cached &&
      cached.statusCode === 200 &&
      cached.body !== undefined &&
      !containsPrivateFileUrl(cached.body)
    ) {
      res.set("X-Student-Cache", "HIT");
      res.set("Cache-Control", "private, no-store");

      return res.status(cached.statusCode).json(cached.body);
    }
  }

  const originalJson = res.json.bind(res);

  res.json = (body) => {
    const statusCode = res.statusCode;
    const hasSetCookie = Boolean(res.getHeader("Set-Cookie"));
    const noStore = /no-store/i.test(
      String(res.getHeader("Cache-Control") || "")
    );

    const hasPrivateFileUrl = containsPrivateFileUrl(body);

    if (
      statusCode === 200 &&
      !hasSetCookie &&
      !noStore &&
      !hasPrivateFileUrl &&
      body !== undefined
    ) {
      void (async () => {
        const saved = await setCachedJson(
          cacheKey,
          { statusCode, body },
          TTL_SECONDS
        );

        if (saved) {
          await registerCachedKeyForUser(
            userId,
            cacheKey,
            TTL_SECONDS,
            "student"
          );
        }
      })();

      res.set("X-Student-Cache", "MISS");
    }

    res.set("Cache-Control", "private, no-store");

    return originalJson(body);
  };

  return next();
}
