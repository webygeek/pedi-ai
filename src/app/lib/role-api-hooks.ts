// Unified API Hooks for All User Roles
// Provides consistent data access patterns across all role-specific pages

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './auth-context';
import { DEMO_ACCOUNTS_LIST } from './demo-data';

// Simulate API delay
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// DOCTOR API HOOKS
// ============================================

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
const DEMO_DOCTOR_PATIENTS: DoctorPatient[] = [
  { id: 'patient_001', name: 'Emma Johnson', dateOfBirth: '2024-03-15', gender: 'female', bloodType: 'A+', allergies: ['Peanuts', 'Shellfish'], conditions: ['Eczema'], weight: 12.5, height: 82, avatar: '👧', lastVisit: '2026-06-01', nextAppointment: '2026-06-15', parentName: 'Sarah Johnson', parentPhone: '+1-555-0101' },
  { id: 'patient_002', name: 'Liam Williams', dateOfBirth: '2023-08-22', gender: 'male', bloodType: 'O+', allergies: [], conditions: [], weight: 14.2, height: 92, avatar: '👦', lastVisit: '2026-05-28', parentName: 'Michael Williams', parentPhone: '+1-555-0102' },
  { id: 'patient_003', name: 'Sophia Martinez', dateOfBirth: '2022-11-10', gender: 'female', bloodType: 'B+', allergies: ['Penicillin'], conditions: ['Asthma'], weight: 16.8, height: 98, avatar: '👧', lastVisit: '2026-06-05', nextAppointment: '2026-06-20', parentName: 'Maria Martinez', parentPhone: '+1-555-0103' },
  { id: 'patient_004', name: 'Noah Brown', dateOfBirth: '2025-01-05', gender: 'male', bloodType: 'AB-', allergies: ['Dust'], conditions: ['Reflux'], weight: 8.5, height: 65, avatar: '👦', lastVisit: '2026-04-15', parentName: 'Jennifer Brown' },
  { id: 'patient_005', name: 'Olivia Davis', dateOfBirth: '2021-06-30', gender: 'female', bloodType: 'A-', allergies: [], conditions: [], weight: 18.5, height: 105, avatar: '👧', lastVisit: '2026-05-10', parentName: 'Amanda Davis' },
  { id: 'patient_006', name: 'Ethan Miller', dateOfBirth: '2020-04-12', gender: 'male', bloodType: 'O-', allergies: ['Latex'], conditions: ['ADHD'], weight: 22.0, height: 115, avatar: '👦', lastVisit: '2026-06-02', nextAppointment: '2026-07-01', parentName: 'Robert Miller' },
  { id: 'patient_007', name: 'Ava Wilson', dateOfBirth: '2023-12-01', gender: 'female', bloodType: 'A+', allergies: ['Eggs'], conditions: [], weight: 13.0, height: 85, avatar: '👧', lastVisit: '2026-03-20', parentName: 'Lisa Wilson' },
  { id: 'patient_008', name: 'Mason Moore', dateOfBirth: '2024-07-08', gender: 'male', bloodType: 'B-', allergies: [], conditions: [], weight: 9.8, height: 72, avatar: '👦', lastVisit: '2026-05-25', parentName: 'David Moore' },
  { id: 'patient_009', name: 'Isabella Taylor', dateOfBirth: '2022-02-14', gender: 'female', bloodType: 'O+', allergies: ['Pollen'], conditions: ['Seasonal allergies'], weight: 15.5, height: 95, avatar: '👧', lastVisit: '2026-04-28', parentName: 'Karen Taylor' },
  { id: 'patient_010', name: 'Lucas Anderson', dateOfBirth: '2020-09-25', gender: 'male', bloodType: 'AB+', allergies: [], conditions: [], weight: 24.0, height: 120, avatar: '👦', lastVisit: '2026-05-15', parentName: 'John Anderson' },
  { id: 'patient_011', name: 'Mia Thomas', dateOfBirth: '2023-05-18', gender: 'female', bloodType: 'A-', allergies: ['Dairy'], conditions: ['Lactose intolerance'], weight: 14.0, height: 88, avatar: '👧', lastVisit: '2026-06-04', parentName: 'Susan Thomas' },
  { id: 'patient_012', name: 'James Jackson', dateOfBirth: '2021-11-22', gender: 'male', bloodType: 'O+', allergies: [], conditions: [], weight: 19.5, height: 108, avatar: '👦', lastVisit: '2026-02-10', parentName: 'Mark Jackson' },
  { id: 'patient_013', name: 'Charlotte White', dateOfBirth: '2024-02-28', gender: 'female', bloodType: 'B+', allergies: ['Soy'], conditions: [], weight: 11.0, height: 78, avatar: '👧', lastVisit: '2026-05-30', parentName: 'Nancy White' },
  { id: 'patient_014', name: 'Benjamin Harris', dateOfBirth: '2022-08-05', gender: 'male', bloodType: 'A+', allergies: [], conditions: ['Mild asthma'], weight: 17.2, height: 102, avatar: '👦', lastVisit: '2026-06-01', nextAppointment: '2026-06-18', parentName: 'Patricia Harris' },
  { id: 'patient_015', name: 'Amelia Martin', dateOfBirth: '2023-10-12', gender: 'female', bloodType: 'O-', allergies: ['Tree nuts'], conditions: [], weight: 12.8, height: 84, avatar: '👧', lastVisit: '2026-04-22', parentName: 'Christine Martin', isShared: true },
];

const PATIENT_GROWTH_RECORDS: Record<string, GrowthRecord[]> = {
  patient_001: [{ date: '2024-03-15', weight: 3.8, height: 52 }, { date: '2024-06-15', weight: 6.2, height: 62 }, { date: '2024-09-15', weight: 8.5, height: 70 }, { date: '2025-01-15', weight: 10.0, height: 75 }, { date: '2025-06-15', weight: 11.5, height: 80 }, { date: '2026-01-15', weight: 12.5, height: 82 }],
  patient_002: [{ date: '2023-08-22', weight: 4.2, height: 55 }, { date: '2023-12-22', weight: 7.5, height: 68 }, { date: '2024-05-22', weight: 10.0, height: 78 }, { date: '2024-11-22', weight: 12.2, height: 85 }, { date: '2025-06-22', weight: 13.5, height: 90 }, { date: '2026-01-22', weight: 14.2, height: 92 }],
  patient_003: [{ date: '2022-11-10', weight: 3.5, height: 51 }, { date: '2023-05-10', weight: 8.2, height: 68 }, { date: '2024-01-10', weight: 12.5, height: 82 }, { date: '2024-08-10', weight: 14.8, height: 90 }, { date: '2025-04-10', weight: 16.0, height: 95 }, { date: '2026-01-10', weight: 16.8, height: 98 }],
};

