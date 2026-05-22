"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Target, Award, Globe } from 'lucide-react'

export default function WorkingGroupsPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Working Groups
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Thematic expert groups for policy development and reform implementation
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Expert-Led Policy Development
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Working Groups bring together political party representatives, policy experts, and stakeholders 
              to develop concrete policy recommendations and reform frameworks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Expert Collaboration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cross-party collaboration with policy experts and stakeholders.
                </p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Target className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Policy Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Development of concrete policy recommendations and frameworks.
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
              Working Group Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key components of effective working groups
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Thematic Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Specialized groups focused on specific policy areas and reform themes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Continental Perspective</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Regional and continental policy alignment and coordination.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Implementation Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Technical support for policy implementation and monitoring.
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
            Join a Working Group
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact/secretariat">
                Express Interest
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/insights">
                View Working Group Reports
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
