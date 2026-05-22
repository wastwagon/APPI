import type { FastifyInstance } from 'fastify'
import { prisma } from '@appi/database'
import { authenticate } from '../plugins/auth-guard.js'

export async function notificationRoutes(app: FastifyInstance) {
  const auth = { preHandler: [authenticate] }

  app.get('/api/v1/member/notifications', auth, async (request) => {
    const userId = request.user!.id
    const q = request.query as { take?: string }
    const take = Math.min(Number(q.take) || 40, 100)

    const items = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take,
    })

    const unread = await prisma.notification.count({ where: { userId, readAt: null } })

    return {
      unread,
      items: items.map((n) => ({
        id: n.id,
        kind: n.kind.toLowerCase(),
        title: n.title,
        body: n.body,
        href: n.href,
        readAt: n.readAt,
        createdAt: n.createdAt,
      })),
    }
  })

  app.patch('/api/v1/member/notifications/read', auth, async (request) => {
    const userId = request.user!.id
    const body = request.body as { ids?: string[]; all?: boolean }

    if (body.all) {
      await prisma.notification.updateMany({
        where: { userId, readAt: null },
        data: { readAt: new Date() },
      })
      return { ok: true }
    }

    if (body.ids?.length) {
      await prisma.notification.updateMany({
        where: { userId, id: { in: body.ids }, readAt: null },
        data: { readAt: new Date() },
      })
    }

    return { ok: true }
  })
}
