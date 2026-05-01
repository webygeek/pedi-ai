import { Metadata } from 'next'
import { Navigation } from '../components/Navigation'
import { Button } from '../components/Button'
import { FAQSchema } from '../components/StructuredData'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about Pedi·Ai - AI pediatric care app. Learn about symptom triage, data security, pricing, and how we protect your family\'s health information.',
}

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is Pedi·Ai?',
        a: 'Pedi·Ai is an AI-powered pediatric care platform designed for parents of children from birth to age 6 (the first 2,000 days of life). It provides real-time symptom triage, growth tracking, milestone monitoring, and 24/7 AI-powered parenting guidance—all backed by pediatric guidelines.',
      },
      {
        q: 'Is Pedi·Ai a replacement for a pediatrician?',
        a: 'No, Pedi·Ai is not a replacement for professional medical advice. It is designed to help parents make informed decisions between visits. Always consult your pediatrician for medical concerns. Our AI provides guidance, not diagnoses.',
      },
      {
        q: 'What age range is Pedi·Ai designed for?',
        a: 'Pedi·Ai is primarily designed for children from birth through age 6. We also support tracking for children up to age 12, including vaccination schedules and developmental milestones for that range.',
      },
    ],
  },
  {
    category: 'Features',
    questions: [
      {
        q: 'How accurate is the AI symptom triage?',
        a: 'Pedi·Ai\'s symptom triage achieves 85-90% accuracy in clinical validation studies. It uses intelligent questioning to assess symptoms and provide guidance ranging from home care to seeking emergency care.',
      },
      {
        q: 'How does the dosage calculator work?',
        a: 'Enter your child\'s weight once, and our calculator provides safe dosages for common medications like acetaminophen and ibuprofen. It includes multiple safety checks to prevent errors, with visual guidance and overdose alerts.',
      },
      {
        q: 'What are WHO growth charts?',
        a: 'Pedi·Ai uses World Health Organization growth standards, which are the international gold standard for tracking children\'s growth. These charts account for breastfeeding and age-appropriate development patterns.',
      },
    ],
  },
  {
    category: 'Security & Privacy',
    questions: [
      {
        q: 'Is my child\'s data secure?',
        a: 'Yes, Pedi·Ai is HIPAA compliant and uses AES-256 encryption for data at rest and TLS 1.3 for data in transit. We never share your personal health information without explicit consent.',
      },
      {
        q: 'Who can see my child\'s health data?',
        a: 'Only you can access your child\'s health data. You can choose to share specific information with your pediatrician if desired. We never sell or share your data with third parties.',
      },
      {
        q: 'What is HIPAA compliance?',
        a: 'HIPAA (Health Insurance Portability and Accountability Act) is a US law that sets standards for protecting sensitive health information. Being HIPAA compliant means we follow strict protocols for data security and privacy.',
      },
    ],
  },
  {
    category: 'Pricing',
    questions: [
      {
        q: 'Is there a free version?',
        a: 'Yes, Pedi·Ai offers a free tier with basic symptom checking, growth tracking, and appointment reminders. Our premium features are available with a subscription.',
      },
      {
        q: 'What are the subscription plans?',
        a: 'Premium (₹299/month) includes full AI chatbot, personalized recommendations, and unlimited assessments. Complete (₹499/month) adds multi-child support and all chronic condition modules.',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <FAQSchema />
      <Navigation />

      <main className="min-h-screen bg-cream pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="section-label">Help Center</span>
            <h1 className="section-title mb-6">Frequently Asked Questions</h1>
            <p className="section-subtitle mx-auto text-center">
              Everything you need to know about Pedi·Ai
            </p>
          </div>

          {/* FAQ Categories */}
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-16">
              <h2 className="font-display text-xl text-forest mb-8 pb-4 border-b border-forest/10">
                {category.category}
              </h2>
              <div className="space-y-8">
                {category.questions.map((item, qIndex) => (
                  <div key={qIndex} className="bg-white rounded-2xl p-8 border border-forest/5">
                    <h3 className="font-display text-lg text-forest mb-4">{item.q}</h3>
                    <p className="text-forest/70 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="bg-forest text-white rounded-3xl p-10 text-center">
            <h2 className="font-display text-2xl mb-4">Still have questions?</h2>
            <p className="text-white/80 mb-6">
              Our team is here to help. Reach out anytime.
            </p>
            <Button variant="primary" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
