// Medicine types for the Medicine Cabinet feature

export type MedicineForm = 'Syrup' | 'Tablet' | 'Drops' | 'Cream' | 'Inhaler'

export interface Medicine {
  id: string
  name: string
  brand: string
  form: MedicineForm
  strength: string
  quantity: number
  expiryDate: string // ISO date string
  purchaseDate: string // ISO date string
  notes: string
  refillThreshold: number
  lastUsed: string | null // ISO date string
  usageHistory: MedicineUsage[]
  restockReminder: boolean
  createdAt: string
  updatedAt: string
}

export interface MedicineUsage {
  id: string
  medicineId: string
  dosage: string
  administeredAt: string // ISO date string
  administeredBy: string
  notes?: string
}

export interface MedicineFormData {
  name: string
  brand: string
  form: MedicineForm
  strength: string
  quantity: string
  expiryDate: string
  purchaseDate: string
  notes: string
  refillThreshold: string
  restockReminder: boolean
}

export type MedicineStatus = 'good' | 'low' | 'expiring' | 'expired'

export function getMedicineStatus(medicine: Medicine): MedicineStatus {
  const now = new Date()
  const expiryDate = new Date(medicine.expiryDate)
  const thirtyDaysFromNow = new Date()
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

  if (expiryDate < now) {
    return 'expired'
  }

  if (expiryDate <= thirtyDaysFromNow) {
    return 'expiring'
  }

  if (medicine.quantity <= medicine.refillThreshold) {
    return 'low'
  }

  return 'good'
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export function getDaysUntilExpiry(expiryDate: string): number {
  const now = new Date()
  const expiry = new Date(expiryDate)
  const diffTime = expiry.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
