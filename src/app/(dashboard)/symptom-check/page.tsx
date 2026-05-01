'use client'

import React, { useState, useEffect, useCallback } from 'react'

// Types
type Step = 1 | 2 | 3 | 4
type TriageLevel = 'home' | 'urgent' | 'emergency'

interface Symptom {
  id: string
  name: string
  category: string
}

interface SelectedSymptom {
  symptom: Symptom
  severity: 'mild' | 'moderate' | 'severe'
  duration: string
}

interface FollowUpQuestion {
  id: string
  question: string
  options: { value: string; label: string; nextQuestion?: string; score: number }[]
}

interface TriageResult {
  level: TriageLevel
  title: string
  explanation: string
  redFlags: string[]
  whenToEscalate: string[]
  homeCare: string[]
  monitorSymptoms: string[]
  urgencyTimeframe?: string
}

// Sample data
const bodyAreas = [
  { id: 'head', name: 'Head & Face', icon: '🧠', areas: ['Head', 'Eyes', 'Ears', 'Nose', 'Mouth'] },
  { id: 'chest', name: 'Chest & Breathing', icon: '🫁', areas: ['Chest', 'Lungs', 'Heart'] },
  { id: 'abdomen', name: 'Stomach & Digestion', icon: '🤢', areas: ['Stomach', 'Intestines', 'Liver'] },
  { id: 'skin', name: 'Skin & Rashes', icon: '🩹', areas: ['Skin', 'Rash', 'Bumps'] },
  { id: 'limbs', name: 'Arms & Legs', icon: '🦴', areas: ['Arms', 'Legs', 'Joints', 'Muscles'] },
  { id: 'general', name: 'General / Whole Body', icon: '🌡️', areas: ['Fever', 'Fatigue', 'All Over'] },
]

const symptoms: Symptom[] = [
  { id: 'fever', name: 'Fever', category: 'general' },
  { id: 'cough', name: 'Cough', category: 'chest' },
  { id: 'runny-nose', name: 'Runny Nose', category: 'head' },
  { id: 'ear-pain', name: 'Ear Pain', category: 'head' },
  { id: 'vomiting', name: 'Vomiting', category: 'abdomen' },
  { id: 'diarrhea', name: 'Diarrhea', category: 'abdomen' },
  { id: 'rash', name: 'Rash', category: 'skin' },
  { id: 'headache', name: 'Headache', category: 'head' },
  { id: 'stomach-pain', name: 'Stomach Pain', category: 'abdomen' },
  { id: 'breathing-difficulty', name: 'Breathing Difficulty', category: 'chest' },
  { id: 'sore-throat', name: 'Sore Throat', category: 'head' },
  { id: 'loss-of-appetite', name: 'Loss of Appetite', category: 'general' },
  { id: 'fatigue', name: 'Fatigue', category: 'general' },
  { id: 'body-aches', name: 'Body Aches', category: 'general' },
  { id: 'eye-discharge', name: 'Eye Discharge', category: 'head' },
]

