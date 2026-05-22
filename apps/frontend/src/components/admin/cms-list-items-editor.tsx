'use client'

import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { InsightListItem } from '@/data/insights-catalog'

const emptyItem = (): InsightListItem => ({
  title: '',
  date: '',
  summary: '',
  meta: '',
})

type Props = {
  items: InsightListItem[]
  onChange: (items: InsightListItem[]) => void
}

export function CmsListItemsEditor({ items, onChange }: Props) {
  function patch(index: number, patch: Partial<InsightListItem>) {
    const next = items.map((item, i) => (i === index ? { ...item, ...patch } : item))
    onChange(next)
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const next = [...items]
    const [removed] = next.splice(index, 1)
    next.splice(target, 0, removed)
    onChange(next)
  }

  return (
    <section className="mt-8 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">Catalog items</p>
          <p className="mt-1 text-xs text-ink-muted">
            Publications, press, events, and similar lists on the public site use these entries when saved.
          </p>
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...items, emptyItem()])}>
          <Plus className="mr-1 h-3.5 w-3.5" /> Add item
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-edge px-4 py-8 text-center text-sm text-ink-muted">
          No items yet. Add one or import from JSON, then paste catalog entries here.
        </p>
      ) : (
        items.map((item, index) => (
          <div
            key={index}
            className="relative space-y-3 rounded-xl border border-edge/60 bg-paper-white p-4 pr-12"
          >
            <div className="absolute right-2 top-2 flex flex-col gap-1">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                className="rounded p-1 text-ink-muted hover:bg-paper disabled:opacity-30"
                aria-label="Move up"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={index === items.length - 1}
                onClick={() => move(index, 1)}
                className="rounded p-1 text-ink-muted hover:bg-paper disabled:opacity-30"
                aria-label="Move down"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="rounded p-1 text-ink-muted hover:bg-red-50 hover:text-red-700"
                aria-label="Remove item"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs font-medium text-ink-muted">
                Title
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => patch(index, { title: e.target.value })}
                  className="input-field mt-1 text-sm"
                />
              </label>
              <label className="block text-xs font-medium text-ink-muted">
                Date
                <input
                  type="text"
                  value={item.date}
                  onChange={(e) => patch(index, { date: e.target.value })}
                  className="input-field mt-1 text-sm"
                />
              </label>
            </div>
            <label className="block text-xs font-medium text-ink-muted">
              Summary
              <textarea
                value={item.summary}
                onChange={(e) => patch(index, { summary: e.target.value })}
                rows={2}
                className="input-field mt-1 text-sm"
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block text-xs font-medium text-ink-muted">
                Meta line (optional)
                <input
                  type="text"
                  value={item.meta ?? ''}
                  onChange={(e) => patch(index, { meta: e.target.value || undefined })}
                  className="input-field mt-1 text-sm"
                />
              </label>
              <label className="block text-xs font-medium text-ink-muted">
                Source / link URL (optional)
                <input
                  type="text"
                  value={item.source ?? item.href ?? ''}
                  onChange={(e) => {
                    const v = e.target.value
                    patch(index, { source: v || undefined, href: v || undefined })
                  }}
                  className="input-field mt-1 text-sm"
                />
              </label>
            </div>
          </div>
        ))
      )}
    </section>
  )
}
