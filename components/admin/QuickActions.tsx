'use client'

import Link from 'next/link'
import {
  PlusIcon,
  UserPlusIcon,
  CalendarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

const actions = [
  {
    name: 'Add User',
    description: 'Create a new user account',
    href: '/admin/users/new',
    icon: UserPlusIcon,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    name: 'Create Event',
    description: 'Schedule a new event',
    href: '/admin/events/new',
    icon: CalendarIcon,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    name: 'Add Publication',
    description: 'Publish new content',
    href: '/admin/publications/new',
    icon: DocumentTextIcon,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
  {
    name: 'Add Party',
    description: 'Register a political party',
    href: '/admin/parties/new',
    icon: PlusIcon,
    color: 'bg-orange-500 hover:bg-orange-600',
  },
]

export default function QuickActions() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.name}
              href={action.href}
              className="group relative rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${action.color} text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    {action.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
