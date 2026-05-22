'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CmsHtml } from '@/components/content/cms-html'

export type FaqItem = { id: string; question: string; answer: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? '')

  return (
    <div className="mx-auto max-w-3xl divide-y divide-edge rounded-2xl border border-edge/80 bg-paper-white shadow-card">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              className={cn(
                'flex w-full items-center justify-between gap-4 px-6 py-5 text-start transition-colors',
                'hover:bg-paper/60 focus-visible:bg-paper/80 focus-visible:outline-none'
              )}
              aria-expanded={open}
              onClick={() => setOpenId(open ? '' : item.id)}
            >
              <span className="font-serif text-lg font-semibold text-ink">{item.question}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-accent-blue transition-transform duration-200',
                  open && 'rotate-180'
                )}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-200 ease-out',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-edge/60 px-6 pb-6 pt-1">
                  <CmsHtml html={item.answer} className="text-sm text-ink-muted sm:text-base" />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
