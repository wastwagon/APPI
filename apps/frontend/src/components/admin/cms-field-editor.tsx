'use client'

import { useMemo } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { RichTextEditor } from '@/components/admin/rich-text-editor'
import { Button } from '@/components/ui/button'
import {
  cmsFieldKind,
  cmsFieldLabel,
  isPlainObject,
  type CmsFieldKind,
} from '@/lib/cms-field-types'

type Props = {
  fields: Record<string, unknown>
  onChange: (fields: Record<string, unknown>) => void
}

function ShortField({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: 'text' | 'url'
}) {
  const id = `cms-${label.replace(/\s+/g, '-').toLowerCase()}`
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field mt-1 text-sm"
      />
    </div>
  )
}

function RichField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-ink-muted">{label}</p>
      <RichTextEditor value={value} onChange={onChange} placeholder={`Edit ${label.toLowerCase()}…`} />
    </div>
  )
}

function FieldByKind({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string
  value: string
  onChange: (v: string) => void
}) {
  const kind = cmsFieldKind(fieldKey, value) as CmsFieldKind
  const label = cmsFieldLabel(fieldKey)

  if (kind === 'url') {
    return <ShortField label={label} value={value} onChange={onChange} type="url" />
  }
  if (kind === 'rich') {
    return <RichField label={label} value={value} onChange={onChange} />
  }
  return <ShortField label={label} value={value} onChange={onChange} />
}

function sortKeys(keys: string[]): string[] {
  return [...keys].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}

