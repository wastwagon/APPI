import type { FastifyInstance } from 'fastify'
import { prisma } from '@appi/database'
import { getRedis } from '../lib/redis.js'

export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async () => {
    const checks: Record<string, string> = { api: 'ok' }

    try {
      await prisma.$queryRaw`SELECT 1`
      checks.database = 'ok'
    } catch {
      checks.database = 'error'
    }

    const redis = getRedis()
    if (redis) {
      try {
        if (redis.status !== 'ready') await redis.connect()
        await redis.ping()
        checks.redis = 'ok'
      } catch {
        checks.redis = 'error'
      }
    } else {
      checks.redis = 'skipped'
    }

    const healthy = checks.database === 'ok'
    return {
      status: healthy ? 'ok' : 'degraded',
      service: 'api',
      checks,
    }
  })
}
