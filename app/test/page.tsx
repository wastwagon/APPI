'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestPage() {
  const [status, setStatus] = useState('Testing connection...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Test basic connection
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)

        if (error) {
          setError(`Database error: ${error.message}`)
          setStatus('Connection failed')
        } else {
          setStatus('✅ Supabase connection successful!')
        }
      } catch (err) {
        setError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setStatus('Connection failed')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            APPI Backend Test
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Testing Supabase connection and configuration
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Connection Status</h3>
              <p className="text-sm text-gray-600">{status}</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <h4 className="text-sm font-medium text-red-800">Error Details</h4>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-blue-800">Next Steps</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Set up database schema in Supabase</li>
                <li>• Create admin user</li>
                <li>• Test admin dashboard</li>
                <li>• Configure RLS policies</li>
              </ul>
            </div>

            <div className="space-y-2">
              <a
                href="/admin"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Go to Admin Dashboard
              </a>
              <a
                href="/auth/login"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Go to Login Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
