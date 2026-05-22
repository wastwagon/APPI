import type { FastifyInstance } from 'fastify'
import { prisma, VerificationStatus } from '@appi/database'
import {
  profileUpdateSchema,
  verificationSubmitSchema,
  summitRegistrationSchema,
  passwordChangeSchema,
} from '@appi/shared'
import { authenticate } from '../plugins/auth-guard.js'
import { hashPassword, verifyPassword } from '../lib/auth.js'
import { saveUpload } from '../lib/uploads.js'
import { createNotification } from '../lib/notifications.js'
import path from 'path'
import { readFile } from 'fs/promises'

const CURRENT_SUMMIT_YEAR = process.env.CURRENT_SUMMIT_YEAR ?? '2025'

export async function memberRoutes(app: FastifyInstance) {
  const auth = { preHandler: [authenticate] }

  app.get('/api/v1/member/profile', auth, async (request) => {
    const user = await prisma.user.findUnique({
      where: { id: request.user!.id },
      include: {
        profile: true,
        verifications: { orderBy: { submittedAt: 'desc' }, take: 1 },
        summitRegistrations: {
          where: { summitYear: CURRENT_SUMMIT_YEAR },
          take: 1,
        },
      },
    })
    if (!user) return { error: 'Not found' }

    const latestVerification = user.verifications[0] ?? null
    const summitReg = user.summitRegistrations[0] ?? null
    const unreadNotifications = await prisma.notification.count({
      where: { userId: user.id, readAt: null },
    })

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role.toLowerCase(),
      profile: user.profile,
      verification: latestVerification
        ? {
            id: latestVerification.id,
            status: latestVerification.status.toLowerCase(),
            nationalId: latestVerification.nationalId,
            submittedAt: latestVerification.submittedAt,
            adminNotes: latestVerification.adminNotes,
          }
        : null,
      summitRegistration: summitReg
        ? {
            id: summitReg.id,
            status: summitReg.status.toLowerCase(),
            summitYear: summitReg.summitYear,
            organisation: summitReg.organisation,
            country: summitReg.country,
            delegationRole: summitReg.delegationRole,
            dietaryNotes: summitReg.dietaryNotes,
          }
        : null,
      unreadNotifications,
    }
  })

  app.patch('/api/v1/member/profile', auth, async (request, reply) => {
    const parsed = profileUpdateSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() })
    }

    const data = parsed.data
    const userId = request.user!.id

    if (data.fullName !== undefined) {
      await prisma.user.update({ where: { id: userId }, data: { fullName: data.fullName } })
    }

    await prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        partyAffiliation: data.partyAffiliation,
        country: data.country,
        bio: data.bio,
        phone: data.phone,
        position: data.position,
        organization: data.organization,
      },
      update: {
        partyAffiliation: data.partyAffiliation,
        country: data.country,
        bio: data.bio,
        phone: data.phone,
        position: data.position,
        organization: data.organization,
      },
    })

    return { ok: true }
  })

  app.post('/api/v1/member/password', auth, async (request, reply) => {
    const parsed = passwordChangeSchema.safeParse(request.body)
    if (!parsed.success) return reply.status(400).send({ error: 'Invalid input' })

    const user = await prisma.user.findUnique({ where: { id: request.user!.id } })
    if (!user) return reply.status(404).send({ error: 'User not found' })

    const valid = await verifyPassword(parsed.data.currentPassword, user.passwordHash)
    if (!valid) return reply.status(401).send({ error: 'Current password is incorrect' })

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: await hashPassword(parsed.data.newPassword) },
    })

    return { ok: true }
  })

  app.post('/api/v1/member/avatar', auth, async (request, reply) => {
    let data = await request.file()
    if (!data) {
      const parts = request.files()
      for await (const part of parts) {
        if (part.type === 'file') {
          data = part
          break
        }
      }
    }
    if (!data) return reply.status(400).send({ error: 'No file uploaded' })

    const buffer = await data.toBuffer()
    if (buffer.length > 5 * 1024 * 1024) {
      return reply.status(400).send({ error: 'File must be under 5MB' })
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(data.mimetype)) {
      return reply.status(400).send({ error: 'Only JPEG, PNG, or WebP images allowed' })
    }

    const url = await saveUpload('avatars', data.filename, buffer)
    await prisma.profile.upsert({
      where: { userId: request.user!.id },
      create: { userId: request.user!.id, avatarUrl: url },
      update: { avatarUrl: url },
    })

    return { ok: true, avatarUrl: url }
  })

  app.post('/api/v1/member/verification', auth, async (request, reply) => {
    const userId = request.user!.id

    const pending = await prisma.memberVerification.findFirst({
      where: { userId, status: VerificationStatus.PENDING },
    })
    if (pending) {
      return reply.status(409).send({ error: 'Verification already pending review' })
    }

    const parts = request.parts()
    let nationalId = ''
    let documentPath: string | null = null

    for await (const part of parts) {
      if (part.type === 'field' && part.fieldname === 'nationalId') {
        nationalId = String(part.value)
      }
      if (part.type === 'file' && part.fieldname === 'document') {
        const buffer = await part.toBuffer()
        if (buffer.length > 10 * 1024 * 1024) {
          return reply.status(400).send({ error: 'Document must be under 10MB' })
        }
        documentPath = await saveUpload('verification', part.filename, buffer)
      }
    }

    const parsed = verificationSubmitSchema.safeParse({ nationalId })
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid national ID' })
    }

    const verification = await prisma.memberVerification.create({
      data: {
        userId,
        nationalId: parsed.data.nationalId,
        documentPath,
        status: VerificationStatus.PENDING,
      },
    })

    await prisma.profile.upsert({
      where: { userId },
      create: { userId, verificationStatus: VerificationStatus.PENDING },
      update: { verificationStatus: VerificationStatus.PENDING },
    })

    return reply.status(201).send({
      ok: true,
      id: verification.id,
      status: 'pending',
    })
  })

  app.put('/api/v1/member/summit-registration', auth, async (request, reply) => {
    const parsed = summitRegistrationSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() })
    }

    const userId = request.user!.id
    const year = parsed.data.summitYear ?? CURRENT_SUMMIT_YEAR

    const hadReg = await prisma.summitRegistration.findUnique({
      where: { userId_summitYear: { userId, summitYear: year } },
    })

    const reg = await prisma.summitRegistration.upsert({
      where: { userId_summitYear: { userId, summitYear: year } },
      create: {
        userId,
        summitYear: year,
        organisation: parsed.data.organisation,
        country: parsed.data.country,
        delegationRole: parsed.data.delegationRole,
        dietaryNotes: parsed.data.dietaryNotes,
      },
      update: {
        organisation: parsed.data.organisation,
        country: parsed.data.country,
        delegationRole: parsed.data.delegationRole,
        dietaryNotes: parsed.data.dietaryNotes,
      },
    })

    if (!hadReg) {
      await createNotification({
        userId,
        kind: 'SUMMIT',
        title: 'Summit registration received',
        body: `Your ${year} delegation registration is on file. The secretariat will confirm your status here.`,
        href: '/member/summit',
      })
    }

    return { ok: true, registration: { id: reg.id, status: reg.status.toLowerCase() } }
  })

  /** Serve uploaded files (avatars, verification docs) */
  app.get('/uploads/*', async (request, reply) => {
    const rel = (request.params as { '*': string })['*']
    if (!rel || rel.includes('..')) {
      return reply.status(400).send({ error: 'Invalid path' })
    }
    const root = process.env.UPLOAD_DIR ?? path.join(process.cwd(), 'uploads')
    const filePath = path.join(root, rel)
    try {
      const buf = await readFile(filePath)
      const ext = path.extname(filePath).toLowerCase()
      const types: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
        '.pdf': 'application/pdf',
      }
      return reply.type(types[ext] ?? 'application/octet-stream').send(buf)
    } catch {
      return reply.status(404).send({ error: 'Not found' })
    }
  })
}
