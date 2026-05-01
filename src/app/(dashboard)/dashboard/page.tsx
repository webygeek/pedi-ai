'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

// Mock data for the dashboard
const childProfile = {
  name: 'Aarav',
  greeting: 'Good morning',
}

const quickStats = [
  { label: 'Weight', value: '12.5 kg', trend: '+0.3 kg', status: 'normal' },
  { label: 'Height', value: '88 cm', trend: '+1.2 cm', status: 'normal' },
  { label: 'Last Checkup', value: '3 days ago', status: 'info' },
  { label: 'Milestones', value: '2 due', status: 'warning' },
]

const recentHealthLog = [
  {
    id: 1,
    title: 'Fever recorded',
    description: 'Temperature: 100.4°F, Duration: 2 days',
    time: 'Yesterday, 9:30 AM',
    type: 'fever',
    status: 'resolved',
  },
  {
    id: 2,
    title: 'Medicine given',
    description: 'Paracetamol 5ml - Fever reducer',
    time: 'Yesterday, 9:35 AM',
    type: 'medicine',
    status: 'resolved',
  },
  {
    id: 3,
    title: 'Wellness check',
    description: 'Normal appetite and activity',
    time: '2 days ago',
    type: 'note',
    status: 'normal',
  },
]

const upcomingMilestones = [
  { id: 1, title: 'Says 10+ words', domain: 'Language', due: 'This month', completed: false },
  { id: 2, title: 'Jumps with both feet', domain: 'Motor', due: 'This month', completed: false },
  { id: 3, title: 'Parallel play', domain: 'Social', due: 'Next month', completed: false },
]

const growthData = [
  { month: 'Jan', height: 78 },
  { month: 'Feb', height: 80 },
  { month: 'Mar', height: 82 },
  { month: 'Apr', height: 84 },
  { month: 'May', height: 85 },
  { month: 'Jun', height: 87 },
]

const quickActions = [
  {
    title: 'Symptom Check',
    description: 'AI-powered triage',
    href: '/symptom-check',
    color: 'coral',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: 'Growth Charts',
    description: 'Track progress',
    href: '/growth-charts',
    color: 'sage',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    title: 'Vaccinations',
    description: 'Track immunizations',
    href: '/vaccinations',
    color: 'sage',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'AI Consultant',
    description: '24/7 support',
    href: '/consultant',
    color: 'forest',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
  },
]

