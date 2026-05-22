/** Full legal copy from legacy `app/privacy` and `app/terms` (live site). */

export type LegalSection = {
  heading: string
  paragraphs?: string[]
  list?: string[]
}

export type LegalDocument = {
  title: string
  lastUpdated: string
  sections: LegalSection[]
  contactNote?: string
}

export const privacyDocument: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: 'January 2025',
  sections: [
    {
      heading: '1. Information We Collect',
      paragraphs: [
        'We collect information you provide directly to us, such as when you create an account, register for events, or contact us. This may include:',
      ],
      list: [
        'Name and contact information (email, phone number)',
        'Professional information (organization, position)',
        'Political party affiliation',
        'Profile pictures and documents',
        'Communication preferences',
      ],
    },
    {
      heading: '2. How We Use Your Information',
      paragraphs: ['We use the information we collect to:'],
      list: [
        'Provide and maintain our services',
        'Process registrations and manage accounts',
        'Send you updates and communications',
        'Improve our website and services',
        'Comply with legal obligations',
      ],
    },
    {
      heading: '3. Information Sharing',
      paragraphs: [
        'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:',
      ],
      list: [
        'With your explicit consent',
        'To comply with legal requirements',
        'To protect our rights and safety',
        'With service providers who assist in our operations',
      ],
    },
    {
      heading: '4. Data Security',
      paragraphs: [
        'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
      ],
    },
    {
      heading: '5. Cookies and Tracking',
      paragraphs: [
        'We use cookies and similar technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.',
      ],
    },
    {
      heading: '6. Your Rights',
      paragraphs: ['You have the right to:'],
      list: [
        'Access your personal information',
        'Correct inaccurate information',
        'Request deletion of your information',
        'Opt out of communications',
        'Withdraw consent at any time',
      ],
    },
    {
      heading: '7. Data Retention',
      paragraphs: [
        'We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account and associated data at any time.',
      ],
    },
    {
      heading: '8. International Transfers',
      paragraphs: [
        'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information.',
      ],
    },
    {
      heading: "9. Children's Privacy",
      paragraphs: [
        'Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.',
      ],
    },
    {
      heading: '10. Changes to This Policy',
      paragraphs: [
        'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.',
      ],
    },
  ],
  contactNote:
    'If you have any questions about this Privacy Policy, contact appi@africagovernancecentre.org or +233 53 054 5528.',
}

export const termsDocument: LegalDocument = {
  title: 'Terms of Service',
  lastUpdated: 'January 2025',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      paragraphs: [
        'By accessing and using the African Political Parties Initiative (APPI) website and services, you accept and agree to be bound by the terms and provision of this agreement.',
      ],
    },
    {
      heading: '2. Use License',
      paragraphs: [
        "Permission is granted to temporarily download one copy of the materials (information or software) on APPI's website for personal, non-commercial transitory viewing only.",
        'This is the grant of a license, not a transfer of title, and under this license you may not:',
      ],
      list: [
        'modify or copy the materials',
        'use the materials for any commercial purpose or for any public display',
        "attempt to reverse engineer any software contained on APPI's website",
        'remove any copyright or other proprietary notations from the materials',
      ],
    },
    {
      heading: '3. Disclaimer',
      paragraphs: [
        "The materials on APPI's website are provided on an 'as is' basis. APPI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
      ],
    },
    {
      heading: '4. Limitations',
      paragraphs: [
        "In no event shall APPI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on APPI's website, even if APPI or an APPI authorized representative has been notified orally or in writing of the possibility of such damage.",
      ],
    },
    {
      heading: '5. Accuracy of Materials',
      paragraphs: [
        "The materials appearing on APPI's website could include technical, typographical, or photographic errors. APPI does not warrant that any of the materials on its website are accurate, complete, or current. APPI may make changes to the materials contained on its website at any time without notice.",
      ],
    },
    {
      heading: '6. Links',
      paragraphs: [
        "APPI has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by APPI of the site. Use of any such linked website is at the user's own risk.",
      ],
    },
    {
      heading: '7. Modifications',
      paragraphs: [
        'APPI may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.',
      ],
    },
    {
      heading: '8. Governing Law',
      paragraphs: [
        'These terms and conditions are governed by and construed in accordance with the laws of Ghana and you irrevocably submit to the exclusive jurisdiction of the courts in that location.',
      ],
    },
  ],
  contactNote: 'For questions about these terms, contact the APPI Secretariat.',
}
