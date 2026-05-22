'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Settings, Calendar, LogOut, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'
import { clearTokens, getRefreshToken } from '@/lib/auth-client'
import { NotificationBell } from './notification-bell'

const nav = [
  { name: 'Dashboard', href: '/member/dashboard', icon: LayoutDashboard },
  { name: 'Notifications', href: '/member/notifications', icon: Bell },
  { name: 'Summit', href: '/member/summit', icon: Calendar },
  { name: 'Settings', href: '/member/settings', icon: Settings },
]

export function MemberShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

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
    router.push('/member/login')
  }

  return (
    <div className="dash-shell">
      <header className="dash-shell-header">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <Image src="/images/appi-logo.png" alt="APPI" width={96} height={40} className="h-9 w-auto" />
            <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent-warm sm:inline">
              Member portal
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <button
              type="button"
              onClick={logout}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-paper hover:text-ink"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10 lg:py-10">
        <aside className="lg:w-52 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0" aria-label="Member navigation">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn('dash-nav-link', active ? 'dash-nav-link-active' : 'dash-nav-link-idle')}
                >
                  <item.icon className="h-4 w-4" aria-hidden />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
