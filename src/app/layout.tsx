import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BankDemo - Demobanken',
  description: 'Demo bankapplikation för tillgänglighetsutbildning',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans text-navy-900 antialiased">
        {children}
      </body>
    </html>
  );
}
