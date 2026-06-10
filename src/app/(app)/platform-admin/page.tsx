'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/lib/auth-context';
import { IsPlatformAdmin } from '@/app/lib/rbac';
import { usePlatformAlerts, useAuditLogs, getPlatformStats } from '@/app/lib/role-api-hooks';

export default function PlatformAdminDashboard() {
  const { session } = useAuth();
  const { alerts, isLoading: alertsLoading } = usePlatformAlerts();
  const { logs } = useAuditLogs();
  const stats = getPlatformStats();

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
      case 'error': return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'info': return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      default: return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      );
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-amber-200 bg-amber-50 text-amber-800';
      case 'error': return 'border-coral/30 bg-coral/5 text-coral';
      case 'info': return 'border-sage/30 bg-sage/10 text-forest';
      default: return 'border-mist/50 bg-mist/30 text-forest';
    }
  };

  const getAlertIconBg = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-amber-100 text-amber-600';
      case 'error': return 'bg-coral/10 text-coral';
      case 'info': return 'bg-sage/20 text-forest';
      default: return 'bg-mist text-forest/60';
    }
  };

  // Recent activity from audit logs
  const recentActivity = logs.slice(0, 5).map(log => ({
    icon: log.action === 'LOGIN' ? '🔐' : log.action === 'CREATE' ? '✨' : log.action === 'UPDATE' ? '📝' : log.action === 'DELETE' ? '🗑️' : '📋',
    description: `${log.action}: ${log.resource} by ${log.userName}`,
    time: formatTimestamp(log.timestamp)
  }));

  return (
    <IsPlatformAdmin fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-forest mb-2">Access Denied</h1>
          <p className="text-forest/60">You need platform admin privileges to access this page.</p>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-white border-b border-mist/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-display font-bold text-forest">
                  Platform Admin Dashboard
                </h1>
                <p className="text-forest/60 mt-1">
                  Welcome back, {session?.user?.name || 'Admin'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-coral/10 text-coral rounded-full text-sm font-medium">
                  Platform Admin
                </span>
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              }
              label="Total Users"
              value={stats.totalUsers.toLocaleString()}
              color="sage"
            />
            <StatCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              label="Active Clinics"
              value={stats.activeClinics.toString()}
              color="forest"
            />
            <StatCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              }
              label="Total Appointments"
              value={stats.totalAppointments.toLocaleString()}
              color="coral"
            />
            <StatCard
              icon={
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
              label="Issues Reported"
              value={stats.issuesReported.toString()}
              color="amber"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Links */}
              <section className="bg-white rounded-2xl border border-mist/50 p-6">
                <h2 className="text-lg font-display font-semibold text-forest mb-4">Quick Links</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <QuickLink
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                      </svg>
                    }
                    label="User Management"
                    href="/platform-admin/users"
                  />
                  <QuickLink
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    }
                    label="Audit Logs"
                    href="/platform-admin/audit"
                  />
                  <QuickLink
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                    label="Clinics"
                    href="/clinic-admin/clinics"
                  />
                  <QuickLink
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    }
                    label="Analytics"
                    href="/platform-admin/users"
                  />
                  <QuickLink
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                    label="System Config"
                    href="/settings"
                  />
                  <QuickLink
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                    label="Content Moderation"
                    href="/platform-admin/users"
                  />
                  <QuickLink
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    }
                    label="Security"
                    href="/platform-admin/audit"
                  />
                  <QuickLink
                    icon={
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    }
                    label="Backups"
                    href="/platform-admin/audit"
                  />
                </div>
              </section>

              {/* Platform Activity */}
              <section className="bg-white rounded-2xl border border-mist/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-display font-semibold text-forest">Recent Platform Activity</h2>
                  <Link
                    href="/platform-admin/audit"
                    className="text-sm text-coral hover:text-coral/80 font-medium flex items-center gap-1"
                  >
                    View all
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <ActivityItem
                      key={index}
                      icon={activity.icon}
                      description={activity.description}
                      time={activity.time}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Alerts Panel */}
              <section className="bg-white rounded-2xl border border-mist/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-display font-semibold text-forest">Alerts</h2>
                  <span className="px-2 py-1 bg-coral/10 text-coral text-xs font-medium rounded-full">
                    {alerts.length}
                  </span>
                </div>
                {alertsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse">
                        <div className="h-20 bg-mist/30 rounded-xl" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-xl border ${getAlertColor(alert.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getAlertIconBg(alert.type)}`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{alert.title}</p>
                            <p className="text-xs mt-1 opacity-80">{alert.message}</p>
                            <p className="text-xs mt-2 opacity-60">{formatTimestamp(alert.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* System Health */}
              <section className="bg-white rounded-2xl border border-mist/50 p-6">
                <h2 className="text-lg font-display font-semibold text-forest mb-4">System Health</h2>
                <div className="space-y-4">
                  <HealthMetric label="Server Status" status="healthy" />
                  <HealthMetric label="Database" status="healthy" />
                  <HealthMetric label="Storage" status="warning" usage="75%" />
                  <HealthMetric label="API Response" status="healthy" value="45ms avg" />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </IsPlatformAdmin>
  );
}

function StatCard({
  icon,
  label,
  value,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'forest' | 'sage' | 'coral' | 'amber';
}) {
  const colors = {
    forest: 'bg-forest/10 text-forest',
    sage: 'bg-sage/20 text-forest',
    coral: 'bg-coral/10 text-coral',
    amber: 'bg-amber-100 text-amber-600'
  };

  return (
    <div className="bg-white rounded-2xl border border-mist/50 p-6">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors[color]} mb-4`}>
        {icon}
      </div>
      <p className="text-3xl font-display font-bold text-forest">{value}</p>
      <p className="text-sm text-forest/60 mt-1">{label}</p>
    </div>
  );
}

function QuickLink({
  icon,
  label,
  href
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-3 p-4 rounded-xl border border-mist/50 hover:border-sage/50 hover:bg-sage/5 transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-mist/30 flex items-center justify-center text-forest group-hover:bg-sage/20 transition-colors">
        {icon}
      </div>
      <span className="text-sm font-medium text-forest text-center">{label}</span>
    </Link>
  );
}

function ActivityItem({
  icon,
  description,
  time
}: {
  icon: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-10 h-10 bg-mist/30 rounded-xl flex items-center justify-center">
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-forest">{description}</p>
        <p className="text-xs text-forest/50 mt-1">{time}</p>
      </div>
    </div>
  );
}

function HealthMetric({
  label,
  status,
  value,
  usage
}: {
  label: string;
  status: 'healthy' | 'warning' | 'error';
  value?: string;
  usage?: string;
}) {
  const statusColors = {
    healthy: 'bg-sage text-forest',
    warning: 'bg-amber-100 text-amber-600',
    error: 'bg-coral/10 text-coral'
  };

  const barColors = {
    healthy: 'bg-sage',
    warning: 'bg-amber-400',
    error: 'bg-coral'
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-forest/70">{label}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[status]}`}>
          {usage || (value || 'Healthy')}
        </span>
      </div>
      <div className="w-full bg-mist/50 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${barColors[status]}`}
          style={{ width: status === 'healthy' ? '100%' : usage || '100%' }}
        />
      </div>
    </div>
  );
}
