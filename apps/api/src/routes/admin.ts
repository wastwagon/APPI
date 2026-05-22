import type { FastifyInstance } from 'fastify'
import { prisma, UserRole, VerificationStatus, FormSubmissionStatus } from '@appi/database'
import { adminPreHandler, adminOrKeyPreHandler } from '../plugins/require-admin.js'
import { createNotification } from '../lib/notifications.js'
import { leadStatusUpdateSchema, notificationBroadcastSchema } from '@appi/shared'

const LEAD_STATUS_MAP: Record<string, FormSubmissionStatus> = {
  new: FormSubmissionStatus.NEW,
  read: FormSubmissionStatus.READ,
  archived: FormSubmissionStatus.ARCHIVED,
}

function leadStatusToApi(status: FormSubmissionStatus): 'new' | 'read' | 'archived' {
  return status.toLowerCase() as 'new' | 'read' | 'archived'
}

function serializeLead(row: {
  id: string
  formType: string
  payload: unknown
  status: FormSubmissionStatus
  readAt: Date | null
  sourceIp: string | null
  createdAt: Date
}) {
  return {
    id: row.id,
    formType: row.formType,
    payload: row.payload as Record<string, unknown>,
    status: leadStatusToApi(row.status),
    readAt: row.readAt?.toISOString() ?? null,
    sourceIp: row.sourceIp,
    createdAt: row.createdAt.toISOString(),
  }
}

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`
  return value
}

export async function adminRoutes(app: FastifyInstance) {
  const admin = { preHandler: [adminPreHandler] }
  const adminOrKey = { preHandler: [adminOrKeyPreHandler] }

  app.get('/api/v1/admin/stats', admin, async () => {
    const [members, pendingVerifications, leads, summitRegs] = await Promise.all([
      prisma.user.count(),
      prisma.memberVerification.count({ where: { status: VerificationStatus.PENDING } }),
      prisma.formSubmission.count(),
      prisma.summitRegistration.count(),
    ])

    return {
      members,
      pendingVerifications,
      leads,
      summitRegistrations: summitRegs,
    }
  })

  app.get('/api/v1/admin/leads', adminOrKey, async (request) => {
    const q = request.query as { formType?: string; status?: string; limit?: string }
    const limit = Math.min(Math.max(parseInt(q.limit ?? '100', 10) || 100, 1), 500)
    const statusFilter = q.status?.trim().toLowerCase()
    const status =
      statusFilter && LEAD_STATUS_MAP[statusFilter] ? LEAD_STATUS_MAP[statusFilter] : undefined

    const items = await prisma.formSubmission.findMany({
      where: {
        ...(q.formType?.trim() ? { formType: q.formType.trim() } : {}),
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
    return { items: items.map(serializeLead) }
  })

  app.patch('/api/v1/admin/leads/:id', admin, async (request, reply) => {
    const { id } = request.params as { id: string }
    const parsed = leadStatusUpdateSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() })
    }

    const nextStatus = LEAD_STATUS_MAP[parsed.data.status]
    const existing = await prisma.formSubmission.findUnique({ where: { id } })
    if (!existing) return reply.status(404).send({ error: 'Not found' })

    const readAt =
      nextStatus === FormSubmissionStatus.READ
        ? (existing.readAt ?? new Date())
        : nextStatus === FormSubmissionStatus.NEW
          ? null
          : existing.readAt

    const updated = await prisma.formSubmission.update({
      where: { id },
      data: { status: nextStatus, readAt },
    })
    return { item: serializeLead(updated) }
  })

  app.get('/api/v1/admin/leads/export', adminOrKey, async (request, reply) => {
    const q = request.query as { formType?: string; status?: string }
    const statusFilter = q.status?.trim().toLowerCase()
    const status =
      statusFilter && LEAD_STATUS_MAP[statusFilter] ? LEAD_STATUS_MAP[statusFilter] : undefined

    const items = await prisma.formSubmission.findMany({
      where: {
        ...(q.formType?.trim() ? { formType: q.formType.trim() } : {}),
        ...(status ? { status } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 5000,
    })

    const headers = ['id', 'formType', 'status', 'createdAt', 'readAt', 'sourceIp', 'payload']
    const lines = [
      headers.join(','),
      ...items.map((row) =>
        [
          row.id,
          row.formType,
          leadStatusToApi(row.status),
          row.createdAt.toISOString(),
          row.readAt?.toISOString() ?? '',
          row.sourceIp ?? '',
          JSON.stringify(row.payload),
        ]
          .map((v) => csvEscape(String(v)))
          .join(',')
      ),
    ]

    reply.header('Content-Type', 'text/csv; charset=utf-8')
    reply.header('Content-Disposition', 'attachment; filename="leads-export.csv"')
    return lines.join('\n')
  })

  app.get('/api/v1/admin/members', admin, async (request) => {
    const q = (request.query as { search?: string }).search?.trim()
    const users = await prisma.user.findMany({
      where: q
        ? {
            OR: [
              { email: { contains: q, mode: 'insensitive' } },
              { fullName: { contains: q, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { profile: true },
    })

    return {
      items: users.map((u) => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        role: u.role.toLowerCase(),
        createdAt: u.createdAt,
        profile: u.profile,
      })),
    }
  })

  app.patch('/api/v1/admin/members/:id', admin, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = request.body as { role?: string }
    const roleMap: Record<string, UserRole> = {
      admin: UserRole.ADMIN,
      party_rep: UserRole.PARTY_REP,
      fellow: UserRole.FELLOW,
      observer: UserRole.OBSERVER,
      public: UserRole.PUBLIC,
    }
    if (!body.role || !roleMap[body.role]) {
      return reply.status(400).send({ error: 'Invalid role' })
    }
    const user = await prisma.user.update({
      where: { id },
      data: { role: roleMap[body.role] },
      include: { profile: true },
    })
    return { ok: true, user: { id: user.id, email: user.email, role: body.role } }
  })

  app.get('/api/v1/admin/summit-registrations', admin, async () => {
    const items = await prisma.summitRegistration.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        user: { select: { id: true, email: true, fullName: true } },
      },
    })
    return {
      items: items.map((r) => ({
        id: r.id,
        status: r.status.toLowerCase(),
        summitYear: r.summitYear,
        organisation: r.organisation,
        country: r.country,
        delegationRole: r.delegationRole,
        dietaryNotes: r.dietaryNotes,
        createdAt: r.createdAt,
        user: r.user,
      })),
    }
  })

  app.get('/api/v1/admin/verifications', admin, async () => {
    const items = await prisma.memberVerification.findMany({
      where: { status: VerificationStatus.PENDING },
      orderBy: { submittedAt: 'asc' },
      include: { user: { select: { id: true, email: true, fullName: true } } },
      take: 50,
    })
    return {
      items: items.map((v) => ({
        id: v.id,
        userId: v.userId,
        email: v.user.email,
        fullName: v.user.fullName,
        nationalId: v.nationalId,
        documentPath: v.documentPath,
        submittedAt: v.submittedAt,
      })),
    }
  })

  app.post('/api/v1/admin/verifications/:id/review', admin, async (request, reply) => {
    const { id } = request.params as { id: string }
    const body = request.body as { action?: 'approve' | 'reject'; notes?: string }
    if (!body?.action || !['approve', 'reject'].includes(body.action)) {
      return reply.status(400).send({ error: 'action must be approve or reject' })
    }

    const verification = await prisma.memberVerification.findUnique({ where: { id } })
    if (!verification) return reply.status(404).send({ error: 'Not found' })

    const status =
      body.action === 'approve' ? VerificationStatus.APPROVED : VerificationStatus.REJECTED

    await prisma.memberVerification.update({
      where: { id },
      data: { status, adminNotes: body.notes, reviewedAt: new Date() },
    })

    await prisma.profile.update({
      where: { userId: verification.userId },
      data: { verificationStatus: status },
    })

    if (body.action === 'approve') {
      await prisma.user.update({
        where: { id: verification.userId },
        data: { role: UserRole.FELLOW },
      })
    }

    await createNotification({
      userId: verification.userId,
      kind: 'VERIFICATION',
      title:
        body.action === 'approve' ? 'Identity verified' : 'Verification update',
      body:
        body.action === 'approve'
          ? 'Your identity is verified. Full programme and summit tools are now available.'
          : body.notes ?? 'Your verification was not approved. Update documents in settings.',
      href: '/member/settings?tab=verification',
    })

    return { ok: true, status: status.toLowerCase() }
  })

  app.post('/api/v1/admin/notifications/broadcast', admin, async (request, reply) => {
    const parsed = notificationBroadcastSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input' })
    }

    const kind = (parsed.data.kind ?? 'ANNOUNCEMENT') as 'SYSTEM' | 'ANNOUNCEMENT' | 'SUMMIT'

    let userIds: string[] = parsed.data.userIds ?? []
    if (parsed.data.allMembers) {
      const users = await prisma.user.findMany({
        where: { role: { not: 'ADMIN' } },
        select: { id: true },
      })
      userIds = users.map((u) => u.id)
    }

    if (!userIds.length) {
      return reply.status(400).send({ error: 'No recipients' })
    }

    await prisma.notification.createMany({
      data: userIds.map((userId) => ({
        userId,
        kind,
        title: parsed.data.title,
        body: parsed.data.body,
        href: parsed.data.href,
      })),
    })

    return { ok: true, sent: userIds.length }
  })
}
