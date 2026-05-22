'use client'

import { useTranslations } from 'next-intl'
import { footerLinks } from '@/config/navigation'
import { siteConfig } from '@/lib/site'
import { Link } from '@/i18n/navigation'
import { SiteContainer } from './site-container'
import { NewsletterSignup } from './newsletter-signup'

export function SiteFooter() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="mt-auto border-t border-edge bg-ink text-white">
      <SiteContainer className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-serif text-xl font-semibold tracking-tight">{t('title')}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{t('tagline')}</p>
            <Link
              href="/member/login"
              className="mt-6 inline-flex text-sm font-semibold text-accent-gold hover:text-white"
            >
              {t('memberPortal')} →
            </Link>
            <NewsletterSignup />
            <div className="mt-8 space-y-1 text-sm text-white/60">
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <a href={`tel:${siteConfig.phoneTel}`} className="hover:text-white">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p className="max-w-xs leading-relaxed">{siteConfig.address}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                {t('aboutSection')}
              </p>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                      {tNav(link.messageKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                {t('platformsSection')}
              </p>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.platforms.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                      {tNav(link.messageKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-gold">
                {t('insightsSection')}
              </p>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.insights.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                      {tNav(link.messageKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} APPI. {t('rights')}
          </p>
          <div className="flex flex-wrap gap-5">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {tNav(link.messageKey)}
              </Link>
            ))}
            <Link href="/contact" className="hover:text-white">
              {tNav('contact')}
            </Link>
          </div>
        </div>
      </SiteContainer>
    </footer>
  )
}
