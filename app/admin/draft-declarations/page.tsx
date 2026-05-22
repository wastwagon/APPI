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
  Edit,
  Eye,
  Lock
} from 'lucide-react'

export default function DraftDeclarationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - replace with actual data from database
  const draftDeclarations = [
    {
      id: 1,
      title: 'Draft Declaration on Youth Political Participation',
      description: 'Draft declaration addressing youth engagement in political processes across Africa',
      status: 'draft',
      author: 'Kofi Adjei',
      createdAt: '2024-12-01',
      lastModified: '2024-12-15',
      accessLevel: 'party_focal_person',
      version: '1.2'
    },
    {
      id: 2,
      title: 'Draft Declaration on Party Internal Democracy',
      description: 'Draft declaration on strengthening internal democracy within political parties',
      status: 'review',
      author: 'Emma Boateng',
      createdAt: '2024-11-28',
      lastModified: '2024-12-10',
      accessLevel: 'fellow',
      version: '2.0'
    },
    {
      id: 3,
      title: 'Draft Declaration on Digital Transformation',
      description: 'Draft declaration on digital transformation of political parties',
      status: 'draft',
      author: 'David Adebayo',
      createdAt: '2024-11-25',
      lastModified: '2024-12-05',
      accessLevel: 'platform_collaborator',
      version: '1.5'
    },
    {
      id: 4,
      title: 'Draft Declaration on Women Leadership',
      description: 'Draft declaration on promoting women leadership in political parties',
      status: 'final',
      author: 'Jane Wanjiku',
      createdAt: '2024-11-20',
      lastModified: '2024-12-01',
      accessLevel: 'party_focal_person',
      version: '3.1'
    }
  ]

  const filteredDeclarations = draftDeclarations.filter(declaration => {
    const matchesSearch = declaration.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         declaration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         declaration.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || declaration.status === filterStatus
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft': return <Badge variant="secondary">Draft</Badge>
      case 'review': return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Under Review</Badge>
      case 'final': return <Badge variant="default" className="bg-green-100 text-green-800">Final</Badge>
      default: return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Draft Declarations</h1>
          <p className="text-gray-600">Manage draft political declarations and policy documents</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Declaration</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Declarations</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftDeclarations.length}</div>
            <p className="text-xs text-muted-foreground">Draft documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Status</CardTitle>
            <Badge variant="secondary">Draft</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftDeclarations.filter(d => d.status === 'draft').length}</div>
            <p className="text-xs text-muted-foreground">In draft stage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Badge variant="default" className="bg-yellow-100 text-yellow-800">Review</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftDeclarations.filter(d => d.status === 'review').length}</div>
            <p className="text-xs text-muted-foreground">Being reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Final</CardTitle>
            <Badge variant="default" className="bg-green-100 text-green-800">Final</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftDeclarations.filter(d => d.status === 'final').length}</div>
            <p className="text-xs text-muted-foreground">Finalized</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Declarations</CardTitle>
          <CardDescription>Search and filter draft declarations</CardDescription>
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

      {/* Declarations List */}
      <Card>
        <CardHeader>
          <CardTitle>Draft Declarations ({filteredDeclarations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDeclarations.map((declaration) => (
              <div key={declaration.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{declaration.title}</h3>
                        {getStatusBadge(declaration.status)}
                        <Badge variant="secondary">{getAccessLevelLabel(declaration.accessLevel)}</Badge>
                        <Badge variant="outline">v{declaration.version}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{declaration.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{declaration.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Created: {declaration.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Edit className="h-3 w-3" />
                          <span>Modified: {declaration.lastModified}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
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
