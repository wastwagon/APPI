import { cn } from '@/lib/utils'

const variants = {
  neutral: 'bg-paper text-ink-muted',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-900',
  error: 'bg-red-100 text-red-800',
  info: 'bg-accent-blue/10 text-accent-blue',
}

export function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: React.ReactNode
  variant?: keyof typeof variants
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
