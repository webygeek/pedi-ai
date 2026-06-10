'use client'

import { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { Activity, AlertTriangle, CheckCircle, Clock, User, ChevronRight, Filter } from 'lucide-react'

interface TriageCase {
  id: string
  patientName: string
  parentName: string
  symptoms: string[]
  aiTriage: 'home-care' | 'urgent-care' | 'emergency'
  aiConfidence: number
  status: 'pending' | 'reviewed' | 'confirmed'
  submittedAt: string
  concern: string
}

const mockTriageCases: TriageCase[] = [
  {
    id: '1',
    patientName: 'Aarav Sharma',
    parentName: 'Priya Sharma',
    symptoms: ['Fever 101°F', 'Runny nose', 'Cough'],
    aiTriage: 'home-care',
    aiConfidence: 94,
    status: 'pending',
    submittedAt: '2 hours ago',
    concern: 'Mild upper respiratory infection',
  },
  {
    id: '2',
    patientName: 'Diya Patel',
    parentName: 'Neha Patel',
    symptoms: ['Fever 103°F', 'Rash on torso', 'Joint pain'],
    aiTriage: 'urgent-care',
    aiConfidence: 78,
    status: 'pending',
    submittedAt: '30 min ago',
    concern: 'Possible viral exanthem - needs evaluation',
  },
  {
    id: '3',
    patientName: 'Rohan Gupta',
    parentName: 'Rahul Gupta',
    symptoms: ['Difficulty breathing', 'Wheezing', 'Blue lips'],
    aiTriage: 'emergency',
    aiConfidence: 99,
    status: 'reviewed',
    submittedAt: '1 hour ago',
    concern: 'Respiratory distress - ER referral made',
  },
  {
    id: '4',
    patientName: 'Ananya Singh',
    parentName: 'Meera Singh',
    symptoms: ['Abdominal pain', 'Vomiting', 'Diarrhea'],
    aiTriage: 'home-care',
    aiConfidence: 82,
    status: 'confirmed',
    submittedAt: 'Yesterday',
    concern: 'Gastroenteritis - supportive care advised',
  },
]

const getTriageBadge = (triage: TriageCase['aiTriage']) => {
  switch (triage) {
    case 'home-care':
      return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', label: 'Home Care' }
    case 'urgent-care':
      return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', label: 'Urgent Care' }
    case 'emergency':
      return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', label: 'Emergency' }
  }
}

const getStatusBadge = (status: TriageCase['status']) => {
  switch (status) {
    case 'pending':
      return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Pending Review' }
    case 'reviewed':
      return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Under Review' }
    case 'confirmed':
      return { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmed' }
  }
}

export default function TriageReviewPage() {
  const { user } = useAuth()
  const [filterStatus, setFilterStatus] = useState<string>('pending')

  const filteredCases = mockTriageCases.filter(
    c => filterStatus === 'all' || c.status === filterStatus
  )

  const pendingCount = mockTriageCases.filter(c => c.status === 'pending').length
  const urgentCount = mockTriageCases.filter(c => c.aiTriage === 'urgent-care' || c.aiTriage === 'emergency').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-forest">AI Triage Review</h1>
          <p className="text-forest/60 mt-1">Review and confirm AI-powered symptom assessments</p>
        </div>
        <div className="flex items-center gap-3">
          {urgentCount > 0 && (
            <span className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              {urgentCount} urgent
            </span>
          )}
          <span className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-sm font-medium">
            <Clock className="w-4 h-4" />
            {pendingCount} pending
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Home Care', count: mockTriageCases.filter(c => c.aiTriage === 'home-care').length, color: 'text-green-600' },
          { label: 'Urgent Care', count: mockTriageCases.filter(c => c.aiTriage === 'urgent-care').length, color: 'text-amber-600' },
          { label: 'Emergency', count: mockTriageCases.filter(c => c.aiTriage === 'emergency').length, color: 'text-red-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-mist/50 p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-sm text-forest/60">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'pending', 'reviewed', 'confirmed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === status
                ? 'bg-[#2c4a45] text-white'
                : 'bg-white border border-mist/50 text-forest/70 hover:bg-cream'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Triage Cases */}
      <div className="space-y-4">
        {filteredCases.map((caseItem) => {
          const triageBadge = getTriageBadge(caseItem.aiTriage)
          const statusBadge = getStatusBadge(caseItem.status)

          return (
            <div
              key={caseItem.id}
              className={`bg-white rounded-2xl border ${caseItem.aiTriage === 'emergency' ? 'border-red-200' : 'border-mist/50'} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}
            >
              {/* Header */}
              <div className={`p-4 ${caseItem.aiTriage === 'emergency' ? 'bg-red-50' : caseItem.aiTriage === 'urgent-care' ? 'bg-amber-50' : 'bg-cream/50'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      caseItem.aiTriage === 'emergency' ? 'bg-red-100 text-red-600' :
                      caseItem.aiTriage === 'urgent-care' ? 'bg-amber-100 text-amber-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-forest">{caseItem.patientName}</p>
                      <p className="text-sm text-forest/60">Parent: {caseItem.parentName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 ${statusBadge.bg} ${statusBadge.text} text-xs font-medium rounded-full`}>
                      {statusBadge.label}
                    </span>
                    <span className={`px-2 py-0.5 ${triageBadge.bg} ${triageBadge.text} text-xs font-medium rounded-full`}>
                      {triageBadge.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Symptoms */}
                <div>
                  <p className="text-xs font-medium text-forest/50 uppercase mb-2">Reported Symptoms</p>
                  <div className="flex flex-wrap gap-2">
                    {caseItem.symptoms.map((symptom) => (
                      <span key={symptom} className="px-3 py-1 bg-cream rounded-full text-sm text-forest">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Assessment */}
                <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-sage/5 to-cream rounded-xl">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    caseItem.aiTriage === 'emergency' ? 'bg-red-100 text-red-600' :
                    caseItem.aiTriage === 'urgent-care' ? 'bg-amber-100 text-amber-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {caseItem.aiTriage === 'emergency' ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-forest">{caseItem.concern}</p>
                    <p className="text-xs text-forest/50">AI Confidence: {caseItem.aiConfidence}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-forest/40">{caseItem.submittedAt}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 py-2 px-4 bg-[#2c4a45] text-white rounded-lg font-medium hover:bg-[#234039] transition-colors">
                    Review Case
                  </button>
                  <button className="py-2 px-4 bg-white border border-mist/50 text-forest rounded-lg font-medium hover:bg-cream transition-colors">
                    Message Parent
                  </button>
                  {caseItem.aiTriage !== 'home-care' && (
                    <button className="py-2 px-4 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors">
                      Flag for Follow-up
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
