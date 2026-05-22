/** Resolve a media library URL (path or absolute) for use in next/image or <img> */
export function resolveMediaUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/')) return url
  return `/${url}`
}

export type MediaAsset = {
  id: string
  type: 'image' | 'document' | 'video'
  title: string | null
  altText: string | null
  fileName?: string | null
  url: string
  youtubeId?: string | null
}

export async function fetchMediaAsset(id: string): Promise<MediaAsset | null> {
  const res = await fetch(`/api/v1/media/${id}`, { next: { revalidate: 60 } })
  if (!res.ok) return null
  return res.json()
}
