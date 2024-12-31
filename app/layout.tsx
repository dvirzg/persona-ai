import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from '@/components/providers';

// Import styles
import './tailwind.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://chat.vercel.ai'),
  title: 'Next.js Chatbot Template',
  description: 'Next.js chatbot template using the AI SDK.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark"
    >
      <body className="min-h-screen bg-zinc-950 font-sans antialiased">
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col bg-zinc-950">
              <Toaster position="top-center" />
              {children}
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
