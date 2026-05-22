'use client'

import { useEffect, useState } from 'react'
import { fetchSummitRegistrations, type SummitRegItem } from '@/lib/admin-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { DataPanel } from '@/components/ui/data-panel'
import { Badge } from '@/components/ui/badge'

export default function AdminSummitPage() {
  const [items, setItems] = useState<SummitRegItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSummitRegistrations()
      .then((d) => setItems(d.items))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Summit registrations"
        description="Member-linked registrations for the African Political Parties Summit."
      />

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-edge/40" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <DataPanel
          empty={
            <>
              <p className="font-medium text-ink">No registrations yet</p>
              <p className="mt-1">Summit sign-ups from the member portal will appear here.</p>
            </>
          }
        />
      ) : (
        <DataPanel>
          <ul className="divide-y divide-edge/60">
            {items.map((r) => (
              <li key={r.id} className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{r.user.fullName ?? r.user.email}</p>
                    <p className="text-sm text-ink-muted">{r.user.email}</p>
                    <p className="mt-2 text-sm text-ink">
                      {r.organisation} · {r.country}
                    </p>
                    {r.delegationRole && (
                      <p className="text-sm text-ink-muted">Role: {r.delegationRole}</p>
                    )}
                  </div>
                  <Badge variant="info">{r.status}</Badge>
                </div>
                <p className="mt-3 text-xs text-ink-muted">
                  {r.summitYear} · {new Date(r.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </DataPanel>
      )}
    </div>
  )
}
