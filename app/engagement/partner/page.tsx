'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { 
  Handshake, 
  Globe, 
  Users, 
  Award
} from 'lucide-react'

import MainLayout from '@/app/main-layout'

export default function PartnerPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    partnershipType: '',
    description: '',
    goals: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/engagement/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Partner Engagement Form'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Partnership Inquiry Sent!",
          description: data.message,
        })
        setFormData({
          organizationName: '',
          contactName: '',
          email: '',
          phone: '',
          website: '',
          partnershipType: '',
          description: '',
          goals: ''
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to send inquiry. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      partnershipType: value
    }))
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-appi-blue to-appi-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join as Partner
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Partner with APPI to advance democratic governance and political party development across Africa
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                Become a Partner
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                View Partnership Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the various ways your organization can partner with APPI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <Handshake className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Strategic Partnerships</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Long-term collaborative relationships focused on specific governance and development objectives.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <Globe className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Resource Mobilization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Financial and in-kind support for APPI's programs and initiatives.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <Users className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Joint Programs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Collaborative initiatives addressing specific governance challenges and opportunities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <Award className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Knowledge Sharing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Exchange of expertise, research, and best practices in democratic governance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partnership Inquiry
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your organization and how you'd like to partner with APPI
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    placeholder="Your organization name"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contactName">Contact Person *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    type="text"
                    placeholder="Your full name"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@organization.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://www.yourorganization.org"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="partnershipType">Partnership Type *</Label>
                <Select value={formData.partnershipType} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select partnership type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strategic">Strategic Partnership</SelectItem>
                    <SelectItem value="resource">Resource Mobilization</SelectItem>
                    <SelectItem value="joint-programs">Joint Programs</SelectItem>
                    <SelectItem value="knowledge-sharing">Knowledge Sharing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Organization Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell us about your organization, its mission, and areas of focus..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="goals">Partnership Goals</Label>
                <Textarea
                  id="goals"
                  name="goals"
                  placeholder="What do you hope to achieve through this partnership?"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-appi-blue hover:bg-appi-blue/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Inquiry...' : 'Submit Partnership Inquiry'}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Partner with APPI?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in strengthening democratic governance and political party development across Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Download Partnership Guide
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
