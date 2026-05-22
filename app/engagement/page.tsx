'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Heart, 
  Handshake, 
  Globe, 
  ArrowRight,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react'
import Link from 'next/link'

const engagementAreas = [
  {
    title: 'For Political Parties',
    description: 'Join APPI as a member party and participate in our democratic governance initiatives.',
    href: '/engagement/parties',
    icon: Users,
    features: ['Membership Benefits', 'Policy Development', 'Capacity Building', 'Regional Cooperation'],
    status: 'Active',
    participants: '150+ Parties'
  },
  {
    title: 'Youth & Women',
    description: 'Empowering young leaders and women in political leadership and governance.',
    href: '/engagement/youth-women',
    icon: Heart,
    features: ['Leadership Training', 'Mentorship Programs', 'Networking Opportunities', 'Advocacy Support'],
    status: 'Active',
    participants: '500+ Participants'
  },
  {
    title: 'CTPE-AfCFTA',
    description: 'Supporting the Continental Free Trade Area through political party engagement.',
    href: '/engagement/ctpe-afcfta',
    icon: Globe,
    features: ['Trade Policy', 'Economic Integration', 'Stakeholder Engagement', 'Capacity Development'],
    status: 'Active',
    participants: '45 Countries'
  },
  {
    title: 'Join as Partner',
    description: 'Partner with APPI to advance democratic governance and political party development.',
    href: '/engagement/partner',
    icon: Handshake,
    features: ['Strategic Partnerships', 'Resource Mobilization', 'Joint Programs', 'Knowledge Sharing'],
    status: 'Open',
    participants: '25+ Partners'
  }
]

const upcomingEvents = [
  {
    title: 'Youth Leadership Summit',
    date: 'March 15-17, 2024',
    location: 'Nairobi, Kenya',
    type: 'Youth & Women',
    status: 'Registration Open'
  },
  {
    title: 'Political Party Capacity Building Workshop',
    date: 'April 5-7, 2024',
    location: 'Accra, Ghana',
    type: 'Political Parties',
    status: 'Registration Open'
  },
  {
    title: 'AfCFTA Implementation Forum',
    date: 'May 10-12, 2024',
    location: 'Addis Ababa, Ethiopia',
    type: 'CTPE-AfCFTA',
    status: 'Coming Soon'
  }
]

import MainLayout from '@/app/main-layout'

export default function EngagementPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-appi-blue to-appi-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Engage with APPI
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join us in advancing democratic governance, political party development, and inclusive leadership across Africa
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                Join as Member Party
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                Become a Partner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Areas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ways to Engage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the various ways you can participate in APPI's mission to strengthen democratic governance across Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {engagementAreas.map((area) => {
              const IconComponent = area.icon
              return (
                <Card key={area.title} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-appi-blue/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-appi-blue" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{area.title}</CardTitle>
                          <Badge 
                            variant={area.status === 'Active' ? 'default' : 'secondary'}
                            className="mt-2"
                          >
                            {area.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {area.description}
                    </CardDescription>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Current Participants:</strong> {area.participants}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {area.features.map((feature) => (
                          <li key={feature} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-appi-blue rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href={area.href}>
                      <Button className="w-full">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Engagement Events
            </h2>
            <p className="text-xl text-gray-600">
              Join our upcoming events and activities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-appi-blue border-appi-blue">
                      {event.type}
                    </Badge>
                    <Badge 
                      variant={event.status === 'Registration Open' ? 'default' : 'secondary'}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Involved?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of political leaders, youth activists, and governance experts working together to strengthen democracy across Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
