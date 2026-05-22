export type CmsFieldKind = 'short' | 'rich' | 'url' | 'media'

const SHORT_KEYS = new Set([
  'title',
  'eyebrow',
  'cta',
  'secondaryCta',
  'imageAlt',
  'memberLink',
  'name',
  'email',
  'send',
  'sending',
  'success',
  'error',
  'outcomesTitle',
  'exploreTitle',
  'formTitle',
  'formEyebrow',
  'formCta',
  'formLead',
  'primaryCta',
  'secondaryCta',
  'discoverAppi',
  'summitCta',
  'viewAll',
  'readMore',
  'register',
  'media',
  'badge',
  'date',
  'stat1',
  'stat2',
  'stat3',
  'stat1Label',
  'stat2Label',
  'stat3Label',
  'aboutTitle',
  'aboutFeature1',
  'aboutFeature2',
  'aboutBadge',
  'pillarsEyebrow',
  'pillarsTitle',
  'ctaTitle',
  'ctaContact',
  'ctaSummit',
  'newsletterTitle',
  'newsletterCta',
  'newsletterEmailLabel',
  'newsletterPlaceholder',
  'newsletterSubmitting',
  'newsletterSuccess',
  'newsletterError',
  'officeTitle',
  'submit',
  'submitting',
  'submitInterest',
  'submitRegistration',
  'registerSuccess',
  'registrationSaved',
  'delegationRole',
  'delegationRolePlaceholder',
  'dietaryNotes',
  'organisation',
  'country',
  'message',
  'fullName',
  'partyOrg',
])

const RICH_KEYS = new Set([
  'lead',
  'description',
  'subtitle',
  'p1',
  'p2',
  'text',
  'tagline',
  'formDescription',
  'memberHint',
  'memberSubmitNote',
  'exploreDesc',
  'officeDesc',
  'aboutLead',
  'pillarSummitDesc',
  'pillarAcademyDesc',
  'pillarReformDesc',
  'pillarInclusiveDesc',
  'pillarAfctaDesc',
  'ctaDesc',
  'newsletterDesc',
  'toolkitDesc',
  'pressDesc',
  'formLead',
])

export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function cmsFieldKind(key: string, value: unknown): CmsFieldKind | 'nested' | 'skip' {
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
    return isPlainObject(value) ? 'nested' : 'skip'
  }
  if (typeof value !== 'string') return 'skip'

  if (key === 'listItems') return 'skip'
  if (/ImageUrl$|^heroImage$|^featuredImage$|^imageSrc$/i.test(key)) return 'media'
  if (key.endsWith('Href') || key === 'href' || (key.endsWith('Url') && key !== 'imageUrl')) return 'url'
  if (key === 'imageUrl' || key === 'mediaUrl') return 'media'
  if (/^bullet\d+$/.test(key) || /^q\d+$/.test(key) || /^a\d+$/.test(key)) return 'rich'
  if (RICH_KEYS.has(key) || key.endsWith('Desc') || key.endsWith('Lead')) return 'rich'
  if (SHORT_KEYS.has(key) || key.endsWith('Title') || key.endsWith('Label') || key.endsWith('Cta')) {
    return 'short'
  }
  if (value.length > 120 || value.includes('\n') || /<[a-z][\s\S]*>/i.test(value)) return 'rich'
  return 'short'
}

export const CMS_FIELD_LABELS: Record<string, string> = {
  eyebrow: 'Eyebrow',
  title: 'Title',
  lead: 'Lead paragraph',
  description: 'Description',
  subtitle: 'Subtitle',
  outcomesTitle: 'Outcomes heading',
  imageAlt: 'Image alt text',
  cta: 'Primary button label',
  ctaHref: 'Primary button link',
  secondaryCta: 'Secondary button label',
  secondaryCtaHref: 'Secondary button link',
  formTitle: 'Form title',
  formDescription: 'Form description',
  memberHint: 'Member hint',
  memberLink: 'Member link text',
  memberSubmitNote: 'Member submit note',
  exploreTitle: 'Explore section title',
  exploreDesc: 'Explore section description',
  tagline: 'Tagline',
  p1: 'Paragraph 1',
  p2: 'Paragraph 2',
  text: 'Body text',
}

export function cmsFieldLabel(key: string): string {
  if (CMS_FIELD_LABELS[key]) return CMS_FIELD_LABELS[key]
  const bullet = key.match(/^bullet(\d+)$/)
  if (bullet) return `Bullet point ${bullet[1]}`
  const q = key.match(/^q(\d+)$/)
  if (q) return `Question ${q[1]}`
  const a = key.match(/^a(\d+)$/)
  if (a) return `Answer ${a[1]}`
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
}

export function normalizeRichHtml(html: string): string {
  const t = html.trim()
  if (!t || t === '<p></p>' || t === '<p><br></p>') return ''
  return t
}
