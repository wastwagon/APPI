import {
  GraduationCap,
  Users,
  MessageSquare,
  Handshake,
  MapPin,
  Scale,
  Calendar,
} from 'lucide-react'
import { HubWithBrief } from '@/components/layout/hub-with-brief'

const items = [
  { messageKey: 'academy', href: '/platforms/academy', icon: GraduationCap },
  { messageKey: 'summit', href: '/platforms/summit', icon: Calendar },
  { messageKey: 'workingGroups', href: '/platforms/working-groups', icon: Users },
  { messageKey: 'reformDialogues', href: '/platforms/reform-dialogues', icon: MessageSquare },
  { messageKey: 'inclusiveLeadership', href: '/platforms/inclusive-leadership', icon: Handshake },
  { messageKey: 'learningHubs', href: '/platforms/learning-hubs', icon: MapPin },
  { messageKey: 'mediation', href: '/platforms/mediation', icon: Scale },
]

export default function PlatformsPage() {
  return (
    <HubWithBrief
      briefNamespace="content.platforms.overview"
      eyebrowKey="platforms"
      imageKey="academy"
      hubNamespace="pages.platforms"
      hubTitleKey="exploreTitle"
      hubDescriptionKey="exploreDesc"
      items={items}
      columns={3}
    />
  )
}
