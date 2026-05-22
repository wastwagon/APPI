'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImagePlus } from 'lucide-react'
import { resolveMediaUrl } from '@/lib/media'
import { Button } from '@/components/ui/button'
import { MediaPickerDialog } from '@/components/admin/media-picker-dialog'
import type { MediaLibraryItem } from '@/lib/admin-api'

type Props = {
  label: string
  value: string
  onChange: (url: string) => void
}

export function CmsMediaUrlField({ label, value, onChange }: Props) {
  const [pickerOpen, setPickerOpen] = useState(false)

  function onSelect(item: MediaLibraryItem) {
    if (item.type === 'image') onChange(item.url)
  }

  const preview = value && (value.startsWith('/') || value.startsWith('http'))

  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-ink-muted">{label}</p>
      <div className="flex flex-wrap items-start gap-3">
        {preview ? (
          <div className="relative h-20 w-28 overflow-hidden rounded-lg border border-edge">
            <Image
              src={resolveMediaUrl(value)}
              alt=""
              fill
              className="object-cover"
              sizes="112px"
              unoptimized
            />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/media/… or https://"
            className="input-field text-sm"
          />
          <Button type="button" variant="secondary" size="sm" className="w-fit" onClick={() => setPickerOpen(true)}>
            <ImagePlus className="mr-1.5 h-4 w-4" />
            Pick from library
          </Button>
        </div>
      </div>
      <MediaPickerDialog open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={onSelect} imagesOnly />
    </div>
  )
}
