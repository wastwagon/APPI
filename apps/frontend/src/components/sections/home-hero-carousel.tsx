'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { SiteContainer } from '@/components/layout/site-container'

export type HeroSlide = {
  eyebrow: string
  title: string
  titleAccent?: string
  subtitle?: string
  primaryCta: string
  primaryHref: string
  secondaryCta?: string
  secondaryHref?: string
}

type HomeHeroCarouselProps = {
  slides: HeroSlide[]
  imageSrc: string
  imageAlt: string
}

export function HomeHeroCarousel({ slides, imageSrc, imageAlt }: HomeHeroCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 8000)
    return () => clearInterval(id)
  }, [slides.length])

  const slide = slides[index] ?? slides[0]

  return (
    <section className="relative min-h-[min(92vh,52rem)] overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover opacity-45 transition-opacity duration-700"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-mesh" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/50 to-ink/95" />
      </div>

      <SiteContainer className="relative flex min-h-[min(92vh,52rem)] flex-col justify-center py-24 sm:py-28 lg:py-32">
        <p className="eyebrow text-accent-gold">{slide.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {slide.title}
          {slide.titleAccent ? (
            <span className="mt-2 block text-xl font-normal text-white/85 sm:text-2xl lg:text-3xl">
              {slide.titleAccent}
            </span>
          ) : null}
        </h1>
        {slide.subtitle ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {slide.subtitle}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild variant="warm" size="lg" className="w-full shadow-lift sm:w-auto">
            <Link href={slide.primaryHref}>
              {slide.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          {slide.secondaryCta && slide.secondaryHref ? (
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full border-white/25 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
            >
              <Link href={slide.secondaryHref}>{slide.secondaryCta}</Link>
            </Button>
          ) : null}
        </div>
        {slides.length > 1 && (
          <div className="mt-10 flex gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-accent-gold' : 'w-2 bg-white/40'
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </SiteContainer>
    </section>
  )
}
