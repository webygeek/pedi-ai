'use client'

import React, { useState, useMemo } from 'react'
import {
  AlertTriangle,
  Pill,
  Heart,
  Phone,
  Calendar,
  Stethoscope,
  Building2,
  Syringe,
  Activity,
  FileText,
  Search,
  Filter,
  Plus,
  X,
  ChevronDown,
  Share2,
  Download,
  Clock,
  User,
  MapPin,
  Beaker,
  AlertCircle,
  Check,
  Link2,
  Copy
} from 'lucide-react'

// Types
type EntryType = 'visit' | 'hospitalization' | 'surgery' | 'allergy' | 'diagnosis' | 'test' | 'vaccination' | 'other'
type Severity = 'mild' | 'moderate' | 'severe'
type FilterType = 'all' | 'visits' | 'illness' | 'hospitalizations' | 'procedures' | 'allergies'

interface MedicalEntry {
  id: string
  type: EntryType
  date: string
  title: string
  description: string
  doctor?: string
  hospital?: string
  attachments: boolean
  shareWithDoctor: boolean
}

interface Allergy {
  id: string
  name: string
  type: 'drug' | 'food' | 'environmental'
  severity: Severity
  reaction: string
  dateIdentified: string
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  prescribedBy: string
}

interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  isPrimary: boolean
}

interface ChronicCondition {
  id: string
  name: string
  diagnosedDate: string
  status: 'active' | 'managed' | 'resolved'
  notes?: string
}

// Sample data
const sampleAllergies: Allergy[] = [
  { id: '1', name: 'Penicillin', type: 'drug', severity: 'severe', reaction: 'Anaphylaxis', dateIdentified: '2019-03-15' },
  { id: '2', name: 'Peanuts', type: 'food', severity: 'severe', reaction: 'Hives, swelling', dateIdentified: '2018-01-20' },
  { id: '3', name: 'Dust mites', type: 'environmental', severity: 'moderate', reaction: 'Sneezing, itchy eyes', dateIdentified: '2020-06-10' },
]

const sampleMedications: Medication[] = [
  { id: '1', name: 'Albuterol inhaler', dosage: '90mcg', frequency: 'As needed', startDate: '2023-08-15', prescribedBy: 'Dr. Sarah Mitchell' },
  { id: '2', name: 'Cetirizine', dosage: '5mg', frequency: 'Once daily', startDate: '2024-01-10', prescribedBy: 'Dr. Sarah Mitchell' },
]

const sampleContacts: EmergencyContact[] = [
  { id: '1', name: 'Jennifer Thompson', relationship: 'Mother', phone: '(555) 123-4567', isPrimary: true },
  { id: '2', name: 'Robert Thompson', relationship: 'Father', phone: '(555) 234-5678', isPrimary: false },
  { id: '3', name: 'Dr. Sarah Mitchell', relationship: 'Pediatrician', phone: '(555) 345-6789', isPrimary: false },
]

const sampleChronicConditions: ChronicCondition[] = [
  { id: '1', name: 'Asthma', diagnosedDate: '2021-04-12', status: 'managed', notes: 'Exercise-induced, well-controlled' },
]

