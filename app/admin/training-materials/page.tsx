'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  User,
  Download,
  Clock,
  Lock
} from 'lucide-react'

export default function TrainingMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  // Mock data - replace with actual data from database
  const trainingMaterials = [
    {
      id: 1,
      title: 'Democratic Governance Fundamentals',
      description: 'Comprehensive training material covering the fundamentals of democratic governance',
      category: 'Governance',
      accessLevel: 'party_focal_person',
      createdAt: '2024-12-01',
      duration: '120 min',
      downloads: 89,
      fileSize: '15.2 MB'
    },
    {
      id: 2,
      title: 'Political Party Management',
      description: 'Training materials for effective political party management and organization',
      category: 'Management',
      accessLevel: 'fellow',
      createdAt: '2024-11-28',
      duration: '180 min',
      downloads: 67,
      fileSize: '22.8 MB'
    },
    {
      id: 3,
      title: 'Youth Engagement Strategies',
      description: 'Strategies and best practices for engaging youth in political processes',
      category: 'Engagement',
      accessLevel: 'platform_collaborator',
      createdAt: '2024-11-25',
      duration: '150 min',
      downloads: 45,
      fileSize: '18.5 MB'
    },
    {
      id: 4,
      title: 'Policy Development Workshop',
      description: 'Interactive workshop on developing effective party policies',
      category: 'Policy',
      accessLevel: 'party_focal_person',
      createdAt: '2024-11-20',
      duration: '240 min',
      downloads: 34,
      fileSize: '28.3 MB'
    }
  ]

  const filteredMaterials = trainingMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || material.category === filterCategory
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
          <h1 className="text-2xl font-bold text-gray-900">Training Materials</h1>
          <p className="text-gray-600">Manage educational content and training resources for the member portal</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Material</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingMaterials.length}</div>
            <p className="text-xs text-muted-foreground">Training resources</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingMaterials.reduce((sum, material) => sum + material.downloads, 0)}</div>
            <p className="text-xs text-muted-foreground">Combined downloads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(trainingMaterials.map(m => m.category)).size}</div>
            <p className="text-xs text-muted-foreground">Different categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trainingMaterials.reduce((sum, material) => sum + parseInt(material.duration), 0)} min
            </div>
            <p className="text-xs text-muted-foreground">Combined duration</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Materials</CardTitle>
          <CardDescription>Search and filter training materials</CardDescription>
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

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>Training Materials ({filteredMaterials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{material.title}</h3>
                        <Badge variant="outline">{material.category}</Badge>
                        <Badge variant="secondary">{getAccessLevelLabel(material.accessLevel)}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{material.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{material.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{material.downloads} downloads</span>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{material.fileSize}</span>
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
