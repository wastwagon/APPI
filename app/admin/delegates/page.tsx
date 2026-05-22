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
  Users, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserPlus,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Globe,
  Calendar,
  Building2,
  MapPin
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Delegate {
  id: string
  full_name: string
  email: string
  role: string
  status: string
  party_id?: string
  country_id?: string
  avatar_url?: string
  created_at: string
  updated_at?: string
}

export default function DelegatesPage() {
  const [delegates, setDelegates] = useState<Delegate[]>([])
  const [filteredDelegates, setFilteredDelegates] = useState<Delegate[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [countryFilter, setCountryFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch delegates from API
  const fetchDelegates = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (roleFilter !== 'all') params.append('role', roleFilter)
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/admin/delegates?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch delegates')
      }

      setDelegates(data.delegates || [])
      setFilteredDelegates(data.delegates || [])
    } catch (err) {
      console.error('Error fetching delegates:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch delegates')
      toast({
        title: "Error",
        description: "Failed to fetch delegates",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Load delegates on component mount
  useEffect(() => {
    fetchDelegates()
  }, [])

  // Filter delegates based on search and filters
  useEffect(() => {
    let filtered = delegates

    if (searchTerm) {
      filtered = filtered.filter(delegate =>
        delegate.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delegate.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(delegate => delegate.role === roleFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(delegate => delegate.status === statusFilter)
    }

    setFilteredDelegates(filtered)
  }, [delegates, searchTerm, roleFilter, statusFilter])

  const handleAddDelegate = async (delegateData: Partial<Delegate>) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/delegates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(delegateData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create delegate')
      }

      // Refresh the delegates list
      await fetchDelegates()
      setIsAddDialogOpen(false)
      toast({
        title: "Success",
        description: "Delegate created successfully",
      })
    } catch (error) {
      console.error('Error creating delegate:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create delegate",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateDelegate = async (delegateData: Partial<Delegate>) => {
    if (!selectedDelegate) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/delegates`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          delegateId: selectedDelegate.id,
          ...delegateData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update delegate')
      }

      // Refresh the delegates list
      await fetchDelegates()
      setIsEditDialogOpen(false)
      setSelectedDelegate(null)
      toast({
        title: "Success",
        description: "Delegate updated successfully",
      })
    } catch (error) {
      console.error('Error updating delegate:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update delegate",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteDelegate = async (delegateId: string) => {
    try {
      const response = await fetch(`/api/admin/delegates`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ delegateId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete delegate')
      }

      // Refresh the delegates list
      await fetchDelegates()
      toast({
        title: "Success",
        description: "Delegate deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting delegate:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete delegate",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async (delegateId: string, newStatus: Delegate['status']) => {
    try {
      const response = await fetch(`/api/admin/delegates`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          delegateId,
          status: newStatus,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update delegate status')
      }

      // Refresh the delegates list
      await fetchDelegates()
      toast({
        title: "Success",
        description: `Delegate status updated to ${newStatus}`,
      })
    } catch (error) {
      console.error('Error updating delegate status:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update delegate status",
        variant: "destructive",
      })
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'platform_collaborator': return 'bg-green-100 text-green-800'
      case 'fellow': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: delegates.length,
    active: delegates.filter(d => d.status === 'verified').length,
    newThisMonth: delegates.filter(d => {
      const createdDate = new Date(d.created_at)
      const now = new Date()
      return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear()
    }).length,
    countries: new Set(delegates.map(d => d.country_id)).size,
  }

  const countries = Array.from(new Set(delegates.map(d => d.country_id))).sort()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Delegates</h1>
          <p className="text-muted-foreground">Manage event delegates and participants</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Delegate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Delegate</DialogTitle>
              <DialogDescription>
                Register a new delegate for APPI events and activities.
              </DialogDescription>
            </DialogHeader>
            <AddDelegateForm onSubmit={handleAddDelegate} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading delegates...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-red-600 mb-2">Error loading delegates</p>
            <p className="text-sm text-muted-foreground">{error}</p>
            <Button onClick={fetchDelegates} className="mt-4">
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
                <CardTitle className="text-sm font-medium">Total Delegates</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-muted-foreground">
                  Registered delegates
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Delegates</CardTitle>
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
                <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.newThisMonth}</div>
                <p className="text-xs text-muted-foreground">
                  Recent registrations
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

          {/* Delegates Table */}
          <Card>
            <CardHeader>
              <CardTitle>Delegates</CardTitle>
              <CardDescription>
                Manage delegates and their participation in APPI events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="fellow">Fellow</SelectItem>
                      <SelectItem value="platform_collaborator">Platform Collaborator</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending_approval">Pending Approval</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Delegate</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDelegates.map((delegate) => (
                      <TableRow key={delegate.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {delegate.full_name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{delegate.full_name}</div>
                              <div className="text-sm text-muted-foreground">{delegate.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleBadgeColor(delegate.role)}>
                            {delegate.role.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(delegate.status)}>
                            {delegate.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{delegate.country_id ? `Country ID: ${delegate.country_id}` : 'Unknown'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">-</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">-</span>
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
                                  setSelectedDelegate(delegate)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Delegate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {delegate.status === 'verified' ? (
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(delegate.id, 'suspended')}
                                >
                                  <EyeOff className="mr-2 h-4 w-4" />
                                  Suspend
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => handleToggleStatus(delegate.id, 'verified')}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Verify
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => handleDeleteDelegate(delegate.id)}
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

          {/* Edit Delegate Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Delegate</DialogTitle>
                <DialogDescription>
                  Update delegate information and status.
                </DialogDescription>
              </DialogHeader>
              {selectedDelegate && (
                <EditDelegateForm 
                  delegate={selectedDelegate} 
                  onSubmit={handleUpdateDelegate} 
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

// Add Delegate Form Component
function AddDelegateForm({ onSubmit, loading }: { onSubmit: (data: Partial<Delegate>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: 'fellow' as Delegate['role'],
    status: 'pending_approval',
    party_id: '',
    country_id: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <Select value={formData.role} onValueChange={(value: Delegate['role']) => setFormData({ ...formData, role: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fellow">Fellow</SelectItem>
              <SelectItem value="platform_collaborator">Platform Collaborator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={formData.status} onValueChange={(value: string) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending_approval">Pending Approval</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Party ID</label>
          <Input
            value={formData.party_id}
            onChange={(e) => setFormData({ ...formData, party_id: e.target.value })}
            placeholder="Optional party ID"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Country ID</label>
          <Input
            value={formData.country_id}
            onChange={(e) => setFormData({ ...formData, country_id: e.target.value })}
            placeholder="Optional country ID"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Delegate'}
        </Button>
      </DialogFooter>
    </form>
  )
}

// Edit Delegate Form Component
function EditDelegateForm({ delegate, onSubmit, loading }: { delegate: Delegate, onSubmit: (data: Partial<Delegate>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    full_name: delegate.full_name,
    email: delegate.email,
    role: delegate.role,
    status: delegate.status,
    party_id: delegate.party_id || '',
    country_id: delegate.country_id || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <Select value={formData.role} onValueChange={(value: Delegate['role']) => setFormData({ ...formData, role: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fellow">Fellow</SelectItem>
              <SelectItem value="platform_collaborator">Platform Collaborator</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={formData.status} onValueChange={(value: string) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending_approval">Pending Approval</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Party ID</label>
          <Input
            value={formData.party_id}
            onChange={(e) => setFormData({ ...formData, party_id: e.target.value })}
            placeholder="Optional party ID"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Country ID</label>
          <Input
            value={formData.country_id}
            onChange={(e) => setFormData({ ...formData, country_id: e.target.value })}
            placeholder="Optional country ID"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Delegate'}
        </Button>
      </DialogFooter>
    </form>
  )
}
