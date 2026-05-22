'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  EnvelopeIcon,
  DocumentIcon,
  AcademicCapIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks/useAuth'

const navigationSections = [
  {
    title: 'MAIN',
    items: [
      { name: 'Dashboard Overview', href: '/admin', icon: HomeIcon },
    ]
  },
  {
    title: 'USER MANAGEMENT',
    items: [
      { name: 'Admin Users', href: '/admin/users', icon: ShieldCheckIcon },
      { name: 'Delegates', href: '/admin/delegates', icon: UserGroupIcon },
      { name: 'Members', href: '/admin/members', icon: UsersIcon },
    ]
  },
  {
    title: 'CONTENT',
    items: [
      { name: 'Events', href: '/admin/events', icon: CalendarIcon },
      { name: 'Publications', href: '/admin/publications', icon: DocumentTextIcon },
      { name: 'Political Parties', href: '/admin/parties', icon: BuildingOfficeIcon },
      { name: 'CMS', href: '/admin/cms', icon: DocumentIcon },
    ]
  },
  {
    title: 'MARKETING & ANALYTICS',
    items: [
      { name: 'Marketing', href: '/admin/marketing', icon: EnvelopeIcon },
      { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { name: 'System Settings', href: '/admin/settings', icon: CogIcon },
      { name: 'Profile', href: '/admin/profile', icon: UserIcon },
    ]
  }
]

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { signOut } = useAuth()

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          {!collapsed && (
            <h1 className="text-xl font-bold">APPI Admin</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-6">
          {navigationSections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {!collapsed && item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={signOut}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </div>
    </div>
  )
}
