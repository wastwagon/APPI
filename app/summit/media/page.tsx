"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Download,
  ImageIcon,
  Video,
  FileText,
  Palette,
  Share2,
  Camera,
  Mic,
  Globe,
  Users,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
  Hash,
  Monitor,
} from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const brandingAssets = [
  {
    title: "Primary Logo Package",
    description: "APPS 2025 official logo in multiple formats",
    icon: <ImageIcon className="w-6 h-6" />,
    formats: ["PNG", "JPEG", "SVG"],
    includes: ["High-resolution versions", "Monochrome variants", "Horizontal & vertical orientations"],
  },
  {
    title: "Color Palette",
    description: "Official APPS 2025 brand colors",
    icon: <Palette className="w-6 h-6" />,
    formats: ["HEX", "RGB", "CMYK"],
    includes: ["Primary Blue #1E3A8A", "Continental Gold #F59E0B", "Unity Green #059669", "Accent Red #DC2626"],
  },
  {
    title: "Typography Guidelines",
    description: "Official fonts and usage guidelines",
    icon: <FileText className="w-6 h-6" />,
    formats: ["TTF", "OTF", "WOFF"],
    includes: ["Inter (headings)", "Source Sans Pro (body)", "Arial/Helvetica (fallback)"],
  },
]

const mediaAssets = [
  {
    title: "Photography Package",
    description: "High-resolution images for editorial use",
    icon: <Camera className="w-6 h-6" />,
    includes: ["African political leaders", "Previous APPI events", "Continental landmarks", "Accra venues"],
  },
  {
    title: "Video Content",
    description: "Promotional and background video materials",
    icon: <Video className="w-6 h-6" />,
    includes: ["APPS 2025 promotional videos", "Summit highlights", "Expert interviews", "B-roll footage"],
  },
  {
    title: "Graphic Elements",
    description: "Visual assets for media production",
    icon: <ImageIcon className="w-6 h-6" />,
    includes: ["African map graphics", "Infographic templates", "Social media templates", "Story formats"],
  },
]

const socialMediaAssets = [
  {
    platform: "Facebook",
    icon: <Share2 className="w-6 h-6" />,
    assets: ["Cover photos", "Post templates", "Event graphics"],
  },
  {
    platform: "Twitter/X",
    icon: <Hash className="w-6 h-6" />,
    assets: ["Header images", "Thread templates", "Hashtag graphics"],
  },
  {
    platform: "LinkedIn",
    icon: <Users className="w-6 h-6" />,
    assets: ["Banner images", "Post templates", "Article headers"],
  },
  {
    platform: "Instagram",
    icon: <Camera className="w-6 h-6" />,
    assets: ["Story templates", "IGTV covers", "Carousel designs"],
  },
  {
    platform: "YouTube",
    icon: <Video className="w-6 h-6" />,
    assets: ["Thumbnail templates", "Channel art", "End screens"],
  },
]

const hashtags = [
  { primary: "#APPS2025", description: "Main summit hashtag" },
  { primary: "#FromPoliticsToProsperity", description: "Summit theme hashtag" },
  { primary: "#AfricanPolitics", description: "General topic hashtag" },
  { primary: "#APPI", description: "Initiative hashtag" },
  { primary: "#AccraGhana", description: "Location hashtag" },
  { primary: "#AfCFTA", description: "Economic integration hashtag" },
]

const keyMessages = [
  {
    title: "Historic Significance",
    message: "First comprehensive continental gathering focused on political party transformation",
  },
  {
    title: "Economic Focus",
    message: "Linking political leadership to Africa's economic transformation and AfCFTA implementation",
  },
  {
    title: "Inclusive Leadership",
    message: "Emphasizing youth and women's participation in political systems",
  },
  {
    title: "Continental Unity",
    message: "Demonstrating Africa's capacity for self-led political innovation and reform",
  },
  {
    title: "Practical Outcomes",
    message: "Focus on concrete commitments and measurable political reform",
  },
]

const spokespersons = [
  {
    title: "APPI Executive Director",
    role: "Overall initiative and strategic vision",
    availability: "Primary spokesperson",
  },
  {
    title: "Ghana Host Committee Chair",
    role: "Local arrangements and continental hosting",
    availability: "Host country perspective",
  },
  {
    title: "Steering Committee Representatives",
    role: "Governance and oversight perspective",
    availability: "Strategic oversight",
  },
  {
    title: "Youth and Women Platform Leaders",
    role: "Inclusive leadership and generational change",
    availability: "Demographic representation",
  },
]

