"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Users, Award } from 'lucide-react'

export default function AcademyPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Political Academy for Transformative Leadership
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Leadership and capacity development platform for young politicians and emerging leaders
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Developing Ethical and Visionary Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              This academy develops a new generation of political leaders who are ethical, visionary, 
              policy-literate, and institutionally grounded through cross-party fellowships, leadership 
              training, and mentorship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Cross-Party Fellowships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fellowships that bring together emerging leaders from different political parties.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Leadership Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive training in values-based leadership and practical governance skills.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Mentorship Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Mentorship from experienced political leaders and governance experts.
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
            Apply for Leadership Development
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/engagement/youth-women">
                Apply for Fellowship
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/contact/secretariat">
                Contact the Academy
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
