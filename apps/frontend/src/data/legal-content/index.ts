import type { AppLocale } from '@/i18n/routing'
import {
  privacyDocument,
  termsDocument,
  type LegalDocument,
} from '@/data/legacy-legal-content'
import { privacyDocumentAr, termsDocumentAr } from './ar'
import { privacyDocumentFr, termsDocumentFr } from './fr'

export function getPrivacyDocument(locale: string): LegalDocument {
  if (locale === 'fr') return privacyDocumentFr
  if (locale === 'ar') return privacyDocumentAr
  return privacyDocument
}

export function getTermsDocument(locale: string): LegalDocument {
  if (locale === 'fr') return termsDocumentFr
  if (locale === 'ar') return termsDocumentAr
  return termsDocument
}

export type { LegalDocument }
