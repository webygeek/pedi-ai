// Doctor Dashboard Demo Data
// Contains sample patient data for the doctor dashboard

export interface DoctorPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodType?: string;
  allergies: string[];
  conditions: string[];
  weight?: number;
  height?: number;
  avatar?: string;
  lastVisit?: string;
  nextAppointment?: string;
  parentName: string;
  parentPhone?: string;
  isShared?: boolean;
}

export interface GrowthRecord {
  date: string;
  weight?: number;
  height?: number;
  headCircumference?: number;
  bmi?: number;
}

export interface VaccinationRecord {
  id: string;
  name: string;
  dueDate: string;
  administeredDate?: string;
  status: 'completed' | 'due' | 'upcoming' | 'overdue';
  doseNumber?: number;
  totalDoses?: number;
  administeredBy?: string;
  notes?: string;
}

export interface MedicalHistoryEntry {
  id: string;
  date: string;
  type: 'visit' | 'note' | 'test' | 'medication' | 'vaccination';
  title: string;
  description: string;
  doctor?: string;
  clinic?: string;
}

export interface ClinicalNote {
  id: string;
  date: string;
  title: string;
  content: string;
  author: string;
  type: 'progress' | 'diagnosis' | 'treatment' | 'general';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  duration: number;
  type: 'checkup' | 'followup' | 'sick' | 'vaccination' | 'consultation';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  notes?: string;
}

