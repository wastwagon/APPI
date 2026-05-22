import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Calendar, Download } from 'lucide-react'

export default function DeclarationsPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Declarations & Communiqués
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Official Statements and Commitments
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Purpose of APPI Declarations
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              The declarations and communiqués produced under APPI reflect the collective political will 
              of participating parties, leaders, and institutional actors working to advance democratic 
              transformation across the continent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-appi-blue" />
                  <CardTitle className="text-xl">2025 African Women Political Leadership Summit Declaration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Accra, March 8, 2025 - Theme: Power, Voice, and Accountability
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="#">
                    <Download className="mr-2 h-4 w-4" />
                    Download Declaration
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-appi-blue" />
                  <CardTitle className="text-xl">African Political Parties Summit 2025 Declaration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  To be adopted in Accra, August 12-14, 2025
                </p>
                <Button asChild variant="outline" className="w-full" disabled>
                  <Link href="#">
                    Coming Soon
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
            Access and Endorsements
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact/secretariat">
                Contact the Secretariat
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/summit">
                Register for Summit
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
