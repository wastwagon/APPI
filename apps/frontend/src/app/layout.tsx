import type { Metadata } from 'next'
import { IBM_Plex_Sans, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const appiSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-appi-sans',
  display: 'swap',
})

const appiSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-appi-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'APPI — African Political Parties Initiative',
  description:
    "Reshaping Africa's political parties for democratic and economic transformation — continental platform for party reform, inclusive leadership, and governance.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={`${appiSans.variable} ${appiSerif.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  )
}
