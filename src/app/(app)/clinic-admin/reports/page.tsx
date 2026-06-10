'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IsClinicAdmin } from '@/app/lib/rbac';

type DateRange = 'today' | 'week' | 'month' | 'quarter' | 'custom';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('month');

  // Demo report data
  const reports = {
    patientVisits: {
      total: 1250,
      change: 12,
      trend: 'up' as const,
    },
    staffPerformance: {
      avgPatientsPerDay: 45,
      avgRating: 4.8,
      completionRate: 94,
    },
    revenue: {
      total: 125000,
      change: 8,
      trend: 'up' as const,
    },
    vaccinations: {
      total: 380,
      completed: 320,
      pending: 60,
    },
  };

  // Simple bar chart data
  const chartData = [
    { label: 'Week 1', value: 280 },
    { label: 'Week 2', value: 320 },
    { label: 'Week 3', value: 290 },
    { label: 'Week 4', value: 360 },
  ];
  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <IsClinicAdmin fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You need clinic admin privileges to access this page.</p>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Link href="/clinic-admin" className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                  <span className="text-gray-400">/</span>
                  <span className="text-gray-500 text-sm">Reports</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Clinic Reports</h1>
                <p className="text-gray-500 mt-1">Analytics and performance metrics</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as DateRange)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="custom">Custom Range</option>
                </select>
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ReportCard
              icon="👥"
              label="Patient Visits"
              value={reports.patientVisits.total.toLocaleString()}
              change={reports.patientVisits.change}
              trend={reports.patientVisits.trend}
              color="blue"
            />
            <ReportCard
              icon="👨‍⚕️"
              label="Staff Performance"
              value={`${reports.staffPerformance.completionRate}%`}
              subtitle="Completion rate"
              color="green"
            />
            <ReportCard
              icon="💰"
              label="Revenue"
              value={`$${(reports.revenue.total / 1000).toFixed(1)}k`}
              change={reports.revenue.change}
              trend={reports.revenue.trend}
              color="purple"
            />
            <ReportCard
              icon="💉"
              label="Vaccinations"
              value={reports.vaccinations.total.toString()}
              subtitle={`${reports.vaccinations.completed} completed`}
              color="amber"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Patient Visits Chart */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Patient Visits Trend</h2>
              <div className="h-64 flex items-end justify-between gap-4">
                {chartData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-primary-100 rounded-t-lg relative" style={{ height: `${(item.value / maxValue) * 200}px` }}>
                      <div className="absolute inset-0 bg-primary-500 rounded-t-lg" style={{ height: '100%' }} />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{item.label}</p>
                    <p className="text-sm font-medium text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Staff Performance Table */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Staff Performance</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase py-3">Staff</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase py-3">Patients Today</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase py-3">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 flex items-center gap-2">
                        <span className="text-lg">👨‍⚕️</span>
                        <span className="font-medium text-gray-900">Dr. Emily Chen</span>
                      </td>
                      <td className="py-3 text-gray-600">18</td>
                      <td className="py-3">
                        <span className="text-amber-500">★★★★★</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 flex items-center gap-2">
                        <span className="text-lg">👩‍⚕️</span>
                        <span className="font-medium text-gray-900">Nurse Lisa Martinez</span>
                      </td>
                      <td className="py-3 text-gray-600">24</td>
                      <td className="py-3">
                        <span className="text-amber-500">★★★★★</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 flex items-center gap-2">
                        <span className="text-lg">👨‍⚕️</span>
                        <span className="font-medium text-gray-900">Dr. Michael Sharma</span>
                      </td>
                      <td className="py-3 text-gray-600">15</td>
                      <td className="py-3">
                        <span className="text-amber-500">★★★★☆</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 flex items-center gap-2">
                        <span className="text-lg">👩‍⚕️</span>
                        <span className="font-medium text-gray-900">Nurse Amanda Brown</span>
                      </td>
                      <td className="py-3 text-gray-600">20</td>
                      <td className="py-3">
                        <span className="text-amber-500">★★★★★</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Vaccination Status */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Vaccination Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <p className="text-4xl font-bold text-green-600">{reports.vaccinations.completed}</p>
                <p className="text-sm text-gray-500 mt-1">Completed</p>
              </div>
              <div className="text-center p-6 bg-amber-50 rounded-xl">
                <p className="text-4xl font-bold text-amber-600">{reports.vaccinations.pending}</p>
                <p className="text-sm text-gray-500 mt-1">Pending</p>
              </div>
              <div className="text-center p-6 bg-primary-50 rounded-xl">
                <p className="text-4xl font-bold text-primary-600">
                  {Math.round((reports.vaccinations.completed / reports.vaccinations.total) * 100)}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Completion Rate</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </IsClinicAdmin>
  );
}

function ReportCard({
  icon,
  label,
  value,
  change,
  trend,
  subtitle,
  color
}: {
  icon: string;
  label: string;
  value: string;
  change?: number;
  trend?: 'up' | 'down';
  subtitle?: string;
  color: 'blue' | 'green' | 'amber' | 'purple';
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colors[color]} mb-3`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change !== undefined && trend && (
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-danger'}`}>
            {trend === 'up' ? '↑' : '↓'} {change}%
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}