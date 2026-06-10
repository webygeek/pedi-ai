// Demo data for Clinic Admin

export interface ClinicStaff {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'nurse' | 'receptionist';
  status: 'active' | 'on_leave' | 'inactive';
  specialization?: string;
  phone: string;
  joinDate: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  city: string;
  patientCount: number;
  staffCount: number;
  type: 'hospital' | 'clinic' | 'pediatric_center';
}

export interface ActivityItem {
  id: string;
  type: 'patient_added' | 'appointment' | 'staff_update' | 'vaccination' | 'report';
  description: string;
  timestamp: string;
  user?: string;
}

// Demo Clinics
export const DEMO_CLINICS: Clinic[] = [
  {
    id: 'clinic_001',
    name: 'PediAi Main Clinic',
    address: '123 Healthcare Avenue',
    city: 'San Francisco',
    patientCount: 1250,
    staffCount: 45,
    type: 'pediatric_center',
  },
  {
    id: 'clinic_002',
    name: 'PediAi Downtown',
    address: '456 Medical Plaza, Suite 200',
    city: 'San Francisco',
    patientCount: 680,
    staffCount: 28,
    type: 'clinic',
  },
  {
    id: 'clinic_003',
    name: 'PediAi South Bay',
    address: '789 Wellness Center Drive',
    city: 'San Jose',
    patientCount: 420,
    staffCount: 18,
    type: 'clinic',
  },
];

// Demo Staff
export const DEMO_STAFF: ClinicStaff[] = [
  {
    id: 'staff_001',
    name: 'Dr. Emily Chen',
    email: 'dr.chen@pediai.com',
    role: 'doctor',
    status: 'active',
    specialization: 'General Pediatrics',
    phone: '+1-555-0201',
    joinDate: '2022-03-15',
  },
  {
    id: 'staff_002',
    name: 'Dr. Michael Sharma',
    email: 'dr.sharma@pediai.com',
    role: 'doctor',
    status: 'active',
    specialization: 'Developmental Pediatrics',
    phone: '+1-555-0202',
    joinDate: '2021-08-20',
  },
  {
    id: 'staff_003',
    name: 'Dr. Sarah Johnson',
    email: 'dr.johnson@pediai.com',
    role: 'doctor',
    status: 'active',
    specialization: 'Adolescent Medicine',
    phone: '+1-555-0203',
    joinDate: '2023-01-10',
  },
  {
    id: 'staff_004',
    name: 'Nurse Lisa Martinez',
    email: 'lisa.martinez@pediai.com',
    role: 'nurse',
    status: 'active',
    specialization: 'Pediatric Nursing',
    phone: '+1-555-0204',
    joinDate: '2022-06-01',
  },
  {
    id: 'staff_005',
    name: 'Nurse Amanda Brown',
    email: 'amanda.brown@pediai.com',
    role: 'nurse',
    status: 'active',
    specialization: 'Neonatal Care',
    phone: '+1-555-0205',
    joinDate: '2021-11-15',
  },
  {
    id: 'staff_006',
    name: 'Nurse James Wilson',
    email: 'james.wilson@pediai.com',
    role: 'nurse',
    status: 'on_leave',
    specialization: 'Immunization Specialist',
    phone: '+1-555-0206',
    joinDate: '2023-04-20',
  },
  {
    id: 'staff_007',
    name: 'Maria Garcia',
    email: 'maria.garcia@pediai.com',
    role: 'receptionist',
    status: 'active',
    phone: '+1-555-0207',
    joinDate: '2022-01-05',
  },
  {
    id: 'staff_008',
    name: 'David Lee',
    email: 'david.lee@pediai.com',
    role: 'receptionist',
    status: 'active',
    phone: '+1-555-0208',
    joinDate: '2023-07-12',
  },
  {
    id: 'staff_009',
    name: 'Dr. Priya Patel',
    email: 'dr.patel@pediai.com',
    role: 'doctor',
    status: 'active',
    specialization: 'Allergy & Immunology',
    phone: '+1-555-0209',
    joinDate: '2020-09-01',
  },
  {
    id: 'staff_010',
    name: 'Nurse Jennifer Davis',
    email: 'jennifer.davis@pediai.com',
    role: 'nurse',
    status: 'active',
    specialization: 'Chronic Disease Management',
    phone: '+1-555-0210',
    joinDate: '2022-09-18',
  },
];

// Demo Recent Activity
export const DEMO_ACTIVITY: ActivityItem[] = [
  {
    id: 'act_001',
    type: 'patient_added',
    description: 'New patient registration: Sophia Martinez',
    timestamp: '2026-06-08T09:30:00Z',
    user: 'Maria Garcia',
  },
  {
    id: 'act_002',
    type: 'appointment',
    description: '12 appointments scheduled for today',
    timestamp: '2026-06-08T08:00:00Z',
  },
  {
    id: 'act_003',
    type: 'vaccination',
    description: 'Flu vaccination drive completed - 45 children vaccinated',
    timestamp: '2026-06-07T16:30:00Z',
    user: 'Nurse Lisa Martinez',
  },
  {
    id: 'act_004',
    type: 'staff_update',
    description: 'Dr. Michael Sharma completed training on developmental screening',
    timestamp: '2026-06-07T14:00:00Z',
    user: 'Dr. Michael Sharma',
  },
  {
    id: 'act_005',
    type: 'patient_added',
    description: 'New patient registration: Ethan Brown',
    timestamp: '2026-06-07T11:15:00Z',
    user: 'David Lee',
  },
  {
    id: 'act_006',
    type: 'report',
    description: 'Monthly report generated and sent to stakeholders',
    timestamp: '2026-06-06T17:00:00Z',
  },
  {
    id: 'act_007',
    type: 'vaccination',
    description: 'MMR vaccine administered to 8 children',
    timestamp: '2026-06-06T10:30:00Z',
    user: 'Nurse Amanda Brown',
  },
  {
    id: 'act_008',
    type: 'appointment',
    description: '15 follow-up appointments confirmed for next week',
    timestamp: '2026-06-05T15:45:00Z',
  },
];

// Stats for dashboard
export const getClinicStats = (clinicId: string) => ({
  totalPatients: 1250,
  staffCount: 45,
  appointmentsToday: 24,
  revenueThisMonth: 125000,
});