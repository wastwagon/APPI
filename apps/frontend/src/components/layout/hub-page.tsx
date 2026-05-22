import { getTranslations } from 'next-intl/server'
import { PageHero } from './page-hero'
import { SectionBlock } from './section-block'
import { HubGrid, type HubItem } from './hub-grid'
import type { LucideIcon } from 'lucide-react'

export type HubPageItemConfig = {
  messageKey: string
  href: string
  icon: LucideIcon
  showMeta?: boolean
}

type HubPageProps = {
  namespace: string
  eyebrowKey: string
  titleKey: string
  descriptionKey: string
  items: HubPageItemConfig[]
  columns?: 2 | 3
  heroVariant?: 'default' | 'summit'
  heroChildren?: React.ReactNode
}

export async function HubPage({
  namespace,
  eyebrowKey,
  titleKey,
  descriptionKey,
  items,
  columns = 2,
  heroVariant = 'default',
  heroChildren,
}: HubPageProps) {
  const t = await getTranslations(namespace)
  const tNav = await getTranslations('nav')
  const tCommon = await getTranslations('common')

  const hubItems: HubItem[] = items.map((item) => ({
    href: item.href,
    icon: item.icon,
    title: t(`${item.messageKey}.title`),
    description: t(`${item.messageKey}.description`),
    meta: item.showMeta ? t(`${item.messageKey}.meta`) : undefined,
  }))

  return (
    <>
      <PageHero
        eyebrow={tNav(eyebrowKey)}
        title={t(titleKey)}
        description={t(descriptionKey)}
        variant={heroVariant}
      >
        {heroChildren}
      </PageHero>
      <SectionBlock tone="muted" className="pb-20">
        <HubGrid items={hubItems} columns={columns} exploreLabel={tCommon('explore')} />
      </SectionBlock>
    </>
  )
}
