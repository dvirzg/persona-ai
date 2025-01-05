export interface DbMessage {
  id: string;
  chatId: string;
  role: string;
  content: string;
  createdAt: Date;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  visibility: 'public' | 'private';
  createdAt: Date;
}

export interface Vote {
  chatId: string;
  messageId: string;
  isUpvoted: boolean;
}

export interface Attachment {
  url: string;
  name: string;
  contentType: string;
} 