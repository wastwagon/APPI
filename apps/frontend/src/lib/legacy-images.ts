/** Image paths migrated from legacy site (localhost:7200) public/images */
export const legacyImages = {
  appiLaunch: '/images/appi-launch-event.jpg',
  summit: '/images/african-political-parties-summit.jpg',
  academy: '/images/political-academy.jpg',
  reformDialogues: '/images/country-level-reform-dialogues.jpg',
  thematicGroups: '/images/thematic-working-groups.jpg',
  inclusiveLeadership: '/images/inclusive-leadership-platforms.jpg',
  ctpeAfCFTA: '/images/ctpe-afcfta.jpg',
  youthWomen: '/images/youth-and-women.jpg',
  politicalParties: '/images/political-parties.jpg',
  governments: '/images/governments.jpg',
  developmentPartners: '/images/development-partners.jpg',
  countryConsultations: '/images/country-consultations.jpg',
  fellowshipApplication: '/images/political-fellowship-application.jpg',
  privateMeeting: '/images/meeting-private-office.jpg',
  socialPortrait: '/images/social-portrait.jpg',
  appsSummit: '/images/apps-summit-2.jpg',
  homeAboutLarge: '/images/home-about-large.jpg',
  homeAboutSmall: '/images/home-about-small.jpg',
} as const

export type LegacyImageKey = keyof typeof legacyImages
