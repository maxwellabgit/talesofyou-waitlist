import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog'
import logo from '../../../assets/logo.png'

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | Tales of You`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="page blog-page">
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
          <Image src={logo} alt="Tales of You" width={42} height={42} />
          <span className="logo-text-small">
            <span className="text-coral">Tales</span>
            <span className="text-gold">of</span>
            <span className="text-sky">You</span>
          </span>
        </Link>
        <Link href="/" className="back-link">← Back to Home</Link>
      </header>

      <article className="blog-post">
        <div className="blog-post-header">
          <div className="blog-post-meta">
            <span className="blog-category">{post.category}</span>
            <span className="blog-divider" aria-hidden="true">•</span>
            <span className="blog-read-time">{post.readTime}</span>
            <span className="blog-divider" aria-hidden="true">•</span>
            <span className="blog-date">{post.date}</span>
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-excerpt">{post.excerpt}</p>
        </div>

        <div className="blog-post-content">
          <MDXRemote source={post.content} />
        </div>
      </article>

      <footer className="footer">
        <div className="footer-logo">
          <Image src={logo} alt="Tales of You" width={42} height={42} />
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
