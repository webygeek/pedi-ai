'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import Link from 'next/link'
import { useState } from 'react'
import { Users, Activity, AlertTriangle, CheckCircle, Clock, Calendar, TrendingUp } from 'lucide-react'

const doctorStats = [
  { label: 'Patients Today', value: '12', icon: Users, color: 'blue' },
  { label: 'Pending Triage', value: '5', icon: AlertTriangle, color: 'amber' },
  { label: 'Completed', value: '7', icon: CheckCircle, color: 'green' },
  { label: 'Avg Response', value: '23m', icon: Clock, color: 'purple' },
]

const recentTriage = [
  { patient: 'Aarav Sharma', triage: 'home-care', status: 'pending', time: '5 min ago' },
  { patient: 'Diya Patel', triage: 'urgent-care', status: 'pending', time: '12 min ago' },
  { patient: 'Rohan Gupta', triage: 'emergency', status: 'reviewed', time: '1 hour ago' },
]

const upcomingPatients = [
  { name: 'Ananya Singh', time: '10:30 AM', type: 'Follow-up' },
  { name: 'Vivaan Mehta', time: '11:00 AM', type: 'Vaccination' },
  { name: 'Myra Kapoor', time: '11:30 AM', type: 'New Patient' },
]

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect admin users to admin dashboard
  useEffect(() => {
    if (mounted && !isLoading && user?.role === 'admin') {
      router.push('/admin')
    }
  }, [mounted, isLoading, user, router])

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin w-8 h-8 border-4 border-sage border-t-transparent rounded-full" />
      </div>
    )
  }

  // Doctor Dashboard
  if (user?.role === 'doctor') {
    return (
      <div className="space-y-8">
        {/* Welcome */}
        <section className="animate-fade-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[#2c4a45]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#2c4a45]" />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl text-forest">
                Good morning, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-forest/60">
                {user?.specialty || 'Pediatrician'} · {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
          {doctorStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-mist/50 p-5 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-forest">{stat.value}</p>
              <p className="text-sm text-forest/60">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pending Triage */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-mist/50 p-6 shadow-sm animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="font-display text-lg text-forest">Pending Triage Review</h2>
              </div>
              <Link href="/triage-review" className="text-sm font-medium text-sage hover:text-forest">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recentTriage.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-cream/50 rounded-xl hover:bg-cream transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.triage === 'emergency' ? 'bg-red-100 text-red-600' :
                    item.triage === 'urgent-care' ? 'bg-amber-100 text-amber-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {item.triage === 'emergency' ? <AlertTriangle className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-forest">{item.patient}</p>
                    <p className="text-sm text-forest/60 capitalize">{item.triage.replace('-', ' ')}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      item.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                    <p className="text-xs text-forest/40 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Patients */}
          <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm animate-fade-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-sage/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-sage" />
              </div>
              <h2 className="font-display text-lg text-forest">Today&apos;s Schedule</h2>
            </div>
            <div className="space-y-3">
              {upcomingPatients.map((patient, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-cream/50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-[#2c4a45]/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#2c4a45]">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-forest">{patient.name}</p>
                    <p className="text-xs text-forest/60">{patient.type}</p>
                  </div>
                  <span className="text-xs text-forest/50">{patient.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="animate-fade-up" style={{ animationDelay: '400ms' }}>
          <h2 className="font-display text-lg text-forest mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Review Triage', href: '/triage-review', color: 'amber', icon: AlertTriangle },
              { title: 'Patient Records', href: '/patients', color: 'blue', icon: Users },
              { title: 'Drug Checker', href: '/drug-interactions', color: 'purple', icon: Activity },
              { title: 'Growth Reference', href: '/growth-reference', color: 'green', icon: TrendingUp },
            ].map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className={`flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-2xl border border-mist/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all ${
                  action.color === 'amber' ? 'hover:border-amber-200' :
                  action.color === 'blue' ? 'hover:border-blue-200' :
                  action.color === 'purple' ? 'hover:border-purple-200' :
                  'hover:border-green-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  action.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                  action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  action.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-forest text-center">{action.title}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    )
  }

  // If user is admin, don't render parent dashboard
  if (user?.role === 'admin') {
    return null
  }

  // Parent Dashboard (existing content)
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
              Good morning, {user?.name?.split(' ')[0] || 'Parent'}!
            </h1>
            <p className="text-forest/60">
              Here&apos;s your health summary for today.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {[
          { label: 'Weight', value: '12.5 kg', trend: '+0.3 kg' },
          { label: 'Height', value: '88 cm', trend: '+1.2 cm' },
          { label: 'Last Checkup', value: '3 days ago' },
          { label: 'Milestones', value: '2 due' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-mist/50 p-5 shadow-sm">
            <p className="text-xs font-medium text-forest/50 uppercase tracking-wide">{stat.label}</p>
            <p className="text-2xl font-semibold text-forest mt-1">{stat.value}</p>
            {stat.trend && (
              <div className="flex items-center gap-1.5 mt-2">
                <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m5 10 7-7m0 0 7 7m-7-7v18" />
                </svg>
                <span className="text-xs font-medium text-sage">{stat.trend}</span>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="animate-fade-up" style={{ animationDelay: '200ms' }}>
        <h2 className="font-display text-lg text-forest mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Symptom Check', href: '/symptom-check', color: 'coral' },
            { title: 'Growth Charts', href: '/growth-charts', color: 'sage' },
            { title: 'Vaccinations', href: '/vaccinations', color: 'sage' },
            { title: 'AI Consultant', href: '/consultant', color: 'forest' },
          ].map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className={`flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-2xl border border-mist/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all ${
                action.color === 'coral' ? 'border-coral/20 hover:bg-coral/5' :
                action.color === 'sage' ? 'border-sage/20 hover:bg-sage/5' :
                'border-forest/20 hover:bg-forest/5'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                action.color === 'coral' ? 'bg-coral/10 text-coral' :
                action.color === 'sage' ? 'bg-sage/10 text-sage' :
                'bg-forest/10 text-forest'
              }`}>
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-forest text-center">{action.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
