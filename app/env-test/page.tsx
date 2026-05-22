'use client'

export default function EnvTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Environment Variables Test
          </h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Environment Variables</h3>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Supabase URL:</span>
                  <span className={process.env.NEXT_PUBLIC_SUPABASE_URL ? 'text-green-600' : 'text-red-600'}>
                    {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Anon Key:</span>
                  <span className={process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'text-green-600' : 'text-red-600'}>
                    {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Service Key:</span>
                  <span className={process.env.SUPABASE_SERVICE_ROLE_KEY ? 'text-green-600' : 'text-red-600'}>
                    {process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="text-sm font-medium text-blue-800">Values (First 20 chars)</h4>
              <div className="text-sm text-blue-700 mt-1 space-y-1">
                <div>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20)}...</div>
                <div>Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...</div>
                <div>Service Key: {process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 20)}...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
