'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Target,
  Handshake
} from 'lucide-react'

export default function CollaboratorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - replace with actual data from database
  const collaborators = [
    {
      id: 1,
      name: 'Emma Boateng',
      email: 'emma.boateng@collaborator.appi.org',
      phone: '+233 27 777 1111',
      party: 'National Democratic Congress',
      country: 'Ghana',
      status: 'active',
      role: 'Platform Coordinator',
      specialization: 'Capacity Building',
      avatar: null
    },
    {
      id: 2,
      name: 'David Adebayo',
      email: 'david.adebayo@collaborator.appi.org',
      phone: '+234 85 777 2222',
      party: 'People\'s Democratic Party',
      country: 'Nigeria',
      status: 'active',
      role: 'Regional Coordinator',
      specialization: 'Reform Dialogues',
      avatar: null
    },
    {
      id: 3,
      name: 'Jane Wanjiku',
      email: 'jane.wanjiku@collaborator.appi.org',
      phone: '+254 72 777 3333',
      party: 'Orange Democratic Movement',
      country: 'Kenya',
      status: 'active',
      role: 'Capacity Building Lead',
      specialization: 'Youth Programs',
      avatar: null
    },
    {
      id: 4,
      name: 'Peter van der Merwe',
      email: 'peter.van@collaborator.appi.org',
      phone: '+27 84 777 4444',
      party: 'Democratic Alliance',
      country: 'South Africa',
      status: 'active',
      role: 'Reform Dialogue Facilitator',
      specialization: 'Policy Development',
      avatar: null
    }
  ]

  const filteredCollaborators = collaborators.filter(collaborator => {
    const matchesSearch = collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collaborator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collaborator.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collaborator.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || collaborator.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Collaborators</h1>
          <p className="text-gray-600">Manage capacity building leads and platform coordinators</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Collaborator</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collaborators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collaborators.length}</div>
            <p className="text-xs text-muted-foreground">Capacity building leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{collaborators.filter(c => c.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(collaborators.map(c => c.country)).size}</div>
            <p className="text-xs text-muted-foreground">Different countries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Specializations</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(collaborators.map(c => c.specialization)).size}</div>
            <p className="text-xs text-muted-foreground">Areas of expertise</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Collaborators</CardTitle>
          <CardDescription>Search and filter platform collaborators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, role, or specialization..."
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

      {/* Collaborators List */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Collaborators ({filteredCollaborators.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCollaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={collaborator.avatar} />
                    <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{collaborator.name}</h3>
                    <p className="text-sm text-gray-600">{collaborator.role}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Mail className="h-3 w-3" />
                        <span>{collaborator.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Phone className="h-3 w-3" />
                        <span>{collaborator.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{collaborator.specialization}</p>
                    <p className="text-sm text-gray-600">{collaborator.country}</p>
                  </div>
                  <Badge variant={collaborator.status === 'active' ? 'default' : 'secondary'}>
                    {collaborator.status}
                  </Badge>
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
