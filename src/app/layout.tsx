import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Notification } from '@/lib/notification/notification';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ConnectionsListHeader } from '@/components/connection/connection-list/connections-list-header';
import { ConnectionsList } from '@/components/connection/connection-list/connections-list';
import { Nav } from '@/components/nav';
import { QueryClientProvider } from './query-client';

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

const jetBrainsMonoFont = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://websql.dev'),
  title: 'WebSQL',
  description: 'A web based SQL client',
  openGraph: {
    images: ['/websql.png']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interFont.variable} ${interFont.className} ${jetBrainsMonoFont.variable} antialiased`}
      >
        <QueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
            <Notification />
            <NextTopLoader color="hsl(var(--primary))" />

            <div className="grid grid-cols-[auto,1fr] h-screen overflow-hidden">
              <Nav />
              <main className="w-full md:max-w-[calc(100vw-73px)]">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={25} className="divide-y bg-muted" minSize={20}>
                    <ConnectionsListHeader />
                    <ConnectionsList />
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={75} className="h-full">
                    {children}
                  </ResizablePanel>
                </ResizablePanelGroup>
              </main>
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
