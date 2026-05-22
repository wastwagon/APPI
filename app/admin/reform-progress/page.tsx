'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  Target,
  CheckCircle,
  Clock
} from 'lucide-react'

export default function ReformProgressPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - replace with actual data from database
  const reformProgress = [
    {
      id: 1,
      partyName: 'New Patriotic Party',
      country: 'Ghana',
      reformArea: 'Internal Democracy',
      progress: 85,
      status: 'in_progress',
      startDate: '2024-01-15',
      targetDate: '2024-06-30',
      milestones: 8,
      completedMilestones: 6
    },
    {
      id: 2,
      partyName: 'All Progressives Congress',
      country: 'Nigeria',
      reformArea: 'Youth Inclusion',
      progress: 92,
      status: 'completed',
      startDate: '2024-02-01',
      targetDate: '2024-05-15',
      milestones: 10,
      completedMilestones: 10
    },
    {
      id: 3,
      partyName: 'Jubilee Party',
      country: 'Kenya',
      reformArea: 'Digital Transformation',
      progress: 45,
      status: 'in_progress',
      startDate: '2024-03-01',
      targetDate: '2024-08-30',
      milestones: 12,
      completedMilestones: 5
    },
    {
      id: 4,
      partyName: 'African National Congress',
      country: 'South Africa',
      reformArea: 'Women Leadership',
      progress: 78,
      status: 'in_progress',
      startDate: '2024-01-20',
      targetDate: '2024-07-15',
      milestones: 9,
      completedMilestones: 7
    },
    {
      id: 5,
      partyName: 'National Democratic Congress',
      country: 'Ghana',
      reformArea: 'Financial Transparency',
      progress: 30,
      status: 'delayed',
      startDate: '2024-02-15',
      targetDate: '2024-05-30',
      milestones: 6,
      completedMilestones: 2
    }
  ]

  const filteredProgress = reformProgress.filter(progress => {
    const matchesSearch = progress.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         progress.reformArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         progress.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || progress.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
      case 'in_progress': return <Badge variant="default" className="bg-blue-100 text-blue-800">In Progress</Badge>
      case 'delayed': return <Badge variant="default" className="bg-red-100 text-red-800">Delayed</Badge>
      case 'not_started': return <Badge variant="secondary">Not Started</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 60) return 'text-yellow-600'
    if (progress >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reform Progress</h1>
          <p className="text-gray-600">Track political party reform progress and milestones</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Progress</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reforms</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reformProgress.length}</div>
            <p className="text-xs text-muted-foreground">Active reforms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(reformProgress.reduce((sum, p) => sum + p.progress, 0) / reformProgress.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reformProgress.filter(p => p.status === 'completed').length}</div>
            <p className="text-xs text-muted-foreground">Reforms completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reformProgress.filter(p => p.status === 'in_progress').length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Progress</CardTitle>
          <CardDescription>Search and filter reform progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by party name, reform area, or country..."
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

      {/* Progress List */}
      <Card>
        <CardHeader>
          <CardTitle>Reform Progress ({filteredProgress.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProgress.map((progress) => (
              <div key={progress.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{progress.partyName}</h3>
                        {getStatusBadge(progress.status)}
                        <Badge variant="outline">{progress.country}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{progress.reformArea}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Start: {progress.startDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="h-3 w-3" />
                          <span>Target: {progress.targetDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>{progress.completedMilestones}/{progress.milestones} milestones</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(progress.progress).replace('text-', 'bg-')}`}
                          style={{ width: `${progress.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Progress</span>
                        <span className={`font-medium ${getProgressColor(progress.progress)}`}>
                          {progress.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <TrendingUp className="h-4 w-4" />
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
