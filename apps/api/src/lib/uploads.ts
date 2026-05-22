import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { randomBytes } from 'crypto'

const UPLOAD_ROOT = process.env.UPLOAD_DIR ?? path.join(process.cwd(), 'uploads')

export async function saveUpload(
  subdir: string,
  filename: string,
  buffer: Buffer,
  opts?: { forceExtension?: string }
): Promise<string> {
  const base = filename.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.[^.]+$/, '').slice(0, 100)
  const ext = opts?.forceExtension ?? filename.split('.').pop()?.slice(0, 8) ?? 'bin'
  const unique = `${randomBytes(8).toString('hex')}-${base}.${ext}`
  const dir = path.join(UPLOAD_ROOT, subdir)
  await mkdir(dir, { recursive: true })
  const fullPath = path.join(dir, unique)
  await writeFile(fullPath, buffer)
  return `/uploads/${subdir}/${unique}`
}
