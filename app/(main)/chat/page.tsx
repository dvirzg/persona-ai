'use client';

import { Chat } from '@/components/chat';
import { generateUUID } from '@/lib/utils';

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
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