const PATIENT_VACCINATIONS: Record<string, VaccinationRecord[]> = {
  patient_001: [{ id: 'v1', name: 'Hepatitis B', dueDate: '2024-03-15', administeredDate: '2024-03-15', status: 'completed', doseNumber: 1, totalDoses: 3 }, { id: 'v2', name: 'Hepatitis B', dueDate: '2024-04-15', administeredDate: '2024-04-15', status: 'completed', doseNumber: 2, totalDoses: 3 }, { id: 'v3', name: 'DTaP', dueDate: '2024-06-15', administeredDate: '2024-06-15', status: 'completed', doseNumber: 1, totalDoses: 5 }, { id: 'v4', name: 'Hib', dueDate: '2024-06-15', administeredDate: '2024-06-15', status: 'completed', doseNumber: 1, totalDoses: 4 }, { id: 'v5', name: 'Polio (IPV)', dueDate: '2024-06-15', administeredDate: '2024-06-15', status: 'completed', doseNumber: 1, totalDoses: 4 }, { id: 'v6', name: 'PCV13', dueDate: '2024-06-15', administeredDate: '2024-06-15', status: 'completed', doseNumber: 1, totalDoses: 4 }, { id: 'v7', name: 'DTaP', dueDate: '2024-10-15', administeredDate: '2024-10-15', status: 'completed', doseNumber: 2, totalDoses: 5 }, { id: 'v8', name: 'MMR', dueDate: '2026-03-15', status: 'due', doseNumber: 1, totalDoses: 2 }, { id: 'v9', name: 'Varicella', dueDate: '2026-03-15', status: 'due', doseNumber: 1, totalDoses: 2 }],
  patient_002: [{ id: 'v1', name: 'Hepatitis B', dueDate: '2023-08-22', administeredDate: '2023-08-22', status: 'completed', doseNumber: 1, totalDoses: 3 }, { id: 'v2', name: 'DTaP', dueDate: '2023-10-22', administeredDate: '2023-10-22', status: 'completed', doseNumber: 1, totalDoses: 5 }, { id: 'v3', name: 'MMR', dueDate: '2024-08-22', administeredDate: '2024-08-22', status: 'completed', doseNumber: 1, totalDoses: 2 }, { id: 'v4', name: 'DTaP', dueDate: '2025-08-22', administeredDate: '2025-08-22', status: 'completed', doseNumber: 4, totalDoses: 5 }, { id: 'v5', name: 'Flu Shot', dueDate: '2025-10-01', administeredDate: '2025-10-05', status: 'completed' }],
  patient_003: [{ id: 'v1', name: 'Hepatitis B', dueDate: '2022-11-10', administeredDate: '2022-11-10', status: 'completed', doseNumber: 1, totalDoses: 3 }, { id: 'v2', name: 'DTaP', dueDate: '2022-12-10', administeredDate: '2022-12-10', status: 'completed', doseNumber: 1, totalDoses: 5 }, { id: 'v3', name: 'MMR', dueDate: '2023-11-10', administeredDate: '2023-11-10', status: 'completed', doseNumber: 1, totalDoses: 2 }, { id: 'v4', name: 'DTaP', dueDate: '2024-11-10', administeredDate: '2024-11-10', status: 'completed', doseNumber: 5, totalDoses: 5 }, { id: 'v5', name: 'Flu Shot', dueDate: '2025-10-01', administeredDate: '2025-10-03', status: 'completed' }, { id: 'v6', name: 'Flu Shot', dueDate: '2026-10-01', status: 'upcoming' }],
};

const PATIENT_MEDICAL_HISTORY: Record<string, MedicalHistoryEntry[]> = {
  patient_001: [{ id: 'mh1', date: '2026-06-01', type: 'visit', title: 'Well-child checkup', description: 'Growth on track. Eczema well-controlled. Immunizations up to date.', doctor: 'Dr. Emily Chen', clinic: 'PediAi Clinic' }, { id: 'mh2', date: '2026-04-15', type: 'note', title: 'Eczema flare-up', description: 'Noted mild flare-up on cheeks. Adjusted moisturizing routine.', doctor: 'Dr. Emily Chen' }, { id: 'mh3', date: '2026-03-15', type: 'vaccination', title: 'MMR dose 1', description: 'First MMR vaccine administered. No adverse reactions.', doctor: 'Nurse Sarah' }, { id: 'mh4', date: '2025-12-01', type: 'visit', title: '6-month checkup', description: 'Development normal. Introduced solid foods. Follow-up in 6 months.', doctor: 'Dr. Emily Chen' }],
  patient_003: [{ id: 'mh1', date: '2026-06-05', type: 'visit', title: 'Asthma follow-up', description: 'Asthma well-controlled on current medication. Lung function normal. Continue maintenance inhaler.', doctor: 'Dr. Emily Chen', clinic: 'PediAi Clinic' }, { id: 'mh2', date: '2026-04-10', type: 'test', title: 'Spirometry test', description: 'Lung function test completed. FEV1 95% predicted. No significant obstruction.', doctor: 'Dr. Sharma' }, { id: 'mh3', date: '2025-12-15', type: 'visit', title: 'Annual physical', description: 'Overall health good. Growth normal. Asthma action plan updated.', doctor: 'Dr. Emily Chen' }, { id: 'mh4', date: '2025-10-01', type: 'medication', title: 'Fluticasone inhaler adjusted', description: 'Increased dose from 50mcg to 100mcg twice daily for better control.', doctor: 'Dr. Emily Chen' }],
};

