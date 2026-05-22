'use client'

import { cn } from '@/lib/utils'

export type TabItem<T extends string> = { id: T; label: string }

export function TabList<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: readonly TabItem<T>[]
  active: T
  onChange: (id: T) => void
  className?: string
}) {
  return (
    <div
      className={cn('flex gap-1 overflow-x-auto border-b border-edge/80', className)}
      role="tablist"
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active === t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
            active === t.id
              ? 'border-accent-blue text-accent-blue'
              : 'border-transparent text-ink-muted hover:border-edge hover:text-ink'
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
