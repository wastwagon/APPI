import type { LegacyImageKey } from './legacy-images'

export const platformImages: Record<
  | 'overview'
  | 'academy'
  | 'summit'
  | 'workingGroups'
  | 'reformDialogues'
  | 'inclusiveLeadership'
  | 'learningHubs'
  | 'mediation',
  LegacyImageKey
> = {
  overview: 'academy',
  academy: 'academy',
  summit: 'summit',
  workingGroups: 'thematicGroups',
  reformDialogues: 'reformDialogues',
  inclusiveLeadership: 'inclusiveLeadership',
  learningHubs: 'countryConsultations',
  mediation: 'reformDialogues',
}

export const aboutImages: Record<
  'overview' | 'whoWeAre' | 'strategicObjectives' | 'leadership' | 'framework' | 'declarations',
  LegacyImageKey
> = {
  overview: 'appiLaunch',
  whoWeAre: 'politicalParties',
  strategicObjectives: 'developmentPartners',
  leadership: 'politicalParties',
  framework: 'appiLaunch',
  declarations: 'summit',
}

export const engagementImages: Record<
  'overview' | 'parties' | 'partner' | 'youthWomen' | 'ctpeAfcta',
  LegacyImageKey
> = {
  overview: 'politicalParties',
  parties: 'politicalParties',
  partner: 'developmentPartners',
  youthWomen: 'youthWomen',
  ctpeAfcta: 'ctpeAfCFTA',
}

export const insightsImages: Record<
  'overview' | 'publications' | 'thoughtLeadership' | 'events' | 'press' | 'media',
  LegacyImageKey
> = {
  overview: 'thematicGroups',
  publications: 'thematicGroups',
  thoughtLeadership: 'governments',
  events: 'appiLaunch',
  press: 'governments',
  media: 'appsSummit',
}

export const summitImages: Record<'main' | 'media' | 'register', LegacyImageKey> = {
  main: 'summit',
  media: 'appiLaunch',
  register: 'summit',
}

export const contactImages: Record<
  'overview' | 'secretariat' | 'mediation' | 'social',
  LegacyImageKey
> = {
  overview: 'appiLaunch',
  secretariat: 'privateMeeting',
  mediation: 'reformDialogues',
  social: 'socialPortrait',
}

export const legalImages: Record<'privacy' | 'terms', LegacyImageKey> = {
  privacy: 'developmentPartners',
  terms: 'governments',
}
