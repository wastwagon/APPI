import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { PageHero } from '@/components/layout/page-hero'
import { ContentProse } from '@/components/layout/content-prose'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

type PlatformPageProps = {
  title: string
  description: string
  children?: React.ReactNode
  cta?: { label: string; href: string }
}

export async function PlatformPage({ title, description, children, cta }: PlatformPageProps) {
  const t = await getTranslations('common')
  const tNav = await getTranslations('nav')

  return (
    <>
      <PageHero eyebrow={tNav('platforms')} title={title} description={description}>
        <Link
          href="/platforms"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-blue transition-colors hover:text-accent-teal"
        >
          <ArrowLeft className="h-4 w-4" /> {t('allPlatforms')}
        </Link>
      </PageHero>
      <ContentProse>{children}</ContentProse>
      {cta && (
        <div className="site-container pb-20">
          <Button asChild variant="primary" className="shadow-soft">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>
      )}
    </>
  )
}
