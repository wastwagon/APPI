import { resolveMediaUrl, type MediaAsset } from './media'

export async function fetchMediaByFolder(
  folder: string,
  options?: { type?: 'image' | 'document' | 'video'; take?: number }
): Promise<MediaAsset[]> {
  const apiBase = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'
  const params = new URLSearchParams({ folder, take: String(options?.take ?? 24) })
  if (options?.type) params.set('type', options.type)

  try {
    const res = await fetch(`${apiBase}/api/v1/media?${params}`, { next: { revalidate: 120 } })
    if (!res.ok) return []
    const data = (await res.json()) as { items: MediaAsset[] }
    return data.items ?? []
  } catch {
    return []
  }
}

export function mediaPublicUrl(url: string): string {
  return resolveMediaUrl(url)
}
