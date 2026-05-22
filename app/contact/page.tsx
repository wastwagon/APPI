"use client"

import MainLayout from '@/app/main-layout'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Instagram } from 'lucide-react'
import ContactForm from '@/components/contact-form'

export default function ContactPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/placeholder.jpg"
            alt="Contact APPI"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <Image
                src="/images/appi-logo.png"
                alt="APPI Logo"
                width={200}
                height={80}
                className="mx-auto h-20 w-auto"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Get in touch with the APPI Secretariat and connect with our team
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
                  <div className="relative h-24 bg-gray-200">
                    <Image
                      src="/images/placeholder.jpg"
                      alt="Email Contact"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">appi@africagovernancecentre.org</p>
                    <p className="text-sm text-gray-500 mt-2">We typically respond within 24 hours</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
                  <div className="relative h-24 bg-gray-200">
                    <Image
                      src="/images/placeholder.jpg"
                      alt="Phone Contact"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">+233 53 054 5528</p>
                    <p className="text-sm text-gray-500 mt-2">Mon-Fri: 8:00 AM - 6:00 PM GMT</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow overflow-hidden group">
                  <div className="relative h-24 bg-gray-200">
                    <Image
                      src="/images/placeholder.jpg"
                      alt="Office Address"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">32 Hackman Owusu Agyeman Street</p>
                    <p className="text-gray-600">East Legon, Accra – Ghana</p>
                    <p className="text-sm text-gray-500 mt-2">Headquarters of the APPI Secretariat</p>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow APPI</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-appi-blue transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-appi-blue transition-colors">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-appi-blue transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-appi-blue transition-colors">
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Quick Access
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find the information you need quickly with these direct links
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Summit Registration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
              </div>
              <CardHeader>
                <CardTitle>Summit Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Register for the African Political Parties Summit 2025
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/summit/register">Register Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Member Login"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
              </div>
              <CardHeader>
                <CardTitle>Member Login</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access your member portal and exclusive resources
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact/login">Login</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow overflow-hidden group">
              <div className="relative h-32 bg-gray-200">
                <Image
                  src="/images/placeholder.jpg"
                  alt="Newsletter"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-appi-blue/80 to-transparent"></div>
              </div>
              <CardHeader>
                <CardTitle>Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter for updates and insights
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact/social">Subscribe</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-appi-blue/5 to-appi-teal/5 rounded-2xl transform rotate-1 scale-105"></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Office Hours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">General Inquiries</h3>
                <div className="space-y-2">
                  <p className="text-gray-600"><span className="font-medium">Monday - Friday:</span> 8:00 AM - 6:00 PM GMT</p>
                  <p className="text-gray-600"><span className="font-medium">Saturday:</span> 9:00 AM - 2:00 PM GMT</p>
                  <p className="text-gray-600"><span className="font-medium">Sunday:</span> Closed</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                <p className="text-gray-600 mb-2">
                  For urgent matters outside office hours, please email us and we'll respond as soon as possible.
                </p>
                <p className="text-sm text-gray-500">
                  Note: Response times may be longer during weekends and holidays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
