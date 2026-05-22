'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchMediaLibrary, type MediaLibraryItem } from '@/lib/admin-api'
import { resolveMediaUrl } from '@/lib/media'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { ImageIcon, Search, X } from 'lucide-react'

type Props = {
  open: boolean
  onClose: () => void
  onSelect: (item: MediaLibraryItem) => void
  /** When true, only images can be selected */
  imagesOnly?: boolean
}

export function MediaPickerDialog({ open, onClose, onSelect, imagesOnly = true }: Props) {
  const [items, setItems] = useState<MediaLibraryItem[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchMediaLibrary({
        type: imagesOnly ? 'image' : undefined,
        search: search || undefined,
      })
      setItems(data.items)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load media')
    } finally {
      setLoading(false)
    }
  }, [imagesOnly, search])

  useEffect(() => {
    if (open) load()
  }, [open, load])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Media library"
    >
      <div className="flex max-h-[min(90vh,720px)] w-full max-w-3xl flex-col rounded-2xl border border-edge bg-paper-white shadow-lift">
        <div className="flex items-center justify-between border-b border-edge px-5 py-4">
          <h2 className="font-serif text-lg font-semibold text-ink">Choose from media library</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-muted hover:bg-paper"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-edge px-5 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && load()}
              placeholder="Search by title or filename…"
              className="input-field w-full pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {error && <Alert variant="error">{error}</Alert>}
          {loading ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse rounded-lg bg-edge/40" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="py-12 text-center text-sm text-ink-muted">
              No media found. Upload images in Admin → Media first.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelect(item)
                    onClose()
                  }}
                  className="group overflow-hidden rounded-xl border border-edge text-left transition-colors hover:border-accent-blue/40 hover:ring-2 hover:ring-accent-blue/20"
                >
                  <div className="relative aspect-square bg-paper">
                    {item.type === 'image' ? (
                      <Image
                        src={resolveMediaUrl(item.url)}
                        alt={item.altText ?? item.title ?? ''}
                        fill
                        className="object-cover"
                        sizes="160px"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-ink-muted" />
                      </div>
                    )}
                  </div>
                  <p className="truncate px-2 py-1.5 text-xs font-medium text-ink">
                    {item.title ?? item.fileName ?? item.id}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-edge px-5 py-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
