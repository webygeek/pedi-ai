'use client'

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'

// ============================================================================
// TYPES
// ============================================================================

interface Vaccine {
  id: string
  name: string
  shortName: string
  protectsAgainst: string
  importance: string
  sideEffects: string[]
  watchFor: string[]
  educationalInfo: string
}

interface VaccinationRecord {
  id: string
  vaccineId: string
  dateGiven: Date | null
  batchNumber?: string
  healthcareProvider?: string
  hospital?: string
  notes?: string
  hasReaction: boolean
}

interface ScheduledVaccine {
  vaccine: Vaccine
  ageGroup: string
  dueDate: Date
  status: 'completed' | 'due' | 'upcoming' | 'overdue'
  record?: VaccinationRecord
}

// ============================================================================
// IAP VACCINE SCHEDULE DATA (Indian Academy of Pediatrics)
// ============================================================================

const vaccines: Record<string, Vaccine> = {
  bcg: {
    id: 'bcg',
    name: 'Bacillus Calmette-Guerin',
    shortName: 'BCG',
    protectsAgainst: 'Tuberculosis (TB)',
    importance: 'BCG vaccine provides protection against severe forms of TB including TB meningitis, which can be fatal in young children.',
    sideEffects: ['Mild fever', 'Soreness at injection site', 'Small ulcer at injection site', 'Swollen lymph nodes'],
    watchFor: ['High fever (above 39°C)', 'Large swelling at injection site', 'Pus drainage', 'Severe redness spreading'],
    educationalInfo: 'BCG is given as a single dose at birth. The scar at the injection site is normal and shows the vaccine is working.'
  },
  hepb: {
    id: 'hepb',
    name: 'Hepatitis B',
    shortName: 'Hep B',
    protectsAgainst: 'Hepatitis B virus infection',
    importance: 'Hepatitis B can cause chronic liver disease, liver cancer, and death. Early vaccination provides lifelong protection.',
    sideEffects: ['Soreness at injection site', 'Mild fever', 'Fatigue'],
    watchFor: ['High fever', 'Severe allergic reactions', 'Unusual lethargy'],
    educationalInfo: 'Hepatitis B vaccine is given in 3 doses. The birth dose should be given within 24 hours of birth.'
  },
  opv: {
    id: 'opv',
    name: 'Oral Polio Vaccine',
    shortName: 'OPV',
    protectsAgainst: 'Poliomyelitis (Polio)',
    importance: 'Polio is a disabling and life-threatening disease. OPV provides intestinal immunity and helps prevent spread.',
    sideEffects: ['Mild fever', 'Vomiting', 'Diarrhea (temporary)'],
    watchFor: ['High fever', 'Severe vomiting', 'Signs of paralysis'],
    educationalInfo: 'OPV is given as drops in the mouth. It is important for both individual and community immunity.'
  },
  ipv: {
    id: 'ipv',
    name: 'Inactivated Polio Vaccine',
    shortName: 'IPV',
    protectsAgainst: 'Poliomyelitis (Polio)',
    importance: 'IPV provides protection against polio without the small risk of vaccine-associated paralysis.',
    sideEffects: ['Soreness at injection site', 'Irritability'],
    watchFor: ['High fever', 'Severe local reaction'],
    educationalInfo: 'IPV is given by injection and is part of the fractional IPV schedule starting at 6 weeks.'
  },
  dtap: {
    id: 'dtap',
    name: 'Diphtheria, Tetanus, Acellular Pertussis',
    shortName: 'DTaP',
    protectsAgainst: 'Diphtheria, Tetanus (Lockjaw), and Whooping Cough',
    importance: 'These diseases can be fatal. DTaP provides essential protection during early childhood.',
    sideEffects: ['Fever', 'Fussiness', 'Soreness at injection site', 'Fatigue'],
    watchFor: ['High fever (above 40°C)', 'Seizures', 'Persistent crying for more than 3 hours', 'Lump at injection site'],
    educationalInfo: 'DTaP is given in 5 doses. The full series is essential for long-term protection.'
  },
  hib: {
    id: 'hib',
    name: 'Haemophilus Influenzae Type B',
    shortName: 'Hib',
    protectsAgainst: 'Hib diseases including meningitis, pneumonia, and epiglottitis',
    importance: 'Hib was a leading cause of meningitis in children under 5 before vaccination.',
    sideEffects: ['Redness at injection site', 'Fever', 'Irritability'],
    watchFor: ['High fever', 'Severe swelling', 'Signs of meningitis'],
    educationalInfo: 'Hib vaccine protects against serious bacterial infections. It is given in 3 doses during infancy.'
  },
  pcv: {
    id: 'pcv',
    name: 'Pneumococcal Conjugate Vaccine',
    shortName: 'PCV',
    protectsAgainst: 'Pneumococcal diseases including pneumonia, meningitis, and ear infections',
    importance: 'Pneumococcal disease can cause severe illness and death, especially in young children.',
    sideEffects: ['Drowsiness', 'Loss of appetite', 'Redness at injection site', 'Fever'],
    watchFor: ['High fever', 'Seizures', 'Severe allergic reaction'],
    educationalInfo: 'PCV is given in 3 doses during infancy with a booster at 12-15 months.'
  },
  rv: {
    id: 'rv',
    name: 'Rotavirus Vaccine',
    shortName: 'RV',
    protectsAgainst: 'Rotavirus diarrhea',
    importance: 'Rotavirus causes severe diarrhea and dehydration in infants and young children.',
    sideEffects: ['Mild diarrhea', 'Irritability', 'Fever'],
    watchFor: ['Severe diarrhea', 'Vomiting', 'Signs of dehydration', 'Intussusception (rare)'],
    educationalInfo: 'RV is given as oral drops. The first dose must be given before 15 weeks of age.'
  },
  mmr: {
    id: 'mmr',
    name: 'Measles, Mumps, and Rubella',
    shortName: 'MMR',
    protectsAgainst: 'Measles, Mumps, and Rubella (German Measles)',
    importance: 'These viral diseases can cause serious complications including brain damage, deafness, and death.',
    sideEffects: ['Fever', 'Rash', 'Swollen glands', 'Joint pain'],
    watchFor: ['High fever', 'Seizures', 'Severe rash', 'Signs of encephalitis'],
    educationalInfo: 'MMR is given at 9-12 months with a second dose at 15-18 months or later.'
  },
  var: {
    id: 'var',
    name: 'Varicella',
    shortName: 'Varicella',
    protectsAgainst: 'Chickenpox',
    importance: 'Chickenpox can cause severe complications and shingles later in life.',
    sideEffects: ['Soreness at injection site', 'Mild rash', 'Fever'],
    watchFor: ['High fever', 'Severe rash', 'Signs of pneumonia'],
    educationalInfo: 'Varicella vaccine is given at 15-18 months. Two doses provide better protection.'
  },
  hepa: {
    id: 'hepa',
    name: 'Hepatitis A',
    shortName: 'Hep A',
    protectsAgainst: 'Hepatitis A virus infection',
    importance: 'Hepatitis A causes liver inflammation and can lead to serious complications.',
    sideEffects: ['Soreness at injection site', 'Headache', 'Fatigue', 'Nausea'],
    watchFor: ['Severe allergic reaction', 'Jaundice'],
    educationalInfo: 'Hepatitis A vaccine is given in 2 doses, 6 months apart, starting at 12 months.'
  },
  je: {
    id: 'je',
    name: 'Japanese Encephalitis',
    shortName: 'JE',
    protectsAgainst: 'Japanese Encephalitis',
    importance: 'JE is a mosquito-borne disease that can cause encephalitis and death.',
    sideEffects: ['Fever', 'Headache', 'Muscle pain', 'Fatigue'],
    watchFor: ['High fever', 'Severe headache', 'Confusion', 'Seizures'],
    educationalInfo: 'JE vaccine is recommended in endemic areas and given at 12 months.'
  },
  typhoid: {
    id: 'typhoid',
    name: 'Typhoid',
    shortName: 'Typhoid',
    protectsAgainst: 'Typhoid fever',
    importance: 'Typhoid is a serious bacterial infection spread through contaminated food and water.',
    sideEffects: ['Fever', 'Headache', 'Abdominal pain', 'Rash'],
    watchFor: ['High fever', 'Severe abdominal pain', 'Signs of intestinal perforation'],
    educationalInfo: 'Typhoid vaccines are recommended for children in endemic areas starting at 12 months.'
  }
}

