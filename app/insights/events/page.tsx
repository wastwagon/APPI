'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users,
  ArrowRight
} from 'lucide-react'

const upcomingEvents = [
  {
    title: 'African Political Parties Summit 2024',
    date: 'June 15-17, 2024',
    location: 'Nairobi, Kenya',
    type: 'Summit',
    status: 'Registration Open',
    attendees: '500+'
  },
  {
    title: 'Youth Leadership Workshop',
    date: 'April 20-22, 2024',
    location: 'Accra, Ghana',
    type: 'Workshop',
    status: 'Registration Open',
    attendees: '100'
  },
  {
    title: 'Women in Politics Conference',
    date: 'May 10-12, 2024',
    location: 'Addis Ababa, Ethiopia',
    type: 'Conference',
    status: 'Coming Soon',
    attendees: '200+'
  }
]

import MainLayout from '@/app/main-layout'

export default function EventsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-appi-blue to-appi-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Events Calendar
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join our upcoming events, conferences, and workshops on democratic governance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                View All Events
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Mark your calendar for these important events
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    <Button className="w-full">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
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
            Stay Updated
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to receive notifications about upcoming events and registration deadlines.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Subscribe to Updates
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Contact Events Team
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
