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

export async function createPasswordResetToken({ userId, token }: { userId: string; token: string }) {
  try {
    const { rows } = await sql`
      INSERT INTO password_reset_tokens (user_id, token)
      VALUES (${userId}, ${token})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Failed to create password reset token', error);
    throw error;
  }
}

export async function getPasswordResetToken(token: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM password_reset_tokens
      WHERE token = ${token}
    `;
    return rows[0];
  } catch (error) {
    console.error('Failed to get password reset token', error);
    throw error;
  }
}

export async function deletePasswordResetToken(token: string) {
  try {
    await sql`
      DELETE FROM password_reset_tokens
      WHERE token = ${token}
    `;
  } catch (error) {
    console.error('Failed to delete password reset token', error);
    throw error;
  }
}

export async function getMessageById(id: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM messages
      WHERE id = ${id}
      LIMIT 1
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Failed to get message by id', error);
    throw error;
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({ chatId, timestamp }: { chatId: string; timestamp: Date }) {
  try {
    await sql`
      DELETE FROM messages
      WHERE chat_id = ${chatId}
      AND created_at > ${timestamp.toISOString()}
    `;
  } catch (error) {
    console.error('Failed to delete messages', error);
    throw error;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const { rows } = await sql`
      SELECT * FROM documents
      WHERE id = ${id}
    `;
    return rows;
  } catch (error) {
    console.error('Failed to get documents by id', error);
    throw error;
  }
}

export async function saveDocument({ userId, title, content, kind = 'text', id }: { userId: string; title: string; content: string; kind?: string; id?: string }) {
  try {
    if (id) {
      const { rows } = await sql`
        UPDATE documents 
        SET title = ${title}, content = ${content}, kind = ${kind}
        WHERE id = ${id} AND user_id = ${userId}
        RETURNING *
      `;
      return rows[0];
    }

    const { rows } = await sql`
      INSERT INTO documents (user_id, title, content, kind)
      VALUES (${userId}, ${title}, ${content}, ${kind})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Failed to save document', error);
    throw error;
  }
}

export async function deleteDocumentsByIdAfterTimestamp({ id, timestamp }: { id: string; timestamp: Date }) {
  try {
    await sql`
      DELETE FROM documents
      WHERE id = ${id}
      AND created_at > ${timestamp.toISOString()}
    `;
  } catch (error) {
    console.error('Failed to delete documents', error);
    throw error;
  }
}

export async function getSuggestionsByDocumentId({ documentId }: { documentId: string }) {
  try {
    const { rows } = await sql`
      SELECT * FROM suggestions
      WHERE document_id = ${documentId}
      ORDER BY created_at DESC
    `;
    return rows;
  } catch (error) {
    console.error('Failed to get suggestions by document id', error);
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
