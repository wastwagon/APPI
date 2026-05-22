/** Extract YouTube video ID from common URL formats */
export function parseYoutubeId(raw: string): string | null {
  try {
    const url = new URL(raw.trim())
    const host = url.hostname.replace(/^www\./, '')
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = url.searchParams.get('v')
      if (v) return v
      const embed = url.pathname.match(/^\/embed\/([^/?]+)/)
      if (embed) return embed[1]
    }
    if (host === 'youtu.be') {
      const id = url.pathname.replace(/^\//, '').split('/')[0]
      return id || null
    }
  } catch {
    return null
  }
  return null
}

export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube.com/embed/${id}`
}
