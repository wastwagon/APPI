'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Eye, Target, Users, Shield, Lightbulb, Handshake, ChevronRight, Home, Menu, X } from 'lucide-react'
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

export default function WhoWeArePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const principles = [
    {
      title: 'Democratic Governance',
      description: 'Upholding constitutionalism, rule of law, and the integrity of electoral and political systems.',
      icon: Shield,
    },
    {
      title: 'Inclusivity',
      description: 'Actively promoting the participation of women, youth, and marginalized communities in political life.',
      icon: Users,
    },
    {
      title: 'Non-partisanship',
      description: 'Serving as a neutral and inclusive platform for parties across the ideological spectrum.',
      icon: Handshake,
    },
    {
      title: 'Knowledge-Driven Reform',
      description: 'Promoting evidence-based political transformation through research, policy innovation, and institutional learning.',
      icon: Lightbulb,
    },
    {
      title: 'Accountability and Transparency',
      description: 'Supporting parties in becoming more open, transparent, and responsive to citizens.',
      icon: Shield,
    },
    {
      title: 'Continental Solidarity',
      description: 'Building a shared future through inter-party cooperation and alignment with Africa\'s broader governance and development goals.',
      icon: Handshake,
    },
  ]

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
              <Link href="/about" className="text-appi-blue hover:text-appi-green transition-colors">
                About
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Who We Are</span>
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
              <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20 rounded-2xl mb-16">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Who We Are
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                    Vision, Mission, and Principles
                  </p>
                </div>
              </section>

              {/* Overview Section */}
              <section className="py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                <p className="text-lg text-gray-600 mb-6">
                  The African Political Parties Initiative (APPI) is a continental platform designed to strengthen 
                  the role of political parties as engines of democratic governance, institutional development, 
                  and policy transformation.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  APPI operates as a non-partisan initiative under the coordination of the Africa Governance Centre 
                  (AGC) and is implemented in collaboration with national political parties, regional institutions, 
                  and strategic global partners.
                </p>
              </section>

              {/* Vision and Mission */}
              <section className="py-16 bg-gray-50 rounded-2xl mb-16">
                <div className="px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <Card className="border-appi-blue">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <Eye className="h-8 w-8 text-appi-blue" />
                          <CardTitle className="text-2xl">Vision</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          To build a continent where political parties are credible, capable, and constructive 
                          institutions that lead democratic governance and drive inclusive national and regional development.
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-appi-blue">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <Target className="h-8 w-8 text-appi-blue" />
                          <CardTitle className="text-2xl">Mission</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg text-gray-700 leading-relaxed">
                          To reposition political parties as central institutions for governance, policy development, 
                          and national transformation through structured reform, capacity building, and continental collaboration.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>

              {/* Core Objectives */}
              <section className="py-16 mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Objectives</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        Strengthen internal party governance and institutional development
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        Promote democratic values and inclusive leadership
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        Facilitate inter-party collaboration on national reform
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        Align political party platforms with continental priorities
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        Build the next generation of ethical political leaders
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                      <p className="text-gray-600">
                        Promote peace, dialogue, and democratic resilience
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Foundational Principles */}
              <section className="py-16 bg-gray-50 rounded-2xl mb-16">
                <div className="px-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Foundational Principles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {principles.map((principle) => (
                      <Card key={principle.title} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center space-x-3">
                            <principle.icon className="h-8 w-8 text-appi-blue" />
                            <CardTitle className="text-lg">{principle.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{principle.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="py-16 bg-appi-blue text-white rounded-2xl">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-6">
                    Join Our Mission
                  </h2>
                  <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                    Together, we can build stronger, more accountable, and development-driven political systems across Africa.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="secondary">
                      <Link href="/about/strategic-objectives">
                        Learn About Our Strategy
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                      <Link href="/contact/secretariat">
                        Get in Touch
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
