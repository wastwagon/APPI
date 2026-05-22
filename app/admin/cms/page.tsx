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
  Database, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  EyeOff,
  FileText,
  Image,
  Video,
  File,
  Calendar,
  User,
  Globe,
  Settings,
  Upload,
  Folder,
  ExternalLink
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Page {
  id: string
  title: string
  slug: string
  content: string
  status: 'draft' | 'published' | 'archived'
  template: string
  meta_title?: string
  meta_description?: string
  author: string
  created_at: string
  updated_at: string
  published_at?: string
  tags: string[]
  featured_image?: string
  seo_score: number
}

interface MediaFile {
  id: string
  name: string
  type: 'image' | 'video' | 'document' | 'other'
  url: string
  size: number
  mime_type: string
  uploaded_by: string
  uploaded_at: string
  alt_text?: string
  caption?: string
  tags: string[]
  usage_count: number
}

export default function CMSPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [filteredPages, setFilteredPages] = useState<Page[]>([])
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [templateFilter, setTemplateFilter] = useState<string>('all')
  const [isAddPageDialogOpen, setIsAddPageDialogOpen] = useState(false)
  const [isEditPageDialogOpen, setIsEditPageDialogOpen] = useState(false)
  const [isMediaDialogOpen, setIsMediaDialogOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock data
  const mockPages: Page[] = [
    {
      id: '1',
      title: 'About Us',
      slug: 'about-us',
      content: 'The African Political Parties Initiative (APPI) is a platform dedicated to strengthening democratic governance across Africa through political party capacity building.',
      status: 'published',
      template: 'default',
      meta_title: 'About APPI - African Political Parties Initiative',
      meta_description: 'Learn about APPI\'s mission to strengthen democratic governance across Africa through political party capacity building.',
      author: 'APPI Team',
      created_at: '2023-01-15T00:00:00Z',
      updated_at: '2024-01-10T14:30:00Z',
      published_at: '2023-01-20T10:00:00Z',
      tags: ['about', 'mission', 'governance'],
      featured_image: '/images/about-hero.jpg',
      seo_score: 85
    },
    {
      id: '2',
      title: 'Our Platforms',
      slug: 'platforms',
      content: 'Discover our comprehensive platforms designed to support political parties in their democratic journey.',
      status: 'published',
      template: 'platforms',
      meta_title: 'APPI Platforms - Digital Tools for Political Parties',
      meta_description: 'Explore APPI\'s digital platforms and tools designed to support political parties.',
      author: 'APPI Team',
      created_at: '2023-02-10T00:00:00Z',
      updated_at: '2024-01-15T09:15:00Z',
      published_at: '2023-02-15T11:00:00Z',
      tags: ['platforms', 'digital', 'tools'],
      featured_image: '/images/platforms-hero.jpg',
      seo_score: 78
    },
    {
      id: '3',
      title: 'Contact Us',
      slug: 'contact',
      content: 'Get in touch with the APPI team for inquiries, partnerships, and support.',
      status: 'published',
      template: 'contact',
      meta_title: 'Contact APPI - Get in Touch',
      meta_description: 'Contact the APPI team for inquiries, partnerships, and support.',
      author: 'APPI Team',
      created_at: '2023-01-20T00:00:00Z',
      updated_at: '2024-01-05T16:45:00Z',
      published_at: '2023-01-25T14:00:00Z',
      tags: ['contact', 'support', 'inquiries'],
      seo_score: 92
    },
    {
      id: '4',
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: 'Our privacy policy outlines how we collect, use, and protect your personal information.',
      status: 'draft',
      template: 'legal',
      meta_title: 'Privacy Policy - APPI',
      meta_description: 'Learn about how APPI collects, uses, and protects your personal information.',
      author: 'Legal Team',
      created_at: '2024-01-18T00:00:00Z',
      updated_at: '2024-01-18T00:00:00Z',
      tags: ['legal', 'privacy', 'policy'],
      seo_score: 65
    },
    {
      id: '5',
      title: 'Terms of Service',
      slug: 'terms-of-service',
      content: 'Our terms of service govern the use of APPI platforms and services.',
      status: 'draft',
      template: 'legal',
      meta_title: 'Terms of Service - APPI',
      meta_description: 'Read APPI\'s terms of service that govern the use of our platforms.',
      author: 'Legal Team',
      created_at: '2024-01-19T00:00:00Z',
      updated_at: '2024-01-19T00:00:00Z',
      tags: ['legal', 'terms', 'service'],
      seo_score: 60
    }
  ]

  const mockMediaFiles: MediaFile[] = [
    {
      id: '1',
      name: 'appi-logo.png',
      type: 'image',
      url: '/images/appi-logo.png',
      size: 245760,
      mime_type: 'image/png',
      uploaded_by: 'APPI Team',
      uploaded_at: '2023-01-10T00:00:00Z',
      alt_text: 'APPI Logo',
      caption: 'Official APPI logo',
      tags: ['logo', 'branding'],
      usage_count: 15
    },
    {
      id: '2',
      name: 'summit-2024-hero.jpg',
      type: 'image',
      url: '/images/summit-2024-hero.jpg',
      size: 1024000,
      mime_type: 'image/jpeg',
      uploaded_by: 'Marketing Team',
      uploaded_at: '2024-01-15T10:30:00Z',
      alt_text: 'APPI Summit 2024',
      caption: 'Hero image for APPI Summit 2024',
      tags: ['summit', 'event', 'hero'],
      usage_count: 3
    },
    {
      id: '3',
      name: 'digital-democracy-toolkit.pdf',
      type: 'document',
      url: '/publications/digital-democracy-toolkit.pdf',
      size: 2048576,
      mime_type: 'application/pdf',
      uploaded_by: 'Content Team',
      uploaded_at: '2024-01-12T14:15:00Z',
      alt_text: 'Digital Democracy Toolkit PDF',
      caption: 'Comprehensive guide for digital democracy',
      tags: ['publication', 'toolkit', 'digital'],
      usage_count: 8
    },
    {
      id: '4',
      name: 'youth-leadership-video.mp4',
      type: 'video',
      url: '/videos/youth-leadership-video.mp4',
      size: 52428800,
      mime_type: 'video/mp4',
      uploaded_by: 'Media Team',
      uploaded_at: '2024-01-08T16:20:00Z',
      alt_text: 'Youth Leadership Program Video',
      caption: 'Promotional video for youth leadership program',
      tags: ['video', 'youth', 'leadership'],
      usage_count: 5
    }
  ]

  useEffect(() => {
    setPages(mockPages)
    setFilteredPages(mockPages)
    setMediaFiles(mockMediaFiles)
  }, [])

  useEffect(() => {
    let filtered = pages

    if (searchTerm) {
      filtered = filtered.filter(page =>
        page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(page => page.status === statusFilter)
    }

    if (templateFilter !== 'all') {
      filtered = filtered.filter(page => page.template === templateFilter)
    }

    setFilteredPages(filtered)
  }, [pages, searchTerm, statusFilter, templateFilter])

  const handleAddPage = async (pageData: Partial<Page>) => {
    setLoading(true)
    try {
      const newPage: Page = {
        id: Date.now().toString(),
        title: pageData.title!,
        slug: pageData.slug!,
        content: pageData.content!,
        template: pageData.template || 'default',
        status: 'draft',
        meta_title: pageData.meta_title,
        meta_description: pageData.meta_description,
        author: 'Current User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: pageData.tags || [],
        featured_image: pageData.featured_image,
        seo_score: 0,
      }

      setPages([...pages, newPage])
      setIsAddPageDialogOpen(false)
      toast({
        title: "Success",
        description: "Page created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create page",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePage = async (pageData: Partial<Page>) => {
    if (!selectedPage) return

    setLoading(true)
    try {
      const updatedPages = pages.map(page =>
        page.id === selectedPage.id ? { ...page, ...pageData, updated_at: new Date().toISOString() } : page
      )
      setPages(updatedPages)
      setIsEditPageDialogOpen(false)
      setSelectedPage(null)
      toast({
        title: "Success",
        description: "Page updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update page",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePage = async (pageId: string) => {
    try {
      const updatedPages = pages.filter(page => page.id !== pageId)
      setPages(updatedPages)
      toast({
        title: "Success",
        description: "Page deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete page",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async (pageId: string, newStatus: Page['status']) => {
    try {
      const updatedPages = pages.map(page =>
        page.id === pageId ? { 
          ...page, 
          status: newStatus, 
          updated_at: new Date().toISOString(),
          published_at: newStatus === 'published' ? new Date().toISOString() : page.published_at
        } : page
      )
      setPages(updatedPages)
      toast({
        title: "Success",
        description: `Page status updated to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update page status",
        variant: "destructive",
      })
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

  const getSeoScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const stats = {
    totalPages: pages.length,
    published: pages.filter(p => p.status === 'published').length,
    drafts: pages.filter(p => p.status === 'draft').length,
    totalMedia: mediaFiles.length,
    totalSize: mediaFiles.reduce((sum, file) => sum + file.size, 0),
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Content Management System</h1>
          <p className="text-muted-foreground">Manage website content, pages, and media</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsMediaDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Media Library
          </Button>
          <Dialog open={isAddPageDialogOpen} onOpenChange={setIsAddPageDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Page
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Page</DialogTitle>
                <DialogDescription>
                  Create a new page for your website.
                </DialogDescription>
              </DialogHeader>
              <AddPageForm onSubmit={handleAddPage} loading={loading} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPages}</div>
            <p className="text-xs text-muted-foreground">
              All pages
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
              Live pages
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
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMedia}</div>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(stats.totalSize)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pages</CardTitle>
          <CardDescription>
            Manage your website pages and content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
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
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={templateFilter} onValueChange={setTemplateFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Templates</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="platforms">Platforms</SelectItem>
                  <SelectItem value="contact">Contact</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>SEO Score</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{page.title}</div>
                        <div className="text-sm text-muted-foreground">
                          /{page.slug}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {page.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {page.tags.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{page.tags.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {page.template}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(page.status)}>
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${getSeoScoreColor(page.seo_score)}`}>
                        {page.seo_score}/100
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {page.author.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{page.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(page.updated_at)}
                      </span>
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
                              setSelectedPage(page)
                              setIsEditPageDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Page
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Page
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {page.status === 'draft' && (
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(page.id, 'published')}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Publish
                            </DropdownMenuItem>
                          )}
                          {page.status === 'published' && (
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(page.id, 'archived')}
                            >
                              <EyeOff className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeletePage(page.id)}
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

      {/* Media Library Dialog */}
      <Dialog open={isMediaDialogOpen} onOpenChange={setIsMediaDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Media Library</DialogTitle>
            <DialogDescription>
              Manage your media files and assets
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mediaFiles.map((file) => (
                <div key={file.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-center h-20 bg-gray-100 rounded mb-2">
                    {file.type === 'image' ? (
                      <Image className="h-8 w-8 text-gray-400" />
                    ) : file.type === 'video' ? (
                      <Video className="h-8 w-8 text-gray-400" />
                    ) : (
                      <File className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Used {file.usage_count} times
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Page Dialog */}
      <Dialog open={isEditPageDialogOpen} onOpenChange={setIsEditPageDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Page</DialogTitle>
            <DialogDescription>
              Update page information and content.
            </DialogDescription>
          </DialogHeader>
          {selectedPage && (
            <EditPageForm 
              page={selectedPage} 
              onSubmit={handleUpdatePage} 
              loading={loading} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Add Page Form Component
function AddPageForm({ onSubmit, loading }: { onSubmit: (data: Partial<Page>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    template: 'default',
    meta_title: '',
    meta_description: '',
    tags: [] as string[],
    featured_image: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Page Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="page-url"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Template</label>
        <Select value={formData.template} onValueChange={(value) => setFormData({ ...formData, template: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="platforms">Platforms</SelectItem>
            <SelectItem value="contact">Contact</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Write your page content here..."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Meta Title</label>
        <Input
          value={formData.meta_title}
          onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
          placeholder="SEO title for search engines"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Meta Description</label>
        <textarea
          value={formData.meta_description}
          onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
          className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="SEO description for search engines"
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
        <label className="text-sm font-medium">Featured Image URL</label>
        <Input
          value={formData.featured_image}
          onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Page'}
        </Button>
      </DialogFooter>
    </form>
  )
}

// Edit Page Form Component
function EditPageForm({ page, onSubmit, loading }: { page: Page, onSubmit: (data: Partial<Page>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    title: page.title,
    slug: page.slug,
    content: page.content,
    template: page.template,
    status: page.status,
    meta_title: page.meta_title || '',
    meta_description: page.meta_description || '',
    tags: page.tags,
    featured_image: page.featured_image || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Page Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="page-url"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Template</label>
          <Select value={formData.template} onValueChange={(value) => setFormData({ ...formData, template: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="platforms">Platforms</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={formData.status} onValueChange={(value: Page['status']) => setFormData({ ...formData, status: value })}>
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
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Content</label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Write your page content here..."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Meta Title</label>
        <Input
          value={formData.meta_title}
          onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
          placeholder="SEO title for search engines"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Meta Description</label>
        <textarea
          value={formData.meta_description}
          onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
          className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="SEO description for search engines"
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
        <label className="text-sm font-medium">Featured Image URL</label>
        <Input
          value={formData.featured_image}
          onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Page'}
        </Button>
      </DialogFooter>
    </form>
  )
}
