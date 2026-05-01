'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/app/components/Button'
import type { Medicine, MedicineUsage, MedicineFormData, MedicineForm, MedicineStatus } from '@/app/types/medicine'
import { getMedicineStatus, formatDate, getDaysUntilExpiry } from '@/app/types/medicine'

// Sample data for demonstration
const sampleMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol',
    brand: 'Crocin',
    form: 'Syrup',
    strength: '125mg/5ml',
    quantity: 45,
    expiryDate: '2026-08-15',
    purchaseDate: '2026-01-15',
    notes: 'Fever reducer. Give after food.',
    refillThreshold: 20,
    lastUsed: '2026-04-28',
    usageHistory: [
      { id: 'u1', medicineId: '1', dosage: '5ml', administeredAt: '2026-04-28T10:30:00', administeredBy: 'Mom' },
      { id: 'u2', medicineId: '1', dosage: '5ml', administeredAt: '2026-04-27T20:00:00', administeredBy: 'Dad' },
    ],
    restockReminder: true,
    createdAt: '2026-01-15',
    updatedAt: '2026-04-28',
  },
  {
    id: '2',
    name: 'Cetirizine',
    brand: 'Citriz',
    form: 'Drops',
    strength: '10mg/ml',
    quantity: 8,
    expiryDate: '2026-06-01',
    purchaseDate: '2026-02-10',
    notes: 'For allergic reactions. 5 drops once daily.',
    refillThreshold: 5,
    lastUsed: '2026-04-20',
    usageHistory: [
      { id: 'u3', medicineId: '2', dosage: '5 drops', administeredAt: '2026-04-20T08:00:00', administeredBy: 'Mom' },
    ],
    restockReminder: true,
    createdAt: '2026-02-10',
    updatedAt: '2026-04-20',
  },
  {
    id: '3',
    name: 'Amoxicillin',
    brand: 'Novamox',
    form: 'Syrup',
    strength: '125mg/5ml',
    quantity: 30,
    expiryDate: '2026-05-10',
    purchaseDate: '2026-03-20',
    notes: 'Antibiotic. Complete full course.',
    refillThreshold: 10,
    lastUsed: '2026-04-25',
    usageHistory: [],
    restockReminder: false,
    createdAt: '2026-03-20',
    updatedAt: '2026-04-25',
  },
  {
    id: '4',
    name: 'Ibuprofen',
    brand: 'Motrin',
    form: 'Syrup',
    strength: '100mg/5ml',
    quantity: 60,
    expiryDate: '2025-12-01',
    purchaseDate: '2025-08-01',
    notes: 'Pain and fever reducer.',
    refillThreshold: 15,
    lastUsed: '2026-04-15',
    usageHistory: [],
    restockReminder: true,
    createdAt: '2025-08-01',
    updatedAt: '2026-04-15',
  },
  {
    id: '5',
    name: 'Salbutamol',
    brand: 'Asthalin',
    form: 'Inhaler',
    strength: '100mcg/dose',
    quantity: 120,
    expiryDate: '2027-03-20',
    purchaseDate: '2025-10-15',
    notes: 'For asthma attacks. 2 puffs as needed.',
    refillThreshold: 30,
    lastUsed: '2026-04-22',
    usageHistory: [],
    restockReminder: true,
    createdAt: '2025-10-15',
    updatedAt: '2026-04-22',
  },
  {
    id: '6',
    name: 'Hydrocortisone',
    brand: 'Dermacort',
    form: 'Cream',
    strength: '1%',
    quantity: 1,
    expiryDate: '2026-09-15',
    purchaseDate: '2026-01-05',
    notes: 'For skin rashes and itching.',
    refillThreshold: 1,
    lastUsed: '2026-04-10',
    usageHistory: [],
    restockReminder: true,
    createdAt: '2026-01-05',
    updatedAt: '2026-04-10',
  },
]

