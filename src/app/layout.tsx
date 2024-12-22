import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const interFont = Inter({
  variable: '--font-inter',
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
      <body className={`${interFont.variable} ${interFont.variable} antialiased bg-[#09090B]`}>
        {children}
      </body>
    </html>
  );
}
