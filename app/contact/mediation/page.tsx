import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Phone, Mail, Clock } from 'lucide-react'

export default function MediationPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Mediation Team
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Get in touch with APPI's Conflict Mediation & Dialogue Advisory Unit
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Conflict Mediation & Dialogue Advisory Unit (CMDAU)
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              APPI's dedicated platform for supporting peaceful political engagement, conflict prevention, 
              democratic transitions, and political dispute resolution across the African continent.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">Emergency Contact</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  For urgent political crises requiring immediate mediation support.
                </p>
              </CardContent>
            </Card>

            <Card className="border-appi-blue">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Phone className="h-8 w-8 text-appi-blue" />
                  <CardTitle className="text-xl">General Inquiries</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  For general mediation and dialogue support requests.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Information
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete contact details for the CMDAU team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Emergency Hotline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  24/7 Response<br />
                  +233 XX XXX XXXX
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Email Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  mediation@appi-africa.org
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-appi-blue mx-auto mb-4" />
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Emergency: Immediate<br />
                  General: 24-48 hours
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
            Request Mediation Support
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Submit Request
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              <Link href="/platforms/mediation">
                Learn About Mediation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
