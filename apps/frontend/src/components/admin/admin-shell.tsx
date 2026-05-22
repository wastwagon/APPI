'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Shield,
  Mail,
  Users,
  Calendar,
  ImageIcon,
  Settings,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { clearTokens, getRefreshToken } from '@/lib/auth-client'

const nav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Verifications', href: '/admin/verifications', icon: Shield },
  { name: 'Leads', href: '/admin/leads', icon: Mail },
  { name: 'Members', href: '/admin/members', icon: Users },
  { name: 'Summit', href: '/admin/summit', icon: Calendar },
  { name: 'Notifications', href: '/admin/notifications', icon: Bell },
  { name: 'Media', href: '/admin/media', icon: ImageIcon },
  { name: 'Content', href: '/admin/content', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <>
      {nav.map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn('dash-nav-link w-full', active ? 'dash-nav-link-active' : 'dash-nav-link-idle')}
          >
            <item.icon className="h-4 w-4" aria-hidden />
            {item.name}
          </Link>
        )
      })}
    </>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function logout() {
    const refresh = getRefreshToken()
    if (refresh) {
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: refresh }),
      })
    }
    clearTokens()
    router.push('/admin/login')
  }

  return (
    <div className="dash-shell">
      <header className="dash-shell-header lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Image src="/images/appi-logo.png" alt="APPI" width={96} height={40} className="h-9 w-auto" />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-edge text-ink"
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-edge px-3 py-4" aria-label="Admin navigation">
            <NavLinks onNavigate={() => setOpen(false)} />
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="dash-nav-link dash-nav-link-idle mt-2 w-full"
            >
              <ExternalLink className="h-4 w-4" /> View website
            </a>
            <button type="button" onClick={logout} className="dash-nav-link dash-nav-link-idle w-full">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </nav>
        )}
      </header>

      <div className="mx-auto flex max-w-6xl">
        <aside className="hidden w-60 shrink-0 border-r border-edge/80 bg-paper-white lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="border-b border-edge/60 p-5">
              <Link href="/admin">
                <Image src="/images/appi-logo.png" alt="APPI" width={108} height={44} className="h-9 w-auto" />
              </Link>
              <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent-warm">
                Secretariat
              </p>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Admin navigation">
              <NavLinks />
            </nav>
            <div className="space-y-1 border-t border-edge/60 p-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="dash-nav-link dash-nav-link-idle w-full"
              >
                <ExternalLink className="h-4 w-4" /> View website
              </a>
              <button type="button" onClick={logout} className="dash-nav-link dash-nav-link-idle w-full">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  )
}
