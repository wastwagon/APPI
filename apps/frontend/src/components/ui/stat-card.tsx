import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StatCard({
  label,
  value,
  href,
  icon: Icon,
  accent = 'blue',
}: {
  label: string
  value: string | number
  href?: string
  icon: LucideIcon
  accent?: 'blue' | 'teal' | 'warm' | 'gold'
}) {
  const accentBg = {
    blue: 'bg-accent-blue/10 text-accent-blue',
    teal: 'bg-accent-teal/10 text-accent-teal',
    warm: 'bg-accent-warm/10 text-accent-warm',
    gold: 'bg-accent-gold/15 text-accent-gold',
  }[accent]

  const inner = (
    <>
      <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', accentBg)}>
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <p className="mt-5 font-serif text-3xl font-semibold tabular-nums text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{label}</p>
    </>
  )

  const className = 'dash-stat-card group block'

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
        <span className="mt-3 inline-block text-xs font-semibold text-accent-blue opacity-0 transition-opacity group-hover:opacity-100">
          View →
        </span>
      </Link>
    )
  }

  return <div className={className}>{inner}</div>
}
