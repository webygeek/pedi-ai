// Demo data for Nurse Dashboard

export interface Patient {
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

export interface Task {
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

// Demo Patients
export const DEMO_NURSE_PATIENTS: Patient[] = [
  {
    id: 'pat_001',
    name: 'Emma Thompson',
    dateOfBirth: '2024-03-15',
    age: '2 years',
    gender: 'female',
    parentName: 'Sarah Thompson',
    lastVisit: '2026-06-01',
    status: 'stable',
    avatar: '👧',
  },
  {
    id: 'pat_002',
    name: 'Lucas Martinez',
    dateOfBirth: '2022-09-10',
    age: '3 years',
    gender: 'male',
    parentName: 'Maria Martinez',
    lastVisit: '2026-05-28',
    status: 'needs_attention',
    avatar: '👦',
  },
  {
    id: 'pat_003',
    name: 'Sophia Chen',
    dateOfBirth: '2025-01-20',
    age: '1 year',
    gender: 'female',
    parentName: 'James Chen',
    lastVisit: '2026-06-05',
    status: 'stable',
    avatar: '👧',
  },
  {
    id: 'pat_004',
    name: 'Oliver Brown',
    dateOfBirth: '2023-06-08',
    age: '2 years',
    gender: 'male',
    parentName: 'David Brown',
    lastVisit: '2026-05-20',
    status: 'stable',
    avatar: '👦',
  },
  {
    id: 'pat_005',
    name: 'Isabella Garcia',
    dateOfBirth: '2021-11-30',
    age: '4 years',
    gender: 'female',
    parentName: 'Rosa Garcia',
    lastVisit: '2026-06-03',
    status: 'needs_attention',
    avatar: '👧',
  },
];

// Demo Tasks
export const DEMO_NURSE_TASKS: Task[] = [
  {
    id: 'task_001',
    type: 'vitals',
    patientId: 'pat_001',
    patientName: 'Emma Thompson',
    description: 'Record vitals before checkup',
    dueTime: '09:00 AM',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'task_002',
    type: 'medication',
    patientId: 'pat_002',
    patientName: 'Lucas Martinez',
    description: 'Administer asthma medication',
    dueTime: '09:30 AM',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'task_003',
    type: 'vaccination',
    patientId: 'pat_003',
    patientName: 'Sophia Chen',
    description: 'MMR vaccine - dose 1',
    dueTime: '10:00 AM',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'task_004',
    type: 'vitals',
    patientId: 'pat_005',
    patientName: 'Isabella Garcia',
    description: 'Post-surgery vitals check',
    dueTime: '10:30 AM',
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'task_005',
    type: 'followup',
    patientId: 'pat_004',
    patientName: 'Oliver Brown',
    description: 'Follow-up call for lab results',
    dueTime: '11:00 AM',
    status: 'pending',
    priority: 'low',
  },
  {
    id: 'task_006',
    type: 'vitals',
    patientId: 'pat_001',
    patientName: 'Emma Thompson',
    description: 'Record vitals after procedure',
    dueTime: '08:00 AM',
    status: 'completed',
    priority: 'high',
  },
  {
    id: 'task_007',
    type: 'medication',
    patientId: 'pat_002',
    patientName: 'Lucas Martinez',
    description: 'Morning dose check',
    dueTime: '08:30 AM',
    status: 'completed',
    priority: 'medium',
  },
];

// Demo Vitals Patients (for the dropdown)
export const DEMO_VITALS_PATIENTS = DEMO_NURSE_PATIENTS.map(p => ({
  id: p.id,
  name: p.name,
  age: p.age,
}));