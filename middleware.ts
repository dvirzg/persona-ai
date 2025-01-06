import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    '/',
    '/chat/:path*',
    '/context/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
};
