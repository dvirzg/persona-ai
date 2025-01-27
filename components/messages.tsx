import type { ChatRequestOptions, Message, CreateMessage } from 'ai';
import { PreviewMessage, ThinkingMessage } from './message';
import { useScrollToBottom } from './use-scroll-to-bottom';
import { Overview } from './overview';
import { memo, useRef, useEffect } from 'react';
import type { Vote } from '@/lib/db/types';
import { SuggestedActions } from './suggested-actions';
import { Button } from './ui/button';
import type { ChatMessage } from '@/lib/types';
import { convertToChatMessage, convertToMessage } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

interface MessagesProps {
  chatId: string;
  isLoading: boolean;
  votes: Array<Vote> | undefined;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  reload: (
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  isReadonly: boolean;
  isBlockVisible: boolean;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

function PureMessages({
  chatId,
  isLoading,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
  append,
}: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

  const handleSetMessages = (messages: Message[] | ((messages: Message[]) => Message[])) => {
    if (typeof messages === 'function') {
      setMessages((prevMessages) => 
        messages(prevMessages.map(convertToMessage))
          .map(convertToChatMessage)
      );
    } else {
      setMessages(messages.map(convertToChatMessage));
    }
  };

  const handleAppend = async (message: Message | CreateMessage, options?: ChatRequestOptions) => {
    return append(convertToChatMessage(message as Message), options);
  };

  return (
    <div
      ref={messagesContainerRef}
      className={`h-full w-full ${messages.length > 0 ? 'overflow-y-auto' : 'flex items-center'}`}
    >
      <div className={`w-full mx-auto md:max-w-3xl px-4 py-4 ${messages.length > 0 ? 'flex flex-col gap-4' : 'mt-24'}`}>
        {messages.length === 0 && !isReadonly && (
          <SuggestedActions chatId={chatId} append={handleAppend} />
        )}

        {messages.map((message, index) => (
          <PreviewMessage
            key={message.id}
            chatId={chatId}
            message={convertToMessage(message)}
            isLoading={isLoading && messages.length - 1 === index}
            vote={
              votes
                ? votes.find((vote) => vote.messageId === message.id)
                : undefined
            }
            setMessages={handleSetMessages}
            reload={reload}
            isReadonly={isReadonly}
          />
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === 'user' && <ThinkingMessage />}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.messages !== nextProps.messages) return false;
  if (prevProps.votes !== nextProps.votes) return false;
  if (prevProps.isBlockVisible !== nextProps.isBlockVisible) return false;
  return true;
});
