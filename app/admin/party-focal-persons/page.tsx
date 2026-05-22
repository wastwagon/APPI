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
  Building2
} from 'lucide-react'

export default function PartyFocalPersonsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - replace with actual data from database
  const partyFocalPersons = [
    {
      id: 1,
      name: 'John Owusu',
      email: 'john.owusu@npp.org.gh',
      phone: '+233 24 123 4567',
      party: 'New Patriotic Party',
      country: 'Ghana',
      status: 'active',
      position: 'Secretary General',
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Mensah',
      email: 'sarah.mensah@ndc.org.gh',
      phone: '+233 20 987 6543',
      party: 'National Democratic Congress',
      country: 'Ghana',
      status: 'active',
      position: 'National Organizer',
      avatar: null
    },
    {
      id: 3,
      name: 'Ahmed Bello',
      email: 'ahmed.bello@apc.org.ng',
      phone: '+234 80 123 4567',
      party: 'All Progressives Congress',
      country: 'Nigeria',
      status: 'active',
      position: 'Deputy Chairman',
      avatar: null
    },
    {
      id: 4,
      name: 'Grace Odhiambo',
      email: 'grace.odhiambo@jp.org.ke',
      phone: '+254 70 987 6543',
      party: 'Jubilee Party',
      country: 'Kenya',
      status: 'active',
      position: 'Secretary General',
      avatar: null
    },
    {
      id: 5,
      name: 'Thabo Maseko',
      email: 'thabo.maseko@anc.org.za',
      phone: '+27 82 123 4567',
      party: 'African National Congress',
      country: 'South Africa',
      status: 'active',
      position: 'National Executive',
      avatar: null
    }
  ]

  const filteredPersons = partyFocalPersons.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.party.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || person.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Party Focal Persons</h1>
          <p className="text-gray-600">Manage political party focal persons and their access to the member portal</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Focal Person</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Focal Persons</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partyFocalPersons.length}</div>
            <p className="text-xs text-muted-foreground">Across all parties</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partyFocalPersons.filter(p => p.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(partyFocalPersons.map(p => p.country)).size}</div>
            <p className="text-xs text-muted-foreground">Different countries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(partyFocalPersons.map(p => p.party)).size}</div>
            <p className="text-xs text-muted-foreground">Political parties</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Focal Persons</CardTitle>
          <CardDescription>Search and filter party focal persons</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or party..."
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

      {/* Focal Persons List */}
      <Card>
        <CardHeader>
          <CardTitle>Focal Persons ({filteredPersons.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPersons.map((person) => (
              <div key={person.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={person.avatar} />
                    <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{person.name}</h3>
                    <p className="text-sm text-gray-600">{person.position}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Mail className="h-3 w-3" />
                        <span>{person.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Phone className="h-3 w-3" />
                        <span>{person.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{person.party}</p>
                    <p className="text-sm text-gray-600">{person.country}</p>
                  </div>
                  <Badge variant={person.status === 'active' ? 'default' : 'secondary'}>
                    {person.status}
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