// IAP Schedule - Age groups with corresponding vaccines
const iapSchedule: { ageGroup: string; ageInWeeks: number; vaccineIds: string[] }[] = [
  { ageGroup: 'Birth', ageInWeeks: 0, vaccineIds: ['bcg', 'hepb', 'opv'] },
  { ageGroup: '6 Weeks', ageInWeeks: 6, vaccineIds: ['dtap', 'ipv', 'hib', 'pcv', 'rv', 'hepb', 'opv'] },
  { ageGroup: '10 Weeks', ageInWeeks: 10, vaccineIds: ['dtap', 'ipv', 'hib', 'pcv', 'rv', 'hepb', 'opv'] },
  { ageGroup: '14 Weeks', ageInWeeks: 14, vaccineIds: ['dtap', 'ipv', 'hib', 'pcv', 'rv', 'hepb', 'opv'] },
  { ageGroup: '6 Months', ageInWeeks: 26, vaccineIds: ['dtap', 'hepb', 'opv'] },
  { ageGroup: '9 Months', ageInWeeks: 39, vaccineIds: ['mmr', 'je'] },
  { ageGroup: '12 Months', ageInWeeks: 52, vaccineIds: ['hepa', 'typhoid'] },
  { ageGroup: '15 Months', ageInWeeks: 65, vaccineIds: ['mmr', 'var', 'hepa'] },
  { ageGroup: '18 Months', ageInWeeks: 78, vaccineIds: ['dtap', 'hib', 'pcv', 'opv'] },
  { ageGroup: '2 Years', ageInWeeks: 104, vaccineIds: ['typhoid', 'hepa'] },
]

