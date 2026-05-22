import { SiteContainer } from './site-container'
import { cn } from '@/lib/utils'

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
  variant?: 'default' | 'summit'
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  variant = 'default',
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-edge',
        variant === 'summit'
          ? 'bg-ink text-white'
          : 'bg-paper-white bg-page-accent'
      )}
    >
      {variant === 'default' && (
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(246,245,242,0.9)_100%)]"
          aria-hidden
        />
      )}
      {variant === 'summit' && (
        <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-90" aria-hidden />
      )}
      <SiteContainer className="relative py-14 sm:py-20 lg:py-24">
        {eyebrow && (
          <p
            className={cn(
              'eyebrow animate-fade-in',
              variant === 'summit' ? 'text-accent-gold' : undefined
            )}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            'mt-3 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-balance animate-slide-up sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]',
            variant === 'summit' ? 'text-white' : 'text-ink'
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              'mt-6 max-w-2xl text-lg leading-relaxed animate-slide-up [animation-delay:80ms]',
              variant === 'summit' ? 'text-white/85' : 'text-ink-muted'
            )}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-8 animate-slide-up [animation-delay:120ms]">{children}</div>}
      </SiteContainer>
    </section>
  )
}
