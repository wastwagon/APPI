'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchCmsPage,
  fetchCmsPages,
  importCmsFromFiles,
  saveCmsPage,
  type CmsPageListItem,
} from '@/lib/admin-api'
import { cmsPreviewUrl } from '@/lib/cms-preview'
import { revalidateCmsLocale } from './actions'
import { CmsFieldEditor } from '@/components/admin/cms-field-editor'
import { Button } from '@/components/ui/button'
import { DashboardHeader } from '@/components/ui/dashboard-header'
import { Alert } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { isMarketingCmsSlug } from '@/lib/cms-page-groups'
import { ExternalLink, FileText, RefreshCw, Save, Search } from 'lucide-react'

const LOCALES = ['en', 'fr', 'ar'] as const

export default function AdminContentPage() {
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>('en')
  const [pages, setPages] = useState<CmsPageListItem[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [fields, setFields] = useState<Record<string, unknown>>({})
  const [published, setPublished] = useState(true)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [showChrome, setShowChrome] = useState(false)

  const previewUrl = selectedSlug ? cmsPreviewUrl(selectedSlug, locale) : null

  const loadList = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const items = await fetchCmsPages(locale)
      setPages(items)
      if (items.length && !selectedSlug) {
        const first = items.find((p) => isMarketingCmsSlug(p.slug)) ?? items[0]
        setSelectedSlug(first.slug)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [locale])

  useEffect(() => {
    loadList()
  }, [loadList])

  useEffect(() => {
    if (!selectedSlug) return
    let cancelled = false
    ;(async () => {
      try {
        const page = await fetchCmsPage(selectedSlug, locale)
        if (cancelled) return
        setFields(page.fields)
        setPublished(page.published)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load page')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [selectedSlug, locale])

  const scopedPages = useMemo(() => {
    if (showChrome) return pages
    return pages.filter((p) => isMarketingCmsSlug(p.slug))
  }, [pages, showChrome])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return scopedPages
    return scopedPages.filter((p) => p.slug.toLowerCase().includes(q))
  }, [scopedPages, search])

  async function handleSave() {
    if (!selectedSlug) return
    setSaving(true)
    setError(null)
    setMessage(null)
    try {
      await saveCmsPage({ slug: selectedSlug, locale, fields, published })
      await revalidateCmsLocale(locale)
      setMessage('Saved. Open preview to verify changes on the public site.')
      await loadList()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  async function handleImport() {
    setImporting(true)
    setError(null)
    setMessage(null)
    try {
      const result = await importCmsFromFiles()
      setMessage(`Imported ${result.imported} pages from messages/*.json`)
      await loadList()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Content (CMS)"
        description="Edit page copy with rich text. Changes apply to the public site (EN / FR / AR) after save."
      >
        <Button type="button" variant="secondary" onClick={handleImport} disabled={importing}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {importing ? 'Importing…' : 'Import from JSON'}
        </Button>
      </DashboardHeader>

      <div className="flex flex-wrap items-center gap-3">
        {LOCALES.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => {
              setLocale(l)
              setSelectedSlug(null)
            }}
            className={cn('locale-pill', locale === l && 'locale-pill-active')}
          >
            {l}
          </button>
        ))}
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted rtl:left-auto rtl:right-3" />
          <input
            type="search"
            placeholder="Filter by slug…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field py-2 ps-9"
            aria-label="Filter pages"
          />
        </div>
        <label className="flex shrink-0 items-center gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={showChrome}
            onChange={(e) => {
              setShowChrome(e.target.checked)
              if (!e.target.checked && selectedSlug && !isMarketingCmsSlug(selectedSlug)) {
                setSelectedSlug(null)
              }
            }}
            className="rounded border-edge"
          />
          Site chrome
        </label>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}

      {loading ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          <div className="h-96 animate-pulse rounded-2xl bg-edge/40" />
          <div className="h-96 animate-pulse rounded-2xl bg-edge/40" />
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
          <ul className="data-panel max-h-[70vh] overflow-y-auto p-2">
            {filtered.length === 0 && (
              <li className="p-4 text-sm text-ink-muted">No pages. Run seed or import.</li>
            )}
            {filtered.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelectedSlug(p.slug)}
                  className={`flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left text-sm ${
                    selectedSlug === p.slug
                      ? 'bg-accent-blue/10 text-accent-blue'
                      : 'hover:bg-paper text-ink'
                  }`}
                >
                  <FileText className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <span className="block font-medium">{p.slug}</span>
                    <span className="text-xs text-ink-muted">
                      {p.fieldCount} fields · {p.published ? 'Live' : 'Draft'}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="dash-panel p-6">
            {selectedSlug ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">
                      Editing · {locale.toUpperCase()}
                    </p>
                    <p className="font-mono text-sm text-ink">{selectedSlug}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                      />
                      Published
                    </label>
                    {previewUrl ? (
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-accent-blue hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" /> Preview
                      </a>
                    ) : (
                      <span className="text-xs text-ink-muted">No public URL for this slug</span>
                    )}
                  </div>
                </div>

                <CmsFieldEditor fields={fields} onChange={setFields} />

                <Button type="button" className="mt-4" onClick={handleSave} disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? 'Saving…' : 'Save page'}
                </Button>
              </>
            ) : (
              <p className="text-sm text-ink-muted">Select a page to edit.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
