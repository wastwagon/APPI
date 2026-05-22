import type { FastifyInstance } from 'fastify'
import { prisma, type Prisma } from '@appi/database'
import { cmsPagePatchSchema, cmsPageUpsertSchema, cmsLocaleSchema } from '@appi/shared'
import { adminPreHandler } from '../plugins/require-admin.js'
import { importCmsFromMessages } from '@appi/database'

function formatPage(row: {
  id: string
  slug: string
  locale: string
  fields: unknown
  published: boolean
  updatedAt: Date
}) {
  return {
    id: row.id,
    slug: row.slug,
    locale: row.locale,
    fields: row.fields as Record<string, unknown>,
    published: row.published,
    updatedAt: row.updatedAt.toISOString(),
  }
}

export async function cmsRoutes(app: FastifyInstance) {
  const admin = { preHandler: [adminPreHandler] }

  app.get('/api/v1/cms/bundle', async (request, reply) => {
    const locale = (request.query as { locale?: string }).locale ?? 'en'
    const parsed = cmsLocaleSchema.safeParse(locale)
    if (!parsed.success) return reply.status(400).send({ error: 'Invalid locale' })

    const rows = await prisma.cmsPage.findMany({
      where: { locale: parsed.data, published: true },
      select: { slug: true, fields: true },
    })

    const pages: Record<string, Record<string, unknown>> = {}
    for (const row of rows) {
      pages[row.slug] = row.fields as Record<string, unknown>
    }

    return { locale: parsed.data, pages }
  })

  app.get('/api/v1/cms/pages/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string }
    const locale = (request.query as { locale?: string }).locale ?? 'en'
    const parsedLocale = cmsLocaleSchema.safeParse(locale)
    if (!parsedLocale.success) return reply.status(400).send({ error: 'Invalid locale' })

    const page = await prisma.cmsPage.findUnique({
      where: { slug_locale: { slug, locale: parsedLocale.data } },
    })
    if (!page || !page.published) return reply.status(404).send({ error: 'Not found' })

    return formatPage(page)
  })

  app.get('/api/v1/admin/cms/pages', admin, async (request) => {
    const locale = (request.query as { locale?: string }).locale ?? 'en'
    const parsed = cmsLocaleSchema.safeParse(locale)
    if (!parsed.success) return { error: 'Invalid locale', items: [] }

    const items = await prisma.cmsPage.findMany({
      where: { locale: parsed.data },
      orderBy: [{ slug: 'asc' }],
    })

    return {
      locale: parsed.data,
      items: items.map((row) => ({
        id: row.id,
        slug: row.slug,
        locale: row.locale,
        published: row.published,
        updatedAt: row.updatedAt.toISOString(),
        fieldCount: Object.keys(row.fields as object).length,
      })),
    }
  })

  app.get('/api/v1/admin/cms/pages/:slug', admin, async (request, reply) => {
    const { slug } = request.params as { slug: string }
    const locale = (request.query as { locale?: string }).locale ?? 'en'
    const parsed = cmsLocaleSchema.safeParse(locale)
    if (!parsed.success) return reply.status(400).send({ error: 'Invalid locale' })

    const page = await prisma.cmsPage.findUnique({
      where: { slug_locale: { slug, locale: parsed.data } },
    })
    if (!page) return reply.status(404).send({ error: 'Not found' })

    return formatPage(page)
  })

  app.put('/api/v1/admin/cms/pages', admin, async (request, reply) => {
    const parsed = cmsPageUpsertSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() })
    }

    const { slug, locale, fields, published } = parsed.data
    const jsonFields = fields as Prisma.InputJsonValue
    const page = await prisma.cmsPage.upsert({
      where: { slug_locale: { slug, locale } },
      create: {
        slug,
        locale,
        fields: jsonFields,
        published: published ?? true,
      },
      update: {
        fields: jsonFields,
        ...(published !== undefined ? { published } : {}),
      },
    })

    return formatPage(page)
  })

  app.patch('/api/v1/admin/cms/pages/:slug', admin, async (request, reply) => {
    const { slug } = request.params as { slug: string }
    const locale = (request.query as { locale?: string }).locale ?? 'en'
    const parsedLocale = cmsLocaleSchema.safeParse(locale)
    if (!parsedLocale.success) return reply.status(400).send({ error: 'Invalid locale' })

    const parsed = cmsPagePatchSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() })
    }

    const existing = await prisma.cmsPage.findUnique({
      where: { slug_locale: { slug, locale: parsedLocale.data } },
    })
    if (!existing) return reply.status(404).send({ error: 'Not found' })

    const page = await prisma.cmsPage.update({
      where: { slug_locale: { slug, locale: parsedLocale.data } },
      data: {
        ...(parsed.data.fields !== undefined
          ? { fields: parsed.data.fields as Prisma.InputJsonValue }
          : {}),
        ...(parsed.data.published !== undefined ? { published: parsed.data.published } : {}),
      },
    })

    return formatPage(page)
  })

  app.post('/api/v1/admin/cms/import', admin, async () => {
    const count = await importCmsFromMessages(prisma)
    return { ok: true, imported: count }
  })

  /** Preview merged messages for a locale (admin only) */
  app.get('/api/v1/admin/cms/preview-bundle', admin, async (request) => {
    const locale = (request.query as { locale?: string }).locale ?? 'en'
    const parsed = cmsLocaleSchema.safeParse(locale)
    if (!parsed.success) return { error: 'Invalid locale' }

    const rows = await prisma.cmsPage.findMany({
      where: { locale: parsed.data },
      select: { slug: true, fields: true, published: true },
    })

    const pages: Record<string, Record<string, unknown>> = {}
    for (const row of rows) {
      if (row.published) pages[row.slug] = row.fields as Record<string, unknown>
    }

    return { locale: parsed.data, pageCount: Object.keys(pages).length, slugs: Object.keys(pages).sort() }
  })
}
