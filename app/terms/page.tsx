import LegalPage from '@/components/LegalPage'

export const metadata = {
  title: 'Terms of Service | Tales of You',
  description: 'Terms of Service for Tales of You - Read our terms and conditions for using our personalized storybook service.',
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Read the terms and conditions for using our personalized storybook service."
      updatedAt="January 2026"
      pdfPath="/terms-and-conditions.pdf"
      pdfTitle="Terms and Conditions"
    />
  )
}