const getColorClasses = (color: string) => {
  switch (color) {
    case 'coral':
      return { bg: 'bg-coral/5', text: 'text-coral', border: 'border-coral/20', hover: 'hover:bg-coral/10' }
    case 'sage':
      return { bg: 'bg-sage/10', text: 'text-sage', border: 'border-sage/20', hover: 'hover:bg-sage/15' }
    case 'forest':
      return { bg: 'bg-forest/5', text: 'text-forest', border: 'border-forest/20', hover: 'hover:bg-forest/10' }
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', hover: 'hover:bg-gray-100' }
  }
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const maxHeight = Math.max(...growthData.map((d) => d.height))
  const greeting = childProfile.greeting

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Welcome Greeting */}
      <section className="animate-fade-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-forest">
              {greeting}, Parent!
            </h1>
            <p className="text-forest/60">
              Here&apos;s {childProfile.name}&apos;s health summary for today.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:shadow-md ${
              stat.status === 'warning'
                ? 'bg-coral/5 border-coral/30 shadow-sm'
                : 'bg-white border-mist/50 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-forest/50 uppercase tracking-wide">{stat.label}</p>
                <p className={`text-2xl font-semibold text-forest mt-1 ${stat.status === 'warning' ? 'text-coral' : ''}`}>
                  {stat.value}
                </p>
              </div>
              {stat.status === 'warning' && (
                <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              )}
            </div>
            {stat.trend && (
              <div className="flex items-center gap-1.5 mt-2">
                <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m5 10 7-7m0 0 7 7m-7-7v18" />
                </svg>
                <span className="text-xs font-medium text-sage">{stat.trend}</span>
              </div>
            )}
            {stat.status === 'warning' && (
              <div className="mt-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-coral/10 text-coral text-xs font-semibold rounded-full">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  Action needed
                </span>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Health Log */}
        <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="font-display text-lg text-forest">Recent Health Log</h2>
              </div>
              <Link href="/medical-history" className="text-sm font-medium text-sage hover:text-forest transition-colors flex items-center gap-1">
                View all
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="space-y-3">
              {recentHealthLog.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-4 p-4 bg-cream/50 rounded-xl hover:bg-cream transition-colors"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      entry.type === 'fever'
                        ? 'bg-red-50 text-red-500'
                        : entry.type === 'medicine'
                        ? 'bg-sage/10 text-sage'
                        : 'bg-forest/5 text-forest'
                    }`}
                  >
                    {entry.type === 'fever' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                      </svg>
                    )}
                    {entry.type === 'medicine' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M10.5 2.25H4.5a2 2 0 00-2 2v15a2 2 0 002 2h15a2 2 0 002-2v-6a2 2 0 00-2-2h-6l-2-2H4.5a2 2 0 00-2 2v2.25" />
                        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                    {entry.type === 'note' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-1.227l-3.356 1.346a1 1 0 01-1.414-1.414l1.346-3.356A9.863 9.863 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-forest">{entry.title}</p>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        entry.status === 'resolved' ? 'bg-sage/10 text-sage' : 'bg-forest/5 text-forest/70'
                      }`}>
                        {entry.status}
                      </span>
                    </div>
                    <p className="text-sm text-forest/60">{entry.description}</p>
                    <p className="text-xs text-forest/40 mt-1.5">{entry.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Milestones */}
        <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                  </svg>
                </div>
                <h2 className="font-display text-lg text-forest">Milestones Due</h2>
              </div>
              <Link href="/milestones" className="text-sm font-medium text-sage hover:text-forest transition-colors flex items-center gap-1">
                View all
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingMilestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-3 p-3 bg-cream/50 rounded-xl hover:bg-cream transition-colors"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    milestone.completed
                      ? 'bg-sage text-white'
                      : 'bg-coral/10 text-coral'
                  }`}>
                    {milestone.completed ? (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-coral" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${milestone.completed ? 'text-forest/50 line-through' : 'text-forest'}`}>
                      {milestone.title}
                    </p>
                    <p className="text-xs text-forest/50">{milestone.domain} · {milestone.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <section className="animate-fade-up" style={{ animationDelay: '400ms' }}>
        <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-forest/5 flex items-center justify-center">
                <svg className="w-4 h-4 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h2 className="font-display text-lg text-forest">Growth Progress</h2>
            </div>
            <Link href="/growth-charts" className="text-sm font-medium text-sage hover:text-forest transition-colors flex items-center gap-1">
              View details
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="h-40 flex items-end justify-between gap-3 px-4">
            {growthData.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center gap-2 flex-1">
                <div className="relative w-full flex items-center justify-center">
                  <div
                    className={`w-full max-w-12 rounded-t-lg transition-all duration-500 ${
                      index === growthData.length - 1
                        ? 'bg-gradient-to-t from-sage to-sage/70 shadow-lg shadow-sage/20'
                        : 'bg-sage/20'
                    }`}
                    style={{ height: `${(data.height / maxHeight) * 140}px` }}
                  />
                  <span className="absolute -top-6 text-xs font-medium text-forest/60">
                    {data.height}cm
                  </span>
                </div>
                <span className="text-xs text-forest/50 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-t from-sage to-sage/70" />
              <span className="text-forest/60">Latest</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sage/20" />
              <span className="text-forest/60">Previous</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="animate-fade-up" style={{ animationDelay: '500ms' }}>
        <h2 className="font-display text-lg text-forest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const colors = getColorClasses(action.color)
            return (
              <Link
                key={action.title}
                href={action.href}
                className={`group relative overflow-hidden rounded-2xl border ${colors.border} p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colors.bg}`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${colors.bg} ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="font-semibold text-forest">{action.title}</h3>
                <p className="text-sm text-forest/60 mt-1">{action.description}</p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Trust Footer */}
      <footer className="text-center pt-6 border-t border-mist/50 animate-fade-up" style={{ animationDelay: '600ms' }}>
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-forest/5 rounded-full">
          <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <span className="text-sm text-forest/70">
            <strong className="font-semibold">IAP Clinically Reviewed</strong> · WHO Growth Standards
          </span>
        </div>
      </footer>
    </div>
  )
}
