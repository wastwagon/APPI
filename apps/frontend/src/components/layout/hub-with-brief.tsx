import type { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import type { LucideIcon } from 'lucide-react'
import { ProgrammeBrief } from './programme-brief'
import { SectionBlock } from './section-block'
import { HubGrid, type HubItem } from './hub-grid'
import type { LegacyImageKey } from '@/lib/legacy-images'

export type HubWithBriefItem = {
  messageKey: string
  href: string
  icon: LucideIcon
  showMeta?: boolean
}

type HubWithBriefProps = {
  briefNamespace: string
  eyebrowKey: string
  imageKey: LegacyImageKey
  hubNamespace: string
  hubTitleKey: string
  hubDescriptionKey: string
  items: HubWithBriefItem[]
  columns?: 2 | 3
  heroChildren?: ReactNode
}

export async function HubWithBrief({
  briefNamespace,
  eyebrowKey,
  imageKey,
  hubNamespace,
  hubTitleKey,
  hubDescriptionKey,
  items,
  columns = 2,
  heroChildren,
}: HubWithBriefProps) {
  const tHub = await getTranslations(hubNamespace)
  const tCommon = await getTranslations('common')

  const hubItems: HubItem[] = items.map((item) => ({
    href: item.href,
    icon: item.icon,
    title: tHub(`${item.messageKey}.title`),
    description: tHub(`${item.messageKey}.description`),
    meta: item.showMeta ? tHub(`${item.messageKey}.meta`) : undefined,
  }))

  return (
    <>
      <ProgrammeBrief
        namespace={briefNamespace}
        eyebrowKey={eyebrowKey}
        imageKey={imageKey}
        heroChildren={heroChildren}
      />
      <SectionBlock tone="muted" className="pb-20">
        <h2 className="font-serif text-2xl font-semibold text-ink">{tHub(hubTitleKey)}</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">{tHub(hubDescriptionKey)}</p>
        <div className="mt-10">
          <HubGrid items={hubItems} columns={columns} exploreLabel={tCommon('explore')} />
        </div>
      </SectionBlock>
    </>
  )
}
