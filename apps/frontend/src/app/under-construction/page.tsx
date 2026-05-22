import Image from 'next/image'
import Link from 'next/link'

async function getConstructionCopy() {
  const apiBase = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'
  try {
    const res = await fetch(`${apiBase}/api/v1/site/status`, { next: { revalidate: 30 } })
    if (!res.ok) return null
    return res.json() as Promise<{
      constructionTitle?: string | null
      constructionMessage?: string | null
    }>
  } catch {
    return null
  }
}

export default async function UnderConstructionPage() {
  const settings = await getConstructionCopy()
  const title = settings?.constructionTitle ?? "We'll be right back"
  const message =
    settings?.constructionMessage ??
    "We're preparing a new experience for Africa's political parties. Check back soon."

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-blue via-[#0c4568] to-accent-teal"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.15), transparent), radial-gradient(ellipse 40% 40% at 100% 100%, rgba(196,92,38,0.2), transparent)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-lg text-center">
        <div className="rounded-3xl border border-white/15 bg-white/5 p-10 shadow-lift backdrop-blur-md sm:p-12">
          <Image
            src="/images/appi-logo.png"
            alt="African Political Parties Initiative"
            width={180}
            height={72}
            className="mx-auto h-14 w-auto brightness-0 invert"
            priority
          />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-accent-gold">
            African Political Parties Initiative
          </p>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">{message}</p>
          <p className="mt-10 text-sm text-white/60">
            Secretariat staff may{' '}
            <Link href="/admin/login" className="font-semibold text-white underline underline-offset-4 hover:text-accent-gold">
              sign in here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
