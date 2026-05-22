import type { FastifyInstance } from 'fastify'
import { authenticate } from '../plugins/auth-guard.js'
import { prisma, UserRole } from '@appi/database'
import { loginSchema, registerSchema, refreshSchema } from '@appi/shared'
import {
  createRefreshToken,
  hashPassword,
  revokeRefreshToken,
  resolveRefreshToken,
  signAccessToken,
  storeRefreshToken,
  verifyPassword,
} from '../lib/auth.js'
import { rateLimit } from '../lib/redis.js'

function roleToString(role: UserRole): string {
  return role.toLowerCase()
}

export async function authRoutes(app: FastifyInstance) {
  app.post('/api/v1/auth/register', async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() })
    }

    const { email, password, fullName } = parsed.data
    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) {
      return reply.status(409).send({ error: 'Email already registered' })
    }

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: await hashPassword(password),
        fullName,
        role: UserRole.PUBLIC,
        profile: { create: {} },
      },
    })

    return reply.status(201).send({
      ok: true,
      user: { id: user.id, email: user.email, role: roleToString(user.role) },
    })
  })

  app.post('/api/v1/auth/login', async (request, reply) => {
    const ip = request.ip
    const allowed = await rateLimit(`rl:login:${ip}`, 10, 60)
    if (!allowed) return reply.status(429).send({ error: 'Too many login attempts' })

    const parsed = loginSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input' })
    }

    const { email, password } = parsed.data
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return reply.status(401).send({ error: 'Invalid email or password' })
    }

    const accessToken = await signAccessToken({
      sub: user.id,
      email: user.email,
      role: roleToString(user.role),
    })
    const refreshToken = createRefreshToken()
    await storeRefreshToken(refreshToken, user.id)

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: roleToString(user.role),
      },
    }
  })

  app.post('/api/v1/auth/refresh', async (request, reply) => {
    const parsed = refreshSchema.safeParse(request.body)
    if (!parsed.success) return reply.status(400).send({ error: 'Invalid input' })

    const userId = await resolveRefreshToken(parsed.data.refreshToken)
    if (!userId) return reply.status(401).send({ error: 'Invalid refresh token' })

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return reply.status(401).send({ error: 'User not found' })

    const accessToken = await signAccessToken({
      sub: user.id,
      email: user.email,
      role: roleToString(user.role),
    })

    return { accessToken }
  })

  app.post('/api/v1/auth/logout', async (request, reply) => {
    const parsed = refreshSchema.safeParse(request.body)
    if (parsed.success) {
      await revokeRefreshToken(parsed.data.refreshToken)
    }
    return reply.send({ ok: true })
  })

  app.get('/api/v1/auth/me', { preHandler: [authenticate] }, async (request, reply) => {
    const user = await prisma.user.findUnique({
      where: { id: request.user!.id },
      include: { profile: true },
    })
    if (!user) return reply.status(404).send({ error: 'User not found' })

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: roleToString(user.role),
      profile: user.profile,
    }
  })
}
