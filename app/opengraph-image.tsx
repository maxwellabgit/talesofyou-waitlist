import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Tales of You - Create Magical Stories With Your Children'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #fef9f7 0%, #f6f2fb 45%, #eef2f7 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(168, 216, 232, 0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'rgba(245, 169, 169, 0.3)',
          }}
        />
        
        {/* Logo text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 72, fontWeight: 700, color: '#e8918f' }}>Tales</span>
          <span style={{ fontSize: 72, fontWeight: 700, color: '#e8c574' }}>of</span>
          <span style={{ fontSize: 72, fontWeight: 700, color: '#8cc5d8' }}>You</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: 16,
          }}
        >
          Create magical stories with your children
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 24,
            color: '#6b7280',
            maxWidth: 800,
            textAlign: 'center',
          }}
        >
          Human-written • AI-illustrated • Personalized • Shareable
        </div>

        {/* CTA Badge */}
        <div
          style={{
            marginTop: 40,
            padding: '16px 32px',
            borderRadius: 100,
            background: 'linear-gradient(135deg, #f5a9a9 0%, #f8c4c4 100%)',
            color: 'white',
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          Join the Waitlist →
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

