'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';
import { Logo } from '@/components/logo';

import { register } from '../actions';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setEmail(formData.get('email') as string);
      const result = await register(formData);
      
      if (result.status === 'user_exists') {
        toast.error('Account already exists');
      } else if (result.status === 'failed') {
        toast.error('Failed to create account');
      } else if (result.status === 'invalid_data') {
        toast.error('Failed validating your submission!');
      } else if (result.status === 'success') {
        toast.success('Account created successfully');
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
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center sm:px-16">
          <Logo />
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold dark:text-zinc-50">Sign Up</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">
              Create an account with your email and password
            </p>
          </div>
        </div>
        <AuthForm onSubmit={handleSubmit} defaultEmail={email}>
          <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {'Already have an account? '}
            <Link
              href="/login"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign in
            </Link>
            {' instead.'}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
