'use client'

import { useEffect, useState } from 'react'
import { Alert } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

type Health = {
  status?: string
  service?: string
  checks?: Record<string, string>
}

export function StatusPanel() {
  const [health, setHealth] = useState<Health | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/health')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => {
        setHealth(data)
        setError(null)
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="dash-panel p-6">
      <h2 className="font-serif text-xl font-semibold text-ink">Stack health</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Proxied via Next.js → API → Postgres & Redis
      </p>

      {loading && <p className="mt-4 text-sm text-ink-muted">Checking…</p>}

      {error && (
        <Alert variant="error" className="mt-4">
          API unreachable: {error}. Run <code className="rounded bg-edge px-1">pnpm dev</code>.
        </Alert>
      )}

      {health && (
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Status</dt>
            <dd className="mt-1">
              <Badge variant={health.status === 'ok' ? 'success' : 'neutral'}>
                {health.status ?? 'unknown'}
              </Badge>
            </dd>
          </div>
          {health.checks &&
            Object.entries(health.checks).map(([key, value]) => (
              <div key={key}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{key}</dt>
                <dd className="mt-1">
                  <Badge
                    variant={
                      value === 'ok' ? 'success' : value === 'error' ? 'error' : 'neutral'
                    }
                  >
                    {value}
                  </Badge>
                </dd>
              </div>
            ))}
        </dl>
      )}
    </section>
  )
}
