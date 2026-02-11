import type { Metadata } from 'next'
import './globals.css'
import { Quicksand, Rum_Raisin } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const rumRaisin = Rum_Raisin({
  subsets: ['latin'],
  variable: '--font-rum-raisin',
  weight: ['400'],
  display: 'swap',
})

const siteUrl = 'https://thetalesofyou.com'
const siteTitle = 'Personalized Children\'s Book Story Generator | Tales of You'
const siteDescription = 'Create magical personalized children\'s books where your child becomes the hero. Human-written stories with AI-generated illustrations, customized with your child\'s name and likeness. Join the waitlist for early access!'

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: '%s | Tales of You',
  },
  description: siteDescription,
  keywords: [
    "children's book story generator",
    "personalized children's book",
    "personalized books for kids",
    "custom children's books",
    "story generator for kids",
    "personalized children's storybooks",
    "AI children's books",
    "custom kids storybooks",
    "children's storybook with your child as the hero",
    "AI-generated children's stories",
    "personalized storybooks",
    "kids story generator",
    "children's book maker",
    "personalized bedtime stories",
    "create your own children's book",
    "kids personalized stories",
    "personalized storybook maker",
    "custom storybook for kids",
    "AI storybook generator",
    "children's book with my child's name",
    "personalized reading for children",
    "bedtime story generator",
    "children's book creator",
    "personalized gift for kids",
  ],
  authors: [{ name: 'Tales of You', url: siteUrl }],
  creator: 'Tales of You',
  publisher: 'Tales of You',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  category: 'Education',
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Tales of You',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: "Tales of You - Personalized Children's Book Story Generator",
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/opengraph-image'],
    creator: '@talesofyou',
    site: '@talesofyou',
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
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', type: 'image/png' },
    ],
  },
  verification: {
    // Add your Google Search Console and Bing verification codes here
    // google: 'your-google-verification-code',
    // other: { 'msvalidate.01': 'your-bing-verification-code' },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Tales of You',
    'mobile-web-app-capable': 'yes',
    'theme-color': '#f5a9a9',
  },
}

// JSON-LD Structured Data
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Tales of You',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo.png`,
    width: 512,
    height: 512,
  },
  description: 'A children\'s book story generator that creates beautifully illustrated, personalized storybooks starring your child.',
  foundingDate: '2026',
  sameAs: [
    // Add social media URLs when available:
    // 'https://twitter.com/talesofyou',
    // 'https://instagram.com/talesofyou',
    // 'https://facebook.com/talesofyou',
    // 'https://tiktok.com/@talesofyou',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: siteUrl,
  },
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  name: 'Tales of You',
  url: siteUrl,
  description: siteDescription,
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  inLanguage: 'en-US',
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/#webpage`,
  name: 'Tales of You — Personalized Children\'s Book Story Generator',
  description: siteDescription,
  url: siteUrl,
  isPartOf: {
    '@id': `${siteUrl}/#website`,
  },
  about: {
    '@id': `${siteUrl}/#organization`,
  },
  publisher: {
    '@id': `${siteUrl}/#organization`,
  },
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Tales of You',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description: 'A personalized children\'s book story generator with human-written stories and AI-generated illustrations. Create custom storybooks where your child becomes the hero.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Join the waitlist for free early access',
      availability: 'https://schema.org/PreOrder',
    },
    brand: {
      '@type': 'Brand',
      name: 'Tales of You',
    },
    featureList: [
      'Personalized children\'s books',
      'AI-generated illustrations',
      'Human-written stories',
      'Custom characters from selfies',
      'Shareable story library',
      'Audio narration (coming soon)',
    ],
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: '2',
      suggestedMaxAge: '12',
      audienceType: 'Parents and children',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
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

