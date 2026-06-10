'use client'

import { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { Users, Search, Filter, ChevronRight, Phone, Mail, Calendar, AlertTriangle, CheckCircle } from 'lucide-react'

interface Patient {
  id: string
  name: string
  age: string
  gender: 'male' | 'female'
  parentName: string
  lastVisit: string
  conditions: string[]
  vaccinationStatus: 'up-to-date' | 'due-soon' | 'overdue'
  alerts: number
}

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    age: '2y 4m',
    gender: 'male',
    parentName: 'Priya Sharma',
    lastVisit: '3 days ago',
    conditions: ['Mild asthma'],
    vaccinationStatus: 'up-to-date',
    alerts: 0,
  },
  {
    id: '2',
    name: 'Diya Patel',
    age: '4y 1m',
    gender: 'female',
    parentName: 'Neha Patel',
    lastVisit: '1 week ago',
    conditions: [],
    vaccinationStatus: 'due-soon',
    alerts: 1,
  },
  {
    id: '3',
    name: 'Rohan Gupta',
    age: '6m',
    gender: 'male',
    parentName: 'Rahul Gupta',
    lastVisit: 'Today',
    conditions: ['Feeding difficulty'],
    vaccinationStatus: 'overdue',
    alerts: 2,
  },
  {
    id: '4',
    name: 'Ananya Singh',
    age: '3y 2m',
    gender: 'female',
    parentName: 'Meera Singh',
    lastVisit: '2 weeks ago',
    conditions: [],
    vaccinationStatus: 'up-to-date',
    alerts: 0,
  },
]

const getVaccinationBadge = (status: Patient['vaccinationStatus']) => {
  switch (status) {
    case 'up-to-date':
      return { bg: 'bg-green-100', text: 'text-green-700', label: 'Up to date' }
    case 'due-soon':
      return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Due soon' }
    case 'overdue':
      return { bg: 'bg-red-100', text: 'text-red-700', label: 'Overdue' }
  }
}

export default function PatientsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.parentName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || patient.vaccinationStatus === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-forest">Patient Records</h1>
          <p className="text-forest/60 mt-1">Manage and view patient health records</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-forest/60">
          <Users className="w-4 h-4" />
          <span>{mockPatients.length} patients</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/40" />
          <input
            type="text"
            placeholder="Search patients or parents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-mist/50 rounded-xl focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'up-to-date', 'due-soon', 'overdue'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-[#2c4a45] text-white'
                  : 'bg-white border border-mist/50 text-forest/70 hover:bg-cream'
              }`}
            >
              {status === 'all' ? 'All' : status === 'up-to-date' ? 'Up to date' : status === 'due-soon' ? 'Due soon' : 'Overdue'}
            </button>
          ))}
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-2xl border border-mist/50 shadow-sm overflow-hidden">
        <div className="divide-y divide-mist/30">
          {filteredPatients.map((patient) => {
            const badge = getVaccinationBadge(patient.vaccinationStatus)
            return (
              <div
                key={patient.id}
                className="p-4 hover:bg-cream/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    patient.gender === 'male' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
                  }`}>
                    <span className="text-lg font-bold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-forest">{patient.name}</p>
                      {patient.alerts > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                          <AlertTriangle className="w-3 h-3" />
                          {patient.alerts} alert{patient.alerts > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-forest/60">
                      {patient.age} · Parent: {patient.parentName}
                    </p>
                    {patient.conditions.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {patient.conditions.map((condition) => (
                          <span key={condition} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full">
                            {condition}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-0.5 ${badge.bg} ${badge.text} text-xs font-medium rounded-full`}>
                      {badge.label}
                    </span>
                    <span className="text-xs text-forest/40">Last visit: {patient.lastVisit}</span>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-forest/30 group-hover:text-sage transition-colors" />
                </div>
              </div>
            )
          })}
        </div>

        {filteredPatients.length === 0 && (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-forest/20 mx-auto mb-3" />
            <p className="text-forest/60">No patients found</p>
          </div>
        )}
      </div>
    </div>
  )
}
