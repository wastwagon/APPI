import { getTranslations } from 'next-intl/server'
import { Download, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { ProgrammeBrief } from '@/components/layout/programme-brief'
import { Link } from '@/i18n/navigation'
import { fetchMediaByFolder, mediaPublicUrl } from '@/lib/media-server'
import { YoutubeEmbed } from '@/components/media/youtube-embed'

export default async function SummitMediaPage() {
  const t = await getTranslations('media')
  const [images, documents, videos] = await Promise.all([
    fetchMediaByFolder('summit', { type: 'image' }),
    fetchMediaByFolder('summit', { type: 'document' }),
    fetchMediaByFolder('summit', { type: 'video' }),
  ])

  const hasAny = images.length + documents.length + videos.length > 0

  return (
    <>
      <ProgrammeBrief
        namespace="content.summit.media"
        eyebrowKey="summit"
        imageKey="appiLaunch"
      />

      <div className="site-container mx-auto max-w-3xl space-y-10 pb-16">
        {!hasAny && (
          <p className="text-center text-sm text-ink-muted">{t('noAssets')}</p>
        )}

        {videos.length > 0 && (
          <section>
            <h2 className="font-serif text-xl font-semibold text-ink">{t('videos')}</h2>
            <div className="mt-4 space-y-6">
              {videos.map((v) =>
                v.youtubeId ? (
                  <div key={v.id}>
                    <YoutubeEmbed youtubeId={v.youtubeId} title={v.title ?? 'Video'} />
                    {v.title && <p className="mt-2 text-sm text-ink-muted">{v.title}</p>}
                  </div>
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
                <li key={img.id} className="overflow-hidden rounded-xl border border-edge">
                  <div className="relative aspect-video">
                    <Image
                      src={mediaPublicUrl(img.url)}
                      alt={img.altText ?? img.title ?? ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 320px"
                    />
                  </div>
                  {img.title && (
                    <p className="border-t border-edge px-3 py-2 text-sm text-ink">{img.title}</p>
                  )}
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-edge bg-paper-white px-5 py-4 hover:border-accent-blue/30"
                  >
                    <span className="font-medium text-ink">{doc.title ?? doc.fileName ?? doc.id}</span>
                    <Download className="h-4 w-4 text-accent-blue" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-center text-xs text-ink-muted">
          <Link href="/contact" className="inline-flex items-center gap-1 hover:text-accent-blue">
            {t('summitHub')} <ExternalLink className="h-3 w-3" />
          </Link>
        </p>
      </div>
    </>
  )
}
