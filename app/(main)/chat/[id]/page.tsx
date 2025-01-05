'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Chat } from '@/components/chat';
import { DEFAULT_MODEL_NAME } from '@/lib/ai/models';
import { convertToUIMessages } from '@/lib/utils';
import type { Message } from 'ai';

export default function Page(props: { params: { id: string } }) {
  const { id } = props.params;
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await fetch(`/api/chat/messages?chatId=${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            // For new chats, start with empty messages instead of throwing 404
            setInitialMessages([]);
            return;
          }
          throw new Error('Failed to fetch messages');
        }
        const messages = await response.json();
        setInitialMessages(messages.length > 0 ? convertToUIMessages(messages) : []);
      } catch (error: any) {
        console.error('Failed to fetch messages:', error);
        // Only throw notFound for non-404 errors
        if (error?.message !== 'Failed to fetch messages') {
          notFound();
        }
      }
    };

    initializeChat();
  }, [id]);

  return (
    <Chat
      id={id}
      initialMessages={initialMessages}
      selectedModelId={DEFAULT_MODEL_NAME}
      selectedVisibilityType="private"
      isReadonly={false}
    />
  );
} 