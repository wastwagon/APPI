import { getTranslations } from 'next-intl/server'
import { resolveMediaUrl } from '@/lib/media'
import { HomeHeroCarousel, type HeroSlide } from './home-hero-carousel'

const FALLBACK_HERO = '/images/appi-launch-event.jpg'
const FALLBACK_ALT = 'African Political Parties Initiative launch'

async function getHeroFromLibrary(): Promise<{ src: string; alt: string }> {
  const apiBase = process.env.API_INTERNAL_URL ?? 'http://localhost:4000'
  try {
    const res = await fetch(
      `${apiBase}/api/v1/media?type=image&folder=heroes&take=1`,
      { next: { revalidate: 120 } }
    )
    if (!res.ok) return { src: FALLBACK_HERO, alt: FALLBACK_ALT }
    const data = (await res.json()) as {
      items?: { url: string; altText: string | null; title: string | null }[]
    }
    const item = data.items?.[0]
    if (!item?.url) return { src: FALLBACK_HERO, alt: FALLBACK_ALT }
    return {
      src: resolveMediaUrl(item.url),
      alt: item.altText ?? item.title ?? FALLBACK_ALT,
    }
  } catch {
    return { src: FALLBACK_HERO, alt: FALLBACK_ALT }
  }
}

export async function HomeHero() {
  const t = await getTranslations('home')
  const hero = await getHeroFromLibrary()

  const slides: HeroSlide[] = [
    {
      eyebrow: t('eyebrow'),
      title: t('title'),
      subtitle: t('subtitle'),
      primaryCta: t('discoverAppi'),
      primaryHref: '/about',
      secondaryCta: t('summitCta'),
      secondaryHref: '/summit',
    },
    {
      eyebrow: t('slide2.eyebrow'),
      title: t('slide2.title'),
      primaryCta: t('slide2.primaryCta'),
      primaryHref: '/summit',
      secondaryCta: t('slide2.secondaryCta'),
      secondaryHref: '/platforms',
    },
  ]

  return <HomeHeroCarousel slides={slides} imageSrc={hero.src} imageAlt={hero.alt} />
}
