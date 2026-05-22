'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import DashboardStats from '@/components/admin/DashboardStats'
import RecentActivity from '@/components/admin/RecentActivity'
import QuickActions from '@/components/admin/QuickActions'

export default function AdminTestPage() {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    publications: 0,
    parties: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: usersCount },
          { count: eventsCount },
          { count: publicationsCount },
          { count: partiesCount },
        ] = await Promise.all([
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('events').select('*', { count: 'exact', head: true }),
          supabase.from('publications').select('*', { count: 'exact', head: true }),
          supabase.from('political_parties').select('*', { count: 'exact', head: true }),
        ])

        setStats({
          users: usersCount || 0,
          events: eventsCount || 0,
          publications: publicationsCount || 0,
          parties: partiesCount || 0,
        })
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading admin dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard (Test)</h1>
            <p className="text-gray-600">Database connection test</p>
          </div>

          <DashboardStats stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}
