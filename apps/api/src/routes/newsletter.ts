import type { FastifyInstance } from 'fastify'
import { prisma } from '@appi/database'
import { newsletterSubscribeSchema } from '@appi/shared'
import { rateLimit } from '../lib/redis.js'

export async function newsletterRoutes(app: FastifyInstance) {
  app.post('/api/v1/newsletter', async (request, reply) => {
    const ip = request.ip
    const allowed = await rateLimit(`rl:newsletter:${ip}`, 5, 60)
    if (!allowed) return reply.status(429).send({ error: 'Too many requests' })

    const parsed = newsletterSubscribeSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid email' })
    }

    const email = parsed.data.email.toLowerCase()
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } })
    if (existing) {
      return reply.send({ ok: true, message: 'Already subscribed' })
    }

    await prisma.newsletterSubscriber.create({
      data: { email, source: parsed.data.source ?? 'website' },
    })

    return reply.status(201).send({ ok: true })
  })
}
