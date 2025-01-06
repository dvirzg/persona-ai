import { compare } from 'bcrypt-ts';
import NextAuth, { getServerSession, type Session, type User, type DefaultSession, type SessionStrategy } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from '@/lib/db/queries';
import { authConfig } from './auth.config';

// Extend the built-in session type
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user']
  }
}

const config = {
  ...authConfig,
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }
        
        const users = await getUser(credentials.email);
        if (users.length === 0) {
          throw new Error('User not found');
        }
        
        const user = users[0];
        if (!user.password) {
          throw new Error('Password not set');
        }
        
        const passwordsMatch = await compare(credentials.password, user.password);
        if (!passwordsMatch) {
          throw new Error('Invalid password');
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.name || null,
          image: user.image || null
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: { token: JWT; user?: User; trigger?: string; session?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      
      // Handle session updates
      if (trigger === 'update' && session) {
        return { ...token, ...session };
      }
      
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Handle redirects
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return baseUrl + url;
      return baseUrl;
    }
  },
  events: {
    async signIn({ user }: { user: User }) {
      console.log('User signed in:', user.email);
    },
    async signOut({ token }: { token: JWT }) {
      console.log('User signed out:', token.email);
    },
    async error(error: Error) {
      console.error('Auth error:', error);
    }
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login', // Error code passed in query string as ?error=
    newUser: '/register'
  },
};

const handler = NextAuth(config);

export const auth = () => getServerSession(config);
export const signIn = handler.signIn;
export const signOut = handler.signOut;
export const GET = handler;
export const POST = handler;
