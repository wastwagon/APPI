import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users, GraduationCap, Users2, MessageSquare, Globe, Handshake, Building } from 'lucide-react'

export default function HomePage() {
  const strategicPillars = [
    {
      title: 'African Political Parties Summit (APPS)',
      description: 'Annual flagship convening of heads of state, party leaders, and political thinkers.',
      icon: Users,
      image: '/images/African Political Parties Summit.jpg',
    },
    {
      title: 'Political Academy for Transformative Leadership',
      description: 'Leadership and capacity development platform for young politicians and emerging leaders.',
      icon: GraduationCap,
      image: '/images/Political Academy for Transformative Leadership.jpg',
    },
    {
      title: 'Thematic Working Groups',
      description: 'Cross-party platforms for knowledge exchange and policy design.',
      icon: Users2,
      image: '/images/Thematic Working Groups.jpg',
    },
    {
      title: 'Country-Level Reform Dialogues',
      description: 'National platforms for political dialogue and governance improvement.',
      icon: MessageSquare,
      image: '/images/Country-Level Reform Dialogues.jpg',
    },
    {
      title: 'Inclusive Leadership Platforms',
      description: 'Dedicated spaces for youth, women, and marginalized groups.',
      icon: Handshake,
      image: '/images/Inclusive Leadership Platforms.jpg',
    },
    {
      title: 'Continental Taskforce on Political Engagement for AfCFTA',
      description: 'Aligning political parties with regional trade and industrial transformation.',
      icon: Building,
      image: '/images/Continental Taskforce on Political Engagement for AfCFTA.jpg',
    }
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/appi-launch-event.jpg"
            alt="Official Launch of African Political Parties Initiative - APPI Launch Event"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <Image
                src="/images/appi-logo.png"
                alt="APPI Logo"
                width={200}
                height={80}
                className="mx-auto h-20 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl text-shadow-lg" style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), -2px -2px 4px rgba(0,0,0,0.8), 2px -2px 4px rgba(0,0,0,0.8), -2px 2px 4px rgba(0,0,0,0.8)'
            }}>
              African Political Parties Initiative
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-xl text-shadow-md" style={{
              textShadow: '1px 1px 3px rgba(0,0,0,0.9), -1px -1px 3px rgba(0,0,0,0.9), 1px -1px 3px rgba(0,0,0,0.9), -1px 1px 3px rgba(0,0,0,0.9)'
            }}>
              Reshaping Africa's Political Parties for Democratic and Economic Transformation
            </p>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto drop-shadow-xl text-shadow-md" style={{
              textShadow: '1px 1px 3px rgba(0,0,0,0.9), -1px -1px 3px rgba(0,0,0,0.9), 1px -1px 3px rgba(0,0,0,0.9), -1px 1px 3px rgba(0,0,0,0.9)'
            }}>
              From the Ballot to Governance — Strengthening Political Parties for Sustainable Development in Africa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-appi-blue hover:bg-gray-100 shadow-lg">
                <Link href="/about/who-we-are">
                  Learn More About APPI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue shadow-lg backdrop-blur-sm bg-white/10">
                <Link href="/summit">
                  Register for Summit 2025
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Continental Platform for Political Transformation
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The African Political Parties Initiative (APPI) is a continental platform committed to 
                repositioning political parties as central institutions for governance, policy development, 
                and national transformation.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                At a time when democratic systems across Africa face profound pressures, APPI provides 
                a strategic response—uniting political leaders, institutions, and citizens around a 
                shared vision for stronger, more accountable, and development-driven political systems.
              </p>
              <p className="text-lg text-gray-600">
                Anchored by the Africa Governance Centre (AGC), APPI supports structured political reform, 
                promotes intra-party democracy, advances leadership development, and facilitates collaboration 
                between political parties and public institutions.
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why APPI Matters</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                    <p className="text-gray-600">Strengthening internal party governance and accountability</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                    <p className="text-gray-600">Bridging the gap between political leadership and policy delivery</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                    <p className="text-gray-600">Fostering cross-party collaboration on governance and economic transformation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                    <p className="text-gray-600">Building the next generation of visionary, ethical political leaders</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                    <p className="text-gray-600">Promoting peace, dialogue, and democratic resilience across the continent</p>
                  </div>
                </div>
              </div>
              {/* Background Image */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-appi-blue/10 to-appi-teal/10 rounded-2xl transform rotate-3 scale-105"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Strategic Pillars of the Initiative
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach to transforming political parties across Africa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strategicPillars.map((pillar, index) => (
              <Card key={pillar.title} className="hover:shadow-lg transition-shadow border-appi-blue overflow-hidden group">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <pillar.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Get Involved
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join the movement to reimagine political parties as vehicles for transformation in Africa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/Political Parties.jpg"
                  alt="Political Parties"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Political Parties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Participate in APPI by engaging in policy clusters, summits, country dialogues, and leadership academies.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/engagement/parties">Join the Initiative</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/Youth and Women.jpg"
                  alt="Youth and Women"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Youth and Women</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Apply to our leadership fellowship programmes and participate in specialized forums.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/engagement/youth-women">Apply for Fellowships</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/Governments.jpg"
                  alt="Governments"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Building className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Governments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Collaborate with APPI through technical partnerships and institutional reform programmes.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/engagement/partner">Become a Partner</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/Development Partners.jpg"
                  alt="Development Partners"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <Globe className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Development Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Support APPI's institutional growth and capacity development programmes.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/engagement/partner">Support APPI</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-appi-blue text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/placeholder.jpg"
            alt="African Unity"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join the Movement for Political Transformation
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Through non-partisan, inclusive, and country-specific strategies, APPI aims to contribute 
            to long-term institutional reform and regional political stability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/platforms">
                Explore Our Platforms
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/contact/secretariat">
                Contact the Secretariat
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
