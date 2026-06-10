'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/lib/auth-context';
import { IsDoctor } from '@/app/lib/rbac';
import { PatientCard } from './components/PatientCard';
import { useDoctorPatients, useDoctorAppointments } from '@/app/lib/role-api-hooks';

export default function DoctorDashboard() {
  const { session } = useAuth();
  const { patients, isLoading: patientsLoading } = useDoctorPatients();
  const { getUpcomingAppointments, isLoading: appointmentsLoading } = useDoctorAppointments();

  const recentPatients = patients.slice(0, 5);
  const upcomingAppointments = getUpcomingAppointments().slice(0, 3);

  // Calculate stats
  const totalPatients = patients.length;
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = upcomingAppointments.filter(apt => apt.date === todayStr).length;
  const pendingReviews = patients.filter(p => !p.lastVisit || new Date(p.lastVisit) < new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)).length;
  const unreadMessages = 5; // Demo value

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isLoading = patientsLoading || appointmentsLoading;

  return (
    <IsDoctor fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You need doctor privileges to access this page.</p>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, Dr. {session?.user?.name?.split(' ')[1] || 'Doctor'}
                </h1>
                <p className="text-gray-500 mt-1">
                  Pediatrician at PediAi Clinic
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  Doctor
                </span>
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-lg">👨‍⚕️</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
            </div>
          )}

          {!isLoading && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                  icon="👥"
                  label="Total Patients"
                  value={totalPatients.toString()}
                  color="blue"
                />
                <StatCard
                  icon="📅"
                  label="Today's Appointments"
                  value={todayAppointments.toString()}
                  color="green"
                />
                <StatCard
                  icon="📋"
                  label="Pending Reviews"
                  value={pendingReviews.toString()}
                  color="amber"
                />
                <StatCard
                  icon="💬"
                  label="Unread Messages"
                  value={unreadMessages.toString()}
                  color="purple"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Quick Actions */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <QuickAction
                        icon="📋"
                        label="View Patients"
                        href="/doctor/patients"
                      />
                      <QuickAction
                        icon="📅"
                        label="Appointments"
                        href="/doctor/appointments"
                      />
                      <QuickAction
                        icon="➕"
                        label="New Appointment"
                        href="/doctor/appointments"
                      />
                      <QuickAction
                        icon="📝"
                        label="Add Note"
                        href="/doctor/patients"
                      />
                    </div>
                  </section>

                  {/* Recent Patients */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
                      <Link
                        href="/doctor/patients"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View all
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {recentPatients.map(patient => (
                        <PatientCard key={patient.id} patient={patient} compact />
                      ))}
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Upcoming Appointments */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
                      <Link
                        href="/doctor/appointments"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View calendar
                      </Link>
                    </div>
                    {upcomingAppointments.length > 0 ? (
                      <div className="space-y-3">
                        {upcomingAppointments.map(appointment => (
                          <div
                            key={appointment.id}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                              <span className="text-lg">
                                {appointment.type === 'checkup' ? '🩺' :
                                 appointment.type === 'followup' ? '📞' :
                                 appointment.type === 'sick' ? '🤒' :
                                 appointment.type === 'vaccination' ? '💉' : '📋'}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-900 text-sm truncate">
                                {appointment.patientName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(appointment.date)} at {appointment.time}
                              </p>
                              <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                                appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                appointment.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {appointment.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No upcoming appointments</p>
                    )}
                  </section>

                  {/* Patient Alerts */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h2>
                    <div className="space-y-3">
                      <AlertItem
                        icon="⚠️"
                        text="2 patients have overdue vaccinations"
                        link="/doctor/patients"
                      />
                      <AlertItem
                        icon="📅"
                        text="3 appointments need confirmation"
                        link="/doctor/appointments"
                      />
                      <AlertItem
                        icon="📋"
                        text="5 patient records need review"
                        link="/doctor/patients"
                      />
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </IsDoctor>
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

function AlertItem({
  icon,
  text,
  link
}: {
  icon: string;
  text: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm text-gray-700">{text}</span>
    </Link>
  );
}