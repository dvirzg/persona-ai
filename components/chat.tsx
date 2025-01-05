'use client';

import type { Attachment, Message, ChatRequestOptions } from 'ai';
import { useChat } from 'ai/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { ChatHeader } from '@/components/chat-header';
import type { Vote } from '@/lib/db/types';
import { fetcher } from '@/lib/utils';

import { Block } from './block';
import { MultimodalInput } from './multimodal-input';
import { Messages } from './messages';
import { VisibilityType } from './visibility-selector';
import { useBlockSelector } from '@/hooks/use-block';

export function Chat({
  id,
  initialMessages,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { mutate } = useSWRConfig();
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleSubmit: originalHandleSubmit,
    append,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    api: '/chat/api/chat',
    body: { id, modelId: selectedModelId },
    initialMessages,
    onFinish: () => {
      mutate('/chat/api/history');
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    messages.length > 0 && !isLoading ? `/chat/api/vote?chatId=${id}` : null,
    fetcher,
  );

  const isBlockVisible = useBlockSelector((state) => state.isVisible);

  // Wrap handleSubmit to handle the event properly
  const handleSubmit = (
    event?: { preventDefault?: () => void },
    chatRequestOptions?: ChatRequestOptions,
  ) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }
    
    if (!input.trim()) {
      return;
    }

    append({
      role: 'user',
      content: input,
    }, chatRequestOptions);

    setInput('');
  };

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          chatId={id}
          selectedModelId={selectedModelId}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
        />

        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto">
            <Messages
              chatId={id}
              isLoading={isLoading}
              votes={votes}
              messages={messages}
              setMessages={setMessages as any}
              reload={reload}
              isReadonly={isReadonly}
              isBlockVisible={isBlockVisible}
              append={append}
            />
          </div>

          <div className="flex-shrink-0 w-full bg-background">
            <form 
              className="flex mx-auto px-4 pb-4 md:pb-6 gap-2 w-full md:max-w-3xl"
              onSubmit={(e) => handleSubmit(e)}
            >
              {!isReadonly && (
                <MultimodalInput
                  chatId={id}
                  input={input}
                  setInput={setInput}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                  stop={stop}
                  attachments={attachments}
                  setAttachments={setAttachments}
                  messages={messages}
                  setMessages={setMessages as any}
                  append={append}
                />
              )}
            </form>
          </div>
        </div>
      </div>

      <Block
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages as any}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  );
}
