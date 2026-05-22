'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Activity {
  id: string
  type: 'user_registered' | 'event_created' | 'publication_published'
  description: string
  created_at: string
  user_name?: string
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentActivity()
  }, [])

  const fetchRecentActivity = async () => {
    try {
      // This would typically fetch from a dedicated activity log table
      // For now, we'll simulate with recent data
      const mockActivities: Activity[] = [
        {
          id: '1',
          type: 'user_registered',
          description: 'New user registered',
          created_at: new Date().toISOString(),
          user_name: 'John Doe',
        },
        {
          id: '2',
          type: 'event_created',
          description: 'New event created',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          user_name: 'Admin User',
        },
        {
          id: '3',
          type: 'publication_published',
          description: 'New publication published',
          created_at: new Date(Date.now() - 172800000).toISOString(),
          user_name: 'Content Manager',
        },
      ]

      setActivities(mockActivities)
    } catch (error) {
      console.error('Error fetching recent activity:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user_registered':
        return '👤'
      case 'event_created':
        return '📅'
      case 'publication_published':
        return '📄'
      default:
        return '📝'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <span className="text-2xl">{getActivityIcon(activity.type)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.description}
              </p>
              <p className="text-sm text-gray-500">
                {activity.user_name && `by ${activity.user_name} • `}
                {formatDate(activity.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
