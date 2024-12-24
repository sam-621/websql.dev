import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Notification } from '@/lib/notification/notification';

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
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Notification />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
