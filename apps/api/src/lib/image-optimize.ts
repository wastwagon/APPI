import sharp from 'sharp'

const OPTIMIZE_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export async function optimizeImageUpload(
  buffer: Buffer,
  mime: string
): Promise<{ buffer: Buffer; mimeType: string; extension: string }> {
  if (!OPTIMIZE_MIMES.has(mime)) {
    const ext = mime === 'application/pdf' ? 'pdf' : 'bin'
    return { buffer, mimeType: mime, extension: ext }
  }

  try {
    const webp = await sharp(buffer)
      .rotate()
      .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toBuffer()

    return { buffer: webp, mimeType: 'image/webp', extension: 'webp' }
  } catch {
    return {
      buffer,
      mimeType: mime,
      extension: mime.includes('png') ? 'png' : mime.includes('webp') ? 'webp' : 'jpg',
    }
  }
}
