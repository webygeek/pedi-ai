'use client'

import { useEffect } from 'react'
import { Navigation } from './components/Navigation'
import { Button } from './components/Button'
import { PhoneMockup } from './components/PhoneMockup'
import {
  OrganizationSchema,
  WebSiteSchema,
  MobileApplicationSchema,
  FAQSchema,
} from './components/StructuredData'

// Problem data
const problems = [
  {
    icon: '😰',
    title: 'Is this an emergency?',
    description: '40-60% of ER visits are non-emergent. But how do you know when something serious is hiding behind a mild fever?',
    stat: '6 in 10 ER visits avoidable',
  },
  {
    icon: '💊',
    title: 'Is this dose right?',
    description: 'Weight-based dosing changes constantly. Acetaminophen overdoses send thousands of kids to the ER every year.',
    stat: '50,000+ ER visits/year',
  },
  {
    icon: '🤔',
    title: 'Is my child on track?',
    description: 'Autism, speech delays, developmental issues — early intervention makes a 3-10x difference. But 15-20% of kids have delays.',
    stat: '4-5 year avg. autism diagnosis',
  },
]

// Features data
const features = [
  {
    icon: '🩺',
    title: 'AI Symptom Triage',
    description: 'Describe symptoms naturally. Our AI asks the right follow-up questions, then gives you clear guidance — Home Care, Urgent Care, or Call 911. Under 60 seconds.',
    tag: '⭐ Most Popular',
    highlight: true,
  },
  {
    icon: '💊',
    title: 'Precision Dosage Calculator',
    description: 'Enter weight once. Get instant, safe dosages for acetaminophen, ibuprofen, and common medications. Zero errors guaranteed.',
    tag: 'Safety First',
  },
  {
    icon: '📈',
    title: 'Growth Tracking',
    description: 'Plot height, weight, and head circumference on WHO/CDC growth charts. Get alerts for percentile crossings and growth concerns.',
    tag: 'WHO Standards',
  },
  {
    icon: '🎯',
    title: 'Milestone Monitoring',
    description: 'Track developmental progress across motor, language, social, and cognitive domains. Catch delays early — when intervention matters most.',
    tag: 'CDC Guidelines',
  },
  {
    icon: '🤖',
    title: '24/7 AI Parenting Consultant',
    description: 'Ask anything: sleep regressions, picky eating, tantrums, screen time. Get evidence-based answers instantly, day or night.',
    tag: 'Always Available',
  },
  {
    icon: '📅',
    title: 'Vaccination Tracker',
    description: 'Never miss a vaccine. Personalized schedules, proactive reminders, and school-ready certificates.',
    tag: 'IAP Recommended',
  },
]

// Stats data
const stats = [
  { value: '40%', label: 'Fewer unnecessary ER visits' },
  { value: '14mo', label: 'Earlier autism detection' },
  { value: '85%', label: 'Triage accuracy' },
  { value: '0', label: 'Medication errors' },
]

// Testimonials data
const testimonials = [
  {
    quote: 'At 3 AM, when my daughter had a 104 fever, I didn\'t panic. I opened Pedi·Ai, answered a few questions, and within 60 seconds knew exactly what to do. The peace of mind is worth everything.',
    name: 'Priya Sharma',
    role: 'Mother of two, Mumbai',
  },
  {
    quote: 'The dosage calculator alone has saved us multiple times. I used to double-check every dose — now I\'m confident in seconds. And the growth charts show us exactly how our son is developing.',
    name: 'Rahul Kapoor',
    role: 'Father, Bangalore',
  },
  {
    quote: 'As a pediatrician, I recommend Pedi·Ai to all my families. It helps parents make better decisions between visits and gives me longitudinal data I never had before.',
    name: 'Dr. Meera Iyer',
    role: 'Pediatrician, Chennai',
  },
]

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}

