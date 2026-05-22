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
  FileText, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  EyeOff,
  Download,
  Calendar,
  User,
  Tag,
  Star,
  TrendingUp
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Publication {
  id: string
  title: string
  description: string
  content: string
  type: 'policy_brief' | 'report' | 'toolkit' | 'research_paper' | 'newsletter'
  status: 'draft' | 'published' | 'archived'
  author: string
  author_email: string
  publish_date?: string
  created_at: string
  updated_at: string
  tags: string[]
  featured: boolean
  downloads: number
  views: number
  file_url?: string
  file_size?: number
  language: string
  target_audience: string[]
}

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock data
  const mockPublications: Publication[] = [
    {
      id: '1',
      title: 'Digital Democracy Toolkit',
      description: 'A comprehensive guide for political parties to leverage digital technologies for democratic engagement and voter mobilization.',
      content: 'This toolkit provides practical strategies and best practices for political parties to enhance their digital presence and engage with citizens effectively.',
      type: 'toolkit',
      status: 'published',
      author: 'Dr. Sarah Johnson',
      author_email: 'sarah.johnson@appi.org',
      publish_date: '2024-01-15T00:00:00Z',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-15T10:30:00Z',
      tags: ['digital', 'democracy', 'technology', 'engagement'],
      featured: true,
      downloads: 1247,
      views: 3421,
      file_url: '/publications/digital-democracy-toolkit.pdf',
      file_size: 2048576,
      language: 'English',
      target_audience: ['political_parties', 'youth_leaders', 'campaign_managers']
    },
    {
      id: '2',
      title: 'Youth Engagement Strategies',
      description: 'Research paper on effective strategies for engaging young people in political processes and democratic governance.',
      content: 'This research examines successful youth engagement initiatives across Africa and provides recommendations for political parties.',
      type: 'research_paper',
      status: 'published',
      author: 'Prof. Michael Chen',
      author_email: 'michael.chen@appi.org',
      publish_date: '2024-01-10T00:00:00Z',
      created_at: '2023-12-20T00:00:00Z',
      updated_at: '2024-01-10T15:45:00Z',
      tags: ['youth', 'engagement', 'democracy', 'research'],
      featured: false,
      downloads: 856,
      views: 1892,
      file_url: '/publications/youth-engagement-strategies.pdf',
      file_size: 1536000,
      language: 'English',
      target_audience: ['youth_leaders', 'researchers', 'policy_makers']
    },
    {
      id: '3',
      title: 'Electoral Integrity Framework',
      description: 'Policy brief outlining best practices for ensuring free, fair, and transparent elections in Africa.',
      content: 'This policy brief provides a comprehensive framework for electoral integrity and transparency.',
      type: 'policy_brief',
      status: 'published',
      author: 'Dr. Amina Hassan',
      author_email: 'amina.hassan@appi.org',
      publish_date: '2024-01-05T00:00:00Z',
      created_at: '2023-12-15T00:00:00Z',
      updated_at: '2024-01-05T09:15:00Z',
      tags: ['elections', 'integrity', 'transparency', 'governance'],
      featured: true,
      downloads: 1123,
      views: 2678,
      file_url: '/publications/electoral-integrity-framework.pdf',
      file_size: 1024000,
      language: 'English',
      target_audience: ['electoral_commissions', 'political_parties', 'observers']
    },
    {
      id: '4',
      title: 'Women in Politics Report',
      description: 'Annual report on the state of women participation in political leadership across Africa.',
      content: 'This report analyzes trends in women political participation and provides recommendations for increased representation.',
      type: 'report',
      status: 'draft',
      author: 'Dr. Fatima Nkrumah',
      author_email: 'fatima.nkrumah@appi.org',
      created_at: '2024-01-20T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z',
      tags: ['women', 'leadership', 'representation', 'gender'],
      featured: false,
      downloads: 0,
      views: 0,
      language: 'English',
      target_audience: ['women_leaders', 'gender_advocates', 'policy_makers']
    },
    {
      id: '5',
      title: 'APPI Monthly Newsletter',
      description: 'Monthly newsletter highlighting APPI activities, events, and updates from the political parties community.',
      content: 'This newsletter provides updates on APPI initiatives and opportunities for political parties.',
      type: 'newsletter',
      status: 'published',
      author: 'APPI Communications Team',
      author_email: 'communications@appi.org',
      publish_date: '2024-01-01T00:00:00Z',
      created_at: '2023-12-30T00:00:00Z',
      updated_at: '2024-01-01T12:00:00Z',
      tags: ['newsletter', 'updates', 'events', 'community'],
      featured: false,
      downloads: 234,
      views: 567,
      file_url: '/publications/appi-newsletter-jan-2024.pdf',
      file_size: 512000,
      language: 'English',
      target_audience: ['all_members', 'delegates', 'partners']
    }
  ]

  useEffect(() => {
    setPublications(mockPublications)
    setFilteredPublications(mockPublications)
  }, [])

  useEffect(() => {
    let filtered = publications

    if (searchTerm) {
      filtered = filtered.filter(publication =>
        publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(publication => publication.type === typeFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(publication => publication.status === statusFilter)
    }

    setFilteredPublications(filtered)
  }, [publications, searchTerm, typeFilter, statusFilter])

  const handleAddPublication = async (publicationData: Partial<Publication>) => {
    setLoading(true)
    try {
      const newPublication: Publication = {
        id: Date.now().toString(),
        title: publicationData.title!,
        description: publicationData.description!,
        content: publicationData.content!,
        type: publicationData.type as Publication['type'],
        status: 'draft',
        author: publicationData.author!,
        author_email: publicationData.author_email!,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: publicationData.tags || [],
        featured: publicationData.featured || false,
        downloads: 0,
        views: 0,
        file_url: publicationData.file_url,
        file_size: publicationData.file_size,
        language: publicationData.language || 'English',
        target_audience: publicationData.target_audience || [],
      }

      setPublications([...publications, newPublication])
      setIsAddDialogOpen(false)
      toast({
        title: "Success",
        description: "Publication created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create publication",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePublication = async (publicationData: Partial<Publication>) => {
    if (!selectedPublication) return

    setLoading(true)
    try {
      const updatedPublications = publications.map(publication =>
        publication.id === selectedPublication.id ? { ...publication, ...publicationData, updated_at: new Date().toISOString() } : publication
      )
      setPublications(updatedPublications)
      setIsEditDialogOpen(false)
      setSelectedPublication(null)
      toast({
        title: "Success",
        description: "Publication updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update publication",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePublication = async (publicationId: string) => {
    try {
      const updatedPublications = publications.filter(publication => publication.id !== publicationId)
      setPublications(updatedPublications)
      toast({
        title: "Success",
        description: "Publication deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete publication",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async (publicationId: string, newStatus: Publication['status']) => {
    try {
      const updatedPublications = publications.map(publication =>
        publication.id === publicationId ? { 
          ...publication, 
          status: newStatus, 
          updated_at: new Date().toISOString(),
          publish_date: newStatus === 'published' ? new Date().toISOString() : publication.publish_date
        } : publication
      )
      setPublications(updatedPublications)
      toast({
        title: "Success",
        description: `Publication status updated to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update publication status",
        variant: "destructive",
      })
    }
  }

  const handleToggleFeatured = async (publicationId: string, featured: boolean) => {
    try {
      const updatedPublications = publications.map(publication =>
        publication.id === publicationId ? { ...publication, featured, updated_at: new Date().toISOString() } : publication
      )
      setPublications(updatedPublications)
      toast({
        title: "Success",
        description: `Publication ${featured ? 'featured' : 'unfeatured'}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update publication featured status",
        variant: "destructive",
      })
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'policy_brief': return 'bg-blue-100 text-blue-800'
      case 'report': return 'bg-green-100 text-green-800'
      case 'toolkit': return 'bg-purple-100 text-purple-800'
      case 'research_paper': return 'bg-orange-100 text-orange-800'
      case 'newsletter': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'published': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: publications.length,
    published: publications.filter(p => p.status === 'published').length,
    drafts: publications.filter(p => p.status === 'draft').length,
    totalDownloads: publications.reduce((sum, p) => sum + p.downloads, 0),
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Publications</h1>
          <p className="text-muted-foreground">Manage policy briefs, reports, and toolkits</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Publication
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Publication</DialogTitle>
              <DialogDescription>
                Create a new publication for the APPI platform.
              </DialogDescription>
            </DialogHeader>
            <AddPublicationForm onSubmit={handleAddPublication} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Publications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All publications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
            <p className="text-xs text-muted-foreground">
              Publicly available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.drafts}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All time downloads
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Publications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Publications</CardTitle>
          <CardDescription>
            Manage all publications and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search publications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="policy_brief">Policy Brief</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                  <SelectItem value="toolkit">Toolkit</SelectItem>
                  <SelectItem value="research_paper">Research Paper</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Publication</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPublications.map((publication) => (
                  <TableRow key={publication.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{publication.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {publication.description}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {publication.featured && (
                            <Badge variant="secondary">
                              <Star className="mr-1 h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                          <div className="flex items-center space-x-1">
                            <Tag className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {publication.tags.slice(0, 2).join(', ')}
                              {publication.tags.length > 2 && '...'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadgeColor(publication.type)}>
                        {publication.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(publication.status)}>
                        {publication.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {publication.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{publication.author}</div>
                          <div className="text-xs text-muted-foreground">{publication.author_email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {publication.publish_date ? (
                        <span className="text-sm text-muted-foreground">
                          {formatDate(publication.publish_date)}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not published</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{publication.downloads.toLocaleString()}</span>
                      </div>
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
                              setSelectedPublication(publication)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Publication
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {publication.status === 'draft' && (
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(publication.id, 'published')}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Publish
                            </DropdownMenuItem>
                          )}
                          {publication.status === 'published' && (
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(publication.id, 'archived')}
                            >
                              <EyeOff className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {publication.featured ? (
                            <DropdownMenuItem
                              onClick={() => handleToggleFeatured(publication.id, false)}
                            >
                              <Star className="mr-2 h-4 w-4" />
                              Unfeature
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleToggleFeatured(publication.id, true)}
                            >
                              <Star className="mr-2 h-4 w-4" />
                              Feature
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeletePublication(publication.id)}
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

      {/* Edit Publication Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Publication</DialogTitle>
            <DialogDescription>
              Update publication information and details.
            </DialogDescription>
          </DialogHeader>
          {selectedPublication && (
            <EditPublicationForm 
              publication={selectedPublication} 
              onSubmit={handleUpdatePublication} 
              loading={loading} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Add Publication Form Component
function AddPublicationForm({ onSubmit, loading }: { onSubmit: (data: Partial<Publication>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    type: 'policy_brief' as Publication['type'],
    author: '',
    author_email: '',
    tags: [] as string[],
    featured: false,
    file_url: '',
    file_size: 0,
    language: 'English',
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
          <label className="text-sm font-medium">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <Select value={formData.type} onValueChange={(value: Publication['type']) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="policy_brief">Policy Brief</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="toolkit">Toolkit</SelectItem>
              <SelectItem value="research_paper">Research Paper</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Brief description of the publication..."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Main content of the publication..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Author</label>
          <Input
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Author Email</label>
          <Input
            type="email"
            value={formData.author_email}
            onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <Input
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            placeholder="e.g., English, French"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">File URL</label>
          <Input
            type="url"
            value={formData.file_url}
            onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
            placeholder="https://..."
          />
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
          placeholder="political_parties, youth_leaders, policy_makers"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        />
        <label htmlFor="featured" className="text-sm">Featured Publication</label>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Publication'}
        </Button>
      </DialogFooter>
    </form>
  )
}

// Edit Publication Form Component
function EditPublicationForm({ publication, onSubmit, loading }: { publication: Publication, onSubmit: (data: Partial<Publication>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    title: publication.title,
    description: publication.description,
    content: publication.content,
    type: publication.type,
    status: publication.status,
    author: publication.author,
    author_email: publication.author_email,
    tags: publication.tags,
    featured: publication.featured,
    file_url: publication.file_url || '',
    file_size: publication.file_size || 0,
    language: publication.language,
    target_audience: publication.target_audience,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Type</label>
          <Select value={formData.type} onValueChange={(value: Publication['type']) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="policy_brief">Policy Brief</SelectItem>
              <SelectItem value="report">Report</SelectItem>
              <SelectItem value="toolkit">Toolkit</SelectItem>
              <SelectItem value="research_paper">Research Paper</SelectItem>
              <SelectItem value="newsletter">Newsletter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Brief description of the publication..."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Main content of the publication..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={formData.status} onValueChange={(value: Publication['status']) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Language</label>
          <Input
            value={formData.language}
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            placeholder="e.g., English, French"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Author</label>
          <Input
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Author Email</label>
          <Input
            type="email"
            value={formData.author_email}
            onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">File URL</label>
        <Input
          type="url"
          value={formData.file_url}
          onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
          placeholder="https://..."
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
          placeholder="political_parties, youth_leaders, policy_makers"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="edit_featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        />
        <label htmlFor="edit_featured" className="text-sm">Featured Publication</label>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Publication'}
        </Button>
      </DialogFooter>
    </form>
  )
}
