"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Calendar, MapPin, Users, Award, FileText } from 'lucide-react'

export default function SummitPage() {
  const summitFeatures = [
    {
      title: 'Presidential Panel',
      description: 'High-level discussions with heads of state and government leaders.',
      icon: Users,
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Strategic Sessions',
      description: 'Policy alignment discussions on AfCFTA and Agenda 2063.',
      icon: FileText,
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Leadership Academy Launch',
      description: 'Official launch of the Political Academy for Transformative Leadership.',
      icon: Award,
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Women and Youth Forums',
      description: 'Dedicated spaces for inclusive political participation.',
      icon: Users,
      image: '/images/placeholder.jpg',
    },
    {
      title: 'Knowledge Exhibition',
      description: 'Showcase of party knowledge products and reform toolkits.',
      icon: FileText,
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
            alt="African Political Summit"
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
              African Political Parties Summit
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              From Politics to Prosperity: Strengthening Inter-Party Collaboration for Africa's Development and Economic Transformation
            </p>
          </div>
        </div>
      </section>

      {/* Summit Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                APPS 2025 - Accra, Ghana
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-appi-blue" />
                  <span className="text-lg text-gray-700">12-14 August 2025</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-appi-blue" />
                  <span className="text-lg text-gray-700">Accra, Ghana</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-appi-blue" />
                  <span className="text-lg text-gray-700">Heads of State, Party Leaders, Political Thinkers</span>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                The African Political Parties Summit (APPS) is APPI's annual flagship convening that 
                brings together heads of state, political party leaders, governance institutions, 
                academics, and development partners to shape collective agendas for political reform, 
                policy innovation, and inter-party cooperation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-appi-blue hover:bg-appi-blue-dark">
                  <Link href="/summit/register">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/summit/about">
                    Learn More About APPS
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Summit Highlights</h3>
                <div className="space-y-4">
                  {summitFeatures.map((feature) => (
                    <div key={feature.title} className="flex items-start space-x-3">
                      <feature.icon className="h-6 w-6 text-appi-blue mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Background decorative element */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-appi-blue/10 to-appi-teal/10 rounded-2xl transform rotate-3 scale-105"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Summit Purpose */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Purpose and Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The Summit serves as a continental forum to review political progress, align priorities, 
              issue joint declarations, and consolidate reform commitments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Political Reform"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Political Reform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Shape collective agendas for political reform and institutional strengthening 
                  across African political systems.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Policy Innovation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Policy Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Foster policy innovation and knowledge exchange between political parties 
                  and governance institutions.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Inter-Party Cooperation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Inter-Party Cooperation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Build bridges between political parties and facilitate cross-party collaboration 
                  on continental priorities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="relative py-16 bg-appi-blue text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/placeholder.jpg"
            alt="African Political Unity"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join the Premier Political Gathering in Africa
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Register now to participate in the African Political Parties Summit 2025 and 
            contribute to shaping the future of political governance in Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/summit/register">
                Register for APPS 2025
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/summit/media">
                Download Media Kit
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
