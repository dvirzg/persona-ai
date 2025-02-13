import { Dispatch, SetStateAction, useRef, memo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { User, ThumbsUp, ThumbsDown, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Message } from 'ai';
import type { Vote } from '@/lib/db/types';
import type { Components } from 'react-markdown';

interface MessagesProps {
  chatId: string;
  isLoading: boolean;
  votes: Vote[] | undefined;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  reload: () => Promise<string | null>;
  isReadonly: boolean;
  isBlockVisible: boolean;
  append: (message: Message) => Promise<string>;
}

function MessagesComponent({
  chatId,
  isLoading,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
  isBlockVisible,
  append
}: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const hasVoted = (messageId: string, type: 'up' | 'down'): boolean => {
    if (!votes) return false;
    const value = type === 'up' ? 1 : -1;
    return votes.some(v => v.messageId === messageId && v.value === value);
  };

  const handleVote = async (messageId: string, type: 'up' | 'down') => {
    try {
      const response = await fetch('/chat/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          messageId,
          value: type === 'up' ? 1 : -1,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to vote');
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const markdownComponents: Components = {
    pre(props) {
      return (
        <div className="relative my-3 first:mt-0 last:mb-0">
          <pre className="overflow-x-auto rounded-lg bg-black/30 p-4 text-[13px] leading-relaxed text-white scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {props.children}
          </pre>
        </div>
      );
    },
    code(props) {
      const isInline = !props.className?.includes('language-');
      return isInline ? (
        <code className="rounded-md bg-black/30 px-1.5 py-0.5 text-[13px] font-medium text-white">
          {props.children}
        </code>
      ) : (
        <code className={cn('block', props.className)}>
          {props.children}
        </code>
      );
    },
    p(props) {
      return (
        <p className="mb-3 last:mb-0">
          {props.children}
        </p>
      );
    },
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-end py-4">
      <div className="space-y-4">
        {messages.map((message, i) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={cn(
              'group relative flex items-start gap-3',
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {/* Avatar */}
            <div className={cn(
              'flex-none w-8 h-8 rounded-full overflow-hidden border',
              message.role === 'user' 
                ? 'bg-blue-500/10 border-blue-500/20' 
                : 'bg-purple-500/10 border-purple-500/20'
            )}>
              {message.role === 'user' ? (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
              )}
            </div>

            {/* Message Content */}
            <div className={cn(
              'flex-1 space-y-2 overflow-hidden',
              message.role === 'user' ? 'items-end' : 'items-start'
            )}>
              {/* Message Bubble */}
              <div className={cn(
                'relative rounded-2xl px-4 py-3 text-sm leading-relaxed break-words max-w-[85%]',
                message.role === 'user' 
                  ? 'bg-blue-500/10 border border-blue-500/20 text-white ml-12' 
                  : 'bg-white/[0.03] border border-white/[0.08] text-gray-300 mr-12'
              )}>
                <ReactMarkdown components={markdownComponents}>
                  {message.content}
                </ReactMarkdown>
              </div>

              {/* Message Actions */}
              {!isReadonly && message.role === 'assistant' && (
                <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 touch-none">
                  <button
                    onClick={() => handleVote(message.id, 'up')}
                    className={cn(
                      'rounded-lg p-2.5 text-xs transition-colors active:scale-95',
                      hasVoted(message.id, 'up')
                        ? 'bg-green-500/20 text-green-400'
                        : 'hover:bg-white/[0.03] text-gray-400 hover:text-white active:bg-white/[0.06]'
                    )}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleVote(message.id, 'down')}
                    className={cn(
                      'rounded-lg p-2.5 text-xs transition-colors active:scale-95',
                      hasVoted(message.id, 'down')
                        ? 'bg-red-500/20 text-red-400'
                        : 'hover:bg-white/[0.03] text-gray-400 hover:text-white active:bg-white/[0.06]'
                    )}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex-none w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl px-4 py-3 text-sm text-gray-400 mr-12 max-w-[85%]">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export const Messages = memo(MessagesComponent);
