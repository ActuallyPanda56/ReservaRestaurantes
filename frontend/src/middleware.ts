import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;
  const token = cookies.get('userToken');

  const url = 'http://localhost:3000';

  if (!token) {
    // If no token, redirect to auth for protected routes
    if (
      nextUrl.pathname.startsWith('/profile') ||
      nextUrl.pathname.startsWith('/booking')
    ) {
      return NextResponse.redirect(url + '/auth');
    }
    return NextResponse.next();
  }
}

/* export async function middleware(request: NextRequest) {
  return NextResponse.next();
} */

// Function to refresh session

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
