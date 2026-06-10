// ============================================================
// PEDi·Ai USER ROLE SYSTEM
// Comprehensive user types, permissions, and access control
// ============================================================

// ============================================================
// USER ROLES
// ============================================================

export type UserRole =
  | 'parent'           // Primary caregiver using the app
  | 'doctor'            // Pediatrician, specialist
  | 'nurse'             // Nurse, nurse practitioner
  | 'clinic_admin'      // Clinic/organization administrator
  | 'platform_admin'    // Platform super administrator
  | 'school_nurse'       // School health staff (future)
  | 'caregiver'         // Secondary caregiver: nanny, grandparent (future)
  | 'insurance'         // Insurance provider (future/B2B)
  | 'pharmacy'          // Pharmacy (future/B2B)

// ============================================================
// USER STATUS
// ============================================================

export type UserStatus =
  | 'active'      // Fully active account
  | 'pending'      // Awaiting verification/approval
  | 'suspended'   // Temporarily suspended
  | 'inactive'    // Deactivated account
  | 'deleted'     // Soft-deleted

// ============================================================
// VERIFICATION STATUS
// ============================================================

export type VerificationStatus =
  | 'unverified'   // Not submitted
  | 'pending'      // Under review
  | 'verified'     // Approved
  | 'rejected'     // Rejected

// ============================================================
// PERMISSIONS (Fine-grained access control)
// ============================================================

export type Permission =
  // Child/Patient Management
  | 'child:create'           // Add new child profile
  | 'child:read'             // View child profiles
  | 'child:update'           // Edit child profiles
  | 'child:delete'           // Remove child profiles
  | 'child:share'            // Share child data with providers

  // Health Records
  | 'health_record:create'   // Add health entries
  | 'health_record:read'     // View health history
  | 'health_record:update'   // Edit health entries
  | 'health_record:delete'   // Delete health entries

  // Growth & Milestones
  | 'growth:create'          // Add growth measurements
  | 'growth:read'            // View growth charts
  | 'growth:update'          // Edit growth data
  | 'milestone:create'       // Mark milestones
  | 'milestone:read'         // View milestones
  | 'milestone:update'       // Update milestone status

  // Vaccinations
  | 'vaccination:create'      // Add vaccination records
  | 'vaccination:read'       // View vaccination history
  | 'vaccination:update'     // Update vaccination status
  | 'vaccination:delete'     // Delete vaccination records

  // Medications
  | 'medication:create'       // Add medications
  | 'medication:read'         // View medication list
  | 'medication:update'       // Update medication details
  | 'medication:delete'       // Remove medications
  | 'dosage:calculate'       // Use dosage calculator

  // Symptom Assessment
  | 'symptom:check'          // Run symptom triage
  | 'symptom:read'           // View past assessments
  | 'symptom:history'        // Full symptom history

  // Emergency
  | 'emergency:access'       // Access emergency guide
  | 'emergency:protocol'      // View emergency protocols

  // Medical History
  | 'medical_history:read'    // View complete history
  | 'medical_history:export'  // Export medical records

  // Doctor-Patient Relationship
  | 'doctor_patient:assign'   // Assign doctor to patient
  | 'doctor_patient:view'    // View assigned patients
  | 'doctor_patient:notes'   // Add clinical notes

  // Clinic Management
  | 'clinic:manage'           // Full clinic management
  | 'clinic:staff'           // Manage staff
  | 'clinic:settings'        // Modify clinic settings
  | 'clinic:reports'         // View clinic reports

  // User Management
  | 'user:create'            // Create users
  | 'user:read'             // View user list
  | 'user:update'           // Update user details
  | 'user:delete'            // Delete users
  | 'user:roles'            // Assign roles

  // Content Management
  | 'content:manage'         // Manage medical content
  | 'content:approve'       // Approve content changes

  // Analytics & Reports
  | 'analytics:view'         // View analytics
  | 'analytics:export'        // Export reports
  | 'analytics:clinic'       // Clinic-level analytics
  | 'analytics:platform'      // Platform-wide analytics

  // Billing & Subscription
  | 'billing:view'           // View billing info
  | 'billing:manage'         // Manage subscriptions
  | 'billing:clinic'         // Clinic billing

  // System Administration
  | 'system:config'          // System configuration
  | 'system:logs'            // View system logs
  | 'system:backup'          // Manage backups
  | 'system:audit'           // View audit logs

