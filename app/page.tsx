"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
const logo = "/logo.png"

const howItWorks = [
  {
    number: "1",
    icon: "📖",
    title: "Pick a Story",
    description: "Browse adventures, bedtime tales, and educational stories — all written by real authors for kids of every age.",
  },
  {
    number: "2",
    icon: "✨",
    title: "Make It Theirs",
    description: "Add your child's name, upload a photo, and choose who joins the adventure — siblings, friends, even the family pet.",
  },
  {
    number: "3",
    icon: "❤️",
    title: "See the Magic",
    description: "In seconds, our story generator creates a fully illustrated children's book with characters that look like your family.",
  },
  {
    number: "4",
    icon: "🔗",
    title: "Read, Save, Share",
    description: "Read it together at bedtime, save it to your library forever, or send it to grandparents with a single tap.",
  },
]

const roadmapItems = [
  {
    number: "1",
    icon: "🚀",
    title: "Launch Beta",
    description: "Our first collection of personalized stories goes live for waitlist members — real stories, real illustrations, real magic.",
    status: "in-progress",
  },
  {
    number: "2",
    icon: "🎧",
    title: "Audio Narration",
    description: "Every story read aloud with AI narration — pick a voice, hit play, and let bedtime run itself.",
    status: "upcoming",
  },
  {
    number: "3",
    icon: "🎬",
    title: "Animated Illustrations",
    description: "Watch the illustrations come alive with gentle animations that keep little eyes on the page.",
    status: "upcoming",
  },
  {
    number: "4",
    icon: "📚",
    title: "Choose Your Own Adventure",
    description: "Branching storylines where your child makes the choices — every reading is a different journey.",
    status: "upcoming",
  },
]

const blogPosts = [
  {
    slug: "screen-time-to-story-time",
    title: "From Screen Time to Story Time",
    excerpt: "We've all seen the iPad Kids. Algorithm-driven content is winning the attention war — here's why personalized storytelling might be the answer.",
    date: "February 8, 2026",
    category: "Perspective",
    readTime: "5 min read",
  },
  {
    slug: "our-story",
    title: "Our Story",
    excerpt: "Why we built Tales of You, what we believe about reading, and why we think personalized children's books can bring imagination back.",
    date: "January 11, 2026",
    category: "Company",
    readTime: "6 min read",
  },
]

