import { sql } from '@vercel/postgres';
import type { Chat, DbMessage, Vote } from './types';

export async function getChatsByUserId(userId: string): Promise<Chat[]> {
  try {
    const { rows } = await sql<Chat>`
      SELECT * FROM chats 
      WHERE "userId" = ${userId}
      ORDER BY "createdAt" DESC
    `;
    return rows;
  } catch (error) {
    console.error('Failed to get chats by user from database', error);
    throw error;
  }
}

export async function getChatById(id: string): Promise<Chat | null> {
  try {
    const { rows } = await sql<Chat>`
      SELECT * FROM chats 
      WHERE id = ${id}
    `;
    return rows[0] || null;
  } catch (error) {
    console.error('Failed to get chat by id from database', error);
    throw error;
  }
}

export async function saveChat({ id, userId, title }: { id: string; userId: string; title: string }): Promise<void> {
  try {
    await sql`
      INSERT INTO chats (id, "userId", title, "createdAt")
      VALUES (${id}, ${userId}, ${title}, NOW())
    `;
  } catch (error) {
    console.error('Failed to save chat to database', error);
    throw error;
  }
}

export async function saveMessages({ messages }: { messages: Array<{ id: string; chatId: string; role: string; content: any; createdAt: Date }> }): Promise<void> {
  try {
    for (const message of messages) {
      const jsonContent = typeof message.content === 'string' ? JSON.stringify({ text: message.content }) : JSON.stringify(message.content);
      await sql`
        INSERT INTO messages (id, "chatId", role, content, "createdAt")
        VALUES (${message.id}, ${message.chatId}, ${message.role}, ${jsonContent}::jsonb, ${message.createdAt.toISOString()})
      `;
    }
  } catch (error) {
    console.error('Failed to save messages to database', error);
    throw error;
  }
}

export async function getMessagesByChatId(id: string): Promise<DbMessage[]> {
  try {
    const { rows } = await sql<DbMessage>`
      SELECT * FROM messages 
      WHERE "chatId" = ${id}
      ORDER BY "createdAt" ASC
    `;
    return rows;
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
    throw error;
  }
}

export async function getVotesByChatId(chatId: string): Promise<Vote[]> {
  try {
    const { rows } = await sql<Vote>`
      SELECT * FROM votes 
      WHERE "chatId" = ${chatId}
    `;
    return rows;
  } catch (error) {
    console.error('Failed to get votes by chat id from database', error);
    throw error;
  }
}

export async function voteMessage({ chatId, messageId, type }: { chatId: string; messageId: string; type: 'up' | 'down' }): Promise<Vote> {
  try {
    const isUpvoted = type === 'up';
    const { rows } = await sql<Vote>`
      INSERT INTO votes ("chatId", "messageId", "isUpvoted")
      VALUES (${chatId}, ${messageId}, ${isUpvoted})
      ON CONFLICT ("chatId", "messageId") 
      DO UPDATE SET "isUpvoted" = ${isUpvoted}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Failed to vote message in database', error);
    throw error;
  }
}

export async function deleteMessagesByChatId(chatId: string): Promise<void> {
  try {
    await sql`
      DELETE FROM messages 
      WHERE "chatId" = ${chatId}
    `;
  } catch (error) {
    console.error('Failed to delete messages from database', error);
    throw error;
  }
}

export async function deleteChatById(id: string): Promise<void> {
  try {
    // First delete all messages associated with the chat
    await deleteMessagesByChatId(id);
    // Then delete the chat itself
    await sql`
      DELETE FROM chats 
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Failed to delete chat from database', error);
    throw error;
  }
}

export async function updateChatVisiblityById({ chatId, visibility }: { chatId: string; visibility: string }): Promise<void> {
  try {
    await sql`
      UPDATE chats 
      SET visibility = ${visibility}
      WHERE id = ${chatId}
    `;
  } catch (error) {
    console.error('Failed to update chat visibility in database', error);
    throw error;
  }
} 