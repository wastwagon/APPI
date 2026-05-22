import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import MainLayout from '@/app/main-layout'

export default function Accessibility() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Statement</CardTitle>
              <CardDescription>
                Last updated: January 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-semibold mb-4">Our Commitment</h2>
                  <p className="text-gray-600 mb-4">
                    The African Political Parties Initiative (APPI) is committed to ensuring digital accessibility 
                    for people with disabilities. We are continually improving the user experience for everyone 
                    and applying the relevant accessibility standards.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Conformance Status</h2>
                  <p className="text-gray-600 mb-4">
                    The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and 
                    developers to improve accessibility for people with disabilities. It defines three levels 
                    of conformance: Level A, Level AA, and Level AAA.
                  </p>
                  <p className="text-gray-600 mb-4">
                    APPI is partially conformant with WCAG 2.1 level AA. Partially conformant means that 
                    some parts of the content do not fully conform to the accessibility standard.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
                  <p className="text-gray-600 mb-4">
                    Our website includes the following accessibility features:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Semantic HTML structure for better screen reader compatibility</li>
                    <li>Alternative text for images and graphics</li>
                    <li>Keyboard navigation support</li>
                    <li>High contrast color schemes</li>
                    <li>Resizable text and zoom functionality</li>
                    <li>Clear and consistent navigation</li>
                    <li>Form labels and error messages</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Known Limitations</h2>
                  <p className="text-gray-600 mb-4">
                    While we strive to ensure our website is accessible, we acknowledge that there may be 
                    some limitations:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Some older PDF documents may not be fully accessible</li>
                    <li>Third-party content and links may not meet our accessibility standards</li>
                    <li>Some interactive elements may require additional testing with assistive technologies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Feedback and Contact</h2>
                  <p className="text-gray-600 mb-4">
                    We welcome your feedback on the accessibility of our website. If you experience 
                    accessibility barriers or have suggestions for improvement, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                      <strong>Email:</strong> appi@africagovernancecentre.org<br />
                      <strong>Phone:</strong> +233 53 054 5528<br />
                      <strong>Address:</strong> 32 Hackman Owusu Agyeman Street, East Legon, Accra – Ghana
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Technical Specifications</h2>
                  <p className="text-gray-600 mb-4">
                    Accessibility of our website relies on the following technologies to work with the 
                    particular combination of web browser and any assistive technologies or plugins installed 
                    on your computer:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>HTML</li>
                    <li>WAI-ARIA</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                  </ul>
                  <p className="text-gray-600 mb-4">
                    These technologies are relied upon for conformance with the accessibility standards used.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Assessment Methods</h2>
                  <p className="text-gray-600 mb-4">
                    APPI assessed the accessibility of our website by the following approaches:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Self-evaluation using accessibility testing tools</li>
                    <li>Manual testing with keyboard navigation</li>
                    <li>Review of color contrast and typography</li>
                    <li>Testing with screen readers</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Continuous Improvement</h2>
                  <p className="text-gray-600 mb-4">
                    We are committed to continuously improving the accessibility of our website. This includes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Regular accessibility audits</li>
                    <li>Staff training on accessibility best practices</li>
                    <li>Incorporating accessibility into our development process</li>
                    <li>Staying updated with accessibility standards and guidelines</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Compatibility</h2>
                  <p className="text-gray-600 mb-4">
                    Our website is designed to be compatible with the following assistive technologies:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mb-4">
                    <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                    <li>Screen magnification software</li>
                    <li>Speech recognition software</li>
                    <li>Keyboard-only navigation</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-semibold mb-4">Updates to This Statement</h2>
                  <p className="text-gray-600 mb-4">
                    We will review and update this accessibility statement regularly to reflect our ongoing 
                    commitment to accessibility and any improvements made to our website.
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
