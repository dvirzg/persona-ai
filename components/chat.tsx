'use client';

import type { Attachment, Message, ChatRequestOptions, CreateMessage } from 'ai';
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

interface ChatProps {
  id: string;
  initialMessages: Message[];
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  contextPrompt?: string;
}

export function Chat({
  id,
  initialMessages,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  contextPrompt
}: ChatProps) {
  const { mutate } = useSWRConfig();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
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
      const userMessage: Message = {
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
      let assistantMessage: Partial<Message> = {};

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
              setMessages(messages => [...messages, assistantMessage as Message]);
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

  const append = useCallback(async (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => {
    if (!message.id) {
      message = { ...message, id: generateUUID() };
    }
    setMessages(messages => [...messages, message as Message]);
    return message.id;
  }, []);

  return (
    <div className="flex h-[100dvh] bg-[#070B19] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#070B19]" />
        <div className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh" />
        <div className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] bg-[#050709] rounded-full blur-[100px] animate-swoosh-reverse" />
        <div className="absolute top-[-20%] right-[-20%] w-[90%] h-[90%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#1B3A77]/20 rounded-full blur-[120px] animate-wild" />
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light" />
      </div>

      {/* Main Chat Container */}
      <div className="flex flex-col flex-1 h-full relative">
        {/* Header Section */}
        <div className="flex-none border-b border-white/[0.08] bg-[#070B19]/80 backdrop-blur-xl safe-top">
          <ChatHeader
            chatId={id}
            selectedModelId={selectedModelId}
            selectedVisibilityType={selectedVisibilityType}
            isReadonly={isReadonly}
          />

          {contextPrompt && (
            <div className="px-4 py-4 border-t border-white/[0.08]">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-4 text-gray-300 text-sm leading-relaxed border border-white/[0.08] shadow-lg shadow-black/5">
                  {contextPrompt}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto min-h-0 px-4 overscroll-none">
          <div className="max-w-4xl mx-auto h-full flex flex-col justify-end">
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
        </div>

        {/* Input Section */}
        <div className="flex-none border-t border-white/[0.08] bg-[#070B19]/80 backdrop-blur-xl safe-bottom">
          <form 
            className="max-w-4xl mx-auto px-4 py-4"
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
                className="w-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-lg shadow-black/5 transition-all duration-200 focus-within:border-blue-500/30 focus-within:bg-white/[0.06] focus-within:shadow-blue-500/10"
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
    </div>
  );
}
