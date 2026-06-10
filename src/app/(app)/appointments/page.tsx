'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/auth-context';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Provider {
  id: string;
  name: string;
  type: 'doctor' | 'clinic';
  specialty?: string;
  location: string;
}

interface Appointment {
  id: string;
  providerId: string;
  providerName: string;
  providerType: 'doctor' | 'clinic';
  date: string;
  time: string;
  type: 'checkup' | 'vaccination' | 'sick_visit' | 'follow_up';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const providers: Provider[] = [
  { id: 'dr-1', name: 'Dr. Sarah Chen', type: 'doctor', specialty: 'Pediatrician', location: 'Children\'s Health Clinic' },
  { id: 'dr-2', name: 'Dr. Michael Roberts', type: 'doctor', specialty: 'Pediatrician', location: 'Happy Kids Medical Center' },
  { id: 'clinic-1', name: 'Children\'s Health Clinic', type: 'clinic', location: '123 Medical Drive' },
  { id: 'clinic-2', name: 'Happy Kids Medical Center', type: 'clinic', location: '456 Healthcare Ave' },
];

const appointmentTypes = [
  { value: 'checkup', label: 'Regular Checkup', icon: '🩺', description: 'Routine health examination' },
  { value: 'vaccination', label: 'Vaccination', icon: '💉', description: 'Immunization visit' },
  { value: 'sick_visit', label: 'Sick Visit', icon: '🤒', description: 'When child is unwell' },
  { value: 'follow_up', label: 'Follow-up', icon: '📋', description: 'Follow-up from previous visit' },
];

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      slots.push({
        time: timeStr,
        available: Math.random() > 0.3, // 70% available for demo
      });
    }
  }
  return slots;
};

const getDatesForNextWeeks = (weeks: number) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < weeks * 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
      dates.push(date);
    }
  }
  return dates.slice(0, 14); // Next 2 weeks of weekdays
};

