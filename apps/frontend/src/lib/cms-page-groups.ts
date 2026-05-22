/** CMS slugs that edit global chrome / form labels — not page content. */
export const CMS_CHROME_SLUGS = new Set(['nav', 'footer', 'shell', 'forms', 'media', 'home'])

export function isMarketingCmsSlug(slug: string): boolean {
  return slug.startsWith('content.') || slug.startsWith('pages.')
}

export function isChromeCmsSlug(slug: string): boolean {
  return CMS_CHROME_SLUGS.has(slug)
}
