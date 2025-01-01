'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        toast.success('Password reset instructions sent to your email');
      } else {
        if (response.status === 404) {
          toast.error('No account found with this email address');
        } else {
          toast.error(`Failed to send reset instructions: ${data.error || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Forgot Password</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Enter your email address and we&apos;ll send you instructions to reset your password
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 sm:px-16">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-gray-300 px-4 py-2 focus:border-black focus:outline-none focus:ring-black dark:border-gray-600 dark:bg-black dark:text-white dark:focus:border-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
          <Link
            href="/login"
            className="text-center text-sm text-gray-600 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
} 