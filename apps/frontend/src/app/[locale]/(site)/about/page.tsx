import {
  Users,
  Target,
  Shield,
  FileText,
  MessageSquare,
} from 'lucide-react'
import { HubWithBrief } from '@/components/layout/hub-with-brief'
import { AboutSubnav } from '@/components/layout/about-subnav'

const items = [
  { messageKey: 'whoWeAre', href: '/about/who-we-are', icon: Users },
  { messageKey: 'strategicObjectives', href: '/about/strategic-objectives', icon: Target },
  { messageKey: 'leadership', href: '/about/leadership', icon: Shield },
  { messageKey: 'framework', href: '/about/framework', icon: FileText },
  { messageKey: 'declarations', href: '/about/declarations', icon: MessageSquare },
]

export default function AboutPage() {
  return (
    <HubWithBrief
      briefNamespace="content.about.overview"
      eyebrowKey="about"
      imageKey="appiLaunch"
      hubNamespace="pages.about"
      hubTitleKey="exploreTitle"
      hubDescriptionKey="exploreDesc"
      items={items}
      heroChildren={<AboutSubnav />}
    />
  )
}
