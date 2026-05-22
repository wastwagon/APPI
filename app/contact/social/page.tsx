'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ExternalLink,
  Users,
  MessageCircle
} from 'lucide-react'

const socialPlatforms = [
  {
    name: 'Facebook',
    handle: '@appi-africa',
    url: 'https://facebook.com/appi-africa',
    icon: Facebook,
    followers: '15.2K',
    description: 'Follow us for updates on events, initiatives, and democratic governance news.',
    color: 'bg-blue-600'
  },
  {
    name: 'Twitter',
    handle: '@appi_africa',
    url: 'https://twitter.com/appi_africa',
    icon: Twitter,
    followers: '8.7K',
    description: 'Real-time updates on political developments and APPI activities.',
    color: 'bg-sky-500'
  },
  {
    name: 'Instagram',
    handle: '@appi_africa',
    url: 'https://instagram.com/appi_africa',
    icon: Instagram,
    followers: '12.1K',
    description: 'Visual stories from our events, workshops, and member activities.',
    color: 'bg-pink-600'
  },
  {
    name: 'LinkedIn',
    handle: 'APPI Africa',
    url: 'https://linkedin.com/company/appi-africa',
    icon: Linkedin,
    followers: '5.3K',
    description: 'Professional network for political leaders and governance experts.',
    color: 'bg-blue-700'
  },
  {
    name: 'YouTube',
    handle: '@appi-africa',
    url: 'https://youtube.com/@appi-africa',
    icon: Youtube,
    followers: '3.8K',
    description: 'Video content from summits, interviews, and educational materials.',
    color: 'bg-red-600'
  }
]

import MainLayout from '@/app/main-layout'

export default function SocialPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-appi-blue to-appi-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Social Media
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Connect with APPI on social media for the latest updates and insights
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                Follow Us
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                Share Content
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Platforms */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Connect With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow APPI on your favorite social media platforms for real-time updates, 
              insights, and opportunities to engage with our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialPlatforms.map((platform) => {
              const IconComponent = platform.icon
              return (
                <Card key={platform.name} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 ${platform.color} text-white rounded-lg`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{platform.name}</CardTitle>
                        <CardDescription>{platform.handle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        {platform.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{platform.followers} followers</span>
                        </div>
                        <Badge variant="outline" className="text-appi-blue border-appi-blue">
                          Active
                        </Badge>
                      </div>
                      <Button className="w-full" asChild>
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Follow on {platform.name}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Engagement Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Social Impact
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of followers engaging with democratic governance content
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-appi-blue mb-2">45K+</div>
              <div className="text-gray-600">Total Followers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-appi-blue mb-2">2.3M+</div>
              <div className="text-gray-600">Monthly Reach</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-appi-blue mb-2">15K+</div>
              <div className="text-gray-600">Engagements</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-appi-blue mb-2">500+</div>
              <div className="text-gray-600">Posts Shared</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Guidelines */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Share Your Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We encourage our community to share their experiences, insights, and perspectives 
                on democratic governance and political party development.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Use our hashtags to connect with the broader APPI community and amplify your voice 
                in the conversation about Africa's democratic future.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-appi-blue" />
                  <span className="font-semibold">#APPIAfrica</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-appi-blue" />
                  <span className="font-semibold">#DemocraticGovernance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-appi-blue" />
                  <span className="font-semibold">#PoliticalParties</span>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl">Content Guidelines</CardTitle>
                <CardDescription>
                  Help us maintain a constructive and respectful community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                    <p className="text-sm text-gray-600">Respect diverse perspectives and opinions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                    <p className="text-sm text-gray-600">Share evidence-based information</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                    <p className="text-sm text-gray-600">Engage in constructive dialogue</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-appi-blue rounded-full mt-2"></div>
                    <p className="text-sm text-gray-600">Tag us in relevant content</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join the Conversation
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Follow us on social media and be part of the movement to strengthen democratic governance across Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Follow All Platforms
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Contact Social Media Team
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
