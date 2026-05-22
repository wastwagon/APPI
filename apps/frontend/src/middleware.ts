import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

const NON_LOCALIZED_PREFIXES = [
  '/admin',
  '/member',
  '/api',
  '/uploads',
  '/under-construction',
  '/_next',
  '/images',
  '/favicon',
]

function isNonLocalized(pathname: string): boolean {
  return NON_LOCALIZED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

async function applyConstructionMode(request: NextRequest, response: NextResponse) {
  const apiBase = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'

  try {
    const res = await fetch(`${apiBase}/api/v1/site/status`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 15 },
    })

    if (res.ok) {
      const data = (await res.json()) as { siteMode?: string }
      if (data.siteMode === 'under_construction') {
        const url = request.nextUrl.clone()
        url.pathname = '/under-construction'
        return NextResponse.rewrite(url)
      }
    }
  } catch {
    /* fail open */
  }

  return response
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isNonLocalized(pathname)) {
    return NextResponse.next()
  }

  return applyConstructionMode(request, intlMiddleware(request))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
