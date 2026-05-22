import { InsightsCatalogPage } from '@/components/content/insights-catalog-page'
import { PressMediaCta } from '@/components/content/press-media-cta'

export default function PressPage() {
  return (
    <>
      <InsightsCatalogPage catalogSlug="press" />
      <PressMediaCta />
    </>
  )
}
