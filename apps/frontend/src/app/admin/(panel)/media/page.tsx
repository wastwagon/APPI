'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  fetchMediaLibrary,
  uploadMediaFile,
  addYoutubeMedia,
  deleteMediaItem,
  type MediaLibraryItem,
} from '@/lib/admin-api'
import { resolveMediaUrl } from '@/lib/media'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { FormCard } from '@/components/ui/form-card'
import { FormField } from '@/components/ui/form-field'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Copy, Trash2, Upload, Youtube, FileText, ImageIcon } from 'lucide-react'

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaLibraryItem[]>([])
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [youtubeTitle, setYoutubeTitle] = useState('')
  const [uploadFolder, setUploadFolder] = useState('general')
  const fileRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchMediaLibrary({
        type: filter || undefined,
        search: search || undefined,
      })
      setItems(data.items)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [filter, search])

  useEffect(() => {
    load()
  }, [load])

  async function onUpload(files: FileList | null) {
    if (!files?.length) return
    setError(null)
    try {
      for (const file of Array.from(files)) {
        await uploadMediaFile(file, { folder: uploadFolder })
      }
      await load()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    }
    if (fileRef.current) fileRef.current.value = ''
  }

  async function onAddYoutube(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await addYoutubeMedia({ url: youtubeUrl, title: youtubeTitle || undefined })
      setYoutubeUrl('')
      setYoutubeTitle('')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed')
    }
  }

  async function copyUrl(url: string) {
    const full =
      url.startsWith('http') ? url : `${window.location.origin}${resolveMediaUrl(url)}`
    await navigator.clipboard.writeText(full)
  }

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Media library"
        description="Upload images and documents. Videos are YouTube links only — no file uploads."
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
          multiple
          className="hidden"
          onChange={(e) => onUpload(e.target.files)}
        />
        <Button type="button" onClick={() => fileRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" /> Upload files
        </Button>
      </DashboardHeader>

      {error && <Alert variant="error">{error}</Alert>}

      <div className="flex flex-wrap items-end gap-3">
        <FormField id="media-folder" label="Upload folder" hint="Use heroes for homepage carousel">
          <input
            id="media-folder"
            type="text"
            value={uploadFolder}
            onChange={(e) => setUploadFolder(e.target.value)}
            placeholder="general"
            className="input-field w-40"
          />
        </FormField>
        <FormField id="media-filter" label="Filter type">
          <select
            id="media-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field w-40"
          >
            <option value="">All types</option>
            <option value="image">Images</option>
            <option value="document">Documents</option>
            <option value="video">YouTube</option>
          </select>
        </FormField>
        <FormField id="media-search" label="Search" className="min-w-[12rem] flex-1">
          <input
            id="media-search"
            type="search"
            placeholder="Title or filename…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field"
          />
        </FormField>
      </div>

      <form onSubmit={onAddYoutube}>
        <FormCard title="Add YouTube video" description="Paste a watch or youtu.be URL.">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <FormField id="yt-url" label="URL" required className="min-w-0 flex-1">
              <input
                id="yt-url"
                type="url"
                required
                placeholder="https://www.youtube.com/watch?v=…"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="input-field"
              />
            </FormField>
            <FormField id="yt-title" label="Title" className="sm:w-48">
              <input
                id="yt-title"
                type="text"
                placeholder="Optional"
                value={youtubeTitle}
                onChange={(e) => setYoutubeTitle(e.target.value)}
                className="input-field"
              />
            </FormField>
            <Button type="submit" variant="secondary" className="shrink-0">
              <Youtube className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </FormCard>
      </form>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video animate-pulse rounded-2xl bg-edge/40" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p className="font-medium text-ink">No media yet</p>
          <p className="mt-1">Upload a file or add a YouTube link.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onCopy={copyUrl}
              onDelete={async () => {
                if (!confirm('Delete this item?')) return
                await deleteMediaItem(item.id)
                await load()
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function MediaCard({
  item,
  onCopy,
  onDelete,
}: {
  item: MediaLibraryItem
  onCopy: (url: string) => void
  onDelete: () => void
}) {
  const isVideo = item.type === 'video'
  const isDoc = item.type === 'document'

  return (
    <article className="media-card">
      <div className="relative flex aspect-video items-center justify-center bg-paper">
        {item.type === 'image' ? (
          <Image
            src={resolveMediaUrl(item.url)}
            alt={item.altText ?? item.title ?? 'Media'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : isVideo ? (
          <Youtube className="h-12 w-12 text-red-600" aria-hidden />
        ) : isDoc ? (
          <FileText className="h-12 w-12 text-ink-muted" aria-hidden />
        ) : (
          <ImageIcon className="h-12 w-12 text-ink-muted" aria-hidden />
        )}
      </div>
      <div className="p-4">
        <p className="truncate font-medium text-ink">{item.title ?? item.fileName ?? item.id}</p>
        <p className="mt-0.5 text-xs capitalize text-ink-muted">
          {item.type} · {item.folder}
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => onCopy(item.url)}
            className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-edge px-2.5 py-1 text-xs font-medium hover:bg-paper"
          >
            <Copy className="h-3 w-3" /> URL
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  )
}
