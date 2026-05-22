import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import MobileNav from '@/components/layout/mobile-nav'

export const metadata: Metadata = {
  title: 'African Political Parties Initiative (APPI)',
  description: 'Reshaping Africa\'s Political Parties for Democratic and Economic Transformation',
  keywords: 'African Political Parties, Democratic Governance, Political Reform, Africa Governance Centre, APPI',
  authors: [{ name: 'African Political Parties Initiative' }],
  creator: 'African Political Parties Initiative',
  publisher: 'Africa Governance Centre',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/fav APPI.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'African Political Parties Initiative (APPI)',
    description: 'Reshaping Africa\'s Political Parties for Democratic and Economic Transformation',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'African Political Parties Initiative (APPI)',
    description: 'Reshaping Africa\'s Political Parties for Democratic and Economic Transformation',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fav APPI.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased lg:pb-0 pb-16">
        {children}
        <MobileNav />
      </body>
    </html>
  )
}
