'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Activity, 
  Search, 
  Filter, 
  MoreHorizontal,
  Calendar,
  User,
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

export default function AuditLogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')

  // Mock data - replace with actual data from database
  const auditLogs = [
    {
      id: 1,
      action: 'User Login',
      description: 'APPI Administrator logged in successfully',
      user: 'APPI Administrator',
      timestamp: '2024-12-15 10:30:15',
      level: 'info',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0'
    },
    {
      id: 2,
      action: 'Content Updated',
      description: 'Updated news article "APPI Launches New Political Academy Program"',
      user: 'Emma Boateng',
      timestamp: '2024-12-15 09:45:22',
      level: 'info',
      ipAddress: '192.168.1.101',
      userAgent: 'Firefox/121.0.0.0'
    },
    {
      id: 3,
      action: 'User Created',
      description: 'Created new user account for John Doe (john.doe@example.com)',
      user: 'APPI Administrator',
      timestamp: '2024-12-15 08:15:30',
      level: 'info',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0'
    },
    {
      id: 4,
      action: 'Failed Login Attempt',
      description: 'Failed login attempt for email: unknown@example.com',
      user: 'Unknown',
      timestamp: '2024-12-15 07:30:45',
      level: 'warning',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari/17.0.0.0'
    },
    {
      id: 5,
      action: 'System Backup',
      description: 'Automated system backup completed successfully',
      user: 'System',
      timestamp: '2024-12-15 06:00:00',
      level: 'info',
      ipAddress: '127.0.0.1',
      userAgent: 'System/1.0.0.0'
    },
    {
      id: 6,
      action: 'Permission Denied',
      description: 'Access denied to admin settings for user: john.doe@example.com',
      user: 'John Doe',
      timestamp: '2024-12-14 23:15:12',
      level: 'warning',
      ipAddress: '192.168.1.103',
      userAgent: 'Chrome/120.0.0.0'
    },
    {
      id: 7,
      action: 'Data Export',
      description: 'Exported party engagement data to CSV format',
      user: 'David Adebayo',
      timestamp: '2024-12-14 22:45:30',
      level: 'info',
      ipAddress: '192.168.1.104',
      userAgent: 'Edge/120.0.0.0'
    },
    {
      id: 8,
      action: 'System Error',
      description: 'Database connection timeout during peak hours',
      user: 'System',
      timestamp: '2024-12-14 21:30:15',
      level: 'error',
      ipAddress: '127.0.0.1',
      userAgent: 'System/1.0.0.0'
    }
  ]

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterLevel === 'all' || log.level === filterLevel
    return matchesSearch && matchesFilter
  })

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'info': return <Badge variant="default" className="bg-blue-100 text-blue-800">Info</Badge>
      case 'warning': return <Badge variant="default" className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case 'error': return <Badge variant="default" className="bg-red-100 text-red-800">Error</Badge>
      case 'success': return <Badge variant="default" className="bg-green-100 text-green-800">Success</Badge>
      default: return <Badge variant="secondary">{level}</Badge>
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info': return <Activity className="h-4 w-4 text-blue-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-600">Track system activities and security events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Export Log</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.length}</div>
            <p className="text-xs text-muted-foreground">Log entries</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Info Level</CardTitle>
            <Badge variant="default" className="bg-blue-100 text-blue-800">Info</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.filter(l => l.level === 'info').length}</div>
            <p className="text-xs text-muted-foreground">Information events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <Badge variant="default" className="bg-yellow-100 text-yellow-800">Warning</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.filter(l => l.level === 'warning').length}</div>
            <p className="text-xs text-muted-foreground">Warning events</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <Badge variant="default" className="bg-red-100 text-red-800">Error</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.filter(l => l.level === 'error').length}</div>
            <p className="text-xs text-muted-foreground">Error events</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Logs</CardTitle>
          <CardDescription>Search and filter audit log entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by action, description, or user..."
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

      {/* Audit Log List */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log Entries ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                    {getLevelIcon(log.level)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{log.action}</h3>
                      {getLevelBadge(log.level)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{log.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{log.user}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>{log.ipAddress}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
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
