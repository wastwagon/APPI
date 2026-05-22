'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Menu } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from './language-switcher'
import { HeaderSocial } from './header-social'
import { DesktopNav } from './desktop-nav'
import { SiteContainer } from './site-container'

type SiteHeaderProps = {
  onMenuOpen: () => void
}

export function SiteHeader({ onMenuOpen }: SiteHeaderProps) {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 border-b border-edge/60 bg-paper-white/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-paper-white/75">
      <SiteContainer
        as="div"
        className="flex h-[4.25rem] items-center justify-between gap-3 lg:h-[4.5rem] lg:gap-4"
      >
        <Link href="/" className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-90">
          <Image
            src="/images/appi-logo.png"
            alt="APPI"
            width={144}
            height={58}
            className="h-11 w-auto sm:h-12"
            priority
          />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2 sm:gap-2.5">
          <HeaderSocial className="hidden sm:flex" />
          <LanguageSwitcher className="hidden md:block" />
          <button
            type="button"
            onClick={onMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-edge bg-paper-elevated text-ink shadow-sm transition-colors hover:border-accent-blue/30 lg:hidden"
            aria-label={t('openMenu')}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </SiteContainer>
    </header>
  )
}