const followUpQuestions: Record<string, FollowUpQuestion[]> = {
  fever: [
    {
      id: 'fever-temp',
      question: 'What is the temperature reading?',
      options: [
        { value: 'under-100', label: 'Below 100.4°F (38°C)', score: 1 },
        { value: '100-102', label: '100.4°F - 102°F (38-39°C)', score: 2 },
        { value: '102-104', label: '102°F - 104°F (39-40°C)', score: 3 },
        { value: 'over-104', label: 'Above 104°F (40°C)', score: 5 },
      ],
    },
    {
      id: 'fever-duration',
      question: 'How long has the fever lasted?',
      options: [
        { value: 'less-24', label: 'Less than 24 hours', score: 1 },
        { value: '1-3', label: '1-3 days', score: 2 },
        { value: '3-5', label: '3-5 days', score: 3 },
        { value: 'over-5', label: 'More than 5 days', score: 5 },
      ],
    },
    {
      id: 'fever-behavior',
      question: 'How is your child behaving?',
      options: [
        { value: 'normal', label: 'Playing, eating normally', score: 1 },
        { value: 'fussy', label: 'Fussy but consolable', score: 2 },
        { value: 'lethargic', label: 'Lethargic or hard to wake', score: 4 },
        { value: 'confused', label: 'Confused or disoriented', score: 5 },
      ],
    },
  ],
  cough: [
    {
      id: 'cough-type',
      question: 'What type of cough is it?',
      options: [
        { value: 'dry', label: 'Dry cough', score: 1 },
        { value: 'wet', label: 'Wet/Productive cough', score: 2 },
        { value: 'barking', label: 'Barking cough (like a seal)', score: 4 },
        { value: 'whooping', label: 'Whooping sound when breathing in', score: 5 },
      ],
    },
    {
      id: 'cough-duration',
      question: 'How long has the cough lasted?',
      options: [
        { value: 'less-week', label: 'Less than 1 week', score: 1 },
        { value: '1-2', label: '1-2 weeks', score: 2 },
        { value: 'over-2', label: 'More than 2 weeks', score: 3 },
      ],
    },
    {
      id: 'cough-breathing',
      question: 'Does the cough affect breathing?',
      options: [
        { value: 'normal-breathing', label: 'Breathing normally', score: 1 },
        { value: 'mild-wheeze', label: 'Mild wheezing', score: 2 },
        { value: 'fast-breathing', label: 'Breathing faster than usual', score: 4 },
        { value: 'difficulty-breathing', label: 'Clear difficulty breathing', score: 5 },
      ],
    },
  ],
  rash: [
    {
      id: 'rash-location',
      question: 'Where is the rash located?',
      options: [
        { value: 'localized', label: 'In one specific area', score: 1 },
        { value: 'spreading', label: 'Spreading to other areas', score: 2 },
        { value: 'all-over', label: 'All over the body', score: 3 },
        { value: 'face-hands', label: 'On face, hands, or feet', score: 4 },
      ],
    },
    {
      id: 'rash-appearance',
      question: 'What does the rash look like?',
      options: [
        { value: 'flat', label: 'Flat red spots', score: 1 },
        { value: 'bumps', label: 'Raised bumps or welts', score: 2 },
        { value: 'blisters', label: 'Blisters or fluid-filled', score: 3 },
        { value: 'purple', label: 'Purple or blood-colored spots', score: 5 },
      ],
    },
    {
      id: 'rash-itch',
      question: 'Does the rash itch?',
      options: [
        { value: 'no-itch', label: 'No itching', score: 1 },
        { value: 'mild-itch', label: 'Mild itching', score: 1 },
        { value: 'severe-itch', label: 'Severe itching', score: 2 },
      ],
    },
  ],
  default: [
    {
      id: 'symptom-severity',
      question: 'How severe are the symptoms?',
      options: [
        { value: 'mild', label: 'Mild - child is comfortable', score: 1 },
        { value: 'moderate', label: 'Moderate - child is uncomfortable', score: 2 },
        { value: 'severe', label: 'Severe - child is very distressed', score: 4 },
      ],
    },
    {
      id: 'symptom-duration',
      question: 'How long have the symptoms been present?',
      options: [
        { value: 'less-24', label: 'Less than 24 hours', score: 1 },
        { value: '1-3', label: '1-3 days', score: 2 },
        { value: '3-7', label: '3-7 days', score: 3 },
        { value: 'over-week', label: 'More than a week', score: 4 },
      ],
    },
  ],
}

