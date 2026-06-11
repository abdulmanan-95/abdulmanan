import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Rate limiting for API routes (simple implementation)
  if (pathname.startsWith('/api')) {
    const ip = request.ip || 'unknown';
    const rateLimitKey = `rate-limit:${ip}`;
    
    // In production, you'd use Redis or a similar solution
    // For now, this is a placeholder for rate limiting logic
    const rateLimit = 100; // requests per minute
    // Implement actual rate limiting logic here
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
