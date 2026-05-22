'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Calendar, 
  FileText, 
  Building2, 
  Settings, 
  BarChart3, 
  Mail, 
  Shield, 
  Database,
  LogOut,
  Menu,
  X,
  Home,
  Cog,
  User,
  ChevronDown
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  permissions: any
}

function UserProfileMenu({ onLogout }: { onLogout: () => void }) {
  // Mock user data for now - in a real app this would come from the session
  const user = {
    full_name: 'APPI Administrator',
    email: 'admin@appi.org'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium">{user.full_name || 'Admin User'}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.full_name || 'Admin User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/admin/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const menuSections = [
  {
    title: "MAIN",
    items: [
      { title: 'Dashboard Overview', href: '/admin', icon: Home }
    ]
  },
  {
    title: "USER MANAGEMENT",
    items: [
      { title: 'Admin Users', href: '/admin/users', icon: Shield },
      { title: 'Delegates', href: '/admin/delegates', icon: Users },
      { title: 'Members', href: '/admin/members', icon: Users },
      { title: 'Party Focal Persons', href: '/admin/party-focal-persons', icon: Users },
      { title: 'Fellows', href: '/admin/fellows', icon: Users },
      { title: 'Platform Collaborators', href: '/admin/collaborators', icon: Users }
    ]
  },
  {
    title: "CONTENT MANAGEMENT",
    items: [
      { title: 'Events', href: '/admin/events', icon: Calendar },
      { title: 'Publications', href: '/admin/publications', icon: FileText },
      { title: 'News Articles', href: '/admin/news', icon: FileText },
      { title: 'Political Parties', href: '/admin/parties', icon: Building2 },
      { title: 'CMS', href: '/admin/cms', icon: Database }
    ]
  },
  {
    title: "MEMBER PORTAL",
    items: [
      { title: 'Internal Reports', href: '/admin/internal-reports', icon: FileText },
      { title: 'Training Materials', href: '/admin/training-materials', icon: FileText },
      { title: 'Toolkits', href: '/admin/toolkits', icon: FileText },
      { title: 'Draft Declarations', href: '/admin/draft-declarations', icon: FileText },
      { title: 'Party Engagement', href: '/admin/party-engagement', icon: Users },
      { title: 'Reform Progress', href: '/admin/reform-progress', icon: BarChart3 },
      { title: 'Scheduled Activities', href: '/admin/scheduled-activities', icon: Calendar }
    ]
  },
  {
    title: "MARKETING & ANALYTICS",
    items: [
      { title: 'Marketing', href: '/admin/marketing', icon: Mail },
      { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { title: 'Website Analytics', href: '/admin/website-analytics', icon: BarChart3 },
      { title: 'Newsletter Subscriptions', href: '/admin/newsletter', icon: Mail },
      { title: 'Contact Submissions', href: '/admin/contact-submissions', icon: Mail },
      { title: 'Verifications', href: '/admin/verifications', icon: Shield }
    ]
  },
  {
    title: "SYSTEM",
    items: [
      { title: 'System Settings', href: '/admin/settings', icon: Cog },
      { title: 'Profile', href: '/admin/profile', icon: User },
      { title: 'Media Files', href: '/admin/media-files', icon: Database },
      { title: 'Audit Log', href: '/admin/audit-log', icon: FileText }
    ]
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(true) // Set to true for development
  const [isLoading, setIsLoading] = useState(false) // Set to false for development
  
  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Temporarily allow access for development
        // TODO: Implement proper authentication when API is ready
        setIsAuthenticated(true)
        setIsLoading(false)
        
        // Uncomment when auth API is ready:
        /*
        const response = await fetch('/api/admin/auth/verify', {
          method: 'GET',
          credentials: 'include',
        })
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          router.push('/auth/login')
        }
        */
      } catch (error) {
        console.error('Auth check failed:', error)
        // Temporarily allow access for development
        setIsAuthenticated(true)
        setIsLoading(false)
        // router.push('/auth/login')
      }
    }
    
    checkAuth()
  }, [router])
  
  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        router.push('/auth/login')
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  
  const getPageTitle = () => {
    switch (pathname) {
      case '/admin':
        return 'Dashboard'
      case '/admin/profile':
        return 'Profile'
      case '/admin/users':
        return 'Admin Users'
      case '/admin/members':
        return 'Members'
      case '/admin/delegates':
        return 'Delegates'
      case '/admin/party-focal-persons':
        return 'Party Focal Persons'
      case '/admin/fellows':
        return 'Fellows'
      case '/admin/collaborators':
        return 'Platform Collaborators'
      case '/admin/events':
        return 'Events'
      case '/admin/publications':
        return 'Publications'
      case '/admin/news':
        return 'News Articles'
      case '/admin/parties':
        return 'Political Parties'
      case '/admin/cms':
        return 'CMS'
      case '/admin/internal-reports':
        return 'Internal Reports'
      case '/admin/training-materials':
        return 'Training Materials'
      case '/admin/toolkits':
        return 'Toolkits'
      case '/admin/draft-declarations':
        return 'Draft Declarations'
      case '/admin/party-engagement':
        return 'Party Engagement'
      case '/admin/reform-progress':
        return 'Reform Progress'
      case '/admin/scheduled-activities':
        return 'Scheduled Activities'
      case '/admin/marketing':
        return 'Marketing'
      case '/admin/analytics':
        return 'Analytics'
      case '/admin/website-analytics':
        return 'Website Analytics'
      case '/admin/newsletter':
        return 'Newsletter Subscriptions'
      case '/admin/contact-submissions':
        return 'Contact Submissions'
      case '/admin/settings':
        return 'System Settings'
      case '/admin/media-files':
        return 'Media Files'
      case '/admin/audit-log':
        return 'Audit Log'
      default:
        return 'Dashboard'
    }
  }

  // Temporarily bypass authentication for development
  // TODO: Re-enable authentication when API is ready
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    // Temporarily allow access for development
    console.log('Auth bypassed for development')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-gray-900">APPI Admin</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {menuSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href
                    const IconComponent = item.icon
                    
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {getPageTitle()}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                </svg>
              </button>

              {/* User Menu */}
              <UserProfileMenu onLogout={handleLogout} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