const accreditationCategories = [
  {
    category: "Full Access",
    description: "Complete summit coverage including all sessions",
    requirements: ["Valid press credentials", "Letter of assignment", "Professional portfolio"],
  },
  {
    category: "Restricted Access",
    description: "Public sessions and press conferences only",
    requirements: ["Press credentials", "Assignment letter", "Media code agreement"],
  },
  {
    category: "Digital Access",
    description: "Live stream access and virtual press facilities",
    requirements: ["Media organization verification", "Digital platform credentials"],
  },
  {
    category: "Photography",
    description: "Specialized access for visual documentation",
    requirements: ["Photography credentials", "Equipment list", "Usage agreement"],
  },
]

export default function MediaToolkitPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Media Toolkit</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive media resources for covering APPS 2025. All materials are available for download and use in
              accordance with media guidelines.
            </p>
            <div className="flex items-center justify-center space-x-4 text-appi-blue">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-semibold">August 12-14, 2025 | Accra, Ghana</span>
            </div>
          </section>

          {/* Official Summit Branding */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Official Summit Branding
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {brandingAssets.map((asset, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-appi-blue to-appi-green rounded-full flex items-center justify-center mb-4">
                      <div className="text-white">{asset.icon}</div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{asset.title}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">{asset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {asset.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Download className="w-4 h-4 text-appi-green mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {asset.formats.map((format, idx) => (
                        <Badge key={idx} className="bg-appi-blue/10 text-appi-blue">
                          {format}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-appi-blue hover:bg-appi-blue/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Visual Assets */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Visual Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mediaAssets.map((asset, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-appi-green to-appi-blue rounded-full flex items-center justify-center mb-4">
                      <div className="text-white">{asset.icon}</div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{asset.title}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">{asset.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {asset.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <ImageIcon className="w-4 h-4 text-appi-green mr-2 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-appi-green hover:bg-appi-green/90">
                      <Download className="w-4 h-4 mr-2" />
                      Access Gallery
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Social Media Assets */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Social Media Assets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {socialMediaAssets.map((platform, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-appi-blue to-appi-green rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-white">{platform.icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{platform.platform}</h3>
                    <div className="space-y-2">
                      {platform.assets.map((asset, idx) => (
                        <div key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                          {asset}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Official Hashtags */}
            <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">Official Hashtags</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hashtags.map((hashtag, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-appi-blue mb-2">{hashtag.primary}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{hashtag.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Messages */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Key Messages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {keyMessages.map((message, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{message.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{message.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-appi-blue to-appi-green rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Tone and Voice Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-bold mb-2">Professional yet Accessible</h4>
                  <p className="text-white/90 text-sm">
                    Avoiding academic jargon while maintaining political sophistication
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Optimistic and Forward-looking</h4>
                  <p className="text-white/90 text-sm">Emphasizing potential and progress rather than deficits</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Pan-African Solidarity</h4>
                  <p className="text-white/90 text-sm">
                    Celebrating continental diversity while highlighting shared goals
                  </p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Action-oriented</h4>
                  <p className="text-white/90 text-sm">Focusing on solutions and commitments rather than problems</p>
                </div>
              </div>
            </div>
          </section>

          {/* Key Spokespersons */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Key Spokespersons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {spokespersons.map((person, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-appi-blue rounded-full flex items-center justify-center flex-shrink-0">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{person.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{person.role}</p>
                        <Badge className="bg-appi-green/10 text-appi-green">{person.availability}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Media Accreditation */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Media Accreditation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {accreditationCategories.map((category, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.category}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <FileText className="w-4 h-4 text-appi-blue mr-2 flex-shrink-0" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Press Facilities */}
          <section className="mb-16">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Press Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <Monitor className="w-12 h-12 text-appi-blue mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">On-Site Media Center</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Adjacent to main venue with full facilities
                  </p>
                </div>
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-appi-blue mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Daily Press Conferences</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Morning briefings and evening wrap-ups</p>
                </div>
                <div className="text-center">
                  <Mic className="w-12 h-12 text-appi-blue mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Interview Opportunities</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Scheduled and informal availability</p>
                </div>
                <div className="text-center">
                  <Globe className="w-12 h-12 text-appi-blue mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Live Coverage Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Streaming and real-time information</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-appi-blue to-appi-green rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Media Relations Team</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Our dedicated media relations team is available to assist with accreditation, interviews, and coverage
              support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Email Support</h3>
                <p className="text-white/90">media@apps2025.org</p>
              </div>
              <div>
                <Phone className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">24/7 Media Hotline</h3>
                <p className="text-white/90">+233 XXX XXXX</p>
              </div>
              <div>
                <Share2 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">Social Media</h3>
                <p className="text-white/90">@APPS2025</p>
              </div>
            </div>
            <div className="mt-8">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                <ExternalLink className="w-5 h-5 mr-2" />
                Apply for Media Accreditation
              </Button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
