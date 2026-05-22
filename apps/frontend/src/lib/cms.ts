import { applyCmsBundle } from './cms-merge'

export type CmsBundle = {
  locale: string
  pages: Record<string, Record<string, unknown>>
}

export async function fetchCmsBundle(locale: string): Promise<CmsBundle | null> {
  const apiBase = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'
  try {
    const res = await fetch(`${apiBase}/api/v1/cms/bundle?locale=${locale}`, {
      next: { revalidate: 10, tags: [`cms-${locale}`] },
    })
    if (!res.ok) return null
    return res.json() as Promise<CmsBundle>
  } catch {
    return null
  }
}

export async function mergeMessagesWithCms(
  messages: Record<string, unknown>,
  locale: string
): Promise<Record<string, unknown>> {
  const bundle = await fetchCmsBundle(locale)
  if (!bundle?.pages || Object.keys(bundle.pages).length === 0) return messages
  return applyCmsBundle(messages, bundle.pages)
}
