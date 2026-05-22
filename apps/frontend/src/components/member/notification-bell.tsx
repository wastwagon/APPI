'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { fetchMemberProfile } from '@/lib/member-api'

export function NotificationBell() {
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    fetchMemberProfile()
      .then((p) => setUnread(p.unreadNotifications ?? 0))
      .catch(() => setUnread(0))
  }, [])

  return (
    <Link
      href="/member/notifications"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-paper-white text-ink-muted transition-colors hover:border-accent-blue/30 hover:text-accent-blue"
      aria-label={unread ? `${unread} unread notifications` : 'Notifications'}
    >
      <Bell className="h-5 w-5" />
      {unread > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-warm px-1 text-[10px] font-bold text-white">
          {unread > 9 ? '9+' : unread}
        </span>
      )}
    </Link>
  )
}
