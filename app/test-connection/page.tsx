'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnectionPage() {
  const [status, setStatus] = useState('Testing...')
  const [error, setError] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<any>({})

  useEffect(() => {
    // Check environment variables
    setEnvVars({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing'
    })

    async function testConnection() {
      try {
        setStatus('Testing Supabase connection...')
        
        // Test basic connection
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)

        if (error) {
          console.error('Supabase error:', error)
          setError(`Database error: ${error.message}`)
          setStatus('❌ Connection failed')
        } else {
          setStatus('✅ Supabase connection successful!')
        }
      } catch (err) {
        console.error('Connection error:', err)
        setError(`Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setStatus('❌ Connection failed')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            APPI Connection Test
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Testing Supabase configuration
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Environment Variables</h3>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Supabase URL:</span>
                  <span className={envVars.url === 'Set' ? 'text-green-600' : 'text-red-600'}>
                    {envVars.url}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Anon Key:</span>
                  <span className={envVars.anonKey === 'Set' ? 'text-green-600' : 'text-red-600'}>
                    {envVars.anonKey}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Service Key:</span>
                  <span className={envVars.serviceKey === 'Set' ? 'text-green-600' : 'text-red-600'}>
                    {envVars.serviceKey}
                  </span>
                </div>
              </div>
            </div>

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
                <li>• Run the SQL script in Supabase SQL Editor</li>
                <li>• Create admin user in Supabase Auth</li>
                <li>• Test admin dashboard</li>
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
                href="/"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Go to Home Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
