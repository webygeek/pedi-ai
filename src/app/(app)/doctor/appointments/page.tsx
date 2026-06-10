'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  DEMO_APPOINTMENTS,
  Appointment,
  getPatientById,
  formatDate
} from '../lib/doctor-data';

type ViewMode = 'week' | 'month';
type StatusFilter = 'all' | 'confirmed' | 'pending' | 'cancelled' | 'completed';

export default function AppointmentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Generate dates for the calendar view
  const calendarDates = useMemo(() => {
    const dates: string[] = [];
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - (viewMode === 'week' ? 3 : 15));

    for (let i = 0; i < (viewMode === 'week' ? 7 : 31); i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  }, [selectedDate, viewMode]);

  const appointments = useMemo(() => {
    return DEMO_APPOINTMENTS.filter(apt => {
      if (statusFilter !== 'all' && apt.status !== statusFilter) return false;
      return true;
    });
  }, [statusFilter]);

  const selectedDateAppointments = useMemo(() => {
    return appointments
      .filter(apt => apt.date === selectedDate)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments, selectedDate]);

  const appointmentsByDate = useMemo(() => {
    const map: Record<string, number> = {};
    appointments.forEach(apt => {
      map[apt.date] = (map[apt.date] || 0) + 1;
    });
    return map;
  }, [appointments]);

  const today = new Date();
  const selectedDateObj = new Date(selectedDate + 'T00:00:00');
  const isToday = selectedDate === today.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-500 mt-1">
                {appointments.length} appointments
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Appointment
              </button>
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Doctor
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-6">
              {/* View Mode Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setViewMode('week')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'week'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'month'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Month
                </button>
              </div>

              {/* Status Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(['all', 'confirmed', 'pending', 'cancelled', 'completed'] as StatusFilter[]).map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      statusFilter === status
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDates.map((date, idx) => {
                  const dateObj = new Date(date + 'T00:00:00');
                  const isSelected = date === selectedDate;
                  const isTodayDate = date === today.toISOString().split('T')[0];
                  const hasAppointments = appointmentsByDate[date] > 0;

                  return (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`aspect-square p-1 rounded-lg flex flex-col items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-primary-600 text-white'
                          : isTodayDate
                          ? 'bg-primary-100 text-primary-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xs opacity-60">
                        {dateObj.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1)}
                      </span>
                      <span className={`text-sm font-medium ${isSelected ? 'text-white' : ''}`}>
                        {dateObj.getDate()}
                      </span>
                      {hasAppointments && !isSelected && (
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-0.5" />
                      )}
                      {hasAppointments && isSelected && (
                        <span className="w-1.5 h-1.5 bg-white rounded-full mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {isToday ? "Today's" : ''} Appointments
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isToday ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {selectedDateAppointments.length} appointments
                </span>
              </div>

              {selectedDateAppointments.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateAppointments.map(apt => (
                    <AppointmentCard key={apt.id} appointment={apt} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📅</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments</h3>
                  <p className="text-gray-500">
                    {isToday ? "You don't have any appointments today." : "No appointments scheduled for this day."}
                  </p>
                </div>
              )}
            </div>

            {/* All Appointments Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">All Appointments</h3>
              <div className="space-y-2">
                {appointments.slice(0, 5).map(apt => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {apt.type === 'checkup' ? '🩺' :
                           apt.type === 'followup' ? '📞' :
                           apt.type === 'sick' ? '🤒' :
                           apt.type === 'vaccination' ? '💉' : '📋'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{apt.patientName}</p>
                        <p className="text-sm text-gray-500">
                          {apt.time} • {apt.duration} min
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const patient = getPatientById(appointment.patientId);

  const typeLabels: Record<string, string> = {
    checkup: 'Wellness Check',
    followup: 'Follow-up',
    sick: 'Sick Visit',
    vaccination: 'Vaccination',
    consultation: 'Consultation'
  };

  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0 w-16 text-center">
        <p className="text-lg font-bold text-gray-900">{appointment.time}</p>
        <p className="text-xs text-gray-500">{appointment.duration} min</p>
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <Link
              href={`/doctor/patient/${appointment.patientId}`}
              className="font-semibold text-gray-900 hover:text-primary-600"
            >
              {appointment.patientName}
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              {typeLabels[appointment.type]}
              {appointment.notes && ` • ${appointment.notes}`}
            </p>
          </div>
          <StatusBadge status={appointment.status} />
        </div>

        {patient && (
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span>{patient.gender === 'female' ? '👧' : '👦'} {patient.dateOfBirth}</span>
            {patient.conditions.length > 0 && (
              <span className="text-blue-600">{patient.conditions[0]}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Appointment['status'] }) {
  const styles: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    cancelled: 'bg-danger-bg text-danger',
    completed: 'bg-gray-100 text-gray-600'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}