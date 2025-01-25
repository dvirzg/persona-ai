'use server';

import { type CoreUserMessage } from 'ai';
import { cookies } from 'next/headers';
import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
} from '@/lib/db/queries';
import { VisibilityType } from '@/components/visibility-selector';

// Get the message processing service URL from environment variable
const MESSAGE_PROCESSOR_URL = process.env.MESSAGE_PROCESSOR_URL || 'http://localhost:8000';

export async function saveModelId(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('model-id', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: CoreUserMessage;
}) {
  const response = await fetch(`${MESSAGE_PROCESSOR_URL}/generate-title`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message.content,
    }),
  });

  if (!response.ok) {
    return 'New Chat';
  }

  const result = await response.json();
  return result.title;
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const message = await getMessageById(id);
  if (!message) {
    throw new Error('Message not found');
  }

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({ chatId, visibility }: { chatId: string; visibility: VisibilityType }) {
  await updateChatVisiblityById({ chatId, visibility });
}
