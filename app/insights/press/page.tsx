'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Calendar, 
  ArrowRight
} from 'lucide-react'

const pressReleases = [
  {
    title: 'APPI Launches New Youth Leadership Initiative',
    date: 'March 15, 2024',
    summary: 'The African Political Parties Initiative announces a comprehensive program to empower young political leaders across the continent.',
    category: 'Announcement'
  },
  {
    title: 'APPI Welcomes New Member Parties from West Africa',
    date: 'March 10, 2024',
    summary: 'Five new political parties from West Africa join APPI, strengthening our continental network.',
    category: 'Membership'
  },
  {
    title: 'APPI Releases Annual Report 2023',
    date: 'March 5, 2024',
    summary: 'Comprehensive overview of APPI\'s activities, achievements, and impact across Africa in 2023.',
    category: 'Report'
  }
]

import MainLayout from '@/app/main-layout'

export default function PressPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-appi-blue to-appi-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Press Releases
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Latest news and announcements from the African Political Parties Initiative
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                View All Releases
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                Media Kit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Press Releases
            </h2>
            <p className="text-xl text-gray-600">
              Stay informed about APPI's latest developments and initiatives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {pressReleases.map((release) => (
              <Card key={release.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-appi-blue border-appi-blue">
                      {release.category}
                    </Badge>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{release.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{release.title}</CardTitle>
                  <CardDescription className="text-base">
                    {release.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Read Full Release
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Media Inquiries
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            For media inquiries, interviews, or press materials, please contact our communications team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Contact Media Team
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Download Media Kit
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