export default function AppointmentsPage() {
  const { session, getActiveChild } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<'select' | 'date' | 'time' | 'details' | 'confirm'>('select');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

  const activeChild = getActiveChild();
  const availableDates = getDatesForNextWeeks(2);

  useEffect(() => {
    setMounted(true);
    // Demo appointments
    const now = new Date();
    setAppointments([
      {
        id: 'apt-1',
        providerId: 'dr-1',
        providerName: 'Dr. Sarah Chen',
        providerType: 'doctor',
        date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: '10:00',
        type: 'vaccination',
        status: 'scheduled',
      },
      {
        id: 'apt-2',
        providerId: 'clinic-1',
        providerName: 'Children\'s Health Clinic',
        providerType: 'clinic',
        date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        time: '14:30',
        type: 'checkup',
        status: 'scheduled',
      },
    ]);
  }, []);

  const handleProviderSelect = (provider: Provider) => {
    setSelectedProvider(provider);
    setStep('date');
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setTimeSlots(generateTimeSlots());
    setStep('time');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
  };

  const handleBookAppointment = async () => {
    if (!selectedProvider || !selectedDate || !selectedTime || !appointmentType) return;

    setIsBooking(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      providerId: selectedProvider.id,
      providerName: selectedProvider.name,
      providerType: selectedProvider.type,
      date: selectedDate.toISOString(),
      time: selectedTime,
      type: appointmentType as Appointment['type'],
      status: 'scheduled',
      notes: notes || undefined,
    };

    setAppointments(prev => [newAppointment, ...prev]);
    setIsBooking(false);
    setStep('confirm');
  };

  const handleCancelAppointment = (id: string) => {
    setSelectedAppointmentId(id);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (selectedAppointmentId) {
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === selectedAppointmentId ? { ...apt, status: 'cancelled' } : apt
        )
      );
      setShowCancelModal(false);
      setSelectedAppointmentId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const getAppointmentTypeLabel = (type: string) => {
    return appointmentTypes.find(t => t.value === type)?.label || type;
  };

  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-mist/50 rounded w-1/3"></div>
        <div className="h-64 bg-mist/50 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-forest">Appointments</h1>
        <p className="text-forest/60 mt-1">
          Book and manage appointments for {activeChild?.name || 'your child'}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {['select', 'date', 'time', 'details', 'confirm'].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              step === s ? 'bg-coral text-white' :
              ['select', 'date', 'time', 'details', 'confirm'].indexOf(step) > i ? 'bg-sage text-white' :
              'bg-mist/50 text-forest/40'
            }`}>
              {i + 1}
            </div>
            {i < 4 && (
              <div className={`w-12 h-0.5 ${
                ['select', 'date', 'time', 'details', 'confirm'].indexOf(step) > i ? 'bg-sage' : 'bg-mist/50'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Provider Selection */}
      {step === 'select' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-mist/50 p-6">
            <h2 className="font-display text-xl text-forest mb-4">Select Provider</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providers.map(provider => (
                <button
                  key={provider.id}
                  onClick={() => handleProviderSelect(provider)}
                  className="p-4 rounded-xl border border-mist/50 hover:border-sage/30 hover:shadow-sm transition-all text-left"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      provider.type === 'doctor' ? 'bg-sage/10 text-sage' : 'bg-forest/10 text-forest'
                    }`}>
                      {provider.type === 'doctor' ? (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          <path d="M9 22V12h6v10" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-forest">{provider.name}</h3>
                      <p className="text-sm text-forest/60">{provider.location}</p>
                    </div>
                  </div>
                  {provider.specialty && (
                    <span className="inline-block px-2 py-0.5 bg-mist/30 text-forest/70 text-xs rounded-full">
                      {provider.specialty}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Date Selection */}
      {step === 'date' && (
        <div className="space-y-6">
          <button onClick={() => setStep('select')} className="text-sage hover:text-forest flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Change Provider
          </button>
          <div className="bg-white rounded-2xl border border-mist/50 p-6">
            <h2 className="font-display text-xl text-forest mb-4">Select Date</h2>
            <p className="text-sm text-forest/60 mb-4">Available dates for {selectedProvider?.name}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableDates.map(date => (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelect(date)}
                  className="p-4 rounded-xl border border-mist/50 hover:border-sage/30 hover:bg-sage/5 transition-all text-center"
                >
                  <p className="text-xs text-forest/60 uppercase">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className="text-2xl font-semibold text-forest">
                    {date.getDate()}
                  </p>
                  <p className="text-sm text-forest/60">
                    {date.toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Time Selection */}
      {step === 'time' && (
        <div className="space-y-6">
          <button onClick={() => setStep('date')} className="text-sage hover:text-forest flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Change Date
          </button>
          <div className="bg-white rounded-2xl border border-mist/50 p-6">
            <h2 className="font-display text-xl text-forest mb-2">
              {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <p className="text-sm text-forest/60 mb-4">Available time slots</p>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {timeSlots.map(slot => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    slot.available
                      ? selectedTime === slot.time
                        ? 'bg-sage text-white border-sage'
                        : 'border-mist/50 hover:border-sage/30 hover:bg-sage/5'
                      : 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                  }`}
                >
                  <p className="font-medium">{slot.time}</p>
                  {!slot.available && <p className="text-xs">Booked</p>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Appointment Details */}
      {step === 'details' && (
        <div className="space-y-6">
          <button onClick={() => setStep('time')} className="text-sage hover:text-forest flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Change Time
          </button>
          <div className="bg-white rounded-2xl border border-mist/50 p-6 space-y-6">
            <div>
              <h2 className="font-display text-xl text-forest mb-4">Appointment Details</h2>
              {/* Appointment Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-forest/70 mb-3">Appointment Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {appointmentTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => setAppointmentType(type.value)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        appointmentType === type.value
                          ? 'bg-sage/10 border-sage/30'
                          : 'border-mist/50 hover:border-sage/20'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{type.icon}</span>
                      <p className="font-medium text-forest">{type.label}</p>
                      <p className="text-xs text-forest/60">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-forest/70 mb-2">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional information for the doctor..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest placeholder:text-forest/30 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-mist/30 rounded-xl p-4 space-y-2">
              <h3 className="font-semibold text-forest mb-2">Appointment Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-forest/60">Provider</span>
                <span className="text-forest font-medium">{selectedProvider?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-forest/60">Date</span>
                <span className="text-forest font-medium">
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-forest/60">Time</span>
                <span className="text-forest font-medium">{selectedTime}</span>
              </div>
            </div>

            <button
              onClick={handleBookAppointment}
              disabled={!appointmentType || isBooking}
              className="w-full px-6 py-3 bg-coral text-white font-semibold rounded-full hover:bg-coral-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isBooking ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Booking...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Booking
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Confirmation */}
      {step === 'confirm' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-mist/50 p-8 text-center">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-display text-2xl text-forest mb-2">Appointment Confirmed!</h2>
            <p className="text-forest/60 mb-6">
              Your appointment has been scheduled successfully.
            </p>
            <div className="bg-mist/30 rounded-xl p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-forest/60">Provider</span>
                <span className="text-forest font-medium">{selectedProvider?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-forest/60">Date</span>
                <span className="text-forest font-medium">
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-forest/60">Time</span>
                <span className="text-forest font-medium">{selectedTime}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setStep('select');
                setSelectedProvider(null);
                setSelectedDate(null);
                setSelectedTime(null);
                setAppointmentType('');
                setNotes('');
              }}
              className="px-6 py-3 bg-forest text-white font-semibold rounded-full hover:bg-forest-light transition-colors"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      )}

      {/* My Appointments */}
      <div className="bg-white rounded-2xl border border-mist/50 p-6">
        <h2 className="font-display text-xl text-forest mb-4">My Appointments</h2>
        {appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map(apt => (
              <div
                key={apt.id}
                className={`p-4 rounded-xl border ${
                  apt.status === 'cancelled'
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : apt.status === 'completed'
                    ? 'bg-sage/5 border-sage/20'
                    : 'bg-white border-mist/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      apt.type === 'vaccination' ? 'bg-sage/10 text-sage' :
                      apt.type === 'sick_visit' ? 'bg-danger-bg text-danger' :
                      'bg-forest/10 text-forest'
                    }`}>
                      {apt.type === 'vaccination' ? '💉' : apt.type === 'sick_visit' ? '🤒' : apt.type === 'follow_up' ? '📋' : '🩺'}
                    </div>
                    <div>
                      <p className="font-medium text-forest">{apt.providerName}</p>
                      <p className="text-sm text-forest/60">{getAppointmentTypeLabel(apt.type)}</p>
                      <p className="text-sm text-forest/60 mt-1">
                        {formatDate(apt.date)} at {apt.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      apt.status === 'scheduled' ? 'bg-sage/10 text-sage' :
                      apt.status === 'completed' ? 'bg-forest/10 text-forest' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                    {apt.status === 'scheduled' && (
                      <button
                        onClick={() => handleCancelAppointment(apt.id)}
                        className="p-1.5 text-forest/40 hover:text-danger hover:bg-danger-bg rounded-lg transition-colors"
                        title="Cancel appointment"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-forest/50">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <p>No appointments scheduled</p>
            <p className="text-sm mt-1">Book an appointment to get started</p>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={() => setShowCancelModal(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="w-12 h-12 bg-danger-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-forest text-center mb-2">Cancel Appointment?</h3>
            <p className="text-forest/70 text-center mb-6">
              Are you sure you want to cancel this appointment? You can book a new one later.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2.5 border border-mist/50 text-forest font-medium rounded-full hover:bg-mist/30 transition-colors"
              >
                Keep Appointment
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 px-4 py-2.5 bg-danger text-white font-medium rounded-full hover:bg-danger/90 transition-colors"
              >
                Cancel It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}