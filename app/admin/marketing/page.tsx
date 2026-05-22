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
  Mail, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Eye,
  MousePointer,
  TrendingUp,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Campaign {
  id: string
  name: string
  subject: string
  content: string
  status: 'draft' | 'scheduled' | 'sent' | 'paused' | 'cancelled'
  type: 'newsletter' | 'announcement' | 'event' | 'promotional'
  recipients: number
  sent: number
  opened: number
  clicked: number
  unsubscribed: number
  open_rate: number
  click_rate: number
  scheduled_date?: string
  sent_date?: string
  created_at: string
  updated_at: string
  tags: string[]
  target_audience: string[]
}

interface Subscriber {
  id: string
  email: string
  full_name?: string
  country?: string
  subscription_date: string
  status: 'active' | 'unsubscribed' | 'bounced'
  source: string
  tags: string[]
  last_activity?: string
}

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock data
  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Summit 2024 Announcement',
      subject: 'Join us for APPI Summit 2024 - Register Now!',
      content: 'We are excited to announce the APPI Summit 2024. Join political leaders from across Africa for this transformative event.',
      status: 'sent',
      type: 'announcement',
      recipients: 1200,
      sent: 1200,
      opened: 864,
      clicked: 432,
      unsubscribed: 12,
      open_rate: 72,
      click_rate: 36,
      sent_date: '2024-01-15T10:00:00Z',
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-15T10:00:00Z',
      tags: ['summit', 'event', 'registration'],
      target_audience: ['delegates', 'political_parties', 'partners']
    },
    {
      id: '2',
      name: 'Monthly Newsletter',
      subject: 'APPI Monthly Newsletter - January 2024',
      content: 'Stay updated with the latest news, events, and opportunities from APPI.',
      status: 'scheduled',
      type: 'newsletter',
      recipients: 2100,
      sent: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      open_rate: 0,
      click_rate: 0,
      scheduled_date: '2024-01-25T09:00:00Z',
      created_at: '2024-01-20T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z',
      tags: ['newsletter', 'monthly', 'updates'],
      target_audience: ['all_subscribers']
    },
    {
      id: '3',
      name: 'Digital Democracy Workshop',
      subject: 'Free Workshop: Digital Democracy Tools for Political Parties',
      content: 'Learn about the latest digital tools and strategies for political party engagement.',
      status: 'draft',
      type: 'promotional',
      recipients: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      open_rate: 0,
      click_rate: 0,
      created_at: '2024-01-18T00:00:00Z',
      updated_at: '2024-01-18T00:00:00Z',
      tags: ['workshop', 'digital', 'free'],
      target_audience: ['youth_leaders', 'party_officials']
    },
    {
      id: '4',
      name: 'Youth Leadership Program',
      subject: 'Applications Open: Youth Leadership Development Program',
      content: 'Applications are now open for our youth leadership development program.',
      status: 'sent',
      type: 'announcement',
      recipients: 800,
      sent: 800,
      opened: 640,
      clicked: 320,
      unsubscribed: 8,
      open_rate: 80,
      click_rate: 40,
      sent_date: '2024-01-12T14:00:00Z',
      created_at: '2024-01-08T00:00:00Z',
      updated_at: '2024-01-12T14:00:00Z',
      tags: ['youth', 'leadership', 'applications'],
      target_audience: ['youth_leaders', 'students']
    },
    {
      id: '5',
      name: 'Publication Release',
      subject: 'New Publication: Electoral Integrity Framework',
      content: 'Download our latest publication on electoral integrity and transparency.',
      status: 'sent',
      type: 'promotional',
      recipients: 1500,
      sent: 1500,
      opened: 1050,
      clicked: 525,
      unsubscribed: 15,
      open_rate: 70,
      click_rate: 35,
      sent_date: '2024-01-05T11:00:00Z',
      created_at: '2024-01-03T00:00:00Z',
      updated_at: '2024-01-05T11:00:00Z',
      tags: ['publication', 'electoral', 'download'],
      target_audience: ['policy_makers', 'researchers', 'partners']
    }
  ]

  const mockSubscribers: Subscriber[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      full_name: 'John Doe',
      country: 'Nigeria',
      subscription_date: '2023-01-15T00:00:00Z',
      status: 'active',
      source: 'website',
      tags: ['delegate', 'political_party'],
      last_activity: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      email: 'jane.smith@example.com',
      full_name: 'Jane Smith',
      country: 'South Africa',
      subscription_date: '2023-03-20T00:00:00Z',
      status: 'active',
      source: 'event_registration',
      tags: ['youth_leader', 'student'],
      last_activity: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      email: 'mike.wilson@example.com',
      full_name: 'Mike Wilson',
      country: 'Ghana',
      subscription_date: '2023-06-10T00:00:00Z',
      status: 'unsubscribed',
      source: 'newsletter_signup',
      tags: ['researcher', 'academic'],
      last_activity: '2024-01-10T09:15:00Z'
    }
  ]

  useEffect(() => {
    setCampaigns(mockCampaigns)
    setFilteredCampaigns(mockCampaigns)
    setSubscribers(mockSubscribers)
  }, [])

  useEffect(() => {
    let filtered = campaigns

    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === statusFilter)
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(campaign => campaign.type === typeFilter)
    }

    setFilteredCampaigns(filtered)
  }, [campaigns, searchTerm, statusFilter, typeFilter])

  const handleAddCampaign = async (campaignData: Partial<Campaign>) => {
    setLoading(true)
    try {
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        name: campaignData.name!,
        subject: campaignData.subject!,
        content: campaignData.content!,
        type: campaignData.type as Campaign['type'],
        status: 'draft',
        recipients: 0,
        sent: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0,
        open_rate: 0,
        click_rate: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: campaignData.tags || [],
        target_audience: campaignData.target_audience || [],
      }

      setCampaigns([...campaigns, newCampaign])
      setIsAddDialogOpen(false)
      toast({
        title: "Success",
        description: "Campaign created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCampaign = async (campaignData: Partial<Campaign>) => {
    if (!selectedCampaign) return

    setLoading(true)
    try {
      const updatedCampaigns = campaigns.map(campaign =>
        campaign.id === selectedCampaign.id ? { ...campaign, ...campaignData, updated_at: new Date().toISOString() } : campaign
      )
      setCampaigns(updatedCampaigns)
      setIsEditDialogOpen(false)
      setSelectedCampaign(null)
      toast({
        title: "Success",
        description: "Campaign updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update campaign",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCampaign = async (campaignId: string) => {
    try {
      const updatedCampaigns = campaigns.filter(campaign => campaign.id !== campaignId)
      setCampaigns(updatedCampaigns)
      toast({
        title: "Success",
        description: "Campaign deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete campaign",
        variant: "destructive",
      })
    }
  }

  const handleSendCampaign = async (campaignId: string) => {
    try {
      const updatedCampaigns = campaigns.map(campaign =>
        campaign.id === campaignId ? { 
          ...campaign, 
          status: 'sent' as const, 
          sent_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } : campaign
      )
      setCampaigns(updatedCampaigns)
      toast({
        title: "Success",
        description: "Campaign sent successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send campaign",
        variant: "destructive",
      })
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'scheduled': return 'bg-yellow-100 text-yellow-800'
      case 'sent': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-orange-100 text-orange-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'newsletter': return 'bg-blue-100 text-blue-800'
      case 'announcement': return 'bg-purple-100 text-purple-800'
      case 'event': return 'bg-green-100 text-green-800'
      case 'promotional': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    totalSubscribers: subscribers.length,
    activeSubscribers: subscribers.filter(s => s.status === 'active').length,
    totalCampaigns: campaigns.length,
    sentCampaigns: campaigns.filter(c => c.status === 'sent').length,
    avgOpenRate: campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + c.open_rate, 0) / campaigns.filter(c => c.status === 'sent').length || 0,
    avgClickRate: campaigns.filter(c => c.status === 'sent').reduce((sum, c) => sum + c.click_rate, 0) / campaigns.filter(c => c.status === 'sent').length || 0,
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Marketing</h1>
          <p className="text-muted-foreground">Manage email campaigns and newsletters</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Create a new email campaign for your subscribers.
              </DialogDescription>
            </DialogHeader>
            <AddCampaignForm onSubmit={handleAddCampaign} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeSubscribers} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
            <p className="text-xs text-muted-foreground">
              {stats.sentCampaigns} sent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgOpenRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Click Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgClickRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across all campaigns
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Email Campaigns</CardTitle>
          <CardDescription>
            Manage your email campaigns and track performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search campaigns..."
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
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="promotional">Promotional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {campaign.subject}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {campaign.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {campaign.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{campaign.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadgeColor(campaign.type)}>
                        {campaign.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{campaign.recipients.toLocaleString()}</div>
                        {campaign.status === 'sent' && (
                          <div className="text-muted-foreground">
                            {campaign.sent.toLocaleString()} sent
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {campaign.status === 'sent' ? (
                        <div className="text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3 text-muted-foreground" />
                            <span>{campaign.open_rate}%</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MousePointer className="h-3 w-3 text-muted-foreground" />
                            <span>{campaign.click_rate}%</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {campaign.sent_date ? (
                        <span className="text-sm text-muted-foreground">
                          {formatDate(campaign.sent_date)}
                        </span>
                      ) : campaign.scheduled_date ? (
                        <span className="text-sm text-muted-foreground">
                          {formatDate(campaign.scheduled_date)}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
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
                              setSelectedCampaign(campaign)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Campaign
                          </DropdownMenuItem>
                          {campaign.status === 'draft' && (
                            <DropdownMenuItem
                              onClick={() => handleSendCampaign(campaign.id)}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Send Now
                            </DropdownMenuItem>
                          )}
                          {campaign.status === 'scheduled' && (
                            <DropdownMenuItem
                              onClick={() => handleSendCampaign(campaign.id)}
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Send Now
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeleteCampaign(campaign.id)}
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

      {/* Subscribers Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Subscribers Overview</CardTitle>
          <CardDescription>
            Manage your email subscribers and their preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subscribers.slice(0, 5).map((subscriber) => (
              <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {subscriber.full_name ? subscriber.full_name.charAt(0).toUpperCase() : subscriber.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{subscriber.full_name || 'No Name'}</p>
                    <p className="text-sm text-muted-foreground">{subscriber.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {subscriber.country && (
                        <Badge variant="outline" className="text-xs">
                          {subscriber.country}
                        </Badge>
                      )}
                      <Badge className={subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {subscriber.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Joined {formatDate(subscriber.subscription_date)}
                  </p>
                  {subscriber.last_activity && (
                    <p className="text-xs text-muted-foreground">
                      Last active: {formatDate(subscriber.last_activity)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update campaign information and content.
            </DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <EditCampaignForm 
              campaign={selectedCampaign} 
              onSubmit={handleUpdateCampaign} 
              loading={loading} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Add Campaign Form Component
function AddCampaignForm({ onSubmit, loading }: { onSubmit: (data: Partial<Campaign>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    type: 'newsletter' as Campaign['type'],
    tags: [] as string[],
    target_audience: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Campaign Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Campaign Type</label>
          <Select value={formData.type} onValueChange={(value: Campaign['type']) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="promotional">Promotional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Subject Line</label>
        <Input
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Write your email content here..."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <Input
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Target Audience</label>
        <Input
          value={formData.target_audience.join(', ')}
          onChange={(e) => setFormData({ ...formData, target_audience: e.target.value.split(',').map(audience => audience.trim()) })}
          placeholder="delegates, political_parties, youth_leaders"
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Campaign'}
        </Button>
      </DialogFooter>
    </form>
  )
}

// Edit Campaign Form Component
function EditCampaignForm({ campaign, onSubmit, loading }: { campaign: Campaign, onSubmit: (data: Partial<Campaign>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    name: campaign.name,
    subject: campaign.subject,
    content: campaign.content,
    type: campaign.type,
    status: campaign.status,
    tags: campaign.tags,
    target_audience: campaign.target_audience,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Campaign Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Campaign Type</label>
          <Select value={formData.type} onValueChange={(value: Campaign['type']) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newsletter">Newsletter</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="promotional">Promotional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Subject Line</label>
        <Input
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Write your email content here..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={formData.status} onValueChange={(value: Campaign['status']) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <Input
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Target Audience</label>
        <Input
          value={formData.target_audience.join(', ')}
          onChange={(e) => setFormData({ ...formData, target_audience: e.target.value.split(',').map(audience => audience.trim()) })}
          placeholder="delegates, political_parties, youth_leaders"
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Campaign'}
        </Button>
      </DialogFooter>
    </form>
  )
}
