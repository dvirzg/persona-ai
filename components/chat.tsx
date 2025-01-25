'use client';

import type { Attachment, Message, ChatRequestOptions } from 'ai';
import { useChat } from 'ai/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { ChatHeader } from '@/components/chat-header';
import type { Vote } from '@/lib/db/types';
import { fetcher, generateUUID } from '@/lib/utils';

import { Block } from './block';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { VisibilityType } from './visibility-selector';
import { useBlockSelector } from '@/hooks/use-block';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: Date;
}

interface ChatProps {
  id: string;
  initialMessages: ChatMessage[];
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}

export function Chat({
  id,
  initialMessages,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
}: ChatProps) {
  const { mutate } = useSWRConfig();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { data: votes } = useSWR<Array<Vote>>(
    messages.length > 0 && !isLoading ? `/chat/api/vote?chatId=${id}` : null,
    fetcher,
  );

  const isBlockVisible = useBlockSelector((state) => state.isVisible);

  const handleSubmit = useCallback(async (event?: { preventDefault?: () => void }) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    
    if (!input.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const userMessage: ChatMessage = {
        id: generateUUID(),
        role: 'user',
        content: input,
        createdAt: new Date(),
      };

      // Add user message immediately
      setMessages(messages => [...messages, userMessage]);
      setInput('');

      // Start streaming the response
      const response = await fetch('/chat/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          messages: [...messages, userMessage],
          modelId: selectedModelId,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to send message');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage: Partial<ChatMessage> = {};

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data: ')) continue;

          try {
            const data = JSON.parse(line.slice(5));

            if (data.type === 'assistant-message-id') {
              assistantMessage = {
                id: data.content,
                role: 'assistant',
                content: '',
                createdAt: new Date(),
              };
              setMessages(messages => [...messages, assistantMessage as ChatMessage]);
            } else if (data.type === 'text') {
              assistantMessage.content = (assistantMessage.content || '') + data.content;
              setMessages(messages => 
                messages.map(msg => 
                  msg.id === assistantMessage.id 
                    ? { ...msg, content: assistantMessage.content || '' }
                    : msg
                )
              );
            } else if (data.type === 'error') {
              throw new Error(data.content);
            }
          } catch (e) {
            console.error('Error parsing SSE message:', e);
          }
        }
      }

      // Update chat history after completion
      mutate('/chat/api/history');
    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id, input, messages, selectedModelId, mutate]);

  const reload = useCallback(async () => {
    // Implement if needed
    return null;
  }, []);

  const append = useCallback(async (message: ChatMessage) => {
    setMessages(messages => [...messages, message]);
    return message.id;
  }, []);

  return (
    <>
      <div className="flex flex-col h-full">
        <ChatHeader
          chatId={id}
          selectedModelId={selectedModelId}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <div className="flex-1 overflow-hidden">
          <Messages
            chatId={id}
            isLoading={isLoading}
            votes={votes}
            messages={messages}
            setMessages={setMessages}
            reload={reload}
            isReadonly={isReadonly}
            isBlockVisible={isBlockVisible}
            append={append}
          />
        </div>

        <div className="flex-shrink-0 bg-background">
          <form 
            className="flex mx-auto px-4 py-3 gap-2 w-full md:max-w-3xl"
            onSubmit={handleSubmit}
          >
            {!isReadonly && (
              <MultimodalInput
                chatId={id}
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                stop={() => {}} // Implement if needed
                attachments={[]}
                setAttachments={() => {}} // Implement if needed
                messages={messages}
                setMessages={setMessages}
                append={append}
              />
            )}
          </form>
        </div>
      </div>

      <Block
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={() => {}} // Implement if needed
        attachments={[]}
        setAttachments={() => {}} // Implement if needed
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  );
}