// ============================================================
// ROLE PERMISSION MAPPING
// ============================================================

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // ----------------------------------------
  // PARENT - Primary caregiver
  // ----------------------------------------
  parent: [
    // Child Management
    'child:create',
    'child:read',
    'child:update',
    'child:delete',
    'child:share',

    // Health Records
    'health_record:create',
    'health_record:read',
    'health_record:update',
    'health_record:delete',

    // Growth & Milestones
    'growth:create',
    'growth:read',
    'growth:update',
    'milestone:create',
    'milestone:read',
    'milestone:update',

    // Vaccinations
    'vaccination:create',
    'vaccination:read',
    'vaccination:update',

    // Medications
    'medication:create',
    'medication:read',
    'medication:update',
    'medication:delete',
    'dosage:calculate',

    // Symptom Assessment
    'symptom:check',
    'symptom:read',
    'symptom:history',

    // Emergency
    'emergency:access',
    'emergency:protocol',

    // Medical History
    'medical_history:read',
    'medical_history:export',

    // Analytics
    'analytics:view',

    // Billing
    'billing:view',
    'billing:manage',
  ],

  // ----------------------------------------
  // DOCTOR - Healthcare provider
  // ----------------------------------------
  doctor: [
    // Child Management (read-only unless assigned)
    'child:read',
    'child:share',

    // Health Records (can add clinical notes)
    'health_record:read',
    'doctor_patient:notes',

    // Growth & Milestones
    'growth:read',
    'milestone:read',

    // Vaccinations
    'vaccination:read',
    'vaccination:create',
    'vaccination:update',

    // Medications
    'medication:read',
    'medication:create',
    'medication:update',

    // Symptom Assessment
    'symptom:read',
    'symptom:history',

    // Emergency
    'emergency:access',
    'emergency:protocol',

    // Medical History
    'medical_history:read',
    'medical_history:export',

    // Doctor-Patient Relationship
    'doctor_patient:view',

    // Analytics
    'analytics:view',
    'analytics:export',
  ],

  // ----------------------------------------
  // NURSE - Healthcare staff
  // ----------------------------------------
  nurse: [
    // Child Management (read-only)
    'child:read',

    // Health Records
    'health_record:read',
    'health_record:create',

    // Growth & Milestones
    'growth:read',
    'growth:create',
    'milestone:read',

    // Vaccinations
    'vaccination:read',
    'vaccination:create',
    'vaccination:update',

    // Medications
    'medication:read',
    'medication:create',

    // Symptom Assessment
    'symptom:read',

    // Emergency
    'emergency:access',
    'emergency:protocol',

    // Medical History
    'medical_history:read',

    // Doctor-Patient Relationship
    'doctor_patient:view',

    // Analytics
    'analytics:view',
  ],

  // ----------------------------------------
  // CLINIC ADMIN - Organization administrator
  // ----------------------------------------
  clinic_admin: [
    // Child Management
    'child:read',

    // Health Records
    'health_record:read',

    // Growth & Milestones
    'growth:read',
    'milestone:read',

    // Vaccinations
    'vaccination:read',

    // Medications
    'medication:read',

    // Symptom Assessment
    'symptom:read',

    // Emergency
    'emergency:access',

    // Medical History
    'medical_history:read',

    // Doctor-Patient Relationship
    'doctor_patient:view',
    'doctor_patient:assign',

    // Clinic Management
    'clinic:manage',
    'clinic:staff',
    'clinic:settings',
    'clinic:reports',

    // User Management (within clinic)
    'user:read',
    'user:update',

    // Analytics
    'analytics:view',
    'analytics:export',
    'analytics:clinic',

    // Billing
    'billing:view',
    'billing:clinic',
  ],

  // ----------------------------------------
  // PLATFORM ADMIN - Super administrator
  // ----------------------------------------
  platform_admin: [
    // All permissions
    'child:create',
    'child:read',
    'child:update',
    'child:delete',
    'child:share',

    'health_record:create',
    'health_record:read',
    'health_record:update',
    'health_record:delete',

    'growth:create',
    'growth:read',
    'growth:update',
    'milestone:create',
    'milestone:read',
    'milestone:update',

    'vaccination:create',
    'vaccination:read',
    'vaccination:update',
    'vaccination:delete',

    'medication:create',
    'medication:read',
    'medication:update',
    'medication:delete',
    'dosage:calculate',

    'symptom:check',
    'symptom:read',
    'symptom:history',

    'emergency:access',
    'emergency:protocol',

    'medical_history:read',
    'medical_history:export',

    'doctor_patient:assign',
    'doctor_patient:view',
    'doctor_patient:notes',

    'clinic:manage',
    'clinic:staff',
    'clinic:settings',
    'clinic:reports',

    'user:create',
    'user:read',
    'user:update',
    'user:delete',
    'user:roles',

    'content:manage',
    'content:approve',

    'analytics:view',
    'analytics:export',
    'analytics:clinic',
    'analytics:platform',

    'billing:view',
    'billing:manage',
    'billing:clinic',

    'system:config',
    'system:logs',
    'system:backup',
    'system:audit',
  ],

  // ----------------------------------------
  // SCHOOL NURSE - Future role
  // ----------------------------------------
  school_nurse: [
    'child:read',
    'health_record:read',
    'growth:read',
    'milestone:read',
    'vaccination:read',
    'medication:read',
    'emergency:access',
    'emergency:protocol',
  ],

  // ----------------------------------------
  // CAREGIVER - Secondary caregiver (future)
  // ----------------------------------------
  caregiver: [
    'child:read',
    'health_record:create',
    'health_record:read',
    'growth:read',
    'milestone:read',
    'vaccination:read',
    'symptom:check',
    'emergency:access',
    'emergency:protocol',
    'medical_history:read',
  ],

  // ----------------------------------------
  // INSURANCE - B2B (future)
  // ----------------------------------------
  insurance: [
    'child:read',          // Via patient ID
    'medical_history:read',
    'vaccination:read',
    'analytics:view',
  ],

  // ----------------------------------------
  // PHARMACY - B2B (future)
  // ----------------------------------------
  pharmacy: [
    'child:read',
    'medication:read',
    'medication:create',
    'vaccination:read',
  ],
}

