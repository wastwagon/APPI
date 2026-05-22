"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  Star,
  Globe,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Clock,
  Shield,
  Phone,
  Mail,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const registrationCategories = [
  {
    category: "Category A",
    title: "Head of State/Government Delegation",
    description: "Presidential/Prime Ministerial delegations, Cabinet-level representation",
    icon: <Star className="w-6 h-6" />,
    fee: "No fee",
    maxDelegates: "As per protocol",
    features: ["Official state protocols apply", "Coordinated through diplomatic channels", "VIP arrangements"],
  },
  {
    category: "Category B",
    title: "Political Party Leadership",
    description: "Party chairs, deputy chairs, secretaries-general, parliamentary group leaders",
    icon: <Users className="w-6 h-6" />,
    fee: "No fee (APPI sponsored)",
    maxDelegates: "5 per party",
    features: ["Full summit access", "Networking opportunities", "Policy working groups"],
  },
  {
    category: "Category C",
    title: "Institutional and Expert Participation",
    description: "Continental institutions, academic researchers, governance specialists",
    icon: <Globe className="w-6 h-6" />,
    fee: "$500 USD",
    maxDelegates: "3 per institution",
    features: ["Expert panel participation", "Knowledge sharing sessions", "Research presentations"],
  },
  {
    category: "Category D",
    title: "Youth and Women Leaders",
    description: "Party youth wing leaders (under 35), women's political leadership representatives",
    icon: <CheckCircle className="w-6 h-6" />,
    fee: "No fee (sponsored program)",
    maxDelegates: "Special track",
    features: ["Mentorship component", "Leadership development", "Dedicated forums"],
  },
  {
    category: "Category E",
    title: "Observer and Media",
    description: "Accredited journalists, development partner observers, diplomatic representatives",
    icon: <FileText className="w-6 h-6" />,
    fee: "$200 USD",
    maxDelegates: "Limited availability",
    features: ["Public sessions only", "Press facilities", "Media center access"],
  },
]

const registrationDeadlines = [
  { type: "Early Registration", date: "March 31, 2025", status: "open" },
  { type: "Standard Registration", date: "June 30, 2025", status: "upcoming" },
  { type: "Late Registration", date: "July 31, 2025", status: "upcoming" },
  { type: "On-site Registration", date: "August 11, 2025", status: "limited" },
]

const registrationSteps = [
  {
    step: 1,
    title: "Pre-Registration",
    description: "Complete the online pre-registration form with personal and institutional information",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    step: 2,
    title: "Institutional Endorsement",
    description: "Obtain formal endorsement from political party leadership or sponsoring organization",
    icon: <CheckCircle className="w-6 h-6" />,
  },
  {
    step: 3,
    title: "Document Submission",
    description: "Upload required documents including passport, endorsement letter, and CV",
    icon: <Upload className="w-6 h-6" />,
  },
  {
    step: 4,
    title: "Registration Confirmation",
    description: "Receive confirmation email with delegate number and logistics information",
    icon: <Mail className="w-6 h-6" />,
  },
  {
    step: 5,
    title: "Final Accreditation",
    description: "Complete on-site accreditation in Accra with document verification",
    icon: <Shield className="w-6 h-6" />,
  },
]