function CmsFieldsList({
  fields,
  onChange,
  depth = 0,
}: {
  fields: Record<string, unknown>
  onChange: (fields: Record<string, unknown>) => void
  depth?: number
}) {
  const groups = useMemo(() => {
    const short: string[] = []
    const rich: string[] = []
    const urls: string[] = []
    const bullets: string[] = []
    const faq: string[] = []
    const nested: [string, Record<string, unknown>][] = []

    for (const [key, val] of Object.entries(fields)) {
      const kind = cmsFieldKind(key, val)
      if (kind === 'skip') continue
      if (kind === 'nested' && isPlainObject(val)) {
        nested.push([key, val])
        continue
      }
      if (typeof val !== 'string') continue
      if (/^bullet\d+$/.test(key)) bullets.push(key)
      else if (/^q\d+$/.test(key) || /^a\d+$/.test(key)) faq.push(key)
      else if (kind === 'url') urls.push(key)
      else if (kind === 'rich') rich.push(key)
      else short.push(key)
    }

    return {
      short: sortKeys(short),
      rich: sortKeys(rich),
      urls: sortKeys(urls),
      bullets: sortKeys(bullets),
      faq: sortKeys(faq),
      nested,
    }
  }, [fields])

  function patch(key: string, value: unknown) {
    onChange({ ...fields, [key]: value })
  }

  function patchNested(group: string, next: Record<string, unknown>) {
    onChange({ ...fields, [group]: next })
  }

  function addBullet() {
    const nums = groups.bullets.map((k) => parseInt(k.replace('bullet', ''), 10)).filter((n) => !Number.isNaN(n))
    const next = (nums.length ? Math.max(...nums) : 0) + 1
    patch(`bullet${next}`, '')
  }

  function removeBullet(key: string) {
    const next = { ...fields }
    delete next[key]
    onChange(next)
  }

  function addFaqPair() {
    const qNums = groups.faq
      .filter((k) => k.startsWith('q'))
      .map((k) => parseInt(k.slice(1), 10))
      .filter((n) => !Number.isNaN(n))
    const next = (qNums.length ? Math.max(...qNums) : 0) + 1
    onChange({
      ...fields,
      [`q${next}`]: '',
      [`a${next}`]: '',
    })
  }

  function removeFaqPair(qKey: string) {
    const n = qKey.replace('q', '')
    const aKey = `a${n}`
    const next = { ...fields }
    delete next[qKey]
    delete next[aKey]
    onChange(next)
  }

  const sectionClass = depth > 0 ? 'rounded-xl border border-edge bg-paper p-4' : ''

  return (
    <div className={sectionClass}>
      {groups.short.length > 0 && (
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">Headings & labels</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {groups.short.map((key) => (
              <FieldByKind
                key={key}
                fieldKey={key}
                value={fields[key] as string}
                onChange={(v) => patch(key, v)}
              />
            ))}
          </div>
        </section>
      )}

      {groups.rich.length > 0 && (
        <section className={groups.short.length > 0 ? 'mt-8 space-y-4' : 'space-y-4'}>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">Body content</p>
          {groups.rich.map((key) => (
            <FieldByKind
              key={key}
              fieldKey={key}
              value={fields[key] as string}
              onChange={(v) => patch(key, v)}
            />
          ))}
        </section>
      )}

      {groups.urls.length > 0 && (
        <section className="mt-8 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">Links</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {groups.urls.map((key) => (
              <FieldByKind
                key={key}
                fieldKey={key}
                value={fields[key] as string}
                onChange={(v) => patch(key, v)}
              />
            ))}
          </div>
        </section>
      )}

      {groups.bullets.length > 0 && (
        <section className="mt-8 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">Bullet points</p>
            <Button type="button" variant="secondary" size="sm" onClick={addBullet}>
              <Plus className="mr-1 h-3.5 w-3.5" /> Add bullet
            </Button>
          </div>
          {groups.bullets.map((key) => (
            <div key={key} className="relative rounded-xl border border-edge/60 bg-paper-white p-3 pr-12">
              <button
                type="button"
                onClick={() => removeBullet(key)}
                className="absolute right-2 top-2 rounded-lg p-1.5 text-ink-muted hover:bg-red-50 hover:text-red-700"
                aria-label={`Remove ${key}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <FieldByKind
                fieldKey={key}
                value={fields[key] as string}
                onChange={(v) => patch(key, v)}
              />
            </div>
          ))}
        </section>
      )}

      {groups.faq.length > 0 && (
        <section className="mt-8 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">FAQ items</p>
            <Button type="button" variant="secondary" size="sm" onClick={addFaqPair}>
              <Plus className="mr-1 h-3.5 w-3.5" /> Add Q&amp;A
            </Button>
          </div>
          {sortKeys([...new Set(groups.faq.map((k) => (k.startsWith('q') ? k : `q${k.slice(1)}`)))])
            .filter((k) => k.startsWith('q'))
            .map((qKey) => {
              const n = qKey.slice(1)
              const aKey = `a${n}`
              return (
                <div
                  key={qKey}
                  className="relative space-y-3 rounded-xl border border-edge/60 bg-paper-white p-4 pr-12"
                >
                  <button
                    type="button"
                    onClick={() => removeFaqPair(qKey)}
                    className="absolute right-2 top-2 rounded-lg p-1.5 text-ink-muted hover:bg-red-50 hover:text-red-700"
                    aria-label="Remove FAQ pair"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <FieldByKind
                    fieldKey={qKey}
                    value={(fields[qKey] as string) ?? ''}
                    onChange={(v) => patch(qKey, v)}
                  />
                  {fields[aKey] !== undefined && (
                    <FieldByKind
                      fieldKey={aKey}
                      value={fields[aKey] as string}
                      onChange={(v) => patch(aKey, v)}
                    />
                  )}
                </div>
              )
            })}
        </section>
      )}

      {groups.nested.map(([group, obj]) => (
        <section key={group} className="mt-8 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-warm">
            {cmsFieldLabel(group)}
          </p>
          <CmsFieldsList fields={obj} onChange={(next) => patchNested(group, next)} depth={depth + 1} />
        </section>
      ))}

      {groups.short.length === 0 &&
        groups.rich.length === 0 &&
        groups.urls.length === 0 &&
        groups.bullets.length === 0 &&
        groups.faq.length === 0 &&
        groups.nested.length === 0 && (
          <p className="text-sm text-ink-muted">No editable fields. Import from JSON files to populate this page.</p>
        )}
    </div>
  )
}

export function CmsFieldEditor({ fields, onChange }: Props) {
  return (
    <div className="mt-6 max-h-[min(70vh,720px)] overflow-y-auto pr-1">
      <CmsFieldsList fields={fields} onChange={onChange} />
    </div>
  )
}
