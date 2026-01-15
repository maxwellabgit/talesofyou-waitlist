"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
const logo = "/logo.png"

const howItWorks = [
  {
    number: "1",
    icon: "📖",
    title: "Choose a Story",
    description: "Browse our collection of magical stories designed for children of all ages.",
  },
  {
    number: "2",
    icon: "✨",
    title: "Personalize Your Story",
    description: "Add your name, choose characters, and customize the adventure.",
  },
  {
    number: "3",
    icon: "❤️",
    title: "Watch the Magic",
    description: "Our custom AI model creates beautiful characters, illustrations, and brings your story to life.",
  },
  {
    number: "4",
    icon: "🔗",
    title: "Share & Enjoy",
    description: "Read together, save to your library, or share with family and friends.",
  },
]

const roadmapItems = [
  {
    number: "1",
    icon: "🚀",
    title: "Launch Beta",
    description: "Release our first collection of human-written, personalized stories to early supporters.",
    status: "in-progress",
  },
  {
    number: "2",
    icon: "🎧",
    title: "Audio Narration",
    description: "Add AI-powered voice narration so stories can be read aloud automatically.",
    status: "upcoming",
  },
  {
    number: "3",
    icon: "🎬",
    title: "Animated Illustrations",
    description: "Add animated illustrations to your stories with the click of a button.",
    status: "upcoming",
  },
  {
    number: "4",
    icon: "📚",
    title: "Choose Your Own Adventure",
    description: "Grow our library with additional stories with alternate endings.",
    status: "upcoming",
  },
]

const blogPosts = [
  {
    slug: "our-story",
    title: "Our Story",
    excerpt: "Discover the mission behind Tales of You and how we're bringing imagination back to reading.",
    date: "January 11, 2026",
    category: "Company",
    readTime: "6 min read",
  },
]

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [isRoadmapVideoMuted, setIsRoadmapVideoMuted] = useState(true)
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null)
  const roadmapVideoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Fetch waitlist count on mount
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch('/api/waitlist')
        const data = await response.json()
        if (data.count !== undefined) {
          setWaitlistCount(data.count)
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error)
      }
    }
    fetchWaitlistCount()
  }, [])

  // Handle Escape key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isModalOpen && !isSubmitting) {
      setIsModalOpen(false)
    }
  }, [isModalOpen, isSubmitting])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Focus trap and focus first input when modal opens
  useEffect(() => {
    if (isModalOpen && emailInputRef.current) {
      emailInputRef.current.focus()
    }
    // Prevent body scroll when modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isModalOpen])

  const toggleRoadmapVideoMute = () => {
    if (roadmapVideoRef.current) {
      roadmapVideoRef.current.muted = !roadmapVideoRef.current.muted
      setIsRoadmapVideoMuted(roadmapVideoRef.current.muted)
    }
  }

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
        // Refresh the waitlist count
        const countResponse = await fetch('/api/waitlist')
        const countData = await countResponse.json()
        if (countData.count !== undefined) {
          setWaitlistCount(countData.count)
        }
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
      {/* Decorative elements - hidden from screen readers */}
      <div className="bg-decoration" aria-hidden="true">
        <div className="star star-1">✦</div>
        <div className="star star-2">✧</div>
        <div className="star star-3">✦</div>
        <div className="star star-4">✧</div>
        <div className="star star-5">✦</div>
      </div>

      {isModalOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => !isSubmitting && setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            ref={modalRef}
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close" 
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
              aria-label="Close dialog"
              type="button"
            >
              ×
            </button>
            <h2 id="modal-title" className="modal-title">Join the Waitlist</h2>
            <p className="modal-subtitle">Be among the first to sign up! We will send an email with a discount code when the site is live.</p>
            <form onSubmit={handleSubmit} className="waitlist-form">
              <div className="form-group">
                <label htmlFor="email">Email Address <span aria-hidden="true">*</span></label>
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number <span aria-hidden="true">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                />
              </div>
              {submitStatus && (
                <div 
                  className={`form-status ${submitStatus.type}`}
                  role={submitStatus.type === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                >
                  {submitStatus.message}
                </div>
              )}
              <button 
                type="submit" 
                className="btn-primary btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                {!isSubmitting && <span className="arrow" aria-hidden="true">→</span>}
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
              Coming Soon!
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
                <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>

            <div className="waitlist-count">
              <div className="avatar-stack" aria-hidden="true">
                <div className="avatar">👶</div>
                <div className="avatar">👧</div>
                <div className="avatar">👦</div>
              </div>
              <span>Join {waitlistCount !== null ? (waitlistCount + 50).toLocaleString() : '...'} heroes on the waitlist</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-chip">Human-written • AI-illustrated • Personalized • Shareable</div>
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
                <button className="pill" onClick={() => setIsModalOpen(true)} type="button">Get a discount on your first month</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <div className="eyebrow">A peek before the drop</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Create personalized stories in just a few steps—see the experience in motion.</p>
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
                preload="metadata"
                aria-label="Demo video showing how Tales of You works"
              >
                <source src="/TalesOfYou-Demo1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
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

      <section className="roadmap-section" id="roadmap">
        <div className="section-header">
          <div className="eyebrow">What's coming</div>
          <h2 className="section-title">Roadmap</h2>
          <p className="section-subtitle">Our journey to bring magical storytelling to families everywhere.</p>
        </div>
        <div className="roadmap-layout">
          <div className="roadmap-stack">
            {roadmapItems.map((item, index) => (
              <div key={item.number} className={`roadmap-card ${item.status}`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="roadmap-number">{item.number}</div>
                <div className="roadmap-icon">{item.icon}</div>
                <div className="roadmap-body">
                  <div className="roadmap-title-row">
                    <h3 className="roadmap-title">{item.title}</h3>
                    {item.status === "in-progress" && <span className="roadmap-badge">In Progress</span>}
                  </div>
                  <p className="roadmap-description">{item.description}</p>
                </div>
                {index < roadmapItems.length - 1 && <div className="roadmap-connector"></div>}
              </div>
            ))}
          </div>
          <button 
            className="roadmap-video" 
            onClick={toggleRoadmapVideoMute}
            type="button"
            aria-label={isRoadmapVideoMuted ? 'Click to unmute video' : 'Click to mute video'}
          >
            <div className="video-portrait">
              <video
                ref={roadmapVideoRef}
                className="video-inline"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Tales of You promotional video"
              >
                <source src="/TOY-Ad-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className={`video-sound-indicator ${isRoadmapVideoMuted ? 'muted' : 'unmuted'}`} aria-hidden="true">
                {isRoadmapVideoMuted ? '🔇 Click for sound' : '🔊 Sound on'}
              </div>
            </div>
          </button>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-header">
          <h2 className="section-title">Blog</h2>
        </div>
        <p className="blog-subtitle">Keep up with the latest from the Tales of You team.</p>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`} className="blog-card-link">
              <article className="blog-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="blog-card-header">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-footer">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-read-more">
                    Read more →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to create magical memories?</h2>
          <p>Be the first to know when Tales of You launches, and get a discount for signing up early.</p>
          <button className="btn-primary btn-large" onClick={() => setIsModalOpen(true)}>
            Join the Waitlist
            <span className="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

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
