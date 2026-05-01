'use client'

import { useState, useMemo } from 'react'
import { Button } from '../../components/Button'

// ============================================================================
// TYPES
// ============================================================================

interface Child {
  id: string
  name: string
  dateOfBirth: Date
  weightKg: number
  gender: 'male' | 'female'
}

interface Medication {
  id: string
  name: string
  brandNames: string[]
  formulations: Formulation[]
  warnings: string[]
  minAgeMonths: number
  contraindications: string[]
}

interface Formulation {
  id: string
  name: string
  concentration: string
  unit: 'ml' | 'tablet' | 'drops'
  concentrationMgPerMl?: number
  concentrationMgPerTablet?: number
  concentrationMgPerMlDrops?: number
  dosagePerKgMg: number
  maxDosePerDay: number
  maxDoseFrequencyHours: number
  dosingFrequency: { label: string; hours: number }[]
  instructions?: string[]
}

interface DoseResult {
  amount: number
  unit: string
  frequency: string
  maxDaily: number
  maxDailyUnit: string
  instructions: string[]
  warnings: string[]
  isSafe: boolean
  safetyLevel: 'safe' | 'caution' | 'danger'
  visualDose: string
}

interface DoseLog {
  id: string
  childId: string
  medication: string
  formulation: string
  amount: number
  unit: string
  timestamp: Date
}

// ============================================================================
// MEDICATION DATABASE (Demo Data - Always Consult Pediatrician)
// ============================================================================

