import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { SiteContainer } from '@/components/layout/site-container'

export async function CtaBand() {
  const t = await getTranslations('home')

  return (
    <section className="relative overflow-hidden bg-accent-blue py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-60" aria-hidden />
      <SiteContainer className="relative text-center">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl">
          {t('ctaTitle')}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
          {t('ctaDesc')}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="warm" size="lg">
            <Link href="/contact">{t('ctaContact')}</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <Link href="/summit">{t('ctaSummit')}</Link>
          </Button>
        </div>
      </SiteContainer>
    </section>
  )
}
