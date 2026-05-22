import { config } from 'dotenv'
import { PrismaClient, SiteMode, MediaType, UserRole } from '@prisma/client'
import { importCmsFromMessages } from './import-cms.js'
import bcrypt from 'bcryptjs'
import { mkdir, copyFile, access } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { randomBytes } from 'crypto'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(here, '../../..')
config({ path: path.join(repoRoot, '.env') })

const prisma = new PrismaClient()
const publicImages = path.join(repoRoot, 'apps/frontend/public/images')
const uploadRoot = process.env.UPLOAD_DIR ?? path.join(repoRoot, 'apps/api/uploads')

const SEED_MEDIA: {
  file: string
  folder: string
  title: string
  altText: string
}[] = [
  {
    file: 'appi-launch-event.jpg',
    folder: 'heroes',
    title: 'APPI launch event',
    altText: 'African Political Parties Initiative launch event',
  },
  {
    file: 'appi-logo.png',
    folder: 'branding',
    title: 'APPI logo',
    altText: 'African Political Parties Initiative logo',
  },
  {
    file: 'african-political-parties-summit.jpg',
    folder: 'programmes',
    title: 'African Political Parties Summit',
    altText: 'African Political Parties Summit plenary session',
  },
  {
    file: 'political-academy.jpg',
    folder: 'programmes',
    title: 'Political Academy',
    altText: 'Political Academy for transformative leadership',
  },
  {
    file: 'political-parties.jpg',
    folder: 'programmes',
    title: 'Political parties engagement',
    altText: 'Political party leaders in an APPI programme',
  },
  {
    file: 'youth-and-women.jpg',
    folder: 'programmes',
    title: 'Youth and women',
    altText: 'Youth and women leaders in an APPI engagement session',
  },
  {
    file: 'african-political-parties-summit.jpg',
    folder: 'summit',
    title: 'Summit gallery',
    altText: 'Summit plenary — media library',
  },
  {
    file: 'appi-launch-event.jpg',
    folder: 'press',
    title: 'Press — launch event',
    altText: 'APPI launch event press photo',
  },
]

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: 'default' },
    create: {
      id: 'default',
      siteMode: SiteMode.LIVE,
      constructionTitle: "We'll be right back",
      constructionMessage:
        "We're preparing a new experience for Africa's political parties. Check back soon.",
    },
    update: {},
  })
  console.log('✓ SiteSettings')
}

function allowSeedUsers(): boolean {
  if (process.env.NODE_ENV !== 'production') return true
  return process.env.SEED_ADMIN_ENABLED === 'true'
}

async function seedUserAccount(opts: {
  email: string
  password: string | undefined
  fullName: string
  role: UserRole
  label: string
  loginPath: string
  profile?: {
    country?: string
    organization?: string
    partyAffiliation?: string
  }
}) {
  const frontendPort = process.env.FRONTEND_PORT ?? '3010'
  const email = opts.email.toLowerCase().trim()

  if (!opts.password) {
    console.log(`⊘ ${opts.label} seed skipped (password not set in .env)`)
    return
  }

  if (!allowSeedUsers()) {
    console.log(`⊘ ${opts.label} seed skipped in production (set SEED_ADMIN_ENABLED=true to allow)`)
    return
  }

  const passwordHash = await bcrypt.hash(opts.password, 12)
  const existing = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  })

  const profileData = opts.profile ?? {}

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: {
        role: opts.role,
        passwordHash,
        fullName: opts.fullName,
        profile: existing.profile
          ? { update: profileData }
          : { create: profileData },
      },
    })
    console.log(`✓ ${opts.label} updated: ${email}`)
  } else {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName: opts.fullName,
        role: opts.role,
        profile: { create: profileData },
      },
    })
    console.log(`✓ ${opts.label} created: ${email}`)
  }

  console.log(`  ${opts.label} login: http://localhost:${frontendPort}${opts.loginPath}`)
}

async function seedUsers() {
  await seedUserAccount({
    email: process.env.SEED_ADMIN_EMAIL ?? 'admin@appi.local',
    password: process.env.SEED_ADMIN_PASSWORD,
    fullName: process.env.SEED_ADMIN_NAME ?? 'APPI Admin',
    role: UserRole.ADMIN,
    label: 'Admin',
    loginPath: '/admin/login',
  })

  await seedUserAccount({
    email: process.env.SEED_MEMBER_EMAIL ?? 'member@appi.local',
    password: process.env.SEED_MEMBER_PASSWORD,
    fullName: process.env.SEED_MEMBER_NAME ?? 'Demo Member',
    role: UserRole.PARTY_REP,
    label: 'Member',
    loginPath: '/member/login',
    profile: {
      country: 'Ghana',
      organization: 'Demo Political Party',
      partyAffiliation: 'Demo Political Party',
    },
  })
}

async function seedMediaLibrary() {
  const mediaDir = path.join(uploadRoot, 'media')
  await mkdir(mediaDir, { recursive: true })

  for (const asset of SEED_MEDIA) {
    const src = path.join(publicImages, asset.file)
    try {
      await access(src)
    } catch {
      console.warn(`⊘ Skip ${asset.file} (not found in public/images)`)
      continue
    }

    const existing = await prisma.mediaAsset.findFirst({
      where: { fileName: asset.file, folder: asset.folder },
    })
    if (existing) {
      console.log(`✓ Media already seeded: ${asset.folder}/${asset.file}`)
      continue
    }

    const unique = `${randomBytes(8).toString('hex')}-${asset.file.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    const dest = path.join(mediaDir, unique)
    await copyFile(src, dest)

    const ext = path.extname(asset.file).toLowerCase()
    const mime =
      ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg'

    await prisma.mediaAsset.create({
      data: {
        type: MediaType.IMAGE,
        title: asset.title,
        altText: asset.altText,
        fileName: asset.file,
        filePath: `media/${unique}`,
        url: `/uploads/media/${unique}`,
        mimeType: mime,
        folder: asset.folder,
      },
    })
    console.log(`✓ Media: ${asset.folder}/${asset.file} → /uploads/media/${unique}`)
  }
}

async function main() {
  await seedSiteSettings()
  await seedUsers()
  await seedMediaLibrary()
  const cmsCount = await importCmsFromMessages(prisma)
  console.log(`✓ CMS: ${cmsCount} pages (en/fr/ar)`)
  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
