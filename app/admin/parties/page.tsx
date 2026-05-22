'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Building2, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  EyeOff,
  MapPin,
  Users,
  Calendar,
  Globe,
  Shield,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface PoliticalParty {
  id: string
  name: string
  description?: string
  country_id?: string
  established_date?: string
  status: string
  website?: string
  logo_url?: string
  created_at: string
  updated_at?: string
}

export default function PartiesPage() {
  const [parties, setParties] = useState<PoliticalParty[]>([])
  const [filteredParties, setFilteredParties] = useState<PoliticalParty[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [countryFilter, setCountryFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedParty, setSelectedParty] = useState<PoliticalParty | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch parties from API
  const fetchParties = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/admin/parties?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch parties')
      }

      setParties(data.parties || [])
      setFilteredParties(data.parties || [])
    } catch (err) {
      console.error('Error fetching parties:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch parties')
      toast({
        title: "Error",
        description: "Failed to fetch parties",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Load parties on component mount and when filters change
  useEffect(() => {
    fetchParties()
  }, [statusFilter, searchTerm])
  // Filter parties based on search and filters
  useEffect(() => {
    let filtered = parties

    if (searchTerm) {
      filtered = filtered.filter(party =>
        party.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        party.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(party => party.status === statusFilter)
    }

    setFilteredParties(filtered)
  }, [parties, searchTerm, statusFilter])

  const handleAddParty = async (partyData: Partial<PoliticalParty>) => {
    setLoading(true)
    try {
      const newParty: PoliticalParty = {
        id: Date.now().toString(),
        name: partyData.name!,
        short_name: partyData.short_name!,
        description: partyData.description!,
        country: partyData.country!,
        established_date: partyData.established_date!,
        ideology: partyData.ideology!,
        status: 'active',
        verified: false,
        representatives_count: 0,
        contact_email: partyData.contact_email!,
        contact_phone: partyData.contact_phone,
        website: partyData.website,
        logo_url: partyData.logo_url,
        colors: partyData.colors || [],
        leader_name: partyData.leader_name,
        leader_position: partyData.leader_position,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      setParties([...parties, newParty])
      setIsAddDialogOpen(false)
      toast({
        title: "Success",
        description: "Political party created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create political party",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateParty = async (partyData: Partial<PoliticalParty>) => {
    if (!selectedParty) return

    setLoading(true)
    try {
      const updatedParties = parties.map(party =>
        party.id === selectedParty.id ? { ...party, ...partyData, updated_at: new Date().toISOString() } : party
      )
      setParties(updatedParties)
      setIsEditDialogOpen(false)
      setSelectedParty(null)
      toast({
        title: "Success",
        description: "Political party updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update political party",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteParty = async (partyId: string) => {
    try {
      const updatedParties = parties.filter(party => party.id !== partyId)
      setParties(updatedParties)
      toast({
        title: "Success",
        description: "Political party deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete political party",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async (partyId: string, newStatus: PoliticalParty['status']) => {
    try {
      const updatedParties = parties.map(party =>
        party.id === partyId ? { ...party, status: newStatus, updated_at: new Date().toISOString() } : party
      )
      setParties(updatedParties)
      toast({
        title: "Success",
        description: `Party status updated to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update party status",
        variant: "destructive",
      })
    }
  }

  const handleToggleVerification = async (partyId: string, verified: boolean) => {
    try {
      const updatedParties = parties.map(party =>
        party.id === partyId ? { ...party, verified, updated_at: new Date().toISOString() } : party
      )
      setParties(updatedParties)
      toast({
        title: "Success",
        description: `Party verification ${verified ? 'approved' : 'revoked'}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update party verification",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-yellow-100 text-yellow-800'
      case 'banned': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: parties.length,
    active: parties.filter(p => p.status === 'active').length,
    verified: parties.filter(p => p.status === 'verified').length,
    countries: new Set(parties.map(p => p.country_id)).size,
  }

  const countries = Array.from(new Set(parties.map(p => p.country))).sort()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Political Parties</h1>
          <p className="text-muted-foreground">Manage political party information and affiliations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Party
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Political Party</DialogTitle>
              <DialogDescription>
                Register a new political party in the APPI system.
              </DialogDescription>
            </DialogHeader>
            <AddPartyForm onSubmit={handleAddParty} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading parties...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error loading parties</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={fetchParties} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Registered parties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Parties</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Parties</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.verified}</div>
            <p className="text-xs text-muted-foreground">
              Verified status
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.countries}</div>
            <p className="text-xs text-muted-foreground">
              Represented countries
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Parties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Political Parties</CardTitle>
          <CardDescription>
            Manage political parties and their information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search parties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Party</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Established</TableHead>
                  <TableHead>Representatives</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredParties.map((party) => (
                  <TableRow key={party.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={party.logo_url} alt={party.name} />
                          <AvatarFallback>
                            {party.short_name}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{party.name}</div>
                          <div className="text-sm text-muted-foreground">{party.name.split(' ').map(word => word[0]).join('').toUpperCase()}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {party.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(party.status)}>
                        {party.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{party.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(party.established_date)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{party.representatives_count}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {party.verified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedParty(party)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Party
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {party.verified ? (
                            <DropdownMenuItem
                              onClick={() => handleToggleVerification(party.id, false)}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Revoke Verification
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleToggleVerification(party.id, true)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Verify Party
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {party.status === 'active' ? (
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(party.id, 'inactive')}
                            >
                              <EyeOff className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(party.id, 'active')}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeleteParty(party.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Party Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Political Party</DialogTitle>
            <DialogDescription>
              Update political party information and details.
            </DialogDescription>
          </DialogHeader>
          {selectedParty && (
            <EditPartyForm 
              party={selectedParty} 
              onSubmit={handleUpdateParty} 
              loading={loading} 
            />
          )}
        </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}

// Add Party Form Component
function AddPartyForm({ onSubmit, loading }: { onSubmit: (data: Partial<PoliticalParty>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    short_name: '',
    description: '',
    country: '',
    established_date: '',
    ideology: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    logo_url: '',
    colors: [] as string[],
    leader_name: '',
    leader_position: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Party Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Short Name</label>
          <Input
            value={formData.short_name}
            onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
            placeholder="e.g., ANC, APC"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Brief description of the political party..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Country</label>
          <Input
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Established Date</label>
          <Input
            type="date"
            value={formData.established_date}
            onChange={(e) => setFormData({ ...formData, established_date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Ideology</label>
          <Input
            value={formData.ideology}
            onChange={(e) => setFormData({ ...formData, ideology: e.target.value })}
            placeholder="e.g., Social Democracy, Conservatism"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Email</label>
          <Input
            type="email"
            value={formData.contact_email}
            onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Phone</label>
          <Input
            value={formData.contact_phone}
            onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Website</label>
          <Input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Leader Name</label>
          <Input
            value={formData.leader_name}
            onChange={(e) => setFormData({ ...formData, leader_name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Leader Position</label>
          <Input
            value={formData.leader_position}
            onChange={(e) => setFormData({ ...formData, leader_position: e.target.value })}
            placeholder="e.g., President, Chairman"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Logo URL</label>
        <Input
          type="url"
          value={formData.logo_url}
          onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Party Colors</label>
        <Input
          value={formData.colors.join(', ')}
          onChange={(e) => setFormData({ ...formData, colors: e.target.value.split(',').map(color => color.trim()) })}
          placeholder="red, blue, white"
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Party'}
        </Button>
      </DialogFooter>
    </form>
  )
}

// Edit Party Form Component
function EditPartyForm({ party, onSubmit, loading }: { party: PoliticalParty, onSubmit: (data: Partial<PoliticalParty>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    name: party.name,
    short_name: party.short_name,
    description: party.description,
    country: party.country,
    established_date: party.established_date,
    ideology: party.ideology,
    status: party.status,
    verified: party.verified,
    contact_email: party.contact_email,
    contact_phone: party.contact_phone || '',
    website: party.website || '',
    logo_url: party.logo_url || '',
    colors: party.colors || [],
    leader_name: party.leader_name || '',
    leader_position: party.leader_position || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Party Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Short Name</label>
          <Input
            value={formData.short_name}
            onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
            placeholder="e.g., ANC, APC"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Brief description of the political party..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Country</label>
          <Input
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Established Date</label>
          <Input
            type="date"
            value={formData.established_date}
            onChange={(e) => setFormData({ ...formData, established_date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Ideology</label>
          <Input
            value={formData.ideology}
            onChange={(e) => setFormData({ ...formData, ideology: e.target.value })}
            placeholder="e.g., Social Democracy, Conservatism"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={formData.status} onValueChange={(value: PoliticalParty['status']) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="banned">Banned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Email</label>
          <Input
            type="email"
            value={formData.contact_email}
            onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Phone</label>
          <Input
            value={formData.contact_phone}
            onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Website</label>
          <Input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Leader Name</label>
          <Input
            value={formData.leader_name}
            onChange={(e) => setFormData({ ...formData, leader_name: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Leader Position</label>
        <Input
          value={formData.leader_position}
          onChange={(e) => setFormData({ ...formData, leader_position: e.target.value })}
          placeholder="e.g., President, Chairman"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Logo URL</label>
        <Input
          type="url"
          value={formData.logo_url}
          onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Party Colors</label>
        <Input
          value={formData.colors.join(', ')}
          onChange={(e) => setFormData({ ...formData, colors: e.target.value.split(',').map(color => color.trim()) })}
          placeholder="red, blue, white"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="verified"
          checked={formData.verified}
          onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
        />
        <label htmlFor="verified" className="text-sm">Verified Party</label>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Party'}
        </Button>
      </DialogFooter>
    </form>
  )
}
