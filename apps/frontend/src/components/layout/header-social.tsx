'use client'

import { Facebook, Linkedin, Youtube } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const channels = [
  { key: 'linkedin' as const, Icon: Linkedin, label: 'LinkedIn' },
  { key: 'x' as const, Icon: XIcon, label: 'X' },
  { key: 'facebook' as const, Icon: Facebook, label: 'Facebook' },
  { key: 'youtube' as const, Icon: Youtube, label: 'YouTube' },
]

export function HeaderSocial({ className }: { className?: string }) {
  const fallback = siteConfig.socialChannelsHref

  return (
    <div
      className={cn('flex items-center gap-0.5 rounded-full border border-edge/80 bg-paper-elevated/80 p-0.5', className)}
      role="list"
      aria-label="Social media"
    >
      {channels.map(({ key, Icon, label }) => {
        const externalUrl = siteConfig.social[key]
        const className =
          'flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-accent-blue/10 hover:text-accent-blue'

        if (externalUrl) {
          return (
            <a
              key={key}
              href={externalUrl}
              role="listitem"
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              aria-label={label}
              title={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          )
        }

        return (
          <Link
            key={key}
            href={fallback}
            role="listitem"
            className={className}
            aria-label={`${label} — APPI channels`}
            title="Social channels"
          >
            <Icon className="h-4 w-4" />
          </Link>
        )
      })}
    </div>
  )
}
