import type { FastifyReply, FastifyRequest } from 'fastify'
import { authenticate } from './auth-guard.js'

export async function adminPreHandler(request: FastifyRequest, reply: FastifyReply) {
  await authenticate(request, reply)
  if (reply.sent) return
  if (request.user?.role !== 'admin') {
    return reply.status(403).send({ error: 'Admin access required' })
  }
}

/** API key OR JWT admin (for tooling / legacy) */
export async function adminOrKeyPreHandler(request: FastifyRequest, reply: FastifyReply) {
  const expected = process.env.ADMIN_API_KEY
  const auth = request.headers.authorization
  const token = auth?.startsWith('Bearer ') ? auth.slice(7) : null

  if (expected && token === expected) return

  await authenticate(request, reply)
  if (reply.sent) return
  if (request.user?.role !== 'admin') {
    return reply.status(401).send({ error: 'Unauthorized' })
  }
}