const medications: Medication[] = [
  {
    id: 'acetaminophen',
    name: 'Acetaminophen',
    brandNames: ['Calpol', 'Tylenol', 'Dolo'],
    formulations: [
      {
        id: 'acetaminophen-syrup-120mg',
        name: 'Syrup 120mg/5ml',
        concentration: '120mg/5ml',
        unit: 'ml',
        concentrationMgPerMl: 24,
        dosagePerKgMg: 15,
        maxDosePerDay: 75,
        maxDoseFrequencyHours: 4,
        dosingFrequency: [
          { label: 'Every 4-6 hours', hours: 4 },
          { label: 'Every 6 hours', hours: 6 },
        ],
        instructions: [
          'Shake well before use',
          'Use the measuring device provided',
          'Can be given with or without food',
          'Do not exceed 4 doses in 24 hours',
        ],
      },
      {
        id: 'acetaminophen-syrup-250mg',
        name: 'Syrup 250mg/5ml',
        concentration: '250mg/5ml',
        unit: 'ml',
        concentrationMgPerMl: 50,
        dosagePerKgMg: 15,
        maxDosePerDay: 75,
        maxDoseFrequencyHours: 4,
        dosingFrequency: [
          { label: 'Every 4-6 hours', hours: 4 },
          { label: 'Every 6 hours', hours: 6 },
        ],
        instructions: [
          'Shake well before use',
          'Use the measuring device provided',
          'Can be given with or without food',
          'Do not exceed 4 doses in 24 hours',
        ],
      },
      {
        id: 'acetaminophen-drops-80mg',
        name: 'Drops 80mg/ml',
        concentration: '80mg/ml',
        unit: 'drops',
        concentrationMgPerMlDrops: 80,
        dosagePerKgMg: 15,
        maxDosePerDay: 75,
        maxDoseFrequencyHours: 4,
        dosingFrequency: [
          { label: 'Every 4-6 hours', hours: 4 },
        ],
        instructions: [
          'Shake well before use',
          'Use exact dropper provided',
          'Can be mixed with small amount of liquid',
          'Do not exceed 4 doses in 24 hours',
        ],
      },
      {
        id: 'acetaminophen-tablet-500mg',
        name: 'Tablet 500mg',
        concentration: '500mg/tablet',
        unit: 'tablet',
        concentrationMgPerTablet: 500,
        dosagePerKgMg: 15,
        maxDosePerDay: 75,
        maxDoseFrequencyHours: 4,
        dosingFrequency: [
          { label: 'Every 4-6 hours', hours: 4 },
        ],
        instructions: [
          'Swallow whole with water',
          'Not suitable for children under 6 years',
          'Do not exceed 4 tablets in 24 hours',
        ],
      },
    ],
    warnings: [
      'Do not exceed recommended dose',
      'Check other medications for acetaminophen content',
      'Risk of liver damage with overdose',
    ],
    minAgeMonths: 0,
    contraindications: ['Liver disease', 'Severe kidney impairment'],
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    brandNames: ['Brufen', 'Motrin', 'Ibugard'],
    formulations: [
      {
        id: 'ibuprofen-syrup-100mg',
        name: 'Syrup 100mg/5ml',
        concentration: '100mg/5ml',
        unit: 'ml',
        concentrationMgPerMl: 20,
        dosagePerKgMg: 10,
        maxDosePerDay: 40,
        maxDoseFrequencyHours: 6,
        dosingFrequency: [
          { label: 'Every 6-8 hours', hours: 6 },
          { label: 'Every 8 hours', hours: 8 },
        ],
        instructions: [
          'Shake well before use',
          'Give with food to reduce stomach upset',
          'Use the measuring device provided',
          'Do not exceed 3 doses in 24 hours',
        ],
      },
      {
        id: 'ibuprofen-drops-50mg',
        name: 'Drops 50mg/ml',
        concentration: '50mg/ml',
        unit: 'drops',
        concentrationMgPerMlDrops: 50,
        dosagePerKgMg: 10,
        maxDosePerDay: 40,
        maxDoseFrequencyHours: 6,
        dosingFrequency: [
          { label: 'Every 6-8 hours', hours: 6 },
        ],
        instructions: [
          'Shake well before use',
          'Use exact dropper provided',
          'Give with food',
          'Do not exceed 3 doses in 24 hours',
        ],
      },
      {
        id: 'ibuprofen-tablet-200mg',
        name: 'Tablet 200mg',
        concentration: '200mg/tablet',
        unit: 'tablet',
        concentrationMgPerTablet: 200,
        dosagePerKgMg: 10,
        maxDosePerDay: 40,
        maxDoseFrequencyHours: 6,
        dosingFrequency: [
          { label: 'Every 6-8 hours', hours: 6 },
        ],
        instructions: [
          'Swallow whole with water',
          'Take with food',
          'Not suitable for children under 6 years',
          'Do not exceed 3 tablets in 24 hours',
        ],
      },
    ],
    warnings: [
      'Take with food to avoid stomach upset',
      'Do not use if child is dehydrated',
      'Risk of kidney problems with prolonged use',
    ],
    minAgeMonths: 3,
    contraindications: [
      'Asthma (unless approved by doctor)',
      'Kidney disease',
      'Active stomach ulcer',
      'Bleeding disorders',
    ],
  },
  {
    id: 'cetirizine',
    name: 'Cetirizine',
    brandNames: ['Reactin', 'Zyrtec', 'Cetzine'],
    formulations: [
      {
        id: 'cetirizine-syrup-5mg',
        name: 'Syrup 5mg/5ml',
        concentration: '5mg/5ml',
        unit: 'ml',
        concentrationMgPerMl: 1,
        dosagePerKgMg: 0.25,
        maxDosePerDay: 10,
        maxDoseFrequencyHours: 24,
        dosingFrequency: [
          { label: 'Once daily', hours: 24 },
          { label: 'Every 24 hours', hours: 24 },
        ],
        instructions: [
          'Can be given with or without food',
          'Use the measuring device provided',
          'Usually given at bedtime',
          'Once daily dosing is typically sufficient',
        ],
      },
      {
        id: 'cetirizine-tablet-10mg',
        name: 'Tablet 10mg',
        concentration: '10mg/tablet',
        unit: 'tablet',
        concentrationMgPerTablet: 10,
        dosagePerKgMg: 0.25,
        maxDosePerDay: 10,
        maxDoseFrequencyHours: 24,
        dosingFrequency: [
          { label: 'Once daily', hours: 24 },
        ],
        instructions: [
          'Swallow whole with water',
          'Can be given with or without food',
          'Usually taken at bedtime',
          'Not suitable for children under 6 years',
        ],
      },
    ],
    warnings: [
      'May cause drowsiness in some children',
      'Avoid in children with severe kidney disease',
    ],
    minAgeMonths: 6,
    contraindications: ['Severe kidney impairment', 'End-stage kidney disease'],
  },
  {
    id: 'diphenhydramine',
    name: 'Diphenhydramine',
    brandNames: ['Benadryl', 'Diphendryl'],
    formulations: [
      {
        id: 'diphenhydramine-syrup-12.5mg',
        name: 'Syrup 12.5mg/5ml',
        concentration: '12.5mg/5ml',
        unit: 'ml',
        concentrationMgPerMl: 2.5,
        dosagePerKgMg: 1.25,
        maxDosePerDay: 50,
        maxDoseFrequencyHours: 6,
        dosingFrequency: [
          { label: 'Every 6 hours', hours: 6 },
          { label: 'Every 6-8 hours', hours: 6 },
        ],
        instructions: [
          'May cause drowsiness',
          'Use the measuring device provided',
          'Do not give to children under 2 years',
          'Avoid before activities requiring alertness',
        ],
      },
    ],
    warnings: [
      'Strong drowsiness - use at bedtime only unless directed',
      'Do not give to children under 2 years',
      'Risk of paradoxical excitation in some children',
      'Can cause dry mouth, constipation',
    ],
    minAgeMonths: 24,
    contraindications: [
      'Children under 2 years',
      'Neonates',
      'Premature infants',
      'Narrow-angle glaucoma',
      'Severe liver disease',
    ],
  },
  {
    id: 'amoxicillin',
    name: 'Amoxicillin',
    brandNames: ['Mox', 'Amoxil', 'Wymox'],
    formulations: [
      {
        id: 'amoxicillin-syrup-125mg',
        name: 'Syrup 125mg/5ml',
        concentration: '125mg/5ml',
        unit: 'ml',
        concentrationMgPerMl: 25,
        dosagePerKgMg: 25,
        maxDosePerDay: 100,
        maxDoseFrequencyHours: 8,
        dosingFrequency: [
          { label: 'Every 8 hours (TID)', hours: 8 },
          { label: 'Every 12 hours (BID)', hours: 12 },
        ],
        instructions: [
          'Complete the full course as prescribed',
          'Shake well before use',
          'Use the measuring device provided',
          'Can be given with or without food',
          'Space doses evenly throughout the day',
        ],
      },
      {
        id: 'amoxicillin-syrup-250mg',
        name: 'Syrup 250mg/5ml',
        concentration: '250mg/5ml',
        unit: 'ml',
        concentrationMgPerMl: 50,
        dosagePerKgMg: 25,
        maxDosePerDay: 100,
        maxDoseFrequencyHours: 8,
        dosingFrequency: [
          { label: 'Every 8 hours (TID)', hours: 8 },
          { label: 'Every 12 hours (BID)', hours: 12 },
        ],
        instructions: [
          'Complete the full course as prescribed',
          'Shake well before use',
          'Use the measuring device provided',
          'Can be given with or without food',
        ],
      },
      {
        id: 'amoxicillin-capsule-250mg',
        name: 'Capsule 250mg',
        concentration: '250mg/capsule',
        unit: 'tablet',
        concentrationMgPerTablet: 250,
        dosagePerKgMg: 25,
        maxDosePerDay: 100,
        maxDoseFrequencyHours: 8,
        dosingFrequency: [
          { label: 'Every 8 hours (TID)', hours: 8 },
        ],
        instructions: [
          'Swallow whole with water',
          'Do not open or chew capsules',
          'Complete the full course',
          'Not suitable for children under 3 years',
        ],
      },
    ],
    warnings: [
      'Complete the full course even if feeling better',
      'Risk of allergic reaction - discontinue if rash develops',
      'Diarrhea may occur - contact doctor if severe',
    ],
    minAgeMonths: 0,
    contraindications: ['Penicillin allergy', 'History of amoxicillin-associated liver problems'],
  },
  {
    id: 'azithromycin',
    name: 'Azithromycin',
    brandNames: ['Azithral', 'Zithromax', 'Xith'],
    formulations: [
      {
        id: 'azithromycin-syrup-200mg',
        name: 'Syrup 200mg/5ml',
        concentration: '200mg/5ml',
        unit: 'ml',
        concentrationMgPerMl: 40,
        dosagePerKgMg: 10,
        maxDosePerDay: 500,
        maxDoseFrequencyHours: 24,
        dosingFrequency: [
          { label: 'Once daily', hours: 24 },
        ],
        instructions: [
          'Give once daily for prescribed duration',
          'Shake well before use',
          'Use the measuring device provided',
          'Can be given with or without food',
          'Typically given as 3-day or 5-day course',
        ],
      },
    ],
    warnings: [
      'Complete the full course as prescribed',
      'Give at same time each day',
      'May cause stomach upset',
      'Risk of allergic reaction',
    ],
    minAgeMonths: 6,
    contraindications: ['Macrolide antibiotic allergy', 'Liver disease'],
  },
]

