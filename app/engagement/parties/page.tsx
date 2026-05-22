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
  Users, 
  CheckCircle, 
  Globe, 
  Award,
  ArrowRight,
  Calendar,
  MapPin,
  Star
} from 'lucide-react'
import Link from 'next/link'

import MainLayout from '@/app/main-layout'

export default function PoliticalPartiesPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    partyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    partyType: '',
    memberCount: '',
    interests: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/engagement/parties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Political Party Engagement Form'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Party Inquiry Sent!",
          description: data.message,
        })
        setFormData({
          partyName: '',
          contactName: '',
          email: '',
          phone: '',
          country: '',
          partyType: '',
          memberCount: '',
          interests: '',
          message: ''
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

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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
              For Political Parties
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join APPI as a member party and strengthen your capacity for democratic governance and inclusive leadership
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                Apply for Membership
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                View Member Benefits
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Membership Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of joining APPI as a member political party
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <Award className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Capacity Building</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access to training programs, workshops, and leadership development initiatives.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <Globe className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Policy Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Participate in continental policy discussions and contribute to governance frameworks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <Users className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Networking Opportunities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Connect with political leaders and parties from across Africa.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-appi-blue/10 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-appi-blue" />
                  </div>
                  <CardTitle className="text-xl">Resource Access</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access to research, publications, and best practices in democratic governance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Party Engagement Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Party Engagement Inquiry
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your political party and how you'd like to engage with APPI
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="partyName">Party Name *</Label>
                  <Input
                    id="partyName"
                    name="partyName"
                    type="text"
                    placeholder="Your political party name"
                    value={formData.partyName}
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
                    placeholder="your.email@party.org"
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

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleSelectChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Algeria">Algeria</SelectItem>
                      <SelectItem value="Angola">Angola</SelectItem>
                      <SelectItem value="Benin">Benin</SelectItem>
                      <SelectItem value="Botswana">Botswana</SelectItem>
                      <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                      <SelectItem value="Burundi">Burundi</SelectItem>
                      <SelectItem value="Cameroon">Cameroon</SelectItem>
                      <SelectItem value="Cape Verde">Cape Verde</SelectItem>
                      <SelectItem value="Central African Republic">Central African Republic</SelectItem>
                      <SelectItem value="Chad">Chad</SelectItem>
                      <SelectItem value="Comoros">Comoros</SelectItem>
                      <SelectItem value="Congo">Congo</SelectItem>
                      <SelectItem value="Democratic Republic of Congo">Democratic Republic of Congo</SelectItem>
                      <SelectItem value="Djibouti">Djibouti</SelectItem>
                      <SelectItem value="Egypt">Egypt</SelectItem>
                      <SelectItem value="Equatorial Guinea">Equatorial Guinea</SelectItem>
                      <SelectItem value="Eritrea">Eritrea</SelectItem>
                      <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                      <SelectItem value="Gabon">Gabon</SelectItem>
                      <SelectItem value="Gambia">Gambia</SelectItem>
                      <SelectItem value="Ghana">Ghana</SelectItem>
                      <SelectItem value="Guinea">Guinea</SelectItem>
                      <SelectItem value="Guinea-Bissau">Guinea-Bissau</SelectItem>
                      <SelectItem value="Ivory Coast">Ivory Coast</SelectItem>
                      <SelectItem value="Kenya">Kenya</SelectItem>
                      <SelectItem value="Lesotho">Lesotho</SelectItem>
                      <SelectItem value="Liberia">Liberia</SelectItem>
                      <SelectItem value="Libya">Libya</SelectItem>
                      <SelectItem value="Madagascar">Madagascar</SelectItem>
                      <SelectItem value="Malawi">Malawi</SelectItem>
                      <SelectItem value="Mali">Mali</SelectItem>
                      <SelectItem value="Mauritania">Mauritania</SelectItem>
                      <SelectItem value="Mauritius">Mauritius</SelectItem>
                      <SelectItem value="Morocco">Morocco</SelectItem>
                      <SelectItem value="Mozambique">Mozambique</SelectItem>
                      <SelectItem value="Namibia">Namibia</SelectItem>
                      <SelectItem value="Niger">Niger</SelectItem>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                      <SelectItem value="Rwanda">Rwanda</SelectItem>
                      <SelectItem value="São Tomé and Príncipe">São Tomé and Príncipe</SelectItem>
                      <SelectItem value="Senegal">Senegal</SelectItem>
                      <SelectItem value="Seychelles">Seychelles</SelectItem>
                      <SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
                      <SelectItem value="Somalia">Somalia</SelectItem>
                      <SelectItem value="South Africa">South Africa</SelectItem>
                      <SelectItem value="South Sudan">South Sudan</SelectItem>
                      <SelectItem value="Sudan">Sudan</SelectItem>
                      <SelectItem value="Tanzania">Tanzania</SelectItem>
                      <SelectItem value="Togo">Togo</SelectItem>
                      <SelectItem value="Tunisia">Tunisia</SelectItem>
                      <SelectItem value="Uganda">Uganda</SelectItem>
                      <SelectItem value="Zambia">Zambia</SelectItem>
                      <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="partyType">Party Type</Label>
                  <Select value={formData.partyType} onValueChange={(value) => handleSelectChange('partyType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select party type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ruling">Ruling Party</SelectItem>
                      <SelectItem value="opposition">Opposition Party</SelectItem>
                      <SelectItem value="independent">Independent Party</SelectItem>
                      <SelectItem value="coalition">Coalition Member</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="memberCount">Approximate Member Count</Label>
                <Input
                  id="memberCount"
                  name="memberCount"
                  type="text"
                  placeholder="e.g., 10,000+ members"
                  value={formData.memberCount}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="interests">Areas of Interest</Label>
                <Textarea
                  id="interests"
                  name="interests"
                  placeholder="What areas of governance and development is your party interested in?"
                  value={formData.interests}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="message">Additional Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Any additional information about your party or specific interests..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-appi-blue hover:bg-appi-blue/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Inquiry...' : 'Submit Party Inquiry'}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join APPI?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Strengthen your party's capacity for democratic governance and connect with political leaders across Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Apply Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Contact Secretariat
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
