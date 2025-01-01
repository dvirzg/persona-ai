import { NextResponse } from 'next/server';
import { getPasswordResetToken, updateUserPassword, deletePasswordResetToken } from '@/lib/db/queries';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    const resetToken = await getPasswordResetToken(token);
    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    if (new Date() > resetToken.expiresAt) {
      await deletePasswordResetToken(token);
      return NextResponse.json(
        { error: 'Token has expired' },
        { status: 400 }
      );
    }

    await updateUserPassword(resetToken.userId, password);
    await deletePasswordResetToken(token);

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
} 