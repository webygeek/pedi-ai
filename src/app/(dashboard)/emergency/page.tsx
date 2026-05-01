'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// Types
type EmergencyCategory = 'cpr' | 'choking' | 'poisoning' | 'allergic' | 'seizures' | 'burns' | 'head-injury' | 'breathing'
type CprAgeGroup = 'infant' | 'child' | 'adult'

interface Step {
  id: number
  text: string
  isCritical?: boolean
}

// Emergency Categories Data
const emergencyCategories = [
  {
    id: 'cpr' as EmergencyCategory,
    title: 'CPR',
    description: 'Cardiopulmonary resuscitation',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'choking' as EmergencyCategory,
    title: 'Choking',
    description: 'Airway obstruction',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21c-2.676 0-5.216-.584-7.499-1.882z" />
      </svg>
    ),
  },
  {
    id: 'poisoning' as EmergencyCategory,
    title: 'Poisoning',
    description: 'Ingestion of harmful substances',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'allergic' as EmergencyCategory,
    title: 'Allergic Reaction',
    description: 'Severe allergic response',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.376c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    id: 'seizures' as EmergencyCategory,
    title: 'Seizures',
    description: 'Convulsive episodes',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    id: 'burns' as EmergencyCategory,
    title: 'Burns',
    description: 'Thermal injuries',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214a8.252 8.252 0 0112 0c-1.102 0-2.154-.285-3.106-.808l-2.58 2.58a5.25 5.25 0 003.742 3.742l2.58-2.58c.523.952.808 2.004.808 3.106 0 4.97-4.03 9-9 9s-9-4.03-9-9c0-1.102.285-2.154.808-3.106l-2.58 2.58a5.25 5.25 0 00-3.742 3.742l2.58 2.58a8.232 8.232 0 010-11.712z" />
      </svg>
    ),
  },
  {
    id: 'head-injury' as EmergencyCategory,
    title: 'Head Injury',
    description: 'Trauma to head',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4.5a2.25 2.25 0 01-2.25 2.25H5.25a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v9a2.25 2.25 0 01-2.25 2.25H13.5" />
      </svg>
    ),
  },
  {
    id: 'breathing' as EmergencyCategory,
    title: 'Breathing Difficulty',
    description: 'Respiratory distress',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.126-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 15.625V8.257c0-1.081.768-2.015 1.837-2.175A48.42 48.42 0 016 6.5m12 0v-.37c0-1.081-.768-2.015-1.837-2.175a48.42 48.42 0 00-6-.37" />
      </svg>
    ),
  },
]

// CPR Data by Age Group
const cprData: Record<CprAgeGroup, { steps: Step[]; ratio: string; notes: string[] }> = {
  infant: {
    steps: [
      { id: 1, text: 'Call for help - get someone to dial 108', isCritical: true },
      { id: 2, text: 'Place infant on firm, flat surface' },
      { id: 3, text: 'Give 30 gentle chest compressions - 2 fingers, 1.5 inches deep' },
      { id: 4, text: 'Tilt head back slightly, lift chin - open airway' },
      { id: 5, text: 'Give 2 gentle rescue breaths - cover mouth and nose' },
      { id: 6, text: 'Continue cycle: 30 compressions, 2 breaths' },
      { id: 7, text: 'Keep going until help arrives or infant responds' },
    ],
    ratio: '30:2',
    notes: ['Use 2 fingers only', 'Compress 1.5 inches (4cm)', 'Gentle breaths - watch for chest rise'],
  },
  child: {
    steps: [
      { id: 1, text: 'Call for help - get someone to dial 108', isCritical: true },
      { id: 2, text: 'Place child on firm, flat surface' },
      { id: 3, text: 'Give 30 chest compressions - heel of one hand, 2 inches deep' },
      { id: 4, text: 'Tilt head back, lift chin - open airway' },
      { id: 5, text: 'Give 2 rescue breaths - pinch nose, seal mouth' },
      { id: 6, text: 'Continue cycle: 30 compressions, 2 breaths' },
      { id: 7, text: 'Keep going until help arrives or child responds' },
    ],
    ratio: '30:2',
    notes: ['Use heel of one hand', 'Compress 2 inches (5cm)', 'Maintain head tilt'],
  },
  adult: {
    steps: [
      { id: 1, text: 'Call for help - dial 108 immediately', isCritical: true },
      { id: 2, text: 'Place person on firm, flat surface' },
      { id: 3, text: 'Place heel of one hand on center of chest, other hand on top' },
      { id: 4, text: 'Give 30 chest compressions - 2-2.4 inches deep, 100-120/min' },
      { id: 5, text: 'Tilt head back, lift chin - open airway' },
      { id: 6, text: 'Give 2 rescue breaths - pinch nose, seal mouth, blow' },
      { id: 7, text: 'Continue until help arrives or person responds' },
    ],
    ratio: '30:2',
    notes: ['Use both hands', 'Compress 2-2.4 inches (5-6cm)', 'Let chest fully recoil'],
  },
}

