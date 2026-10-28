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
 * Mount only after authenticate + authorize("STUDENT").
 * Caches successful JSON GET responses per authenticated student and URL.
 * Any write invalidates that student's indexed responses before the handler runs.
 */
export async function studentResponseCache(req, res, next) {
  const userId = req.user?.id;
  if (!userId) return next();

  if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    await invalidateCachedKeysForUser(userId, "student");
    return next();
  }
  if (req.method !== "GET") return next();

  const bypassRead = /no-cache|no-store/i.test(req.get("Cache-Control") || "") ||
    /no-cache/i.test(req.get("Pragma") || "");
  const urlHash = createHash("sha256").update(req.originalUrl).digest("hex");
  const cacheKey = `${PREFIX}:${userId}:${urlHash}`;

  if (!bypassRead) {
    const cached = await getCachedJson(cacheKey);
    if (cached && cached.statusCode === 200 && cached.body !== undefined) {
      res.set("X-Student-Cache", "HIT");
      res.set("Cache-Control", "private, no-store");
      return res.status(cached.statusCode).json(cached.body);
    }
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const statusCode = res.statusCode;
    const hasSetCookie = Boolean(res.getHeader("Set-Cookie"));
    const noStore = /no-store/i.test(String(res.getHeader("Cache-Control") || ""));

    if (statusCode === 200 && !hasSetCookie && !noStore && body !== undefined) {
      void (async () => {
        const saved = await setCachedJson(cacheKey, { statusCode, body }, TTL_SECONDS);
        if (saved) await registerCachedKeyForUser(userId, cacheKey, TTL_SECONDS, "student");
      })();
      res.set("X-Student-Cache", "MISS");
    }
    res.set("Cache-Control", "private, no-store");
    return originalJson(body);
  };

  return next();
}
