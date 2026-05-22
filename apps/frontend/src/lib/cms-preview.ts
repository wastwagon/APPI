/** Map CMS slug → public site path (locale prefix added by caller). */
function camelToKebab(segment: string): string {
  return segment
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

export function cmsSlugToPublicPath(slug: string): string | null {
  if (slug === 'home') return '/'
  if (slug === 'nav' || slug === 'footer' || slug === 'shell' || slug === 'media') return '/'
  if (slug === 'content.faq') return '/faq'
  if (slug === 'content.forms') return '/contact'

  if (slug.startsWith('pages.')) {
    const section = slug.slice('pages.'.length)
    return section === 'contact' ? '/contact' : `/${section}`
  }

  if (!slug.startsWith('content.')) return null

  const rest = slug.slice('content.'.length)
  const [section, ...parts] = rest.split('.')
  if (!section) return null

  if (section === 'legal' && parts[0]) {
    return parts[0] === 'accessibility' ? '/accessibility' : `/${parts[0]}`
  }
  if (section === 'contact' && parts[0]) return `/contact/${camelToKebab(parts[0])}`
  if (section === 'about' && parts[0]) return `/about/${camelToKebab(parts[0])}`
  if (section === 'platforms' && parts[0]) return `/platforms/${camelToKebab(parts[0])}`
  if (section === 'engagement' && parts[0]) return `/engagement/${camelToKebab(parts[0])}`
  if (section === 'insights') {
    if (!parts[0]) return '/insights'
    if (parts[0] === 'media') return '/insights/media'
    return `/insights/${camelToKebab(parts[0])}`
  }
  if (section === 'summit') {
    if (!parts[0] || parts[0] === 'main') return '/summit'
    return `/summit/${camelToKebab(parts[0])}`
  }

  return null
}

export function cmsPreviewUrl(slug: string, locale: string): string | null {
  const path = cmsSlugToPublicPath(slug)
  if (!path) return null
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3010'
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  return `${base}${localePrefix}${path}`
}
