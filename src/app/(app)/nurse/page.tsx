'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/lib/auth-context';
import { IsNurse } from '@/app/lib/rbac';
import { useNursePatients, useNurseTasks } from '@/app/lib/role-api-hooks';

export default function NurseDashboard() {
  const { session } = useAuth();
  const { patients, isLoading: patientsLoading } = useNursePatients();
  const { tasks, isLoading: tasksLoading, getPendingTasks, getCompletedTasks } = useNurseTasks();

  const pendingTasks = getPendingTasks();
  const completedTasks = getCompletedTasks();
  const patientsUnderCare = patients.length;
  const pendingTaskCount = pendingTasks.length;
  const vitalsToRecord = pendingTasks.filter(t => t.type === 'vitals').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-700';
      case 'needs_attention': return 'bg-amber-100 text-amber-700';
      case 'critical': return 'bg-danger-bg text-danger';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'vitals': return '📊';
      case 'medication': return '💊';
      case 'vaccination': return '💉';
      case 'followup': return '📞';
      default: return '📋';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-amber-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const isLoading = patientsLoading || tasksLoading;

  return (
    <IsNurse fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You need nurse privileges to access this page.</p>
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
                  Welcome, {session?.user?.name || 'Nurse'}
                </h1>
                <p className="text-gray-500 mt-1">
                  Pediatric Nurse at PediAi Clinic
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Nurse
                </span>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-lg">👩‍⚕️</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
            </div>
          )}

          {!isLoading && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                  icon="👥"
                  label="Patients Under Care"
                  value={patientsUnderCare.toString()}
                  color="blue"
                />
                <StatCard
                  icon="📋"
                  label="Tasks Pending"
                  value={pendingTaskCount.toString()}
                  color="amber"
                />
                <StatCard
                  icon="📊"
                  label="Vitals to Record"
                  value={vitalsToRecord.toString()}
                  color="green"
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
                        icon="📊"
                        label="Record Vitals"
                        href="/nurse/vitals"
                      />
                      <QuickAction
                        icon="💊"
                        label="Log Medication"
                        href="/nurse/tasks"
                      />
                      <QuickAction
                        icon="📋"
                        label="View Tasks"
                        href="/nurse/tasks"
                      />
                      <QuickAction
                        icon="👥"
                        label="Patients"
                        href="/doctor/patients"
                      />
                      <QuickAction
                        icon="💉"
                        label="Vaccinations"
                        href="/doctor/patients"
                      />
                      <QuickAction
                        icon="📅"
                        label="Schedule"
                        href="/doctor/appointments"
                      />
                    </div>
                  </section>

                  {/* Patient List */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Patients Under Care</h2>
                      <Link
                        href="/doctor/patients"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View all
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {patients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                              {patient.avatar || '👶'}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{patient.name}</p>
                              <p className="text-sm text-gray-500">
                                {patient.age} • Parent: {patient.parentName}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(patient.status)}`}>
                              {patient.status.replace('_', ' ')}
                            </span>
                            <Link
                              href={`/nurse/vitals?patient=${patient.id}`}
                              className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            >
                              Record Vitals
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Today's Tasks */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
                      <Link
                        href="/nurse/tasks"
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        View all
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {pendingTasks.slice(0, 5).map((task) => (
                        <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                          <span className="text-lg">{getTaskIcon(task.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{task.patientName}</p>
                            <p className="text-xs text-gray-500 truncate">{task.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-400">{task.dueTime}</span>
                              <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {pendingTasks.length === 0 && (
                      <p className="text-center text-gray-500 py-4">No pending tasks</p>
                    )}
                  </section>

                  {/* Quick Stats */}
                  <section className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Tasks Completed</span>
                          <span className="text-sm font-medium text-gray-900">
                            {completedTasks.length}/{tasks.length}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Vitals Recorded</span>
                          <span className="text-sm font-medium text-gray-900">3/8</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary-500 h-2 rounded-full" style={{ width: '37.5%' }} />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </IsNurse>
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