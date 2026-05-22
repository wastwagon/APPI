'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ExternalLink, 
  Calendar, 
  Globe
} from 'lucide-react'

const mediaCoverage = [
  {
    title: 'APPI Summit Draws Political Leaders from Across Africa',
    source: 'BBC Africa',
    date: 'March 15, 2024',
    url: '#',
    category: 'Summit Coverage'
  },
  {
    title: 'Youth Political Participation on the Rise',
    source: 'Al Jazeera',
    date: 'March 10, 2024',
    url: '#',
    category: 'Youth Engagement'
  },
  {
    title: 'APPI Launches New Governance Initiative',
    source: 'Reuters',
    date: 'March 5, 2024',
    url: '#',
    category: 'Initiative Launch'
  }
]

import MainLayout from '@/app/main-layout'

export default function MediaPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-appi-blue to-appi-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Media Coverage
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              See how APPI is being covered in the media across Africa and beyond
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                View All Coverage
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                Submit Coverage
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recent Media Coverage
            </h2>
            <p className="text-xl text-gray-600">
              Latest news and features about APPI in the media
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {mediaCoverage.map((coverage) => (
              <Card key={coverage.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-appi-blue border-appi-blue">
                      {coverage.category}
                    </Badge>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{coverage.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{coverage.title}</CardTitle>
                  <CardDescription className="text-base">
                    {coverage.source}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Read Article
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
            Share Your Coverage
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Have you covered APPI in your media outlet? Let us know and we'll feature it here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Submit Coverage
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Contact Communications
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
