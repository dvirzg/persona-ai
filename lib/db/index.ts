import { sql } from '@vercel/postgres';
import type { Chat, Message, Vote } from './types';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
  let lastError;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < MAX_RETRIES - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (i + 1)));
      }
    }
  }
  throw lastError;
}

export async function getChatsByUserId(userId: string): Promise<Chat[]> {
  return withRetry(async () => {
    const { rows } = await sql<Chat>`
      SELECT * FROM chats 
      WHERE "userId" = ${userId}
      ORDER BY "createdAt" DESC
    `;
    return rows;
  });
}

export async function getChatById(id: string): Promise<Chat | null> {
  return withRetry(async () => {
    const { rows } = await sql<Chat>`
      SELECT * FROM chats 
      WHERE id = ${id}
    `;
    return rows[0] || null;
  });
}

export async function saveChat({ id, userId, title }: { id: string; userId: string; title: string }): Promise<void> {
  return withRetry(async () => {
    await sql`
      INSERT INTO chats (id, "userId", title, "createdAt")
      VALUES (${id}, ${userId}, ${title}, NOW())
    `;
  });
}

export async function saveMessages({ messages }: { messages: Array<{ id: string; chatId: string; role: string; content: any; createdAt: Date }> }): Promise<void> {
  return withRetry(async () => {
    for (const message of messages) {
      let messageContent;
      
      // Skip system messages
      if (message.role === 'system') {
        continue;
      }

      // Convert content to proper JSON format
      if (typeof message.content === 'string') {
        messageContent = JSON.stringify({ text: message.content });
      } else if (message.role === 'assistant') {
        if (typeof message.content === 'object' && message.content) {
          if ('text' in message.content) {
            messageContent = JSON.stringify(message.content);
          } else if ('content' in message.content) {
            messageContent = JSON.stringify({ text: message.content.content });
          } else if (Array.isArray(message.content)) {
            const text = message.content.map(item => 
              typeof item === 'string' ? item : item.text || item.content || JSON.stringify(item)
            ).join('\n');
            messageContent = JSON.stringify({ text });
          } else {
            messageContent = JSON.stringify(message.content);
          }
        } else {
          messageContent = JSON.stringify({ text: String(message.content) });
        }
      } else {
        messageContent = JSON.stringify(
          typeof message.content === 'object' ? 
            message.content : 
            { text: String(message.content) }
        );
      }

      await sql`
        INSERT INTO messages (id, "chatId", role, content, "createdAt")
        VALUES (${message.id}, ${message.chatId}, ${message.role}, ${messageContent}::jsonb, ${message.createdAt.toISOString()})
      `;
    }
  });
}

export async function getMessagesByChatId(id: string): Promise<Message[]> {
  return withRetry(async () => {
    const { rows } = await sql<Message>`
      SELECT 
        id,
        "chatId",
        role,
        content::text as content,
        "createdAt"
      FROM messages 
      WHERE "chatId" = ${id}
      ORDER BY "createdAt" ASC
    `;
    
    // Parse JSON content
    return rows.map(message => ({
      ...message,
      content: JSON.parse(message.content)
    }));
  });
}

export async function getVotesByChatId(chatId: string): Promise<Vote[]> {
  return withRetry(async () => {
    const { rows } = await sql<Vote>`
      SELECT * FROM votes 
      WHERE "chatId" = ${chatId}
    `;
    return rows;
  });
}

export async function voteMessage({ chatId, messageId, type }: { chatId: string; messageId: string; type: 'up' | 'down' }): Promise<Vote> {
  return withRetry(async () => {
    const isUpvoted = type === 'up';
    const { rows } = await sql<Vote>`
      INSERT INTO votes ("chatId", "messageId", "isUpvoted")
      VALUES (${chatId}, ${messageId}, ${isUpvoted})
      ON CONFLICT ("chatId", "messageId") 
      DO UPDATE SET "isUpvoted" = ${isUpvoted}
      RETURNING *
    `;
    return rows[0];
  });
}

export async function deleteChatById(id: string): Promise<void> {
  return withRetry(async () => {
    const client = await sql.connect();
    
    try {
      // Start transaction
      await client.sql`BEGIN`;

      // First check if chat exists and get its ID
      const chatResult = await client.sql`
        SELECT id FROM chats 
        WHERE id = ${id}
      `;

      if (chatResult.rows.length === 0) {
        await client.sql`ROLLBACK`;
        throw new Error('Chat not found');
      }

      // Delete votes first
      await client.sql`
        DELETE FROM votes 
        WHERE "chatId" = ${id}
      `;

      // Then delete messages
      await client.sql`
        DELETE FROM messages 
        WHERE "chatId" = ${id}
      `;

      // Finally delete the chat
      await client.sql`
        DELETE FROM chats 
        WHERE id = ${id}
      `;

      // Commit transaction
      await client.sql`COMMIT`;
    } catch (error) {
      // Rollback on any error
      await client.sql`ROLLBACK`;
      console.error('Failed to delete chat:', error);
      throw error;
    } finally {
      // Release the client back to the pool
      client.release();
    }
  });
}

export async function updateChatVisiblityById({ chatId, visibility }: { chatId: string; visibility: string }): Promise<void> {
  return withRetry(async () => {
    await sql`
      UPDATE chats 
      SET visibility = ${visibility}
      WHERE id = ${chatId}
    `;
  });
} 