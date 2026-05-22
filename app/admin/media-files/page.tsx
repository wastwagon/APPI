'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Image, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  Download,
  FileText,
  Video,
  Music,
  Upload,
  Trash2,
  Edit,
  Eye,
  Loader2,
  X,
  File,
  HardDrive,
  Users,
  BarChart3
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface MediaFile {
  id: string
  filename: string
  original_name?: string
  file_path: string
  file_size?: number
  mime_type?: string
  uploaded_by?: string
  created_at: string
  updated_at: string
  uploader?: {
    full_name?: string
    email?: string
  }
  public_url?: string
  file_type?: string
}

interface MediaStats {
  total_files: number
  total_size: number
  total_size_formatted: string
  image_count: number
  video_count: number
  document_count: number
  audio_count: number
  total_downloads: number
  category_distribution: { [key: string]: number }
}

export default function MediaFilesPage() {
  const { toast } = useToast()
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [stats, setStats] = useState<MediaStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    files: [] as File[],
    category: '',
    description: '',
    tags: '',
    isPublic: true
  })

  // Drag and drop state
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    fetchMediaFiles()
    fetchStats()
  }, [currentPage, searchTerm, filterCategory, filterType])

  const fetchMediaFiles = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      })
      
      if (searchTerm) params.append('search', searchTerm)
      if (filterCategory !== 'all') params.append('category', filterCategory)
      if (filterType !== 'all') params.append('fileType', filterType)

      const response = await fetch(`/api/admin/media-files?${params}`)
      const data = await response.json()

      if (response.ok) {
        console.log('Media files data:', data.mediaFiles)
        setMediaFiles(data.mediaFiles)
        setTotalPages(data.pagination.totalPages)
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to fetch media files",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch media files",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/media-files/stats')
      const data = await response.json()

      if (response.ok) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadForm.files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    setUploadProgress({})
    
    const uploadPromises = uploadForm.files.map(async (file, index) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('category', uploadForm.category)
      formData.append('description', uploadForm.description)
      formData.append('tags', uploadForm.tags)
      formData.append('isPublic', uploadForm.isPublic.toString())

      try {
        const response = await fetch('/api/admin/media-files', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (response.ok) {
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
          return { success: true, file: file.name }
        } else {
          setUploadProgress(prev => ({ ...prev, [file.name]: -1 }))
          return { success: false, file: file.name, error: data.error }
        }
      } catch (error) {
        setUploadProgress(prev => ({ ...prev, [file.name]: -1 }))
        return { success: false, file: file.name, error: 'Upload failed' }
      }
    })

    const results = await Promise.all(uploadPromises)
    const successful = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    if (successful > 0) {
      toast({
        title: "Upload Complete",
        description: `${successful} file(s) uploaded successfully${failed > 0 ? `, ${failed} failed` : ''}`,
      })
      setIsUploadDialogOpen(false)
      setUploadForm({
        files: [],
        category: '',
        description: '',
        tags: '',
        isPublic: true
      })
      setUploadProgress({})
      fetchMediaFiles()
      fetchStats()
    } else {
      toast({
        title: "Upload Failed",
        description: "All files failed to upload",
        variant: "destructive",
      })
    }
    
    setUploading(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    setUploadForm(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }))
  }

  const removeFile = (index: number) => {
    setUploadForm(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }))
  }



  const handleFileDelete = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/media-files/${fileId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "File deleted successfully",
        })
        fetchMediaFiles()
        fetchStats()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete file",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      })
    }
  }

  const handleFileDownload = async (fileId: string) => {
    try {
      const response = await fetch(`/api/admin/media-files/${fileId}/download`, {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        // Create a temporary link to download the file
        const link = document.createElement('a')
        link.href = data.downloadUrl
        link.download = data.fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
          title: "Download Started",
          description: "File download has begun",
        })
        
        // Refresh the file list to update download count
        fetchMediaFiles()
        fetchStats()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to download file",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      })
    }
  }



  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
      case 'audio': return <Music className="h-4 w-4" />
      default: return <File className="h-4 w-4" />
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes || bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const categories = [
    'Events', 'Guidelines', 'Presentations', 'Videos', 'Branding', 
    'Reports', 'Training', 'Publications', 'Newsletters', 'Other'
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading media files...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Media Files</h1>
            <p className="text-gray-600">Manage and organize your media files</p>
          </div>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-5 w-5 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Media Files</DialogTitle>
                <DialogDescription>
                  Upload multiple files to your media library. Drag and drop or click to select files.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleFileUpload} className="space-y-6">
                {/* Drag and Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop files here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Support for images, videos, documents, and audio files (max 50MB each)
                  </p>
                  <Input
                    id="files"
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || [])
                      setUploadForm(prev => ({
                        ...prev,
                        files: [...prev.files, ...files]
                      }))
                    }}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('files')?.click()}
                  >
                    Choose Files
                  </Button>
                </div>

                {/* Selected Files */}
                {uploadForm.files.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Selected Files ({uploadForm.files.length})</h3>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {uploadForm.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <File className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {uploadProgress[file.name] !== undefined && (
                              <div className="w-16">
                                {uploadProgress[file.name] === 100 ? (
                                  <div className="text-green-600 text-sm">✓ Done</div>
                                ) : uploadProgress[file.name] === -1 ? (
                                  <div className="text-red-600 text-sm">✗ Failed</div>
                                ) : (
                                  <div className="text-blue-600 text-sm">{uploadProgress[file.name]}%</div>
                                )}
                              </div>
                            )}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={uploadForm.category} onValueChange={(value) => setUploadForm({ ...uploadForm, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="Enter file description..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={uploadForm.tags}
                    onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPublic"
                    checked={uploadForm.isPublic}
                    onCheckedChange={(checked) => setUploadForm({ ...uploadForm, isPublic: checked as boolean })}
                  />
                  <Label htmlFor="isPublic">Make file public</Label>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={uploading || uploadForm.files.length === 0}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                    {uploading ? 'Uploading...' : `Upload ${uploadForm.files.length} File${uploadForm.files.length !== 1 ? 's' : ''}`}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <File className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Files</p>
                    <p className="text-2xl font-bold">{stats.total_files}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Size</p>
                    <p className="text-2xl font-bold">{stats.total_size_formatted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Download className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                    <p className="text-2xl font-bold">{stats.total_downloads}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">File Types</p>
                    <p className="text-2xl font-bold">{stats.image_count + stats.video_count + stats.document_count + stats.audio_count}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mediaFiles.map((file) => {
            const fileType = file.mime_type?.startsWith('image/') ? 'image' :
                           file.mime_type?.startsWith('video/') ? 'video' :
                           file.mime_type?.startsWith('audio/') ? 'audio' : 'document'
            
            return (
              <Card key={file.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative group">
                  {fileType === 'image' && file.public_url ? (
                    <img
                      src={file.public_url}
                      alt={file.original_name || file.filename}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log('Image failed to load:', file.public_url, 'for file:', file.original_name || file.filename)
                        // Hide the image and show the fallback icon
                        e.currentTarget.style.display = 'none'
                        const fallback = e.currentTarget.parentElement?.querySelector('.file-type-fallback')
                        if (fallback) {
                          fallback.classList.remove('hidden')
                        }
                      }}
                      onLoad={(e) => {
                        console.log('Image loaded successfully:', file.public_url, 'for file:', file.original_name || file.filename)
                        // Hide the fallback when image loads successfully
                        const fallback = e.currentTarget.parentElement?.querySelector('.file-type-fallback')
                        if (fallback) {
                          fallback.classList.add('hidden')
                        }
                      }}
                    />
                  ) : null}
                  <div className={`text-center file-type-fallback ${fileType === 'image' && file.public_url ? 'hidden' : ''}`}>
                    {getTypeIcon(fileType)}
                    <p className="text-sm text-gray-500 mt-2">{fileType}</p>
                    {fileType === 'image' && !file.public_url && (
                      <p className="text-xs text-red-500 mt-1">No URL available</p>
                    )}
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleFileDownload(file.id)}
                        className="bg-white text-gray-900 hover:bg-gray-100"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleFileDelete(file.id)}
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate" title={file.original_name || file.filename}>
                        {file.original_name || file.filename}
                      </h3>
                      <p className="text-xs text-gray-500">{formatFileSize(file.file_size)}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDate(file.created_at)}</span>
                      {file.uploader?.full_name && (
                        <span className="truncate ml-2">by {file.uploader.full_name}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 py-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}
