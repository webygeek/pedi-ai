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
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="font-display text-2xl text-forest mb-2">Access Denied</h1>
          <p className="text-forest/60">You need doctor privileges to access this page.</p>
          <Link href="/dashboard" className="inline-block mt-4 px-6 py-2 bg-sage text-white rounded-xl hover:bg-sage/90 transition-colors">
            Go to Parent Dashboard
          </Link>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-forest/60 mb-4">
            <span>Doctor Dashboard</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center">
                <span className="text-2xl">👨‍⚕️</span>
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl text-forest">
                  Welcome, Dr. {session?.user?.name?.split(' ')[1] || 'Doctor'}
                </h1>
                <p className="text-forest/60">
                  Pediatrician at PediAi Clinic
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="px-4 py-2 bg-sage/10 text-sage rounded-full text-sm font-medium border border-sage/20">
                Doctor
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="w-12 h-12 rounded-full border-4 border-sage/20 border-t-sage animate-spin"></div>
          </div>
        )}

        {!isLoading && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                }
                label="Total Patients"
                value={totalPatients}
                color="sage"
              />
              <StatCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                }
                label="Today's Appointments"
                value={todayAppointments}
                color="forest"
              />
              <StatCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                label="Pending Reviews"
                value={pendingReviews}
                color="coral"
              />
              <StatCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.556 4.03-8 9-8s9 3.444 9 8z" />
                  </svg>
                }
                label="Unread Messages"
                value={unreadMessages}
                color="coral"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Actions */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-mist/50">
                  <h2 className="font-display text-lg text-forest mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <QuickAction
                      icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                      }
                      label="View Patients"
                      href="/doctor/patients"
                    />
                    <QuickAction
                      icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                      }
                      label="Appointments"
                      href="/doctor/appointments"
                    />
                    <QuickAction
                      icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      }
                      label="New Appointment"
                      href="/doctor/appointments"
                    />
                    <QuickAction
                      icon={
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      }
                      label="Add Note"
                      href="/doctor/patients"
                    />
                  </div>
                </section>

                {/* Recent Patients */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-mist/50">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-lg text-forest">Recent Patients</h2>
                    <Link
                      href="/doctor/patients"
                      className="text-sm text-sage hover:text-sage/80 font-medium transition-colors"
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
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-mist/50">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-lg text-forest">Upcoming</h2>
                    <Link
                      href="/doctor/appointments"
                      className="text-sm text-sage hover:text-sage/80 font-medium transition-colors"
                    >
                      View calendar
                    </Link>
                  </div>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingAppointments.map(appointment => (
                        <div
                          key={appointment.id}
                          className="flex items-start gap-3 p-4 bg-mist/30 rounded-xl hover:bg-mist/50 transition-colors"
                        >
                          <div className="w-10 h-10 bg-sage/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-lg">
                              {appointment.type === 'checkup' ? '🩺' :
                               appointment.type === 'followup' ? '📞' :
                               appointment.type === 'sick' ? '🤒' :
                               appointment.type === 'vaccination' ? '💉' : '📋'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-forest text-sm truncate">
                              {appointment.patientName}
                            </p>
                            <p className="text-xs text-forest/50">
                              {formatDate(appointment.date)} at {appointment.time}
                            </p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                              appointment.status === 'confirmed' ? 'bg-sage/10 text-sage' :
                              appointment.status === 'pending' ? 'bg-coral/10 text-coral' :
                              'bg-mist text-forest/60'
                            }`}>
                              {appointment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-forest/50 text-sm text-center py-4">No upcoming appointments</p>
                  )}
                </section>

                {/* Patient Alerts */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-mist/50">
                  <h2 className="font-display text-lg text-forest mb-4">Alerts</h2>
                  <div className="space-y-3">
                    <AlertItem
                      icon={
                        <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      }
                      text="2 patients have overdue vaccinations"
                      link="/doctor/patients"
                    />
                    <AlertItem
                      icon={
                        <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                      }
                      text="3 appointments need confirmation"
                      link="/doctor/appointments"
                    />
                    <AlertItem
                      icon={
                        <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      }
                      text="5 patient records need review"
                      link="/doctor/patients"
                    />
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
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
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'sage' | 'forest' | 'coral';
}) {
  const colors = {
    sage: 'bg-sage/10 text-sage border-sage/20',
    forest: 'bg-forest/10 text-forest border-forest/20',
    coral: 'bg-coral/10 text-coral border-coral/20'
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-mist/50">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 border ${colors[color]}`}>
        {icon}
      </div>
      <p className="font-display text-3xl font-semibold text-forest">{value}</p>
      <p className="text-sm text-forest/60 mt-1">{label}</p>
    </div>
  );
}

function QuickAction({
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
      className="flex flex-col items-center gap-3 p-4 rounded-xl border border-mist/50 hover:border-sage/30 hover:bg-sage/5 transition-all text-center"
    >
      <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center text-sage">
        {icon}
      </div>
      <span className="text-sm font-medium text-forest">{label}</span>
    </Link>
  );
}

function AlertItem({
  icon,
  text,
  link
}: {
  icon: React.ReactNode;
  text: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="flex items-center gap-3 p-4 rounded-xl hover:bg-danger-bg/50 transition-colors border border-transparent hover:border-danger/20"
    >
      <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-sm text-forest/80">{text}</span>
    </Link>
  );
}
