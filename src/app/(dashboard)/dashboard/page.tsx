'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/app/lib/auth-context'
import { useHealthLog, useMilestones, useGrowthRecords, useVaccinations, useMedications, useSymptomAssessments } from '@/app/lib/api-hooks'

// Helper to calculate age in months
const calculateAgeInMonths = (dob: string): string => {
  const birth = new Date(dob)
  const now = new Date()
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
  if (months < 1) return 'Newborn'
  if (months < 12) return `${months} month${months > 1 ? 's' : ''}`
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`
  return `${years}y ${remainingMonths}m`
}

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
  const { session, getActiveChild } = useAuth()
  const activeChild = getActiveChild()

  const { entries: healthLog } = useHealthLog()
  const { milestones, getDue: getDueMilestones } = useMilestones()
  const { records: growthRecords } = useGrowthRecords(activeChild?.id || '')
  const { vaccinations, getUpcoming: getUpcomingVaccinations, getOverdue: getOverdueVaccinations } = useVaccinations()
  const { medications } = useMedications()
  const { assessments } = useSymptomAssessments()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !activeChild) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-10 bg-mist/50 rounded w-1/3 mb-2"></div>
          <div className="h-5 bg-mist/50 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-mist/50 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  // Get latest growth data
  const latestGrowth = growthRecords.length > 0
    ? growthRecords[growthRecords.length - 1]
    : null

  const previousGrowth = growthRecords.length > 1
    ? growthRecords[growthRecords.length - 2]
    : null

  // Calculate trends
  const weightTrend = latestGrowth && previousGrowth
    ? `+${(latestGrowth.weight - previousGrowth.weight).toFixed(1)} kg`
    : null

  const heightTrend = latestGrowth && previousGrowth
    ? `+${(latestGrowth.height - previousGrowth.height).toFixed(1)} cm`
    : null

  const dueMilestones = getDueMilestones().slice(0, 3)
  const overdueVaccinations = getOverdueVaccinations()
  const upcomingVaccinations = getUpcomingVaccinations().slice(0, 2)
  const recentHealthLog = healthLog.slice(0, 5)

  return (
    <div className="space-y-8">
      {/* Welcome Greeting */}
      <section className="animate-fade-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-xl">
            {activeChild.avatar || '👶'}
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-forest">
              {getGreeting()}, {session?.user.name.split(' ')[0]}!
            </h1>
            <p className="text-forest/60">
              Here&apos;s {activeChild.name}&apos;s health summary for today.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:shadow-md bg-white border-mist/50 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-forest/50 uppercase tracking-wide">Weight</p>
              <p className="text-2xl font-semibold text-forest mt-1">
                {latestGrowth?.weight.toFixed(1) || activeChild.weight} kg
              </p>
            </div>
            {weightTrend && (
              <div className="flex items-center gap-1 text-sage text-xs font-medium bg-sage/10 px-2 py-1 rounded-full">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m5 10 7-7m0 0 7 7m-7-7v18" />
                </svg>
                {weightTrend}
              </div>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:shadow-md bg-white border-mist/50 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-forest/50 uppercase tracking-wide">Height</p>
              <p className="text-2xl font-semibold text-forest mt-1">
                {latestGrowth?.height || activeChild.height} cm
              </p>
            </div>
            {heightTrend && (
              <div className="flex items-center gap-1 text-sage text-xs font-medium bg-sage/10 px-2 py-1 rounded-full">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m5 10 7-7m0 0 7 7m-7-7v18" />
                </svg>
                {heightTrend}
              </div>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:shadow-md bg-white border-mist/50 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-forest/50 uppercase tracking-wide">Age</p>
              <p className="text-2xl font-semibold text-forest mt-1">
                {calculateAgeInMonths(activeChild.dateOfBirth)}
              </p>
            </div>
          </div>
        </div>

        <div className={`relative overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:shadow-md shadow-sm ${
          dueMilestones.length > 0 || overdueVaccinations.length > 0
            ? 'bg-coral/5 border-coral/30'
            : 'bg-white border-mist/50'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-forest/50 uppercase tracking-wide">Alerts</p>
              <p className={`text-2xl font-semibold mt-1 ${
                dueMilestones.length > 0 || overdueVaccinations.length > 0 ? 'text-coral' : 'text-forest'
              }`}>
                {dueMilestones.length + overdueVaccinations.length}
              </p>
            </div>
            {(dueMilestones.length > 0 || overdueVaccinations.length > 0) && (
              <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            )}
          </div>
          {(dueMilestones.length > 0 || overdueVaccinations.length > 0) && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-coral/10 text-coral text-xs font-semibold rounded-full">
                Action needed
              </span>
            </div>
          )}
        </div>
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
              {recentHealthLog.length > 0 ? recentHealthLog.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-4 p-4 bg-cream/50 rounded-xl hover:bg-cream transition-colors"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      entry.type === 'fever'
                        ? 'bg-danger-bg text-danger'
                        : entry.type === 'medicine'
                        ? 'bg-sage/10 text-sage'
                        : entry.type === 'checkup'
                        ? 'bg-forest/10 text-forest'
                        : 'bg-coral/10 text-coral'
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
                    {entry.type === 'checkup' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    )}
                    {entry.type === 'symptom' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-forest">{entry.title}</p>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        entry.status === 'resolved' ? 'bg-sage/10 text-sage' :
                        entry.status === 'active' ? 'bg-coral/10 text-coral' :
                        'bg-forest/5 text-forest/70'
                      }`}>
                        {entry.status}
                      </span>
                    </div>
                    <p className="text-sm text-forest/60">{entry.description}</p>
                    <p className="text-xs text-forest/40 mt-1.5">
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {entry.time && `, ${entry.time}`}
                    </p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-forest/50">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>No health entries yet</p>
                  <p className="text-sm mt-1">Start tracking {activeChild.name}&apos;s health</p>
                </div>
              )}
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
              {dueMilestones.length > 0 ? dueMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-3 p-3 bg-cream/50 rounded-xl hover:bg-cream transition-colors"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    milestone.status === 'completed'
                      ? 'bg-sage text-white'
                      : 'bg-coral/10 text-coral'
                  }`}>
                    {milestone.status === 'completed' ? (
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-coral" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${milestone.status === 'completed' ? 'text-forest/50 line-through' : 'text-forest'}`}>
                      {milestone.title}
                    </p>
                    <p className="text-xs text-forest/50 capitalize">{milestone.domain} · Due {new Date(milestone.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-forest/50">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <p>No milestones due</p>
                </div>
              )}
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
          {growthRecords.length > 0 ? (
            <div className="h-40 flex items-end justify-between gap-3 px-4">
              {growthRecords.slice(-6).map((data, index) => {
                const maxHeight = Math.max(...growthRecords.slice(-6).map(d => d.height))
                const minHeight = Math.min(...growthRecords.slice(-6).map(d => d.height))
                const heightRange = maxHeight - minHeight || 1
                const barHeight = 40 + ((data.height - minHeight) / heightRange) * 100

                return (
                  <div key={data.date} className="flex flex-col items-center gap-2 flex-1">
                    <div className="relative w-full flex items-center justify-center">
                      <div
                        className={`w-full max-w-12 rounded-t-lg transition-all duration-500 ${
                          index === growthRecords.slice(-6).length - 1
                            ? 'bg-gradient-to-t from-sage to-sage/70 shadow-lg shadow-sage/20'
                            : 'bg-sage/20'
                        }`}
                        style={{ height: `${barHeight}px` }}
                      />
                      <span className="absolute -top-6 text-xs font-medium text-forest/60">
                        {data.height}cm
                      </span>
                    </div>
                    <span className="text-xs text-forest/50 font-medium">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-forest/50">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                <p>No growth records yet</p>
              </div>
            </div>
          )}
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
