'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Shield,
  AlertCircle,
  Camera,
  Save,
  Upload,
  CheckCircle,
  Phone,
  MapPin,
  Building2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import MainLayout from '@/app/main-layout'

interface MemberUser {
  id: string
  email: string
  full_name: string
  role: string
  status: string
  last_login: string
  party_id?: string
  avatar_url?: string
}

export default function MemberSettings() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<MemberUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [politicalParties, setPoliticalParties] = useState<any[]>([])
  const [loadingParties, setLoadingParties] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  // Form data
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: '',
    phone: '',
    position: '',
    organization: '',
    bio: '',
    party_id: ''
  })

  // Profile picture
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  // Verification
  const [verificationData, setVerificationData] = useState({
    national_id: '',
    national_id_file: null as File | null
  })

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('memberUser')
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)
                      setProfileData({
            full_name: parsedUser.full_name || '',
            email: parsedUser.email || '',
            phone: parsedUser.phone || '',
            position: parsedUser.position || '',
            organization: parsedUser.organization || '',
            bio: parsedUser.bio || '',
            party_id: parsedUser.party_id || 'none'
          })
            setLoading(false)
          } catch (error) {
            console.error('Error parsing user data:', error)
            router.push('/contact/login')
          }
        } else {
          router.push('/contact/login')
        }
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    fetchPoliticalParties()
  }, [])

  const fetchPoliticalParties = async () => {
    try {
      setLoadingParties(true)
      const response = await fetch('/api/admin/parties')
      const data = await response.json()
      
      if (response.ok) {
        setPoliticalParties(data.parties || [])
      } else {
        console.error('Failed to fetch parties:', data.error)
      }
    } catch (error) {
      console.error('Error fetching parties:', error)
    } finally {
      setLoadingParties(false)
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'party_focal_person': return 'Party Focal Person'
      case 'fellow': return 'Fellow'
      case 'platform_collaborator': return 'Platform Collaborator'
      default: return role
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        })
        return
      }

      setProfileImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNationalIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        })
        return
      }

      setVerificationData(prev => ({
        ...prev,
        national_id_file: file
      }))
    }
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/member/settings/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...profileData,
          party_id: profileData.party_id === 'none' ? null : profileData.party_id,
          userId: user?.id
        }),
      })

      if (response.ok) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        })
        
        // Update local storage
        if (user) {
          const updatedUser = { ...user, ...profileData }
          localStorage.setItem('memberUser', JSON.stringify(updatedUser))
          setUser(updatedUser)
        }
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to update profile",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleUploadProfilePicture = async () => {
    if (!profileImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('image', profileImage)
      formData.append('userId', user?.id || '')

      const response = await fetch('/api/member/settings/avatar', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been updated successfully.",
        })
        
        // Update local storage
        if (user) {
          const updatedUser = { ...user, avatar_url: data.avatar_url }
          localStorage.setItem('memberUser', JSON.stringify(updatedUser))
          setUser(updatedUser)
        }
        
        setProfileImage(null)
        setImagePreview('')
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to upload profile picture",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload profile picture",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSubmitVerification = async () => {
    if (!verificationData.national_id || !verificationData.national_id_file) {
      toast({
        title: "Missing information",
        description: "Please provide both National ID number and document",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const formData = new FormData()
      formData.append('national_id', verificationData.national_id)
      formData.append('national_id_file', verificationData.national_id_file)
      formData.append('userId', user?.id || '')

      const response = await fetch('/api/member/settings/verification', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast({
          title: "Verification Submitted",
          description: "Your verification documents have been submitted for review.",
        })
        
        setVerificationData({
          national_id: '',
          national_id_file: null
        })
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to submit verification",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit verification",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!user) {
    return null
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 bg-appi-blue rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <span className="text-lg font-semibold text-gray-900">Account Settings</span>
              </div>
              <Button variant="outline" onClick={() => router.push('/member/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture Section */}
                  <div className="flex items-center space-x-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={imagePreview || user?.avatar_url} />
                      <AvatarFallback className="text-lg">
                        {user?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Label htmlFor="profile-image" className="text-sm font-medium">
                        Profile Picture
                      </Label>
                      <div className="flex space-x-2">
                        <Input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="max-w-xs"
                        />
                        {profileImage && (
                          <Button onClick={handleUploadProfilePicture} disabled={saving}>
                            {saving ? 'Uploading...' : 'Upload'}
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG or GIF. Max size 5MB.
                      </p>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profileData.full_name}
                        onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        value={profileData.position}
                        onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={profileData.organization}
                        onChange={(e) => setProfileData({ ...profileData, organization: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="party">Political Party</Label>
                      <Select 
                        value={profileData.party_id} 
                        onValueChange={(value) => setProfileData({ ...profileData, party_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a political party" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Party Selected</SelectItem>
                          {politicalParties.map((party) => (
                            <SelectItem key={party.id} value={party.id.toString()}>
                              {party.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleSaveProfile} disabled={saving} className="w-full">
                    {saving ? 'Saving...' : 'Save Profile'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Verification Tab */}
            <TabsContent value="verification" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Verification</CardTitle>
                  <CardDescription>
                    Submit your national ID for account verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          Verification Required
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>To access all features, please submit your national ID for verification.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="national_id">National ID Number</Label>
                      <Input
                        id="national_id"
                        value={verificationData.national_id}
                        onChange={(e) => setVerificationData({ ...verificationData, national_id: e.target.value })}
                        placeholder="Enter your national ID number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="national_id_file">National ID Document</Label>
                      <Input
                        id="national_id_file"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleNationalIdUpload}
                      />
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, PNG. Max size 10MB.
                      </p>
                    </div>
                  </div>

                  <Button onClick={handleSubmitVerification} disabled={saving} className="w-full">
                    {saving ? 'Submitting...' : 'Submit for Verification'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and privacy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Change Password</h3>
                        <p className="text-sm text-muted-foreground">
                          Update your account password
                        </p>
                      </div>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security
                        </p>
                      </div>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium">Account Status</h3>
                        <p className="text-sm text-muted-foreground">
                          Current account verification status
                        </p>
                      </div>
                      <Badge className={getStatusColor(user?.status || 'pending')}>
                        {user?.status === 'active' ? 'Verified' : user?.status || 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  )
}