const sampleEntries: MedicalEntry[] = [
  { id: '1', type: 'vaccination', date: '2024-03-15', title: 'DTaP Booster', description: 'Fifth dose of DTaP vaccine administered at school clinic', doctor: 'School Health Services', attachments: true, shareWithDoctor: true },
  { id: '2', type: 'visit', date: '2024-02-20', title: 'Annual Physical Examination', description: 'Routine yearly checkup. Growth metrics normal, development on track. Vaccinations up to date.', doctor: 'Dr. Sarah Mitchell', hospital: 'Sunrise Pediatrics', attachments: false, shareWithDoctor: false },
  { id: '3', type: 'test', date: '2024-01-15', title: 'Allergy Skin Prick Test', description: 'Comprehensive panel testing. Confirmed allergies to penicillin, peanuts, and dust mites.', doctor: 'Dr. Michael Chen', hospital: 'Children\'s Allergy Center', attachments: true, shareWithDoctor: true },
  { id: '4', type: 'diagnosis', date: '2023-12-01', title: 'Upper Respiratory Infection', description: 'Diagnosed with viral URI. Prescribed rest and fluids. Symptoms resolved within 7 days.', doctor: 'Dr. Sarah Mitchell', hospital: 'Sunrise Pediatrics', attachments: false, shareWithDoctor: false },
  { id: '5', type: 'hospitalization', date: '2023-08-10', title: 'Asthma Exacerbation', description: 'Admitted for observation following exercise-induced asthma attack at summer camp. Responded well to nebulizer treatment.', doctor: 'Dr. James Wilson', hospital: 'City Children\'s Hospital', attachments: true, shareWithDoctor: true },
  { id: '6', type: 'visit', date: '2023-06-20', title: 'Follow-up: Asthma Management', description: 'Adjusted inhaler dosage. Lung function improved. Continue current management plan.', doctor: 'Dr. Sarah Mitchell', hospital: 'Sunrise Pediatrics', attachments: false, shareWithDoctor: false },
  { id: '7', type: 'vaccination', date: '2023-04-15', title: 'Flu Vaccine', description: 'Annual influenza vaccination administered', doctor: 'Dr. Sarah Mitchell', attachments: false, shareWithDoctor: true },
  { id: '8', type: 'visit', date: '2022-11-10', title: 'Ear Infection', description: 'Acute otitis media diagnosed. Prescribed antibiotics. Follow-up not required.', doctor: 'Dr. Sarah Mitchell', hospital: 'Sunrise Pediatrics', attachments: false, shareWithDoctor: false },
]

// Entry type icons and labels
const entryTypeConfig: Record<EntryType, { icon: React.ReactNode; label: string; color: string }> = {
  visit: { icon: <Stethoscope className="w-4 h-4" />, label: 'Doctor Visit', color: 'text-sage' },
  hospitalization: { icon: <Building2 className="w-4 h-4" />, label: 'Hospitalization', color: 'text-coral' },
  surgery: { icon: <Activity className="w-4 h-4" />, label: 'Surgery', color: 'text-forest' },
  allergy: { icon: <AlertTriangle className="w-4 h-4" />, label: 'Allergy', color: 'text-red-500' },
  diagnosis: { icon: <FileText className="w-4 h-4" />, label: 'Diagnosis', color: 'text-blue-500' },
  test: { icon: <Beaker className="w-4 h-4" />, label: 'Test Result', color: 'text-purple-500' },
  vaccination: { icon: <Syringe className="w-4 h-4" />, label: 'Vaccination', color: 'text-green-500' },
  other: { icon: <FileText className="w-4 h-4" />, label: 'Other', color: 'text-gray-500' },
}

const severityConfig: Record<Severity, { label: string; bg: string; text: string }> = {
  mild: { label: 'Mild', bg: 'bg-amber-100', text: 'text-amber-800' },
  moderate: { label: 'Moderate', bg: 'bg-orange-100', text: 'text-orange-800' },
  severe: { label: 'Severe', bg: 'bg-red-100', text: 'text-red-800' },
}

