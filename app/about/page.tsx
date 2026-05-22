'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Users, Target, Shield, FileText, MessageSquare, ChevronRight, Home, Menu, X } from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const aboutPages = [
  {
    title: "Who We Are",
    href: "/about/who-we-are",
    description: "Vision, Mission & Principles",
  },
  {
    title: "Strategic Objectives",
    href: "/about/strategic-objectives",
    description: "Our Strategic Pillars",
  },
  {
    title: "Leadership & Governance",
    href: "/about/leadership",
    description: "Our Leadership Team",
  },
  {
    title: "Implementation Framework",
    href: "/about/framework",
    description: "Framework Overview",
  },
  {
    title: "Declarations & Communiqués",
    href: "/about/declarations",
    description: "Official Statements",
  },
]

const aboutSections = [
  {
    title: 'Who We Are',
    description: 'Vision, Mission, and Core Principles',
    href: '/about/who-we-are',
    icon: Users,
    image: '/images/placeholder.jpg',
  },
  {
    title: 'Strategic Objectives',
    description: 'Our Pillars and Strategic Framework',
    href: '/about/strategic-objectives',
    icon: Target,
    image: '/images/placeholder.jpg',
  },
  {
    title: 'Leadership & Governance',
    description: 'Institutional Structure and Oversight',
    href: '/about/leadership',
    icon: Shield,
    image: '/images/placeholder.jpg',
  },
  {
    title: 'Implementation Framework',
    description: 'Strategic Document and Roadmap',
    href: '/about/framework',
    icon: FileText,
    image: '/images/placeholder.jpg',
  },
  {
    title: 'Declarations & Communiqués',
    description: 'Official Statements and Commitments',
    href: '/about/declarations',
    icon: MessageSquare,
    image: '/images/placeholder.jpg',
  },
]

export default function AboutPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-16">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-appi-blue hover:text-appi-green transition-colors flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">About</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden">
              <Button onClick={() => setIsSidebarOpen(!isSidebarOpen)} variant="outline" className="mb-4">
                {isSidebarOpen ? <X className="w-4 h-4 mr-2" /> : <Menu className="w-4 h-4 mr-2" />}
                Navigation
              </Button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`lg:w-80 ${isSidebarOpen ? "block" : "hidden lg:block"}`}>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">About APPI</h2>
                <nav className="space-y-2">
                  {aboutPages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={`block p-4 rounded-lg transition-all duration-200 ${
                        pathname === page.href
                          ? "bg-appi-blue text-white shadow-md"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <div className="font-medium">{page.title}</div>
                      <div
                        className={`text-sm mt-1 ${
                          pathname === page.href ? "text-white/80" : "text-gray-500"
                        }`}
                      >
                        {page.description}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Hero Section */}
              <section className="relative bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20 rounded-2xl mb-16 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="/images/placeholder.jpg"
                    alt="African Political Leaders"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                
                {/* Content */}
                <div className="relative text-center">
                  <div className="mb-8">
                    <Image
                      src="/images/appi-logo.png"
                      alt="APPI Logo"
                      width={150}
                      height={60}
                      className="mx-auto h-16 w-auto"
                    />
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    About APPI
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                    The African Political Parties Initiative (APPI) is a continental platform committed to 
                    repositioning political parties as central institutions for governance, policy development, 
                    and national transformation.
                  </p>
                </div>
              </section>

              {/* Overview Section */}
              <section className="py-16 bg-gray-50 rounded-2xl mb-16">
                <div className="px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Continental Platform for Political Transformation
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">
                        At a time when democratic systems across Africa face profound pressures, APPI provides 
                        a strategic response—uniting political leaders, institutions, and citizens around a 
                        shared vision for stronger, more accountable, and development-driven political systems.
                      </p>
                      <p className="text-lg text-gray-600 mb-8">
                        Anchored by the Africa Governance Centre (AGC), APPI supports structured political reform, 
                        promotes intra-party democracy, advances leadership development, and facilitates collaboration 
                        between political parties and public institutions.
                      </p>
                      <Button asChild size="lg" className="bg-appi-blue hover:bg-appi-blue-dark">
                        <Link href="/about/who-we-are">
                          Learn More About Our Mission
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="relative">
                      <div className="bg-white rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Why APPI Matters</h3>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                            <p className="text-gray-600">
                              Strengthening internal party governance and accountability
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                            <p className="text-gray-600">
                              Bridging the gap between political leadership and policy delivery
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                            <p className="text-gray-600">
                              Fostering cross-party collaboration on governance and economic transformation
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                            <p className="text-gray-600">
                              Building the next generation of visionary, ethical political leaders
                            </p>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                            <p className="text-gray-600">
                              Promoting peace, dialogue, and democratic resilience across the continent
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* Background decorative element */}
                      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-appi-blue/10 to-appi-teal/10 rounded-2xl transform rotate-3 scale-105"></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* About Sections Grid */}
              <section className="py-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Explore Our Organization
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Discover the structure, principles, and strategic framework that guide the African 
                    Political Parties Initiative.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aboutSections.map((section) => (
                    <Card key={section.title} className="hover:shadow-lg transition-shadow overflow-hidden group">
                      <div className="relative h-48 bg-gray-200">
                        <Image
                          src={section.image}
                          alt={section.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <section.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{section.title}</CardTitle>
                        <CardDescription className="text-gray-600">
                          {section.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild variant="outline" className="w-full">
                          <Link href={section.href}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section className="relative py-16 bg-appi-blue text-white rounded-2xl overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10">
                  <Image
                    src="/images/placeholder.jpg"
                    alt="African Unity"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                
                {/* Content */}
                <div className="relative text-center">
                  <h2 className="text-3xl font-bold mb-6">
                    Join the Movement for Political Transformation
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                    Through non-partisan, inclusive, and country-specific strategies, APPI aims to contribute 
                    to long-term institutional reform and regional political stability.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="secondary">
                      <Link href="/contact/secretariat">
                        Contact the Secretariat
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                      <Link href="/platforms">
                        Explore Our Platforms
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
