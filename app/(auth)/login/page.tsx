'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { login } from '../actions';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setEmail(formData.get('email') as string);
      const result = await login(formData);
      
      if (result.status === 'invalid_credentials') {
        toast.error('Invalid credentials');
      } else if (result.status === 'failed') {
        toast.error('Failed to sign in');
      } else if (result.status === 'invalid_data') {
        toast.error('Failed validating your submission!');
      } else if (result.status === 'success') {
        toast.success('Signed in successfully');
        setIsSuccessful(true);
        router.refresh();
      }
    } catch (error) {
      toast.error('An error occurred');
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
          <SubmitButton isSuccessful={isSuccessful}>Sign In</SubmitButton>
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
        </AuthForm>
        <Link href="/reset-password" className="text-sm text-blue-500 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