// Demo children data
const demoChildren: Child[] = [
  {
    id: '1',
    name: 'Emma',
    dateOfBirth: new Date('2024-06-15'),
    weightKg: 11.5,
    gender: 'female',
  },
  {
    id: '2',
    name: 'Liam',
    dateOfBirth: new Date('2022-03-22'),
    weightKg: 14.2,
    gender: 'male',
  },
]

// ============================================================================
// ICONS (SVG Components)
// ============================================================================

const Icons = {
  User: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  Plus: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  Search: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  AlertTriangle: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  Shield: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  Info: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  Clock: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Bell: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
  History: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Syringe: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5zm-.5 15c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1zm0-3H8V7h11v8.5zM9.5 10.5l-3 3 1.5 1.5 3-3-1.5-1.5zm3 3l3-3-1.5-1.5-3 3 1.5 1.5z" />
    </svg>
  ),
  Pill: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5-7 4.5z" />
    </svg>
  ),
  Droplet: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" />
    </svg>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  X: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  QuestionMark: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  ),
  Calendar: ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
    </svg>
  ),
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function calculateAge(dateOfBirth: Date): { years: number; months: number; days: number } {
  const today = new Date()
  const birth = new Date(dateOfBirth)

  let years = today.getFullYear() - birth.getFullYear()
  let months = today.getMonth() - birth.getMonth()
  let days = today.getDate() - birth.getDate()

  if (days < 0) {
    months--
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  return { years, months, days }
}

function formatAge(dateOfBirth: Date): string {
  const { years, months, days } = calculateAge(dateOfBirth)

  if (years > 0) {
    if (months > 0) {
      return `${years}y ${months}m`
    }
    return `${years} year${years > 1 ? 's' : ''}`
  }

  if (months > 0) {
    if (days > 0) {
      return `${months}mo ${days}d`
    }
    return `${months} month${months > 1 ? 's' : ''}`
  }

  return `${days} day${days !== 1 ? 's' : ''}`
}

function formatAgeMonths(dateOfBirth: Date): number {
  const { years, months } = calculateAge(dateOfBirth)
  return years * 12 + months
}

function calculateDosage(
  weightKg: number,
  formulation: Formulation
): DoseResult {
  const dosePerAdministration = weightKg * formulation.dosagePerKgMg

  let amount: number
  let unit: string

  switch (formulation.unit) {
    case 'ml':
      amount = dosePerAdministration / (formulation.concentrationMgPerMl || 0)
      unit = 'ml'
      break
    case 'drops':
      amount = dosePerAdministration / (formulation.concentrationMgPerMlDrops || 0)
      unit = 'drops'
      break
    case 'tablet':
      amount = dosePerAdministration / (formulation.concentrationMgPerTablet || 0)
      unit = 'tablet'
      if (amount < 0.5) {
        amount = Math.ceil(amount * 4) / 4 // Quarter tablet increments
      } else {
        amount = Math.round(amount * 2) / 2 // Half tablet increments
      }
      break
    default:
      amount = dosePerAdministration
      unit = 'mg'
  }

  const frequency = formulation.dosingFrequency[0]
  const maxDailyDoseMg = formulation.maxDosePerDay
  const maxDailyUnit = formulation.unit === 'ml'
    ? `${maxDailyDoseMg / (formulation.concentrationMgPerMl || 1)}ml`
    : formulation.unit === 'drops'
    ? `${maxDailyDoseMg / (formulation.concentrationMgPerMlDrops || 1)} drops`
    : `${maxDailyDoseMg / (formulation.concentrationMgPerTablet || 1)} tablets`

  // Determine safety level
  let safetyLevel: 'safe' | 'caution' | 'danger' = 'safe'
  const warnings: string[] = []

  if (dosePerAdministration > maxDailyDoseMg) {
    safetyLevel = 'danger'
    warnings.push(`This dose exceeds the maximum single dose of ${formulation.dosagePerKgMg * weightKg}mg`)
  } else if (dosePerAdministration > maxDailyDoseMg * 0.75) {
    safetyLevel = 'caution'
    warnings.push('Approaching maximum single dose - use with caution')
  }

  // Generate visual dose indicator
  const maxSafeDose = formulation.unit === 'ml'
    ? maxDailyDoseMg / (formulation.concentrationMgPerMl || 1)
    : formulation.unit === 'drops'
    ? maxDailyDoseMg / (formulation.concentrationMgPerMlDrops || 1)
    : maxDailyDoseMg / (formulation.concentrationMgPerTablet || 1)

  const visualPercent = Math.min((amount / maxSafeDose) * 100, 100)

  return {
    amount: Math.round(amount * 10) / 10,
    unit,
    frequency: frequency.label,
    maxDaily: parseFloat(maxDailyUnit),
    maxDailyUnit,
    instructions: formulation.instructions !== undefined ? formulation.instructions : [],
    warnings,
    isSafe: safetyLevel === 'safe',
    safetyLevel,
    visualDose: `${visualPercent}%`,
  }
}

// ============================================================================
// COMPONENTS
// ============================================================================

function ChildSelector({
  children,
  selectedChild,
  onSelect,
  onAddNew,
}: {
  children: Child[]
  selectedChild: Child | null
  onSelect: (child: Child) => void
  onAddNew: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-forest/80 mb-2">
        Select Child
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white border border-mist rounded-xl hover:border-sage focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
      >
        {selectedChild ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
              <Icons.User className="w-5 h-5 text-forest" />
            </div>
            <div className="text-left">
              <p className="font-medium text-forest">{selectedChild.name}</p>
              <p className="text-sm text-forest/60">
                {formatAge(selectedChild.dateOfBirth)} · {selectedChild.weightKg}kg
              </p>
            </div>
          </div>
        ) : (
          <span className="text-forest/50">Choose a child...</span>
        )}
        <Icons.ChevronDown className={`w-5 h-5 text-forest/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-mist rounded-xl shadow-lg z-20 overflow-hidden">
            <div className="p-3 border-b border-mist">
              <div className="relative">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                <input
                  type="text"
                  placeholder="Search children..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-cream rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage/30"
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredChildren.map((child) => (
                <button
                  key={child.id}
                  onClick={() => {
                    onSelect(child)
                    setIsOpen(false)
                    setSearchTerm('')
                  }}
                  className="w-full flex items-center gap-3 p-3 hover:bg-cream transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center">
                    <Icons.User className="w-4 h-4 text-forest" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-forest">{child.name}</p>
                    <p className="text-xs text-forest/60">
                      {formatAge(child.dateOfBirth)} · {child.weightKg}kg
                    </p>
                  </div>
                </button>
              ))}
              {filteredChildren.length === 0 && (
                <p className="p-4 text-center text-sm text-forest/50">No children found</p>
              )}
            </div>
            <div className="p-3 border-t border-mist">
              <button
                onClick={() => {
                  onAddNew()
                  setIsOpen(false)
                  setSearchTerm('')
                }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-coral hover:bg-coral/5 rounded-lg transition-colors"
              >
                <Icons.Plus className="w-4 h-4" />
                Add new child
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function MedicationSearch({
  medications,
  selectedMedication,
  onSelect,
}: {
  medications: Medication[]
  selectedMedication: Medication | null
  onSelect: (med: Medication) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.brandNames.some((b) => b.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-forest/80 mb-2">
        Select Medication
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={!selectedMedication && !isOpen}
        className="w-full flex items-center justify-between p-4 bg-white border border-mist rounded-xl hover:border-sage focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all disabled:opacity-50"
      >
        {selectedMedication ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center">
              <Icons.Pill className="w-5 h-5 text-coral" />
            </div>
            <div className="text-left">
              <p className="font-medium text-forest">{selectedMedication.name}</p>
              <p className="text-sm text-forest/60">
                {selectedMedication.brandNames.join(', ')}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-forest/50">Search medications...</span>
        )}
        <Icons.ChevronDown className={`w-5 h-5 text-forest/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-mist rounded-xl shadow-lg z-20 overflow-hidden">
            <div className="p-3 border-b border-mist">
              <div className="relative">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                <input
                  type="text"
                  placeholder="Search by name or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-cream rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage/30"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {filteredMedications.map((med) => (
                <button
                  key={med.id}
                  onClick={() => {
                    onSelect(med)
                    setIsOpen(false)
                    setSearchTerm('')
                  }}
                  className="w-full flex items-start gap-3 p-4 hover:bg-cream transition-colors border-b border-mist/50 last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icons.Pill className="w-4 h-4 text-coral" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-forest">{med.name}</p>
                    <p className="text-xs text-forest/60 mt-0.5">
                      Brands: {med.brandNames.join(', ')}
                    </p>
                    <p className="text-xs text-sage mt-1">
                      {med.formulations.length} formulation{med.formulations.length > 1 ? 's' : ''} available
                    </p>
                  </div>
                </button>
              ))}
              {filteredMedications.length === 0 && (
                <p className="p-4 text-center text-sm text-forest/50">No medications found</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function FormulationSelector({
  formulations,
  selectedFormulation,
  onSelect,
}: {
  formulations: Formulation[]
  selectedFormulation: Formulation | null
  onSelect: (form: Formulation) => void
}) {
  const getUnitIcon = (unit: string) => {
    switch (unit) {
      case 'ml':
        return <Icons.Syringe className="w-5 h-5" />
      case 'drops':
        return <Icons.Droplet className="w-5 h-5" />
      case 'tablet':
        return <Icons.Pill className="w-5 h-5" />
      default:
        return <Icons.Pill className="w-5 h-5" />
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-forest/80 mb-2">
        Select Formulation
      </label>
      <div className="grid gap-3">
        {formulations.map((form) => (
          <button
            key={form.id}
            onClick={() => onSelect(form)}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
              selectedFormulation?.id === form.id
                ? 'border-coral bg-coral/5 ring-2 ring-coral/20'
                : 'border-mist hover:border-sage hover:bg-sage/5'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedFormulation?.id === form.id
                  ? 'bg-coral/10 text-coral'
                  : 'bg-sage/10 text-forest'
              }`}
            >
              {getUnitIcon(form.unit)}
            </div>
            <div className="flex-1">
              <p className="font-medium text-forest">{form.name}</p>
              <p className="text-sm text-forest/60">{form.concentration}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-forest">
                {form.dosagePerKgMg}mg/kg
              </p>
              <p className="text-xs text-forest/50">
                Max: {form.maxDosePerDay}mg/day
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function DoseDisplay({ result }: { result: DoseResult }) {
  const safetyStyles = {
    safe: {
      bg: 'bg-sage/10',
      border: 'border-sage',
      text: 'text-sage',
      icon: Icons.Check,
    },
    caution: {
      bg: 'bg-amber-50',
      border: 'border-amber-400',
      text: 'text-amber-700',
      icon: Icons.AlertTriangle,
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-700',
      icon: Icons.AlertTriangle,
    },
  }

  const style = safetyStyles[result.safetyLevel]
  const Icon = style.icon

  return (
    <div className={`rounded-2xl border-2 ${style.bg} ${style.border} p-6`}>
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-full ${style.bg} flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${style.text}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-forest/70 uppercase tracking-wide mb-1">
            Recommended Dose
          </p>
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-bold ${style.text}`}>
              {result.amount}
            </span>
            <span className="text-2xl text-forest/60">{result.unit}</span>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-sm text-forest/70">
              <Icons.Clock className="w-4 h-4" />
              {result.frequency}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-forest/70">
              <Icons.Shield className="w-4 h-4" />
              Max: {result.maxDaily} {result.maxDailyUnit}/day
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SyringeVisual({ amount, unit, maxAmount }: { amount: number; unit: string; maxAmount: number }) {
  const fillPercent = Math.min((amount / maxAmount) * 100, 100)
  const measurementLines = [0, 25, 50, 75, 100]

  return (
    <div className="bg-white rounded-xl border border-mist p-6">
      <h4 className="text-sm font-medium text-forest/80 mb-4 flex items-center gap-2">
        <Icons.Syringe className="w-5 h-5 text-sage" />
        Visual Dosing Guide
      </h4>
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-xs">
          {/* Syringe container */}
          <div className="relative h-48 w-24 mx-auto">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-mist/50 to-cream rounded-2xl border-2 border-sage/30" />

            {/* Measurement lines */}
            <div className="absolute inset-x-0 top-4 bottom-4 flex flex-col justify-between px-4">
              {measurementLines.map((line) => (
                <div key={line} className="flex items-center">
                  <div className="w-6 h-px bg-sage/40" />
                  <span className="ml-2 text-xs text-forest/50">{line === 0 ? '0' : `${line}%`}</span>
                </div>
              ))}
            </div>

            {/* Fill level */}
            <div
              className="absolute bottom-4 left-4 right-4 rounded-b-lg bg-gradient-to-b from-coral/80 to-coral transition-all duration-500"
              style={{ height: `${fillPercent * 0.88}%` }}
            >
              {/* Fill line indicator */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-coral" />
            </div>

            {/* Plunger */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-4 bg-forest/80 rounded transition-all duration-500"
              style={{ bottom: `${fillPercent * 0.88 + 4}%`, height: '8px' }}
            />

            {/* Unit label */}
            <div className="absolute bottom-0 left-0 right-0 text-center">
              <span className="text-lg font-bold text-forest">{amount}</span>
              <span className="text-sm text-forest/60 ml-1">{unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SafetyWarning({
  medication,
  childAgeMonths,
  doseResult,
}: {
  medication: Medication
  childAgeMonths: number
  doseResult: DoseResult | null
}) {
  const warnings: { type: 'danger' | 'caution' | 'info'; message: string }[] = []

  // Age warnings
  if (childAgeMonths < 3) {
    warnings.push({
      type: 'danger',
      message: 'Age under 3 months - CONSULT YOUR PEDIATRICIAN before giving any medication',
    })
  } else if (childAgeMonths < medication.minAgeMonths) {
    warnings.push({
      type: 'danger',
      message: `Not recommended for children under ${medication.minAgeMonths} months of age`,
    })
  } else if (childAgeMonths < 24) {
    warnings.push({
      type: 'caution',
      message: 'Special care required for children under 2 years - consult doctor',
    })
  }

  // Contraindications check
  if (medication.contraindications.length > 0) {
    warnings.push({
      type: 'info',
      message: `Contraindications: ${medication.contraindications.join(', ')}`,
    })
  }

  // Max dose warnings
  if (doseResult && doseResult.warnings.length > 0) {
    doseResult.warnings.forEach((w) => {
      warnings.push({ type: 'caution', message: w })
    })
  }

  // Drug interaction placeholder
  warnings.push({
    type: 'info',
    message: 'Drug interaction check: Verify with pediatrician if child is on other medications',
  })

  return (
    <div className="space-y-3">
      {warnings.map((warning, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 p-4 rounded-xl border ${
            warning.type === 'danger'
              ? 'bg-red-50 border-red-200'
              : warning.type === 'caution'
              ? 'bg-amber-50 border-amber-200'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              warning.type === 'danger'
                ? 'bg-red-100 text-red-600'
                : warning.type === 'caution'
                ? 'bg-amber-100 text-amber-600'
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            {warning.type === 'danger' ? (
              <Icons.X className="w-4 h-4" />
            ) : (
              <Icons.Info className="w-4 h-4" />
            )}
          </div>
          <p
            className={`text-sm ${
              warning.type === 'danger'
                ? 'text-red-800 font-medium'
                : warning.type === 'caution'
                ? 'text-amber-800'
                : 'text-blue-800'
            }`}
          >
            {warning.message}
          </p>
        </div>
      ))}
    </div>
  )
}

function InstructionList({ instructions }: { instructions: string[] }) {
  return (
    <div className="bg-white rounded-xl border border-mist p-5">
      <h4 className="text-sm font-medium text-forest/80 mb-3 flex items-center gap-2">
        <Icons.Check className="w-5 h-5 text-sage" />
        Administration Instructions
      </h4>
      <ul className="space-y-2">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-sage/20 text-forest text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <span className="text-sm text-forest/80">{instruction}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DoseHistory({ logs }: { logs: DoseLog[] }) {
  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-mist p-6 text-center">
        <Icons.History className="w-10 h-10 text-forest/30 mx-auto mb-3" />
        <p className="text-sm text-forest/50">No doses logged yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-mist p-5">
      <h4 className="text-sm font-medium text-forest/80 mb-4 flex items-center gap-2">
        <Icons.History className="w-5 h-5 text-sage" />
        Recent Doses
      </h4>
      <div className="space-y-3">
        {logs.slice(0, 5).map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between py-2 border-b border-mist/50 last:border-0"
          >
            <div>
              <p className="text-sm font-medium text-forest">{log.medication}</p>
              <p className="text-xs text-forest/50">{log.formulation}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-forest">
                {log.amount} {log.unit}
              </p>
              <p className="text-xs text-forest/50">
                {log.timestamp.toLocaleDateString()} {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FAQSection() {
  const faqs = [
    {
      q: 'Is this dose calculation accurate for all children?',
      a: 'No. Every child is unique. This calculator provides estimates based on standard guidelines, but only your pediatrician knows your child\'s complete medical history, current medications, and specific needs.',
    },
    {
      q: 'What if my child is between standard weight ranges?',
      a: 'Use your child\'s actual weight for the most accurate calculation. If your child\'s weight is unusual, consult your pediatrician for personalized dosing advice.',
    },
    {
      q: 'Can I give multiple medications together?',
      a: 'Some medications can interact with each other. Always consult your pediatrician or pharmacist before combining medications, even over-the-counter ones.',
    },
    {
      q: 'What should I do if I miss a dose?',
      a: 'If you miss a dose, give it as soon as you remember. However, if it\'s almost time for the next dose, skip the missed dose. Never double up doses. When in doubt, consult your healthcare provider.',
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-forest/80 flex items-center gap-2">
        <Icons.QuestionMark className="w-5 h-5 text-sage" />
        Is this dose right? FAQ
      </h4>
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-xl border border-mist overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-cream/50 transition-colors"
          >
            <span className="text-sm font-medium text-forest pr-4">{faq.q}</span>
            <Icons.ChevronDown
              className={`w-5 h-5 text-forest/50 flex-shrink-0 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4">
              <p className="text-sm text-forest/70 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function DisclaimerBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
          <Icons.AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h4 className="font-semibold text-amber-800 text-sm">Medical Disclaimer</h4>
          <p className="text-sm text-amber-700 mt-1 leading-relaxed">
            This dosage calculator is for <strong>reference only</strong>. It does not replace professional medical advice.
            Always consult your pediatrician before administering any medication to your child.
            The developers of this app are not responsible for any decisions made based on this information.
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function DosageCalculatorPage() {
  const [children] = useState<Child[]>(demoChildren)
  const [selectedChild, setSelectedChild] = useState<Child | null>(null)
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null)
  const [selectedFormulation, setSelectedFormulation] = useState<Formulation | null>(null)
  const [reminderEnabled, setReminderEnabled] = useState(false)
  const [doseLogs, setDoseLogs] = useState<DoseLog[]>([
    {
      id: '1',
      childId: '1',
      medication: 'Acetaminophen',
      formulation: 'Syrup 120mg/5ml',
      amount: 7.2,
      unit: 'ml',
      timestamp: new Date(Date.now() - 3600000 * 6),
    },
    {
      id: '2',
      childId: '1',
      medication: 'Ibuprofen',
      formulation: 'Syrup 100mg/5ml',
      amount: 5.75,
      unit: 'ml',
      timestamp: new Date(Date.now() - 3600000 * 24),
    },
  ])

  const doseResult = useMemo(() => {
    if (!selectedChild || !selectedFormulation) return null
    return calculateDosage(selectedChild.weightKg, selectedFormulation)
  }, [selectedChild, selectedFormulation])

  const handleLogDose = () => {
    if (!selectedChild || !selectedMedication || !selectedFormulation || !doseResult) return

    const newLog: DoseLog = {
      id: Date.now().toString(),
      childId: selectedChild.id,
      medication: selectedMedication.name,
      formulation: selectedFormulation.name,
      amount: doseResult.amount,
      unit: doseResult.unit,
      timestamp: new Date(),
    }

    setDoseLogs([newLog, ...doseLogs])
  }

  const childAgeMonths = selectedChild ? formatAgeMonths(selectedChild.dateOfBirth) : 0

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white border-b border-mist sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-coral/10 flex items-center justify-center">
                <Icons.Shield className="w-6 h-6 text-coral" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-display font-semibold text-forest">
                  Precision Dosage Calculator
                </h1>
                <p className="text-sm text-forest/60">Safe medication dosing for children</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Disclaimer */}
        <DisclaimerBanner />

        {/* Child Selector */}
        <section className="bg-white rounded-2xl border border-mist p-6">
          <h2 className="text-lg font-display font-medium text-forest mb-4">Child Profile</h2>
          <ChildSelector
            children={children}
            selectedChild={selectedChild}
            onSelect={setSelectedChild}
            onAddNew={() => {
              alert('Add child feature - would navigate to profile setup')
            }}
          />
          {selectedChild && (
            <div className="mt-4 p-4 bg-sage/5 rounded-xl border border-sage/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-forest/50 uppercase tracking-wide">Age</p>
                  <p className="text-lg font-semibold text-forest">{formatAge(selectedChild.dateOfBirth)}</p>
                </div>
                <div>
                  <p className="text-xs text-forest/50 uppercase tracking-wide">Weight</p>
                  <p className="text-lg font-semibold text-forest">{selectedChild.weightKg} kg</p>
                </div>
                <div>
                  <p className="text-xs text-forest/50 uppercase tracking-wide">Age (months)</p>
                  <p className="text-lg font-semibold text-forest">{childAgeMonths} mo</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Medication Selection */}
        <section className="bg-white rounded-2xl border border-mist p-6">
          <h2 className="text-lg font-display font-medium text-forest mb-4">Select Medication</h2>
          <MedicationSearch
            medications={medications}
            selectedMedication={selectedMedication}
            onSelect={(med) => {
              setSelectedMedication(med)
              setSelectedFormulation(null)
            }}
          />

          {selectedMedication && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-forest/80 mb-3">Choose Formulation</h3>
              <FormulationSelector
                formulations={selectedMedication.formulations}
                selectedFormulation={selectedFormulation}
                onSelect={setSelectedFormulation}
              />
            </div>
          )}
        </section>

        {/* Dosage Result */}
        {doseResult && (
          <section className="space-y-4">
            <h2 className="text-lg font-display font-medium text-forest">Calculated Dosage</h2>

            <DoseDisplay result={doseResult} />

            <div className="grid md:grid-cols-2 gap-4">
              <SyringeVisual
                amount={doseResult.amount}
                unit={doseResult.unit}
                maxAmount={
                  selectedFormulation!.unit === 'ml'
                    ? doseResult.maxDaily /
                      (selectedFormulation!.concentrationMgPerMl || 1) /
                      (24 / selectedFormulation!.maxDoseFrequencyHours)
                    : selectedFormulation!.unit === 'drops'
                    ? doseResult.maxDaily /
                      (selectedFormulation!.concentrationMgPerMlDrops || 1) /
                      (24 / selectedFormulation!.maxDoseFrequencyHours)
                    : doseResult.maxDaily /
                      (selectedFormulation!.concentrationMgPerTablet || 1) /
                      (24 / selectedFormulation!.maxDoseFrequencyHours)
                }
              />

              <InstructionList instructions={doseResult.instructions} />
            </div>

            {/* Safety Warnings */}
            {selectedMedication && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-forest/80 flex items-center gap-2">
                  <Icons.AlertTriangle className="w-5 h-5 text-amber-500" />
                  Safety Information
                </h3>
                <SafetyWarning
                  medication={selectedMedication}
                  childAgeMonths={childAgeMonths}
                  doseResult={doseResult}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg" className="flex-1" onClick={handleLogDose}>
                <Icons.Check className="w-5 h-5" />
                Log this dose
              </Button>
              <button
                onClick={() => setReminderEnabled(!reminderEnabled)}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold transition-all ${
                  reminderEnabled
                    ? 'bg-sage text-white'
                    : 'bg-mist text-forest hover:bg-sage/20'
                }`}
              >
                <Icons.Bell className="w-5 h-5" />
                {reminderEnabled ? 'Reminder Set' : 'Set Reminder'}
              </button>
            </div>
          </section>
        )}

        {/* Dose History */}
        <section className="space-y-4">
          <h2 className="text-lg font-display font-medium text-forest">Dose History</h2>
          <DoseHistory logs={doseLogs.filter((log) => !selectedChild || log.childId === selectedChild.id)} />
        </section>

        {/* FAQ Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-display font-medium text-forest">Common Questions</h2>
          <FAQSection />
        </section>

        {/* Final Disclaimer */}
        <div className="bg-forest/5 rounded-2xl p-6 text-center">
          <Icons.Shield className="w-12 h-12 text-forest/40 mx-auto mb-3" />
          <h3 className="font-medium text-forest mb-2">Always Consult Your Pediatrician</h3>
          <p className="text-sm text-forest/70 leading-relaxed">
            This calculator provides estimates based on general guidelines. Your child&apos;s pediatrician
            considers many factors including medical history, current medications, and individual needs.
            When in doubt, always seek professional medical advice.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-mist mt-12 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-forest/50">
            PediAi is not a substitute for professional medical advice, diagnosis, or treatment.
            Always consult your pediatrician with any health concerns.
          </p>
          <p className="text-xs text-forest/40 mt-2">
            Dosage calculations are based on general guidelines and may vary by country and formulation.
          </p>
        </div>
      </footer>
    </div>
  )
}
