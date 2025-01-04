import { genSaltSync, hashSync } from 'bcrypt-ts';
import { sql } from '@vercel/postgres';

export async function getUser(email: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM users 
      WHERE email = ${email}
    `;
    return rows;
  } catch (error) {
    console.error('Failed to get user by email from database', error);
    throw error;
  }
}

export async function createUser({ email, password }: { email: string; password: string }) {
  try {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    const { rows } = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Failed to create user in database', error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM users 
      WHERE id = ${id}
    `;
    return rows[0];
  } catch (error) {
    console.error('Failed to get user by id from database', error);
    throw error;
  }
}

export async function updateUserPassword({ id, password }: { id: string; password: string }) {
  try {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Failed to update user password in database', error);
    throw error;
  }
}

// Re-export the chat-related functions from index.ts
export {
  getChatsByUserId,
  getChatById,
  saveChat,
  saveMessages,
  getMessagesByChatId,
  getVotesByChatId,
  voteMessage,
  deleteChatById,
  updateChatVisiblityById,
} from './index';
