"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Award, Target, ArrowRight } from 'lucide-react'

export default function InclusiveLeadershipPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Inclusive Leadership Platform
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Advancing women and youth participation in political leadership
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Empowering Underrepresented Groups
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              This platform focuses on advancing women and youth participation in political leadership 
              through targeted programs, mentorship, and institutional reforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Women in Politics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Programs to increase women's representation and leadership in political parties and governance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Youth Leadership</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Initiatives to engage and develop young political leaders across the continent.
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
              Platform Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key components for advancing inclusive political leadership
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Leadership Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Specialized training programs for women and youth political leaders.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Mentorship Networks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cross-generational mentorship and networking opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Policy Advocacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advocacy for inclusive policies and institutional reforms.
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
            Join the Inclusive Leadership Movement
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/engagement/youth-women">
                Get Involved
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/contact/secretariat">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
