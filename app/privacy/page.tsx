import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'

export const metadata = {
  title: 'Privacy Policy | Tales of You',
  description: 'Privacy Policy for Tales of You - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <main className="page blog-page">
      <div className="bg-decoration">
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
          <h1 className="blog-post-title">Privacy Policy</h1>
          <p className="blog-post-excerpt">Last updated: January 2026</p>
        </div>

        <div className="blog-post-content">
          {/* Privacy policy content will be added here */}
          <p>Privacy policy content coming soon.</p>
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
        <p className="footer-copy">© 2026 Tales of You. All rights reserved.</p>
      </footer>
    </main>
  )
}

