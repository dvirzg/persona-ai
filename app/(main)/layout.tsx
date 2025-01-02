import type { Metadata } from 'next';
import { MainNav } from '@/components/main-nav';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Persona - Personalized AI',
  description: 'Chat with your personal AI companion',
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <div className="min-h-screen">
        <header className="fixed top-0 inset-x-0 z-50 h-16">
          <MainNav />
        </header>
        <div className="pt-16">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
} 