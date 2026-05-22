"use client"
import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users, GraduationCap, Users2, MessageSquare, Globe, Handshake, Shield } from 'lucide-react'

export default function PlatformsPage() {
  const platforms = [
    {
      title: 'African Political Parties Summit (APPS)',
      description: 'Annual flagship convening of heads of state, party leaders, and political thinkers.',
      icon: Users,
      href: '/platforms/summit',
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Political Academy for Transformative Leadership',
      description: 'Leadership and capacity development platform for young politicians and emerging leaders.',
      icon: GraduationCap,
      href: '/platforms/academy',
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Thematic Working Groups',
      description: 'Cross-party platforms for knowledge exchange and policy design.',
      icon: Users2,
      href: '/platforms/working-groups',
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Country-Level Reform Dialogues',
      description: 'National platforms for political dialogue and governance improvement.',
      icon: MessageSquare,
      href: '/platforms/reform-dialogues',
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Inclusive Leadership Platforms',
      description: 'Dedicated spaces for youth, women, and marginalized groups.',
      icon: Handshake,
      href: '/platforms/inclusive-leadership',
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Regional Learning Hubs',
      description: 'Regional knowledge ecosystems for cross-border collaboration.',
      icon: Globe,
      href: '/platforms/learning-hubs',
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Conflict Mediation Unit (CMDAU)',
      description: 'Neutral support for political parties navigating conflicts and transitions.',
      icon: Shield,
      href: '/platforms/mediation',
      image: '/images/placeholder.jpg',
    }
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/placeholder.jpg"
            alt="African Political Platforms"
            fill
            className="object-cover"
            priority
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Platforms
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Delivering Transformative Change through Structured Engagement
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Seven Core Programmatic Platforms
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              At the heart of APPI are seven core programmatic platforms that serve as operational 
              pillars for implementing our strategic vision into action.
            </p>
          </div>
        </div>
      </section>

      {/* Platforms Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platforms.map((platform) => (
              <Card key={platform.title} className="hover:shadow-lg transition-shadow border-appi-blue overflow-hidden group">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={platform.image}
                    alt={platform.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <platform.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{platform.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="border-appi-blue text-appi-blue hover:bg-appi-blue hover:text-white w-full">
                    <Link href={platform.href}>
                      Explore Platform
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-appi-blue text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/placeholder.jpg"
            alt="African Political Transformation"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform African Politics?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/summit">
                Register for the Summit
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
