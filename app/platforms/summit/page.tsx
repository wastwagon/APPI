"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, Award, FileText, ArrowRight } from 'lucide-react'

export default function SummitPlatformPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              African Political Parties Summit (APPS)
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Annual flagship convening of heads of state, party leaders, and political thinkers
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Continental Forum for Political Transformation
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              APPI's annual flagship convening brings together heads of state, political party leaders, 
              governance institutions, academics, and development partners to shape collective agendas 
              for political reform, policy innovation, and inter-party cooperation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Purpose</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The Summit serves as a continental forum to review political progress, align priorities, 
                  issue joint declarations, and consolidate reform commitments.
                </p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Frequency</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Annual gathering held in different African countries, with the 2025 edition 
                  scheduled for Accra, Ghana from August 12-14.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Summit Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key components that make APPS the premier political gathering in Africa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Presidential Panel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  High-level discussions with heads of state and government leaders on political transformation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Strategic Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Policy alignment discussions on AfCFTA and Agenda 2063 implementation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Leadership Academy Launch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Official launch of the Political Academy for Transformative Leadership.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Join the Premier Political Gathering
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/summit/register">
                Register for APPS 2025
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/summit">
                Learn More About APPS
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
