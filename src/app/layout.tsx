import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AuthProvider } from './context/AuthContext'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2c4a45',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://pedi-ai.com'),
  title: {
    default: 'Pedi·Ai — AI-Powered Pediatric Care for Your Child',
    template: '%s | Pedi·Ai',
  },
  description: 'The trusted AI companion for parents. Real-time symptom triage, growth tracking, milestone monitoring, and 24/7 expert guidance for your child\'s first 2,000 days.',
  keywords: [
    'pediatric care',
    'AI parenting app',
    'child health tracker',
    'symptom checker',
    'growth chart',
    'milestone tracking',
    'dosage calculator',
    'vaccination tracker',
    'parenting tips',
    'IAP guidelines',
    'WHO growth standards',
  ],
  authors: [{ name: 'Pedi·Ai Team' }],
  creator: 'Pedi·Ai',
  publisher: 'Pedi·Ai',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://pedi-ai.com',
    siteName: 'Pedi·Ai',
    title: 'Pedi·Ai — AI-Powered Pediatric Care for Your Child',
    description: 'The trusted AI companion for parents. Real-time symptom triage, growth tracking, and 24/7 expert guidance.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pedi·Ai - Your AI Pediatric Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pedi·Ai — AI-Powered Pediatric Care',
    description: 'The trusted AI companion for parents. Real-time symptom triage, growth tracking, and 24/7 expert guidance.',
    images: ['/og-image.png'],
    creator: '@PediAi',
  },
  alternates: {
    canonical: 'https://pedi-ai.com',
    languages: {
      'en-IN': 'https://pedi-ai.com',
    },
  },
  category: 'Health',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-cream antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
