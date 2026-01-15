import Image from "next/image"
import Link from "next/link"

const logo = "/logo.png"

type LegalPageProps = {
  title: string
  description: string
  updatedAt: string
  pdfPath: string
  pdfTitle: string
}

export default function LegalPage({ title, description, updatedAt, pdfPath, pdfTitle }: LegalPageProps) {
  return (
    <main className="page blog-page">
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

      <article className="blog-post blog-post-wide">
        <div className="blog-post-header">
          <h1 className="blog-post-title">{title}</h1>
          <p className="blog-post-excerpt">{description}</p>
          <p className="blog-post-excerpt">Last updated: {updatedAt}</p>
        </div>

        <div className="blog-post-content">
          <div className="pdf-container">
            <h2 className="pdf-title">{pdfTitle}</h2>
            <iframe
              src={pdfPath}
              className="pdf-viewer"
              title={`${pdfTitle} PDF`}
              width="100%"
              height="800px"
            />
            <div className="pdf-download">
              <div className="legal-actions">
                <a href={pdfPath} className="download-link" target="_blank" rel="noopener noreferrer">
                  Open in new tab
                </a>
                <a href={pdfPath} download className="download-link">
                  Download PDF
                </a>
              </div>
              <p className="legal-note">
                If the document preview does not load, use one of the links above.
              </p>
            </div>
          </div>
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