// ============================================================================
// COMPONENTS
// ============================================================================

// Progress Ring Component
function ProgressRing({ progress, size = 180, strokeWidth = 12 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e8efee"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#7bada6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-forest">{Math.round(progress)}%</span>
        <span className="text-sm text-forest/60 font-medium">Vaccinated</span>
      </div>
    </div>
  )
}

// Status Badge Component
function StatusBadge({ status }: { status: 'completed' | 'due' | 'upcoming' | 'overdue' }) {
  const styles = {
    completed: 'bg-sage/20 text-forest',
    due: 'bg-coral/15 text-coral',
    upcoming: 'bg-mist text-forest/60',
    overdue: 'bg-red-100 text-red-700'
  }

  const icons = {
    completed: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    due: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    upcoming: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    overdue: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

// Modal Component
function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-forest/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-up">
          <div className="sticky top-0 bg-white border-b border-mist/50 px-6 py-4 flex items-center justify-between">
            <h3 className="font-display text-xl text-forest">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-mist transition-colors"
            >
              <svg className="w-5 h-5 text-forest/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function VaccinationsPage() {
  // State
  const [childAge, setChildAge] = useState<{ years: number; months: number; days: number }>({ years: 0, months: 4, days: 12 })
  const [vaccinationRecords, setVaccinationRecords] = useState<Map<string, VaccinationRecord>>(new Map())
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [reminders, setReminders] = useState<Map<string, boolean>>(new Map())
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule'>('overview')

  // Add vaccination form state
  const [formData, setFormData] = useState({
    vaccineId: '',
    dateGiven: new Date().toISOString().split('T')[0],
    batchNumber: '',
    healthcareProvider: '',
    hospital: '',
    notes: ''
  })

  // Calculate scheduled vaccines based on child age
  const getScheduledVaccines = (): ScheduledVaccine[] => {
    const now = new Date()
    const childAgeInWeeks = (childAge.years * 52) + (childAge.months * 4.33) + (childAge.days / 7)

    const scheduled: ScheduledVaccine[] = []

    iapSchedule.forEach(({ ageGroup, ageInWeeks, vaccineIds }) => {
      vaccineIds.forEach(vaccineId => {
        const vaccine = vaccines[vaccineId]
        if (!vaccine) return

        const dueDate = new Date()
        const weeksFromNow = ageInWeeks - childAgeInWeeks
        dueDate.setDate(dueDate.getDate() + (weeksFromNow * 7))

        const record = vaccinationRecords.get(vaccineId)
        let status: 'completed' | 'due' | 'upcoming' | 'overdue' = 'upcoming'

        if (record?.dateGiven) {
          status = 'completed'
        } else if (weeksFromNow < 0) {
          status = 'overdue'
        } else if (weeksFromNow <= 2) {
          status = 'due'
        }

        scheduled.push({
          vaccine,
          ageGroup,
          dueDate,
          status,
          record
        })
      })
    })

    return scheduled
  }

  const scheduledVaccines = getScheduledVaccines()

  // Calculate vaccination progress
  const completedCount = scheduledVaccines.filter(sv => sv.status === 'completed').length
  const totalVaccines = Object.keys(vaccines).length
  const progressPercent = Math.min((completedCount / totalVaccines) * 100, 100)

  // Get upcoming vaccines (next 3)
  const upcomingVaccines = scheduledVaccines
    .filter(sv => sv.status === 'due' || sv.status === 'upcoming')
    .slice(0, 3)

  // Get next due vaccine
  const nextDue = scheduledVaccines.find(sv => sv.status === 'due' || sv.status === 'overdue')

  // Handle mark as given
  const handleMarkAsGiven = (vaccineId: string) => {
    const newRecord: VaccinationRecord = {
      id: `rec-${Date.now()}`,
      vaccineId,
      dateGiven: new Date(),
      hasReaction: false
    }
    setVaccinationRecords(new Map(vaccinationRecords.set(vaccineId, newRecord)))
  }

  // Handle add vaccination
  const handleAddVaccination = () => {
    if (!formData.vaccineId) return

    const newRecord: VaccinationRecord = {
      id: `rec-${Date.now()}`,
      vaccineId: formData.vaccineId,
      dateGiven: new Date(formData.dateGiven),
      batchNumber: formData.batchNumber || undefined,
      healthcareProvider: formData.healthcareProvider || undefined,
      hospital: formData.hospital || undefined,
      notes: formData.notes || undefined,
      hasReaction: false
    }
    setVaccinationRecords(new Map(vaccinationRecords.set(formData.vaccineId, newRecord)))
    setIsAddModalOpen(false)
    setFormData({
      vaccineId: '',
      dateGiven: new Date().toISOString().split('T')[0],
      batchNumber: '',
      healthcareProvider: '',
      hospital: '',
      notes: ''
    })
  }

  // Handle log reaction
  const handleLogReaction = (vaccineId: string) => {
    const record = vaccinationRecords.get(vaccineId)
    if (record) {
      record.hasReaction = true
      setVaccinationRecords(new Map(vaccinationRecords))
    }
  }

  // Handle reminder toggle
  const toggleReminder = (vaccineId: string) => {
    const newReminders = new Map(reminders)
    newReminders.set(vaccineId, !newReminders.get(vaccineId))
    setReminders(newReminders)
  }

  // Group vaccines by age group for schedule view
  const vaccinesByAge = iapSchedule.map(({ ageGroup, vaccineIds }) => ({
    ageGroup,
    vaccines: vaccineIds.map(id => vaccines[id]).filter(Boolean).map(vaccine => ({
      ...vaccine,
      record: vaccinationRecords.get(vaccine.id),
      status: vaccinationRecords.get(vaccine.id) ? 'completed' as const : 'upcoming' as const
    }))
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sage/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-forest">Vaccination Tracker</h1>
            <p className="text-forest/60 text-sm">Based on IAP Schedule for India</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-sage/10 rounded-full">
            <svg className="w-4 h-4 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-forest">IAP Schedule</span>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Vaccination
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-mist/50 w-fit">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'overview'
              ? 'bg-sage text-white shadow-sm'
              : 'text-forest/60 hover:text-forest hover:bg-mist/50'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'schedule'
              ? 'bg-sage text-white shadow-sm'
              : 'text-forest/60 hover:text-forest hover:bg-mist/50'
          }`}
        >
          Full Schedule
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Progress Card */}
          <div className="card p-6 lg:col-span-1">
            <h2 className="section-label">Overall Progress</h2>
            <div className="flex justify-center py-4">
              <ProgressRing progress={progressPercent} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-forest/70">
                <span className="font-semibold text-forest">{completedCount}</span> of {totalVaccines} vaccines completed
              </p>
            </div>
          </div>

          {/* Next Due & Upcoming */}
          <div className="lg:col-span-2 space-y-6">
            {/* Next Due */}
            {nextDue && (
              <div className="card p-6 border-coral/30 bg-coral/5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="section-label text-coral">Next Due</h3>
                    <h4 className="font-display text-2xl text-forest mt-2">{nextDue.vaccine.shortName}</h4>
                    <p className="text-forest/60 mt-1">{nextDue.vaccine.name}</p>
                    <p className="text-sm text-forest/50 mt-2">
                      Due: {nextDue.dueDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={nextDue.status} />
                    <button
                      onClick={() => handleMarkAsGiven(nextDue.vaccine.id)}
                      className="btn btn-secondary text-sm"
                    >
                      Mark as Given
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Vaccinations */}
            <div className="card p-6">
              <h3 className="section-label">Upcoming Vaccinations</h3>
              {upcomingVaccines.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {upcomingVaccines.map((sv) => (
                    <div
                      key={sv.vaccine.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-mist/30 hover:bg-mist/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border border-sage/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-forest">{sv.vaccine.shortName}</span>
                        </div>
                        <div>
                          <p className="font-medium text-forest">{sv.vaccine.shortName}</p>
                          <p className="text-sm text-forest/50">{sv.ageGroup}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={sv.status} />
                        <button
                          onClick={() => {
                            setSelectedVaccine(sv.vaccine)
                            setIsDetailModalOpen(true)
                          }}
                          className="p-2 rounded-full hover:bg-white transition-colors"
                          title="View details"
                        >
                          <svg className="w-4 h-4 text-forest/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-center py-8">
                  <svg className="w-12 h-12 mx-auto text-sage mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-forest/60">All caught up! No upcoming vaccinations.</p>
                </div>
              )}
            </div>

            {/* Book Appointment CTA */}
            <button className="w-full card p-6 text-left hover:border-coral/30 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-forest group-hover:text-coral transition-colors">Book Vaccination Appointment</h4>
                    <p className="text-sm text-forest/60">Schedule with your pediatrician</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-8">
          {vaccinesByAge.map(({ ageGroup, vaccines: ageVaccines }) => (
            <div key={ageGroup}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-forest">{ageGroup}</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pl-4 sm:pl-14">
                {ageVaccines.map((vaccine) => (
                  <div
                    key={vaccine.id}
                    className={`card p-4 transition-colors ${
                      vaccine.status === 'completed'
                        ? 'bg-sage/5 border-sage/30'
                        : 'hover:border-sage/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-forest truncate">{vaccine.shortName}</h4>
                          <StatusBadge status={vaccine.status} />
                        </div>
                        <p className="text-sm text-forest/60 mt-1 truncate">{vaccine.name}</p>
                        {vaccine.record?.dateGiven && (
                          <p className="text-xs text-sage mt-1">
                            Given: {vaccine.record.dateGiven.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-mist/50">
                      <button
                        onClick={() => {
                          setSelectedVaccine(vaccine)
                          setIsDetailModalOpen(true)
                        }}
                        className="flex-1 btn btn-ghost text-xs py-1.5"
                      >
                        Details
                      </button>
                      {vaccine.status !== 'completed' && (
                        <>
                          <button
                            onClick={() => handleMarkAsGiven(vaccine.id)}
                            className="flex-1 btn btn-secondary text-xs py-1.5"
                          >
                            Mark Given
                          </button>
                          <button
                            onClick={() => toggleReminder(vaccine.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              reminders.get(vaccine.id)
                                ? 'bg-coral/10 text-coral'
                                : 'bg-mist/50 text-forest/40 hover:text-forest'
                            }`}
                            title="Toggle reminder"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </button>
                        </>
                      )}
                      {vaccine.status === 'completed' && vaccine.record && (
                        <button
                          onClick={() => handleLogReaction(vaccine.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            vaccine.record.hasReaction
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-mist/50 text-forest/40 hover:text-amber-600'
                          }`}
                          title="Log reaction"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vaccine Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={selectedVaccine?.shortName || ''}
      >
        {selectedVaccine && (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h4 className="font-display text-lg text-forest">{selectedVaccine.name}</h4>
              <p className="text-sm text-coral font-medium mt-1">Protects against: {selectedVaccine.protectsAgainst}</p>
            </div>

            {/* Importance */}
            <div className="p-4 rounded-xl bg-sage/10">
              <h5 className="font-semibold text-forest mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Why is it important?
              </h5>
              <p className="text-sm text-forest/80">{selectedVaccine.importance}</p>
            </div>

            {/* Side Effects */}
            <div>
              <h5 className="font-semibold text-forest mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Possible Side Effects
              </h5>
              <ul className="space-y-1">
                {selectedVaccine.sideEffects.map((effect, i) => (
                  <li key={i} className="text-sm text-forest/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    {effect}
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Watch For */}
            <div>
              <h5 className="font-semibold text-forest mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                What to Watch For
              </h5>
              <ul className="space-y-1">
                {selectedVaccine.watchFor.map((item, i) => (
                  <li key={i} className="text-sm text-forest/80 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Educational Info */}
            <div className="p-4 rounded-xl bg-mist/30">
              <h5 className="font-semibold text-forest mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-forest/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                More Information
              </h5>
              <p className="text-sm text-forest/80">{selectedVaccine.educationalInfo}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  if (selectedVaccine) {
                    handleMarkAsGiven(selectedVaccine.id)
                    setIsDetailModalOpen(false)
                  }
                }}
                className="flex-1 btn btn-secondary"
              >
                Mark as Given
              </button>
              <button className="flex-1 btn btn-ghost">
                Notify Pediatrician
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Vaccination Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Vaccination"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleAddVaccination(); }} className="space-y-5">
          {/* Vaccine Name (Searchable) */}
          <div>
            <label className="block text-sm font-medium text-forest mb-1.5">Vaccine Name</label>
            <select
              value={formData.vaccineId}
              onChange={(e) => setFormData({ ...formData, vaccineId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
              required
            >
              <option value="">Select a vaccine</option>
              {Object.values(vaccines).map((v) => (
                <option key={v.id} value={v.id}>
                  {v.shortName} - {v.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Given */}
          <div>
            <label className="block text-sm font-medium text-forest mb-1.5">Date Given</label>
            <input
              type="date"
              value={formData.dateGiven}
              onChange={(e) => setFormData({ ...formData, dateGiven: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
              required
            />
          </div>

          {/* Batch/Lot Number */}
          <div>
            <label className="block text-sm font-medium text-forest mb-1.5">Batch/Lot Number (Optional)</label>
            <input
              type="text"
              value={formData.batchNumber}
              onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
              placeholder="e.g., ABC123456"
              className="w-full px-4 py-2.5 rounded-xl border border-mist/50 bg-white text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
            />
          </div>

          {/* Healthcare Provider */}
          <div>
            <label className="block text-sm font-medium text-forest mb-1.5">Healthcare Provider</label>
            <input
              type="text"
              value={formData.healthcareProvider}
              onChange={(e) => setFormData({ ...formData, healthcareProvider: e.target.value })}
              placeholder="Dr. Name"
              className="w-full px-4 py-2.5 rounded-xl border border-mist/50 bg-white text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
            />
          </div>

          {/* Hospital/Clinic */}
          <div>
            <label className="block text-sm font-medium text-forest mb-1.5">Hospital/Clinic</label>
            <input
              type="text"
              value={formData.hospital}
              onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
              placeholder="Hospital or clinic name"
              className="w-full px-4 py-2.5 rounded-xl border border-mist/50 bg-white text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-forest mb-1.5">Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-mist/50 bg-white text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="flex-1 btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn btn-primary"
              disabled={!formData.vaccineId}
            >
              Save Vaccination
            </button>
          </div>
        </form>
      </Modal>

      {/* Reminder Toast (shown when reminder is enabled) */}
      {Array.from(reminders.entries()).map(([vaccineId, enabled]) =>
        enabled && (
          <div
            key={`toast-${vaccineId}`}
            className="fixed bottom-6 right-6 z-50 animate-fade-up"
          >
            <div className="card p-4 shadow-lg border-coral/30 bg-white max-w-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-forest">Reminder Set</p>
                  <p className="text-sm text-forest/60">
                    You will be notified when {vaccines[vaccineId]?.shortName} is due.
                  </p>
                </div>
                <button
                  onClick={() => toggleReminder(vaccineId)}
                  className="p-1 hover:bg-mist/50 rounded"
                >
                  <svg className="w-4 h-4 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}
