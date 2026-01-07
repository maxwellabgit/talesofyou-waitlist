"use client"

import { useState } from "react"
import Image from "next/image"
import logo from "../assets/tales-of-you.png"

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
        setSubmitStatus({ type: 'success', message: 'Successfully joined the waitlist!' })
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
        <div className="hero-content">
          <div className="logo-container-centered">
            <Image src={logo} alt="Tales of You Logo" width={280} height={280} className="logo-icon-centered" />
          </div>
          <h1>Create magical stories with your children</h1>
          <p className="hero-description">
            Transform your ideas into beautifully illustrated, animated storybooks. Build characters, design pages, and bring stories to life with AI.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
              Join the Waitlist
              <span className="arrow">→</span>
            </button>
            <button className="btn-secondary">Watch demo</button>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Create personalized stories for your children in just a few simple steps</p>
        <div className="steps-grid">
          {howItWorks.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
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
            <article key={index} className="blog-card">
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

      <section className="bottom-cta">
        <a href="#how-it-works" className="bottom-link">See How It Works</a>
      </section>
    </main>
  )
}
