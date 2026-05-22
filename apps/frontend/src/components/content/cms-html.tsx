import DOMPurify from 'isomorphic-dompurify'
import { cn } from '@/lib/utils'

const SANITIZE_OPTS = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'blockquote', 'img'],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'src', 'alt', 'width', 'height'],
}

const PROSE =
  'cms-html [&_a]:font-medium [&_a]:text-accent-blue [&_a]:no-underline hover:[&_a]:underline [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_h2]:tracking-tight [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_img]:my-4 max-h-96 w-auto max-w-full rounded-lg [&_li]:leading-relaxed [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:ps-5 [&_p]:leading-relaxed [&_p+p]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:ps-5'

function looksLikeHtml(s: string): boolean {
  return /<[a-z][\s\S]*>/i.test(s.trim())
}

type CmsHtmlProps = {
  html: string
  className?: string
  /** Plain-text fallback wrapper when content has no HTML tags */
  as?: 'div' | 'p' | 'span'
}

export function CmsHtml({ html, className, as: Tag = 'div' }: CmsHtmlProps) {
  const trimmed = html.trim()
  if (!trimmed) return null

  if (!looksLikeHtml(trimmed)) {
    return <Tag className={className}>{trimmed}</Tag>
  }

  const clean = DOMPurify.sanitize(trimmed, SANITIZE_OPTS)

  return (
    <Tag
      className={cn(PROSE, className)}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}

/** Strip tags for short previews (cards, meta). */
export function cmsPlainText(html: string): string {
  const trimmed = html.trim()
  if (!trimmed) return ''
  if (!looksLikeHtml(trimmed)) return trimmed
  return DOMPurify.sanitize(trimmed, { ALLOWED_TAGS: [] }).replace(/\s+/g, ' ').trim()
}
