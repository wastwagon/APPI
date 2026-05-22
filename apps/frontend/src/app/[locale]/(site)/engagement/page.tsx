import { Users, Handshake, Heart, Globe } from 'lucide-react'
import { HubWithBrief } from '@/components/layout/hub-with-brief'

const items = [
  { messageKey: 'parties', href: '/engagement/parties', icon: Users },
  { messageKey: 'partners', href: '/engagement/partner', icon: Handshake },
  { messageKey: 'youthWomen', href: '/engagement/youth-women', icon: Heart },
  { messageKey: 'ctpeAfcta', href: '/engagement/ctpe-afcfta', icon: Globe },
]

export default function EngagementPage() {
  return (
    <HubWithBrief
      briefNamespace="content.engagement.overview"
      eyebrowKey="engagement"
      imageKey="politicalParties"
      hubNamespace="pages.engagement"
      hubTitleKey="exploreTitle"
      hubDescriptionKey="exploreDesc"
      items={items}
    />
  )
}
