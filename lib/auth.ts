import crypto from 'crypto';

// Function to generate a password reset token
export function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
} 