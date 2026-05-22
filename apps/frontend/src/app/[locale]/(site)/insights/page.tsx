import { FileText, Users, Calendar, Newspaper, Globe } from 'lucide-react'
import { HubWithBrief } from '@/components/layout/hub-with-brief'

const items = [
  { messageKey: 'publications', href: '/insights/publications', icon: FileText, showMeta: true },
  { messageKey: 'thoughtLeadership', href: '/insights/thought-leadership', icon: Users, showMeta: true },
  { messageKey: 'events', href: '/insights/events', icon: Calendar, showMeta: true },
  { messageKey: 'press', href: '/insights/press', icon: Newspaper, showMeta: true },
  { messageKey: 'mediaCoverage', href: '/insights/media', icon: Globe, showMeta: true },
]

export default function InsightsPage() {
  return (
    <HubWithBrief
      briefNamespace="content.insights.overview"
      eyebrowKey="insights"
      imageKey="thematicGroups"
      hubNamespace="pages.insights"
      hubTitleKey="exploreTitle"
      hubDescriptionKey="exploreDesc"
      items={items}
    />
  )
}
