import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download, ArrowRight } from 'lucide-react'

export default function FrameworkPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              APPI Implementation Framework
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Strategic Document and Roadmap
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Purpose of the Framework
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              The APPI Implementation Framework is the core strategic document that guides the vision, 
              structure, delivery, and long-term institutionalisation of the African Political Parties Initiative.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-appi-blue">
              <CardHeader>
                <CardTitle className="text-xl">Strategic Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Anchored in the vision of an Africa where political parties are transformed into 
                  democratic institutions of integrity, equipped to lead national development and inclusive governance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <CardTitle className="text-xl">Core Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Strengthen internal party governance and institutional development</li>
                  <li>• Promote democratic values and inclusive leadership</li>
                  <li>• Facilitate inter-party collaboration on national reform</li>
                  <li>• Align political party platforms with continental priorities</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Framework Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-appi-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Vision & Context</h4>
                <p className="text-gray-600 text-sm">Foundational rationale and strategic ambitions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-appi-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Governance Architecture</h4>
                <p className="text-gray-600 text-sm">Structures, roles, and safeguards</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-appi-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Programmatic Platforms</h4>
                <p className="text-gray-600 text-sm">Operational arms and delivery mechanisms</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-appi-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Accountability & Partnerships</h4>
                <p className="text-gray-600 text-sm">MEL system and sustainability arrangements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Download the Framework
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access the complete APPI Implementation Framework and related documents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Full Framework</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Complete APPI Implementation Framework</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="#">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Key highlights and strategic overview</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="#">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>National Action Plan Template</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Template for country-level implementation</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="#">
                    <Download className="mr-2 h-4 w-4" />
                    Download DOC
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Implement?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact/secretariat">
                Request Technical Briefing
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/platforms">
                Explore Our Platforms
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