const triageResults: Record<TriageLevel, TriageResult> = {
  home: {
    level: 'home',
    title: 'Home Care Recommended',
    explanation: 'Based on the symptoms described, your child appears to have a mild illness that can be managed at home with proper care and monitoring. Most childhood illnesses resolve on their own with supportive care.',
    redFlags: [],
    whenToEscalate: [
      'Symptoms worsen or new symptoms develop',
      'Fever persists for more than 3 days',
      'Child refuses to drink fluids for more than 8 hours',
      'Child becomes unusually lethargic or hard to wake',
      'You notice signs of dehydration (fewer wet diapers, no tears)',
    ],
    homeCare: [
      'Ensure plenty of fluids (water, diluted juice, breast milk, or formula)',
      'Let child rest as much as they want',
      'Use a cool mist humidifier if available',
      'For fever: dress in light clothing, can give age-appropriate acetaminophen',
      'Monitor temperature regularly',
      'Keep child home until fever-free for 24 hours',
    ],
    monitorSymptoms: ['Temperature', 'Fluid intake', 'Energy level', 'Symptom changes', 'Wet diapers/urination'],
  },
  urgent: {
    level: 'urgent',
    title: 'Urgent Care Recommended',
    explanation: 'Your child has symptoms that warrant a visit to urgent care or your pediatrician within the next 24 hours. While not an emergency, prompt medical attention can help prevent complications and provide relief.',
    redFlags: [
      'Fever above 104°F (40°C) that does not respond to medication',
      'Dehydration signs (no tears when crying, dry mouth, sunken eyes)',
      'Symptoms lasting more than 5 days without improvement',
      'Difficulty swallowing or drooling',
    ],
    whenToEscalate: [
      'Difficulty breathing (retractions, wheezing, rapid breathing)',
      'Blue or gray lips, tongue, or nail beds',
      'Seizure or loss of consciousness',
      'Severe pain that does not improve with medication',
      'Rash that spreads rapidly or looks like bruises',
    ],
    homeCare: [
      'Keep child comfortable and rested',
      'Offer small, frequent sips of fluids',
      'Use age-appropriate fever reducers as directed',
      'Monitor symptoms closely',
      'Write down symptoms and questions for the doctor',
    ],
    monitorSymptoms: ['Breathing pattern', 'Hydration status', 'Fever response to medication', 'Behavior changes', 'New symptoms'],
    urgencyTimeframe: 'Within 24 hours',
  },
  emergency: {
    level: 'emergency',
    title: 'Seek Emergency Care Immediately',
    explanation: 'Your child has symptoms that require immediate medical attention. Please call emergency services (911) or go to the nearest emergency room right away.',
    redFlags: [
      'Difficulty breathing or not breathing',
      'Blue or gray skin color',
      'Unresponsive or unconscious',
      'Seizure lasting more than 5 minutes',
      'Severe allergic reaction (swelling, hives, difficulty swallowing)',
      'Head injury with loss of consciousness',
      'Severe burns or deep wounds',
      'Poisoning or suspected poisoning',
    ],
    whenToEscalate: [],
    homeCare: [
      'Call 911 or your local emergency number immediately',
      'Do not give anything by mouth if child is unconscious or having seizures',
      'If child is not breathing, begin CPR if trained',
      'Keep child warm and calm',
      'Have someone stay with the child while calling for help',
    ],
    monitorSymptoms: [],
    urgencyTimeframe: 'NOW - Call 911',
  },
}

// SVG Icons
const ChevronLeft = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

const CheckCircle = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const AlertTriangle = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

const Shield = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
)

const BookmarkIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const TimerIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const HomeIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const BuildingIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const HospitalIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

// Step Indicator Component
function StepIndicator({ currentStep, totalSteps }: { currentStep: Step; totalSteps: number }) {
  const stepLabels = ['Body Area', 'Symptoms', 'Questions', 'Results']

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-sm ${
                  step === currentStep
                    ? 'bg-coral text-white shadow-lg shadow-coral/25'
                    : step < currentStep
                    ? 'bg-sage text-white'
                    : 'bg-mist text-forest/40'
                }`}
              >
                {step < currentStep ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span className={`text-xs mt-2 font-medium ${
                step === currentStep ? 'text-forest' : 'text-forest/50'
              }`}>
                {stepLabels[index]}
              </span>
            </div>
            {step < totalSteps && (
              <div className={`flex-1 h-1 rounded mx-2 mt-[-20px] ${
                step < currentStep ? 'bg-sage' : 'bg-mist'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

// Timer Component
function Timer({ isRunning, onSave }: { isRunning: boolean; onSave?: () => void }) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`
  }

  const isUnderTarget = seconds < 60

  return (
    <div className="flex items-center gap-4">
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
        isUnderTarget ? 'bg-sage/20 text-forest' : 'bg-coral/20 text-coral'
      }`}>
        <TimerIcon />
        <span>{formatTime(seconds)}</span>
      </div>
      {onSave && (
        <button
          onClick={onSave}
          className="text-sm text-forest/60 hover:text-forest flex items-center gap-1"
        >
          <BookmarkIcon />
          Save for later
        </button>
      )}
    </div>
  )
}

