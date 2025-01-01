'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';
import { SidebarUserNav } from '@/components/sidebar-user-nav';
import { useChat } from 'ai/react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Logo } from './logo';

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
  const { setMessages } = useChat({ id: 'nav' });
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = Cookies.get('user_email');
    setUserEmail(email || null);
  }, []);

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
      <div className="flex items-center gap-8">
        <Logo />
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
      </div>
      <div className="flex items-center">
        {userEmail && (
          <SidebarUserNav user={{ email: userEmail }} />
        )}
      </div>
    </div>
  );
} 