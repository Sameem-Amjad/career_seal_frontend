import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value; 
  const verified = cookieStore.get('verified')?.value;

  const currentPath = req.nextUrl.pathname;

  // Redirect logged-in users away from the login and signup pages
  if (token &&
      (currentPath === '/login' || currentPath === '/signup' || (currentPath ==='/verify' && verified==='true') )
     ) {
    return NextResponse.redirect(new URL('/app/upload-resume', req.url));
  }

  // If no token, redirect protected routes to login
  if (!token && ['/app/upload-resume', '/app/saved', '/app/history', '/app/profile'].includes(currentPath)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && verified === 'false' && currentPath !== '/verify') {
    return NextResponse.redirect(new URL('/verify', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/verify',
    '/app/:path*'  // This correctly includes all subroutes under /app
  ]
  
};
