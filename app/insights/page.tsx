import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, FileText, Users, Calendar, Newspaper, Globe } from 'lucide-react'

export default function InsightsPage() {
  const insightsSections = [
    {
      title: 'Publications',
      description: 'Policy briefs, toolkits, reports, and research papers on political reform and governance.',
      icon: FileText,
      href: '/insights/publications',
      count: '25+'
    },
    {
      title: 'Thought Leadership',
      description: 'Insights and reflections from political leaders and governance experts.',
      icon: Users,
      href: '/insights/thought-leadership',
      count: '50+'
    },
    {
      title: 'Events Calendar',
      description: 'Upcoming convenings, webinars, and regional workshops.',
      icon: Calendar,
      href: '/insights/events',
      count: '12'
    },
    {
      title: 'Press Releases',
      description: 'Official announcements and strategic developments from APPI.',
      icon: Newspaper,
      href: '/insights/press',
      count: '15+'
    },
    {
      title: 'Media Coverage',
      description: 'APPI\'s coverage across African and international media platforms.',
      icon: Globe,
      href: '/insights/media',
      count: '30+'
    }
  ]

  const featuredPublications = [
    {
      title: 'APPI Implementation Framework',
      description: 'Comprehensive strategic document guiding political party transformation across Africa.',
      type: 'Framework Document',
      date: '2024',
      href: '/insights/publications/framework'
    },
    {
      title: 'Political Financing Transparency Toolkit',
      description: 'Step-by-step guide for political parties to improve financial accountability.',
      type: 'Toolkit',
      date: '2024',
      href: '/insights/publications/financing-toolkit'
    },
    {
      title: 'Youth Political Leadership Report',
      description: 'Analysis of youth participation in African political systems and recommendations.',
      type: 'Research Report',
      date: '2024',
      href: '/insights/publications/youth-leadership'
    }
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Insights
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Knowledge, Research, and Thought Leadership on African Political Transformation
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Knowledge Hub for Political Transformation
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              APPI's insights platform provides comprehensive resources, research, and analysis 
              to support political party development and democratic governance across Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Insights Sections Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insightsSections.map((section) => (
              <Card key={section.title} className="hover:shadow-lg transition-shadow border-appi-blue">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <section.icon className="h-8 w-8 text-appi-blue" />
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                    <span className="text-sm font-medium text-appi-blue bg-appi-blue/10 px-2 py-1 rounded">
                      {section.count}
                    </span>
                  </div>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="border-appi-blue text-appi-blue hover:bg-appi-blue hover:text-white w-full">
                    <Link href={section.href}>
                      Explore {section.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Featured Publications
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our most important and widely-used knowledge resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPublications.map((publication) => (
              <Card key={publication.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-appi-blue bg-appi-blue/10 px-2 py-1 rounded">
                      {publication.type}
                    </span>
                    <span className="text-sm text-gray-500">{publication.date}</span>
                  </div>
                  <CardTitle className="text-lg">{publication.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {publication.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={publication.href}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Latest Updates
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay informed about the latest developments in African political transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-appi-blue pl-4">
                    <h4 className="font-semibold text-gray-900">African Political Parties Summit 2025 Registration Opens</h4>
                    <p className="text-sm text-gray-600">Registration is now open for APPS 2025 in Accra, Ghana</p>
                    <p className="text-xs text-gray-500">December 15, 2024</p>
                  </div>
                  <div className="border-l-4 border-appi-blue pl-4">
                    <h4 className="font-semibold text-gray-900">Political Academy Fellowship Applications</h4>
                    <p className="text-sm text-gray-600">Applications open for the 2026 cohort of transformative leadership</p>
                    <p className="text-xs text-gray-500">December 10, 2024</p>
                  </div>
                  <div className="border-l-4 border-appi-blue pl-4">
                    <h4 className="font-semibold text-gray-900">New Policy Brief on Electoral Reform</h4>
                    <p className="text-sm text-gray-600">Latest research on electoral system improvements across Africa</p>
                    <p className="text-xs text-gray-500">December 5, 2024</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full mt-6">
                  <Link href="/insights/press">View All News</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-appi-green pl-4">
                    <h4 className="font-semibold text-gray-900">Women's Leadership Summit</h4>
                    <p className="text-sm text-gray-600">March 8, 2025 - Accra, Ghana</p>
                    <p className="text-xs text-gray-500">Registration Required</p>
                  </div>
                  <div className="border-l-4 border-appi-green pl-4">
                    <h4 className="font-semibold text-gray-900">Youth Political Forum</h4>
                    <p className="text-sm text-gray-600">April 15, 2025 - Virtual Event</p>
                    <p className="text-xs text-gray-500">Open to All</p>
                  </div>
                  <div className="border-l-4 border-appi-green pl-4">
                    <h4 className="font-semibold text-gray-900">Working Group Meeting</h4>
                    <p className="text-sm text-gray-600">May 20, 2025 - Nairobi, Kenya</p>
                    <p className="text-xs text-gray-500">Members Only</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full mt-6">
                  <Link href="/insights/events">View All Events</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Stay Updated with APPI Insights
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter to receive the latest publications, research, 
            and insights on African political transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button size="lg" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
