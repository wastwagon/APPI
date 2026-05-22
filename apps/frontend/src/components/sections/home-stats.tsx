import { getTranslations } from 'next-intl/server'

type SiteStats = {
  memberAccounts: number
  summitRegistrations: number
  formSubmissions: number
}

async function fetchSiteStats(): Promise<SiteStats | null> {
  const apiBase = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'
  try {
    const res = await fetch(`${apiBase}/api/v1/site/stats`, { next: { revalidate: 120 } })
    if (!res.ok) return null
    return res.json() as Promise<SiteStats>
  } catch {
    return null
  }
}

export async function HomeStats() {
  const t = await getTranslations('home')
  const live = await fetchSiteStats()

  const stats = live
    ? [
        { value: String(live.memberAccounts), label: t('statLiveMembers') },
        { value: String(live.summitRegistrations), label: t('statLiveSummit') },
        { value: String(live.formSubmissions), label: t('statLiveLeads') },
      ]
    : [
        { value: t('stat1'), label: t('stat1Label') },
        { value: t('stat2'), label: t('stat2Label') },
        { value: t('stat3'), label: t('stat3Label') },
      ]

  return (
    <section className="border-b border-edge bg-paper-white py-12 sm:py-14">
      <div className="site-container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {live && (
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-accent-teal sm:text-left">
            {t('statsLive')}
          </p>
        )}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="font-serif text-3xl font-semibold tabular-nums text-accent-blue sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm text-ink-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
