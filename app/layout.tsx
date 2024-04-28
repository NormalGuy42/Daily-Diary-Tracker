import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Diary Tracker',
  description: 'Generated by create next app',
  icons: {
    icon: "logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <link rel="icon" href="logo.png" sizes="any" />
        <body className={inter.className + " min-h-screen"}>
          {children}
        </body>  
    </html>
  )
}