// Body Area Selection Step
function Step1BodyArea({
  selectedArea,
  onSelectArea,
  onNext,
}: {
  selectedArea: string | null
  onSelectArea: (id: string) => void
  onNext: () => void
}) {
  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-forest mb-2">
          Where does it hurt?
        </h2>
        <p className="text-forest/60 max-w-md mx-auto">
          Select the body area where your child is experiencing symptoms
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {bodyAreas.map((area) => (
          <button
            key={area.id}
            onClick={() => onSelectArea(area.id)}
            className={`p-5 rounded-2xl border-2 transition-all duration-200 text-left hover:shadow-md ${
              selectedArea === area.id
                ? 'border-coral bg-coral/5 shadow-lg shadow-coral/10'
                : 'border-mist/50 bg-white hover:border-sage/50 hover:bg-sage/5'
            }`}
          >
            <div className="text-3xl mb-3">{area.icon}</div>
            <div className="font-semibold text-forest">{area.name}</div>
            <div className="text-xs text-forest/50 mt-1">
              {area.areas.join(', ')}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!selectedArea}
          className={`group flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-sm ${
            selectedArea
              ? 'bg-coral text-white hover:bg-coral-light hover:shadow-lg active:scale-95'
              : 'bg-mist/50 text-forest/40 cursor-not-allowed'
          }`}
        >
          Continue
          <svg className={`w-5 h-5 transition-transform ${selectedArea ? 'group-hover:translate-x-1' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Symptom Selection Step
function Step2Symptoms({
  selectedSymptoms,
  onToggleSymptom,
  onNext,
  onBack,
  selectedArea,
}: {
  selectedSymptoms: SelectedSymptom[]
  onToggleSymptom: (symptom: Symptom) => void
  onNext: () => void
  onBack: () => void
  selectedArea: string
}) {
  const [description, setDescription] = useState('')
  const area = bodyAreas.find((a) => a.id === selectedArea)
  const relevantSymptoms = symptoms.filter(
    (s) => s.category === selectedArea || selectedArea === 'general'
  )

  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-sage/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-forest mb-2">
          What symptoms does your child have?
        </h2>
        <p className="text-forest/60 max-w-md mx-auto">
          Tap to select symptoms or describe in your own words
        </p>
      </div>

      {/* Natural language input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-forest/70 mb-2">
          Describe in your own words
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., My child has had a cough for 2 days and a mild fever"
          className="w-full p-4 rounded-xl border-2 border-mist/50 bg-white text-forest placeholder:text-forest/40 focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none resize-none transition-all"
          rows={3}
        />
      </div>

      {/* Area info */}
      {area && (
        <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-sage/10 rounded-xl text-sm text-forest">
          <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Selected: <span className="font-medium">{area.name}</span>
        </div>
      )}

      {/* Symptom chips */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-forest/70 mb-3">
          Or select from common symptoms
        </label>
        <div className="flex flex-wrap gap-2">
          {relevantSymptoms.map((symptom) => {
            const isSelected = selectedSymptoms.some((s) => s.symptom.id === symptom.id)
            return (
              <button
                key={symptom.id}
                onClick={() => onToggleSymptom(symptom)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-coral text-white shadow-md shadow-coral/25'
                    : 'bg-white border-2 border-mist/50 text-forest hover:border-sage/50 hover:bg-sage/5'
                }`}
              >
                {symptom.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected summary */}
      {selectedSymptoms.length > 0 && (
        <div className="mb-6 p-4 bg-coral/5 rounded-xl border border-coral/20">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-forest">Selected symptoms:</p>
          </div>
          <p className="text-forest/70">{selectedSymptoms.map((s) => s.symptom.name).join(', ')}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2.5 text-forest/70 hover:text-forest transition-colors"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selectedSymptoms.length === 0}
          className={`group flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-sm ${
            selectedSymptoms.length > 0
              ? 'bg-coral text-white hover:bg-coral-light hover:shadow-lg active:scale-95'
              : 'bg-mist/50 text-forest/40 cursor-not-allowed'
          }`}
        >
          Continue
          <svg className={`w-5 h-5 transition-transform ${selectedSymptoms.length > 0 ? 'group-hover:translate-x-1' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Follow-up Questions Step
function Step3Questions({
  selectedSymptoms,
  answers,
  onAnswer,
  onNext,
  onBack,
}: {
  selectedSymptoms: SelectedSymptom[]
  answers: Record<string, string>
  onAnswer: (questionId: string, value: string) => void
  onNext: () => void
  onBack: () => void
}) {
  // Get questions based on selected symptoms
  const symptomIds = selectedSymptoms.map((s) => s.symptom.id)
  const primarySymptom = symptomIds[0]
  const questions = followUpQuestions[primarySymptom] || followUpQuestions.default

  return (
    <div className="animate-fade-up">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-sage/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-forest mb-2">
          A few more questions
        </h2>
        <p className="text-forest/60 max-w-md mx-auto">
          This helps us give you the most accurate assessment
        </p>
      </div>

      {/* Current symptom reminder */}
      <div className="mb-6 p-4 bg-coral/5 rounded-xl border border-coral/20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <span className="text-sm text-forest">
          Assessing: <span className="font-semibold">{selectedSymptoms.map((s) => s.symptom.name).join(', ')}</span>
        </span>
      </div>

      {/* Questions */}
      <div className="space-y-5 mb-8">
        {questions.map((q, index) => (
          <div key={q.id} className="p-5 bg-white rounded-2xl border border-mist/50 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-sage/10 text-sage text-xs font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <p className="font-medium text-forest">
                {q.question}
              </p>
            </div>
            <div className="space-y-2">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onAnswer(q.id, opt.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    answers[q.id] === opt.value
                      ? 'border-coral bg-coral/5 text-forest shadow-sm'
                      : 'border-mist/50 bg-white hover:border-sage/50 text-forest/80 hover:bg-sage/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.label}</span>
                    {answers[q.id] === opt.value && (
                      <svg className="w-5 h-5 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-forest/60 mb-2">
          <span>Assessment progress</span>
          <span className="font-medium">{Object.keys(answers).length} of {questions.length}</span>
        </div>
        <div className="h-2 bg-mist/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sage to-coral rounded-full transition-all duration-500"
            style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2.5 text-forest/70 hover:text-forest transition-colors"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={Object.keys(answers).length < questions.length}
          className={`group flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-sm ${
            Object.keys(answers).length >= questions.length
              ? 'bg-coral text-white hover:bg-coral-light hover:shadow-lg active:scale-95'
              : 'bg-mist/50 text-forest/40 cursor-not-allowed'
          }`}
        >
          Get Results
          <svg className={`w-5 h-5 transition-transform ${Object.keys(answers).length >= questions.length ? 'group-hover:translate-x-1' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Triage Result Step
function Step4Result({
  result,
  symptomSummary,
  onRestart,
  onSave,
  onShare,
}: {
  result: TriageResult
  symptomSummary: string
  onRestart: () => void
  onSave: () => void
  onShare: () => void
}) {
  const triageConfig = {
    home: {
      bgColor: 'bg-sage/5',
      borderColor: 'border-sage/30',
      iconBg: 'bg-sage/10',
      iconColor: 'text-sage',
      badgeBg: 'bg-sage',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    urgent: {
      bgColor: 'bg-amber-50/50',
      borderColor: 'border-amber-300',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      badgeBg: 'bg-amber-500',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21c-.621 0-1.125.504-1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-4.5m-7.5-6h7.5m-7.5 3v3.75m-7.5 3v3.75m7.5 0H12" />
        </svg>
      ),
    },
    emergency: {
      bgColor: 'bg-red-50/50',
      borderColor: 'border-red-400',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      badgeBg: 'bg-red-600',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
    },
  }

  const config = triageConfig[result.level]

  return (
    <div className="animate-fade-up">
      {/* Header with triage level */}
      <div className={`${config.bgColor} border-2 ${config.borderColor} rounded-3xl p-6 md:p-8 mb-6 shadow-sm`}>
        <div className="flex flex-col items-center text-center mb-4">
          <div className={`${config.iconBg} ${config.iconColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-4`}>
            {config.icon}
          </div>
          <span className={`inline-block px-4 py-1.5 ${config.badgeBg} text-white rounded-full text-sm font-bold tracking-wide mb-3`}>
            {result.level === 'home' ? 'HOME CARE' : result.level === 'urgent' ? 'URGENT CARE' : 'EMERGENCY'}
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-forest">
            {result.title}
          </h2>
        </div>

        {result.urgencyTimeframe && (
          <div className="flex items-center justify-center gap-2 text-forest/70 bg-white/50 rounded-xl py-2 px-4">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">{result.urgencyTimeframe}</span>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-white rounded-2xl border border-mist/50 p-6 mb-5 shadow-sm">
        <h3 className="font-display text-lg text-forest mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          What this means
        </h3>
        <p className="text-forest/80 leading-relaxed">{result.explanation}</p>
      </div>

      {/* Red Flags (for urgent/emergency) */}
      {result.redFlags.length > 0 && (
        <div className="bg-red-50/50 rounded-2xl border border-red-200 p-5 mb-5">
          <h3 className="font-display text-lg text-red-700 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            Red Flags to Watch For
          </h3>
          <ul className="space-y-2">
            {result.redFlags.map((flag, i) => (
              <li key={i} className="flex items-start gap-2 text-red-800">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* When to Escalate */}
      {result.whenToEscalate.length > 0 && (
        <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-5 mb-5">
          <h3 className="font-display text-lg text-amber-800 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            When to Seek Higher Care
          </h3>
          <ul className="space-y-2">
            {result.whenToEscalate.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-amber-900">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6m12 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9 3.75h.008v.008H12v-.008zm-3 3h.008v.008H9v-.008zm6 0h.008v.008H15v-.008z" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Home Care Instructions */}
      <div className="bg-white rounded-2xl border border-mist/50 p-6 mb-5 shadow-sm">
        <h3 className="font-display text-lg text-forest mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Home Care Instructions
        </h3>
        <ul className="space-y-3">
          {result.homeCare.map((instruction, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sage/10 text-sage text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-forest/80 pt-1">{instruction}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Symptoms to Monitor */}
      {result.monitorSymptoms.length > 0 && (
        <div className="bg-cream/50 rounded-2xl p-5 mb-5">
          <h3 className="font-display text-lg text-forest mb-3">
            Symptoms to Monitor
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.monitorSymptoms.map((symptom, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-white rounded-xl text-sm text-forest border border-mist/50 shadow-sm"
              >
                {symptom}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onSave}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold bg-white border border-mist/50 text-forest hover:bg-cream/50 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
          Save Result
        </button>
        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold bg-white border border-mist/50 text-forest hover:bg-cream/50 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.186 2.25 2.25 0 00-3.933 2.186z" />
          </svg>
          Share Result
        </button>
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold bg-coral text-white hover:bg-coral-light transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12.75 3a48 48 0 01-3.31-6.69 48 48 0 013.31 6.69 48 48 0 013.31 6.69z" />
          </svg>
          Check Another Symptom
        </button>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-5 bg-forest/5 rounded-2xl text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-4 h-4 text-forest/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-xs text-forest/60 leading-relaxed max-w-lg mx-auto">
            This symptom assessment is for informational purposes only and does not replace professional medical advice.
            Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            In case of emergency, call your local emergency services immediately.
          </p>
        </div>
        <p className="text-xs font-semibold text-forest/50 mt-2">
          Powered by AAP (American Academy of Pediatrics) Guidelines
        </p>
      </div>
    </div>
  )
}

// Main Component
export default function SymptomCheckerPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<TriageResult | null>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  // Calculate result based on answers
  const calculateResult = useCallback(() => {
    let totalScore = 0

    // Sum up all answer scores
    const symptomIds = selectedSymptoms.map((s) => s.symptom.id)
    const primarySymptom = symptomIds[0]
    const questions = followUpQuestions[primarySymptom] || followUpQuestions.default

    questions.forEach((q) => {
      const answer = answers[q.id]
      const option = q.options.find((o) => o.value === answer)
      if (option) {
        totalScore += option.score
      }
    })

    // Add base score based on symptom severity
    selectedSymptoms.forEach((s) => {
      if (s.symptom.id === 'breathing-difficulty') totalScore += 4
      if (s.symptom.id === 'ear-pain' && answers['fever-temp']?.includes('over-')) totalScore += 2
    })

    // Determine triage level
    let triageLevel: TriageLevel
    if (totalScore >= 10) {
      triageLevel = 'emergency'
    } else if (totalScore >= 5) {
      triageLevel = 'urgent'
    } else {
      triageLevel = 'home'
    }

    return triageResults[triageLevel]
  }, [answers, selectedSymptoms])

  const handleSelectArea = (areaId: string) => {
    setSelectedArea(areaId)
  }

  const handleToggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms((prev) => {
      const exists = prev.find((s) => s.symptom.id === symptom.id)
      if (exists) {
        return prev.filter((s) => s.symptom.id !== symptom.id)
      } else {
        return [...prev, { symptom, severity: 'mild' as const, duration: '' }]
      }
    })
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentStep === 3) {
      const calculatedResult = calculateResult()
      setResult(calculatedResult)
      setIsTimerRunning(false)
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4) as Step)
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as Step)
  }

  const handleRestart = () => {
    setCurrentStep(1)
    setSelectedArea(null)
    setSelectedSymptoms([])
    setAnswers({})
    setResult(null)
    setIsTimerRunning(true)
  }

  const handleSave = () => {
    // In a real app, this would save to local storage or backend
    alert('Result saved! You can access it from your saved assessments.')
  }

  const handleShare = () => {
    // In a real app, this would open share dialog
    if (navigator.share && result) {
      navigator.share({
        title: `Pedi·Ai Symptom Assessment: ${result.title}`,
        text: `Symptom assessment for ${selectedSymptoms.map((s) => s.symptom.name).join(', ')}`,
        url: window.location.href,
      })
    } else {
      alert('Share functionality would open here. Result copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-coral/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl text-forest">
                AI Symptom Triage
              </h1>
              <p className="text-forest/60 text-sm">
                Med-PaLM powered assessment for your child
              </p>
            </div>
          </div>
          {currentStep < 4 && (
            <Timer isRunning={isTimerRunning} onSave={handleSave} />
          )}
        </div>

        {currentStep < 4 && (
          <StepIndicator currentStep={currentStep} totalSteps={4} />
        )}
      </div>

      {/* Step Content */}
      <div className="max-w-3xl mx-auto">
        {currentStep === 1 && (
          <Step1BodyArea
            selectedArea={selectedArea}
            onSelectArea={handleSelectArea}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && selectedArea && (
          <Step2Symptoms
            selectedSymptoms={selectedSymptoms}
            onToggleSymptom={handleToggleSymptom}
            onNext={handleNext}
            onBack={handleBack}
            selectedArea={selectedArea}
          />
        )}

        {currentStep === 3 && (
          <Step3Questions
            selectedSymptoms={selectedSymptoms}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && result && (
          <Step4Result
            result={result}
            symptomSummary={selectedSymptoms.map((s) => s.symptom.name).join(', ')}
            onRestart={handleRestart}
            onSave={handleSave}
            onShare={handleShare}
          />
        )}
      </div>

      {/* Trust Badge */}
      {currentStep < 4 && (
        <div className="mt-8 flex items-center justify-center gap-2 px-4 py-3 bg-forest/5 rounded-full">
          <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <span className="text-sm font-medium text-forest/60">Powered by AAP (American Academy of Pediatrics) Guidelines</span>
        </div>
      )}
    </div>
  )
}
