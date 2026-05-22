import { youtubeEmbedUrl } from '@/lib/youtube'

type YoutubeEmbedProps = {
  youtubeId: string
  title?: string
  className?: string
}

/** Responsive 16:9 YouTube embed from a media-library video ID */
export function YoutubeEmbed({ youtubeId, title = 'Video', className }: YoutubeEmbedProps) {
  return (
    <div className={className ?? 'relative aspect-video w-full overflow-hidden rounded-2xl bg-ink'}>
      <iframe
        src={youtubeEmbedUrl(youtubeId)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  )
}
