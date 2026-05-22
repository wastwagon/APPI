import { Redis } from 'ioredis'

let client: Redis | null = null

export function getRedis(): Redis | null {
  const url = process.env.REDIS_URL
  if (!url) return null
  if (!client) {
    client = new Redis(url, { maxRetriesPerRequest: 2, lazyConnect: true })
  }
  return client
}

/** Rate limit: max requests per windowMs for a key. Returns true if allowed. */
export async function rateLimit(
  key: string,
  max: number,
  windowSec: number
): Promise<boolean> {
  const redis = getRedis()
  if (!redis) return true

  try {
    if (redis.status !== 'ready') await redis.connect()
    const count = await redis.incr(key)
    if (count === 1) await redis.expire(key, windowSec)
    return count <= max
  } catch {
    return true
  }
}
