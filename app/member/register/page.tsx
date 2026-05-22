'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  User,
  Building,
  Phone,
  MapPin,
  Shield,
  CheckCircle
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import MainLayout from '@/app/main-layout'

const countries = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Cape Verde',
  'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Democratic Republic of Congo', 'Djibouti',
  'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea',
  'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi',
  'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria',
  'Rwanda', 'São Tomé and Príncipe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia',
  'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
]

const organizationTypes = [
  'Political Party',
  'Civil Society Organization',
  'Academic Institution',
  'Government Agency',
  'International Organization',
  'Media Organization',
  'Youth Organization',
  'Women\'s Organization',
  'Other'
]

export default function MemberRegisterPage() {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    organizationType: '',
    country: '',
    position: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToNewsletter: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

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
      const response = await fetch('/api/member/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Member Registration Form'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Registration Successful!",
          description: data.message,
        })
        // Set success state
        setRegistrationSuccess(true)
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          organization: '',
          organizationType: '',
          country: '',
          position: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false,
          agreeToNewsletter: false
        })
      } else {
        toast({
          title: "Registration Failed",
          description: data.error || "Failed to register. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join APPI Member Portal
          </h1>
          <p className="text-gray-600">
            Register for access to the APPI member portal and exclusive resources
          </p>
        </div>

        {/* Success Message */}
        {registrationSuccess && (
          <Card className="p-8 border-green-200 bg-green-50 mb-6">
            <CardContent className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Registration Successful!
              </h2>
              <p className="text-green-700 mb-4">
                Thank you for registering with APPI! Your account has been created and is pending approval.
              </p>
              <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                <h3 className="font-semibold text-green-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>• Your registration will be reviewed by our admin team</li>
                  <li>• You'll receive an email confirmation within 24-48 hours</li>
                  <li>• Once approved, you'll have access to the member portal</li>
                  <li>• You can log in at any time to check your status</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact/login">
                  <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                    Go to Login
                  </Button>
                </Link>
                <Button 
                  onClick={() => setRegistrationSuccess(false)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Register Another Account
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Registration Form */}
        {!registrationSuccess && (
          <Card className="p-8">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl">Create Member Account</CardTitle>
              <CardDescription>
                Register to access the APPI member portal and exclusive content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Organization Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization Name *</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="organization"
                      type="text"
                      placeholder="Enter organization name"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationType">Organization Type *</Label>
                  <Select value={formData.organizationType} onValueChange={(value) => handleInputChange('organizationType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position/Title</Label>
                  <Input
                    id="position"
                    type="text"
                    placeholder="Enter your position or title"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                  />
                </div>
              </div>

              {/* Account Security */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Security</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                    required
                  />
                  <div className="space-y-1">
                    <Label htmlFor="agreeToTerms" className="text-sm">
                      I agree to the{' '}
                      <Link href="/terms" className="text-appi-blue hover:text-appi-blue/80">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-appi-blue hover:text-appi-blue/80">
                        Privacy Policy
                      </Link>{' '}
                      *
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToNewsletter"
                    checked={formData.agreeToNewsletter}
                    onCheckedChange={(checked) => handleInputChange('agreeToNewsletter', checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="agreeToNewsletter" className="text-sm">
                      I would like to receive updates and newsletters from APPI
                    </Label>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-appi-blue hover:bg-appi-blue/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Member Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have a member account?{' '}
                <Link href="/contact/login" className="text-appi-blue hover:text-appi-blue/80">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        )}

        {/* Member Portal Benefits */}
        <Card className="mt-8 p-6">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Member Portal Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-appi-blue/10 rounded-lg">
                <Shield className="h-4 w-4 text-appi-blue" />
              </div>
              <span className="text-sm text-gray-600">Access to exclusive member portal resources</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-appi-blue/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-appi-blue" />
              </div>
              <span className="text-sm text-gray-600">Priority registration for events and workshops</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-appi-blue/10 rounded-lg">
                <Mail className="h-4 w-4 text-appi-blue" />
              </div>
              <span className="text-sm text-gray-600">Direct access to APPI team and member network</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-appi-blue/10 rounded-lg">
                <Building className="h-4 w-4 text-appi-blue" />
              </div>
              <span className="text-sm text-gray-600">Participation in member-only working groups</span>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Need help with registration?{' '}
            <Link href="/contact/secretariat" className="text-appi-blue hover:text-appi-blue/80">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
    </MainLayout>
  )
}
