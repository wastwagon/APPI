import { cn } from '@/lib/utils'

export function FormCard({
  title,
  description,
  children,
  className,
  footer,
}: {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  footer?: React.ReactNode
}) {
  return (
    <div className={cn('form-card', className)}>
      {(title || description) && (
        <div className="border-b border-edge/60 px-6 py-5 sm:px-8">
          {title && <h2 className="font-serif text-xl font-semibold text-ink">{title}</h2>}
          {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
        </div>
      )}
      <div className="space-y-5 px-6 py-6 sm:px-8 sm:py-7">{children}</div>
      {footer && (
        <div className="border-t border-edge/60 bg-paper/40 px-6 py-4 sm:px-8">{footer}</div>
      )}
    </div>
  )
}
