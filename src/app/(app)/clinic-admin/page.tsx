'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/lib/auth-context';
import { IsClinicAdmin } from '@/app/lib/rbac';
import { ClinicSelector } from './components/ClinicSelector';
import { useClinics, getClinicStats } from '@/app/lib/role-api-hooks';

export default function ClinicAdminDashboard() {
  const { session } = useAuth();
  const { clinics, isLoading: clinicsLoading } = useClinics();
  const [selectedClinicId, setSelectedClinicId] = useState(clinics[0]?.id || 'clinic_001');

  const selectedClinic = clinics.find(c => c.id === selectedClinicId) || clinics[0];
  const stats = getClinicStats(selectedClinicId);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'patient_added': return '👶';
      case 'appointment': return '📅';
      case 'staff_update': return '👨‍⚕️';
      case 'vaccination': return '💉';
      case 'report': return '📊';
      default: return '📋';
    }
  };

  // Demo activity data (inline for now)
  const demoActivity = [
    { id: 'a1', type: 'patient_added', description: 'New patient registered: Emma Thompson', user: 'System', timestamp: '2026-06-08T10:00:00Z' },
    { id: 'a2', type: 'appointment', description: 'Appointment booked for June 15th', user: 'Parent', timestamp: '2026-06-08T09:30:00Z' },
    { id: 'a3', type: 'staff_update', description: 'Dr. Sharma updated profile', user: 'Dr. Sharma', timestamp: '2026-06-08T08:00:00Z' },
    { id: 'a4', type: 'vaccination', description: '15 vaccinations administered today', user: 'Nurses', timestamp: '2026-06-07T17:00:00Z' },
    { id: 'a5', type: 'report', description: 'Monthly report generated', user: 'System', timestamp: '2026-06-07T08:00:00Z' },
    { id: 'a6', type: 'patient_added', description: 'New patient registered: Lucas Martinez', user: 'System', timestamp: '2026-06-06T14:00:00Z' },
  ];

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
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {session?.user?.name || 'Admin'}
                </h1>
                <p className="text-gray-500 mt-1">
                  Clinic Administrator Dashboard
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  Clinic Admin
                </span>
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-lg">🏥</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading State */}
          {clinicsLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
            </div>
          )}

          {!clinicsLoading && (
            <>
              {/* Clinic Selector */}
              {clinics.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">Active Clinic:</label>
                    <div className="flex-1 max-w-xs">
                      <ClinicSelector
                        clinics={clinics}
                        selectedClinicId={selectedClinicId}
                        onSelectClinic={setSelectedClinicId}
                      />
                    </div>
                    {selectedClinic && (
                      <div className="hidden md:block text-sm text-gray-500">
                        {selectedClinic.address}, {selectedClinic.city}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon="👥"
                  label="Total Patients"
                  value={stats.totalPatients.toLocaleString()}
                  color="blue"
                />
                <StatCard
                  icon="👨‍⚕️"
                  label="Staff Count"
                  value={stats.staffCount.toString()}
                  color="green"
                />
                <StatCard
                  icon="📅"
                  label="Appointments Today"
                  value={stats.appointmentsToday.toString()}
                  color="amber"
                />
                <StatCard
                  icon="💰"
                  label="Revenue This Month"
                  value={`$${(stats.revenueThisMonth / 1000).toFixed(1)}k`}
                  color="purple"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Quick Actions */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <QuickAction
                        icon="👨‍⚕️"
                        label="Add Staff"
                        href="/clinic-admin/staff"
                      />
                      <QuickAction
                        icon="📊"
                        label="View Reports"
                        href="/clinic-admin/reports"
                      />
                      <QuickAction
                        icon="🏥"
                        label="Manage Clinics"
                        href="/clinic-admin/clinics"
                      />
                      <QuickAction
                        icon="📅"
                        label="Schedule"
                        href="/doctor/appointments"
                      />
                      <QuickAction
                        icon="👥"
                        label="Patients"
                        href="/doctor/patients"
                      />
                      <QuickAction
                        icon="⚙️"
                        label="Settings"
                        href="/settings"
                      />
                    </div>
                  </section>

                  {/* Recent Activity */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                      <Link
                        href="/clinic-admin/reports"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View all
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {demoActivity.slice(0, 6).map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">{getActivityIcon(activity.type)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {activity.user && (
                                <span className="text-xs text-gray-500">{activity.user}</span>
                              )}
                              <span className="text-xs text-gray-400">{formatTimestamp(activity.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Clinic Info */}
                  {selectedClinic && (
                    <section className="bg-white rounded-xl border border-gray-200 p-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">Clinic Info</h2>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🏥</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{selectedClinic.name}</p>
                            <p className="text-sm text-gray-500">{selectedClinic.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500 mb-1">Address</p>
                          <p className="text-sm text-gray-900">{selectedClinic.address}</p>
                          <p className="text-sm text-gray-700">{selectedClinic.city}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{selectedClinic.patientCount}</p>
                            <p className="text-xs text-gray-500">Patients</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">{selectedClinic.staffCount}</p>
                            <p className="text-xs text-gray-500">Staff</p>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Quick Links */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
                    <div className="space-y-2">
                      <Link
                        href="/clinic-admin/staff"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg">👨‍⚕️</span>
                        <span className="text-sm font-medium text-gray-700">Staff Management</span>
                      </Link>
                      <Link
                        href="/clinic-admin/reports"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg">📊</span>
                        <span className="text-sm font-medium text-gray-700">Reports & Analytics</span>
                      </Link>
                      <Link
                        href="/clinic-admin/clinics"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-lg">🏢</span>
                        <span className="text-sm font-medium text-gray-700">All Clinics</span>
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </IsClinicAdmin>
  );
}

function StatCard({
  icon,
  label,
  value,
  color
}: {
  icon: string;
  label: string;
  value: string;
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
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  href
}: {
  icon: string;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </Link>
  );
}