import type { FastifyReply, FastifyRequest } from 'fastify'
import { verifyAccessToken } from '../lib/auth.js'

export type AuthUser = { id: string; email: string; role: string }

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthUser
  }
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const auth = request.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Missing or invalid token' })
  }
  try {
    const payload = await verifyAccessToken(auth.slice(7))
    if (!payload.sub || !payload.email || !payload.role) {
      return reply.status(401).send({ error: 'Invalid token payload' })
    }
    request.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    }
  } catch {
    return reply.status(401).send({ error: 'Invalid or expired token' })
  }
}
