"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Users, Award, Globe } from 'lucide-react'

export default function MediationPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Political Mediation Platform
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Facilitating dialogue and conflict resolution between political parties
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Conflict Resolution and Dialogue
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              This platform provides mediation services and facilitates dialogue between political parties 
              to resolve conflicts and promote peaceful political transitions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Mediation Services</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Professional mediation services for political conflicts and disputes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Dialogue Facilitation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Structured dialogue processes to build understanding and consensus.
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
              Key components for effective political mediation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Neutral Mediation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Impartial mediation services by trained professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Regional Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mediators with deep understanding of local political contexts.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Conflict Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Early intervention to prevent escalation of political tensions.
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
            Request Mediation Services
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact/mediation">
                Contact Mediation Team
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/contact/secretariat">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
