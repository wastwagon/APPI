import './load-env.js'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'
import multipart from '@fastify/multipart'
import { healthRoutes } from './routes/health.js'
import { formRoutes } from './routes/forms.js'
import { adminRoutes } from './routes/admin.js'
import { authRoutes } from './routes/auth.js'
import { memberRoutes } from './routes/member.js'
import { mediaRoutes } from './routes/media.js'
import { siteRoutes } from './routes/site.js'
import { cmsRoutes } from './routes/cms.js'
import { newsletterRoutes } from './routes/newsletter.js'
import { notificationRoutes } from './routes/notifications.js'

const port = Number(process.env.PORT ?? 4000)
const host = process.env.HOST ?? '0.0.0.0'

const app = Fastify({ logger: true })

await app.register(cors, {
  origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) ?? true,
  credentials: true,
})
await app.register(sensible)
await app.register(multipart, { limits: { fileSize: 10 * 1024 * 1024 } })

await app.register(healthRoutes)
await app.register(formRoutes)
await app.register(adminRoutes)
await app.register(authRoutes)
await app.register(memberRoutes)
await app.register(mediaRoutes)
await app.register(siteRoutes)
await app.register(cmsRoutes)
await app.register(newsletterRoutes)
await app.register(notificationRoutes)

try {
  await app.listen({ port, host })
  app.log.info(`API listening on http://${host}:${port}`)
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
