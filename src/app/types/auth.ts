// User and Authentication Types

// AuthState type used by AuthContext
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'doctor' | 'admin' | 'nurse' | 'clinic_admin' | 'platform_admin' | 'school_nurse' | 'caregiver' | 'insurance' | 'pharmacy';
  avatar?: string;
  children?: Child[];
  specialty?: string;
  licenseNumber?: string;
}

export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  bloodType?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ParentProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  weight: number; // in kg
  height: number; // in cm
  bloodType?: string;
  allergies: string[];
  conditions: string[];
  avatar?: string;
}

export interface GrowthRecord {
  date: string;
  weight: number;
  height: number;
  headCircumference?: number;
  percentile?: {
    weight: number;
    height: number;
  };
}

export interface VaccinationRecord {
  id: string;
  name: string;
  dueDate: string;
  administeredDate?: string;
  status: 'due' | 'overdue' | 'completed' | 'upcoming';
  doseNumber?: number;
  totalDoses?: number;
}

export interface MilestoneRecord {
  id: string;
  title: string;
  domain: 'motor' | 'language' | 'social' | 'cognitive';
  dueDate: string;
  completedDate?: string;
  status: 'due' | 'completed' | 'upcoming';
  description: string;
}

export interface MedicationRecord {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy?: string;
  notes?: string;
}

export interface HealthLogEntry {
  id: string;
  type: 'fever' | 'medicine' | 'note' | 'symptom' | 'checkup';
  title: string;
  description: string;
  date: string;
  time?: string;
  status: 'resolved' | 'active' | 'normal';
  details?: Record<string, string>;
}

export interface SymptomAssessment {
  id: string;
  date: string;
  symptoms: string[];
  bodyArea: string;
  triageLevel: 'home' | 'urgent' | 'emergency';
  result: string;
  recommendations: string[];
}

export interface UserSession {
  user: ParentProfile;
  children: ChildProfile[];
  activeChildId: string;
  isAuthenticated: boolean;
  userRole?: 'parent' | 'doctor' | 'nurse' | 'clinic_admin' | 'platform_admin' | 'school_nurse' | 'caregiver' | 'insurance' | 'pharmacy';
}

export interface DemoAccount {
  email: string;
  password: string;
  user: ParentProfile;
  children: ChildProfile[];
  activeChildId: string;
  growthRecords: Record<string, GrowthRecord[]>;
  vaccinations: VaccinationRecord[];
  milestones: MilestoneRecord[];
  medications: MedicationRecord[];
  healthLog: HealthLogEntry[];
  symptomAssessments: SymptomAssessment[];
  userRole?: 'parent' | 'doctor' | 'nurse' | 'clinic_admin' | 'platform_admin' | 'school_nurse' | 'caregiver' | 'insurance' | 'pharmacy';
}
