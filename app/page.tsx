"use client"

import { useState } from "react"
import Image from "next/image"
import logo from "../assets/logo.png"

const howItWorks = [
  {
    number: "1",
    icon: "📖",
    title: "Choose a Template",
    description: "Browse our collection of magical story templates designed for children of all ages.",
  },
  {
    number: "2",
    icon: "✨",
    title: "Personalize Your Story",
    description: "Add your child's name, choose characters, and customize the adventure.",
  },
  {
    number: "3",
    icon: "❤️",
    title: "Watch the Magic",
    description: "Our AI creates beautiful illustrations and brings your story to life.",
  },
  {
    number: "4",
    icon: "🔗",
    title: "Share & Enjoy",
    description: "Read together, save to your library, or share with family and friends.",
  },
]

const blogPosts = [
  {
    title: "The Magic of Personalized Storytelling",
    excerpt: "Discover how personalized stories can spark your child's imagination and create lasting memories.",
    date: "March 15, 2024",
    category: "Storytelling",
    readTime: "5 min read",
  },
  {
    title: "How AI is Transforming Children's Books",
    excerpt: "Explore the innovative ways artificial intelligence is revolutionizing the way we create and share stories with children.",
    date: "March 10, 2024",
    category: "Technology",
    readTime: "7 min read",
  },
  {
    title: "Tips for Creating Engaging Children's Stories",
    excerpt: "Learn practical tips and techniques for crafting stories that captivate young minds and encourage a love of reading.",
    date: "March 5, 2024",
    category: "Writing",
    readTime: "6 min read",
  },
]

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thanks for joining the waitlist! We will let you know when the site is live.' })
        setEmail("")
        setPhone("")
        setTimeout(() => {
          setIsModalOpen(false)
          setSubmitStatus(null)
        }, 2000)
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to join waitlist' })
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page">
      {/* Decorative elements */}
      <div className="bg-decoration">
        <div className="star star-1">✦</div>
        <div className="star star-2">✧</div>
        <div className="star star-3">✦</div>
        <div className="star star-4">✧</div>
        <div className="star star-5">✦</div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => !isSubmitting && setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              ×
            </button>
            <h2 className="modal-title">Join the Waitlist</h2>
            <p className="modal-subtitle">Be among the first to create magical stories for your children</p>
            <form onSubmit={handleSubmit} className="waitlist-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                  disabled={isSubmitting}
                />
              </div>
              {submitStatus && (
                <div className={`form-status ${submitStatus.type}`}>
                  {submitStatus.message}
                </div>
              )}
              <button 
                type="submit" 
                className="btn-primary btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                {!isSubmitting && <span className="arrow">→</span>}
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="hero">
        <div className="hero-split">
          <div className="hero-content">
            <div className="coming-soon-badge">
              <span className="badge-dot"></span>
              Coming Soon · Private Drop
            </div>
            
            <div className="logo-horizontal">
              <Image src={logo} alt="Tales of You" width={72} height={72} className="logo-icon" />
              <h1 className="logo-text">
                <span className="text-coral">Tales</span>
                <span className="text-gold">of</span>
                <span className="text-sky">You</span>
              </h1>
            </div>

            <h2 className="hero-headline">Create magical stories with your children</h2>
            <p className="hero-description">
              Read beautifully illustrated storybooks starring... you.
            </p>
            
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
                Join the Waitlist
                <span className="arrow">→</span>
              </button>
            </div>

            <div className="waitlist-count">
              <div className="avatar-stack">
                <div className="avatar">👶</div>
                <div className="avatar">👧</div>
                <div className="avatar">👦</div>
              </div>
              <span>Join 1,200+ parents on the waitlist</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-chip">AI-illustrated • Animated • Shareable</div>
            <div className="hero-panel">
              <div className="panel-header">
                <span className="panel-dot"></span>
                Drop preview
              </div>
              <ul className="panel-list">
                <li>Human-written stories created by professionals </li>
                <li>Personalized characters - take a selfie with you, your child, or your pet</li>
                <li>Save your favorite stories and characters, and share with your family</li>
              </ul>
              <div className="panel-footer">
                <span className="pill">Waitlist members get a discoutn on their first month</span>
                <span className="pill pill-soft">Notify me →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <div className="eyebrow">A peek before the drop</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Create personalized stories for your children in just a few steps—see the experience in motion.</p>
        </div>
        <div className="how-layout">
          <div className="vertical-video">
            <div className="video-portrait">
              <video
                className="video-inline"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/TalesOfYou-Demo1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="video-caption">Always-on loop • 9:16 vertical preview</p>
          </div>
          <div className="steps-stack">
            {howItWorks.map((step, index) => (
              <div key={step.number} className="step-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="step-number">{step.number}</div>
                <div className="step-icon">{step.icon}</div>
                <div className="step-body">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-header">
          <span className="blog-icon">✍️</span>
          <h2 className="section-title">Latest Blog Posts</h2>
        </div>
        <p className="blog-subtitle">Insights, tips, and stories about creating magical experiences for children</p>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article key={index} className="blog-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="blog-card-header">
                <span className="blog-category">{post.category}</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <h3 className="blog-title">{post.title}</h3>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-footer">
                <span className="blog-date">{post.date}</span>
                <a href="#" className="blog-read-more">
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to create magical memories?</h2>
          <p>Be the first to know when Tales of You launches.</p>
          <button className="btn-primary btn-large" onClick={() => setIsModalOpen(true)}>
            Join the Waitlist
            <span className="arrow">→</span>
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">
          <Image src={logo} alt="Tales of You" width={32} height={32} />
          <span className="footer-brand">
            <span className="text-coral">Tales</span>
            <span className="text-gold">of</span>
            <span className="text-sky">You</span>
          </span>
        </div>
        <p className="footer-copy">© 2024 Tales of You. All rights reserved.</p>
      </footer>
    </main>
  )
}
