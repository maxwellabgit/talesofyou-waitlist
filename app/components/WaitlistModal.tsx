"use client"

import { useState } from "react"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
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
          onClose()
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

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={() => !isSubmitting && onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose}
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
  )
}

