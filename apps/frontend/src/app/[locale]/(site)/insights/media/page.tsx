import { getTranslations } from 'next-intl/server'
import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { fetchMediaByFolder, mediaPublicUrl } from '@/lib/media-server'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { YoutubeEmbed } from '@/components/media/youtube-embed'

export default async function InsightsMediaPage() {
  const t = await getTranslations('media')
  const [press, videos] = await Promise.all([
    fetchMediaByFolder('press', { take: 24 }),
    fetchMediaByFolder('press', { type: 'video' }),
  ])

  const images = press.filter((p) => p.type === 'image')
  const documents = press.filter((p) => p.type === 'document')

  return (
    <>
      <ProgrammeBrief
        namespace="content.insights.media"
        eyebrowKey="insights"
        imageKey="appsSummit"
      />

      <div className="site-container mx-auto max-w-3xl space-y-10 pb-16">
        {videos.length > 0 && (
          <section>
            <h2 className="font-serif text-xl font-semibold text-ink">{t('videos')}</h2>
            <div className="mt-4 space-y-6">
              {videos.map((v) =>
                v.youtubeId ? (
                  <YoutubeEmbed key={v.id} youtubeId={v.youtubeId} title={v.title ?? 'Video'} />
                ) : null
              )}
            </div>
          </section>
        )}

        {images.length > 0 && (
          <section>
            <h2 className="font-serif text-xl font-semibold text-ink">{t('images')}</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {images.map((img) => (
                <li key={img.id} className="relative aspect-video overflow-hidden rounded-xl border border-edge">
                  <Image
                    src={mediaPublicUrl(img.url)}
                    alt={img.altText ?? img.title ?? ''}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </li>
              ))}
            </ul>
          </section>
        )}

        {documents.length > 0 && (
          <section>
            <h2 className="font-serif text-xl font-semibold text-ink">{t('documents')}</h2>
            <ul className="mt-4 space-y-3">
              {documents.map((doc) => (
                <li key={doc.id}>
                  <a
                    href={mediaPublicUrl(doc.url)}
                    className="flex items-center justify-between rounded-xl border border-edge px-5 py-4 hover:border-accent-blue/30"
                  >
                    <span className="font-medium text-ink">{doc.title ?? doc.id}</span>
                    <Download className="h-4 w-4 text-accent-blue" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {press.length === 0 && (
          <p className="text-center text-sm text-ink-muted">{t('noAssets')}</p>
        )}
      </div>
    </>
  )
}