export default function RegisterPage() {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    position: "",
    country: "",
    category: "",
    specialRequirements: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/summit/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Summit Registration Form'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Registration Submitted!",
          description: data.message,
        })
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          organization: "",
          position: "",
          country: "",
          category: "",
          specialRequirements: "",
          agreeToTerms: false,
        })
      } else {
        toast({
          title: "Registration Failed",
          description: data.error || "Failed to submit registration. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Registration & Delegate Portal
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Register for APPS 2025 in Accra, Ghana. Join over 500 political leaders from across Africa for this
              historic continental gathering.
            </p>
            <div className="flex items-center justify-center space-x-4 text-appi-blue">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-semibold">August 12-14, 2025 | Accra, Ghana</span>
            </div>
          </section>

          {/* Registration Deadlines */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Registration Deadlines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {registrationDeadlines.map((deadline, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg ${deadline.status === "open" ? "ring-2 ring-appi-green" : ""}`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      {deadline.status === "open" && <CheckCircle className="w-8 h-8 text-appi-green" />}
                      {deadline.status === "upcoming" && <Clock className="w-8 h-8 text-appi-blue" />}
                      {deadline.status === "limited" && <AlertCircle className="w-8 h-8 text-orange-500" />}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{deadline.type}</h3>
                    <p className="text-appi-blue font-semibold mb-2">{deadline.date}</p>
                    <Badge
                      className={`${
                        deadline.status === "open"
                          ? "bg-green-100 text-green-800"
                          : deadline.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {deadline.status === "open"
                        ? "Open Now"
                        : deadline.status === "upcoming"
                          ? "Upcoming"
                          : "Limited"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Registration Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Registration Categories
            </h2>
            <div className="space-y-6">
              {registrationCategories.map((category, index) => (
                <Card key={index} className="border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                      <div className="bg-gradient-to-r from-appi-blue to-appi-green p-6 text-white">
                        <div className="flex items-center space-x-3 mb-4">
                          {category.icon}
                          <div>
                            <h3 className="text-xl font-bold">{category.category}</h3>
                            <p className="text-white/90 text-sm">{category.maxDelegates}</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold mb-2">{category.fee}</div>
                      </div>
                      <div className="lg:col-span-3 p-6">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {category.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <CheckCircle className="w-4 h-4 text-appi-green mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Registration Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Registration Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {registrationSteps.map((step, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-appi-blue to-appi-green rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="w-8 h-8 bg-appi-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-sm">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Registration Form */}
          <section className="mb-16">
            <Card className="border-0 shadow-lg max-w-4xl mx-auto">
              <CardHeader className="bg-gradient-to-r from-appi-blue to-appi-green text-white">
                <CardTitle className="text-2xl font-bold">Pre-Registration Form</CardTitle>
                <CardDescription className="text-white/90">
                  Complete this form to begin your registration process for APPS 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="organization">Organization/Political Party *</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => handleInputChange("organization", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Position/Title *</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange("position", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Select onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="algeria">Algeria</SelectItem>
                          <SelectItem value="angola">Angola</SelectItem>
                          <SelectItem value="benin">Benin</SelectItem>
                          <SelectItem value="botswana">Botswana</SelectItem>
                          <SelectItem value="burkina-faso">Burkina Faso</SelectItem>
                          <SelectItem value="burundi">Burundi</SelectItem>
                          <SelectItem value="cameroon">Cameroon</SelectItem>
                          <SelectItem value="cape-verde">Cape Verde</SelectItem>
                          <SelectItem value="central-african-republic">Central African Republic</SelectItem>
                          <SelectItem value="chad">Chad</SelectItem>
                          <SelectItem value="comoros">Comoros</SelectItem>
                          <SelectItem value="congo">Congo</SelectItem>
                          <SelectItem value="drc">Democratic Republic of Congo</SelectItem>
                          <SelectItem value="djibouti">Djibouti</SelectItem>
                          <SelectItem value="egypt">Egypt</SelectItem>
                          <SelectItem value="equatorial-guinea">Equatorial Guinea</SelectItem>
                          <SelectItem value="eritrea">Eritrea</SelectItem>
                          <SelectItem value="eswatini">Eswatini</SelectItem>
                          <SelectItem value="ethiopia">Ethiopia</SelectItem>
                          <SelectItem value="gabon">Gabon</SelectItem>
                          <SelectItem value="gambia">Gambia</SelectItem>
                          <SelectItem value="ghana">Ghana</SelectItem>
                          <SelectItem value="guinea">Guinea</SelectItem>
                          <SelectItem value="guinea-bissau">Guinea-Bissau</SelectItem>
                          <SelectItem value="ivory-coast">Ivory Coast</SelectItem>
                          <SelectItem value="kenya">Kenya</SelectItem>
                          <SelectItem value="lesotho">Lesotho</SelectItem>
                          <SelectItem value="liberia">Liberia</SelectItem>
                          <SelectItem value="libya">Libya</SelectItem>
                          <SelectItem value="madagascar">Madagascar</SelectItem>
                          <SelectItem value="malawi">Malawi</SelectItem>
                          <SelectItem value="mali">Mali</SelectItem>
                          <SelectItem value="mauritania">Mauritania</SelectItem>
                          <SelectItem value="mauritius">Mauritius</SelectItem>
                          <SelectItem value="morocco">Morocco</SelectItem>
                          <SelectItem value="mozambique">Mozambique</SelectItem>
                          <SelectItem value="namibia">Namibia</SelectItem>
                          <SelectItem value="niger">Niger</SelectItem>
                          <SelectItem value="nigeria">Nigeria</SelectItem>
                          <SelectItem value="rwanda">Rwanda</SelectItem>
                          <SelectItem value="sao-tome">São Tomé and Príncipe</SelectItem>
                          <SelectItem value="senegal">Senegal</SelectItem>
                          <SelectItem value="seychelles">Seychelles</SelectItem>
                          <SelectItem value="sierra-leone">Sierra Leone</SelectItem>
                          <SelectItem value="somalia">Somalia</SelectItem>
                          <SelectItem value="south-africa">South Africa</SelectItem>
                          <SelectItem value="south-sudan">South Sudan</SelectItem>
                          <SelectItem value="sudan">Sudan</SelectItem>
                          <SelectItem value="tanzania">Tanzania</SelectItem>
                          <SelectItem value="togo">Togo</SelectItem>
                          <SelectItem value="tunisia">Tunisia</SelectItem>
                          <SelectItem value="uganda">Uganda</SelectItem>
                          <SelectItem value="zambia">Zambia</SelectItem>
                          <SelectItem value="zimbabwe">Zimbabwe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Registration Category *</Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select registration category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="category-a">Category A - Head of State/Government</SelectItem>
                          <SelectItem value="category-b">Category B - Political Party Leadership</SelectItem>
                          <SelectItem value="category-c">Category C - Institutional/Expert</SelectItem>
                          <SelectItem value="category-d">Category D - Youth/Women Leaders</SelectItem>
                          <SelectItem value="category-e">Category E - Observer/Media</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="specialRequirements">Special Requirements (dietary, accessibility, etc.)</Label>
                    <Textarea
                      id="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions and code of conduct for APPS 2025 *
                    </Label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="bg-appi-blue hover:bg-appi-blue/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Pre-Registration'}
                    </Button>
                    <Button type="button" size="lg" variant="outline">
                      <Download className="w-5 h-5 mr-2" />
                      Download Guidelines
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Need Assistance?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Our registration support team is available to help you with the application process
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Mail className="w-12 h-12 text-appi-blue mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Email Support</h3>
                <p className="text-gray-600 dark:text-gray-300">registration@apps2025.org</p>
              </div>
              <div className="text-center">
                <Phone className="w-12 h-12 text-appi-blue mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Phone Support</h3>
                <p className="text-gray-600 dark:text-gray-300">+233 XXX XXXX</p>
              </div>
              <div className="text-center">
                <Clock className="w-12 h-12 text-appi-blue mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Help Desk Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">24/7 during registration period</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