// Demo patients for the doctor dashboard
export const DEMO_DOCTOR_PATIENTS: DoctorPatient[] = [
  {
    id: 'patient_001',
    name: 'Emma Johnson',
    dateOfBirth: '2024-03-15',
    gender: 'female',
    bloodType: 'A+',
    allergies: ['Peanuts', 'Shellfish'],
    conditions: ['Eczema'],
    weight: 12.5,
    height: 82,
    avatar: '👧',
    lastVisit: '2026-06-01',
    nextAppointment: '2026-06-15',
    parentName: 'Sarah Johnson',
    parentPhone: '+1-555-0101',
  },
  {
    id: 'patient_002',
    name: 'Liam Williams',
    dateOfBirth: '2023-08-22',
    gender: 'male',
    bloodType: 'O+',
    allergies: [],
    conditions: [],
    weight: 14.2,
    height: 92,
    avatar: '👦',
    lastVisit: '2026-05-28',
    parentName: 'Michael Williams',
    parentPhone: '+1-555-0102',
  },
  {
    id: 'patient_003',
    name: 'Sophia Martinez',
    dateOfBirth: '2022-11-10',
    gender: 'female',
    bloodType: 'B+',
    allergies: ['Penicillin'],
    conditions: ['Asthma'],
    weight: 16.8,
    height: 98,
    avatar: '👧',
    lastVisit: '2026-06-05',
    nextAppointment: '2026-06-20',
    parentName: 'Maria Martinez',
    parentPhone: '+1-555-0103',
  },
  {
    id: 'patient_004',
    name: 'Noah Brown',
    dateOfBirth: '2025-01-05',
    gender: 'male',
    bloodType: 'AB-',
    allergies: ['Dust'],
    conditions: ['Reflux'],
    weight: 8.5,
    height: 65,
    avatar: '👦',
    lastVisit: '2026-04-15',
    parentName: 'Jennifer Brown',
  },
  {
    id: 'patient_005',
    name: 'Olivia Davis',
    dateOfBirth: '2021-06-30',
    gender: 'female',
    bloodType: 'A-',
    allergies: [],
    conditions: [],
    weight: 18.5,
    height: 105,
    avatar: '👧',
    lastVisit: '2026-05-10',
    parentName: 'Amanda Davis',
  },
  {
    id: 'patient_006',
    name: 'Ethan Miller',
    dateOfBirth: '2020-04-12',
    gender: 'male',
    bloodType: 'O-',
    allergies: ['Latex'],
    conditions: ['ADHD'],
    weight: 22.0,
    height: 115,
    avatar: '👦',
    lastVisit: '2026-06-02',
    nextAppointment: '2026-07-01',
    parentName: 'Robert Miller',
  },
  {
    id: 'patient_007',
    name: 'Ava Wilson',
    dateOfBirth: '2023-12-01',
    gender: 'female',
    bloodType: 'A+',
    allergies: ['Eggs'],
    conditions: [],
    weight: 13.0,
    height: 85,
    avatar: '👧',
    lastVisit: '2026-03-20',
    parentName: 'Lisa Wilson',
  },
  {
    id: 'patient_008',
    name: 'Mason Moore',
    dateOfBirth: '2024-07-08',
    gender: 'male',
    bloodType: 'B-',
    allergies: [],
    conditions: [],
    weight: 9.8,
    height: 72,
    avatar: '👦',
    lastVisit: '2026-05-25',
    parentName: 'David Moore',
  },
  {
    id: 'patient_009',
    name: 'Isabella Taylor',
    dateOfBirth: '2022-02-14',
    gender: 'female',
    bloodType: 'O+',
    allergies: ['Pollen'],
    conditions: ['Seasonal allergies'],
    weight: 15.5,
    height: 95,
    avatar: '👧',
    lastVisit: '2026-04-28',
    parentName: 'Karen Taylor',
  },
  {
    id: 'patient_010',
    name: 'Lucas Anderson',
    dateOfBirth: '2020-09-25',
    gender: 'male',
    bloodType: 'AB+',
    allergies: [],
    conditions: [],
    weight: 24.0,
    height: 120,
    avatar: '👦',
    lastVisit: '2026-05-15',
    parentName: 'John Anderson',
  },
  {
    id: 'patient_011',
    name: 'Mia Thomas',
    dateOfBirth: '2023-05-18',
    gender: 'female',
    bloodType: 'A-',
    allergies: ['Dairy'],
    conditions: ['Lactose intolerance'],
    weight: 14.0,
    height: 88,
    avatar: '👧',
    lastVisit: '2026-06-04',
    parentName: 'Susan Thomas',
  },
  {
    id: 'patient_012',
    name: 'James Jackson',
    dateOfBirth: '2021-11-22',
    gender: 'male',
    bloodType: 'O+',
    allergies: [],
    conditions: [],
    weight: 19.5,
    height: 108,
    avatar: '👦',
    lastVisit: '2026-02-10',
    parentName: 'Mark Jackson',
  },
  {
    id: 'patient_013',
    name: 'Charlotte White',
    dateOfBirth: '2024-02-28',
    gender: 'female',
    bloodType: 'B+',
    allergies: ['Soy'],
    conditions: [],
    weight: 11.0,
    height: 78,
    avatar: '👧',
    lastVisit: '2026-05-30',
    parentName: 'Nancy White',
  },
  {
    id: 'patient_014',
    name: 'Benjamin Harris',
    dateOfBirth: '2022-08-05',
    gender: 'male',
    bloodType: 'A+',
    allergies: [],
    conditions: ['Mild asthma'],
    weight: 17.2,
    height: 102,
    avatar: '👦',
    lastVisit: '2026-06-01',
    nextAppointment: '2026-06-18',
    parentName: 'Patricia Harris',
  },
  {
    id: 'patient_015',
    name: 'Amelia Martin',
    dateOfBirth: '2023-10-12',
    gender: 'female',
    bloodType: 'O-',
    allergies: ['Tree nuts'],
    conditions: [],
    weight: 12.8,
    height: 84,
    avatar: '👧',
    lastVisit: '2026-04-22',
    parentName: 'Christine Martin',
    isShared: true,
  },
];

