import { VisibilityType } from '@/components/visibility-selector';

export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  visibility: VisibilityType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  chatId: string;
  content: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: string;
  messageId: string;
  userId: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  userId: string;
  title: string;
  content: string;
  kind: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Suggestion {
  id: string;
  documentId: string;
  content: string;
  originalText: string;
  suggestedText: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PasswordResetToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
} 