import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const secret = request.headers.get('x-revalidate-secret')
  const expected = process.env.REVALIDATE_SECRET
  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json().catch(() => ({}))) as { locale?: string }
  if (body.locale) {
    revalidateTag(`cms-${body.locale}`)
  } else {
    for (const locale of ['en', 'fr', 'ar']) {
      revalidateTag(`cms-${locale}`)
    }
  }

  return NextResponse.json({ ok: true, revalidated: body.locale ?? 'all' })
}
