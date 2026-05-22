import Image from 'next/image'
import Link from 'next/link'

export function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
  variant = 'member',
}: {
  eyebrow: string
  title: string
  description: string
  children: React.ReactNode
  footer?: React.ReactNode
  variant?: 'member' | 'admin'
}) {
  return (
    <div className="auth-page">
      <div className="auth-page-bg" aria-hidden />
      <div className="relative z-10 flex w-full max-w-[28rem] flex-col items-center">
        <Link href="/" className="mb-8 transition-opacity hover:opacity-90">
          <Image src="/images/appi-logo.png" alt="APPI" width={140} height={56} priority className="h-11 w-auto" />
        </Link>
        <div className="auth-card w-full">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-warm">{eyebrow}</p>
          <h1 className="mt-2 font-serif text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
          {variant === 'admin' && (
            <p className="mt-3 inline-flex rounded-full bg-accent-blue/8 px-3 py-1 text-xs font-medium text-accent-blue">
              Secretariat access
            </p>
          )}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 border-t border-edge/60 pt-6 text-center text-sm text-ink-muted">{footer}</div>}
        </div>
      </div>
    </div>
  )
}