// Growth records for each patient
export const PATIENT_GROWTH_RECORDS: Record<string, GrowthRecord[]> = {
  patient_001: [
    { date: '2024-03-15', weight: 3.8, height: 52 },
    { date: '2024-06-15', weight: 6.2, height: 62 },
    { date: '2024-09-15', weight: 8.5, height: 70 },
    { date: '2025-01-15', weight: 10.0, height: 75 },
    { date: '2025-06-15', weight: 11.5, height: 80 },
    { date: '2026-01-15', weight: 12.5, height: 82 },
  ],
  patient_002: [
    { date: '2023-08-22', weight: 4.2, height: 55 },
    { date: '2023-12-22', weight: 7.5, height: 68 },
    { date: '2024-05-22', weight: 10.0, height: 78 },
    { date: '2024-11-22', weight: 12.2, height: 85 },
    { date: '2025-06-22', weight: 13.5, height: 90 },
    { date: '2026-01-22', weight: 14.2, height: 92 },
  ],
  patient_003: [
    { date: '2022-11-10', weight: 3.5, height: 51 },
    { date: '2023-05-10', weight: 8.2, height: 68 },
    { date: '2024-01-10', weight: 12.5, height: 82 },
    { date: '2024-08-10', weight: 14.8, height: 90 },
    { date: '2025-04-10', weight: 16.0, height: 95 },
    { date: '2026-01-10', weight: 16.8, height: 98 },
  ],
};

// Vaccination records
export const PATIENT_VACCINATIONS: Record<string, VaccinationRecord[]> = {
  patient_001: [
    { id: 'v1', name: 'Hepatitis B', dueDate: '2024-03-15', administeredDate: '2024-03-15', status: 'completed', doseNumber: 1, totalDoses: 3 },
    { id: 'v2', name: 'Hepatitis B', dueDate: '2024-04-15', administeredDate: '2024-04-15', status: 'completed', doseNumber: 2, totalDoses: 3 },
    { id: 'v3', name: 'DTaP', dueDate: '2024-06-15', administeredDate: '2024-06-15', status: 'completed', doseNumber: 1, totalDoses: 5 },
    { id: 'v4', name: 'Hib', dueDate: '2024-06-15', administeredDate: '2024-06-15', status: 'completed', doseNumber: 1, totalDoses: 4 },
    { id: 'v5', name: 'Polio (IPV)', dueDate: '2024-06-15', administeredDate: '2024-06-15', status: 'completed', doseNumber: 1, totalDoses: 4 },
    { id: 'v6', name: 'PCV13', dueDate: '2024-06-15', administeredDate: '2024-06-15', status: 'completed', doseNumber: 1, totalDoses: 4 },
    { id: 'v7', name: 'DTaP', dueDate: '2024-10-15', administeredDate: '2024-10-15', status: 'completed', doseNumber: 2, totalDoses: 5 },
    { id: 'v8', name: 'MMR', dueDate: '2026-03-15', status: 'due', doseNumber: 1, totalDoses: 2 },
    { id: 'v9', name: 'Varicella', dueDate: '2026-03-15', status: 'due', doseNumber: 1, totalDoses: 2 },
  ],
  patient_002: [
    { id: 'v1', name: 'Hepatitis B', dueDate: '2023-08-22', administeredDate: '2023-08-22', status: 'completed', doseNumber: 1, totalDoses: 3 },
    { id: 'v2', name: 'DTaP', dueDate: '2023-10-22', administeredDate: '2023-10-22', status: 'completed', doseNumber: 1, totalDoses: 5 },
    { id: 'v3', name: 'MMR', dueDate: '2024-08-22', administeredDate: '2024-08-22', status: 'completed', doseNumber: 1, totalDoses: 2 },
    { id: 'v4', name: 'DTaP', dueDate: '2025-08-22', administeredDate: '2025-08-22', status: 'completed', doseNumber: 4, totalDoses: 5 },
    { id: 'v5', name: 'Flu Shot', dueDate: '2025-10-01', administeredDate: '2025-10-05', status: 'completed' },
  ],
  patient_003: [
    { id: 'v1', name: 'Hepatitis B', dueDate: '2022-11-10', administeredDate: '2022-11-10', status: 'completed', doseNumber: 1, totalDoses: 3 },
    { id: 'v2', name: 'DTaP', dueDate: '2022-12-10', administeredDate: '2022-12-10', status: 'completed', doseNumber: 1, totalDoses: 5 },
    { id: 'v3', name: 'MMR', dueDate: '2023-11-10', administeredDate: '2023-11-10', status: 'completed', doseNumber: 1, totalDoses: 2 },
    { id: 'v4', name: 'DTaP', dueDate: '2024-11-10', administeredDate: '2024-11-10', status: 'completed', doseNumber: 5, totalDoses: 5 },
    { id: 'v5', name: 'Flu Shot', dueDate: '2025-10-01', administeredDate: '2025-10-03', status: 'completed' },
    { id: 'v6', name: 'Flu Shot', dueDate: '2026-10-01', status: 'upcoming' },
  ],
};