// Components
function QuickInfoCard({ icon, title, value, variant = 'default' }: { icon: React.ReactNode; title: string; value: string | number; variant?: 'default' | 'alert' }) {
  const variantStyles = variant === 'alert'
    ? 'bg-red-50 border-red-200'
    : 'bg-white border-mist/50'

  const iconStyles = variant === 'alert'
    ? 'bg-red-100 text-red-600'
    : 'bg-mist text-forest'

  return (
    <div className={`card p-5 ${variantStyles} hover:shadow-md transition-shadow`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${iconStyles}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest/60 mb-1">{title}</p>
          <p className={`font-semibold text-lg truncate ${variant === 'alert' ? 'text-red-700' : 'text-forest'}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

function TimelineEntry({ entry, onViewDetails }: { entry: MedicalEntry; onViewDetails: (entry: MedicalEntry) => void }) {
  const config = entryTypeConfig[entry.type]

  return (
    <div className="relative pl-8 pb-8 group">
      {/* Timeline line */}
      <div className="absolute left-[15px] top-2 bottom-0 w-0.5 bg-mist group-last:hidden" />

      {/* Timeline dot */}
      <div className={`absolute left-0 top-1.5 w-8 h-8 rounded-full bg-white border-2 border-sage flex items-center justify-center ${config.color}`}>
        {config.icon}
      </div>

      {/* Entry card */}
      <div
        className="card p-4 ml-4 cursor-pointer hover:shadow-md hover:border-sage/30 transition-all"
        onClick={() => onViewDetails(entry)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-mist ${config.color}`}>
                {config.icon}
                {config.label}
              </span>
              {entry.attachments && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sage/10 text-sage">
                  <FileText className="w-3 h-3" />
                  Report
                </span>
              )}
            </div>
            <h4 className="font-semibold text-forest mb-1">{entry.title}</h4>
            <p className="text-sm text-forest/70 line-clamp-2">{entry.description}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-forest/60">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
              {entry.doctor && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {entry.doctor}
                </span>
              )}
              {entry.hospital && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {entry.hospital}
                </span>
              )}
            </div>
          </div>
          {entry.shareWithDoctor && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-sage/10 text-sage">
                <Share2 className="w-3 h-3" />
                Shared
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AllergyCard({ allergy, onEdit, onDelete }: { allergy: Allergy; onEdit: (allergy: Allergy) => void; onDelete: (id: string) => void }) {
  const config = severityConfig[allergy.severity]
  const typeIcon = allergy.type === 'drug' ? <Pill className="w-4 h-4" /> : allergy.type === 'food' ? <AlertTriangle className="w-4 h-4" /> : <Activity className="w-4 h-4" />

  return (
    <div className={`card p-4 border-l-4 ${allergy.severity === 'severe' ? 'border-l-red-500' : allergy.severity === 'moderate' ? 'border-l-orange-400' : 'border-l-amber-400'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${allergy.severity === 'severe' ? 'bg-red-100 text-red-600' : allergy.severity === 'moderate' ? 'bg-orange-100 text-orange-600' : 'bg-amber-100 text-amber-600'}`}>
            {typeIcon}
          </div>
          <div>
            <h4 className="font-semibold text-forest">{allergy.name}</h4>
            <p className="text-sm text-forest/60 mb-2">Reaction: {allergy.reaction}</p>
            <div className="flex items-center gap-2">
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                {config.label}
              </span>
              <span className="text-xs text-forest/50 capitalize">{allergy.type}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(allergy)}
            className="p-2 rounded-lg hover:bg-mist text-forest/60 hover:text-forest transition-colors"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(allergy.id)}
            className="p-2 rounded-lg hover:bg-red-50 text-forest/60 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function AddEntryModal({ isOpen, onClose, onSave, entry }: { isOpen: boolean; onClose: () => void; onSave: (entry: MedicalEntry) => void; entry?: MedicalEntry | null }) {
  const [type, setType] = useState<EntryType>(entry?.type || 'visit')
  const [title, setTitle] = useState(entry?.title || '')
  const [description, setDescription] = useState(entry?.description || '')
  const [date, setDate] = useState(entry?.date || new Date().toISOString().split('T')[0])
  const [doctor, setDoctor] = useState(entry?.doctor || '')
  const [hospital, setHospital] = useState(entry?.hospital || '')
  const [hasAttachments, setHasAttachments] = useState(entry?.attachments || false)
  const [shareWithDoctor, setShareWithDoctor] = useState(entry?.shareWithDoctor || false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: entry?.id || `new-${Date.now()}`,
      type,
      date,
      title,
      description,
      doctor: doctor || undefined,
      hospital: hospital || undefined,
      attachments: hasAttachments,
      shareWithDoctor,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden animate-fade-up">
        <div className="p-6 border-b border-mist">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-forest">{entry ? 'Edit Entry' : 'Add Medical Entry'}</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-mist text-forest/60 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-5">
          {/* Entry Type */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Entry Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(entryTypeConfig) as EntryType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                    type === t
                      ? 'border-sage bg-sage/10 text-forest'
                      : 'border-mist text-forest/60 hover:border-sage/50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className={entryTypeConfig[t].color}>{entryTypeConfig[t].icon}</span>
                    {entryTypeConfig[t].label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Annual Checkup"
              required
              className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes, diagnosis details, recommendations..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all resize-none"
            />
          </div>

          {/* Dynamic fields based on type */}
          {(type === 'visit' || type === 'hospitalization' || type === 'surgery' || type === 'diagnosis') && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-forest mb-2">Doctor</label>
                <input
                  type="text"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  placeholder="Dr. Name"
                  className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-forest mb-2">Hospital/Clinic</label>
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  placeholder="Facility name"
                  className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
                />
              </div>
            </div>
          )}

          {type === 'vaccination' && (
            <div>
              <label className="block text-sm font-semibold text-forest mb-2">Vaccine Administered By</label>
              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="Doctor or clinic name"
                className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
              />
            </div>
          )}

          {type === 'test' && (
            <div>
              <label className="block text-sm font-semibold text-forest mb-2">Ordering Physician</label>
              <input
                type="text"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                placeholder="Dr. Name"
                className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
              />
            </div>
          )}

          {/* Attachments */}
          <div className="flex items-center justify-between p-4 bg-mist/50 rounded-xl">
            <div>
              <p className="font-medium text-forest">Attachments</p>
              <p className="text-sm text-forest/60">Lab results, imaging, reports</p>
            </div>
            <button
              type="button"
              onClick={() => setHasAttachments(!hasAttachments)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                hasAttachments ? 'bg-sage' : 'bg-forest/20'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  hasAttachments ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Share with doctor */}
          <div className="flex items-center justify-between p-4 bg-sage/10 rounded-xl">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-sage" />
              <div>
                <p className="font-medium text-forest">Share with doctor</p>
                <p className="text-sm text-forest/60">Make this entry visible to healthcare providers</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShareWithDoctor(!shareWithDoctor)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                shareWithDoctor ? 'bg-sage' : 'bg-forest/20'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  shareWithDoctor ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-coral text-white font-semibold hover:bg-coral-light transition-colors"
          >
            {entry ? 'Update Entry' : 'Add Entry'}
          </button>
        </form>
      </div>
    </div>
  )
}

function AddAllergyModal({ isOpen, onClose, onSave }: { isOpen: boolean; onClose: () => void; onSave: (allergy: Omit<Allergy, 'id'>) => void }) {
  const [name, setName] = useState('')
  const [type, setType] = useState<'drug' | 'food' | 'environmental'>('drug')
  const [severity, setSeverity] = useState<Severity>('moderate')
  const [reaction, setReaction] = useState('')
  const [dateIdentified, setDateIdentified] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, type, severity, reaction, dateIdentified })
    setName('')
    setReaction('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-up">
        <div className="p-6 border-b border-mist">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-forest">Add Allergy</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-mist text-forest/60 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Allergen Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Penicillin, Peanuts"
              required
              className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['drug', 'food', 'environmental'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`p-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                    type === t ? 'border-sage bg-sage/10 text-forest' : 'border-mist text-forest/60 hover:border-sage/50'
                  }`}
                >
                  {t === 'drug' && <Pill className="w-4 h-4 mx-auto mb-1" />}
                  {t === 'food' && <AlertTriangle className="w-4 h-4 mx-auto mb-1" />}
                  {t === 'environmental' && <Activity className="w-4 h-4 mx-auto mb-1" />}
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Severity</label>
            <div className="grid grid-cols-3 gap-2">
              {(['mild', 'moderate', 'severe'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeverity(s)}
                  className={`p-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                    severity === s
                      ? s === 'severe'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : s === 'moderate'
                        ? 'border-orange-400 bg-orange-50 text-orange-700'
                        : 'border-amber-400 bg-amber-50 text-amber-700'
                      : 'border-mist text-forest/60 hover:border-sage/50'
                  }`}
                >
                  {severityConfig[s].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Reaction</label>
            <input
              type="text"
              value={reaction}
              onChange={(e) => setReaction(e.target.value)}
              placeholder="e.g., Hives, Anaphylaxis"
              required
              className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-2">Date Identified</label>
            <input
              type="date"
              value={dateIdentified}
              onChange={(e) => setDateIdentified(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          >
            Add Allergy
          </button>
        </form>
      </div>
    </div>
  )
}

function MedicalSummaryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://pedi.ai/share/medical-record/abc123')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-up">
        <div className="p-6 border-b border-mist">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl text-forest">Medical Summary</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-mist text-forest/60 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient Info */}
          <div className="bg-mist/50 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center">
                <User className="w-8 h-8 text-forest" />
              </div>
              <div>
                <h3 className="font-semibold text-forest text-lg">Emma Thompson</h3>
                <p className="text-sm text-forest/60">DOB: March 15, 2015 | Age: 9 years</p>
                <p className="text-sm text-forest/60">Blood Type: O+</p>
              </div>
            </div>
          </div>

          {/* Summary Sections */}
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Allergies
              </h4>
              <p className="text-sm text-forest/80 mt-1">Penicillin (Severe), Peanuts (Severe)</p>
            </div>

            <div className="border-l-4 border-sage pl-4">
              <h4 className="font-semibold text-forest flex items-center gap-2">
                <Heart className="w-4 h-4" /> Chronic Conditions
              </h4>
              <p className="text-sm text-forest/80 mt-1">Asthma (Managed)</p>
            </div>

            <div className="border-l-4 border-coral pl-4">
              <h4 className="font-semibold text-forest flex items-center gap-2">
                <Pill className="w-4 h-4" /> Current Medications
              </h4>
              <p className="text-sm text-forest/80 mt-1">Albuterol inhaler 90mcg PRN, Cetirizine 5mg daily</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl bg-forest text-white font-semibold hover:bg-forest-light transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>

          {/* Share Link */}
          <div className="bg-mist/50 rounded-xl p-4">
            <p className="text-sm font-medium text-forest mb-2 flex items-center gap-2">
              <Link2 className="w-4 h-4" /> Shareable Link
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value="https://pedi.ai/share/medical-record/abc123"
                readOnly
                className="flex-1 px-3 py-2 rounded-lg border border-mist bg-white text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-lg bg-sage text-white font-medium hover:bg-sage-dark transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Component
export default function MedicalHistoryPage() {
  const [entries, setEntries] = useState<MedicalEntry[]>(sampleEntries)
  const [allergies, setAllergies] = useState<Allergy[]>(sampleAllergies)
  const [medications] = useState<Medication[]>(sampleMedications)
  const [contacts] = useState<EmergencyContact[]>(sampleContacts)
  const [chronicConditions] = useState<ChronicCondition[]>(sampleChronicConditions)

  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false)
  const [isAddAllergyOpen, setIsAddAllergyOpen] = useState(false)
  const [isSummaryOpen, setIsSummaryOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<MedicalEntry | null>(null)

  const filteredEntries = useMemo(() => {
    let result = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    // Apply type filter
    if (activeFilter !== 'all') {
      const typeMap: Record<FilterType, EntryType[]> = {
        all: [],
        visits: ['visit'],
        illness: ['diagnosis'],
        hospitalizations: ['hospitalization'],
        procedures: ['surgery', 'test', 'vaccination'],
        allergies: ['allergy'],
      }
      result = result.filter((e) => typeMap[activeFilter].includes(e.type))
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.doctor?.toLowerCase().includes(query) ||
          e.hospital?.toLowerCase().includes(query)
      )
    }

    // Apply date range
    if (dateRange.start) {
      result = result.filter((e) => new Date(e.date) >= new Date(dateRange.start))
    }
    if (dateRange.end) {
      result = result.filter((e) => new Date(e.date) <= new Date(dateRange.end))
    }

    return result
  }, [entries, activeFilter, searchQuery, dateRange])

  const handleAddEntry = (entry: MedicalEntry) => {
    if (editingEntry) {
      setEntries((prev) => prev.map((e) => (e.id === editingEntry.id ? entry : e)))
      setEditingEntry(null)
    } else {
      setEntries((prev) => [entry, ...prev])
    }
  }

  const handleAddAllergy = (allergy: Omit<Allergy, 'id'>) => {
    setAllergies((prev) => [...prev, { ...allergy, id: `allergy-${Date.now()}` }])
  }

  const handleDeleteAllergy = (id: string) => {
    setAllergies((prev) => prev.filter((a) => a.id !== id))
  }

  const handleEditAllergy = (allergy: Allergy) => {
    // For simplicity, we'll just open the add modal - in production, you'd want a separate edit modal
    handleDeleteAllergy(allergy.id)
    setIsAddAllergyOpen(true)
  }

  const handleViewDetails = (entry: MedicalEntry) => {
    setEditingEntry(entry)
    setIsAddEntryOpen(true)
  }

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'visits', label: 'Visits' },
    { key: 'illness', label: 'Illness' },
    { key: 'hospitalizations', label: 'Hospitalizations' },
    { key: 'procedures', label: 'Procedures' },
    { key: 'allergies', label: 'Allergies' },
  ]

  return (
    <div className="min-h-screen bg-cream pb-12">
      {/* Header */}
      <div className="bg-forest text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-sage-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl">Medical History</h1>
                <p className="text-sage-light/80 text-sm">Emma Thompson, Age 9</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsSummaryOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
              >
                <FileText className="w-4 h-4" /> Summary
              </button>
              <button
                onClick={() => {
                  setEditingEntry(null)
                  setIsAddEntryOpen(true)
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-coral hover:bg-coral-light transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" /> Add Entry
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <QuickInfoCard
            icon={<AlertTriangle className="w-5 h-5" />}
            title="Allergies"
            value={allergies.length > 0 ? allergies.map((a) => a.name).join(', ') : 'None'}
            variant="alert"
          />
          <QuickInfoCard
            icon={<Heart className="w-5 h-5" />}
            title="Chronic Conditions"
            value={chronicConditions.length > 0 ? chronicConditions.map((c) => c.name).join(', ') : 'None'}
          />
          <QuickInfoCard
            icon={<Pill className="w-5 h-5" />}
            title="Current Medications"
            value={medications.length > 0 ? `${medications.length} active` : 'None'}
          />
          <QuickInfoCard
            icon={<Phone className="w-5 h-5" />}
            title="Emergency Contact"
            value={contacts.find((c) => c.isPrimary)?.name || 'Not set'}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <div className="card p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search entries, doctors, hospitals..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-mist focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none transition-all"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 text-sm text-forest/60">
                  <Filter className="w-4 h-4" /> Filter:
                </div>
                {filterButtons.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      activeFilter === key
                        ? 'bg-sage text-white'
                        : 'bg-mist text-forest/70 hover:bg-sage/20'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-forest/60">Date range:</span>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                  className="px-3 py-1.5 rounded-lg border border-mist text-sm focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none"
                />
                <span className="text-forest/40">to</span>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                  className="px-3 py-1.5 rounded-lg border border-mist text-sm focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none"
                />
                {(dateRange.start || dateRange.end) && (
                  <button
                    onClick={() => setDateRange({ start: '', end: '' })}
                    className="text-xs text-coral hover:underline"
                  >
                    Clear dates
                  </button>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-forest">Health Timeline</h2>
                <span className="text-sm text-forest/60">{filteredEntries.length} entries</span>
              </div>

              {filteredEntries.length > 0 ? (
                <div className="space-y-0">
                  {filteredEntries.map((entry) => (
                    <TimelineEntry key={entry.id} entry={entry} onViewDetails={handleViewDetails} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto text-forest/20 mb-4" />
                  <p className="text-forest/60">No entries found matching your criteria</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Allergies Section */}
            <div className="card p-6 border-l-4 border-l-red-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-forest flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Allergies
                </h2>
                <button
                  onClick={() => setIsAddAllergyOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>

              {allergies.length > 0 ? (
                <div className="space-y-3">
                  {allergies.map((allergy) => (
                    <AllergyCard
                      key={allergy.id}
                      allergy={allergy}
                      onEdit={handleEditAllergy}
                      onDelete={handleDeleteAllergy}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-forest/60 text-center py-4">No known allergies</p>
              )}
            </div>

            {/* Medications */}
            <div className="card p-6">
              <h2 className="font-display text-xl text-forest flex items-center gap-2 mb-4">
                <Pill className="w-5 h-5 text-coral" />
                Current Medications
              </h2>

              {medications.length > 0 ? (
                <div className="space-y-3">
                  {medications.map((med) => (
                    <div key={med.id} className="flex items-start gap-3 p-3 bg-mist/50 rounded-xl">
                      <div className="p-2 rounded-lg bg-white">
                        <Pill className="w-4 h-4 text-coral" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-forest">{med.name}</h4>
                        <p className="text-sm text-forest/60">{med.dosage} - {med.frequency}</p>
                        <p className="text-xs text-forest/50 mt-1">Since {new Date(med.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-forest/60 text-center py-4">No current medications</p>
              )}
            </div>

            {/* Emergency Contacts */}
            <div className="card p-6">
              <h2 className="font-display text-xl text-forest flex items-center gap-2 mb-4">
                <Phone className="w-5 h-5 text-sage" />
                Emergency Contacts
              </h2>

              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${contact.isPrimary ? 'bg-sage/20' : 'bg-mist'}`}>
                      <User className={`w-4 h-4 ${contact.isPrimary ? 'text-sage' : 'text-forest/40'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-forest truncate">{contact.name}</h4>
                        {contact.isPrimary && (
                          <span className="px-1.5 py-0.5 rounded bg-sage/20 text-sage text-xs">Primary</span>
                        )}
                      </div>
                      <p className="text-sm text-forest/60">{contact.relationship}</p>
                      <p className="text-sm text-forest/60">{contact.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chronic Conditions */}
            <div className="card p-6">
              <h2 className="font-display text-xl text-forest flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-coral" />
                Chronic Conditions
              </h2>

              {chronicConditions.length > 0 ? (
                <div className="space-y-3">
                  {chronicConditions.map((condition) => (
                    <div key={condition.id} className="p-3 bg-mist/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-forest">{condition.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          condition.status === 'active' ? 'bg-amber-100 text-amber-800' :
                          condition.status === 'managed' ? 'bg-sage/20 text-forest' :
                          'bg-mist text-forest/60'
                        }`}>
                          {condition.status.charAt(0).toUpperCase() + condition.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-forest/60">Since {new Date(condition.diagnosedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
                      {condition.notes && (
                        <p className="text-sm text-forest/50 mt-1 italic">{condition.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-forest/60 text-center py-4">No chronic conditions</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddEntryModal
        isOpen={isAddEntryOpen}
        onClose={() => {
          setIsAddEntryOpen(false)
          setEditingEntry(null)
        }}
        onSave={handleAddEntry}
        entry={editingEntry}
      />

      <AddAllergyModal
        isOpen={isAddAllergyOpen}
        onClose={() => setIsAddAllergyOpen(false)}
        onSave={handleAddAllergy}
      />

      <MedicalSummaryModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
      />
    </div>
  )
}
