import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generateResetToken } from '@/lib/auth';
import { getUser, createPasswordResetToken } from '@/lib/db/queries';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new NextResponse(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { email } = await request.json();
    console.log('Received password reset request for email:', email);

    const users = await getUser(email);
    console.log('Found users:', users);
    
    if (users.length === 0) {
      console.log('No user found with email:', email);
      return new NextResponse(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const token = generateResetToken();
    console.log('Generated reset token');
    
    try {
      await createPasswordResetToken(users[0].id, token);
      console.log('Saved reset token to database');
    } catch (error) {
      console.error('Error saving reset token:', error);
      return new NextResponse(JSON.stringify({ error: 'Failed to save reset token' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    try {
      const emailResult = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset.</p>
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}">
            Reset Password
          </a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
        `,
      });
      console.log('Email sent successfully:', emailResult);
    } catch (error) {
      console.error('Error sending email:', error);
      return new NextResponse(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new NextResponse(JSON.stringify({ message: 'Password reset email sent' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return new NextResponse(JSON.stringify({ 
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 