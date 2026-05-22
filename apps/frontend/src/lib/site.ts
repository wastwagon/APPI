/** Site-wide contact and institutional links (from legacy APPI/source/src/config/site.js) */
export const siteConfig = {
  shortName: 'APPI',
  email: 'appi@africagovernancecentre.org',
  phoneDisplay: '+233 53 054 5528',
  phoneTel: '+233530545528',
  topBarTagline: 'Continental platform for party reform & inclusive governance',
  locationSummary: 'Secretariat coordinated through the Africa Governance Centre network.',
  officialProgrammeUrl: 'https://www.africanpoliticalpartiesinitiative.org/',
  anchorOrg: {
    name: 'Africa Governance Centre',
    url: 'https://africagovernancecentre.org/',
  },
  /** Set URLs when handles are live; empty entries fall back to /contact/social */
  social: {
    linkedin: '',
    x: '',
    facebook: '',
    youtube: '',
  },
  socialChannelsHref: '/contact/social',
} as const
