'use client';

import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/components/icons';
import { SidebarHistory } from '@/components/sidebar-history';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useChat } from 'ai/react';
import { cn } from '@/lib/utils';

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const { setMessages } = useChat({ id: 'sidebar' });

  const handleChatbotClick = () => {
    setOpenMobile(false);
    setMessages([]);
    router.push('/chat');
    router.refresh();
  };

  return (
    <Sidebar className={cn(
      "group-data-[side=left]:border-r mt-16 flex flex-col h-[calc(100vh-4rem)]",
      "bg-zinc-50 dark:bg-zinc-900 w-[260px] data-[state=collapsed]:w-[60px] transition-all duration-300",
      "data-[mobile=true]:mt-0 data-[mobile=true]:h-screen data-[mobile=true]:w-full data-[mobile=true]:pt-16"
    )}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <button
              onClick={handleChatbotClick}
              className="flex flex-row gap-3 items-center"
            >
              <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                Persona Chats
              </span>
            </button>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className={cn(
                    "p-2 h-fit",
                    "hidden md:flex"
                  )}
                  onClick={() => {
                    setOpenMobile(false);
                    setMessages([]);
                    router.push('/');
                    router.refresh();
                  }}
                >
                  <PlusIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end">New Chat</TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-auto">
        <SidebarHistory user={user} />
      </SidebarContent>
    </Sidebar>
  );
}
