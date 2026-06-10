'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { Users, Activity, TrendingUp, AlertTriangle, Shield, Clock, CheckCircle, XCircle } from 'lucide-react'

interface StatsCard {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: React.ReactNode
  color: string
}

interface RecentUser {
  id: string
  name: string
  email: string
  role: 'parent' | 'doctor'
  status: 'active' | 'inactive'
  lastActive: string
}

interface Alert {
  id: string
  type: 'warning' | 'info' | 'success'
  message: string
  time: string
}

const statsCards: StatsCard[] = [
  {
    title: 'Total Users',
    value: 1247,
    change: '+12%',
    trend: 'up',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-blue-500'
  },
  {
    title: 'Active Sessions',
    value: 89,
    change: '+5%',
    trend: 'up',
    icon: <Activity className="w-6 h-6" />,
    color: 'bg-green-500'
  },
  {
    title: 'AI Triage Accuracy',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'bg-purple-500'
  },
  {
    title: 'Flagged Cases',
    value: 7,
    change: '-3',
    trend: 'down',
    icon: <AlertTriangle className="w-6 h-6" />,
    color: 'bg-amber-500'
  }
]

const recentUsers: RecentUser[] = [
  { id: '1', name: 'Priya Sharma', email: 'priya@example.com', role: 'parent', status: 'active', lastActive: '2 min ago' },
  { id: '2', name: 'Dr. Amit Patel', email: 'amit@hospital.com', role: 'doctor', status: 'active', lastActive: '5 min ago' },
  { id: '3', name: 'Rahul Gupta', email: 'rahul@example.com', role: 'parent', status: 'inactive', lastActive: '2 hours ago' },
  { id: '4', name: 'Dr. Sneha Kumar', email: 'sneha@clinic.com', role: 'doctor', status: 'active', lastActive: '10 min ago' },
  { id: '5', name: 'Anita Desai', email: 'anita@example.com', role: 'parent', status: 'active', lastActive: '15 min ago' },
]

const alerts: Alert[] = [
  { id: '1', type: 'warning', message: '3 AI triage cases flagged for clinical review', time: '10 min ago' },
  { id: '2', type: 'info', message: 'New doctor registration pending verification', time: '1 hour ago' },
  { id: '3', type: 'success', message: 'System backup completed successfully', time: '3 hours ago' },
  { id: '4', type: 'warning', message: 'High volume of symptom checks detected', time: '5 hours ago' },
]

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="animate-fade-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2c4a45] to-[#3d5a52] flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-forest">
              Admin Dashboard
            </h1>
            <p className="text-forest/60">
              Welcome back, {user?.name}. Here&apos;s your platform overview.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
        {statsCards.map((stat, index) => (
          <div
            key={stat.title}
            className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-forest/60">{stat.title}</p>
                <p className="text-3xl font-bold text-forest mt-2">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-2 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-green-600' : 'text-forest/40'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                  {stat.trend === 'down' && <TrendingUp className="w-4 h-4 rotate-180" />}
                  <span>{stat.change}</span>
                  <span className="text-forest/40">vs last week</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <div className="lg:col-span-2 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="font-display text-lg text-forest">Recent Users</h2>
              </div>
              <button className="text-sm font-medium text-sage hover:text-forest transition-colors">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 bg-cream/50 rounded-xl hover:bg-cream transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#2c4a45]/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#2c4a45]">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-forest">{user.name}</p>
                    <p className="text-sm text-forest/60">{user.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      user.role === 'doctor'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-forest/40">
                      <Clock className="w-3 h-3" />
                      {user.lastActive}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <h2 className="font-display text-lg text-forest">Alerts</h2>
              </div>
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                {alerts.length}
              </span>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 rounded-xl ${
                    alert.type === 'warning' ? 'bg-amber-50 border border-amber-200' :
                    alert.type === 'info' ? 'bg-blue-50 border border-blue-200' :
                    'bg-green-50 border border-green-200'
                  }`}
                >
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />}
                  {alert.type === 'info' && <Activity className="w-5 h-5 text-blue-600 flex-shrink-0" />}
                  {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      alert.type === 'warning' ? 'text-amber-800' :
                      alert.type === 'info' ? 'text-blue-800' :
                      'text-green-800'
                    }`}>
                      {alert.message}
                    </p>
                    <p className={`text-xs mt-1 ${
                      alert.type === 'warning' ? 'text-amber-600' :
                      alert.type === 'info' ? 'text-blue-600' :
                      'text-green-600'
                    }`}>
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="animate-fade-up" style={{ animationDelay: '400ms' }}>
        <h2 className="font-display text-lg text-forest mb-4">Admin Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'User Management', icon: Users, color: 'blue' },
            { title: 'Review Cases', icon: AlertTriangle, color: 'amber' },
            { title: 'Content Settings', icon: Shield, color: 'green' },
            { title: 'Audit Logs', icon: Activity, color: 'purple' },
          ].map((action) => (
            <button
              key={action.title}
              className={`flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-2xl border border-mist/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                action.color === 'amber' ? 'bg-amber-100 text-amber-600' :
                action.color === 'green' ? 'bg-green-100 text-green-600' :
                'bg-purple-100 text-purple-600'
              }`}>
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-forest text-center">{action.title}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
