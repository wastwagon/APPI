import { Link } from '@/i18n/navigation'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type HubItem = {
  title: string
  description: string
  href: string
  icon: LucideIcon
  meta?: string
}

export function HubGrid({
  items,
  columns = 2,
  exploreLabel = 'Explore',
}: {
  items: HubItem[]
  columns?: 2 | 3
  exploreLabel?: string
}) {
  return (
    <ul
      className={cn(
        'grid gap-4 sm:gap-5',
        columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
      )}
    >
      {items.map((item, i) => (
        <li
          key={item.href}
          className="animate-slide-up"
          style={{ animationDelay: `${Math.min(i * 60, 300)}ms` }}
        >
          <Link href={item.href} className="card-premium group flex h-full flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-blue/8 text-accent-blue transition-colors group-hover:bg-accent-blue group-hover:text-white">
                <item.icon className="h-6 w-6" aria-hidden />
              </span>
              {item.meta && (
                <span className="rounded-full bg-paper px-2.5 py-0.5 text-xs font-semibold tabular-nums text-accent-teal">
                  {item.meta}
                </span>
              )}
            </div>
            <h2 className="mt-5 font-serif text-xl font-semibold text-ink transition-colors group-hover:text-accent-blue sm:text-[1.35rem]">
              {item.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{item.description}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue">
              <span className="border-b border-transparent transition-colors group-hover:border-accent-blue">
                {exploreLabel}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
