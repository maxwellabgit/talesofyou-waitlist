import type { Metadata } from 'next'
import './globals.css'
import { Quicksand, Rum_Raisin } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700'],
})

const rumRaisin = Rum_Raisin({
  subsets: ['latin'],
  variable: '--font-rum-raisin',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Tales of You — Create Magical Stories With Your Children',
  description: 'Transform your ideas into beautifully illustrated, animated storybooks. Build characters, design pages, and bring stories to life with AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${rumRaisin.variable}`}>{children}</body>
    </html>
  )
}

