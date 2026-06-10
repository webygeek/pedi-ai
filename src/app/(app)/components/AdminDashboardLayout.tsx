'use client';

import React from 'react';
import Sidebar from '@/app/components/ui/Sidebar';
import { useAuth } from '@/app/lib/auth-context';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'blue' | 'green' | 'amber' | 'purple' | 'red';
}

export default function AdminDashboardLayout({
  children,
  title,
  subtitle,
  badge = 'Admin',
  badgeColor = 'blue'
}: AdminDashboardLayoutProps) {
  const { session } = useAuth();

  const badgeColors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    amber: 'bg-amber-100 text-amber-700',
    purple: 'bg-purple-100 text-purple-700',
    red: 'bg-danger-bg text-danger'
  };

  const getRoleIcon = () => {
    if (badge.includes('Platform')) return '🔐';
    if (badge.includes('Clinic')) return '🏥';
    if (badge.includes('Doctor')) return '👨‍⚕️';
    if (badge.includes('Nurse')) return '👩‍⚕️';
    return '👤';
  };

  return (
    <div className="min-h-screen bg-mist flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:pl-72">
        {/* Header */}
        <header className="bg-white border-b border-mist/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-display font-semibold text-forest">
                  {title}
                </h1>
                <p className="text-forest/60 mt-1">
                  {subtitle || `Welcome, ${session?.user?.name || 'Admin'}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColors[badgeColor]}`}>
                  {badge}
                </span>
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                  <span className="text-lg">{getRoleIcon()}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// Loading state component
export function AdminLoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-sage border-t-transparent"></div>
    </div>
  );
}

// Empty state component
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminEmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-mist/50 flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-forest mb-2">{title}</h3>
      {description && (
        <p className="text-forest/60 mb-4 max-w-sm">{description}</p>
      )}
      {action}
    </div>
  );
}

// Stat card component for admin dashboards
interface AdminStatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    positive: boolean;
  };
  color: 'blue' | 'green' | 'amber' | 'purple' | 'red';
}

export function AdminStatCard({ icon, label, value, trend, color }: AdminStatCardProps) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-danger-bg text-danger'
  };

  return (
    <div className="bg-white rounded-xl border border-mist/50 p-6 hover:shadow-sm transition-shadow">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors[color]} mb-4`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-display font-bold text-forest mb-1">{value}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-forest/60">{label}</p>
        {trend && (
          <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-danger'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

// Card section component
interface AdminCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function AdminCard({ title, subtitle, action, children, className = '' }: AdminCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-mist/50 overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-mist/50 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-forest">{title}</h3>
          {subtitle && <p className="text-sm text-forest/60 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
