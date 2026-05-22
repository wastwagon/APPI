'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Clock,
  Users,
  MapPin,
  Video
} from 'lucide-react'

export default function ScheduledActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Mock data - replace with actual data from database
  const scheduledActivities = [
    {
      id: 1,
      title: 'Youth Engagement Workshop',
      type: 'workshop',
      date: '2024-12-20',
      time: '10:00 AM',
      duration: '3 hours',
      participants: 25,
      maxParticipants: 30,
      location: 'Virtual (Zoom)',
      organizer: 'Emma Boateng',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Policy Development Training',
      type: 'training',
      date: '2024-12-22',
      time: '2:00 PM',
      duration: '4 hours',
      participants: 18,
      maxParticipants: 20,
      location: 'Accra, Ghana',
      organizer: 'Kofi Adjei',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Reform Dialogue Session',
      type: 'dialogue',
      date: '2024-12-18',
      time: '11:00 AM',
      duration: '2 hours',
      participants: 15,
      maxParticipants: 25,
      location: 'Lagos, Nigeria',
      organizer: 'David Adebayo',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Digital Campaign Strategy Meeting',
      type: 'meeting',
      date: '2024-12-25',
      time: '3:00 PM',
      duration: '1.5 hours',
      participants: 12,
      maxParticipants: 15,
      location: 'Virtual (Teams)',
      organizer: 'Jane Wanjiku',
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Capacity Building Webinar',
      type: 'webinar',
      date: '2024-12-16',
      time: '1:00 PM',
      duration: '2 hours',
      participants: 45,
      maxParticipants: 50,
      location: 'Virtual (Webinar)',
      organizer: 'Sipho Ndlovu',
      status: 'completed'
    }
  ]

  const filteredActivities = scheduledActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || activity.type === filterType
    return matchesSearch && matchesFilter
  })

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'workshop': return <Badge variant="default" className="bg-blue-100 text-blue-800">Workshop</Badge>
      case 'training': return <Badge variant="default" className="bg-green-100 text-green-800">Training</Badge>
      case 'dialogue': return <Badge variant="default" className="bg-purple-100 text-purple-800">Dialogue</Badge>
      case 'meeting': return <Badge variant="default" className="bg-orange-100 text-orange-800">Meeting</Badge>
      case 'webinar': return <Badge variant="default" className="bg-indigo-100 text-indigo-800">Webinar</Badge>
      default: return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming': return <Badge variant="default" className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case 'completed': return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case 'cancelled': return <Badge variant="default" className="bg-red-100 text-red-800">Cancelled</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Activities</h1>
          <p className="text-gray-600">Manage scheduled activities and events for the member portal</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Schedule Activity</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledActivities.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledActivities.filter(a => a.status === 'upcoming').length}</div>
            <p className="text-xs text-muted-foreground">Future activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledActivities.reduce((sum, a) => sum + a.participants, 0)}</div>
            <p className="text-xs text-muted-foreground">Combined participants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Types</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(scheduledActivities.map(a => a.type)).size}</div>
            <p className="text-xs text-muted-foreground">Different types</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Activities</CardTitle>
          <CardDescription>Search and filter scheduled activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by title, organizer, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activities List */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Activities ({filteredActivities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        {getTypeBadge(activity.type)}
                        {getStatusBadge(activity.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{activity.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{activity.time} ({activity.duration})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{activity.participants}/{activity.maxParticipants} participants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>Organizer: {activity.organizer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
