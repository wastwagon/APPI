import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import MainLayout from '@/app/main-layout'

export default function Terms() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
              <CardDescription>
                Last updated: January 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-600 mb-4">
                    By accessing and using the African Political Parties Initiative (APPI) website and services, 
                    you accept and agree to be bound by the terms and provision of this agreement.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
                  <p className="text-gray-600 mb-4">
                    Permission is granted to temporarily download one copy of the materials (information or software) 
                    on APPI's website for personal, non-commercial transitory viewing only.
                  </p>
                  <p className="text-gray-600 mb-4">
                    This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on APPI's website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
                  <p className="text-gray-600 mb-4">
                    The materials on APPI's website are provided on an 'as is' basis. APPI makes no warranties, 
                    expressed or implied, and hereby disclaims and negates all other warranties including without 
                    limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
                    or non-infringement of intellectual property or other violation of rights.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">4. Limitations</h2>
                  <p className="text-gray-600 mb-4">
                    In no event shall APPI or its suppliers be liable for any damages (including, without limitation, 
                    damages for loss of data or profit, or due to business interruption) arising out of the use or 
                    inability to use the materials on APPI's website, even if APPI or an APPI authorized representative 
                    has been notified orally or in writing of the possibility of such damage.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">5. Accuracy of Materials</h2>
                  <p className="text-gray-600 mb-4">
                    The materials appearing on APPI's website could include technical, typographical, or photographic 
                    errors. APPI does not warrant that any of the materials on its website are accurate, complete, 
                    or current. APPI may make changes to the materials contained on its website at any time without 
                    notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">6. Links</h2>
                  <p className="text-gray-600 mb-4">
                    APPI has not reviewed all of the sites linked to its website and is not responsible for the 
                    contents of any such linked site. The inclusion of any link does not imply endorsement by APPI 
                    of the site. Use of any such linked website is at the user's own risk.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">7. Modifications</h2>
                  <p className="text-gray-600 mb-4">
                    APPI may revise these terms of service for its website at any time without notice. By using 
                    this website you are agreeing to be bound by the then current version of these Terms of Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">8. Governing Law</h2>
                  <p className="text-gray-600 mb-4">
                    These terms and conditions are governed by and construed in accordance with the laws of Ghana 
                    and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                      <strong>Email:</strong> appi@africagovernancecentre.org<br />
                      <strong>Phone:</strong> +233 53 054 5528<br />
                      <strong>Address:</strong> 32 Hackman Owusu Agyeman Street, East Legon, Accra – Ghana
                    </p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
