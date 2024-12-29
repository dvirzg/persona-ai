'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { useSession } from 'next-auth/react';
import { useChat } from 'ai/react';
import { useEffect } from 'react';

const mainNavItems = [
  {
    title: 'Chats',
    href: '/chat',
  },
  {
    title: 'Personal Context',
    href: '/context',
  },
  {
    title: 'Explore',
    href: '/explore',
  },
];

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { open } = useSidebar();
  const { data: session } = useSession();
  const { setMessages } = useChat({ id: 'nav' });

  const handleNavigation = (href: string) => {
    if (href === '/chat') {
      setMessages([]);
    }
    router.push(href);
    router.refresh();
  };

  return (
    <div 
      className="flex items-center justify-between h-16 px-6"
      data-sidebar-closed={!open}
    >
      <nav className="flex items-center">
        {mainNavItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary mr-6',
              pathname.startsWith(item.href)
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            {item.title}
          </button>
        ))}
      </nav>
      <div className="flex items-center">
        {session?.user && <SidebarUserNav user={session.user} />}
      </div>
    </div>
  );
} 