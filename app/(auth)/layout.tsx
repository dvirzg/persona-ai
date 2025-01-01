import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Persona',
  description: 'Sign in to your Persona account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 