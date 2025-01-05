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
    // Check for stored messages
    const storedMessages = sessionStorage.getItem(`chat-${id}-messages`);
    if (storedMessages) {
      setInitialMessages(JSON.parse(storedMessages));
      sessionStorage.removeItem(`chat-${id}-messages`);
      return;
    }

    // If no stored messages, fetch from API
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/chat/messages?chatId=${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch messages');
        }
        const messages = await response.json();
        // Convert messages to UI format, handle empty array case
        setInitialMessages(messages.length > 0 ? convertToUIMessages(messages) : []);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        notFound();
      }
    };

    fetchMessages();
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
