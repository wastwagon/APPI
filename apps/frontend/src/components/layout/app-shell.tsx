'use client'

import { useState } from 'react'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import { MobileNav } from './mobile-nav'
import { NavDrawer } from './nav-drawer'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-paper-white focus:px-4 focus:py-2 focus:ring-2 focus:ring-accent-blue"
      >
        Skip to content
      </a>
      <SiteHeader onMenuOpen={() => setMenuOpen(true)} />
      <main id="main-content" className="flex-1 pb-20 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileNav onMoreClick={() => setMenuOpen(true)} />
      <NavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
