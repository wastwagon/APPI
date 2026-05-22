'use client'

import { useEffect, useState } from 'react'
import {
  fetchAdminVerifications,
  reviewVerification,
  type VerificationItem,
} from '@/lib/admin-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { DataPanel } from '@/components/ui/data-panel'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export default function AdminVerificationsPage() {
  const [items, setItems] = useState<VerificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<Record<string, string>>({})

  function load() {
    setLoading(true)
    fetchAdminVerifications()
      .then((d) => setItems(d.items))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  async function review(id: string, action: 'approve' | 'reject') {
    await reviewVerification(id, action, notes[id])
    load()
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Verifications"
        description="Review member identity submissions before granting full programme access."
      />

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-edge/40" />
          ))}
        </div>
      ) : items.length === 0 ? (
          <DataPanel
            empty={
              <>
                <p className="font-medium text-ink">Queue clear</p>
                <p className="mt-1">No pending verifications at the moment.</p>
              </>
            }
          />
        ) : (
          <DataPanel>
            <ul className="divide-y divide-edge/60">
              {items.map((v) => (
                <li key={v.id} className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-ink">{v.fullName ?? '—'}</p>
                      <p className="text-sm text-ink-muted">{v.email}</p>
                      <p className="mt-2 text-sm">
                        National ID: <span className="font-mono text-ink">{v.nationalId}</span>
                      </p>
                      <p className="mt-1 text-xs text-ink-muted">
                        Submitted {new Date(v.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    {v.documentPath && (
                      <a
                        href={v.documentPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-edge px-3 py-2 text-sm font-medium text-accent-blue hover:bg-paper"
                      >
                        View document <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <textarea
                    placeholder="Admin notes (optional)"
                    value={notes[v.id] ?? ''}
                    onChange={(e) => setNotes({ ...notes, [v.id]: e.target.value })}
                    rows={2}
                    className="input-field mt-4 text-sm"
                  />
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button type="button" variant="primary" size="sm" onClick={() => review(v.id, 'approve')}>
                      Approve
                    </Button>
                    <Button type="button" variant="secondary" size="sm" onClick={() => review(v.id, 'reject')}>
                      Reject
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </DataPanel>
        )}
    </div>
  )
}
