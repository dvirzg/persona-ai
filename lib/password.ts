import { hash, compare } from 'bcrypt-ts';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  console.log('Verifying password');
  console.log('Hashed password from DB:', hashedPassword);
  const result = await compare(password, hashedPassword);
  console.log('Password verification result:', result);
  return result;
} 