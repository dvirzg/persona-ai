'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { getUser, createUser } from '@/lib/db/queries';
import { hashPassword, verifyPassword } from '@/lib/password';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type ActionState = {
  status: 'success' | 'failed' | 'invalid_data' | 'invalid_credentials' | 'user_exists';
};

export async function register(formData: FormData): Promise<ActionState> {
  try {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    console.log('Processing registration for email:', data.email);

    const result = authSchema.safeParse(data);
    if (!result.success) {
      console.error('Invalid data:', result.error);
      return { status: 'invalid_data' };
    }

    const { email, password } = result.data;

    // Check if user exists using the queries function
    console.log('Checking for existing user');
    const existingUsers = await getUser(email);
    if (existingUsers.length > 0) {
      console.log('User already exists');
      return { status: 'user_exists' };
    }

    // Create user using the queries function
    console.log('Attempting to create new user');
    await createUser(email, password);
    console.log('User created successfully');
    
    console.log('Setting cookie and redirecting');
    cookies().set('user_email', email);
    redirect('/chat');
  } catch (error) {
    // Only treat non-redirect errors as failures
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      return { status: 'success' };
    }
    
    console.error('Registration error. Full error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return { status: 'failed' };
  }
}

export async function login(formData: FormData): Promise<ActionState> {
  try {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    console.log('Login attempt for email:', data.email);

    const result = authSchema.safeParse(data);
    if (!result.success) {
      console.error('Invalid data:', result.error);
      return { status: 'invalid_data' };
    }

    const { email, password } = result.data;

    const users = await getUser(email);
    console.log('Found users:', users);

    if (users.length === 0) {
      console.log('No user found with email:', email);
      return { status: 'invalid_credentials' };
    }

    const user = users[0];
    if (!user.password) {
      console.log('User found but no password set');
      return { status: 'invalid_credentials' };
    }

    const isValidPassword = await verifyPassword(password, user.password);
    console.log('Password validation result:', isValidPassword);
    
    if (!isValidPassword) {
      return { status: 'invalid_credentials' };
    }

    // Set cookie with Path=/
    cookies().set('user_email', email, {
      path: '/',
      secure: true,
      sameSite: 'lax'
    });
    
    return { status: 'success' };
  } catch (error) {
    console.error('Login error:', error);
    return { status: 'failed' };
  }
}