const PATIENT_CLINICAL_NOTES: Record<string, ClinicalNote[]> = {
  patient_001: [{ id: 'cn1', date: '2026-06-01', title: 'Well-child visit notes', content: 'Patient presenting for routine 27-month well-child check. Growth parameters within normal range. Development age-appropriate. Parent reports good appetite and sleep patterns. Eczema controlled with current regimen. Discussed nutrition and behavior management.', author: 'Dr. Emily Chen', type: 'progress' }, { id: 'cn2', date: '2026-04-15', title: 'Eczema management', content: 'Noted mild eczema flare on cheeks and arms. Recommended increased moisturizing frequency (3x daily) and thin layer of hydrocortisone 1% as needed. Follow up in 2 weeks if not improving.', author: 'Dr. Emily Chen', type: 'treatment' }],
  patient_003: [{ id: 'cn1', date: '2026-06-05', title: 'Asthma follow-up', content: 'Patient doing well on current asthma regimen. No nocturnal symptoms. No exercise-induced symptoms. Lung exam clear. Continue Fluticasone 100mcg BID. Recheck in 3 months.', author: 'Dr. Emily Chen', type: 'progress' }, { id: 'cn2', date: '2026-04-10', title: 'PFT results discussion', content: 'Reviewed spirometry results with family. FEV1 95% predicted - indicates good asthma control. Discussed importance of daily controller medication compliance. Family understands and agrees to treatment plan.', author: 'Dr. Emily Chen', type: 'diagnosis' }],
};

const DEMO_APPOINTMENTS: Appointment[] = [
  { id: 'apt_001', patientId: 'patient_001', patientName: 'Emma Johnson', date: '2026-06-15', time: '09:00', duration: 30, type: 'checkup', status: 'confirmed' },
  { id: 'apt_002', patientId: 'patient_003', patientName: 'Sophia Martinez', date: '2026-06-15', time: '09:30', duration: 30, type: 'followup', status: 'confirmed', notes: 'Asthma follow-up' },
  { id: 'apt_003', patientId: 'patient_006', patientName: 'Ethan Miller', date: '2026-06-15', time: '10:00', duration: 45, type: 'consultation', status: 'pending', notes: 'ADHD evaluation' },
  { id: 'apt_004', patientId: 'patient_014', patientName: 'Benjamin Harris', date: '2026-06-18', time: '11:00', duration: 30, type: 'checkup', status: 'confirmed' },
  { id: 'apt_005', patientId: 'patient_002', patientName: 'Liam Williams', date: '2026-06-18', time: '14:00', duration: 30, type: 'vaccination', status: 'confirmed', notes: 'Flu shot' },
  { id: 'apt_006', patientId: 'patient_011', patientName: 'Mia Thomas', date: '2026-06-20', time: '09:30', duration: 30, type: 'checkup', status: 'confirmed' },
  { id: 'apt_007', patientId: 'patient_007', patientName: 'Ava Wilson', date: '2026-06-20', time: '10:30', duration: 30, type: 'sick', status: 'pending', notes: 'Ear pain' },
  { id: 'apt_008', patientId: 'patient_015', patientName: 'Amelia Martin', date: '2026-06-22', time: '14:30', duration: 30, type: 'followup', status: 'confirmed' },
];

// Doctor Hooks
export function useDoctorPatients() {
  const { session } = useAuth();
  const [patients, setPatients] = useState<DoctorPatient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!session) {
        setPatients([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setPatients(DEMO_DOCTOR_PATIENTS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch patients');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [session]);

  const searchPatients = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return patients.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.parentName.toLowerCase().includes(lowerQuery) ||
      p.conditions.some(c => c.toLowerCase().includes(lowerQuery))
    );
  }, [patients]);

  return { patients, isLoading, error, searchPatients };
}

export function usePatientDetail(patientId: string) {
  const { session } = useAuth();
  const [patient, setPatient] = useState<DoctorPatient | null>(null);
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>([]);
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>([]);
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryEntry[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!session || !patientId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();

        const foundPatient = DEMO_DOCTOR_PATIENTS.find(p => p.id === patientId);
        setPatient(foundPatient || null);
        setGrowthRecords(PATIENT_GROWTH_RECORDS[patientId] || []);
        setVaccinations(PATIENT_VACCINATIONS[patientId] || []);
        setMedicalHistory(PATIENT_MEDICAL_HISTORY[patientId] || []);
        setClinicalNotes(PATIENT_CLINICAL_NOTES[patientId] || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch patient data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientData();
  }, [session, patientId]);

  return { patient, growthRecords, vaccinations, medicalHistory, clinicalNotes, isLoading, error };
}

