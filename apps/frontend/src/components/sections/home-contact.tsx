import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SectionBlock } from '@/components/layout/section-block'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/site'

export async function HomeContact() {
  const t = await getTranslations('home.contact')

  return (
    <SectionBlock tone="white" className="border-t border-edge">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{t('lead')}</p>
          <ul className="mt-8 space-y-4">
            <li className="flex gap-4">
              <Phone className="h-5 w-5 shrink-0 text-accent-blue" aria-hidden />
              <a href={`tel:${siteConfig.phoneTel}`} className="text-sm font-medium text-ink hover:text-accent-blue">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-4">
              <Mail className="h-5 w-5 shrink-0 text-accent-blue" aria-hidden />
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-medium text-ink hover:text-accent-blue"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-4">
              <MapPin className="h-5 w-5 shrink-0 text-accent-blue" aria-hidden />
              <span className="text-sm text-ink-muted">{siteConfig.locationSummary}</span>
            </li>
          </ul>
          <Button asChild variant="primary" className="mt-8">
            <Link href="/contact#inquiry">{t('cta')}</Link>
          </Button>
        </div>
        <div className="card-premium flex flex-col justify-center p-8 sm:p-10">
          <p className="eyebrow">{t('formEyebrow')}</p>
          <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">{t('formTitle')}</h3>
          <p className="mt-3 text-sm text-ink-muted">{t('formLead')}</p>
          <Button asChild variant="secondary" className="mt-6 w-full sm:w-auto">
            <Link href="/contact#inquiry">{t('formCta')}</Link>
          </Button>
        </div>
      </div>
    </SectionBlock>
  )
}
