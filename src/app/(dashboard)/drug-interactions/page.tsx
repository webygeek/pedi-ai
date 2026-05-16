'use client'

import { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { Search, AlertTriangle, CheckCircle, Info, Pill, Plus, X } from 'lucide-react'

interface Drug {
  name: string
  generic: string
  category: string
}

interface Interaction {
  drug1: string
  drug2: string
  severity: 'high' | 'moderate' | 'low'
  description: string
  recommendation: string
}

const commonDrugs: Drug[] = [
  { name: 'Amoxicillin', generic: 'Amoxicillin', category: 'Antibiotic' },
  { name: 'Acetaminophen', generic: 'Paracetamol', category: 'Analgesic' },
  { name: 'Ibuprofen', generic: 'Ibuprofen', category: 'NSAID' },
  { name: 'Azithromycin', generic: 'Azithromycin', category: 'Antibiotic' },
  { name: 'Cetirizine', generic: 'Cetirizine', category: 'Antihistamine' },
  { name: 'Diphenhydramine', generic: 'Diphenhydramine', category: 'Antihistamine' },
  { name: 'Metoclopramide', generic: 'Metoclopramide', category: 'Antiemetic' },
  { name: 'Ondansetron', generic: 'Ondansetron', category: 'Antiemetic' },
  { name: 'Prednisolone', generic: 'Prednisolone', category: 'Corticosteroid' },
  { name: 'Salbutamol', generic: 'Albuterol', category: 'Bronchodilator' },
]

const knownInteractions: Interaction[] = [
  {
    drug1: 'Ibuprofen',
    drug2: 'Aspirin',
    severity: 'moderate',
    description: 'Concurrent use increases risk of GI bleeding',
    recommendation: 'Avoid combination. Use acetaminophen instead.',
  },
  {
    drug1: 'Cetirizine',
    drug2: 'Diphenhydramine',
    severity: 'high',
    description: 'Both are antihistamines. Combined use may cause excessive sedation.',
    recommendation: 'Avoid concurrent use. Choose one antihistamine.',
  },
  {
    drug1: 'Metoclopramide',
    drug2: 'Ondansetron',
    severity: 'moderate',
    description: 'Both affect serotonin. Combined use may increase risk of serotonin syndrome.',
    recommendation: 'Monitor closely if combination is necessary.',
  },
  {
    drug1: 'Ibuprofen',
    drug2: 'Prednisolone',
    severity: 'high',
    description: 'Combined use increases risk of GI ulceration and bleeding.',
    recommendation: 'Avoid combination. Use acetaminophen for pain/fever.',
  },
]

export default function DrugInteractionsPage() {
  const { user } = useAuth()
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddDrug, setShowAddDrug] = useState(false)

  const filteredDrugs = commonDrugs.filter(
    drug =>
      drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drug.generic.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addDrug = (drug: Drug) => {
    if (!selectedDrugs.find(d => d.name === drug.name)) {
      setSelectedDrugs([...selectedDrugs, drug])
    }
    setSearchQuery('')
    setShowAddDrug(false)
  }

  const removeDrug = (drugName: string) => {
    setSelectedDrugs(selectedDrugs.filter(d => d.name !== drugName))
  }

  const findInteractions = () => {
    const interactions: Interaction[] = []
    for (let i = 0; i < selectedDrugs.length; i++) {
      for (let j = i + 1; j < selectedDrugs.length; j++) {
        const interaction = knownInteractions.find(
          int =>
            (int.drug1 === selectedDrugs[i].name && int.drug2 === selectedDrugs[j].name) ||
            (int.drug1 === selectedDrugs[j].name && int.drug2 === selectedDrugs[i].name)
        )
        if (interaction) {
          interactions.push(interaction)
        }
      }
    }
    return interactions
  }

  const interactions = findInteractions()

  const getSeverityBadge = (severity: 'high' | 'moderate' | 'low') => {
    switch (severity) {
      case 'high':
        return { bg: 'bg-red-100', text: 'text-red-700', label: 'High Risk' }
      case 'moderate':
        return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Moderate' }
      case 'low':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Low Risk' }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl text-forest">Drug Interaction Checker</h1>
        <p className="text-forest/60 mt-1">Check for potential drug interactions in pediatric patients</p>
      </div>

      {/* Reference Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium">Clinical Reference Tool</p>
          <p className="text-blue-700 mt-1">
            This checker helps identify potential drug interactions. Always verify against complete patient medication history and consult pediatric dosing guidelines.
          </p>
        </div>
      </div>

      {/* Selected Drugs */}
      <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg text-forest">Selected Medications</h2>
          <button
            onClick={() => setShowAddDrug(!showAddDrug)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c4a45] text-white rounded-lg font-medium hover:bg-[#234039] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Drug
          </button>
        </div>

        {selectedDrugs.length === 0 ? (
          <div className="text-center py-8 text-forest/50">
            <Pill className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Add medications to check for interactions</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedDrugs.map((drug) => (
              <span
                key={drug.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2c4a45]/10 text-[#2c4a45] rounded-full text-sm font-medium"
              >
                {drug.name}
                <button onClick={() => removeDrug(drug.name)} className="hover:text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Search */}
        {showAddDrug && (
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/40" />
            <input
              type="text"
              placeholder="Search medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-cream border border-mist/50 rounded-xl focus:ring-2 focus:ring-sage/50 focus:border-sage"
              autoFocus
            />
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-mist/50 rounded-xl shadow-lg max-h-48 overflow-y-auto z-10">
                {filteredDrugs.map((drug) => (
                  <button
                    key={drug.name}
                    onClick={() => addDrug(drug)}
                    className="w-full px-4 py-3 text-left hover:bg-cream transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-forest">{drug.name}</p>
                      <p className="text-sm text-forest/60">{drug.generic} · {drug.category}</p>
                    </div>
                    <Plus className="w-5 h-5 text-sage" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interactions */}
      <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
        <h2 className="font-display text-lg text-forest mb-4">Interaction Results</h2>

        {selectedDrugs.length < 2 ? (
          <div className="text-center py-8 text-forest/50">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Add at least 2 medications to check for interactions</p>
          </div>
        ) : interactions.length === 0 ? (
          <div className="text-center py-8 bg-green-50 rounded-xl">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <p className="font-medium text-green-800">No known interactions found</p>
            <p className="text-sm text-green-700 mt-1">
              The selected medications have no documented interactions
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {interactions.map((interaction, index) => {
              const badge = getSeverityBadge(interaction.severity)
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${
                    interaction.severity === 'high' ? 'bg-red-50 border-red-200' :
                    interaction.severity === 'moderate' ? 'bg-amber-50 border-amber-200' :
                    'bg-green-50 border-green-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      interaction.severity === 'high' ? 'bg-red-100 text-red-600' :
                      interaction.severity === 'moderate' ? 'bg-amber-100 text-amber-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 ${badge.bg} ${badge.text} text-xs font-semibold rounded-full`}>
                          {badge.label}
                        </span>
                        <span className="text-sm font-medium text-forest">
                          {interaction.drug1} + {interaction.drug2}
                        </span>
                      </div>
                      <p className="text-sm text-forest/80 mb-2">{interaction.description}</p>
                      <div className="p-3 bg-white/50 rounded-lg">
                        <p className="text-xs font-medium text-forest/60 uppercase mb-1">Recommendation</p>
                        <p className="text-sm text-forest">{interaction.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Reference */}
      <div className="bg-white rounded-2xl border border-mist/50 p-6 shadow-sm">
        <h2 className="font-display text-lg text-forest mb-4">Common Pediatric Drug Info</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { drug: 'Acetaminophen', dose: '10-15 mg/kg every 4-6 hours', max: '75 mg/kg/day' },
            { drug: 'Ibuprofen', dose: '5-10 mg/kg every 6-8 hours', max: '40 mg/kg/day' },
            { drug: 'Amoxicillin', dose: '20-40 mg/kg/day divided q8h', max: '3g/day' },
            { drug: 'Azithromycin', dose: '10 mg/kg day 1, then 5 mg/kg days 2-5', max: '500mg day 1, 250mg thereafter' },
          ].map((ref) => (
            <div key={ref.drug} className="p-4 bg-cream/50 rounded-xl">
              <p className="font-semibold text-forest">{ref.drug}</p>
              <p className="text-sm text-forest/70 mt-1">Dose: {ref.dose}</p>
              <p className="text-sm text-forest/50">Max: {ref.max}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
