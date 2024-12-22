import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

const jetBrainsMonoFont = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'WebSQL',
  description: 'A web based SQL client'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${interFont.className} ${jetBrainsMonoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