// Additional emergency instructions
const emergencyInstructions: Record<EmergencyCategory, { steps: Step[]; warnings: string[]; doNot: string[] }> = {
  choking: {
    steps: [
      { id: 1, text: 'Call for help - dial 108', isCritical: true },
      { id: 2, text: 'For infants: 5 back blows between shoulder blades' },
      { id: 3, text: 'For infants: 5 chest thrusts with 2 fingers' },
      { id: 4, text: 'For children/adults: 5 abdominal thrusts (Heimlich)' },
      { id: 5, text: 'Alternate: back blows and abdominal thrusts' },
      { id: 6, text: 'If person becomes unresponsive: start CPR' },
    ],
    warnings: ['Do not blind finger sweeps', 'If pregnant or obese: chest thrusts'],
    doNot: ['Do not give water', 'Do not panic'],
  },
  poisoning: {
    steps: [
      { id: 1, text: 'Call Poison Control: 1800-11-6111', isCritical: true },
      { id: 2, text: 'Call 108 if person is unconscious or seizing' },
      { id: 3, text: 'Do NOT induce vomiting unless instructed' },
      { id: 4, text: 'Keep the poison container for reference' },
      { id: 5, text: 'Note the time of ingestion and amount' },
    ],
    warnings: ['Do not give milk or water', 'Do not induce vomiting'],
    doNot: ['Do not give home remedies', 'Do not wait for symptoms'],
  },
  allergic: {
    steps: [
      { id: 1, text: 'Call 108 immediately - this is an emergency', isCritical: true },
      { id: 2, text: 'If prescribed: administer epinephrine (EpiPen) immediately' },
      { id: 3, text: 'Inject into outer thigh muscle' },
      { id: 4, text: 'Call parent/guardian immediately' },
      { id: 5, text: 'Keep person lying down with legs elevated' },
    ],
    warnings: ['Epinephrine is life-saving - use it first', 'Second dose may be needed'],
    doNot: ['Do not delay epinephrine', 'Do not give oral antihistamines first'],
  },
  seizures: {
    steps: [
      { id: 1, text: 'Time the seizure - note duration' },
      { id: 2, text: 'Clear the area of hard/sharp objects' },
      { id: 3, text: 'Place person on side if possible' },
      { id: 4, text: 'Do NOT put anything in mouth' },
      { id: 5, text: 'Call 108 if seizure lasts over 5 minutes' },
      { id: 6, text: 'Stay with person until fully recovered' },
    ],
    warnings: ['Call 108 if first seizure', 'Call 108 if >5 minutes'],
    doNot: ['Do not restrain', 'Do not put fingers in mouth'],
  },
  burns: {
    steps: [
      { id: 1, text: 'Stop the burning - remove from heat source' },
      { id: 2, text: 'Cool burn with running water for 10-20 minutes', isCritical: true },
      { id: 3, text: 'Remove jewelry/clothing near burn before swelling' },
      { id: 4, text: 'Cover with clean, non-fluffy dressing' },
      { id: 5, text: 'Call 108 for severe burns' },
    ],
    warnings: ['Do not apply ice', 'Do not use butter or toothpaste'],
    doNot: ['Do not pop blisters', 'Do not remove stuck clothing'],
  },
  'head-injury': {
    steps: [
      { id: 1, text: 'Call 108 if unresponsive or seizing', isCritical: true },
      { id: 2, text: 'Keep person still - do not move neck' },
      { id: 3, text: 'Apply ice pack wrapped in cloth to reduce swelling' },
      { id: 4, text: 'Watch for vomiting, confusion, unequal pupils' },
      { id: 5, text: 'Stay with person and monitor consciousness' },
    ],
    warnings: ['Sleepiness is normal after minor head injury', 'Wake every 2 hours first night'],
    doNot: ['Do not shake or move abruptly', 'Do not give pain meds without advice'],
  },
  breathing: {
    steps: [
      { id: 1, text: 'Call 108 immediately', isCritical: true },
      { id: 2, text: 'Loosen tight clothing around neck/chest' },
      { id: 3, text: 'Sit child upright to ease breathing' },
      { id: 4, text: 'If prescribed: give rescue inhaler' },
      { id: 5, text: 'Keep calm - your calm helps child stay calm' },
    ],
    warnings: ['Watch for blue lips/fingertips', 'Listen for wheezing or gasping'],
    doNot: ['Do not put child flat on back', 'Do not give cough medicine'],
  },
  cpr: {
    steps: [],
    warnings: [],
    doNot: [],
  },
}

