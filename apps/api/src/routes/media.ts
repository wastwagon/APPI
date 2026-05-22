import type { FastifyInstance } from 'fastify'
import { prisma, MediaType } from '@appi/database'
import { mediaYoutubeSchema, mediaUpdateSchema } from '@appi/shared'
import { adminPreHandler } from '../plugins/require-admin.js'
import { saveUpload } from '../lib/uploads.js'
import { optimizeImageUpload } from '../lib/image-optimize.js'
import { parseYoutubeId, youtubeWatchUrl } from '../lib/youtube.js'
import { unlink } from 'fs/promises'
import path from 'path'

const IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const DOC_TYPES = new Set(['application/pdf'])

function formatAsset(a: {
  id: string
  type: MediaType
  title: string | null
  altText: string | null
  caption: string | null
  fileName: string | null
  filePath: string | null
  url: string
  mimeType: string | null
  fileSize: number | null
  folder: string
  youtubeId: string | null
  createdAt: Date
}) {
  return {
    id: a.id,
    type: a.type.toLowerCase(),
    title: a.title,
    altText: a.altText,
    caption: a.caption,
    fileName: a.fileName,
    url: a.url,
    mimeType: a.mimeType,
    fileSize: a.fileSize,
    folder: a.folder,
    youtubeId: a.youtubeId,
    createdAt: a.createdAt,
  }
}

export async function mediaRoutes(app: FastifyInstance) {
  const admin = { preHandler: [adminPreHandler] }

  /** Public list for frontend helpers (read-only) */
  app.get('/api/v1/media', async (request) => {
    const q = request.query as {
      type?: string
      folder?: string
      search?: string
      take?: string
    }
    const take = Math.min(Number(q.take) || 50, 100)
    const typeFilter =
      q.type === 'image'
        ? MediaType.IMAGE
        : q.type === 'document'
          ? MediaType.DOCUMENT
          : q.type === 'video'
            ? MediaType.VIDEO
            : undefined

    const items = await prisma.mediaAsset.findMany({
      where: {
        type: typeFilter,
        folder: q.folder || undefined,
        OR: q.search
          ? [
              { title: { contains: q.search, mode: 'insensitive' } },
              { fileName: { contains: q.search, mode: 'insensitive' } },
              { altText: { contains: q.search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      orderBy: { createdAt: 'desc' },
      take,
    })

    return { items: items.map(formatAsset) }
  })

  app.get('/api/v1/media/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const asset = await prisma.mediaAsset.findUnique({ where: { id } })
    if (!asset) return reply.status(404).send({ error: 'Not found' })
    return formatAsset(asset)
  })

  app.post('/api/v1/media', admin, async (request, reply) => {
    const data = await request.file({ limits: { fileSize: 20 * 1024 * 1024 } })
    if (!data) return reply.status(400).send({ error: 'No file uploaded' })

    const mime = data.mimetype
    let type: MediaType
    if (IMAGE_TYPES.has(mime)) type = MediaType.IMAGE
    else if (DOC_TYPES.has(mime)) type = MediaType.DOCUMENT
    else {
      return reply.status(400).send({ error: 'Only images (JPEG, PNG, WebP, GIF) and PDF documents are allowed' })
    }

    let buffer = await data.toBuffer()
    let mimeType = mime
    let storedName = data.filename

    if (type === MediaType.IMAGE) {
      const optimized = await optimizeImageUpload(buffer, mime)
      buffer = optimized.buffer
      mimeType = optimized.mimeType
      storedName = data.filename.replace(/\.[^.]+$/, `.${optimized.extension}`)
    }

    const folderField = (data.fields?.folder as { value?: string } | undefined)?.value
    const folder = (typeof folderField === 'string' ? folderField : 'general').slice(0, 64)
    const titleField = (data.fields?.title as { value?: string } | undefined)?.value
    const altField = (data.fields?.altText as { value?: string } | undefined)?.value

    const ext = storedName.includes('.') ? storedName.split('.').pop() : undefined
    const publicPath = await saveUpload('media', storedName, buffer, {
      forceExtension: ext,
    })

    const asset = await prisma.mediaAsset.create({
      data: {
        type,
        title: typeof titleField === 'string' ? titleField.slice(0, 200) : data.filename,
        altText: typeof altField === 'string' ? altField.slice(0, 300) : undefined,
        fileName: storedName,
        filePath: publicPath.replace(/^\/uploads\//, ''),
        url: publicPath,
        mimeType,
        fileSize: buffer.length,
        folder,
        uploadedById: request.user!.id,
      },
    })

    return reply.status(201).send(formatAsset(asset))
  })

  app.post('/api/v1/media/youtube', admin, async (request, reply) => {
    const parsed = mediaYoutubeSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() })
    }

    const youtubeId = parseYoutubeId(parsed.data.url)
    if (!youtubeId) {
      return reply.status(400).send({ error: 'Invalid YouTube URL' })
    }

    const asset = await prisma.mediaAsset.create({
      data: {
        type: MediaType.VIDEO,
        title: parsed.data.title ?? `YouTube ${youtubeId}`,
        caption: parsed.data.caption,
        url: youtubeWatchUrl(youtubeId),
        youtubeId,
        folder: parsed.data.folder ?? 'videos',
        uploadedById: request.user!.id,
      },
    })

    return reply.status(201).send(formatAsset(asset))
  })

  app.patch('/api/v1/media/:id', admin, async (request, reply) => {
    const { id } = request.params as { id: string }
    const parsed = mediaUpdateSchema.safeParse(request.body)
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.flatten() })
    }

    const existing = await prisma.mediaAsset.findUnique({ where: { id } })
    if (!existing) return reply.status(404).send({ error: 'Not found' })

    const asset = await prisma.mediaAsset.update({
      where: { id },
      data: {
        title: parsed.data.title,
        altText: parsed.data.altText,
        caption: parsed.data.caption,
        folder: parsed.data.folder,
      },
    })

    return formatAsset(asset)
  })

  app.delete('/api/v1/media/:id', admin, async (request, reply) => {
    const { id } = request.params as { id: string }
    const existing = await prisma.mediaAsset.findUnique({ where: { id } })
    if (!existing) return reply.status(404).send({ error: 'Not found' })

    if (existing.filePath) {
      const root = process.env.UPLOAD_DIR ?? path.join(process.cwd(), 'uploads')
      const full = path.join(root, existing.filePath)
      try {
        await unlink(full)
      } catch {
        /* file may already be gone */
      }
    }

    await prisma.mediaAsset.delete({ where: { id } })
    return { ok: true }
  })
}