// Medical history entries
export const PATIENT_MEDICAL_HISTORY: Record<string, MedicalHistoryEntry[]> = {
  patient_001: [
    { id: 'mh1', date: '2026-06-01', type: 'visit', title: 'Well-child checkup', description: 'Growth on track. Eczema well-controlled. Immunizations up to date.', doctor: 'Dr. Emily Chen', clinic: 'PediAi Clinic' },
    { id: 'mh2', date: '2026-04-15', type: 'note', title: 'Eczema flare-up', description: 'Noted mild flare-up on cheeks. Adjusted moisturizing routine.', doctor: 'Dr. Emily Chen' },
    { id: 'mh3', date: '2026-03-15', type: 'vaccination', title: 'MMR dose 1', description: 'First MMR vaccine administered. No adverse reactions.', doctor: 'Nurse Sarah' },
    { id: 'mh4', date: '2025-12-01', type: 'visit', title: '6-month checkup', description: 'Development normal. Introduced solid foods. Follow-up in 6 months.', doctor: 'Dr. Emily Chen' },
  ],
  patient_003: [
    { id: 'mh1', date: '2026-06-05', type: 'visit', title: 'Asthma follow-up', description: 'Asthma well-controlled on current medication. Lung function normal. Continue maintenance inhaler.', doctor: 'Dr. Emily Chen', clinic: 'PediAi Clinic' },
    { id: 'mh2', date: '2026-04-10', type: 'test', title: 'Spirometry test', description: 'Lung function test completed. FEV1 95% predicted. No significant obstruction.', doctor: 'Dr. Sharma' },
    { id: 'mh3', date: '2025-12-15', type: 'visit', title: 'Annual physical', description: 'Overall health good. Growth normal. Asthma action plan updated.', doctor: 'Dr. Emily Chen' },
    { id: 'mh4', date: '2025-10-01', type: 'medication', title: 'Fluticasone inhaler adjusted', description: 'Increased dose from 50mcg to 100mcg twice daily for better control.', doctor: 'Dr. Emily Chen' },
  ],
};

// Clinical notes
export const PATIENT_CLINICAL_NOTES: Record<string, ClinicalNote[]> = {
  patient_001: [
    { id: 'cn1', date: '2026-06-01', title: 'Well-child visit notes', content: 'Patient presenting for routine 27-month well-child check. Growth parameters within normal range. Development age-appropriate. Parent reports good appetite and sleep patterns. Eczema controlled with current regimen. Discussed nutrition and behavior management.', author: 'Dr. Emily Chen', type: 'progress' },
    { id: 'cn2', date: '2026-04-15', title: 'Eczema management', content: 'Noted mild eczema flare on cheeks and arms. Recommended increased moisturizing frequency (3x daily) and thin layer of hydrocortisone 1% as needed. Follow up in 2 weeks if not improving.', author: 'Dr. Emily Chen', type: 'treatment' },
  ],
  patient_003: [
    { id: 'cn1', date: '2026-06-05', title: 'Asthma follow-up', content: 'Patient doing well on current asthma regimen. No nocturnal symptoms. No exercise-induced symptoms. Lung exam clear. Continue Fluticasone 100mcg BID. Recheck in 3 months.', author: 'Dr. Emily Chen', type: 'progress' },
    { id: 'cn2', date: '2026-04-10', title: 'PFT results discussion', content: 'Reviewed spirometry results with family. FEV1 95% predicted - indicates good asthma control. Discussed importance of daily controller medication compliance. Family understands and agrees to treatment plan.', author: 'Dr. Emily Chen', type: 'diagnosis' },
  ],
};

