import crypto from 'crypto';
import { createTransport } from 'nodemailer';

// Function to generate a password reset token
export function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Function to send a password reset email
export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = createTransport({
    service: 'Gmail', // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
  };

  await transporter.sendMail(mailOptions);
} 