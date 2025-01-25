'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Message } from 'ai';

import { Chat } from '@/components/chat';
import { LoadingIndicator } from '@/components/loading-indicator';
import { DEFAULT_MODEL_NAME } from '@/lib/ai/models';
import { convertToUIMessages } from '@/lib/utils';

export default function Page(props: { params: { id: string } }) {
  const { id } = props.params;
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const initializeChat = async () => {
      try {
        setIsLoading(true);
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
        const uiMessages = messages.length > 0 ? convertToUIMessages(messages) : [];
        setInitialMessages(uiMessages);
      } catch (error: any) {
        console.error('Failed to fetch messages:', error);
        // Only throw notFound for non-404 errors
        if (error?.message !== 'Failed to fetch messages') {
          notFound();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [id]);

  if (isLoading) {
    return <LoadingIndicator className="h-[calc(100vh-4rem)]" />;
  }

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