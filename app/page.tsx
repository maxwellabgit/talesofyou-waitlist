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
    description: "Browse our growing library of children's book stories designed for all ages.",
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
    description: "Our story generator creates beautiful characters, illustrations, and brings your children's book to life.",
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
    description: "Release our first collection of human-written, personalized children's book stories to early supporters.",
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
    description: "Grow our children's book library with new stories and alternate endings.",
    status: "upcoming",
  },
]

const blogPosts = [
  {
    slug: "our-story",
    title: "Our Story",
    excerpt: "Discover the mission behind Tales of You and how our children's book story generator is bringing imagination back to reading.",
    date: "January 11, 2026",
    category: "Company",
    readTime: "6 min read",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a personalized children's book?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A personalized children's book is a custom storybook where the child's name, traits, or family details are woven into the story so they become the hero. Our story generator makes it easy to create a one-of-a-kind children's book in minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How does The Tales of You story generator work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You choose a story, add details about your child, and our children's book story generator creates a personalized storybook with custom characters and illustrations made just for them.",
      },
    },
    {
      "@type": "Question",
      name: "When will The Tales of You launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We are launching soon. Join the waitlist to be first in line and receive updates and early access offers.",
      },
    },
    {
      "@type": "Question",
      name: "Is The Tales of You safe for kids?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every children's book created with our story generator is designed for kids and reviewed for age-appropriate content, with a focus on positive themes and family-friendly storytelling.",
      },
    },
  ],
}

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
  const isWaitlistReady = email.trim().length > 0

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  disabled={isSubmitting}
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
                className={`btn-primary btn-submit${isWaitlistReady ? ' is-complete' : ''}`}
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
              <Image src={logo} alt="Tales of You children's book story generator logo" width={72} height={72} className="logo-icon" />
              <div className="logo-text" aria-label="Tales of You">
                <span className="text-coral">Tales</span>
                <span className="text-gold">of</span>
                <span className="text-sky">You</span>
              </div>
            </div>

            <h1 className="hero-headline">A children's book story generator where your child becomes the hero</h1>
            <p className="hero-description">
              Join the waitlist for a personalized children's book experience built around your child's name,
              personality, and imagination. Our story generator turns every adventure into a keepsake you can read together,
              share with family, and revisit at bedtime.
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
                <li>Human-written children's book stories created by professionals</li>
                <li>Personalized characters — take a selfie with you, your child, or your pet</li>
                <li>Save your favorite stories and characters, and share each children's book with family</li>
              </ul>
              <div className="panel-footer">
                <button className="pill" onClick={() => setIsModalOpen(true)} type="button">Get a discount on your first month</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="explainer-section" id="what-is">
        <div className="section-header">
          <div className="eyebrow">What is this?</div>
          <h2 className="section-title">What Is The Tales of You?</h2>
          <p className="section-subtitle">A children's book story generator that makes reading feel personal, exciting, and unforgettable.</p>
        </div>
        <div className="explainer-copy">
          <p>
            The Tales of You is a personalized children's book story generator that uses AI to create custom stories where your child
            becomes the main character. Instead of a one-size-fits-all story, every children's book is tailored to your child's name, favorite
            themes, and the details that make them unique. The result is a personalized children's book with your child as the hero, designed
            to spark imagination and build a love of reading from the very first page.
          </p>
          <p>
            We combine human-written storytelling with our AI story generator to deliver the best of both worlds: the warmth,
            pacing, and structure of a great children's book with the flexibility of personalization. You can choose a story, customize
            characters, and create a keepsake in minutes. Our goal is to help families share meaningful reading moments while giving
            kids a children's book that feels like it was made just for them.
          </p>
          <p>
            Whether you are looking for a special bedtime ritual, a memorable gift, or a way to help a reluctant reader fall in love
            with books, our children's book story generator makes it easy. We are building a growing library of personalized stories
            that celebrate each child. Join the waitlist today to get early access and be the first to create a children's book
            your child will want to read again and again.
          </p>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <div className="eyebrow">A peek before the drop</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Our story generator creates a personalized children's book in just a few steps.</p>
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

      <section className="faq-section" id="faq">
        <div className="section-header">
          <div className="eyebrow">FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          <article className="faq-item">
            <h3>What is a personalized children's book?</h3>
            <p>
              A personalized children's book is a custom storybook where your child's name and details appear in the story
              so they become the hero. Our story generator makes it easy to create one in minutes.
            </p>
          </article>
          <article className="faq-item">
            <h3>How does The Tales of You story generator work?</h3>
            <p>
              You choose a story, add details about your child, and our children's book story generator creates a personalized
              storybook with custom characters and illustrations.
            </p>
          </article>
          <article className="faq-item">
            <h3>When will The Tales of You launch?</h3>
            <p>We are launching soon. Join the waitlist to get updates and early access offers.</p>
          </article>
          <article className="faq-item">
            <h3>Is The Tales of You safe for kids?</h3>
            <p>Yes. Every children's book created with our story generator is reviewed for age-appropriate content and positive themes.</p>
          </article>
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-content">
          <h2>Ready to create your child's first personalized children's book?</h2>
          <p>Be the first to try our story generator when Tales of You launches, and get a discount for signing up early.</p>
          <button className="btn-primary btn-large" onClick={() => setIsModalOpen(true)}>
            Join the Waitlist
            <span className="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">
          <Image src={logo} alt="Tales of You children's book story generator logo" width={42} height={42} />
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
