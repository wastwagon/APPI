/** Site-wide contact and institutional links (from legacy APPI/source/src/config/site.js) */
export const siteConfig = {
  shortName: 'APPI',
  email: 'appi@africagovernancecentre.org',
  phoneDisplay: '+233 53 054 5528',
  phoneTel: '+233530545528',
  topBarTagline: 'Continental platform for party reform & inclusive governance',
  address: '32 Hackman Owusu Agyeman Street, East Legon, Accra – Ghana',
  locationSummary:
    '32 Hackman Owusu Agyeman Street, East Legon, Accra – Ghana (Africa Governance Centre network).',
  officialProgrammeUrl: 'https://www.africanpoliticalpartiesinitiative.org/',
  anchorOrg: {
    name: 'Africa Governance Centre',
    url: 'https://africagovernancecentre.org/',
  },
  /** Set URLs when handles are live; empty entries fall back to /contact/social */
  social: {
    linkedin: 'https://linkedin.com/company/appi-africa',
    x: 'https://twitter.com/appi_africa',
    facebook: 'https://facebook.com/appi-africa',
    youtube: 'https://youtube.com/@appi-africa',
  },
  socialChannelsHref: '/contact/social',
} as const