export function useDoctorAppointments() {
  const { session } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!session) {
        setAppointments([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setAppointments(DEMO_APPOINTMENTS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [session]);

  const getAppointmentsForDate = useCallback((date: string) => {
    return appointments.filter(apt => apt.date === date);
  }, [appointments]);

  const getUpcomingAppointments = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments
      .filter(apt => apt.date >= today && apt.status !== 'cancelled')
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [appointments]);

  return { appointments, isLoading, error, getAppointmentsForDate, getUpcomingAppointments };
}

// ============================================
// NURSE API HOOKS
// ============================================

export interface NursePatient {
  id: string;
  name: string;
  dateOfBirth: string;
  age: string;
  gender: 'male' | 'female';
  parentName: string;
  lastVisit: string;
  status: 'stable' | 'needs_attention' | 'critical';
  avatar?: string;
}

export interface NurseTask {
  id: string;
  type: 'vitals' | 'medication' | 'vaccination' | 'followup';
  patientId: string;
  patientName: string;
  description: string;
  dueTime: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
}

export interface VitalsRecord {
  id: string;
  patientId: string;
  patientName: string;
  temperature?: number;
  heartRate?: number;
  bloodPressure?: string;
  weight?: number;
  height?: number;
  oxygenSat?: number;
  notes?: string;
  recordedAt: string;
  recordedBy: string;
}

const DEMO_NURSE_PATIENTS: NursePatient[] = [
  { id: 'pat_001', name: 'Emma Thompson', dateOfBirth: '2024-03-15', age: '2 years', gender: 'female', parentName: 'Sarah Thompson', lastVisit: '2026-06-01', status: 'stable', avatar: '👧' },
  { id: 'pat_002', name: 'Lucas Martinez', dateOfBirth: '2022-09-10', age: '3 years', gender: 'male', parentName: 'Maria Martinez', lastVisit: '2026-05-28', status: 'needs_attention', avatar: '👦' },
  { id: 'pat_003', name: 'Sophia Chen', dateOfBirth: '2025-01-20', age: '1 year', gender: 'female', parentName: 'James Chen', lastVisit: '2026-06-05', status: 'stable', avatar: '👧' },
  { id: 'pat_004', name: 'Oliver Brown', dateOfBirth: '2023-06-08', age: '2 years', gender: 'male', parentName: 'David Brown', lastVisit: '2026-05-20', status: 'stable', avatar: '👦' },
  { id: 'pat_005', name: 'Isabella Garcia', dateOfBirth: '2021-11-30', age: '4 years', gender: 'female', parentName: 'Rosa Garcia', lastVisit: '2026-06-03', status: 'needs_attention', avatar: '👧' },
];

const DEMO_NURSE_TASKS: NurseTask[] = [
  { id: 'task_001', type: 'vitals', patientId: 'pat_001', patientName: 'Emma Thompson', description: 'Record vitals before checkup', dueTime: '09:00 AM', status: 'pending', priority: 'high' },
  { id: 'task_002', type: 'medication', patientId: 'pat_002', patientName: 'Lucas Martinez', description: 'Administer asthma medication', dueTime: '09:30 AM', status: 'pending', priority: 'high' },
  { id: 'task_003', type: 'vaccination', patientId: 'pat_003', patientName: 'Sophia Chen', description: 'MMR vaccine - dose 1', dueTime: '10:00 AM', status: 'pending', priority: 'medium' },
  { id: 'task_004', type: 'vitals', patientId: 'pat_005', patientName: 'Isabella Garcia', description: 'Post-surgery vitals check', dueTime: '10:30 AM', status: 'pending', priority: 'high' },
  { id: 'task_005', type: 'followup', patientId: 'pat_004', patientName: 'Oliver Brown', description: 'Follow-up call for lab results', dueTime: '11:00 AM', status: 'pending', priority: 'low' },
  { id: 'task_006', type: 'vitals', patientId: 'pat_001', patientName: 'Emma Thompson', description: 'Record vitals after procedure', dueTime: '08:00 AM', status: 'completed', priority: 'high' },
  { id: 'task_007', type: 'medication', patientId: 'pat_002', patientName: 'Lucas Martinez', description: 'Morning dose check', dueTime: '08:30 AM', status: 'completed', priority: 'medium' },
];

export function useNursePatients() {
  const { session } = useAuth();
  const [patients, setPatients] = useState<NursePatient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!session) {
        setPatients([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setPatients(DEMO_NURSE_PATIENTS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch patients');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [session]);

  return { patients, isLoading, error };
}

export function useNurseTasks() {
  const { session } = useAuth();
  const [tasks, setTasks] = useState<NurseTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!session) {
        setTasks([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setTasks(DEMO_NURSE_TASKS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [session]);

  const completeTask = useCallback(async (taskId: string) => {
    await simulateDelay(200);
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' as const } : t));
  }, []);

  const getPendingTasks = useCallback(() => tasks.filter(t => t.status === 'pending'), [tasks]);
  const getCompletedTasks = useCallback(() => tasks.filter(t => t.status === 'completed'), [tasks]);

  return { tasks, isLoading, error, completeTask, getPendingTasks, getCompletedTasks };
}

export function useVitalsRecording() {
  const { session } = useAuth();
  const [vitalsRecords, setVitalsRecords] = useState<VitalsRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!session) {
        setVitalsRecords([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setVitalsRecords([]);
        setError(null);
      } catch (err) {
        setError('Failed to fetch vitals records');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [session]);

  const recordVitals = useCallback(async (record: Omit<VitalsRecord, 'id' | 'recordedAt' | 'recordedBy'>) => {
    await simulateDelay(300);
    const newRecord: VitalsRecord = {
      ...record,
      id: `vitals_${Date.now()}`,
      recordedAt: new Date().toISOString(),
      recordedBy: session?.user.name || 'Nurse',
    };
    setVitalsRecords(prev => [newRecord, ...prev]);
    return newRecord;
  }, [session]);

  return { vitalsRecords, isLoading, error, recordVitals };
}

// ============================================
// CLINIC ADMIN API HOOKS
// ============================================

export interface Clinic {
  id: string;
  name: string;
  address: string;
  city: string;
  type: 'pediatric' | 'family' | 'general';
  patientCount: number;
  staffCount: number;
  rating: number;
}

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'nurse' | 'receptionist' | 'admin';
  status: 'active' | 'inactive' | 'on_leave';
  clinic: string;
  specialties?: string[];
  avatar?: string;
}

export interface ClinicReport {
  id: string;
  type: 'vaccination' | 'growth' | 'appointments' | 'revenue';
  title: string;
  date: string;
  generatedBy: string;
}

const DEMO_CLINICS: Clinic[] = [
  { id: 'clinic_001', name: 'PediAi Main Clinic', address: '123 Healthcare Ave', city: 'San Francisco, CA', type: 'pediatric', patientCount: 1250, staffCount: 28, rating: 4.8 },
  { id: 'clinic_002', name: 'PediAi Downtown', address: '456 Medical Plaza', city: 'San Francisco, CA', type: 'pediatric', patientCount: 890, staffCount: 18, rating: 4.6 },
  { id: 'clinic_003', name: 'PediAi South Bay', address: '789 Health Center', city: 'San Jose, CA', type: 'pediatric', patientCount: 650, staffCount: 12, rating: 4.7 },
];

const DEMO_STAFF: StaffMember[] = [
  { id: 'staff_001', name: 'Dr. Emily Chen', email: 'emily.chen@pediai.com', role: 'doctor', status: 'active', clinic: 'clinic_001', specialties: ['General Pediatrics', 'Asthma'], avatar: '👩‍⚕️' },
  { id: 'staff_002', name: 'Dr. Michael Sharma', email: 'michael.sharma@pediai.com', role: 'doctor', status: 'active', clinic: 'clinic_001', specialties: ['Developmental Pediatrics'], avatar: '👨‍⚕️' },
  { id: 'staff_003', name: 'Jessica Jones', email: 'jessica.jones@pediai.com', role: 'nurse', status: 'active', clinic: 'clinic_001', avatar: '👩‍⚕️' },
  { id: 'staff_004', name: 'Sarah Williams', email: 'sarah.williams@pediai.com', role: 'nurse', status: 'active', clinic: 'clinic_001', avatar: '👩‍⚕️' },
  { id: 'staff_005', name: 'Amanda Brown', email: 'amanda.brown@pediai.com', role: 'receptionist', status: 'active', clinic: 'clinic_001', avatar: '👩‍💼' },
  { id: 'staff_006', name: 'Dr. Priya Patel', email: 'priya.patel@pediai.com', role: 'doctor', status: 'active', clinic: 'clinic_002', specialties: ['Adolescent Medicine'], avatar: '👩‍⚕️' },
  { id: 'staff_007', name: 'Lisa Martinez', email: 'lisa.martinez@pediai.com', role: 'nurse', status: 'active', clinic: 'clinic_002', avatar: '👩‍⚕️' },
  { id: 'staff_008', name: 'Robert Garcia', email: 'robert.garcia@pediai.com', role: 'receptionist', status: 'on_leave', clinic: 'clinic_002', avatar: '👨‍💼' },
];

export function useClinics() {
  const { session } = useAuth();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClinics = async () => {
      if (!session) {
        setClinics([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setClinics(DEMO_CLINICS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch clinics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClinics();
  }, [session]);

  return { clinics, isLoading, error };
}

export function useClinicStaff(clinicId?: string) {
  const { session } = useAuth();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      if (!session) {
        setStaff([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        const filteredStaff = clinicId
          ? DEMO_STAFF.filter(s => s.clinic === clinicId)
          : DEMO_STAFF;
        setStaff(filteredStaff);
        setError(null);
      } catch (err) {
        setError('Failed to fetch staff');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaff();
  }, [session, clinicId]);

  const addStaff = useCallback(async (newStaff: Omit<StaffMember, 'id'>) => {
    await simulateDelay(300);
    const staff: StaffMember = { ...newStaff, id: `staff_${Date.now()}` };
    setStaff(prev => [...prev, staff]);
    return staff;
  }, []);

  const updateStaffStatus = useCallback(async (staffId: string, status: StaffMember['status']) => {
    await simulateDelay(200);
    setStaff(prev => prev.map(s => s.id === staffId ? { ...s, status } : s));
  }, []);

  return { staff, isLoading, error, addStaff, updateStaffStatus };
}

export function useClinicReports(clinicId?: string) {
  const { session } = useAuth();
  const [reports, setReports] = useState<ClinicReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      if (!session) {
        setReports([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setReports([
          { id: 'r1', type: 'vaccination', title: 'Vaccination Compliance Report', date: '2026-06-01', generatedBy: 'System' },
          { id: 'r2', type: 'growth', title: 'Growth Analytics Q22026', date: '2026-06-05', generatedBy: 'Dr. Chen' },
          { id: 'r3', type: 'appointments', title: 'Appointment Summary May2026', date: '2026-06-01', generatedBy: 'System' },
          { id: 'r4', type: 'revenue', title: 'Revenue Report May 2026', date: '2026-06-01', generatedBy: 'Admin' },
        ]);
        setError(null);
      } catch (err) {
        setError('Failed to fetch reports');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [session, clinicId]);

  return { reports, isLoading, error };
}

// ============================================
// PLATFORM ADMIN API HOOKS
// ============================================

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: string;
  clinic?: string;
  status: string;
  createdAt: string;
  lastLogin: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  ipAddress: string;
  details?: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

const DEMO_PLATFORM_USERS: PlatformUser[] = [
  { id: 'u001', name: 'Sarah Mitchell', email: 'anxious@demo.com', role: 'parent', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2024-01-15', lastLogin: '2026-06-08' },
  { id: 'u002', name: 'Dr. Emily Chen', email: 'dr.chen@pediai.com', role: 'doctor', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2022-03-15', lastLogin: '2026-06-08' },
  { id: 'u003', name: 'James Rodriguez', email: 'james@demo.com', role: 'parent', clinic: 'PediAi Downtown', status: 'active', createdAt: '2024-06-20', lastLogin: '2026-06-07' },
  { id: 'u004', name: 'Maria Thompson', email: 'maria@demo.com', role: 'parent', clinic: 'PediAi South Bay', status: 'active', createdAt: '2023-09-01', lastLogin: '2026-06-06' },
  { id: 'u005', name: 'Dr. Robert Kim', email: 'admin@pediatric-clinic.com', role: 'clinic_admin', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2023-01-01', lastLogin: '2026-06-08' },
  { id: 'u006', name: 'Nurse Lisa Martinez', email: 'lisa.martinez@pediai.com', role: 'nurse', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2022-06-01', lastLogin: '2026-06-08' },
  { id: 'u007', name: 'Michael Brown', email: 'michael.b@demo.com', role: 'parent', clinic: 'PediAi Downtown', status: 'pending', createdAt: '2026-06-05', lastLogin: '-' },
  { id: 'u008', name: 'Dr. Michael Sharma', email: 'dr.sharma@pediai.com', role: 'doctor', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2021-08-20', lastLogin: '2026-06-07' },
  { id: 'u009', name: 'Jennifer Lee', email: 'jennifer.l@demo.com', role: 'parent', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2024-02-10', lastLogin: '2026-06-05' },
  { id: 'u010', name: 'Nurse Amanda Brown', email: 'amanda.brown@pediai.com', role: 'nurse', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2021-11-15', lastLogin: '2026-06-08' },
  { id: 'u011', name: 'David Wilson', email: 'david.w@demo.com', role: 'parent', clinic: 'PediAi South Bay', status: 'suspended', createdAt: '2023-05-20', lastLogin: '2026-05-15' },
  { id: 'u012', name: 'Dr. Sarah Johnson', email: 'dr.johnson@pediai.com', role: 'doctor', clinic: 'PediAi Downtown', status: 'active', createdAt: '2023-01-10', lastLogin: '2026-06-08' },
  { id: 'u013', name: 'Lisa Anderson', email: 'lisa.a@demo.com', role: 'parent', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2024-03-05', lastLogin: '2026-06-06' },
  { id: 'u014', name: 'Dr. Priya Patel', email: 'dr.patel@pediai.com', role: 'doctor', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2020-09-01', lastLogin: '2026-06-07' },
  { id: 'u015', name: 'Robert Garcia', email: 'robert.g@demo.com', role: 'parent', clinic: 'PediAi Downtown', status: 'inactive', createdAt: '2022-11-15', lastLogin: '2026-04-01' },
  { id: 'u016', name: 'Platform Admin', email: 'admin@pedi-ai.com', role: 'platform_admin', status: 'active', createdAt: '2020-01-01', lastLogin: '2026-06-08' },
];

const DEMO_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'log_001', timestamp: '2026-06-08T10:30:00Z', userId: 'u016', userName: 'Platform Admin', userRole: 'platform_admin', action: 'LOGIN', resource: 'System', ipAddress: '192.168.1.1' },
  { id: 'log_002', timestamp: '2026-06-08T10:25:00Z', userId: 'u002', userName: 'Dr. Emily Chen', userRole: 'doctor', action: 'UPDATE', resource: 'Patient patient_001', ipAddress: '192.168.1.50', details: 'Updated clinical notes' },
  { id: 'log_003', timestamp: '2026-06-08T10:15:00Z', userId: 'u001', userName: 'Sarah Mitchell', userRole: 'parent', action: 'CREATE', resource: 'Growth Record', ipAddress: '192.168.1.100', details: 'Added new growth record for Emma' },
  { id: 'log_004', timestamp: '2026-06-08T09:45:00Z', userId: 'u005', userName: 'Dr. Robert Kim', userRole: 'clinic_admin', action: 'CREATE', resource: 'Staff Member', ipAddress: '192.168.1.25', details: 'Invited new nurse' },
  { id: 'log_005', timestamp: '2026-06-08T09:30:00Z', userId: 'u011', userName: 'David Wilson', userRole: 'parent', action: 'SUSPEND', resource: 'Account', ipAddress: '192.168.1.75', details: 'Account suspended due to policy violation' },
  { id: 'log_006', timestamp: '2026-06-08T09:00:00Z', userId: 'u003', userName: 'James Rodriguez', userRole: 'parent', action: 'VIEW', resource: 'Vaccination Records', ipAddress: '192.168.1.80' },
  { id: 'log_007', timestamp: '2026-06-07T18:00:00Z', userId: 'u016', userName: 'Platform Admin', userRole: 'platform_admin', action: 'EXPORT', resource: 'Audit Logs', ipAddress: '192.168.1.1', details: 'Exported audit logs for May 2026' },
  { id: 'log_008', timestamp: '2026-06-07T15:30:00Z', userId: 'u007', userName: 'Michael Brown', userRole: 'parent', action: 'CREATE', resource: 'Account', ipAddress: '192.168.1.90', details: 'New user registration' },
  { id: 'log_009', timestamp: '2026-06-07T14:00:00Z', userId: 'u006', userName: 'Nurse Lisa Martinez', userRole: 'nurse', action: 'CREATE', resource: 'Vitals Record', ipAddress: '192.168.1.55', details: 'Recorded vitals for patient pat_001' },
  { id: 'log_010', timestamp: '2026-06-07T12:00:00Z', userId: 'u008', userName: 'Dr. Michael Sharma', userRole: 'doctor', action: 'UPDATE', resource: 'Patient patient_003', ipAddress: '192.168.1.60', details: 'Updated asthma treatment plan' },
];

const DEMO_ALERTS: Alert[] = [
  { id: 'alert_001', type: 'warning', title: 'Storage Warning', message: 'Storage usage at 75%. Consider expanding capacity.', timestamp: '2026-06-08T08:00:00Z' },
  { id: 'alert_002', type: 'info', title: 'New Clinic Registration', message: 'PediAi Downtown submitted registration for review.', timestamp: '2026-06-07T14:00:00Z' },
  { id: 'alert_003', type: 'error', title: 'API Rate Limit', message: 'API rate limit reached for /api/vaccinations endpoint.', timestamp: '2026-06-06T16:30:00Z' },
];

export function usePlatformUsers() {
  const { session } = useAuth();
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!session) {
        setUsers([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setUsers(DEMO_PLATFORM_USERS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [session]);

  const updateUserStatus = useCallback(async (userId: string, status: string) => {
    await simulateDelay(200);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
  }, []);

  const updateUserRole = useCallback(async (userId: string, role: string) => {
    await simulateDelay(200);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
  }, []);

  const searchUsers = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return users.filter(u =>
      u.name.toLowerCase().includes(lowerQuery) ||
      u.email.toLowerCase().includes(lowerQuery)
    );
  }, [users]);

  return { users, isLoading, error, updateUserStatus, updateUserRole, searchUsers };
}

export function useAuditLogs() {
  const { session } = useAuth();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!session) {
        setLogs([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setLogs(DEMO_AUDIT_LOGS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch audit logs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [session]);

  const filterLogs = useCallback((query: string, actionFilter: string) => {
    return logs.filter(log => {
      const matchesSearch = !query ||
        log.userName.toLowerCase().includes(query.toLowerCase()) ||
        log.action.toLowerCase().includes(query.toLowerCase()) ||
        log.resource.toLowerCase().includes(query.toLowerCase());
      const matchesAction = !actionFilter || actionFilter === 'all' || log.action === actionFilter;
      return matchesSearch && matchesAction;
    });
  }, [logs]);

  return { logs, isLoading, error, filterLogs };
}

export function usePlatformAlerts() {
  const { session } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      if (!session) {
        setAlerts([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setAlerts(DEMO_ALERTS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch alerts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [session]);

  return { alerts, isLoading, error };
}

export function getPlatformStats() {
  return {
    totalUsers: DEMO_PLATFORM_USERS.length,
    activeClinics: 3,
    totalAppointments: 4850,
    issuesReported: 12,
  };
}

export function getClinicStats(clinicId: string) {
  const clinic = DEMO_CLINICS.find(c => c.id === clinicId);
  return {
    totalPatients: clinic?.patientCount || 0,
    staffCount: clinic?.staffCount || 0,
    appointmentsToday: 24,
    revenueThisMonth: 45000,
  };
}

// ============================================
// NOTIFICATION API HOOKS
// ============================================

export interface Notification {
  id: string;
  type: 'vaccination' | 'milestone' | 'appointment' | 'message' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  important: boolean;
  link?: string;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'vaccination', title: 'Vaccination Due Tomorrow', description: 'Emma has MMR vaccine scheduled for tomorrow.', timestamp: '2026-06-07T10:00:00Z', read: false, important: true, link: '/vaccinations' },
  { id: 'n2', type: 'milestone', title: 'New Milestone Achieved! 🎉', description: 'Emma has started crawling! Track this milestone.', timestamp: '2026-06-06T14:30:00Z', read: false, important: false, link: '/milestones' },
  { id: 'n3', type: 'appointment', title: 'Appointment Reminder', description: 'Checkup for Emma scheduled for June 15th at 9:00 AM.', timestamp: '2026-06-05T09:00:00Z', read: true, important: true, link: '/appointments' },
  { id: 'n4', type: 'message', title: 'Message from Dr. Chen', description: 'Dr. Chen has sent you a message about Emma\'s growth.', timestamp: '2026-06-04T16:00:00Z', read: true, important: false },
  { id: 'n5', type: 'system', title: 'Weekly Report Ready', description: 'Your weekly health summary for Emma is ready to view.', timestamp: '2026-06-03T08:00:00Z', read: true, important: false, link: '/reports' },
  { id: 'n6', type: 'vaccination', title: 'Vaccination Completed', description: 'DTaP dose 2 has been marked as completed.', timestamp: '2026-06-01T11:00:00Z', read: true, important: false, link: '/vaccinations' },
  { id: 'n7', type: 'milestone', title: 'Milestone Due Soon', description: 'Emma\'s "First Steps" milestone is due in 2 weeks.', timestamp: '2026-05-30T10:00:00Z', read: false, important: true, link: '/milestones' },
  { id: 'n8', type: 'system', title: 'Data Backup Complete', description: 'Your health records have been securely backed up.', timestamp: '2026-05-28T02:00:00Z', read: true, important: false },
];

export function useNotifications() {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!session) {
        setNotifications([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        // Load from localStorage if available
        const stored = localStorage.getItem('pedi_ai_notifications');
        if (stored) {
          setNotifications(JSON.parse(stored));
        } else {
          setNotifications(DEMO_NOTIFICATIONS);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch notifications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [session]);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('pedi_ai_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const markAsRead = useCallback(async (notificationId: string) => {
    await simulateDelay(100);
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, read: true } : n));
  }, []);

  const markAllAsRead = useCallback(async () => {
    await simulateDelay(100);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const deleteNotification = useCallback(async (notificationId: string) => {
    await simulateDelay(100);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const getUnreadCount = useCallback(() => notifications.filter(n => !n.read).length, [notifications]);
  const getUnreadNotifications = useCallback(() => notifications.filter(n => !n.read), [notifications]);
  const getImportantNotifications = useCallback(() => notifications.filter(n => n.important), [notifications]);

  return {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
    getUnreadNotifications,
    getImportantNotifications
  };
}

// ============================================
// REPORT API HOOKS
// ============================================

export interface ReportConfig {
  childId: string;
  reportType: 'growth' | 'vaccination' | 'medical_history' | 'milestones';
  dateRange?: { start: string; end: string };
  includeCharts?: boolean;
  includeNotes?: boolean;
  includeImages?: boolean;
}

export interface GeneratedReport {
  id: string;
  type: ReportConfig['reportType'];
  childName: string;
  generatedAt: string;
  data: Record<string, unknown>;
}

export function useReportGeneration() {
  const { session } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(async (config: ReportConfig): Promise<GeneratedReport | null> => {
    if (!session) return null;

    try {
      setIsGenerating(true);
      setError(null);

      // Simulate PDF generation time
      await simulateDelay(1500);

      const activeChild = session.children.find(c => c.id === config.childId);

      const report: GeneratedReport = {
        id: `report_${Date.now()}`,
        type: config.reportType,
        childName: activeChild?.name || 'Unknown',
        generatedAt: new Date().toISOString(),
        data: {
          config,
          child: activeChild,
          // Would include actual data here
        },
      };

      return report;
    } catch (err) {
      setError('Failed to generate report');
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [session]);

  return { generateReport, isGenerating, error };
}

// ============================================
// CAREGIVER API HOOKS
// ============================================

export interface Caregiver {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relationship: 'grandparent' | 'nanny' | 'relative' | 'other';
  permissions: {
    viewGrowth: boolean;
    viewVaccinations: boolean;
    viewMedicalHistory: boolean;
    viewMilestones: boolean;
    viewMedications: boolean;
    receiveNotifications: boolean;
    bookAppointments: boolean;
  };
  lastAccessed?: string;
  status: 'pending' | 'active' | 'revoked';
  invitedAt: string;
}

const DEMO_CAREGIVERS: Caregiver[] = [
  { id: 'cg1', name: 'Grandma Rose', email: 'rose.mitchell@email.com', phone: '+1-555-0201', relationship: 'grandparent', permissions: { viewGrowth: true, viewVaccinations: true, viewMedicalHistory: true, viewMilestones: true, viewMedications: true, receiveNotifications: true, bookAppointments: false }, lastAccessed: '2026-06-07T14:00:00Z', status: 'active', invitedAt: '2024-06-01T10:00:00Z' },
  { id: 'cg2', name: 'Maria (Nanny)', email: 'maria.nanny@email.com', phone: '+1-555-0202', relationship: 'nanny', permissions: { viewGrowth: true, viewVaccinations: true, viewMedicalHistory: false, viewMilestones: true, viewMedications: false, receiveNotifications: true, bookAppointments: false }, lastAccessed: '2026-06-06T09:00:00Z', status: 'active', invitedAt: '2024-08-15T10:00:00Z' },
  { id: 'cg3', name: 'Uncle Tom', email: 'tom.mitchell@email.com', relationship: 'relative', permissions: { viewGrowth: true, viewVaccinations: true, viewMedicalHistory: false, viewMilestones: false, viewMedications: false, receiveNotifications: false, bookAppointments: false }, status: 'pending', invitedAt: '2026-06-05T10:00:00Z' },
];

export function useCaregivers() {
  const { session } = useAuth();
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaregivers = async () => {
      if (!session) {
        setCaregivers([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setCaregivers(DEMO_CAREGIVERS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch caregivers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaregivers();
  }, [session]);

  const inviteCaregiver = useCallback(async (caregiver: Omit<Caregiver, 'id' | 'status' | 'invitedAt'>) => {
    await simulateDelay(500);
    const newCaregiver: Caregiver = {
      ...caregiver,
      id: `cg_${Date.now()}`,
      status: 'pending',
      invitedAt: new Date().toISOString(),
    };
    setCaregivers(prev => [...prev, newCaregiver]);
    return newCaregiver;
  }, []);

  const updateCaregiverPermissions = useCallback(async (caregiverId: string, permissions: Caregiver['permissions']) => {
    await simulateDelay(200);
    setCaregivers(prev => prev.map(c => c.id === caregiverId ? { ...c, permissions } : c));
  }, []);

  const revokeCaregiver = useCallback(async (caregiverId: string) => {
    await simulateDelay(200);
    setCaregivers(prev => prev.map(c => c.id === caregiverId ? { ...c, status: 'revoked' as const } : c));
  }, []);

  return { caregivers, isLoading, error, inviteCaregiver, updateCaregiverPermissions, revokeCaregiver };
}

// ============================================
// APPOINTMENT API HOOKS
// ============================================

export interface BookableSlot {
  id: string;
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  duration: number;
  available: boolean;
}

export interface ParentAppointment {
  id: string;
  providerName: string;
  providerId: string;
  date: string;
  time: string;
  type: 'checkup' | 'vaccination' | 'sick' | 'followup';
  status: 'confirmed' | 'pending' | 'cancelled';
  notes?: string;
}

const DEMO_BOOKABLE_SLOTS: BookableSlot[] = [
  { id: 'slot_001', providerId: 'dr_001', providerName: 'Dr. Emily Chen', date: '2026-06-10', time: '09:00', duration: 30, available: true },
  { id: 'slot_002', providerId: 'dr_001', providerName: 'Dr. Emily Chen', date: '2026-06-10', time: '09:30', duration: 30, available: true },
  { id: 'slot_003', providerId: 'dr_001', providerName: 'Dr. Emily Chen', date: '2026-06-10', time: '10:00', duration: 30, available: false },
  { id: 'slot_004', providerId: 'dr_002', providerName: 'Dr. Michael Sharma', date: '2026-06-10', time: '10:30', duration: 30, available: true },
  { id: 'slot_005', providerId: 'dr_001', providerName: 'Dr. Emily Chen', date: '2026-06-11', time: '09:00', duration: 30, available: true },
  { id: 'slot_006', providerId: 'dr_001', providerName: 'Dr. Emily Chen', date: '2026-06-11', time: '09:30', duration: 30, available: true },
  { id: 'slot_007', providerId: 'dr_002', providerName: 'Dr. Michael Sharma', date: '2026-06-11', time: '11:00', duration: 30, available: true },
  { id: 'slot_008', providerId: 'dr_001', providerName: 'Dr. Emily Chen', date: '2026-06-12', time: '09:00', duration: 30, available: true },
];

const DEMO_PARENT_APPOINTMENTS: ParentAppointment[] = [
  { id: 'apt_p001', providerName: 'Dr. Emily Chen', providerId: 'dr_001', date: '2026-06-15', time: '09:00', type: 'checkup', status: 'confirmed', notes: 'Regular checkup' },
  { id: 'apt_p002', providerName: 'Dr. Emily Chen', providerId: 'dr_001', date: '2026-07-15', time: '10:00', type: 'vaccination', status: 'pending', notes: 'MMR vaccine' },
];

export function useAvailableSlots(providerId?: string) {
  const { session } = useAuth();
  const [slots, setSlots] = useState<BookableSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!session) {
        setSlots([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        const filteredSlots = providerId
          ? DEMO_BOOKABLE_SLOTS.filter(s => s.providerId === providerId)
          : DEMO_BOOKABLE_SLOTS;
        setSlots(filteredSlots);
        setError(null);
      } catch (err) {
        setError('Failed to fetch available slots');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();
  }, [session, providerId]);

  return { slots, isLoading, error };
}

export function useParentAppointments() {
  const { session } = useAuth();
  const [appointments, setAppointments] = useState<ParentAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!session) {
        setAppointments([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();
        setAppointments(DEMO_PARENT_APPOINTMENTS);
        setError(null);
      } catch (err) {
        setError('Failed to fetch appointments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [session]);

  const bookAppointment = useCallback(async (slot: BookableSlot, type: ParentAppointment['type'], notes?: string) => {
    await simulateDelay(500);
    const newAppointment: ParentAppointment = {
      id: `apt_${Date.now()}`,
      providerName: slot.providerName,
      providerId: slot.providerId,
      date: slot.date,
      time: slot.time,
      type,
      status: 'pending',
      notes,
    };
    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  }, []);

  const cancelAppointment = useCallback(async (appointmentId: string) => {
    await simulateDelay(300);
    setAppointments(prev => prev.map(apt => apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt));
  }, []);

  const getUpcomingAppointments = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments
      .filter(apt => apt.date >= today && apt.status !== 'cancelled')
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [appointments]);

  return { appointments, isLoading, error, bookAppointment, cancelAppointment, getUpcomingAppointments };
}

// Types are exported inline above
