import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'

const styles = {
  success: 'border-green-200/80 bg-green-50 text-green-900',
  error: 'border-red-200/80 bg-red-50 text-red-900',
  info: 'border-accent-blue/20 bg-accent-blue/5 text-ink',
  warning: 'border-amber-200/80 bg-amber-50 text-amber-950',
}

export type AlertVariant = keyof typeof styles

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertCircle,
}

export function Alert({
  variant = 'info',
  title,
  children,
  className,
}: {
  variant?: keyof typeof styles
  title?: string
  children: React.ReactNode
  className?: string
}) {
  const Icon = icons[variant]
  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-xl border px-4 py-3 text-sm',
        styles[variant],
        className
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0 opacity-80" aria-hidden />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? 'mt-0.5 opacity-90' : ''}>{children}</div>
      </div>
    </div>
  )
}
