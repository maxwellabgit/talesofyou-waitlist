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
  title: "Children's Book Story Generator | The Tales of You - Personalized Storybooks",
  description: "The Tales of You is a children's book story generator that creates personalized storybooks where your child becomes the hero. Each children's book is uniquely crafted with AI-generated illustrations made just for them.",
  keywords: [
    "children's book story generator",
    "personalized children's book",
    "story generator for kids",
    "personalized children's storybooks",
    "AI children's books",
    "custom kids storybooks",
    "children's storybook with your child as the hero",
    "AI-generated children's stories",
    "personalized storybooks",
    "kids story generator",
    "children's book maker",
    "bedtime stories",
  ],
  authors: [{ name: 'Tales of You' }],
  creator: 'Tales of You',
  publisher: 'Tales of You',
  metadataBase: new URL('https://thetalesofyou.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Children's Book Story Generator | The Tales of You - Personalized Storybooks",
    description: "The Tales of You is a children's book story generator that creates personalized storybooks where your child becomes the hero. Each children's book is uniquely crafted with AI-generated illustrations made just for them.",
    url: 'https://thetalesofyou.com',
    siteName: 'Tales of You',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Tales of You - Children's Book Story Generator",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Children's Book Story Generator | The Tales of You - Personalized Storybooks",
    description: "The Tales of You is a children's book story generator that creates personalized storybooks where your child becomes the hero. Each children's book is uniquely crafted with AI-generated illustrations made just for them.",
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
  url: 'https://thetalesofyou.com',
  logo: 'https://thetalesofyou.com/og-image.png',
  description: 'A children\'s book story generator that creates beautifully illustrated, personalized storybooks starring your child.',
  sameAs: [],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Tales of You — Children\'s Book Story Generator',
  description: 'A children\'s book story generator that creates personalized storybooks starring your child. Human-written stories with AI-generated illustrations.',
  url: 'https://thetalesofyou.com',
  publisher: {
    '@type': 'Organization',
    name: 'Tales of You',
  },
  mainEntity: {
    '@type': 'Product',
    name: 'Tales of You - Children\'s Book Story Generator',
    description: 'A personalized children\'s book story generator with human-written stories and AI-generated illustrations.',
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

