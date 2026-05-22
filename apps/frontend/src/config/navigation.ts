import type { LucideIcon } from 'lucide-react'
import {
  Home,
  Layers,
  Calendar,
  Users,
  Target,
  Handshake,
  Mail,
  Menu,
} from 'lucide-react'

export type NavItem = {
  messageKey: string
  href: string
  children?: { messageKey: string; href: string }[]
}

export const primaryNav: NavItem[] = [
  {
    messageKey: 'about',
    href: '/about',
    children: [
      { messageKey: 'whoWeAre', href: '/about/who-we-are' },
      { messageKey: 'strategicObjectives', href: '/about/strategic-objectives' },
      { messageKey: 'leadership', href: '/about/leadership' },
      { messageKey: 'framework', href: '/about/framework' },
      { messageKey: 'declarations', href: '/about/declarations' },
      { messageKey: 'faq', href: '/faq' },
    ],
  },
  {
    messageKey: 'platforms',
    href: '/platforms',
    children: [
      { messageKey: 'overview', href: '/platforms' },
      { messageKey: 'politicalAcademy', href: '/platforms/academy' },
      { messageKey: 'summit', href: '/platforms/summit' },
      { messageKey: 'workingGroups', href: '/platforms/working-groups' },
      { messageKey: 'reformDialogues', href: '/platforms/reform-dialogues' },
      { messageKey: 'inclusiveLeadership', href: '/platforms/inclusive-leadership' },
      { messageKey: 'learningHubs', href: '/platforms/learning-hubs' },
      { messageKey: 'mediation', href: '/platforms/mediation' },
    ],
  },
]

export const insightsNav = [
  { messageKey: 'publications', href: '/insights/publications' },
  { messageKey: 'thoughtLeadership', href: '/insights/thought-leadership' },
  { messageKey: 'events', href: '/insights/events' },
  { messageKey: 'press', href: '/insights/press' },
  { messageKey: 'mediaCoverage', href: '/insights/media' },
]

export const engagementNav = [
  { messageKey: 'politicalParties', href: '/engagement/parties' },
  { messageKey: 'partners', href: '/engagement/partner' },
  { messageKey: 'youthWomen', href: '/engagement/youth-women' },
  { messageKey: 'ctpeAfcta', href: '/engagement/ctpe-afcfta' },
]

export const contactNav = [
  { messageKey: 'overview', href: '/contact' },
  { messageKey: 'secretariat', href: '/contact/secretariat' },
  { messageKey: 'mediationContact', href: '/contact/mediation' },
  { messageKey: 'socialChannels', href: '/contact/social' },
]

export const mobileTabs: { messageKey: string; href: string; icon: LucideIcon }[] = [
  { messageKey: 'home', href: '/', icon: Home },
  { messageKey: 'platforms', href: '/platforms', icon: Layers },
  { messageKey: 'summit', href: '/summit', icon: Calendar },
  { messageKey: 'more', href: '#menu', icon: Menu },
]

export const drawerSections: {
  titleKey: string
  icon: LucideIcon
  items: NavItem[]
  links?: { messageKey: string; href: string }[]
}[] = [
  { titleKey: 'about', icon: Users, items: primaryNav.filter((n) => n.href === '/about') },
  { titleKey: 'platforms', icon: Target, items: primaryNav.filter((n) => n.href === '/platforms') },
  {
    titleKey: 'insights',
    icon: Target,
    items: [],
    links: insightsNav,
  },
  {
    titleKey: 'engagement',
    icon: Handshake,
    items: [],
    links: engagementNav,
  },
  {
    titleKey: 'summit',
    icon: Calendar,
    items: [],
    links: [{ messageKey: 'summitHub', href: '/summit' }],
  },
  {
    titleKey: 'secretariat',
    icon: Mail,
    items: [],
    links: [
      { messageKey: 'contact', href: '/contact' },
      { messageKey: 'secretariat', href: '/contact/secretariat' },
      { messageKey: 'mediationContact', href: '/contact/mediation' },
      { messageKey: 'socialChannels', href: '/contact/social' },
    ],
  },
]

export const footerLinks = {
  about: primaryNav.find((n) => n.href === '/about')?.children ?? [],
  platforms: primaryNav.find((n) => n.href === '/platforms')?.children?.slice(0, 5) ?? [],
  insights: insightsNav,
  legal: [
    { messageKey: 'privacy', href: '/privacy' },
    { messageKey: 'accessibility', href: '/accessibility' },
    { messageKey: 'terms', href: '/terms' },
  ],
}
