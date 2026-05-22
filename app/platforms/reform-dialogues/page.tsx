"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Users, Award, Globe } from 'lucide-react'

export default function ReformDialoguesPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Reform Dialogues
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Structured conversations on political reform and democratic transformation
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Cross-Party Policy Discussions
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              This platform facilitates structured dialogues between political parties on key reform issues, 
              policy alignment, and democratic governance challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Policy Dialogues</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Structured discussions on key policy areas and reform priorities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Cross-Party Engagement</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Bringing together parties from across the political spectrum.
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
              Dialogue Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key components of effective reform dialogues
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Structured Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Facilitated discussions with clear agendas and outcomes.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Regional Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dialogues tailored to regional political contexts and challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Actionable Outcomes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Concrete recommendations and implementation plans.
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
            Join the Reform Conversation
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact/secretariat">
                Participate in Dialogues
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/insights">
                View Dialogue Reports
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
