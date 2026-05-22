"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users, GraduationCap, Users2, MessageSquare, Globe, Handshake, Building } from 'lucide-react'

export default function StrategicObjectivesPage() {
  const strategicPillars = [
    {
      title: 'African Political Parties Summit (APPS)',
      description: 'The flagship convening of heads of state, party leaders, and political thinkers—held annually to shape collective agendas for political reform, policy innovation, and inter-party cooperation.',
      icon: Users,
      href: '/platforms/summit'
    },
    {
      title: 'Political Academy for Transformative Leadership',
      description: 'A leadership and capacity development platform for young politicians, emerging leaders, and party executives, focused on values-based leadership and practical governance skills.',
      icon: GraduationCap,
      href: '/platforms/academy'
    },
    {
      title: 'Thematic Working Groups and Policy Clusters',
      description: 'Cross-party platforms dedicated to knowledge exchange, policy design, and institutional learning on key governance and development issues.',
      icon: Users2,
      href: '/platforms/working-groups'
    },
    {
      title: 'Country-Level Reform Dialogues',
      description: 'Structured national engagements supporting political reform, party development, democratic transitions, and institutional capacity-building.',
      icon: MessageSquare,
      href: '/platforms/reform-dialogues'
    },
    {
      title: 'Inclusive Leadership Platforms',
      description: 'Dedicated spaces to promote the full participation of youth, women, and marginalized groups in political decision-making and party leadership.',
      icon: Handshake,
      href: '/platforms/inclusive-leadership'
    },
    {
      title: 'Continental Taskforce on Political Engagement for AfCFTA (CTPE-AfCFTA)',
      description: 'A unique initiative aligning political parties, the AfCFTA Secretariat, and the private sector to drive political buy-in and accountability for regional trade and industrial transformation.',
      icon: Building,
      href: '/platforms/ctpe-afcfta'
    }
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Strategic Objectives
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Our Pillars and Strategic Framework
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Strategic Pillars of the Initiative
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              APPI's work is organized around seven core strategic pillars, each designed to address 
              specific gaps in Africa's political system architecture and contribute to the overall 
              transformation of political parties across the continent.
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Pillars Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strategicPillars.map((pillar) => (
              <Card key={pillar.title} className="hover:shadow-lg transition-shadow border-appi-blue">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <pillar.icon className="h-8 w-8 text-appi-blue" />
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="border-appi-blue text-appi-blue hover:bg-appi-blue hover:text-white">
                    <Link href={pillar.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why APPI Matters Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why APPI Matters
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                In many African countries, political parties have increasingly become disconnected 
                from national development priorities and face deep institutional weaknesses. APPI 
                responds to this challenge by:
              </p>
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
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Approach</h3>
              <p className="text-gray-600 mb-6">
                Through non-partisan, inclusive, and country-specific strategies, APPI aims to contribute 
                to long-term institutional reform and regional political stability.
              </p>
              <p className="text-gray-600">
                Each pillar is designed to work both independently and in synergy with others, 
                creating a comprehensive framework for political transformation across Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Get Involved
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join the movement to reimagine political parties as vehicles for transformation in Africa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-appi-blue mx-auto mb-4" />
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

            <Card className="text-center">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-appi-blue mx-auto mb-4" />
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

            <Card className="text-center">
              <CardHeader>
                <Building className="h-12 w-12 text-appi-blue mx-auto mb-4" />
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

            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 text-appi-blue mx-auto mb-4" />
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
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform African Politics?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Explore our platforms and discover how you can contribute to strengthening democratic 
            governance across Africa.
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
