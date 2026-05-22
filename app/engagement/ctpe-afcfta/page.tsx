'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Globe, 
  TrendingUp, 
  Users, 
  BookOpen,
  ArrowRight,
  Calendar,
  MapPin
} from 'lucide-react'
import Link from 'next/link'

import MainLayout from '@/app/main-layout'

export default function CTPEAfCFTAPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-appi-blue to-appi-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              CTPE-AfCFTA
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Supporting the Continental Free Trade Area through political party engagement and capacity development
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                Learn More
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                Join Initiative
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About CTPE-AfCFTA
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                The Continental Free Trade Area (AfCFTA) represents a historic opportunity for Africa's economic integration. 
                APPI's CTPE-AfCFTA initiative works to ensure political parties across the continent understand, support, 
                and actively participate in the implementation of this transformative trade agreement.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Through capacity building, policy dialogue, and stakeholder engagement, we empower political parties 
                to become champions of continental economic integration and sustainable development.
              </p>
              <Button size="lg" className="bg-appi-blue hover:bg-appi-blue/90">
                Download Brochure
              </Button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Objectives</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-appi-blue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Policy Understanding</h4>
                    <p className="text-gray-600">Enhance political parties' understanding of AfCFTA policies and implementation strategies.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-appi-blue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Capacity Development</h4>
                    <p className="text-gray-600">Build the capacity of political parties to engage effectively in trade policy discussions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-appi-blue text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Stakeholder Engagement</h4>
                    <p className="text-gray-600">Facilitate dialogue between political parties, governments, and private sector stakeholders.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Focus Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach to supporting AfCFTA implementation through political party engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <BookOpen className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Trade Policy Education</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Comprehensive training programs on AfCFTA provisions, benefits, and implementation challenges.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Economic Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Supporting policies and strategies for effective continental economic integration.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <Users className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Stakeholder Engagement</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Facilitating dialogue between political parties, governments, and private sector actors.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <Globe className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Capacity Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Building the capacity of political parties to engage effectively in trade policy discussions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the CTPE-AfCFTA Initiative
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the movement to strengthen Africa's economic integration through political party engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Get Involved
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
