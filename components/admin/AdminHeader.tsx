'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'

export default function AdminHeader() {
  const { user, signOut } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Get page title from pathname
  const getPageTitle = () => {
    const path = pathname.split('/').pop()
    if (path === 'admin' || path === '') return 'Dashboard'
    
    const titles: { [key: string]: string } = {
      'users': 'Admin Users',
      'delegates': 'Delegates',
      'members': 'Members',
      'events': 'Events',
      'publications': 'Publications',
      'parties': 'Political Parties',
      'cms': 'CMS',
      'marketing': 'Marketing',
      'analytics': 'Analytics',
      'settings': 'System Settings',
      'profile': 'Profile'
    }
    
    return titles[path] || 'Dashboard'
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left - Logo */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">APPI Admin</h1>
        </div>

        {/* Center - Page Title */}
        <div className="flex-1 flex justify-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {getPageTitle()}
          </h2>
        </div>

        {/* Right - User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <BellIcon className="w-5 h-5" />
          </button>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100"
            >
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.full_name || 'APPI Administrator'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || 'admin@appi.org'}
                </p>
              </div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {user?.full_name?.charAt(0) || 'A'}
                </span>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    // Navigate to profile
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    signOut()
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
