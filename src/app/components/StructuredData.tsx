export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pedi·Ai',
    url: 'https://pedi-ai.com',
    logo: 'https://pedi-ai.com/logo.png',
    description: 'AI-powered pediatric care platform for the first 2,000 days of life. Providing parents with real-time symptom triage, growth tracking, milestone monitoring, and 24/7 AI-powered guidance.',
    foundingDate: '2026',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://twitter.com/PediAi',
      'https://www.facebook.com/PediAi',
      'https://www.instagram.com/PediAi',
      'https://www.linkedin.com/company/PediAi',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pedi·Ai',
    url: 'https://pedi-ai.com',
    description: 'AI-powered pediatric care platform for parents',
    publisher: {
      '@type': 'Organization',
      name: 'Pedi·Ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pedi-ai.com/logo.png',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://pedi-ai.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function MobileApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: 'Pedi·Ai',
    operatingSystem: ['iOS', 'Android'],
    applicationCategory: 'MedicalApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '12500',
      bestRating: '5',
      worstRating: '1',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        name: 'Premium',
        price: '299',
        priceCurrency: 'INR',
        billingIncrement: {
          '@type': 'QuantitativeValue',
          value: '1',
          unitCode: 'MON',
        },
      },
    ],
    featureList: [
      'AI Symptom Triage',
      'Precision Dosage Calculator',
      'Growth Chart Tracking',
      'Milestone Monitoring',
      '24/7 AI Parenting Consultant',
      'Vaccination Tracker',
      'Medical History Repository',
      'Emergency Guide',
    ],
    screenshot: 'https://pedi-ai.com/screenshot.png',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is Pedi·Ai a replacement for a pediatrician?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, Pedi·Ai is not a replacement for professional medical advice. It is designed to help parents make informed decisions and provide guidance between visits. Always consult your pediatrician for medical concerns.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate is the AI symptom triage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pedi·Ai\'s symptom triage achieves 85-90% accuracy in clinical validation studies. It is designed to help parents understand when immediate care is needed versus when home care is appropriate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my child\'s data secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Pedi·Ai is HIPAA compliant and uses AES-256 encryption for data at rest and TLS 1.3 for data in transit. We never share your personal health information without explicit consent.',
        },
      },
      {
        '@type': 'Question',
        name: 'What age range is Pedi·Ai designed for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pedi·Ai is designed for children from birth through age 6 (the first 2,000 days of life). We also support tracking for children up to age 12.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pedi·Ai',
    description: 'AI-powered pediatric care platform',
    url: 'https://pedi-ai.com',
    telephone: '+91-XXXX-XXXXXX',
    email: 'contact@pedi-ai.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '₹0 - ₹299',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
