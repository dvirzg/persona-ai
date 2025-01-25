import type { Message } from 'ai';

export type ChatMessage = Message & {
  id: string;
  createdAt?: Date;
}; 