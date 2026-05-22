'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  Download,
  FileText,
  Lock
} from 'lucide-react'

export default function ToolkitsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  // Mock data - replace with actual data from database
  const toolkits = [
    {
      id: 1,
      title: 'Party Reform Implementation Toolkit',
      description: 'Comprehensive toolkit for implementing political party reforms',
      category: 'Reform',
      accessLevel: 'party_focal_person',
      createdAt: '2024-12-01',
      downloads: 156,
      fileSize: '45.2 MB',
      version: '2.1'
    },
    {
      id: 2,
      title: 'Youth Engagement Toolkit',
      description: 'Practical tools and resources for engaging youth in political processes',
      category: 'Engagement',
      accessLevel: 'fellow',
      createdAt: '2024-11-28',
      downloads: 98,
      fileSize: '32.8 MB',
      version: '1.5'
    },
    {
      id: 3,
      title: 'Digital Campaign Toolkit',
      description: 'Digital tools and strategies for modern political campaigns',
      category: 'Campaign',
      accessLevel: 'platform_collaborator',
      createdAt: '2024-11-25',
      downloads: 134,
      fileSize: '28.5 MB',
      version: '3.0'
    },
    {
      id: 4,
      title: 'Policy Development Toolkit',
      description: 'Framework and tools for developing effective party policies',
      category: 'Policy',
      accessLevel: 'party_focal_person',
      createdAt: '2024-11-20',
      downloads: 87,
      fileSize: '38.3 MB',
      version: '1.8'
    }
  ]

  const filteredToolkits = toolkits.filter(toolkit => {
    const matchesSearch = toolkit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         toolkit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         toolkit.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || toolkit.category === filterCategory
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
          <h1 className="text-2xl font-bold text-gray-900">Toolkits</h1>
          <p className="text-gray-600">Manage custom toolkits and practical resources for the member portal</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Toolkit</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Toolkits</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toolkits.length}</div>
            <p className="text-xs text-muted-foreground">Custom resources</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toolkits.reduce((sum, toolkit) => sum + toolkit.downloads, 0)}</div>
            <p className="text-xs text-muted-foreground">Combined downloads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(toolkits.map(t => t.category)).size}</div>
            <p className="text-xs text-muted-foreground">Different categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {toolkits.reduce((sum, toolkit) => sum + parseFloat(toolkit.fileSize), 0).toFixed(1)} MB
            </div>
            <p className="text-xs text-muted-foreground">Combined file size</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Toolkits</CardTitle>
          <CardDescription>Search and filter custom toolkits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by title, description, or category..."
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

      {/* Toolkits List */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Toolkits ({filteredToolkits.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredToolkits.map((toolkit) => (
              <div key={toolkit.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{toolkit.title}</h3>
                        <Badge variant="outline">{toolkit.category}</Badge>
                        <Badge variant="secondary">{getAccessLevelLabel(toolkit.accessLevel)}</Badge>
                        <Badge variant="default" className="bg-blue-100 text-blue-800">
                          v{toolkit.version}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{toolkit.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{toolkit.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{toolkit.downloads} downloads</span>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{toolkit.fileSize}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
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
