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
  Calendar, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Plus,
  Eye,
  EyeOff,
  MapPin,
  Users,
  Clock,
  Globe,
  Building2
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface Event {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  event_type: 'summit' | 'workshop' | 'conference' | 'seminar' | 'webinar'
  status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled'
  capacity: number
  registered_participants: number
  organizer: string
  contact_email: string
  contact_phone?: string
  website?: string
  created_at: string
  updated_at: string
  tags?: string[]
  featured: boolean
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock data
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'APPI Summit 2024',
      description: 'Annual political summit bringing together leaders from across Africa to discuss democratic governance and political reform.',
      start_date: '2024-03-15T09:00:00Z',
      end_date: '2024-03-17T18:00:00Z',
      location: 'Lagos, Nigeria',
      event_type: 'summit',
      status: 'published',
      capacity: 500,
      registered_participants: 342,
      organizer: 'APPI Secretariat',
      contact_email: 'summit@appi.org',
      contact_phone: '+234 801 234 5678',
      website: 'https://summit.appi.org',
      created_at: '2023-12-01T00:00:00Z',
      updated_at: '2024-01-15T10:30:00Z',
      tags: ['democracy', 'governance', 'political-reform'],
      featured: true
    },
    {
      id: '2',
      title: 'Digital Transformation Workshop',
      description: 'Workshop on leveraging digital technologies for political party modernization and voter engagement.',
      start_date: '2024-02-28T10:00:00Z',
      end_date: '2024-02-28T16:00:00Z',
      location: 'Virtual',
      event_type: 'workshop',
      status: 'active',
      capacity: 150,
      registered_participants: 150,
      organizer: 'APPI Digital Team',
      contact_email: 'digital@appi.org',
      contact_phone: '+234 802 345 6789',
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-20T14:15:00Z',
      tags: ['digital', 'technology', 'modernization'],
      featured: false
    },
    {
      id: '3',
      title: 'Youth Leadership Conference',
      description: 'Conference focused on empowering young political leaders and fostering intergenerational dialogue.',
      start_date: '2024-04-20T09:00:00Z',
      end_date: '2024-04-22T17:00:00Z',
      location: 'Nairobi, Kenya',
      event_type: 'conference',
      status: 'draft',
      capacity: 300,
      registered_participants: 0,
      organizer: 'APPI Youth Initiative',
      contact_email: 'youth@appi.org',
      contact_phone: '+254 70 123 4567',
      created_at: '2024-01-05T00:00:00Z',
      updated_at: '2024-01-05T00:00:00Z',
      tags: ['youth', 'leadership', 'empowerment'],
      featured: false
    },
    {
      id: '4',
      title: 'Electoral Integrity Seminar',
      description: 'Seminar on best practices for ensuring free, fair, and transparent elections in Africa.',
      start_date: '2024-05-10T14:00:00Z',
      end_date: '2024-05-10T18:00:00Z',
      location: 'Accra, Ghana',
      event_type: 'seminar',
      status: 'published',
      capacity: 100,
      registered_participants: 67,
      organizer: 'APPI Electoral Commission',
      contact_email: 'electoral@appi.org',
      contact_phone: '+233 24 567 8901',
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-25T09:45:00Z',
      tags: ['elections', 'integrity', 'transparency'],
      featured: false
    },
    {
      id: '5',
      title: 'Women in Politics Webinar',
      description: 'Webinar series highlighting the role of women in political leadership and strategies for increased representation.',
      start_date: '2024-06-15T15:00:00Z',
      end_date: '2024-06-15T17:00:00Z',
      location: 'Virtual',
      event_type: 'webinar',
      status: 'draft',
      capacity: 200,
      registered_participants: 0,
      organizer: 'APPI Gender Initiative',
      contact_email: 'gender@appi.org',
      contact_phone: '+234 803 456 7890',
      created_at: '2024-01-20T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z',
      tags: ['women', 'leadership', 'representation'],
      featured: false
    }
  ]

  useEffect(() => {
    setEvents(mockEvents)
    setFilteredEvents(mockEvents)
  }, [])

  useEffect(() => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(event => event.event_type === typeFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => event.status === statusFilter)
    }

    setFilteredEvents(filtered)
  }, [events, searchTerm, typeFilter, statusFilter])

  const handleAddEvent = async (eventData: Partial<Event>) => {
    setLoading(true)
    try {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventData.title!,
        description: eventData.description!,
        start_date: eventData.start_date!,
        end_date: eventData.end_date!,
        location: eventData.location!,
        event_type: eventData.event_type as Event['event_type'],
        status: 'draft',
        capacity: eventData.capacity || 100,
        registered_participants: 0,
        organizer: eventData.organizer!,
        contact_email: eventData.contact_email!,
        contact_phone: eventData.contact_phone,
        website: eventData.website,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: eventData.tags || [],
        featured: eventData.featured || false,
      }

      setEvents([...events, newEvent])
      setIsAddDialogOpen(false)
      toast({
        title: "Success",
        description: "Event created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateEvent = async (eventData: Partial<Event>) => {
    if (!selectedEvent) return

    setLoading(true)
    try {
      const updatedEvents = events.map(event =>
        event.id === selectedEvent.id ? { ...event, ...eventData, updated_at: new Date().toISOString() } : event
      )
      setEvents(updatedEvents)
      setIsEditDialogOpen(false)
      setSelectedEvent(null)
      toast({
        title: "Success",
        description: "Event updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const updatedEvents = events.filter(event => event.id !== eventId)
      setEvents(updatedEvents)
      toast({
        title: "Success",
        description: "Event deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async (eventId: string, newStatus: Event['status']) => {
    try {
      const updatedEvents = events.map(event =>
        event.id === eventId ? { ...event, status: newStatus, updated_at: new Date().toISOString() } : event
      )
      setEvents(updatedEvents)
      toast({
        title: "Success",
        description: `Event status updated to ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update event status",
        variant: "destructive",
      })
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'summit': return 'bg-purple-100 text-purple-800'
      case 'workshop': return 'bg-blue-100 text-blue-800'
      case 'conference': return 'bg-green-100 text-green-800'
      case 'seminar': return 'bg-orange-100 text-orange-800'
      case 'webinar': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'published': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: events.length,
    upcoming: events.filter(e => new Date(e.start_date) > new Date() && e.status !== 'cancelled').length,
    active: events.filter(e => e.status === 'active').length,
    completed: events.filter(e => e.status === 'completed').length,
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatDateTime = (dateString: string) => {
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
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground">Manage conferences, summits, and workshops</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Create a new event for the APPI platform.
              </DialogDescription>
            </DialogHeader>
            <AddEventForm onSubmit={handleAddEvent} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              All events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcoming}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">
              Past events
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          <CardDescription>
            Manage all events and their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
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
                  <SelectItem value="summit">Summit</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {event.description}
                        </div>
                        {event.featured && (
                          <Badge variant="secondary" className="mt-1">Featured</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadgeColor(event.event_type)}>
                        {event.event_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(event.status)}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{formatDate(event.start_date)}</div>
                        <div className="text-muted-foreground">
                          {formatDate(event.end_date)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{event.registered_participants}</div>
                        <div className="text-muted-foreground">/ {event.capacity}</div>
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
                              setSelectedEvent(event)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {event.status === 'draft' && (
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(event.id, 'published')}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Publish
                            </DropdownMenuItem>
                          )}
                          {event.status === 'published' && (
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(event.id, 'active')}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          {event.status === 'active' && (
                            <DropdownMenuItem
                              onClick={() => handleToggleStatus(event.id, 'completed')}
                            >
                              <Building2 className="mr-2 h-4 w-4" />
                              Complete
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeleteEvent(event.id)}
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

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update event information and details.
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <EditEventForm 
              event={selectedEvent} 
              onSubmit={handleUpdateEvent} 
              loading={loading} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Add Event Form Component
function AddEventForm({ onSubmit, loading }: { onSubmit: (data: Partial<Event>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    event_type: 'workshop' as Event['event_type'],
    capacity: 100,
    organizer: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    tags: [] as string[],
    featured: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Event Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Event Type</label>
          <Select value={formData.event_type} onValueChange={(value: Event['event_type']) => setFormData({ ...formData, event_type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summit">Summit</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="seminar">Seminar</SelectItem>
              <SelectItem value="webinar">Webinar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Event description..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date & Time</label>
          <Input
            type="datetime-local"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date & Time</label>
          <Input
            type="datetime-local"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="City, Country or Virtual"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Capacity</label>
          <Input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            min="1"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Organizer</label>
          <Input
            value={formData.organizer}
            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
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

      <div className="space-y-2">
        <label className="text-sm font-medium">Tags</label>
        <Input
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        />
        <label htmlFor="featured" className="text-sm">Featured Event</label>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </Button>
      </DialogFooter>
    </form>
  )
}

// Edit Event Form Component
function EditEventForm({ event, onSubmit, loading }: { event: Event, onSubmit: (data: Partial<Event>) => void, loading: boolean }) {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    start_date: event.start_date.slice(0, 16), // Format for datetime-local input
    end_date: event.end_date.slice(0, 16),
    location: event.location,
    event_type: event.event_type,
    status: event.status,
    capacity: event.capacity,
    organizer: event.organizer,
    contact_email: event.contact_email,
    contact_phone: event.contact_phone || '',
    website: event.website || '',
    tags: event.tags || [],
    featured: event.featured,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Event Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Event Type</label>
          <Select value={formData.event_type} onValueChange={(value: Event['event_type']) => setFormData({ ...formData, event_type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summit">Summit</SelectItem>
              <SelectItem value="workshop">Workshop</SelectItem>
              <SelectItem value="conference">Conference</SelectItem>
              <SelectItem value="seminar">Seminar</SelectItem>
              <SelectItem value="webinar">Webinar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Event description..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date & Time</label>
          <Input
            type="datetime-local"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date & Time</label>
          <Input
            type="datetime-local"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="City, Country or Virtual"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={formData.status} onValueChange={(value: Event['status']) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Capacity</label>
          <Input
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            min="1"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Organizer</label>
          <Input
            value={formData.organizer}
            onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
            required
          />
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
        <label className="text-sm font-medium">Tags</label>
        <Input
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          placeholder="tag1, tag2, tag3"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="edit_featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
        />
        <label htmlFor="edit_featured" className="text-sm">Featured Event</label>
      </div>

      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Event'}
        </Button>
      </DialogFooter>
    </form>
  )
}
