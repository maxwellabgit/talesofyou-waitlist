import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog'
const logo = '/logo.png'
const siteUrl = 'https://thetalesofyou.com'

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  const postUrl = `${siteUrl}/blog/${slug}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Tales of You Blog`,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Tales of You',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: ['Tales of You'],
      section: post.category,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: `${post.title} - Tales of You Blog`,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Tales of You Blog`,
      description: post.excerpt,
      images: ['/opengraph-image'],
      creator: '@talesofyou',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const postUrl = `${siteUrl}/blog/${slug}`
  const publishDate = new Date(post.date).toISOString()

  // BlogPosting structured data for rich snippets
  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      '@type': 'Organization',
      name: 'Tales of You',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tales of You',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'Blog',
      name: 'Tales of You Blog',
      url: `${siteUrl}/blog`,
    },
  }

  // BreadcrumbList for better SERP display
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  return (
    <main className="page blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Decorative elements - hidden from screen readers */}
      <div className="bg-decoration" aria-hidden="true">
        <div className="star star-1">✦</div>
        <div className="star star-2">✧</div>
        <div className="star star-3">✦</div>
        <div className="star star-4">✧</div>
        <div className="star star-5">✦</div>
      </div>

      <header className="blog-header-nav">
        <Link href="/" className="blog-logo">
          <Image src={logo} alt="Tales of You children's book story generator" width={42} height={42} />
          <span className="logo-text-small">
            <span className="text-coral">Tales</span>
            <span className="text-gold">of</span>
            <span className="text-sky">You</span>
          </span>
        </Link>
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/#blog">Blog</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>
        <Link href="/" className="back-link">← Back to Home</Link>
      </header>

      <article className="blog-post" itemScope itemType="https://schema.org/BlogPosting">
        <meta itemProp="author" content="Tales of You" />
        <meta itemProp="datePublished" content={publishDate} />
        <div className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-category" itemProp="articleSection">{post.category}</span>
            <span className="blog-divider" aria-hidden="true">•</span>
            <span className="blog-read-time">{post.readTime}</span>
            <span className="blog-divider" aria-hidden="true">•</span>
            <time className="blog-date" dateTime={publishDate} itemProp="datePublished">{post.date}</time>
          </div>
          <h1 className="blog-post-title" itemProp="headline">{post.title}</h1>
          <p className="blog-post-excerpt" itemProp="description">{post.excerpt}</p>
        </div>

        <div className="blog-post-content" itemProp="articleBody">
          <MDXRemote source={post.content} />
        </div>
      </article>

      <footer className="footer">
        <div className="footer-logo">
          <Image src={logo} alt="Tales of You children's book story generator" width={42} height={42} />
          <span className="footer-brand">
            <span className="text-coral">Tales</span>
            <span className="text-gold">of</span>
            <span className="text-sky">You</span>
          </span>
        </div>
        <nav className="footer-links" aria-label="Legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </nav>
        <p className="footer-copy">© 2026 Tales of You. All rights reserved.</p>
      </footer>
    </main>
  )
}
