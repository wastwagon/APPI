import Image, { type ImageProps } from 'next/image'
import { resolveMediaUrl } from '@/lib/media'

type MediaImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  /** Media library URL from API (e.g. /uploads/media/...) */
  src: string
  alt: string
}

/** Image served from the media library (uploads path or external URL) */
export function MediaImage({ src, alt, ...props }: MediaImageProps) {
  const resolved = resolveMediaUrl(src)
  if (resolved.startsWith('http')) {
    return <Image src={resolved} alt={alt} unoptimized {...props} />
  }
  return <Image src={resolved} alt={alt} {...props} />
}
