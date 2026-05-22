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
  BookOpen,
  Award
} from 'lucide-react'

export default function FellowsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data - replace with actual data from database
  const fellows = [
    {
      id: 1,
      name: 'Kofi Adjei',
      email: 'kofi.adjei@fellow.appi.org',
      phone: '+233 26 555 1234',
      party: 'New Patriotic Party',
      country: 'Ghana',
      status: 'active',
      specialization: 'Research Fellow',
      researchArea: 'Democratic Governance',
      avatar: null
    },
    {
      id: 2,
      name: 'Chioma Okonkwo',
      email: 'chioma.okonkwo@fellow.appi.org',
      phone: '+234 81 555 9876',
      party: 'All Progressives Congress',
      country: 'Nigeria',
      status: 'active',
      specialization: 'Policy Analyst',
      researchArea: 'Political Reform',
      avatar: null
    },
    {
      id: 3,
      name: 'Wambui Kimani',
      email: 'wambui.kimani@fellow.appi.org',
      phone: '+254 71 555 4321',
      party: 'Jubilee Party',
      country: 'Kenya',
      status: 'active',
      specialization: 'Democratic Governance Fellow',
      researchArea: 'Youth Engagement',
      avatar: null
    },
    {
      id: 4,
      name: 'Sipho Ndlovu',
      email: 'sipho.ndlovu@fellow.appi.org',
      phone: '+27 83 555 7890',
      party: 'African National Congress',
      country: 'South Africa',
      status: 'active',
      specialization: 'Political Reform Fellow',
      researchArea: 'Party Modernization',
      avatar: null
    }
  ]

  const filteredFellows = fellows.filter(fellow => {
    const matchesSearch = fellow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fellow.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fellow.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fellow.researchArea.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || fellow.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fellows</h1>
          <p className="text-gray-600">Manage research fellows and policy experts in the APPI network</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Fellow</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fellows</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fellows.length}</div>
            <p className="text-xs text-muted-foreground">Research & policy experts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fellows.filter(f => f.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(fellows.map(f => f.country)).size}</div>
            <p className="text-xs text-muted-foreground">Different countries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Research Areas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(fellows.map(f => f.researchArea)).size}</div>
            <p className="text-xs text-muted-foreground">Specializations</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Fellows</CardTitle>
          <CardDescription>Search and filter research fellows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, specialization, or research area..."
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

      {/* Fellows List */}
      <Card>
        <CardHeader>
          <CardTitle>Fellows ({filteredFellows.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFellows.map((fellow) => (
              <div key={fellow.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={fellow.avatar} />
                    <AvatarFallback>{fellow.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{fellow.name}</h3>
                    <p className="text-sm text-gray-600">{fellow.specialization}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Mail className="h-3 w-3" />
                        <span>{fellow.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Phone className="h-3 w-3" />
                        <span>{fellow.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{fellow.researchArea}</p>
                    <p className="text-sm text-gray-600">{fellow.country}</p>
                  </div>
                  <Badge variant={fellow.status === 'active' ? 'default' : 'secondary'}>
                    {fellow.status}
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