export default function EmergencyPage() {
  const [selectedCategory, setSelectedCategory] = useState<EmergencyCategory | null>(null)
  const [cprAgeGroup, setCprAgeGroup] = useState<CprAgeGroup>('child')
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [compressionCount, setCompressionCount] = useState(0)
  const [showBreath, setShowBreath] = useState(false)

  // CPR Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && selectedCategory === 'cpr') {
      interval = setInterval(() => {
        setCompressionCount((prev) => {
          const newCount = prev + 1
          if (newCount >= 30) {
            setShowBreath(true)
            setTimeout(() => {
              setShowBreath(false)
              return 0
            }, 1500)
          }
          return newCount >= 30 ? 0 : newCount
        })
      }, 600) // ~100 bpm
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, selectedCategory])

  const toggleStep = (stepId: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(stepId)) {
        newSet.delete(stepId)
      } else {
        newSet.add(stepId)
      }
      return newSet
    })
  }

  const resetSteps = () => {
    setCompletedSteps(new Set())
    setCompressionCount(0)
    setShowBreath(false)
  }

  const currentInstruction = selectedCategory ? emergencyInstructions[selectedCategory] : null

  if (selectedCategory) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => {
              setSelectedCategory(null)
              setIsTimerRunning(false)
              resetSteps()
            }}
            className="w-10 h-10 rounded-xl bg-white border border-mist flex items-center justify-center hover:bg-mist/50 transition-colors"
          >
            <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <div>
            <h1 className="font-display text-2xl text-forest">
              {emergencyCategories.find((c) => c.id === selectedCategory)?.title}
            </h1>
            <p className="text-sm text-forest/60">
              {emergencyCategories.find((c) => c.id === selectedCategory)?.description}
            </p>
          </div>
        </div>

        {/* CPR Section */}
        {selectedCategory === 'cpr' && (
          <>
            {/* Age Group Selector */}
            <div className="card p-4">
              <p className="text-sm text-forest/60 mb-3 font-medium">Select Age Group</p>
              <div className="flex gap-2">
                {(['infant', 'child', 'adult'] as CprAgeGroup[]).map((age) => (
                  <button
                    key={age}
                    onClick={() => {
                      setCprAgeGroup(age)
                      resetSteps()
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all ${
                      cprAgeGroup === age
                        ? 'bg-forest text-white'
                        : 'bg-mist/50 text-forest hover:bg-mist'
                    }`}
                  >
                    {age.charAt(0).toUpperCase() + age.slice(1)}
                    <span className="block text-xs opacity-70 mt-0.5">
                      {age === 'infant' ? '< 1 year' : age === 'child' ? '1-8 years' : '8+ years'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CPR Timer Display */}
            <div className="card p-8 text-center bg-gradient-to-br from-mist/30 to-cream">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white border-4 border-forest/20 mb-4">
                <span className={`font-display text-4xl font-bold text-forest ${showBreath ? 'text-teal-600' : ''}`}>
                  {showBreath ? '2' : compressionCount}
                </span>
              </div>
              <p className="text-forest/60 mb-4">
                {showBreath ? 'Give 2 breaths' : 'Compressions'}
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    isTimerRunning
                      ? 'bg-coral text-white hover:bg-coral/90'
                      : 'bg-forest text-white hover:bg-forest/90'
                  }`}
                >
                  {isTimerRunning ? 'Pause' : 'Start CPR'}
                </button>
                <button
                  onClick={() => {
                    setIsTimerRunning(false)
                    resetSteps()
                  }}
                  className="px-6 py-3 rounded-xl font-semibold bg-mist/50 text-forest hover:bg-mist transition-all"
                >
                  Reset
                </button>
              </div>
              <p className="text-sm text-forest/50 mt-4">
                Ratio: 30 compressions : 2 breaths
              </p>
            </div>

            {/* Steps */}
            <div className="card p-5">
              <h3 className="font-display text-lg text-forest mb-4">CPR Steps</h3>
              <div className="space-y-3">
                {cprData[cprAgeGroup].steps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                      completedSteps.has(step.id)
                        ? 'bg-teal-50 border border-teal-200'
                        : 'bg-cream/50 border border-transparent hover:bg-mist/30'
                    } ${step.isCritical ? 'border-l-4 border-l-coral' : ''}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      completedSteps.has(step.id)
                        ? 'bg-teal-500 border-teal-500'
                        : 'border-forest/30'
                    }`}>
                      {completedSteps.has(step.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${completedSteps.has(step.id) ? 'text-forest/50 line-through' : 'text-forest'}`}>
                        {step.text}
                      </p>
                      {step.isCritical && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded">
                          Critical
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="card p-5 bg-mist/30">
              <h4 className="text-sm font-semibold text-forest mb-2">Key Points</h4>
              <ul className="space-y-1">
                {cprData[cprAgeGroup].notes.map((note, i) => (
                  <li key={i} className="text-sm text-forest/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Other Emergency Instructions */}
        {currentInstruction && currentInstruction.steps.length > 0 && (
          <>
            {/* Steps */}
            <div className="card p-5">
              <h3 className="font-display text-lg text-forest mb-4">What To Do</h3>
              <div className="space-y-3">
                {currentInstruction.steps.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => toggleStep(step.id)}
                    className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                      completedSteps.has(step.id)
                        ? 'bg-teal-50 border border-teal-200'
                        : 'bg-cream/50 border border-transparent hover:bg-mist/30'
                    } ${step.isCritical ? 'border-l-4 border-l-coral' : ''}`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      completedSteps.has(step.id)
                        ? 'bg-teal-500 border-teal-500'
                        : 'border-forest/30'
                    }`}>
                      {completedSteps.has(step.id) && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <p className={`text-sm flex-1 ${completedSteps.has(step.id) ? 'text-forest/50 line-through' : 'text-forest'}`}>
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={resetSteps}
                className="mt-4 text-sm text-forest/60 hover:text-forest transition-colors"
              >
                Clear all steps
              </button>
            </div>

            {/* Warnings */}
            {currentInstruction.warnings.length > 0 && (
              <div className="card p-5 border-l-4 border-l-amber-500 bg-amber-50/50">
                <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Important
                </h4>
                <ul className="space-y-1">
                  {currentInstruction.warnings.map((warning, i) => (
                    <li key={i} className="text-sm text-amber-800">{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Do Not */}
            {currentInstruction.doNot.length > 0 && (
              <div className="card p-5 border-l-4 border-l-red-400 bg-red-50/50">
                <h4 className="text-sm font-semibold text-red-700 mb-2">Do NOT</h4>
                <ul className="space-y-1">
                  {currentInstruction.doNot.map((item, i) => (
                    <li key={i} className="text-sm text-red-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Emergency Call Button - Always Visible */}
        <div className="sticky bottom-24 lg:bottom-8 pt-4">
          <a
            href="tel:108"
            className="flex items-center justify-center gap-3 w-full py-4 bg-red-600 text-white rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Emergency Services (108)
          </a>
        </div>

        {/* Medical Disclaimer */}
        <p className="text-xs text-center text-forest/40 py-4">
          This guide provides basic first aid information. Always call emergency services for serious incidents.
        </p>
      </div>
    )
  }

  // Category Selection View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl text-forest mb-2">
          Emergency Guide
        </h1>
        <p className="text-forest/60">
          Step-by-step instructions for common pediatric emergencies.
        </p>
      </div>

      {/* Emergency Call - Always Visible */}
      <a
        href="tel:108"
        className="flex items-center justify-center gap-3 w-full py-4 bg-red-600 text-white rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call 108 - Emergency
      </a>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {emergencyCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="card p-4 text-center hover:shadow-md hover:border-sage/30 transition-all group"
          >
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-mist/50 flex items-center justify-center text-forest group-hover:bg-sage/20 group-hover:text-forest transition-colors">
              {category.icon}
            </div>
            <h3 className="font-semibold text-forest text-sm">{category.title}</h3>
            <p className="text-xs text-forest/50 mt-1">{category.description}</p>
          </button>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="card p-5">
        <h3 className="font-semibold text-forest mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          <a href="tel:108" className="flex items-center justify-between p-3 bg-red-50 rounded-xl hover:bg-red-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-forest text-sm">Emergency Services</p>
                <p className="text-xs text-forest/60">108</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>

          <a href="tel:18001116111" className="flex items-center justify-between p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-forest text-sm">Poison Control</p>
                <p className="text-xs text-forest/60">1800-11-6111</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="text-center py-4 border-t border-mist/50">
        <p className="text-xs text-forest/40 max-w-md mx-auto">
          This guide provides basic first aid instructions for educational purposes. It is not a substitute for professional medical training. In any emergency, call 108 immediately.
        </p>
      </div>
    </div>
  )
}
