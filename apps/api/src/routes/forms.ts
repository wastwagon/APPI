import type { FastifyInstance, FastifyRequest } from 'fastify'
import { prisma, type Prisma } from '@appi/database'
import { formSubmissionSchema } from '@appi/shared'
import { rateLimit } from '../lib/redis.js'
import { Resend } from 'resend'
import { formatFormEmailHtml } from '../lib/form-email.js'

function getClientIp(request: FastifyRequest): string {
  const forwarded = request.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim() ?? 'unknown'
  return request.ip
}

async function notifyByEmail(formType: string, payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.FORM_TO_EMAIL
  const from = process.env.FORM_FROM_EMAIL ?? 'noreply@example.com'
  if (!apiKey || !to) return

  const resend = new Resend(apiKey)
  await resend.emails.send({
    from,
    to: [to],
    subject: `[APPI] New ${formType} submission`,
    text: JSON.stringify(payload, null, 2),
    html: formatFormEmailHtml(formType, payload),
  })
}

export async function formRoutes(app: FastifyInstance) {
  app.post('/api/v1/forms', async (request, reply) => {
    const ip = getClientIp(request)
    const allowed = await rateLimit(`rl:forms:${ip}`, 8, 60)
    if (!allowed) {
      return reply.status(429).send({ error: 'Too many requests. Try again later.' })
    }

    const parsed = formSubmissionSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid submission', details: parsed.error.flatten() })
    }

    const { formType, payload, website } = parsed.data
    if (website) {
      return reply.send({ ok: true })
    }

    if (!process.env.DATABASE_URL) {
      return reply.status(503).send({ error: 'Database not configured' })
    }

    const row = await prisma.formSubmission.create({
      data: { formType, payload: payload as Prisma.InputJsonValue, sourceIp: ip },
    })

    notifyByEmail(formType, payload as Record<string, unknown>).catch((err) => {
      request.log.warn({ err }, 'Email notification failed')
    })

    return reply.status(201).send({ ok: true, id: row.id })
  })
}
