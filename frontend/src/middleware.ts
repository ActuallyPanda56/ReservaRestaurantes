import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // renew the session every time the user visits the site
  if (!request.cookies.has('session')) {
    return NextResponse.redirect('/auth')
  }

  // if the user is logged in, redirect to the profile page on login and register routes
  if (request.url.startsWith('/auth')) {
    return NextResponse.redirect('/profile')
  }

  // if the user is not logged in, redirect to the login page on protected routes
  if (request.url.startsWith('/profile')) {
    return NextResponse.redirect('/auth')
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}

