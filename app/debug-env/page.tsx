export default function DebugEnvPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Environment Variables Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables Status</h2>
          
          <div className="space-y-4">
            <div>
              <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>
              <span className={`ml-2 px-2 py-1 rounded text-sm ${supabaseUrl ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {supabaseUrl ? '✅ Present' : '❌ Missing'}
              </span>
              {supabaseUrl && (
                <div className="mt-1 text-sm text-gray-600 break-all">
                  {supabaseUrl.substring(0, 50)}...
                </div>
              )}
            </div>
            
            <div>
              <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>
              <span className={`ml-2 px-2 py-1 rounded text-sm ${supabaseAnonKey ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {supabaseAnonKey ? '✅ Present' : '❌ Missing'}
              </span>
              {supabaseAnonKey && (
                <div className="mt-1 text-sm text-gray-600 break-all">
                  {supabaseAnonKey.substring(0, 50)}...
                </div>
              )}
            </div>
            
            <div>
              <strong>SUPABASE_SERVICE_ROLE_KEY:</strong>
              <span className={`ml-2 px-2 py-1 rounded text-sm ${serviceRoleKey ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {serviceRoleKey ? '✅ Present' : '❌ Missing'}
              </span>
              {serviceRoleKey && (
                <div className="mt-1 text-sm text-gray-600 break-all">
                  {serviceRoleKey.substring(0, 50)}...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Configuration Summary</h2>
          
          {supabaseUrl && supabaseAnonKey ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-green-800 font-semibold">✅ Supabase Configuration Complete</h3>
              <p className="text-green-700 mt-2">
                All required environment variables are present. The application should work correctly.
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-semibold">❌ Supabase Configuration Incomplete</h3>
              <p className="text-red-700 mt-2">
                Missing required environment variables. Please check your .env.local file or deployment configuration.
              </p>
              <div className="mt-4 text-sm text-red-600">
                <p><strong>Required variables:</strong></p>
                <ul className="list-disc list-inside mt-2">
                  <li>NEXT_PUBLIC_SUPABASE_URL</li>
                  <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
                  <li>SUPABASE_SERVICE_ROLE_KEY (for admin features)</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
