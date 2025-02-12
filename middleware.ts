import { withAuth } from 'next-auth/middleware';

// Public paths that don't require authentication
const PUBLIC_PATHS = [
  '/',
  '/technical-details',
  '/login',
  '/register',
  '/api',
  '/_next',
  '/favicon.ico'
] as const;

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const { pathname } = req.nextUrl;
      
      // Check if the path starts with any of the public paths
      const isPublicPath = PUBLIC_PATHS.some(path => 
        pathname === path || pathname.startsWith(path)
      );
      
      // Allow access to public paths, require token for everything else
      return isPublicPath || !!token;
    }
  },
  pages: {
    signIn: '/login',
  }
});

// Only run middleware on routes that aren't static files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
