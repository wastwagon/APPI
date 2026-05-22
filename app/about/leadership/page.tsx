"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Building, UserCheck, Award } from 'lucide-react'

export default function LeadershipPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Leadership & Governance
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Institutional Structure and Oversight
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Institutional Coordination and Oversight
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              The African Political Parties Initiative (APPI) is coordinated under the strategic leadership 
              of the Africa Governance Centre (AGC), which serves as the institutional anchor for the initiative.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">The APPI Steering Committee</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">APPI's highest policy and governance oversight body providing strategic direction.</p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Building className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Executive Secretariat</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Responsible for operational delivery and coordination of APPI's work.</p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Party Engagement Representatives</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Senior members designated by each participating political party.</p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Strategic Advisory Group</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Distinguished African and global advisors providing independent analysis.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Transparent and Accountable Governance
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/about/framework">
                View Implementation Framework
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/contact/secretariat">
                Contact the Secretariat
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
