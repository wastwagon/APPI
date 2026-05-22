import type { InsightListItem } from './types'

export const publicationsCatalog: InsightListItem[] = [
  {
    title: 'Democratic Governance in Africa: Challenges and Opportunities',
    date: 'March 2024',
    summary:
      'An analysis of current democratic governance challenges across Africa and recommendations for strengthening political institutions.',
    meta: 'Policy Brief · Dr. Sarah Johnson',
  },
  {
    title: 'Youth Participation in Political Processes: A Continental Perspective',
    date: 'February 2024',
    summary:
      'Comprehensive study on youth engagement in political processes and strategies for increasing participation.',
    meta: 'Research Report · Prof. Michael Chen',
  },
  {
    title: 'Women in Political Leadership: Breaking Barriers',
    date: 'January 2024',
    summary:
      "Practical guide for political parties on promoting women's leadership and participation.",
    meta: 'Toolkit · APPI Secretariat',
  },
  {
    title: 'Electoral Reform and Democratic Consolidation',
    date: 'December 2023',
    summary:
      'Analysis of electoral reform initiatives and their impact on democratic consolidation in Africa.',
    meta: 'Policy Brief · Dr. Amina Hassan',
  },
]

export const pressCatalog: InsightListItem[] = [
  {
    title: 'APPI Launches New Youth Leadership Initiative',
    date: 'March 15, 2024',
    summary:
      'The African Political Parties Initiative announces a comprehensive program to empower young political leaders across the continent.',
    meta: 'Announcement',
  },
  {
    title: 'APPI Welcomes New Member Parties from West Africa',
    date: 'March 10, 2024',
    summary: 'Five new political parties from West Africa join APPI, strengthening our continental network.',
    meta: 'Membership',
  },
  {
    title: 'APPI Releases Annual Report 2023',
    date: 'March 5, 2024',
    summary: "Comprehensive overview of APPI's activities, achievements, and impact across Africa in 2023.",
    meta: 'Report',
  },
]

export const thoughtLeadershipCatalog: InsightListItem[] = [
  {
    title: 'The Future of Democratic Governance in Africa',
    date: 'March 15, 2024',
    summary:
      'An exploration of emerging trends and challenges in democratic governance across the African continent.',
    meta: 'Governance · Dr. Sarah Johnson · 8 min read',
  },
  {
    title: 'Youth Political Participation: Beyond the Ballot Box',
    date: 'March 10, 2024',
    summary:
      'How young people are reshaping political participation through digital platforms and grassroots movements.',
    meta: 'Youth Engagement · Prof. Michael Chen · 6 min read',
  },
  {
    title: 'Women in Political Leadership: Breaking the Glass Ceiling',
    date: 'March 5, 2024',
    summary:
      'Analysis of progress and remaining challenges for women in political leadership across Africa.',
    meta: 'Gender Equality · Dr. Amina Hassan · 10 min read',
  },
  {
    title: 'Digital Democracy: Technology and Political Participation',
    date: 'February 28, 2024',
    summary:
      'How digital technologies are transforming political participation and democratic processes.',
    meta: 'Technology · Tech Policy Institute · 7 min read',
  },
]

export const eventsCatalog: InsightListItem[] = [
  {
    title: 'African Political Parties Summit 2025 (APPS)',
    date: 'August 12–14, 2025',
    summary:
      'Flagship continental convening in Accra, Ghana — heads of state, party leaders, and political thinkers.',
    meta: 'Summit · Accra, Ghana · Registration open',
  },
  {
    title: 'Youth Leadership Workshop',
    date: 'April 20–22, 2024',
    summary: 'Capacity-building workshop for emerging political leaders and party professionals.',
    meta: 'Workshop · Accra, Ghana',
  },
  {
    title: 'Women in Politics Conference',
    date: 'May 10–12, 2024',
    summary: 'Conference focused on inclusive leadership and women’s pathways into political office.',
    meta: 'Conference · Addis Ababa, Ethiopia',
  },
]

export const mediaCoverageCatalog: InsightListItem[] = [
  {
    title: 'APPI Summit Draws Political Leaders from Across Africa',
    date: 'March 15, 2024',
    summary: 'Coverage of continental leaders convening for the African Political Parties Summit.',
    meta: 'Summit Coverage',
    source: 'BBC Africa',
  },
  {
    title: 'Youth Political Participation on the Rise',
    date: 'March 10, 2024',
    summary: 'Feature on APPI youth leadership programmes and emerging political engagement.',
    meta: 'Youth Engagement',
    source: 'Al Jazeera',
  },
  {
    title: 'APPI Launches New Governance Initiative',
    date: 'March 5, 2024',
    summary: 'Report on institutional reform priorities and cross-party collaboration.',
    meta: 'Initiative Launch',
    source: 'Reuters',
  },
]

export const enCatalog = {
  publications: publicationsCatalog,
  press: pressCatalog,
  thoughtLeadership: thoughtLeadershipCatalog,
  events: eventsCatalog,
  media: mediaCoverageCatalog,
} as const