// ============================================================
// USER INTERFACE TYPES
// ============================================================

// Base user interface
export interface BaseUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  verificationStatus: VerificationStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

// Parent user
export interface ParentUser extends BaseUser {
  role: 'parent';
  children: string[];  // Array of child profile IDs
  emergencyContacts: EmergencyContact[];
  insuranceInfo?: InsuranceInfo;
  preferences: ParentPreferences;
}

// Doctor user
export interface DoctorUser extends BaseUser {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  clinicId?: string;    // Primary clinic
  clinicIds: string[]; // All affiliated clinics
  education: Education[];
  experience: number;  // Years of experience
  bio?: string;
  rating?: number;
  reviewCount?: number;
  patientIds: string[]; // Assigned patients
}

// Nurse user
export interface NurseUser extends BaseUser {
  role: 'nurse';
  specialization?: string;
  licenseNumber: string;
  clinicId: string;
  education: Education[];
  assignedDoctorId?: string; // For nurse practitioners
}

// Clinic admin user
export interface ClinicAdminUser extends BaseUser {
  role: 'clinic_admin';
  clinicId: string;
  permissions: string[]; // Can be customized per admin
}

// Platform admin user
export interface PlatformAdminUser extends BaseUser {
  role: 'platform_admin';
  accessLevel: 'read' | 'write' | 'full';
  assignedModules: string[];
}

// ============================================================
// SUPPORTING TYPES
// ============================================================

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  subscriberName: string;
}

export interface ParentPreferences {
  notifications: {
    appointments: boolean;
    vaccinations: boolean;
    milestones: boolean;
    medications: boolean;
    healthAlerts: boolean;
  };
  language: string;
  timezone: string;
  units: 'metric' | 'imperial';
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

// ============================================================
// CHILD PROFILE (Patient)
// ============================================================

export interface ChildProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodType?: string;
  allergies: string[];
  conditions: ChronicCondition[];
  medications: string[];

  // Relationships
  parentIds: string[];  // Primary and secondary parents
  doctorIds: string[];  // Assigned doctors
  clinicIds: string[];   // Affiliated clinics

  // Physical measurements
  weight?: number;       // kg
  height?: number;       // cm
  headCircumference?: number; // cm

  // Birth information
  birthWeight?: number;
  birthHeight?: number;
  birthCircumference?: number;
  gestationalAge?: number; // weeks

  // Medical history
  surgeries?: Surgery[];
  hospitalizations?: Hospitalization[];
  familyHistory?: FamilyHistory[];

  // Documents
  documents: Document[];

