import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Temporarily allow all routes during development
  // TODO: Re-enable production redirects when ready to launch
  return NextResponse.next()

  // Original logic (commented out for now):
  /*
  // Allow access to the root page (coming soon page)
  if (pathname === '/') {
    return NextResponse.next()
  }

  // Allow access to API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Allow access to auth routes
  if (pathname.startsWith('/auth')) {
    return NextResponse.next()
  }

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       process.env.NODE_ENV === undefined || 
                       process.env.VERCEL_ENV === 'development'
  
  // For development, allow access to all website pages except admin
  if (isDevelopment) {
    // Allow admin routes to be handled by the layout authentication
    if (pathname.startsWith('/admin')) {
      return NextResponse.next()
    }
    return NextResponse.next()
  }

  // In production, redirect all other routes to the coming soon page
  return NextResponse.redirect(new URL('/', request.url))
  */
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
