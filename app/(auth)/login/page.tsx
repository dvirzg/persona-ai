'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      setEmail(email);

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/chat'
      });

      if (result?.error) {
        toast.error('Invalid credentials');
        return;
      }

      setIsSuccessful(true);
      toast.success('Signed in successfully');
      
      // Use replace instead of push to prevent back button from going back to login
      router.replace('/chat');
    } catch (error) {
      toast.error('An error occurred');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign In</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Sign in to your account with your email and password
          </p>
        </div>
        <AuthForm onSubmit={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful} disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign up
            </Link>
            {' instead.'}
          </p>
          <p className="text-center text-sm text-gray-600 mt-2 dark:text-zinc-400">
            <Link
              href="/forgot-password"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Forgot your password?
            </Link>
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