export default function HomePage() {
  useScrollAnimation()

  return (
    <main className="min-h-screen bg-cream">
      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <WebSiteSchema />
      <MobileApplicationSchema />
      <FAQSchema />

      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 pb-16 lg:pb-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[80%] h-[150%] bg-gradient-to-br from-sage/10 via-sage/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-mist px-4 py-2 rounded-full text-sm font-medium text-forest mb-6 fade-in">
                <span className="w-2 h-2 bg-sage rounded-full animate-pulse-dot" />
                IAP Clinically Reviewed
              </div>

              {/* Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] text-forest leading-tight mb-6 fade-in">
                Your AI companion for<br />
                <em className="text-coral not-italic">the first 2,000 days</em>
              </h1>

              {/* Subheadline */}
              <p className="text-lg lg:text-xl text-forest/70 mb-10 max-w-lg fade-in">
                From midnight fevers to developmental milestones — get instant, evidence-based guidance backed by pediatric experts. Know exactly when to act and when to rest easy.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 fade-in">
                <a href="#get-started">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Start Free — No Credit Card
                  </Button>
                </a>
                <a href="#how-it-works">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-forest/10 fade-in">
                {['WHO Growth Standards', 'HIPAA Compliant', '50,000+ Families'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-forest/70">
                    <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center lg:justify-end fade-in">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-30 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="section-label">The Challenge</span>
            <h2 className="section-title mb-6">
              Parenting comes with a thousand questions.<br />
              Most of them happen at 2 AM.
            </h2>
            <p className="section-subtitle">
              You&apos;re not alone. Every parent faces these moments — and making the wrong call can be scary, expensive, or worse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-cream rounded-3xl p-8 card-hover fade-in"
              >
                <div className="text-4xl mb-5">{problem.icon}</div>
                <h3 className="font-display text-xl text-forest mb-3">{problem.title}</h3>
                <p className="text-forest/70 mb-4 leading-relaxed">{problem.description}</p>
                <span className="inline-block px-3 py-1 bg-coral/10 text-coral text-sm font-semibold rounded-full">
                  {problem.stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-30 bg-gradient-to-b from-cream to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label">Your Parenting Toolkit</span>
            <h2 className="section-title mx-auto mb-6">
              Everything you need to raise<br />
              a healthy, thriving child
            </h2>
            <p className="section-subtitle mx-auto text-center">
              AI-powered tools backed by pediatric guidelines. Know when to act, when to wait, and when to celebrate.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 lg:p-10 rounded-3xl flex gap-6 transition-all duration-300 fade-in ${
                  feature.highlight
                    ? 'bg-forest text-white lg:col-span-2'
                    : 'bg-white border border-forest/5 hover:border-sage/30 hover:shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                  feature.highlight ? 'bg-white/15' : 'bg-mist'
                }`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-inherit mb-3">{feature.title}</h3>
                  <p className={`mb-4 leading-relaxed ${feature.highlight ? 'text-white/90' : 'text-forest/70'}`}>
                    {feature.description}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    feature.highlight ? 'bg-white/20 text-white' : 'bg-mist text-forest'
                  }`}>
                    {feature.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="fade-in">
                <div className="font-display text-4xl lg:text-5xl xl:text-6xl mb-2 tracking-tight">
                  {stat.value.includes('%') ? (
                    <>
                      {stat.value.replace('%', '')}
                      <span className="text-coral">%</span>
                    </>
                  ) : stat.value === '0' ? (
                    <span className="text-coral">0</span>
                  ) : (
                    <span className="text-coral">{stat.value}</span>
                  )}
                </div>
                <p className="text-sm lg:text-base text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-30 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-label">Parent Stories</span>
            <h2 className="section-title">
              Trusted by parents<br />
              across India
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-cream rounded-3xl p-8 relative fade-in">
                <span className="font-display text-6xl text-sage/20 absolute top-4 left-6 leading-none">
                  &ldquo;
                </span>
                <p className="text-forest/80 leading-relaxed mb-6 relative z-10">
                  {testimonial.quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-semibold text-forest">{testimonial.name}</p>
                    <p className="text-sm text-forest/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-20 lg:py-30 bg-cream relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-radial from-coral/5 via-transparent to-transparent" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-forest mb-6">
            Start your free trial today.<br />
            Your child&apos;s health can&apos;t wait.
          </h2>
          <p className="text-lg lg:text-xl text-forest/70 mb-10 max-w-xl mx-auto">
            Join 50,000+ parents who trust Pedi·Ai for instant, evidence-based guidance. No credit card required. Cancel anytime.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button variant="primary" size="lg">Get Started Free</Button>
            <Button variant="secondary" size="lg">Schedule a Demo</Button>
          </div>

          <p className="flex items-center justify-center gap-2 text-sm text-forest/60">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Your data is encrypted and HIPAA compliant
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="font-display text-2xl mb-4">
                Pedi<span className="text-coral">·</span>Ai
              </div>
              <p className="text-sm text-white/70 mb-6 max-w-xs">
                AI-powered pediatric care for the first 2,000 days. Evidence-based guidance for parents, powered by pediatric experts.
              </p>
              <div className="flex gap-3">
                {['𝕏', 'f', '📷', 'in'].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-coral transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'For Clinicians', 'For Healthcare Systems'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Resources</h4>
              <ul className="space-y-3">
                {['Help Center', 'Blog', 'Parenting Tips', 'Growth Charts'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Contact', 'Press Kit'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/80 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2026 Pedi·Ai. All rights reserved.</p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
