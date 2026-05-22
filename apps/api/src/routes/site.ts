import type { FastifyInstance } from 'fastify'
import { prisma, SiteMode } from '@appi/database'
import { siteSettingsSchema } from '@appi/shared'
import { adminPreHandler } from '../plugins/require-admin.js'
import { runMigrations, runSeed } from '../lib/ops.js'

async function getOrCreateSettings() {
  return prisma.siteSettings.upsert({
    where: { id: 'default' },
    create: { id: 'default', siteMode: SiteMode.LIVE },
    update: {},
  })
}

function formatSettings(s: {
  siteMode: SiteMode
  constructionTitle: string | null
  constructionMessage: string | null
  updatedAt: Date
}) {
  return {
    siteMode: s.siteMode === SiteMode.UNDER_CONSTRUCTION ? 'under_construction' : 'live',
    constructionTitle: s.constructionTitle,
    constructionMessage: s.constructionMessage,
    updatedAt: s.updatedAt,
  }
}

export async function siteRoutes(app: FastifyInstance) {
  const admin = { preHandler: [adminPreHandler] }

  /** Public — used by Next.js middleware */
  app.get('/api/v1/site/status', async () => {
    const settings = await getOrCreateSettings()
    return formatSettings(settings)
  })

  /** Public — homepage / status (non-sensitive aggregates) */
  app.get('/api/v1/site/stats', async () => {
    const [memberAccounts, summitRegistrations, formSubmissions] = await Promise.all([
      prisma.user.count(),
      prisma.summitRegistration.count(),
      prisma.formSubmission.count(),
    ])

    return {
      memberAccounts,
      summitRegistrations,
      formSubmissions,
      updatedAt: new Date().toISOString(),
    }
  })

  app.get('/api/v1/admin/settings', admin, async () => {
    const settings = await getOrCreateSettings()
    return formatSettings(settings)
  })

  app.patch('/api/v1/admin/settings', admin, async (request, reply) => {
    const parsed = siteSettingsSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() })
    }

    const mode =
      parsed.data.siteMode === 'under_construction'
        ? SiteMode.UNDER_CONSTRUCTION
        : parsed.data.siteMode === 'live'
          ? SiteMode.LIVE
          : undefined

    await getOrCreateSettings()
    const settings = await prisma.siteSettings.update({
      where: { id: 'default' },
      data: {
        ...(mode !== undefined ? { siteMode: mode } : {}),
        ...(parsed.data.constructionTitle !== undefined
          ? { constructionTitle: parsed.data.constructionTitle }
          : {}),
        ...(parsed.data.constructionMessage !== undefined
          ? { constructionMessage: parsed.data.constructionMessage }
          : {}),
      },
    })

    return formatSettings(settings)
  })

  app.post('/api/v1/admin/ops/migrate', admin, async () => {
    const result = await runMigrations()
    return { ok: result.ok, output: result.output }
  })

  app.post('/api/v1/admin/ops/seed', admin, async () => {
    const result = await runSeed()
    return { ok: result.ok, output: result.output }
  })
}
