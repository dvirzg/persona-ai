'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/lib/db';
import { user } from '@/lib/db/schema';
import { hashPassword, verifyPassword } from '@/lib/password';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type ActionState = {
  status: 'success' | 'failed' | 'invalid_data' | 'invalid_credentials' | 'user_exists';
};

export async function register(formData: FormData): Promise<ActionState> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = authSchema.safeParse(data);
  if (!result.success) {
    return { status: 'invalid_data' };
  }

  const { email, password } = result.data;

  const existingUser = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (existingUser) {
    return { status: 'user_exists' };
  }

  try {
    const hashedPassword = await hashPassword(password);

    await db.insert(user).values({
      email,
      password: hashedPassword,
    });

    cookies().set('user_email', email);
    redirect('/chat');
  } catch (error) {
    return { status: 'failed' };
  }

  return { status: 'success' };
}

export async function login(formData: FormData): Promise<ActionState> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = authSchema.safeParse(data);
  if (!result.success) {
    return { status: 'invalid_data' };
  }

  const { email, password } = result.data;

  const existingUser = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (!existingUser) {
    return { status: 'invalid_credentials' };
  }

  const isValidPassword = await verifyPassword(password, existingUser.password);
  if (!isValidPassword) {
    return { status: 'invalid_credentials' };
  }

  try {
    cookies().set('user_email', email);
    redirect('/chat');
  } catch (error) {
    return { status: 'failed' };
  }

  return { status: 'success' };
}
