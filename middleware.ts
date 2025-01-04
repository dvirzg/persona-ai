import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect API requests to their new locations
  if (pathname === '/api/chat') {
    const url = request.nextUrl.clone();
    url.pathname = '/chat/api/chat';
    return NextResponse.rewrite(url);
  }

  if (pathname === '/api/history') {
    const url = request.nextUrl.clone();
    url.pathname = '/chat/api/history';
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith('/api/vote')) {
    const url = request.nextUrl.clone();
    url.pathname = `/chat/api${pathname.slice(4)}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
