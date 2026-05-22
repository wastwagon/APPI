import { getTranslations } from 'next-intl/server'
import { Facebook, Linkedin, Youtube } from 'lucide-react'
import { siteConfig } from '@/lib/site'
import { SectionBlock } from '@/components/layout/section-block'

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const channels = [
  { key: 'linkedin' as const, label: 'LinkedIn', icon: Linkedin },
  { key: 'x' as const, label: 'X', icon: XIcon },
  { key: 'facebook' as const, label: 'Facebook', icon: Facebook },
  { key: 'youtube' as const, label: 'YouTube', icon: Youtube },
]

export async function SocialChannelsBlock() {
  const t = await getTranslations('socialChannels')

  return (
    <SectionBlock tone="muted" className="pb-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif text-2xl font-semibold text-ink">{t('title')}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{t('description')}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {channels.map(({ key, label, icon: Icon }) => {
            const href = siteConfig.social[key]
            if (!href) return null
            return (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-premium flex items-center gap-3 p-4 transition-colors hover:border-accent-blue/30"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-blue/8 text-accent-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-ink">{label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </SectionBlock>
  )
}
