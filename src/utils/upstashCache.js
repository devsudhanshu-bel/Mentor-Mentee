/**
 * Optional Upstash Redis JSON cache.
 * Fails open: Redis outages never prevent the PostgreSQL-backed app from working.
 */
const DEFAULT_TTL_SECONDS = 5;
let redisPromise;
let warned = false;

async function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  if (!redisPromise) {
    redisPromise = import('@upstash/redis')
      .then(({ Redis }) => new Redis({ url, token }))
      .catch((error) => {
        if (!warned) {
          console.warn('[Upstash cache] SDK unavailable; caching disabled:', error?.message);
          warned = true;
        }
        redisPromise = null;
        return null;
      });
  }
  return redisPromise;
}

export async function getCachedJson(key) {
  try {
    const redis = await getRedis();
    if (!redis) return null;
    const value = await redis.get(key);
    if (value == null) return null;
    return typeof value === 'string' ? JSON.parse(value) : value;
  } catch (error) {
    console.warn('[Upstash cache] Read failed; using database:', error?.message);
    return null;
  }
}

export async function setCachedJson(key, value, ttlSeconds = DEFAULT_TTL_SECONDS) {
  try {
    const redis = await getRedis();
    if (!redis) return false;
    await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
    return true;
  } catch (error) {
    console.warn('[Upstash cache] Write failed; continuing without cache:', error?.message);
    return false;
  }
}

export async function invalidateCachedKeysForUser(userId, namespace = "mentor") {
  if (!userId) return;
  try {
    const redis = await getRedis();
    if (!redis) return;
    const indexKey = `${namespace}:v1:index:${userId}`;
    const keys = await redis.smembers(indexKey);
    if (Array.isArray(keys) && keys.length) {
      // Redis DEL accepts an array of keys in the Upstash SDK.
      await redis.del(...keys);
    }
    await redis.del(indexKey);
  } catch (error) {
    // Cache invalidation failure must not block a successful user action.
    console.warn('[Upstash cache] Invalidation failed; entries expire shortly:', error?.message);
  }
}

export async function registerCachedKeyForUser(userId, cacheKey, ttlSeconds = DEFAULT_TTL_SECONDS, namespace = "mentor") {
  try {
    const redis = await getRedis();
    if (!redis) return;
    const indexKey = `${namespace}:v1:index:${userId}`;
    await redis.sadd(indexKey, cacheKey);
    // Index lives slightly longer than cache entries so mutations can clear them.
    await redis.expire(indexKey, ttlSeconds + 10);
  } catch (error) {
    console.warn('[Upstash cache] Cache index update failed:', error?.message);
  }
}
