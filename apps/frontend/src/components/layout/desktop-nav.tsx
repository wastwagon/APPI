'use client'

import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { primaryNav, insightsNav, engagementNav, contactNav } from '@/config/navigation'
import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

function NavLink({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
        active ? 'bg-accent-blue/10 text-accent-blue' : 'text-ink-muted hover:bg-paper hover:text-ink'
      )}
    >
      {label}
    </Link>
  )
}

function NavDropdown({
  label,
  href,
  active,
  children,
}: {
  label: string
  href: string
  active: boolean
  children: { messageKey: string; href: string }[]
}) {
  const t = useTranslations('nav')

  return (
    <div className="group relative">
      <Link
        href={href}
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
          active ? 'bg-accent-blue/10 text-accent-blue' : 'text-ink-muted hover:bg-paper hover:text-ink'
        )}
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
      </Link>
      <div className="nav-flyout left-0 lg:left-auto lg:-translate-x-4">
        <ul className="space-y-0.5">
          {children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block rounded-xl px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-paper hover:text-accent-blue"
              >
                {t(child.messageKey)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function DesktopNav() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

  return (
    <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
      {primaryNav.map((item) => {
        if (item.children?.length) {
          return (
            <NavDropdown
              key={item.href}
              label={t(item.messageKey)}
              href={item.href}
              active={isActive(item.href)}
              children={item.children}
            />
          )
        }
        return (
          <NavLink
            key={item.href}
            href={item.href}
            label={t(item.messageKey)}
            active={isActive(item.href)}
          />
        )
      })}
      <NavDropdown
        label={t('insights')}
        href="/insights"
        active={isActive('/insights')}
        children={insightsNav}
      />
      <NavLink href="/summit" label={t('summit')} active={isActive('/summit')} />
      <NavDropdown
        label={t('engagement')}
        href="/engagement"
        active={isActive('/engagement')}
        children={engagementNav}
      />
      <NavDropdown
        label={t('contact')}
        href="/contact"
        active={isActive('/contact')}
        children={contactNav}
      />
    </nav>
  )
}
