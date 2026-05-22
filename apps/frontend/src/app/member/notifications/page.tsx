'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  fetchNotifications,
  markNotificationsRead,
  type AppNotification,
} from '@/lib/member-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { Button } from '@/components/ui/button'
import { Bell, CheckCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const KIND_COLORS: Record<string, string> = {
  announcement: 'border-l-accent-warm',
  verification: 'border-l-green-600',
  summit: 'border-l-accent-blue',
  system: 'border-l-edge-strong',
}

export default function MemberNotificationsPage() {
  const [items, setItems] = useState<AppNotification[]>([])
  const [unread, setUnread] = useState(0)
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const data = await fetchNotifications()
      setItems(data.items)
      setUnread(data.unread)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function markAllRead() {
    await markNotificationsRead({ all: true })
    await load()
  }

  async function markOne(id: string) {
    await markNotificationsRead({ ids: [id] })
    await load()
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Notifications"
        description="Summit updates, verification outcomes, and announcements from the secretariat."
      >
        {unread > 0 && (
          <Button type="button" variant="secondary" size="sm" onClick={markAllRead}>
            <CheckCheck className="mr-2 h-4 w-4" /> Mark all read
          </Button>
        )}
      </DashboardHeader>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-edge/40" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <Bell className="mx-auto h-10 w-10 text-ink-faint" />
          <p className="mt-4 font-medium text-ink">No notifications yet</p>
          <p className="mt-1">Updates about your account will appear here.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <li
              key={n.id}
              className={cn(
                'rounded-2xl border border-edge border-l-4 bg-paper-white p-5 shadow-soft',
                KIND_COLORS[n.kind] ?? KIND_COLORS.system,
                !n.readAt && 'ring-1 ring-accent-blue/10'
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                    {n.kind.replace(/_/g, ' ')}
                  </p>
                  <h2 className="mt-1 font-semibold text-ink">{n.title}</h2>
                </div>
                {!n.readAt && (
                  <button
                    type="button"
                    onClick={() => markOne(n.id)}
                    className="text-xs font-semibold text-accent-blue hover:underline"
                  >
                    Mark read
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{n.body}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
                <time dateTime={n.createdAt}>{new Date(n.createdAt).toLocaleString()}</time>
                {n.href && (
                  <Link href={n.href} className="font-semibold text-accent-blue hover:underline">
                    Open →
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
