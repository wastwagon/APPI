import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import MainLayout from '@/app/main-layout'

export default function Privacy() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>
                Last updated: January 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
                  <p className="text-gray-600 mb-4">
                    We collect information you provide directly to us, such as when you create an account, 
                    register for events, or contact us. This may include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Professional information (organization, position)</li>
                    <li>Political party affiliation</li>
                    <li>Profile pictures and documents</li>
                    <li>Communication preferences</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-600 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Provide and maintain our services</li>
                    <li>Process registrations and manage accounts</li>
                    <li>Send you updates and communications</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
                  <p className="text-gray-600 mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>With your explicit consent</li>
                    <li>To comply with legal requirements</li>
                    <li>To protect our rights and safety</li>
                    <li>With service providers who assist in our operations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
                  <p className="text-gray-600 mb-4">
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. However, no method of 
                    transmission over the internet is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">5. Cookies and Tracking</h2>
                  <p className="text-gray-600 mb-4">
                    We use cookies and similar technologies to enhance your experience on our website. 
                    You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
                  <p className="text-gray-600 mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Opt out of communications</li>
                    <li>Withdraw consent at any time</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">7. Data Retention</h2>
                  <p className="text-gray-600 mb-4">
                    We retain your personal information for as long as necessary to provide our services 
                    and comply with legal obligations. You may request deletion of your account and 
                    associated data at any time.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">8. International Transfers</h2>
                  <p className="text-gray-600 mb-4">
                    Your information may be transferred to and processed in countries other than your own. 
                    We ensure appropriate safeguards are in place to protect your information.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">9. Children's Privacy</h2>
                  <p className="text-gray-600 mb-4">
                    Our services are not intended for children under 13 years of age. We do not knowingly 
                    collect personal information from children under 13.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">10. Changes to This Policy</h2>
                  <p className="text-gray-600 mb-4">
                    We may update this privacy policy from time to time. We will notify you of any changes 
                    by posting the new policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this Privacy Policy, please contact us at:
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
