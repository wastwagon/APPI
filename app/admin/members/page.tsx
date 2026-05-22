'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
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
  Shield, 
  UserCheck, 
  UserX, 
  Plus, 
  Search, 
  Filter,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Loader2,
  MoreHorizontal,
  FileText,
  FileDown,
  Send,
  Lock,
  Unlock,
  UserPlus,
  Settings,
  LogIn,
  AlertCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Member {
  id: string
  name: string
  email: string
  role: string
  status: string
  party: string
  country: string
  city: string
  phone: string
  position: string
  lastLogin: string
  joinedDate: string
  accessLevel: string
  organization: string
  organizationType: string
}

export default function MemberManagement() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Bulk selection and actions
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [bulkActionLoading, setBulkActionLoading] = useState(false)
  
  // Edit member dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
    organization: '',
    organizationType: '',
    party_id: ''
  })

  // Political parties for assignment
  const [politicalParties, setPoliticalParties] = useState([])
  const [loadingParties, setLoadingParties] = useState(false)
  
  // Admin login simulation
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const [loginAsMember, setLoginAsMember] = useState<Member | null>(null)

  // Fetch members from API
  useEffect(() => {
    fetchMembers()
  }, [searchTerm, filterStatus])

  // Fetch political parties
  useEffect(() => {
    fetchPoliticalParties()
  }, [])

  const fetchPoliticalParties = async () => {
    try {
      setLoadingParties(true)
      const response = await fetch('/api/admin/parties')
      const data = await response.json()
      
      if (response.ok) {
        setPoliticalParties(data.parties || [])
      } else {
        console.error('Failed to fetch parties:', data.error)
      }
    } catch (error) {
      console.error('Error fetching parties:', error)
    } finally {
      setLoadingParties(false)
    }
  }

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filterStatus !== 'all') params.append('status', filterStatus)
      
      const response = await fetch(`/api/admin/members?${params.toString()}`)
      const data = await response.json()
      
      if (response.ok) {
        setMembers(data.members)
      } else {
        setError(data.error || 'Failed to fetch members')
      }
    } catch (error) {
      setError('Failed to fetch members')
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (memberId: string, newStatus: string) => {
    try {
      // Map the status to the correct enum value
      let statusToUpdate = newStatus
      if (newStatus === 'verified') {
        statusToUpdate = 'active'
      } else if (newStatus === 'pending_approval') {
        statusToUpdate = 'pending'
      }

      const response = await fetch('/api/admin/members', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId,
          status: statusToUpdate
        }),
      })

      if (response.ok) {
        // Refresh the members list
        fetchMembers()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update member status')
        console.error('Update error details:', data.details)
      }
    } catch (error) {
      setError('Failed to update member status')
      console.error('Error updating member status:', error)
    }
  }

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return
    
    try {
      const response = await fetch(`/api/admin/members?id=${memberId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Refresh the members list
        fetchMembers()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to delete member')
      }
    } catch (error) {
      setError('Failed to delete member')
      console.error('Error deleting member:', error)
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'party_focal_person': return 'Party Focal Person'
      case 'fellow': return 'Fellow'
      case 'platform_collaborator': return 'Platform Collaborator'
      case 'admin': return 'Admin'
      case 'public': return 'Public'
      default: return role
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'party_focal_person': return 'bg-blue-100 text-blue-800'
      case 'fellow': return 'bg-purple-100 text-purple-800'
      case 'platform_collaborator': return 'bg-green-100 text-green-800'
      case 'admin': return 'bg-red-100 text-red-800'
      case 'public': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Bulk selection handlers
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked)
    if (checked) {
      setSelectedMembers(members.map(member => member.id))
    } else {
      setSelectedMembers([])
    }
  }

  const handleSelectMember = (memberId: string, checked: boolean) => {
    if (checked) {
      setSelectedMembers(prev => [...prev, memberId])
    } else {
      setSelectedMembers(prev => prev.filter(id => id !== memberId))
    }
  }

  // Bulk actions
  const handleBulkAction = async (action: string) => {
    if (selectedMembers.length === 0) {
      toast({
        title: "No members selected",
        description: "Please select at least one member to perform this action.",
        variant: "destructive",
      })
      return
    }

    setBulkActionLoading(true)
    try {
      switch (action) {
        case 'activate':
          await Promise.all(selectedMembers.map(id => 
            handleStatusUpdate(id, 'active')
          ))
          toast({
            title: "Members activated",
            description: `${selectedMembers.length} members have been activated.`,
          })
          break
        case 'suspend':
          await Promise.all(selectedMembers.map(id => 
            handleStatusUpdate(id, 'suspended')
          ))
          toast({
            title: "Members suspended",
            description: `${selectedMembers.length} members have been suspended.`,
          })
          break
        case 'delete':
          if (confirm(`Are you sure you want to delete ${selectedMembers.length} members?`)) {
            await Promise.all(selectedMembers.map(id => 
              handleDeleteMember(id)
            ))
            toast({
              title: "Members deleted",
              description: `${selectedMembers.length} members have been deleted.`,
            })
          }
          break
        case 'send_email':
          toast({
            title: "Email feature",
            description: "Email functionality would be implemented here.",
          })
          break
      }
      setSelectedMembers([])
      setSelectAll(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform bulk action.",
        variant: "destructive",
      })
    } finally {
      setBulkActionLoading(false)
    }
  }

  // Edit member handlers
  const handleEditMember = (member: Member) => {
    setEditingMember(member)
    setEditFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      status: member.status,
      organization: member.organization,
      organizationType: member.organizationType,
      party_id: member.party_id || ''
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateMember = async () => {
    if (!editingMember) return

    try {
      const response = await fetch('/api/admin/members', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId: editingMember.id,
          ...editFormData
        }),
      })

      if (response.ok) {
        toast({
          title: "Member updated",
          description: "Member information has been updated successfully.",
        })
        setIsEditDialogOpen(false)
        setEditingMember(null)
        fetchMembers()
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.error || "Failed to update member",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update member",
        variant: "destructive",
      })
    }
  }

  // Admin login simulation
  const handleLoginAsMember = (member: Member) => {
    setLoginAsMember(member)
    setIsLoginDialogOpen(true)
  }

  const confirmLoginAsMember = () => {
    if (!loginAsMember) return
    
    // Simulate admin login as member
    const mockUserData = {
      id: loginAsMember.id,
      email: loginAsMember.email,
      full_name: loginAsMember.name,
      role: loginAsMember.role,
      status: loginAsMember.status,
      last_login: new Date().toISOString()
    }
    
    localStorage.setItem('memberUser', JSON.stringify(mockUserData))
    localStorage.setItem('adminLoginAsMember', 'true')
    
    toast({
      title: "Logged in as member",
      description: `You are now logged in as ${loginAsMember.name}`,
    })
    
    setIsLoginDialogOpen(false)
    setLoginAsMember(null)
    
    // Redirect to member dashboard
    window.open('/member/dashboard', '_blank')
  }

  // Export functions
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Organization', 'Joined Date', 'Last Login']
    const csvContent = [
      headers.join(','),
      ...members.map(member => [
        member.name,
        member.email,
        member.role,
        member.status,
        member.organization,
        member.joinedDate,
        member.lastLogin
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `members-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
    
    toast({
      title: "Export successful",
      description: "Members data has been exported to CSV.",
    })
  }

  const exportToPDF = () => {
    // In a real implementation, you would use a PDF library like jsPDF
    toast({
      title: "PDF Export",
      description: "PDF export functionality would be implemented here.",
    })
  }



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Member Portal Management</h1>
          <p className="text-muted-foreground">Manage political party focal persons, fellows, and platform collaborators</p>
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportToCSV}>
                <FileText className="mr-2 h-4 w-4" />
                Export to CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF}>
                <FileText className="mr-2 h-4 w-4" />
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Members
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedMembers.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-blue-900">
                  {selectedMembers.length} member(s) selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedMembers([])
                    setSelectAll(false)
                  }}
                >
                  Clear Selection
                </Button>
              </div>
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" disabled={bulkActionLoading}>
                      {bulkActionLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Settings className="mr-2 h-4 w-4" />
                      )}
                      Bulk Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleBulkAction('activate')}>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Activate Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction('suspend')}>
                      <UserX className="mr-2 h-4 w-4" />
                      Suspend Selected
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkAction('send_email')}>
                      <Send className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleBulkAction('delete')}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="text-red-800">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? 'Loading...' : `${members.length} total members`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.filter(m => m.role === 'party_focal_person').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Party focal persons
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fellows</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.filter(m => m.role === 'fellow').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Research experts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Observers</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.filter(m => m.role === 'observer').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Platform observers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search members by name, email, or party..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-appi-blue"
              >
                <option value="all">All Roles</option>
                <option value="party_focal_person">Party Focal Person</option>
                <option value="fellow">Fellow</option>
                <option value="platform_collaborator">Platform Collaborator</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-appi-blue"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Member Directory</CardTitle>
          <CardDescription>
            {loading ? 'Loading...' : `${members.length} members found`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading members...</span>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No members found</h3>
              <p className="text-gray-600">No members match your current filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">
                      <Checkbox
                        checked={selectAll}
                        onCheckedChange={handleSelectAll}
                        className="mr-2"
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Member</th>
                    <th className="text-left py-3 px-4 font-medium">Role</th>
                    <th className="text-left py-3 px-4 font-medium">Organization</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Activity</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <Checkbox
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={(checked) => handleSelectMember(member.id, checked as boolean)}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                          <div className="text-xs text-muted-foreground flex items-center mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {member.phone || 'No phone'}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getRoleColor(member.role)}>
                          {getRoleLabel(member.role)}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {member.position || 'No position'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 text-muted-foreground mr-2" />
                          <div>
                            <div className="font-medium">{member.party || 'No organization'}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {member.city || 'Unknown'}, {member.country || 'Unknown'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(member.status)}>
                          {member.status}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {member.accessLevel}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div>{member.lastLogin}</div>
                          <div className="text-xs text-muted-foreground">
                            Joined {member.joinedDate}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditMember(member)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleLoginAsMember(member)}>
                              <LogIn className="mr-2 h-4 w-4" />
                              Login as Member
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {member.status === 'active' ? (
                              <DropdownMenuItem onClick={() => handleStatusUpdate(member.id, 'suspended')}>
                                <UserX className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleStatusUpdate(member.id, 'active')}>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteMember(member.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update member information and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right">
                Role
              </label>
              <Select value={editFormData.role} onValueChange={(value) => setEditFormData({ ...editFormData, role: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="party_focal_person">Party Focal Person</SelectItem>
                  <SelectItem value="fellow">Fellow</SelectItem>
                  <SelectItem value="platform_collaborator">Platform Collaborator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <Select value={editFormData.status} onValueChange={(value) => setEditFormData({ ...editFormData, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="organization" className="text-right">
                Organization
              </label>
              <Input
                id="organization"
                value={editFormData.organization}
                onChange={(e) => setEditFormData({ ...editFormData, organization: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="party" className="text-right">
                Political Party
              </label>
              <Select 
                value={editFormData.party_id} 
                onValueChange={(value) => setEditFormData({ ...editFormData, party_id: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a political party" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No Party Assigned</SelectItem>
                  {politicalParties.map((party: any) => (
                    <SelectItem key={party.id} value={party.id.toString()}>
                      {party.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMember}>
              Update Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Login as Member Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login as Member</DialogTitle>
            <DialogDescription>
              You are about to login as {loginAsMember?.name}. This will open the member dashboard in a new tab.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Admin Access
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>You will have full access to this member's dashboard and can perform actions on their behalf.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLoginDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmLoginAsMember}>
              <LogIn className="mr-2 h-4 w-4" />
              Login as Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
