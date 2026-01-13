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
  description: 'Create beautifully illustrated, personalized storybooks starring your child. Human-written stories with AI-generated illustrations that bring imagination to life.',
  keywords: ['personalized stories', 'children books', 'AI illustration', 'custom storybooks', 'personalized children books', 'kids stories', 'bedtime stories'],
  authors: [{ name: 'Tales of You' }],
  creator: 'Tales of You',
  publisher: 'Tales of You',
  metadataBase: new URL('https://waitlist.thetalesofyou.com'),
  openGraph: {
    title: 'Tales of You — Create Magical Stories With Your Children',
    description: 'Create beautifully illustrated, personalized storybooks starring your child. Human-written stories with AI-generated illustrations.',
    url: 'https://waitlist.thetalesofyou.com',
    siteName: 'Tales of You',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tales of You - Personalized Children\'s Stories',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tales of You — Create Magical Stories With Your Children',
    description: 'Create beautifully illustrated, personalized storybooks starring your child.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// JSON-LD Structured Data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tales of You',
  url: 'https://waitlist.thetalesofyou.com',
  logo: 'https://waitlist.thetalesofyou.com/og-image.png',
  description: 'Create beautifully illustrated, personalized storybooks starring your child.',
  sameAs: [],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Tales of You — Create Magical Stories With Your Children',
  description: 'Create beautifully illustrated, personalized storybooks starring your child. Human-written stories with AI-generated illustrations.',
  url: 'https://waitlist.thetalesofyou.com',
  publisher: {
    '@type': 'Organization',
    name: 'Tales of You',
  },
  mainEntity: {
    '@type': 'Product',
    name: 'Tales of You - Personalized Storybooks',
    description: 'Human-written, AI-illustrated personalized children\'s storybooks',
    brand: {
      '@type': 'Brand',
      name: 'Tales of You',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
      </head>
      <body className={`${quicksand.variable} ${rumRaisin.variable}`}>{children}</body>
    </html>
  )
}