  // Settings
  isActive: boolean;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface ChronicCondition {
  name: string;
  diagnosedDate?: string;
  status: 'active' | 'managed' | 'resolved';
  notes?: string;
}

export interface Surgery {
  name: string;
  date: string;
  hospital?: string;
  surgeon?: string;
  notes?: string;
}

export interface Hospitalization {
  reason: string;
  startDate: string;
  endDate?: string;
  hospital?: string;
  notes?: string;
}

export interface FamilyHistory {
  condition: string;
  relation: string;
  notes?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'birth_certificate' | 'vaccination_record' | 'insurance' | 'prescription' | 'lab_result' | 'other';
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

// ============================================================
// CLINIC/ORGANIZATION
// ============================================================

export interface Clinic {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pediatric_center' | 'school' | 'pharmacy';
  address: Address;
  phone: string;
  email: string;
  website?: string;

  // Staff
  adminIds: string[];
  doctorIds: string[];
  nurseIds: string[];

  // Settings
  operatingHours: OperatingHours[];
  services: string[];
  insuranceAccepted: string[];

  // Branding
  logo?: string;
  primaryColor?: string;

  // Status
  isVerified: boolean;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface OperatingHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  open: string;   // HH:mm
  close: string;  // HH:mm
  isClosed: boolean;
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Check if a user has a specific permission
 */
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions.includes(permission);
}

/**
 * Check if a user has all specified permissions
 */
export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every(p => hasPermission(userRole, p));
}

/**
 * Check if a user has any of the specified permissions
 */
export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some(p => hasPermission(userRole, p));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if role is healthcare provider
 */
export function isHealthcareProvider(role: UserRole): boolean {
  return ['doctor', 'nurse', 'clinic_admin'].includes(role);
}

/**
 * Check if role is admin
 */
export function isAdmin(role: UserRole): boolean {
  return ['clinic_admin', 'platform_admin'].includes(role);
}

/**
 * Check if role is platform super admin
 */
export function isSuperAdmin(role: UserRole): boolean {
  return role === 'platform_admin';
}

/**
 * Get user type display name
 */
export function getRoleDisplayName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    parent: 'Parent/Guardian',
    doctor: 'Doctor',
    nurse: 'Nurse',
    clinic_admin: 'Clinic Admin',
    platform_admin: 'Platform Admin',
    school_nurse: 'School Nurse',
    caregiver: 'Caregiver',
    insurance: 'Insurance Provider',
    pharmacy: 'Pharmacy',
  };
  return names[role];
}

/**
 * Get role icon
 */
export function getRoleIcon(role: UserRole): string {
  const icons: Record<UserRole, string> = {
    parent: '👨‍👩‍👧',
    doctor: '👨‍⚕️',
    nurse: '👩‍⚕️',
    clinic_admin: '🏥',
    platform_admin: '🔐',
    school_nurse: '🏫',
    caregiver: '👩‍🧒',
    insurance: '📋',
    pharmacy: '💊',
  };
  return icons[role];
}

// ============================================================
// ROLE DISPLAY NAMES (Constant for easy access)
// ============================================================

export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  parent: 'Parent/Guardian',
  doctor: 'Doctor',
  nurse: 'Nurse',
  clinic_admin: 'Clinic Admin',
  platform_admin: 'Platform Admin',
  school_nurse: 'School Nurse',
  caregiver: 'Caregiver',
  insurance: 'Insurance Provider',
  pharmacy: 'Pharmacy',
};

// ============================================================
// HELPER FUNCTIONS FOR COMMON ROLE CHECKS
// ============================================================

/**
 * Check if role is platform admin
 */
export function isPlatformAdmin(role: UserRole): boolean {
  return role === 'platform_admin';
}

/**
 * Check if role is clinic admin
 */
export function isClinicAdmin(role: UserRole): boolean {
  return role === 'clinic_admin';
}

/**
 * Check if role is parent
 */
export function isParent(role: UserRole): boolean {
  return role === 'parent';
}

/**
 * Check if role is doctor
 */
export function isDoctor(role: UserRole): boolean {
  return role === 'doctor';
}

/**
 * Check if role is nurse
 */
export function isNurse(role: UserRole): boolean {
  return role === 'nurse';
}

/**
 * Check if role is school nurse
 */
export function isSchoolNurse(role: UserRole): boolean {
  return role === 'school_nurse';
}

/**
 * Check if role is caregiver
 */
export function isCaregiver(role: UserRole): boolean {
  return role === 'caregiver';
}

/**
 * Check if role is insurance provider
 */
export function isInsurance(role: UserRole): boolean {
  return role === 'insurance';
}

/**
 * Check if role is pharmacy
 */
export function isPharmacy(role: UserRole): boolean {
  return role === 'pharmacy';
}
