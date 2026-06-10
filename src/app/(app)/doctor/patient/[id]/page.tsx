'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getPatientById,
  getPatientGrowthRecords,
  getPatientVaccinations,
  getPatientMedicalHistory,
  getPatientClinicalNotes,
  calculateAge,
  formatDate,
  GrowthRecord,
  VaccinationRecord,
  MedicalHistoryEntry,
  ClinicalNote
} from '../../lib/doctor-data';

type TabType = 'overview' | 'growth' | 'vaccinations' | 'history' | 'notes';

export default function PatientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;

  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const patient = getPatientById(patientId);
  const growthRecords = getPatientGrowthRecords(patientId);
  const vaccinations = getPatientVaccinations(patientId);
  const medicalHistory = getPatientMedicalHistory(patientId);
  const clinicalNotes = getPatientClinicalNotes(patientId);

  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Patient Not Found</h1>
          <p className="text-gray-600 mb-4">The patient record you're looking for doesn't exist.</p>
          <Link
            href="/doctor/patients"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  const age = calculateAge(patient.dateOfBirth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/doctor/patients" className="hover:text-primary-600">Patients</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900">{patient.name}</span>
          </div>

          {/* Patient Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl">
                {patient.avatar || (patient.gender === 'female' ? '👧' : '👦')}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                  {patient.isShared && (
                    <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded">
                      Shared
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span>DOB: {formatDate(patient.dateOfBirth)}</span>
                  <span className="text-gray-300">|</span>
                  <span>{age.display} old</span>
                  <span className="text-gray-300">|</span>
                  <span className="capitalize">{patient.gender}</span>
                  {patient.bloodType && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span>{patient.bloodType}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Note
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Test
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Message
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-6 -mb-4 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📋' },
              { id: 'growth', label: 'Growth', icon: '📈' },
              { id: 'vaccinations', label: 'Vaccinations', icon: '💉' },
              { id: 'history', label: 'Medical History', icon: '📜' },
              { id: 'notes', label: 'Notes', icon: '📝' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewTab patient={patient} recentHistory={medicalHistory.slice(0, 3)} />
        )}
        {activeTab === 'growth' && (
          <GrowthTab records={growthRecords} />
        )}
        {activeTab === 'vaccinations' && (
          <VaccinationsTab vaccinations={vaccinations} />
        )}
        {activeTab === 'history' && (
          <HistoryTab entries={medicalHistory} />
        )}
        {activeTab === 'notes' && (
          <NotesTab notes={clinicalNotes} />
        )}
      </main>
    </div>
  );
}

function OverviewTab({
  patient,
  recentHistory
}: {
  patient: ReturnType<typeof getPatientById>;
  recentHistory: MedicalHistoryEntry[];
}) {
  if (!patient) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Allergies */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-xl">⚠️</span> Allergies
        </h3>
        {patient.allergies.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {patient.allergies.map((allergy, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-danger-bg text-danger rounded-lg text-sm font-medium">
                {allergy}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No known allergies</p>
        )}
      </div>

      {/* Conditions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-xl">🏥</span> Conditions
        </h3>
        {patient.conditions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {patient.conditions.map((condition, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                {condition}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No chronic conditions</p>
        )}
      </div>

      {/* Current Medications */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-xl">💊</span> Current Medications
        </h3>
        <div className="space-y-3">
          {patient.conditions.includes('Asthma') && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">Fluticasone Inhaler</p>
              <p className="text-sm text-gray-500">100mcg twice daily</p>
            </div>
          )}
          {patient.conditions.includes('ADHD') && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">Methylphenidate (Ritalin)</p>
              <p className="text-sm text-gray-500">10mg daily morning</p>
            </div>
          )}
          {patient.conditions.length === 0 && (
            <p className="text-gray-500">No current medications</p>
          )}
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-xl">📅</span> Recent Visits
        </h3>
        {recentHistory.length > 0 ? (
          <div className="space-y-3">
            {recentHistory.map(entry => (
              <div key={entry.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <p className="font-medium text-gray-900">{entry.title}</p>
                  <span className="text-xs text-gray-400">{formatDate(entry.date)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{entry.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent visits</p>
        )}
      </div>
    </div>
  );
}

function GrowthTab({ records }: { records: GrowthRecord[] }) {
  const maxWeight = Math.max(...records.map(r => r.weight || 0));
  const maxHeight = Math.max(...records.map(r => r.height || 0));

  return (
    <div className="space-y-6">
      {/* Growth Chart Placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Chart</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-500">Interactive growth chart would render here</p>
            <p className="text-sm text-gray-400 mt-1">Using Recharts or similar library</p>
          </div>
        </div>
      </div>

      {/* Growth Records Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Weight (kg)</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Height (cm)</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">BMI</th>
              </tr>
            </thead>
            <tbody>
              {[...records].reverse().map((record, idx) => {
                const bmi = record.weight && record.height
                  ? (record.weight / Math.pow(record.height / 100, 2)).toFixed(1)
                  : '-';
                return (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{formatDate(record.date)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">{record.weight || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">{record.height || '-'}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">{bmi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function VaccinationsTab({ vaccinations }: { vaccinations: VaccinationRecord[] }) {
  const completed = vaccinations.filter(v => v.status === 'completed');
  const upcoming = vaccinations.filter(v => v.status === 'due' || v.status === 'upcoming');
  const overdue = vaccinations.filter(v => v.status === 'overdue');

  return (
    <div className="space-y-6">
      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">✓</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completed.length}</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">⏳</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{upcoming.length}</p>
              <p className="text-sm text-gray-500">Upcoming/Due</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-danger-bg rounded-lg flex items-center justify-center">
              <span className="text-xl">!</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{overdue.length}</p>
              <p className="text-sm text-gray-500">Overdue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vaccination List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vaccination History</h3>
        <div className="space-y-3">
          {vaccinations.map(vax => (
            <div key={vax.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  vax.status === 'completed' ? 'bg-green-100 text-green-600' :
                  vax.status === 'overdue' ? 'bg-danger-bg text-danger' :
                  vax.status === 'due' ? 'bg-amber-100 text-amber-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {vax.status === 'completed' ? '✓' :
                   vax.status === 'overdue' ? '!' :
                   vax.status === 'due' ? '!' : '○'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {vax.name}
                    {vax.doseNumber && ` (Dose ${vax.doseNumber}/${vax.totalDoses})`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {vax.administeredDate
                      ? `Administered: ${formatDate(vax.administeredDate)}`
                      : `Due: ${formatDate(vax.dueDate)}`
                    }
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                vax.status === 'completed' ? 'bg-green-100 text-green-700' :
                vax.status === 'overdue' ? 'bg-danger-bg text-danger' :
                vax.status === 'due' ? 'bg-amber-100 text-amber-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {vax.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryTab({ entries }: { entries: MedicalHistoryEntry[] }) {
  const typeIcons: Record<string, string> = {
    visit: '🩺',
    note: '📝',
    test: '🔬',
    medication: '💊',
    vaccination: '💉'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h3>
      {entries.length > 0 ? (
        <div className="space-y-4">
          {[...entries].reverse().map(entry => (
            <div key={entry.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-lg">
                {typeIcons[entry.type] || '📋'}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{entry.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{entry.description}</p>
                  </div>
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    {formatDate(entry.date)}
                  </span>
                </div>
                {entry.doctor && (
                  <p className="text-sm text-gray-400 mt-2">
                    By {entry.doctor}
                    {entry.clinic && ` at ${entry.clinic}`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No medical history records</p>
      )}
    </div>
  );
}

function NotesTab({ notes }: { notes: ClinicalNote[] }) {
  const typeColors: Record<string, string> = {
    progress: 'bg-green-100 text-green-700',
    diagnosis: 'bg-blue-100 text-blue-700',
    treatment: 'bg-amber-100 text-amber-700',
    general: 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="space-y-4">
      {notes.length > 0 ? (
        notes.map(note => (
          <div key={note.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{note.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(note.date)} • {note.author}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[note.type]}`}>
                {note.type}
              </span>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No clinical notes</h3>
          <p className="text-gray-500">Add notes from patient visits</p>
        </div>
      )}
    </div>
  );
}