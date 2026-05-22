import { HomeHero } from '@/components/sections/home-hero'
import { HomeStats } from '@/components/sections/home-stats'
import { HomeAbout } from '@/components/sections/home-about'
import { HomeInsights } from '@/components/sections/home-insights'
import { HomeContact } from '@/components/sections/home-contact'
import { PillarCards } from '@/components/sections/pillar-cards'
import { CtaBand } from '@/components/sections/cta-band'

export default async function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeStats />
      <HomeAbout />
      <PillarCards />
      <HomeInsights />
      <HomeContact />
      <CtaBand />
    </>
  )
}
