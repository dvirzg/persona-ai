'use client';

import { Chat } from '@/components/chat';
import { generateUUID } from '@/lib/utils';

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