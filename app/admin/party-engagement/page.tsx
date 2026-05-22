'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  TrendingUp,
  Activity,
  Target
} from 'lucide-react'

export default function PartyEngagementPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCountry, setFilterCountry] = useState('all')

  // Mock data - replace with actual data from database
  const partyEngagement = [
    {
      id: 1,
      partyName: 'New Patriotic Party',
      country: 'Ghana',
      engagementScore: 85,
      lastActivity: '2024-12-15',
      eventsAttended: 12,
      resourcesDownloaded: 45,
      status: 'high'
    },
    {
      id: 2,
      partyName: 'All Progressives Congress',
      country: 'Nigeria',
      engagementScore: 72,
      lastActivity: '2024-12-12',
      eventsAttended: 8,
      resourcesDownloaded: 32,
      status: 'medium'
    },
    {
      id: 3,
      partyName: 'Jubilee Party',
      country: 'Kenya',
      engagementScore: 91,
      lastActivity: '2024-12-14',
      eventsAttended: 15,
      resourcesDownloaded: 67,
      status: 'high'
    },
    {
      id: 4,
      partyName: 'African National Congress',
      country: 'South Africa',
      engagementScore: 68,
      lastActivity: '2024-12-10',
      eventsAttended: 6,
      resourcesDownloaded: 28,
      status: 'medium'
    },
    {
      id: 5,
      partyName: 'National Democratic Congress',
      country: 'Ghana',
      engagementScore: 45,
      lastActivity: '2024-12-05',
      eventsAttended: 3,
      resourcesDownloaded: 12,
      status: 'low'
    }
  ]

  const filteredEngagement = partyEngagement.filter(engagement => {
    const matchesSearch = engagement.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         engagement.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCountry === 'all' || engagement.country === filterCountry
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'high': return <Badge variant="default" className="bg-green-100 text-green-800">High</Badge>
      case 'medium': return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case 'low': return <Badge variant="default" className="bg-red-100 text-red-800">Low</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Party Engagement</h1>
          <p className="text-gray-600">Track political party engagement and participation metrics</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Engagement</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parties</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partyEngagement.length}</div>
            <p className="text-xs text-muted-foreground">Engaged parties</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(partyEngagement.reduce((sum, p) => sum + p.engagementScore, 0) / partyEngagement.length)}
            </div>
            <p className="text-xs text-muted-foreground">Engagement score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Engagement</CardTitle>
            <Badge variant="default" className="bg-green-100 text-green-800">High</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partyEngagement.filter(p => p.status === 'high').length}</div>
            <p className="text-xs text-muted-foreground">Parties with high engagement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(partyEngagement.map(p => p.country)).size}</div>
            <p className="text-xs text-muted-foreground">Different countries</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Engagement</CardTitle>
          <CardDescription>Search and filter party engagement data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by party name or country..."
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

      {/* Engagement List */}
      <Card>
        <CardHeader>
          <CardTitle>Party Engagement ({filteredEngagement.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEngagement.map((engagement) => (
              <div key={engagement.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{engagement.partyName}</h3>
                        {getStatusBadge(engagement.status)}
                        <Badge variant="outline">{engagement.country}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Last Activity: {engagement.lastActivity}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="h-3 w-3" />
                          <span>{engagement.eventsAttended} events attended</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{engagement.resourcesDownloaded} resources downloaded</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreColor(engagement.engagementScore).replace('text-', 'bg-')}`}
                          style={{ width: `${engagement.engagementScore}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Engagement Score</span>
                        <span className={`font-medium ${getScoreColor(engagement.engagementScore)}`}>
                          {engagement.engagementScore}/100
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Activity className="h-4 w-4" />
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