// Demo appointments
export const DEMO_APPOINTMENTS: Appointment[] = [
  { id: 'apt_001', patientId: 'patient_001', patientName: 'Emma Johnson', date: '2026-06-15', time: '09:00', duration: 30, type: 'checkup', status: 'confirmed' },
  { id: 'apt_002', patientId: 'patient_003', patientName: 'Sophia Martinez', date: '2026-06-15', time: '09:30', duration: 30, type: 'followup', status: 'confirmed', notes: 'Asthma follow-up' },
  { id: 'apt_003', patientId: 'patient_006', patientName: 'Ethan Miller', date: '2026-06-15', time: '10:00', duration: 45, type: 'consultation', status: 'pending', notes: 'ADHD evaluation' },
  { id: 'apt_004', patientId: 'patient_014', patientName: 'Benjamin Harris', date: '2026-06-18', time: '11:00', duration: 30, type: 'checkup', status: 'confirmed' },
  { id: 'apt_005', patientId: 'patient_002', patientName: 'Liam Williams', date: '2026-06-18', time: '14:00', duration: 30, type: 'vaccination', status: 'confirmed', notes: 'Flu shot' },
  { id: 'apt_006', patientId: 'patient_011', patientName: 'Mia Thomas', date: '2026-06-20', time: '09:30', duration: 30, type: 'checkup', status: 'confirmed' },
  { id: 'apt_007', patientId: 'patient_007', patientName: 'Ava Wilson', date: '2026-06-20', time: '10:30', duration: 30, type: 'sick', status: 'pending', notes: 'Ear pain' },
  { id: 'apt_008', patientId: 'patient_015', patientName: 'Amelia Martin', date: '2026-06-22', time: '14:30', duration: 30, type: 'followup', status: 'confirmed' },
];

// Helper functions
export function getPatientById(id: string): DoctorPatient | undefined {
  return DEMO_DOCTOR_PATIENTS.find(p => p.id === id);
}

export function getPatientGrowthRecords(patientId: string): GrowthRecord[] {
  return PATIENT_GROWTH_RECORDS[patientId] || [];
}

export function getPatientVaccinations(patientId: string): VaccinationRecord[] {
  return PATIENT_VACCINATIONS[patientId] || [];
}

export function getPatientMedicalHistory(patientId: string): MedicalHistoryEntry[] {
  return PATIENT_MEDICAL_HISTORY[patientId] || [];
}

export function getPatientClinicalNotes(patientId: string): ClinicalNote[] {
  return PATIENT_CLINICAL_NOTES[patientId] || [];
}

export function getAppointmentsForDate(date: string): Appointment[] {
  return DEMO_APPOINTMENTS.filter(apt => apt.date === date);
}

export function getUpcomingAppointments(): Appointment[] {
  const today = new Date().toISOString().split('T')[0];
  return DEMO_APPOINTMENTS
    .filter(apt => apt.date >= today && apt.status !== 'cancelled')
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

export function calculateAge(dob: string): { years: number; months: number; display: string } {
  const birth = new Date(dob);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const display = years > 0
    ? `${years}y ${months}m`
    : `${months}m`;

  return { years, months, display };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}