const faqItems = [
  {
    question: "What is a personalized children's book?",
    answer: "It's a storybook where your child isn't just reading about a character — they are the character. Their name, their face, and their world are woven directly into the story. With Tales of You, creating a personalized children's book takes minutes and doesn't require any writing or design skills.",
  },
  {
    question: "How does the Tales of You story generator work?",
    answer: "You pick a story, tell us about your child — their name, a photo, maybe a favorite animal — and our story generator does the rest. In minutes you get a fully illustrated personalized children's book with characters that actually look like your family. It's that simple.",
  },
  {
    question: "When will Tales of You launch?",
    answer: "Very soon. We're putting the finishing touches on our first collection of stories right now. Join the waitlist to be first in line — you'll get an email the moment we go live, plus a discount for signing up early.",
  },
  {
    question: "Is Tales of You safe for kids?",
    answer: "Yes, completely. Every story is written for kids aged 2 to 12 and reviewed for age-appropriate content. We focus on positive themes — kindness, curiosity, bravery — and parents have full control over story choices and character creation. No ads, no tracking, no surprises.",
  },
  {
    question: "What ages are the stories designed for?",
    answer: "We're building stories for kids aged 2 through 12. That means simple, colorful picture books for toddlers and richer, longer adventures for older readers. Each story's vocabulary and pacing is matched to the right age group, so it always feels just right.",
  },
  {
    question: "Can I add family members or pets to the story?",
    answer: "Absolutely. You can add siblings, parents, grandparents, friends — even the family dog. Upload a photo and our AI creates custom illustrations that actually resemble your real family. It turns every personalized book into a true keepsake.",
  },
  {
    question: "How is this different from other personalized children's books?",
    answer: "Most personalized books just drop your child's name into a template. Tales of You is different — our stories are written by real authors and our AI generates unique illustrations based on your child's actual appearance. Every story, every character, every page is one-of-a-kind.",
  },
  {
    question: "Can personalized stories help my child learn to read?",
    answer: "Kids pay more attention when they see themselves in a story — that's not just our opinion, it's backed by research. Our stories pair that natural engagement with age-appropriate vocabulary and thoughtful pacing. When reading feels personal and exciting, kids want to do more of it.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(item => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
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
            <h2 id="modal-title" className="modal-title">Get Early Access</h2>
            <p className="modal-subtitle">Join the waitlist and we'll send you a discount code the moment Tales of You goes live. No spam — just one email when it's time.</p>
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

      <nav className="site-nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="#" className="nav-logo" aria-label="Tales of You - Back to top">
            <Image src={logo} alt="Tales of You" width={36} height={36} />
            <span className="nav-brand">
              <span className="text-coral">Tales</span>
              <span className="text-gold">of</span>
              <span className="text-sky">You</span>
            </span>
          </a>
          <div className="nav-links">
            <a href="#what-is">About</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#roadmap">Roadmap</a>
            <a href="/blog/our-story">Blog</a>
            <a href="#faq">FAQ</a>
          </div>
          <button className="btn-nav-cta" onClick={() => setIsModalOpen(true)} type="button">
            Join Waitlist
            <span className="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </nav>

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

            <h1 className="hero-headline">Personalized children's books where your child is the hero of every story</h1>
            <p className="hero-description">
              What if your child could see themselves inside a storybook? Tales of You is a children's book story generator
              that weaves your child's name, face, and personality into human-written stories with beautiful AI illustrations.
              Every book is a one-of-a-kind keepsake your family will read together again and again.
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
              <span>{waitlistCount !== null ? (waitlistCount + 50).toLocaleString() : '...'} families already on the waitlist</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-chip">Human-written stories • AI-illustrated • Truly personalized • Shareable</div>
            <div className="hero-panel">
              <div className="panel-header">
                <span className="panel-dot"></span>
                What you'll get
              </div>
              <ul className="panel-list">
                <li>Stories written by real authors — not generated by a chatbot</li>
                <li>Custom characters that actually look like your child, family, and pets</li>
                <li>A growing library of personalized books you can save, revisit, and share</li>
              </ul>
              <div className="panel-footer">
                <button className="pill" onClick={() => setIsModalOpen(true)} type="button">Sign up early for a discount</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="explainer-section" id="what-is">
        <div className="section-header">
          <div className="eyebrow">The idea</div>
          <h2 className="section-title">What Is Tales of You?</h2>
          <p className="section-subtitle">A children's book story generator that turns your child into the hero of the story.</p>
        </div>
        <div className="explainer-copy">
          <p>
            Most personalized children's books just swap in a name. Tales of You goes further. Our story generator
            takes your child's name, face, and personality and weaves them into professionally written stories with
            AI-generated illustrations that actually look like your family. The result isn't a gimmick — it's a real
            children's book that feels like it was written just for them.
          </p>
          <p>
            Every story in our library is crafted by human authors who understand pacing, wonder, and what makes
            kids want to turn the page. The AI handles the illustrations — creating characters, scenes, and worlds
            that match each child's unique details. You get the heart of a great children's book with the magic of
            personalization, ready in minutes.
          </p>
          <p>
            Whether it's a nightly bedtime ritual, a birthday gift they'll actually treasure, or a way to get a
            reluctant reader excited about books — Tales of You makes it easy. We're building a growing library
            of stories for every age and interest. Join the waitlist to be the first to create a personalized
            children's book your family will want to read on repeat.
          </p>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <div className="eyebrow">Simple as bedtime</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">From story to keepsake in under five minutes. No writing, no design skills, no catch.</p>
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
          <div className="eyebrow">What's next</div>
          <h2 className="section-title">Roadmap</h2>
          <p className="section-subtitle">Where we are and where we're headed. Early supporters help shape what comes next.</p>
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

      <section className="blog-section" id="blog">
        <div className="section-header">
          <div className="eyebrow">From our team</div>
          <h2 className="section-title">Blog</h2>
          <p className="section-subtitle">Stories, insights, and updates from the Tales of You team.</p>
        </div>
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
          <div className="eyebrow">Questions</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything parents ask us before joining the waitlist.</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <article key={index} className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 itemProp="name">{item.question}</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-content">
          <h2>Your child's first personalized book is almost here</h2>
          <p>Join the waitlist now and you'll be first to create a story when we launch — plus you'll get a discount just for being early.</p>
          <button className="btn-primary btn-large" onClick={() => setIsModalOpen(true)}>
            Join the Waitlist
            <span className="arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">
            <Image src={logo} alt="Tales of You children's book story generator logo" width={42} height={42} />
            <span className="footer-brand">
              <span className="text-coral">Tales</span>
              <span className="text-gold">of</span>
              <span className="text-sky">You</span>
            </span>
          </div>
          <p className="footer-tagline">Personalized children's books for families who believe reading should feel like magic.</p>
        </div>
        <div className="footer-columns">
          <nav className="footer-col" aria-label="Site navigation">
            <h4 className="footer-col-title">Explore</h4>
            <a href="#what-is">About</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#faq">FAQ</a>
          </nav>
          <nav className="footer-col" aria-label="Blog posts">
            <h4 className="footer-col-title">Blog</h4>
            <Link href="/blog/our-story">Our Story</Link>
            <Link href="/blog/screen-time-to-story-time">Screen Time to Story Time</Link>
          </nav>
          <nav className="footer-col" aria-label="Legal">
            <h4 className="footer-col-title">Legal</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Tales of You. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
