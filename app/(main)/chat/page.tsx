'use client';

import { Metadata } from 'next';
import { Chat } from '@/components/chat';
import { generateUUID } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Persona - Personalized AI',
  description: 'Chat with Personalized AI',
};

export default function ChatPage() {
  return (
    <div className="h-full flex flex-col">
      <Chat 
        id={generateUUID()}
        initialMessages={[]}
        selectedModelId="default"
        selectedVisibilityType="private"
        isReadonly={false}
      />
    </div>
  );
} 