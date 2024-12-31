import { NextApiRequest, NextApiResponse } from 'next';
import { sendPasswordResetEmail, generateResetToken } from '@/lib/auth';
import { getUser, updateUserPassword } from '@/lib/db/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const user = await getUser(email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const token = generateResetToken();
  await sendPasswordResetEmail(email, token);

  // Save the token to the database or cache with an expiration time
  // await saveResetToken(user.id, token);

  res.status(200).json({ message: 'Password reset email sent' });
} 