const emptyFormData: MedicineFormData = {
  name: '',
  brand: '',
  form: 'Syrup',
  strength: '',
  quantity: '',
  expiryDate: '',
  purchaseDate: new Date().toISOString().split('T')[0],
  notes: '',
  refillThreshold: '10',
  restockReminder: true,
}

const medicineForms: MedicineForm[] = ['Syrup', 'Tablet', 'Drops', 'Cream', 'Inhaler']

// Icons as inline SVGs
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const PillIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const DropletIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
)

const CreamIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
)

const InhalerIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
)

const FormIcon = ({ form }: { form: MedicineForm }) => {
  switch (form) {
    case 'Syrup':
      return <DropletIcon />
    case 'Tablet':
      return <PillIcon />
    case 'Drops':
      return <DropletIcon />
    case 'Cream':
      return <CreamIcon />
    case 'Inhaler':
      return <InhalerIcon />
    default:
      return <PillIcon />
  }
}

export default function MedicineCabinetPage() {
  const [medicines, setMedicines] = useState<Medicine[]>(sampleMedicines)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null)
  const [formData, setFormData] = useState<MedicineFormData>(emptyFormData)
  const [showDoseModal, setShowDoseModal] = useState<string | null>(null)
  const [doseAmount, setDoseAmount] = useState('')
  const [showHistoryModal, setShowHistoryModal] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<MedicineStatus | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and search medicines
  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filterStatus === 'all' || getMedicineStatus(med) === filterStatus
      return matchesSearch && matchesFilter
    })
  }, [medicines, filterStatus, searchQuery])

  // Stats
  const stats = useMemo(() => {
    const lowStock = medicines.filter(m => m.quantity <= m.refillThreshold).length
    const expiringSoon = medicines.filter(m => {
      const days = getDaysUntilExpiry(m.expiryDate)
      return days <= 30 && days > 0
    }).length
    const expired = medicines.filter(m => getDaysUntilExpiry(m.expiryDate) <= 0).length
    return { lowStock, expiringSoon, expired, total: medicines.length }
  }, [medicines])

  // Form handlers
  const openAddForm = () => {
    setEditingMedicine(null)
    setFormData(emptyFormData)
    setIsFormOpen(true)
  }

  const openEditForm = (medicine: Medicine) => {
    setEditingMedicine(medicine)
    setFormData({
      name: medicine.name,
      brand: medicine.brand,
      form: medicine.form,
      strength: medicine.strength,
      quantity: medicine.quantity.toString(),
      expiryDate: medicine.expiryDate,
      purchaseDate: medicine.purchaseDate,
      notes: medicine.notes,
      refillThreshold: medicine.refillThreshold.toString(),
      restockReminder: medicine.restockReminder,
    })
    setIsFormOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date().toISOString()

    if (editingMedicine) {
      // Update existing
      setMedicines(prev => prev.map(m =>
        m.id === editingMedicine.id
          ? {
            ...m,
            name: formData.name,
            brand: formData.brand,
            form: formData.form,
            strength: formData.strength,
            quantity: parseInt(formData.quantity),
            expiryDate: formData.expiryDate,
            purchaseDate: formData.purchaseDate,
            notes: formData.notes,
            refillThreshold: parseInt(formData.refillThreshold),
            restockReminder: formData.restockReminder,
            updatedAt: now,
          }
          : m
      ))
    } else {
      // Add new
      const newMedicine: Medicine = {
        id: Date.now().toString(),
        name: formData.name,
        brand: formData.brand,
        form: formData.form,
        strength: formData.strength,
        quantity: parseInt(formData.quantity),
        expiryDate: formData.expiryDate,
        purchaseDate: formData.purchaseDate,
        notes: formData.notes,
        refillThreshold: parseInt(formData.refillThreshold),
        lastUsed: null,
        usageHistory: [],
        restockReminder: formData.restockReminder,
        createdAt: now,
        updatedAt: now,
      }
      setMedicines(prev => [...prev, newMedicine])
    }

    setIsFormOpen(false)
    setEditingMedicine(null)
    setFormData(emptyFormData)
  }

  const deleteMedicine = (id: string) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(prev => prev.filter(m => m.id !== id))
    }
  }

  const logDose = (medicineId: string) => {
    const med = medicines.find(m => m.id === medicineId)
    if (!med || !doseAmount) return

    const usage: MedicineUsage = {
      id: Date.now().toString(),
      medicineId,
      dosage: doseAmount,
      administeredAt: new Date().toISOString(),
      administeredBy: 'Parent',
    }

    setMedicines(prev => prev.map(m => {
      if (m.id === medicineId) {
        return {
          ...m,
          quantity: Math.max(0, m.quantity - 1),
          lastUsed: new Date().toISOString(),
          usageHistory: [usage, ...m.usageHistory],
          updatedAt: new Date().toISOString(),
        }
      }
      return m
    }))

    setShowDoseModal(null)
    setDoseAmount('')
  }

  const getStatusBadge = (status: MedicineStatus) => {
    switch (status) {
      case 'good':
        return <span className="badge badge-success">Good</span>
      case 'low':
        return <span className="badge badge-warning">Low Stock</span>
      case 'expiring':
        return <span className="badge badge-warning">Expiring Soon</span>
      case 'expired':
        return <span className="badge bg-red-100 text-red-800">Expired</span>
    }
  }

  const getStatusColor = (status: MedicineStatus) => {
    switch (status) {
      case 'good':
        return 'border-sage/30 bg-sage/5'
      case 'low':
        return 'border-amber-400 bg-amber-50'
      case 'expiring':
        return 'border-amber-500 bg-amber-50'
      case 'expired':
        return 'border-red-400 bg-red-50'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-coral/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591l5.596 3.445m-5.596-3.445a24.301 24.301 0 00.75.082c.249-.032.499-.059.75-.082m-5.596 3.445L19 14.5m-9.25-11.396v5.714a2.25 2.25 0 01-.659 1.591L5 14.5" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl text-forest">Medicine Cabinet</h1>
            <p className="text-forest/60 text-sm">Track and manage your child&apos;s medications</p>
          </div>
        </div>
        <Button onClick={openAddForm}>
          <PlusIcon />
          Add Medicine
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-mist/50 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375 7.444 2.25 12 2.25s8.25 1.847 8.25 4.125z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.375c0-2.278 3.694-4.125 8.25-4.125s8.25 1.847 8.25 4.125M4.5 6.375V18.75c0 2.278 3.694 4.125 8.25 4.125s8.25-1.847 8.25-4.125V6.375z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-semibold text-forest">{stats.total}</div>
              <div className="text-sm text-forest/60">Total Items</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-semibold text-amber-700">{stats.lowStock}</div>
              <div className="text-sm text-forest/60">Low Stock</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-amber-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-semibold text-amber-700">{stats.expiringSoon}</div>
              <div className="text-sm text-forest/60">Expiring Soon</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-semibold text-red-700">{stats.expired}</div>
              <div className="text-sm text-forest/60">Expired</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 rounded-xl border border-mist/50 bg-white text-forest placeholder-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'good', 'low', 'expiring', 'expired'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-forest text-white'
                  : 'bg-white text-forest/70 hover:bg-mist'
              }`}
            >
              {status === 'all' ? 'All' : status === 'good' ? 'Good' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Grid */}
      {filteredMedicines.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mist flex items-center justify-center">
            <PillIcon />
          </div>
          <h3 className="font-display text-xl text-forest mb-2">No medicines found</h3>
          <p className="text-forest/60 mb-4">
            {searchQuery
              ? 'Try adjusting your search or filters'
              : 'Add your first medicine to get started'}
          </p>
          {!searchQuery && (
            <Button onClick={openAddForm}>
              <PlusIcon />
              Add Medicine
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedicines.map((medicine) => {
            const status = getMedicineStatus(medicine)
            const daysUntil = getDaysUntilExpiry(medicine.expiryDate)

            return (
              <div
                key={medicine.id}
                className={`bg-white rounded-2xl border-2 ${getStatusColor(status)} hover:shadow-lg transition-all duration-300 overflow-hidden`}
              >
                {/* Header */}
                <div className="p-5 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        status === 'expired' ? 'bg-red-100 text-red-600' :
                        status === 'expiring' ? 'bg-amber-100 text-amber-600' :
                        status === 'low' ? 'bg-amber-100 text-amber-600' :
                        'bg-sage/10 text-sage'
                      }`}>
                        <FormIcon form={medicine.form} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-forest">{medicine.name}</h3>
                        <p className="text-sm text-forest/60">{medicine.brand}</p>
                      </div>
                    </div>
                    {getStatusBadge(status)}
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-cream/50 rounded-xl p-3">
                      <p className="text-xs text-forest/50 mb-1">Quantity</p>
                      <p className="font-semibold text-forest">
                        {medicine.quantity} <span className="text-forest/40 text-sm">{medicine.form.toLowerCase()}</span>
                      </p>
                    </div>
                    <div className="bg-cream/50 rounded-xl p-3">
                      <p className="text-xs text-forest/50 mb-1">Expiry</p>
                      <p className={`font-semibold ${
                        daysUntil <= 0 ? 'text-red-600' :
                        daysUntil <= 30 ? 'text-amber-600' :
                        'text-forest'
                      }`}>
                        {daysUntil <= 0
                          ? 'Expired'
                          : daysUntil === 1
                            ? 'Tomorrow'
                            : `${daysUntil} days`
                        }
                      </p>
                    </div>
                    <div className="bg-cream/50 rounded-xl p-3 col-span-2">
                      <p className="text-xs text-forest/50 mb-1">Strength</p>
                      <p className="font-medium text-forest">{medicine.strength}</p>
                    </div>
                  </div>

                  {/* Refill threshold indicator */}
                  {medicine.quantity <= medicine.refillThreshold && (
                    <div className="mb-4 p-3 bg-amber-50 rounded-xl text-sm text-amber-700 flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                      </svg>
                      Refill needed (threshold: {medicine.refillThreshold})
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 p-4 bg-cream/30 border-t border-mist/50">
                  <button
                    onClick={() => {
                      setDoseAmount(medicine.form === 'Drops' ? '5 drops' : medicine.form === 'Inhaler' ? '2 puffs' : '1 dose')
                      setShowDoseModal(medicine.id)
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-sage text-white text-sm font-medium hover:bg-sage/90 transition-colors"
                  >
                    Log Dose
                  </button>
                  <button
                    onClick={() => setShowHistoryModal(medicine.id)}
                    className="p-2.5 rounded-xl hover:bg-mist transition-colors text-forest/60 hover:text-forest"
                    title="View history"
                  >
                    <ClockIcon />
                  </button>
                  <button
                    onClick={() => openEditForm(medicine)}
                    className="p-2.5 rounded-xl hover:bg-mist transition-colors text-forest/60 hover:text-forest"
                    title="Edit"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => deleteMedicine(medicine.id)}
                    className="p-2.5 rounded-xl hover:bg-red-50 transition-colors text-forest/60 hover:text-red-600"
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white p-6 border-b border-mist/50 flex items-center justify-between">
              <h2 className="font-display text-2xl text-forest">
                {editingMedicine ? 'Edit Medicine' : 'Add Medicine'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 rounded-full hover:bg-mist transition-colors"
              >
                <XIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-1">Medicine Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50"
                    placeholder="e.g., Paracetamol"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-1">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50"
                    placeholder="e.g., Crocin"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-1">Form *</label>
                  <select
                    required
                    value={formData.form}
                    onChange={(e) => setFormData({ ...formData, form: e.target.value as MedicineForm })}
                    className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50"
                  >
                    {medicineForms.map((form) => (
                      <option key={form} value={form}>{form}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-1">Strength *</label>
                  <input
                    type="text"
                    required
                    value={formData.strength}
                    onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50"
                    placeholder="e.g., 125mg/5ml"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-1">Quantity *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-1">Refill Threshold</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.refillThreshold}
                    onChange={(e) => setFormData({ ...formData, refillThreshold: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-forest mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-forest mb-1">Purchase Date</label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50 resize-none"
                  placeholder="Dosage instructions, special notes..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="restockReminder"
                  checked={formData.restockReminder}
                  onChange={(e) => setFormData({ ...formData, restockReminder: e.target.checked })}
                  className="w-4 h-4 rounded border-mist text-coral focus:ring-coral"
                />
                <label htmlFor="restockReminder" className="text-sm text-forest">
                  Enable restock reminders
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setIsFormOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {editingMedicine ? 'Save Changes' : 'Add Medicine'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Dose Modal */}
      {showDoseModal && (() => {
        const medicine = medicines.find(m => m.id === showDoseModal)
        if (!medicine) return null

        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl">
              <div className="p-6 border-b border-mist/50 flex items-center justify-between">
                <h2 className="font-display text-xl text-forest">Log Dose</h2>
                <button
                  onClick={() => {
                    setShowDoseModal(null)
                    setDoseAmount('')
                  }}
                  className="p-2 rounded-full hover:bg-mist transition-colors"
                >
                  <XIcon />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-sage/20 flex items-center justify-center">
                    <FormIcon form={medicine.form} />
                  </div>
                  <h3 className="font-semibold text-forest">{medicine.name}</h3>
                  <p className="text-sm text-forest/60">{medicine.brand} - {medicine.strength}</p>
                  <p className="text-sm text-forest/60 mt-1">Current stock: {medicine.quantity}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-forest mb-1">Dosage Amount</label>
                  <input
                    type="text"
                    value={doseAmount}
                    onChange={(e) => setDoseAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-mist/50 bg-white text-forest focus:outline-none focus:ring-2 focus:ring-sage/50 text-center"
                    placeholder={medicine.form === 'Drops' ? 'e.g., 5 drops' : 'e.g., 1 tablet'}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => {
                      setShowDoseModal(null)
                      setDoseAmount('')
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={() => logDose(showDoseModal)}>
                    Log Dose
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Usage History Modal */}
      {showHistoryModal && (() => {
        const medicine = medicines.find(m => m.id === showHistoryModal)
        if (!medicine) return null

        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[80vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-mist/50 flex items-center justify-between shrink-0">
                <h2 className="font-display text-xl text-forest">Usage History</h2>
                <button
                  onClick={() => setShowHistoryModal(null)}
                  className="p-2 rounded-full hover:bg-mist transition-colors"
                >
                  <XIcon />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="mb-4">
                  <h3 className="font-semibold text-forest">{medicine.name}</h3>
                  <p className="text-sm text-forest/60">{medicine.brand} - {medicine.strength}</p>
                </div>

                {medicine.usageHistory.length === 0 ? (
                  <div className="text-center py-8 text-forest/60">
                    <ClockIcon />
                    <p className="mt-2">No usage history yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {medicine.usageHistory.map((usage) => (
                      <div key={usage.id} className="flex items-center justify-between p-3 bg-mist/30 rounded-lg">
                        <div>
                          <p className="font-medium text-forest">{usage.dosage}</p>
                          <p className="text-sm text-forest/60">
                            {new Date(usage.administeredAt).toLocaleString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: 'numeric',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <span className="text-sm text-forest/60">{usage.administeredBy}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-mist/50 shrink-0">
                <Button variant="secondary" className="w-full" onClick={() => setShowHistoryModal(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
