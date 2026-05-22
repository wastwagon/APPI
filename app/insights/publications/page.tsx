'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  FileText, 
  Download, 
  Calendar,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const publications = [
  {
    title: 'Democratic Governance in Africa: Challenges and Opportunities',
    type: 'Policy Brief',
    date: 'March 2024',
    author: 'Dr. Sarah Johnson',
    description: 'An analysis of current democratic governance challenges across Africa and recommendations for strengthening political institutions.',
    downloads: 1250,
    status: 'Published'
  },
  {
    title: 'Youth Participation in Political Processes: A Continental Perspective',
    type: 'Research Report',
    date: 'February 2024',
    author: 'Prof. Michael Chen',
    description: 'Comprehensive study on youth engagement in political processes and strategies for increasing participation.',
    downloads: 890,
    status: 'Published'
  },
  {
    title: 'Women in Political Leadership: Breaking Barriers',
    type: 'Toolkit',
    date: 'January 2024',
    author: 'APPI Secretariat',
    description: 'Practical guide for political parties on promoting women\'s leadership and participation.',
    downloads: 2100,
    status: 'Published'
  },
  {
    title: 'Electoral Reform and Democratic Consolidation',
    type: 'Policy Brief',
    date: 'December 2023',
    author: 'Dr. Amina Hassan',
    description: 'Analysis of electoral reform initiatives and their impact on democratic consolidation in Africa.',
    downloads: 750,
    status: 'Published'
  }
]

const publicationTypes = [
  'All Types',
  'Policy Brief',
  'Research Report',
  'Toolkit',
  'Working Paper',
  'Case Study'
]

import MainLayout from '@/app/main-layout'

export default function PublicationsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-appi-blue to-appi-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Publications
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Access our latest research, policy briefs, and resources on democratic governance and political party development
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                Browse All Publications
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search publications..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {publicationTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {publications.map((publication) => (
              <Card key={publication.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-appi-blue border-appi-blue">
                      {publication.type}
                    </Badge>
                    <Badge variant="secondary">
                      {publication.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{publication.title}</CardTitle>
                  <CardDescription className="text-base">
                    {publication.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>By {publication.author}</span>
                        <span>•</span>
                        <span>{publication.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{publication.downloads}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Publications
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Publications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Publications
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular and impactful publications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-appi-blue/10 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-appi-blue" />
                </div>
                <CardTitle className="text-lg">Annual Report 2023</CardTitle>
                <CardDescription>
                  Comprehensive overview of APPI's activities and impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-appi-blue/10 rounded-lg mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-appi-blue" />
                </div>
                <CardTitle className="text-lg">Policy Framework</CardTitle>
                <CardDescription>
                  APPI's policy framework for democratic governance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Framework
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-appi-blue/10 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-appi-blue" />
                </div>
                <CardTitle className="text-lg">Best Practices Guide</CardTitle>
                <CardDescription>
                  Collection of best practices in political party development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Guide
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to receive notifications about new publications and research updates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Subscribe to Updates
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Contact Research Team
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
