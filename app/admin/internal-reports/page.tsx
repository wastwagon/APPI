'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  User,
  Download,
  Eye,
  Lock
} from 'lucide-react'

export default function InternalReportsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAccess, setFilterAccess] = useState('all')

  // Mock data - replace with actual data from database
  const internalReports = [
    {
      id: 1,
      title: 'Internal Party Reform Assessment - Ghana',
      description: 'Comprehensive assessment of political party reform progress in Ghana',
      category: 'Assessment',
      author: 'Kofi Adjei',
      accessLevel: 'party_focal_person',
      createdAt: '2024-12-01',
      fileSize: '2.4 MB',
      downloads: 45
    },
    {
      id: 2,
      title: 'Training Needs Analysis Report',
      description: 'Analysis of training needs across political parties in the region',
      category: 'Analysis',
      author: 'Emma Boateng',
      accessLevel: 'fellow',
      createdAt: '2024-11-25',
      fileSize: '1.8 MB',
      downloads: 32
    },
    {
      id: 3,
      title: 'Capacity Building Framework',
      description: 'Framework for capacity building initiatives across political parties',
      category: 'Framework',
      author: 'David Adebayo',
      accessLevel: 'platform_collaborator',
      createdAt: '2024-11-20',
      fileSize: '3.1 MB',
      downloads: 28
    },
    {
      id: 4,
      title: 'Youth Engagement Strategy Report',
      description: 'Strategic framework for youth engagement in political processes',
      category: 'Strategy',
      author: 'Jane Wanjiku',
      accessLevel: 'party_focal_person',
      createdAt: '2024-11-15',
      fileSize: '1.5 MB',
      downloads: 67
    }
  ]

  const filteredReports = internalReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterAccess === 'all' || report.accessLevel === filterAccess
    return matchesSearch && matchesFilter
  })

  const getAccessLevelLabel = (level: string) => {
    switch (level) {
      case 'party_focal_person': return 'Party Focal Persons'
      case 'fellow': return 'Fellows'
      case 'platform_collaborator': return 'Platform Collaborators'
      default: return level
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Internal Reports</h1>
          <p className="text-gray-600">Manage internal reports and documents for the member portal</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Report</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{internalReports.length}</div>
            <p className="text-xs text-muted-foreground">Internal documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{internalReports.reduce((sum, report) => sum + report.downloads, 0)}</div>
            <p className="text-xs text-muted-foreground">Combined downloads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(internalReports.map(r => r.category)).size}</div>
            <p className="text-xs text-muted-foreground">Different categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Access Levels</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(internalReports.map(r => r.accessLevel)).size}</div>
            <p className="text-xs text-muted-foreground">Different access levels</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Reports</CardTitle>
          <CardDescription>Search and filter internal reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by title, description, or author..."
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

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Internal Reports ({filteredReports.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{report.title}</h3>
                        <Badge variant="outline">{report.category}</Badge>
                        <Badge variant="secondary">{getAccessLevelLabel(report.accessLevel)}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{report.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{report.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{report.downloads} downloads</span>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{report.fileSize}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
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
