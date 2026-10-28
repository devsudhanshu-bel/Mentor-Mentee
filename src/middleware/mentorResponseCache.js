import { createHash } from 'node:crypto';
import {
  getCachedJson,
  setCachedJson,
  invalidateCachedKeysForUser,
  registerCachedKeyForUser,
} from '../utils/upstashCache.js';

const TTL_SECONDS = 5;
const PREFIX = 'mentor:v1:response';

/**
 * Mount only after authenticate + authorize("MENTOR").
 * Caches successful JSON GET responses per authenticated mentor and URL.
 * Any write invalidates that mentor's cached GET responses before proceeding.
 */
export async function mentorResponseCache(req, res, next) {
  const userId = req.user?.id;
  if (!userId) return next();

  if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
    await invalidateCachedKeysForUser(userId);
    return next();
  }

  if (req.method !== 'GET') return next();

  // Explicit client refreshes bypass the read cache but still refresh the cache.
  const bypassRead = /no-cache|no-store/i.test(req.get('Cache-Control') || '') ||
    /no-cache/i.test(req.get('Pragma') || '');

  const urlHash = createHash('sha256').update(req.originalUrl).digest('hex');
  const cacheKey = `${PREFIX}:${userId}:${urlHash}`;

  if (!bypassRead) {
    const cached = await getCachedJson(cacheKey);
    if (cached && cached.statusCode === 200 && cached.body !== undefined) {
      res.set('X-Mentor-Cache', 'HIT');
      res.set('Cache-Control', 'private, no-store');
      return res.status(cached.statusCode).json(cached.body);
    }
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    const statusCode = res.statusCode;
    const hasSetCookie = Boolean(res.getHeader('Set-Cookie'));
    const noStore = /no-store/i.test(String(res.getHeader('Cache-Control') || ''));

    if (statusCode === 200 && !hasSetCookie && !noStore && body !== undefined) {
      // Store asynchronously; do not delay the response on cache writes.
      void (async () => {
        const saved = await setCachedJson(cacheKey, { statusCode, body }, TTL_SECONDS);
        if (saved) await registerCachedKeyForUser(userId, cacheKey, TTL_SECONDS);
      })();
      res.set('X-Mentor-Cache', 'MISS');
    }
    res.set('Cache-Control', 'private, no-store');
    return originalJson(body);
  };

  return next();
}
