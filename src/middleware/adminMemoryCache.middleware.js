/**
 * Lightweight, dependency-free in-memory cache for authenticated admin GET APIs.
 *
 * - Cache is scoped by authenticated user and full request URL.
 * - Successful JSON responses only are cached.
 * - Any non-GET admin request clears the cache to avoid stale data after writes.
 * - Entries expire automatically after a short TTL.
 *
 * This cache is process-local. It is suitable for localhost and a single backend
 * instance; multiple deployed instances need a shared cache such as Redis.
 */
const DEFAULT_TTL_MS = 15 * 1000;
const MAX_ENTRIES = 500;
const cache = new Map();

const now = () => Date.now();

const removeExpiredEntries = (timestamp = now()) => {
  for (const [key, entry] of cache) {
    if (entry.expiresAt <= timestamp) cache.delete(key);
  }
};

const getUserKey = (user) =>
  String(user?.id ?? user?.userId ?? user?.email ?? "unknown-admin");

export const clearAdminMemoryCache = () => cache.clear();

export default function adminMemoryCache(req, res, next) {
  // This middleware must be mounted after authenticate + authorize.
  if (req.method !== "GET") {
    // Any admin write invalidates cached admin reads.
    clearAdminMemoryCache();
    return next();
  }

  const timestamp = now();
  removeExpiredEntries(timestamp);

  const key = `${getUserKey(req.user)}:${req.originalUrl}`;
  const cached = cache.get(key);

  if (cached && cached.expiresAt > timestamp) {
    res.setHeader("X-Admin-Cache", "HIT");
    res.status(cached.statusCode).json(cached.body);
    return;
  }

  res.setHeader("X-Admin-Cache", "MISS");
  const originalJson = res.json.bind(res);

  res.json = (body) => {
    const statusCode = res.statusCode || 200;
    const isSuccessful = statusCode >= 200 && statusCode < 300;

    // This wrapper only intercepts res.json(), so the body is JSON by definition.
    if (isSuccessful) {
      if (cache.size >= MAX_ENTRIES) {
        const oldestKey = cache.keys().next().value;
        if (oldestKey !== undefined) cache.delete(oldestKey);
      }

      cache.set(key, {
        statusCode,
        body,
        expiresAt: now() + DEFAULT_TTL_MS,
      });
    }

    return originalJson(body);
  };

  return next();
}
