'use client'

import { Fragment, useEffect, useState } from 'react'
import { fetchAdminLeads, type LeadItem } from '@/lib/admin-api'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { DataPanel, DataTable } from '@/components/ui/data-panel'

export default function AdminLeadsPage() {
  const [items, setItems] = useState<LeadItem[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminLeads()
      .then((d) => setItems(d.items))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Leads & submissions"
        description="Recent form submissions from the public site (last 100)."
      />

      {loading ? (
        <div className="h-48 animate-pulse rounded-2xl bg-edge/40" />
      ) : items.length === 0 ? (
          <DataPanel
            empty={
              <>
                <p className="font-medium text-ink">No submissions yet</p>
                <p className="mt-1">Form inquiries will appear here when visitors submit contact or engagement forms.</p>
              </>
            }
          />
        ) : (
          <DataPanel>
            <DataTable>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Preview</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <Fragment key={item.id}>
                    <tr>
                      <td className="font-medium text-ink">{item.formType}</td>
                      <td className="text-ink-muted whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                      <td className="max-w-xs truncate text-ink-muted">
                        {JSON.stringify(item.payload).slice(0, 80)}…
                      </td>
                      <td>
                        <button
                          type="button"
                          className="text-xs font-semibold text-accent-blue hover:underline"
                          onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                        >
                          {expanded === item.id ? 'Hide' : 'Details'}
                        </button>
                      </td>
                    </tr>
                    {expanded === item.id && (
                      <tr>
                        <td colSpan={4} className="bg-paper/50">
                          <pre className="overflow-x-auto rounded-lg border border-edge/60 bg-paper-white p-4 text-xs text-ink">
                            {JSON.stringify(item.payload, null, 2)}
                          </pre>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </DataTable>
          </DataPanel>
        )}
    </div>
  )
}
