'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  Shield, 
  FileText, 
  Calendar,
  LogOut,
  Settings,
  Bell,
  BookOpen,
  Target,
  TrendingUp,
  Download,
  Play,
  Clock,
  Users,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Plus,
  Filter,
  Search
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
}

interface InternalReport {
  id: string
  title: string
  type: 'report' | 'declaration'
  category: string
  fileSize: string
  uploadDate: string
  accessLevel: string
  description: string
}

interface TrainingMaterial {
  id: string
  title: string
  type: 'video' | 'document' | 'course'
  duration: string
  category: string
  progress: number
  status: 'not_started' | 'in_progress' | 'completed'
  description: string
}

interface Toolkit {
  id: string
  title: string
  version: string
  category: string
  fileSize: string
  lastUpdated: string
  description: string
}

interface ScheduledActivity {
  id: string
  title: string
  type: 'meeting' | 'workshop' | 'training' | 'assessment'
  date: string
  duration: string
  participants: string
  status: 'upcoming' | 'ongoing' | 'completed'
  description: string
}

interface EngagementMetric {
  category: string
  current: number
  target: number
  progress: number
  status: 'on_track' | 'behind' | 'ahead'
}

export default function MemberDashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<MemberUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data - in a real app, this would come from APIs
  const [internalReports] = useState<InternalReport[]>([
    {
      id: '1',
      title: 'Internal Assessment Report: Ghana Political Parties',
      type: 'report',
      category: 'Political Reform',
      fileSize: '2.1 MB',
      uploadDate: '2025-01-15',
      accessLevel: 'Party Focal Person',
      description: 'Comprehensive assessment of political party structures and democratic practices in Ghana.'
    },
    {
      id: '2',
      title: 'Draft Declaration: African Political Parties Charter',
      type: 'declaration',
      category: 'Democratic Governance',
      fileSize: '1.5 MB',
      uploadDate: '2025-01-10',
      accessLevel: 'Party Focal Person',
      description: 'Working draft of the continental charter for political party standards and practices.'
    },
    {
      id: '3',
      title: 'Quarterly Progress Report: Party Engagement',
      type: 'report',
      category: 'Engagement',
      fileSize: '3.2 MB',
      uploadDate: '2025-01-20',
      accessLevel: 'All Members',
      description: 'Quarterly assessment of member engagement and participation metrics.'
    }
  ])

  const [trainingMaterials] = useState<TrainingMaterial[]>([
    {
      id: '1',
      title: 'Introduction to Democratic Governance',
      type: 'course',
      duration: '120 min',
      category: 'Democratic Governance',
      progress: 75,
      status: 'in_progress',
      description: 'Comprehensive introduction to democratic governance principles and practices.'
    },
    {
      id: '2',
      title: 'Political Party Reform Strategies',
      type: 'video',
      duration: '45 min',
      category: 'Political Reform',
      progress: 100,
      status: 'completed',
      description: 'Video guide on implementing effective political party reform strategies.'
    },
    {
      id: '3',
      title: 'Internal Democracy Best Practices',
      type: 'document',
      duration: '60 min',
      category: 'Democratic Governance',
      progress: 0,
      status: 'not_started',
      description: 'Document outlining best practices for internal party democracy.'
    }
  ])

  const [toolkits] = useState<Toolkit[]>([
    {
      id: '1',
      title: 'Political Party Reform Toolkit',
      version: 'v1.2',
      category: 'Political Reform',
      fileSize: '5.2 MB',
      lastUpdated: '2025-01-12',
      description: 'Comprehensive toolkit for implementing political party reforms.'
    },
    {
      id: '2',
      title: 'Member Engagement Toolkit',
      version: 'v1.0',
      category: 'Engagement',
      fileSize: '3.8 MB',
      lastUpdated: '2025-01-08',
      description: 'Tools and resources for effective member engagement and participation.'
    },
    {
      id: '3',
      title: 'Democratic Governance Assessment Toolkit',
      version: 'v1.1',
      category: 'Democratic Governance',
      fileSize: '4.1 MB',
      lastUpdated: '2025-01-15',
      description: 'Assessment tools for evaluating democratic governance practices.'
    }
  ])

  const [scheduledActivities] = useState<ScheduledActivity[]>([
    {
      id: '1',
      title: 'Monthly Party Focal Persons Meeting',
      type: 'meeting',
      date: '2025-01-25 10:00 AM',
      duration: '2 hours',
      participants: 'Party Focal Persons',
      status: 'upcoming',
      description: 'Monthly coordination meeting for party focal persons across the region.'
    },
    {
      id: '2',
      title: 'Democratic Governance Workshop',
      type: 'workshop',
      date: '2025-02-05 9:00 AM',
      duration: '6 hours',
      participants: 'All Members',
      status: 'upcoming',
      description: 'Intensive workshop on democratic governance principles and implementation.'
    },
    {
      id: '3',
      title: 'Reform Progress Assessment',
      type: 'assessment',
      date: '2025-01-30 2:00 PM',
      duration: '1 hour',
      participants: 'Party Focal Persons',
      status: 'upcoming',
      description: 'Quarterly assessment of reform progress and goal setting.'
    }
  ])

  const [engagementMetrics] = useState<EngagementMetric[]>([
    {
      category: 'Internal Democracy',
      current: 75,
      target: 100,
      progress: 75,
      status: 'on_track'
    },
    {
      category: 'Member Participation',
      current: 60,
      target: 80,
      progress: 75,
      status: 'behind'
    },
    {
      category: 'Policy Development',
      current: 90,
      target: 85,
      progress: 106,
      status: 'ahead'
    },
    {
      category: 'Transparency',
      current: 70,
      target: 90,
      progress: 78,
      status: 'behind'
    }
  ])

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('memberUser')
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing user data:', error)
          router.push('/contact/login')
        }
      } else {
        router.push('/contact/login')
      }
    }
    setLoading(false)
  }, [router])

  // Check if admin is logged in as member
  const isAdminLogin = typeof window !== 'undefined' ? localStorage.getItem('adminLoginAsMember') === 'true' : false

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('memberUser')
      localStorage.removeItem('adminLoginAsMember')
    }
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push('/contact/login')
  }

  const handleReturnToAdmin = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('memberUser')
      localStorage.removeItem('adminLoginAsMember')
    }
    toast({
      title: "Returning to Admin",
      description: "You are now back in the admin dashboard.",
    })
    router.push('/admin')
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

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'on_track': return 'bg-green-500'
      case 'ahead': return 'bg-blue-500'
      case 'behind': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'ongoing': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrainingStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'not_started': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
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
                <span className="text-lg font-semibold text-gray-900">Member Portal</span>
                {isAdminLogin && (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Admin View
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.full_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {isAdminLogin ? 'Admin (Viewing as Member)' : getRoleLabel(user.role)}
                    </p>
                  </div>
                  {isAdminLogin && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleReturnToAdmin}
                      className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Return to Admin
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => router.push('/member/settings')}>
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Admin View Notification */}
          {isAdminLogin && (
            <Card className="mb-6 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">
                        Admin View Mode
                      </h3>
                      <p className="text-sm text-blue-700">
                        You are currently viewing the member dashboard as {user.full_name}
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleReturnToAdmin}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Return to Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* User Info Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-appi-blue rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{user.full_name}</h1>
                  <p className="text-muted-foreground">{getRoleLabel(user.role)} • {user.email}</p>
                  <p className="text-sm text-muted-foreground">Last login: {new Date(user.last_login).toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(user.status)}>
                    {user.status === 'active' ? 'Verified Member' : user.status}
                  </Badge>
                  {isAdminLogin && (
                    <Button 
                      onClick={handleReturnToAdmin}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Return to Admin Dashboard
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Internal Reports</TabsTrigger>
              <TabsTrigger value="training">Training Materials</TabsTrigger>
              <TabsTrigger value="toolkits">Toolkits</TabsTrigger>
              <TabsTrigger value="activities">Scheduled Activities</TabsTrigger>
              <TabsTrigger value="engagement">Engagement & Progress</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Reports Accessed</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{internalReports.length}</div>
                    <p className="text-xs text-muted-foreground">Available reports</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Training Completed</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {trainingMaterials.filter(t => t.status === 'completed').length}
                    </div>
                    <p className="text-xs text-muted-foreground">of {trainingMaterials.length} courses</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Activities Scheduled</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {scheduledActivities.filter(a => a.status === 'upcoming').length}
                    </div>
                    <p className="text-xs text-muted-foreground">Upcoming activities</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Reform Progress</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(engagementMetrics.reduce((acc, m) => acc + m.progress, 0) / engagementMetrics.length)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Average progress</p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button className="justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    View Latest Reports
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continue Training
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Activity
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Target className="mr-2 h-4 w-4" />
                    Update Progress
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions with APPI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Successfully logged in</p>
                        <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Completed training: Political Party Reform Strategies</p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Downloaded toolkit: Political Party Reform Toolkit</p>
                        <p className="text-xs text-gray-500">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Internal Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Internal Reports & Draft Declarations</h2>
                  <p className="text-muted-foreground">Access confidential reports and draft declarations</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {internalReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{report.title}</h3>
                            <Badge variant="outline">
                              {report.type === 'report' ? 'Report' : 'Declaration'}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span>{report.category}</span>
                            <span>•</span>
                            <span>{report.accessLevel}</span>
                            <span>•</span>
                            <span>{report.fileSize}</span>
                            <span>•</span>
                            <span>Uploaded {report.uploadDate}</span>
                          </div>
                          <p className="text-sm text-gray-600">{report.description}</p>
                        </div>
                        <Button>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Training Materials Tab */}
            <TabsContent value="training" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Training Materials</h2>
                  <p className="text-muted-foreground">Access custom training materials and capacity building resources</p>
                </div>
                <Button>
                  <BookOpen className="mr-2 h-4 w-4" />
                  View All Materials
                </Button>
              </div>

              <div className="grid gap-6">
                {trainingMaterials.map((material) => (
                  <Card key={material.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{material.title}</h3>
                            <Badge variant="outline">
                              {material.type === 'video' ? 'Video' : material.type === 'course' ? 'Course' : 'Document'}
                            </Badge>
                            <Badge className={getTrainingStatusColor(material.status)}>
                              {material.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {material.duration}
                            </span>
                            <span>{material.category}</span>
                            {material.type === 'video' && (
                              <span className="flex items-center text-appi-blue">
                                <Play className="mr-1 h-3 w-3" />
                                Video Available
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                          {material.status !== 'not_started' && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{material.progress}%</span>
                              </div>
                              <Progress value={material.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                        <Button variant={material.status === 'completed' ? 'outline' : 'default'}>
                          {material.status === 'completed' ? 'Review' : material.status === 'in_progress' ? 'Continue' : 'Start'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Toolkits Tab */}
            <TabsContent value="toolkits" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Toolkits</h2>
                  <p className="text-muted-foreground">Download practical toolkits and implementation guides</p>
                </div>
                <Button>
                  <Target className="mr-2 h-4 w-4" />
                  View All Toolkits
                </Button>
              </div>

              <div className="grid gap-4">
                {toolkits.map((toolkit) => (
                  <Card key={toolkit.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{toolkit.title}</h3>
                            <Badge variant="outline">{toolkit.version}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span>{toolkit.category}</span>
                            <span>•</span>
                            <span>{toolkit.fileSize}</span>
                            <span>•</span>
                            <span>Updated {toolkit.lastUpdated}</span>
                          </div>
                          <p className="text-sm text-gray-600">{toolkit.description}</p>
                        </div>
                        <Button>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Scheduled Activities Tab */}
            <TabsContent value="activities" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Scheduled Activities</h2>
                  <p className="text-muted-foreground">View and manage your upcoming activities</p>
                </div>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New Activity
                </Button>
              </div>

              <div className="grid gap-4">
                {scheduledActivities.map((activity) => (
                  <Card key={activity.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{activity.title}</h3>
                            <Badge variant="outline">{activity.type}</Badge>
                            <Badge className={getActivityStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {activity.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {activity.duration}
                            </span>
                            <span className="flex items-center">
                              <Users className="mr-1 h-3 w-3" />
                              {activity.participants}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Engagement & Progress Tab */}
            <TabsContent value="engagement" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Engagement & Reform Progress</h2>
                  <p className="text-muted-foreground">Track your party's progress across reform areas</p>
                </div>
                <Button>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Update Progress
                </Button>
              </div>

              <div className="grid gap-6">
                {engagementMetrics.map((metric) => (
                  <Card key={metric.category}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{metric.category}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={metric.status === 'on_track' ? 'border-green-500 text-green-700' : 
                                   metric.status === 'ahead' ? 'border-blue-500 text-blue-700' : 
                                   'border-yellow-500 text-yellow-700'}
                        >
                          {metric.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{metric.current}/{metric.target} ({metric.progress}%)</span>
                        </div>
                        <Progress 
                          value={metric.progress} 
                          className="h-2"
                          style={{
                            '--progress-background': getProgressColor(metric.status)
                          } as React.CSSProperties}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Target Date:</span>
                          <p className="text-muted-foreground">2025-06-30</p>
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>
                          <p className="text-muted-foreground">
                            {metric.status === 'on_track' ? 'On track to meet target' :
                             metric.status === 'ahead' ? 'Ahead of schedule' :
                             'Behind schedule - action needed'}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">Update Progress</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Floating Return to Admin Button */}
        {isAdminLogin && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              onClick={handleReturnToAdmin}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full h-12 w-12 p-0"
              title="Return to Admin Dashboard"
            >
              <Shield className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
