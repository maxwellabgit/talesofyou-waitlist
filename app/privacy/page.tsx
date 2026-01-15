import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Privacy Policy | Tales of You',
  description: 'Privacy Policy for Tales of You - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Learn how we collect, use, and protect your personal information."
      updatedAt="January 2026"
      pdfPath="/privacy-policy.pdf"
      pdfTitle="Privacy Policy"
    />
  )
}

