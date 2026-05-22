import type { InsightListItem } from './types'

const publicationsCatalog: InsightListItem[] = [
  {
    title: 'Gouvernance démocratique en Afrique : défis et opportunités',
    date: 'Mars 2024',
    summary:
      'Analyse des défis actuels de gouvernance démocratique en Afrique et recommandations pour renforcer les institutions politiques.',
    meta: 'Note de politique · Dr Sarah Johnson',
  },
  {
    title: 'Participation des jeunes aux processus politiques : perspective continentale',
    date: 'Février 2024',
    summary:
      'Étude sur l’engagement des jeunes dans les processus politiques et stratégies pour accroître la participation.',
    meta: 'Rapport de recherche · Prof. Michael Chen',
  },
  {
    title: 'Femmes au leadership politique : lever les barrières',
    date: 'Janvier 2024',
    summary:
      'Guide pratique pour les partis politiques afin de promouvoir le leadership et la participation des femmes.',
    meta: 'Boîte à outils · Secrétariat APPI',
  },
  {
    title: 'Réforme électorale et consolidation démocratique',
    date: 'Décembre 2023',
    summary:
      'Analyse des initiatives de réforme électorale et de leur impact sur la consolidation démocratique en Afrique.',
    meta: 'Note de politique · Dr Amina Hassan',
  },
]

const pressCatalog: InsightListItem[] = [
  {
    title: 'L’APPI lance une initiative de leadership jeunesse',
    date: '15 mars 2024',
    summary:
      'L’Initiative annonce un programme pour autonomiser les jeunes leaders politiques à travers le continent.',
    meta: 'Annonce',
  },
  {
    title: 'L’APPI accueille de nouveaux partis d’Afrique de l’Ouest',
    date: '10 mars 2024',
    summary: 'Cinq nouveaux partis rejoignent l’APPI, renforçant le réseau continental.',
    meta: 'Adhésion',
  },
  {
    title: 'L’APPI publie le rapport annuel 2023',
    date: '5 mars 2024',
    summary: 'Vue d’ensemble des activités, réalisations et impacts de l’APPI en 2023.',
    meta: 'Rapport',
  },
]

const thoughtLeadershipCatalog: InsightListItem[] = [
  {
    title: 'L’avenir de la gouvernance démocratique en Afrique',
    date: '15 mars 2024',
    summary: 'Tendances émergentes et défis de la gouvernance démocratique sur le continent.',
    meta: 'Gouvernance · Dr Sarah Johnson · 8 min',
  },
  {
    title: 'Participation politique des jeunes : au-delà du bulletin',
    date: '10 mars 2024',
    summary:
      'Comment les jeunes transforment la participation politique via le numérique et l’action de terrain.',
    meta: 'Jeunesse · Prof. Michael Chen · 6 min',
  },
  {
    title: 'Femmes au leadership : briser le plafond de verre',
    date: '5 mars 2024',
    summary: 'Progrès et défis persistants pour les femmes au leadership politique en Afrique.',
    meta: 'Égalité · Dr Amina Hassan · 10 min',
  },
  {
    title: 'Démocratie numérique : technologie et participation',
    date: '28 février 2024',
    summary: 'Impact des technologies numériques sur la participation et les processus démocratiques.',
    meta: 'Technologie · Tech Policy Institute · 7 min',
  },
]

const eventsCatalog: InsightListItem[] = [
  {
    title: 'Sommet des partis politiques africains 2025 (APPS)',
    date: '12–14 août 2025',
    summary: 'Convening phare à Accra — chefs d’État, dirigeants de partis et penseurs politiques.',
    meta: 'Sommet · Accra, Ghana · Inscriptions ouvertes',
  },
  {
    title: 'Atelier de leadership jeunesse',
    date: '20–22 avril 2024',
    summary: 'Renforcement des capacités pour leaders politiques émergents.',
    meta: 'Atelier · Accra, Ghana',
  },
  {
    title: 'Conférence femmes en politique',
    date: '10–12 mai 2024',
    summary: 'Leadership inclusif et parcours des femmes vers les fonctions électives.',
    meta: 'Conférence · Addis-Abeba, Éthiopie',
  },
]

const mediaCoverageCatalog: InsightListItem[] = [
  {
    title: 'Le sommet APPI réunit les dirigeants politiques d’Afrique',
    date: '15 mars 2024',
    summary: 'Couverture du rassemblement continental des leaders pour le sommet APPS.',
    meta: 'Couverture sommet',
    source: 'BBC Africa',
  },
  {
    title: 'La participation politique des jeunes en hausse',
    date: '10 mars 2024',
    summary: 'Reportage sur les programmes de leadership jeunesse de l’APPI.',
    meta: 'Engagement jeunesse',
    source: 'Al Jazeera',
  },
  {
    title: 'L’APPI lance une initiative de gouvernance',
    date: '5 mars 2024',
    summary: 'Priorités de réforme institutionnelle et collaboration interpartisane.',
    meta: 'Lancement',
    source: 'Reuters',
  },
]

export const frCatalog = {
  publications: publicationsCatalog,
  press: pressCatalog,
  thoughtLeadership: thoughtLeadershipCatalog,
  events: eventsCatalog,
  media: mediaCoverageCatalog,
} as const
