import { cn } from '@/lib/utils'

export function SiteContainer({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav'
}) {
  return <Tag className={cn('site-container', className)}>{children}</Tag>
}
