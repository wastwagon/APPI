import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { SectionBlock } from '@/components/layout/section-block'
import { Download, Mail } from 'lucide-react'

export async function PressMediaCta() {
  const t = await getTranslations('pressMedia')

  return (
    <SectionBlock className="!bg-ink text-white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{t('title')}</h2>
        <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">{t('description')}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="warm" size="lg" className="w-full sm:w-auto">
            <Link href="/contact#inquiry">
              <Mail className="h-4 w-4" />
              {t('contactCta')}
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
          >
            <Link href="/summit/media">
              <Download className="h-4 w-4" />
              {t('kitCta')}
            </Link>
          </Button>
        </div>
      </div>
    </SectionBlock>
  )
}
