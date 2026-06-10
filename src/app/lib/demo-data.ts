// Demo User Profiles Data
// These accounts are for testing and demonstration purposes

import { DemoAccount, ChildProfile, GrowthRecord, VaccinationRecord, MilestoneRecord, MedicationRecord, HealthLogEntry, SymptomAssessment } from '@/app/types/auth';
import { UserRole } from '@/app/types/users';

// Helper to calculate age in months from DOB
const calculateAgeInMonths = (dob: string): number => {
  const birth = new Date(dob);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  return Math.max(0, months);
};

// ============================================
// DEMO ACCOUNTS
// ============================================

export const DEMO_ACCOUNTS: Record<string, DemoAccount> = {
  // Account 1: High-Anxiety Parent with Infant
  'anxious_parent': {
    email: 'anxious@demo.com',
    password: 'demo123',
    userRole: 'parent' as UserRole,
    user: {
      id: 'user_001',
      name: 'Sarah Mitchell',
      email: 'anxious@demo.com',
      phone: '+1-555-0101',
      createdAt: '2024-01-15T10:00:00Z',
    },
    children: [
      {
        id: 'child_001',
        name: 'Emma',
        dateOfBirth: '2025-06-15',
        gender: 'female',
        weight: 7.2,
        height: 68,
        bloodType: 'A+',
        allergies: ['Peanuts'],
        conditions: ['Reflux'],
        avatar: '👧',
      },
      {
        id: 'child_002',
        name: 'Oliver',
        dateOfBirth: '2023-03-22',
        gender: 'male',
        weight: 14.5,
        height: 95,
        bloodType: 'O+',
        allergies: [],
        conditions: [],
        avatar: '👦',
      },
    ],
    activeChildId: 'child_001',
    growthRecords: {
      'child_001': [
        { date: '2025-06-15', weight: 3.2, height: 50, headCircumference: 34 },
        { date: '2025-07-15', weight: 4.1, height: 54, headCircumference: 36 },
        { date: '2025-08-15', weight: 5.0, height: 58, headCircumference: 38 },
        { date: '2025-09-15', weight: 5.6, height: 61, headCircumference: 40 },
        { date: '2025-10-15', weight: 6.2, height: 64, headCircumference: 41 },
        { date: '2025-11-15', weight: 6.8, height: 66, headCircumference: 42 },
        { date: '2026-01-15', weight: 7.2, height: 68, headCircumference: 43 },
      ],
      'child_002': [
        { date: '2023-03-22', weight: 3.8, height: 52 },
        { date: '2023-06-22', weight: 6.2, height: 62 },
        { date: '2023-09-22', weight: 8.1, height: 72 },
        { date: '2024-01-22', weight: 10.2, height: 78 },
        { date: '2024-06-22', weight: 12.1, height: 85 },
        { date: '2025-01-22', weight: 13.8, height: 92 },
        { date: '2026-01-22', weight: 14.5, height: 95 },
      ],
    },
    vaccinations: [
      { id: 'v1', name: 'Hepatitis B', dueDate: '2025-06-15', administeredDate: '2025-06-15', status: 'completed', doseNumber: 1, totalDoses: 3 },
      { id: 'v2', name: 'Hepatitis B', dueDate: '2025-07-15', administeredDate: '2025-07-15', status: 'completed', doseNumber: 2, totalDoses: 3 },
      { id: 'v3', name: 'DTaP', dueDate: '2025-08-15', administeredDate: '2025-08-15', status: 'completed', doseNumber: 1, totalDoses: 5 },
      { id: 'v4', name: 'Hib', dueDate: '2025-08-15', administeredDate: '2025-08-15', status: 'completed', doseNumber: 1, totalDoses: 4 },
      { id: 'v5', name: 'Polio (IPV)', dueDate: '2025-08-15', administeredDate: '2025-08-15', status: 'completed', doseNumber: 1, totalDoses: 4 },
      { id: 'v6', name: 'PCV13', dueDate: '2025-08-15', administeredDate: '2025-08-15', status: 'completed', doseNumber: 1, totalDoses: 4 },
      { id: 'v7', name: 'Rotavirus', dueDate: '2025-08-15', administeredDate: '2025-08-15', status: 'completed', doseNumber: 1, totalDoses: 3 },
      { id: 'v8', name: 'DTaP', dueDate: '2025-10-15', administeredDate: '2025-10-15', status: 'completed', doseNumber: 2, totalDoses: 5 },
      { id: 'v9', name: 'Hib', dueDate: '2025-10-15', administeredDate: '2025-10-15', status: 'completed', doseNumber: 2, totalDoses: 4 },
      { id: 'v10', name: 'Polio (IPV)', dueDate: '2025-10-15', administeredDate: '2025-10-15', status: 'completed', doseNumber: 2, totalDoses: 4 },
      { id: 'v11', name: 'PCV13', dueDate: '2025-10-15', administeredDate: '2025-10-15', status: 'completed', doseNumber: 2, totalDoses: 4 },
      { id: 'v12', name: 'DTaP', dueDate: '2026-02-15', status: 'due' },
      { id: 'v13', name: 'Hib', dueDate: '2026-02-15', status: 'due' },
      { id: 'v14', name: 'Polio (IPV)', dueDate: '2026-02-15', status: 'due' },
      { id: 'v15', name: 'PCV13', dueDate: '2026-02-15', status: 'due' },
    ],
    milestones: [
      { id: 'm1', title: 'Lifts head during tummy time', domain: 'motor', dueDate: '2025-08-15', completedDate: '2025-08-20', status: 'completed', description: 'Baby can lift head briefly when lying on tummy' },
      { id: 'm2', title: 'Follows objects with eyes', domain: 'cognitive', dueDate: '2025-07-15', completedDate: '2025-07-10', status: 'completed', description: 'Tracks moving objects across midline' },
      { id: 'm3', title: 'Coos and gurgles', domain: 'language', dueDate: '2025-08-15', completedDate: '2025-08-25', status: 'completed', description: 'Makes sounds beyond crying' },
      { id: 'm4', title: 'Smiles at people', domain: 'social', dueDate: '2025-07-15', completedDate: '2025-07-18', status: 'completed', description: 'Social smile emerges around 6-8 weeks' },
      { id: 'm5', title: 'Rolls over both ways', domain: 'motor', dueDate: '2025-10-15', status: 'due', description: 'Baby can roll from tummy to back and back to tummy' },
      { id: 'm6', title: 'Sits without support', domain: 'motor', dueDate: '2026-01-15', status: 'due', description: 'Baby can sit steadily without help' },
      { id: 'm7', title: 'Babbles with consonants', domain: 'language', dueDate: '2026-01-15', status: 'due', description: 'Says "ba-ba", "da-da" etc.' },
      { id: 'm8', title: 'Responds to own name', domain: 'cognitive', dueDate: '2026-02-15', status: 'upcoming', description: 'Baby turns when name is called' },
    ],
    medications: [
      { id: 'med1', name: 'Vitamin D3', dosage: '400 IU', frequency: 'Daily', startDate: '2025-06-15', prescribedBy: 'Dr. Emily Chen', notes: 'For bone development' },
      { id: 'med2', name: 'Gripe Water', dosage: '2.5ml', frequency: 'As needed', startDate: '2025-08-01', notes: 'For colic and gas relief' },
    ],
    healthLog: [
      { id: 'hl1', type: 'fever', title: 'Low-grade fever', description: 'Temperature: 100.2°F, Duration: 1 day', date: '2026-06-05', time: '09:30 AM', status: 'resolved', details: { temperature: '100.2', duration: '1 day', medication: 'Acetaminophen 2.5ml' } },
      { id: 'hl2', type: 'medicine', title: 'Acetaminophen given', description: '2.5ml for fever', date: '2026-06-05', time: '09:35 AM', status: 'resolved' },
      { id: 'hl3', type: 'note', title: 'Wellness check', description: 'Normal appetite, good sleep patterns, meeting milestones', date: '2026-06-01', status: 'normal' },
      { id: 'hl4', type: 'symptom', title: 'Congestion', description: 'Mild nasal congestion, no fever', date: '2026-05-28', time: '08:00 AM', status: 'resolved' },
      { id: 'hl5', type: 'checkup', title: 'Pediatric checkup', description: '6-month checkup. Growth on track. Vaccines administered.', date: '2025-12-15', status: 'normal' },
    ],
    symptomAssessments: [
      { id: 'sa1', date: '2026-06-05', symptoms: ['Fever', 'Fussiness'], bodyArea: 'general', triageLevel: 'home', result: 'Home Care Recommended', recommendations: ['Give age-appropriate acetaminophen', 'Ensure hydration', 'Monitor temperature'] },
      { id: 'sa2', date: '2026-05-28', symptoms: ['Runny Nose', 'Congestion'], bodyArea: 'head', triageLevel: 'home', result: 'Home Care Recommended', recommendations: ['Saline drops', 'Humidifier', 'Bulb suction'] },
    ],
  },

  // Account 2: Pediatrician/Clinician
  'pediatrician': {
    email: 'dr.chen@demo.com',
    password: 'demo123',
    userRole: 'doctor' as UserRole,
    user: {
      id: 'user_002',
      name: 'Dr. Emily Chen',
      email: 'dr.chen@demo.com',
      phone: '+1-555-0102',
      createdAt: '2024-03-01T10:00:00Z',
    },
    children: [
      {
        id: 'child_003',
        name: 'Lucas',
        dateOfBirth: '2022-09-10',
        gender: 'male',
        weight: 16.8,
        height: 105,
        bloodType: 'B+',
        allergies: ['Penicillin'],
        conditions: ['Asthma'],
        avatar: '👦',
      },
    ],
    activeChildId: 'child_003',
    growthRecords: {
      'child_003': [
        { date: '2022-09-10', weight: 3.5, height: 51 },
        { date: '2023-01-10', weight: 6.2, height: 62 },
        { date: '2023-06-10', weight: 9.1, height: 72 },
        { date: '2024-01-10', weight: 12.5, height: 85 },
        { date: '2024-06-10', weight: 14.2, height: 92 },
        { date: '2025-01-10', weight: 15.8, height: 98 },
        { date: '2026-01-10', weight: 16.8, height: 105 },
      ],
    },
    vaccinations: [
      { id: 'v1', name: 'MMR', dueDate: '2023-09-10', administeredDate: '2023-09-10', status: 'completed' },
      { id: 'v2', name: 'Varicella', dueDate: '2023-09-10', administeredDate: '2023-09-10', status: 'completed' },
      { id: 'v3', name: 'Hepatitis A', dueDate: '2023-12-10', administeredDate: '2023-12-10', status: 'completed', doseNumber: 1, totalDoses: 2 },
      { id: 'v4', name: 'Hepatitis A', dueDate: '2024-06-10', administeredDate: '2024-06-10', status: 'completed', doseNumber: 2, totalDoses: 2 },
      { id: 'v5', name: 'DTaP', dueDate: '2024-09-10', administeredDate: '2024-09-10', status: 'completed', doseNumber: 5, totalDoses: 5 },
      { id: 'v6', name: 'Flu Shot', dueDate: '2025-10-01', administeredDate: '2025-10-05', status: 'completed' },
      { id: 'v7', name: 'Flu Shot', dueDate: '2026-10-01', status: 'upcoming' },
    ],
    milestones: [
      { id: 'm1', title: 'Walks independently', domain: 'motor', dueDate: '2023-03-10', completedDate: '2023-03-05', status: 'completed', description: 'Child can walk without support' },
      { id: 'm2', title: 'Says50+ words', domain: 'language', dueDate: '2023-06-10', completedDate: '2023-06-15', status: 'completed', description: 'Vocabulary explosion phase' },
      { id: 'm3', title: 'Parallel play', domain: 'social', dueDate: '2023-09-10', completedDate: '2023-09-12', status: 'completed', description: 'Plays alongside other children' },
      { id: 'm4', title: 'Tower of 8+ blocks', domain: 'motor', dueDate: '2024-03-10', completedDate: '2024-03-08', status: 'completed', description: 'Fine motor skills developing well' },
      { id: 'm5', title: 'Tells stories', domain: 'language', dueDate: '2024-09-10', completedDate: '2024-09-15', status: 'completed', description: 'Can narrate simple stories' },
      { id: 'm6', title: 'Prints letters', domain: 'cognitive', dueDate: '2025-03-10', status: 'due', description: 'Can write some letters correctly' },
      { id: 'm7', title: 'Rides tricycle', domain: 'motor', dueDate: '2025-09-10', status: 'due', description: 'Can pedal a tricycle' },
    ],
    medications: [
      { id: 'med1', name: 'Albuterol Inhaler', dosage: '2 puffs', frequency: 'As needed', startDate: '2023-12-01', prescribedBy: 'Dr. Sharma', notes: 'For asthma attacks - use with spacer' },
      { id: 'med2', name: 'Fluticasone Inhaler', dosage: '1 puff', frequency: 'Twice daily', startDate: '2024-01-15', prescribedBy: 'Dr. Sharma', notes: 'Daily maintenance for asthma' },
    ],
    healthLog: [
      { id: 'hl1', type: 'symptom', title: 'Asthma flare', description: 'Wheezing after outdoor play, used rescue inhaler', date: '2026-05-20', time: '04:30 PM', status: 'resolved', details: { trigger: 'Outdoor activity', severity: 'mild' } },
      { id: 'hl2', type: 'medicine', title: 'Albuterol administered', description: '2 puffs for wheezing', date: '2026-05-20', time: '04:35 PM', status: 'resolved' },
      { id: 'hl3', type: 'checkup', title: 'Asthma review', description: 'Quarterly asthma check. Well-controlled. Continue current plan.', date: '2026-04-15', status: 'normal' },
      { id: 'hl4', type: 'note', title: 'School physical', description: 'Cleared for kindergarten. Vaccinations up to date.', date: '2026-03-01', status: 'normal' },
    ],
    symptomAssessments: [
      { id: 'sa1', date: '2026-05-20', symptoms: ['Wheezing', 'Cough', 'Difficulty Breathing'], bodyArea: 'chest', triageLevel: 'urgent', result: 'Urgent Care Recommended', recommendations: ['Use rescue inhaler', 'Rest', 'Monitor breathing', 'See doctor within 24 hours'] },
    ],
  },

  // Account 3: First-Time Parent with Toddler
  'first_time_parent': {
    email: 'james@demo.com',
    password: 'demo123',
    userRole: 'parent' as UserRole,
    user: {
      id: 'user_003',
      name: 'James Rodriguez',
      email: 'james@demo.com',
      phone: '+1-555-0103',
      createdAt: '2024-06-20T10:00:00Z',
    },
    children: [
      {
        id: 'child_004',
        name: 'Sofia',
        dateOfBirth: '2024-06-20',
        gender: 'female',
        weight: 11.2,
        height: 78,
        bloodType: 'AB+',
        allergies: [],
        conditions: [],
        avatar: '👧',
      },
    ],
    activeChildId: 'child_004',
    growthRecords: {
      'child_004': [
        { date: '2024-06-20', weight: 3.4, height: 51 },
        { date: '2024-09-20', weight: 6.1, height: 62 },
        { date: '2025-01-20', weight: 8.2, height: 70 },
        { date: '2025-06-20', weight: 9.8, height: 75 },
        { date: '2026-01-20', weight: 11.2, height: 78 },
      ],
    },
    vaccinations: [
      { id: 'v1', name: 'Hepatitis B', dueDate: '2024-06-20', administeredDate: '2024-06-20', status: 'completed', doseNumber: 1, totalDoses: 3 },
      { id: 'v2', name: 'Hepatitis B', dueDate: '2024-07-20', administeredDate: '2024-07-20', status: 'completed', doseNumber: 2, totalDoses: 3 },
      { id: 'v3', name: 'DTaP', dueDate: '2024-08-20', administeredDate: '2024-08-20', status: 'completed', doseNumber: 1, totalDoses: 5 },
      { id: 'v4', name: 'Hib', dueDate: '2024-08-20', administeredDate: '2024-08-20', status: 'completed', doseNumber: 1, totalDoses: 4 },
      { id: 'v5', name: 'Polio (IPV)', dueDate: '2024-08-20', administeredDate: '2024-08-20', status: 'completed', doseNumber: 1, totalDoses: 4 },
      { id: 'v6', name: 'PCV13', dueDate: '2024-08-20', administeredDate: '2024-08-20', status: 'completed', doseNumber: 1, totalDoses: 4 },
      { id: 'v7', name: 'DTaP', dueDate: '2024-10-20', administeredDate: '2024-10-20', status: 'completed', doseNumber: 2, totalDoses: 5 },
      { id: 'v8', name: 'Hib', dueDate: '2024-10-20', administeredDate: '2024-10-20', status: 'completed', doseNumber: 2, totalDoses: 4 },
      { id: 'v9', name: 'PCV13', dueDate: '2024-10-20', administeredDate: '2024-10-20', status: 'completed', doseNumber: 2, totalDoses: 4 },
      { id: 'v10', name: 'Rotavirus', dueDate: '2024-10-20', administeredDate: '2024-10-20', status: 'completed', doseNumber: 2, totalDoses: 3 },
      { id: 'v11', name: 'DTaP', dueDate: '2025-02-20', administeredDate: '2025-02-20', status: 'completed', doseNumber: 3, totalDoses: 5 },
      { id: 'v12', name: 'Hib', dueDate: '2025-02-20', administeredDate: '2025-02-20', status: 'completed', doseNumber: 3, totalDoses: 4 },
      { id: 'v13', name: 'Polio (IPV)', dueDate: '2025-02-20', administeredDate: '2025-02-20', status: 'completed', doseNumber: 2, totalDoses: 4 },
      { id: 'v14', name: 'PCV13', dueDate: '2025-02-20', administeredDate: '2025-02-20', status: 'completed', doseNumber: 3, totalDoses: 4 },
      { id: 'v15', name: 'DTaP', dueDate: '2025-06-20', status: 'due' },
      { id: 'v16', name: 'Hib', dueDate: '2025-06-20', status: 'due' },
      { id: 'v17', name: 'Polio (IPV)', dueDate: '2025-06-20', status: 'due' },
      { id: 'v18', name: 'PCV13', dueDate: '2025-06-20', status: 'due' },
    ],
    milestones: [
      { id: 'm1', title: 'Lifts head', domain: 'motor', dueDate: '2024-08-20', completedDate: '2024-08-15', status: 'completed', description: 'Can hold head up when on tummy' },
      { id: 'm2', title: 'Social smile', domain: 'social', dueDate: '2024-08-20', completedDate: '2024-08-25', status: 'completed', description: 'Smiles at familiar faces' },
      { id: 'm3', title: 'Rolls over', domain: 'motor', dueDate: '2024-10-20', completedDate: '2024-10-18', status: 'completed', description: 'Can roll both directions' },
      { id: 'm4', title: 'Sits without support', domain: 'motor', dueDate: '2025-02-20', completedDate: '2025-02-15', status: 'completed', description: 'Sits steadily alone' },
      { id: 'm5', title: 'Crawls', domain: 'motor', dueDate: '2025-06-20', completedDate: '2025-06-25', status: 'completed', description: 'Propels forward on hands and knees' },
      { id: 'm6', title: 'Pulls to stand', domain: 'motor', dueDate: '2025-10-20', status: 'due', description: 'Pulls up using furniture' },
      { id: 'm7', title: 'First steps', domain: 'motor', dueDate: '2026-02-20', status: 'due', description: 'Walks independently' },
      { id: 'm8', title: 'First word', domain: 'language', dueDate: '2026-02-20', status: 'due', description: 'Says meaningful word like mama or dada' },
    ],
    medications: [
      { id: 'med1', name: 'Vitamin D3', dosage: '400 IU', frequency: 'Daily', startDate: '2024-06-20', prescribedBy: 'Dr. Williams', notes: 'For bone health' },
    ],
    healthLog: [
      { id: 'hl1', type: 'note', title: 'First tooth!', description: 'Bottom right incisor erupted', date: '2025-10-15', status: 'normal' },
      { id: 'hl2', type: 'checkup', title: '9-month checkup', description: 'Development on track. Growing well. Next visit at 12 months.', date: '2025-03-20', status: 'normal' },
      { id: 'hl3', type: 'symptom', title: 'Ear infection', description: 'Fever101°F, pulling at ear, fussy', date: '2025-11-10', time: '08:00 PM', status: 'resolved' },
      { id: 'hl4', type: 'medicine', title: 'Amoxicillin', description: 'Antibiotic prescribed by Dr. Chen', date: '2025-11-10', time: '09:00 PM', status: 'resolved' },
    ],
    symptomAssessments: [
      { id: 'sa1', date: '2025-11-10', symptoms: ['Ear Pain', 'Fever', 'Fussiness'], bodyArea: 'head', triageLevel: 'urgent', result: 'Urgent Care Recommended', recommendations: ['See pediatrician within 24 hours', 'Keep child comfortable', 'Monitor fever'] },
    ],
  },

  // Account 4: Parent of Child with ADHD
  'adhd_parent': {
    email: 'maria@demo.com',
    password: 'demo123',
    userRole: 'parent' as UserRole,
    user: {
      id: 'user_004',
      name: 'Maria Thompson',
      email: 'maria@demo.com',
      phone: '+1-555-0104',
      createdAt: '2023-09-01T10:00:00Z',
    },
    children: [
      {
        id: 'child_005',
        name: 'Ethan',
        dateOfBirth: '2019-03-15',
        gender: 'male',
        weight: 22.5,
        height: 118,
        bloodType: 'O-',
        allergies: ['Dust', 'Pet dander'],
        conditions: ['ADHD', 'Anxiety'],
        avatar: '👦',
      },
    ],
    activeChildId: 'child_005',
    growthRecords: {
      'child_005': [
        { date: '2019-03-15', weight: 3.6, height: 52 },
        { date: '2020-03-15', weight: 12.5, height: 82 },
        { date: '2021-03-15', weight: 16.2, height: 95 },
        { date: '2022-03-15', weight: 18.8, height: 102 },
        { date: '2023-03-15', weight: 20.5, height: 108 },
        { date: '2024-03-15', weight: 21.8, height: 113 },
        { date: '2025-03-15', weight: 22.5, height: 118 },
      ],
    },
    vaccinations: [
      { id: 'v1', name: 'MMR', dueDate: '2020-03-15', administeredDate: '2020-03-15', status: 'completed' },
      { id: 'v2', name: 'Varicella', dueDate: '2020-03-15', administeredDate: '2020-03-15', status: 'completed' },
      { id: 'v3', name: 'DTaP', dueDate: '2020-03-15', administeredDate: '2020-03-15', status: 'completed', doseNumber: 5, totalDoses: 5 },
      { id: 'v4', name: 'Flu Shot', dueDate: '2025-10-01', administeredDate: '2025-10-03', status: 'completed' },
      { id: 'v5', name: 'Flu Shot', dueDate: '2026-10-01', status: 'upcoming' },
    ],
    milestones: [
      { id: 'm1', title: 'Rides bike', domain: 'motor', dueDate: '2021-09-15', completedDate: '2021-09-20', status: 'completed', description: 'Can ride bike with training wheels' },
      { id: 'm2', title: 'Reads simple words', domain: 'language', dueDate: '2022-03-15', completedDate: '2022-03-10', status: 'completed', description: 'Can read CVC words' },
      { id: 'm3', title: 'Ties shoes', domain: 'motor', dueDate: '2023-03-15', completedDate: '2023-03-20', status: 'completed', description: 'Can tie shoelaces independently' },
      { id: 'm4', title: 'Chapter books', domain: 'cognitive', dueDate: '2024-03-15', completedDate: '2024-03-18', status: 'completed', description: 'Reads chapter books independently' },
      { id: 'm5', title: 'Sports team', domain: 'social', dueDate: '2025-03-15', completedDate: '2025-03-22', status: 'completed', description: 'Joined soccer team' },
      { id: 'm6', title: 'Homework independence', domain: 'cognitive', dueDate: '2026-03-15', status: 'due', description: 'Completes homework with minimal supervision' },
    ],
    medications: [
      { id: 'med1', name: 'Methylphenidate (Ritalin)', dosage: '10mg', frequency: 'Daily morning', startDate: '2024-01-15', prescribedBy: 'Dr. Harrison', notes: 'For ADHD - helps with focus at school' },
      { id: 'med2', name: 'Sertraline (Zoloft)', dosage: '25mg', frequency: 'Daily', startDate: '2024-06-01', prescribedBy: 'Dr. Harrison', notes: 'For anxiety management' },
    ],
    healthLog: [
      { id: 'hl1', type: 'note', title: 'ADHD diagnosis', description: 'Diagnosed with ADHD, combined type. Starting medication trial.', date: '2024-01-10', status: 'normal' },
      { id: 'hl2', type: 'medicine', title: 'Medication started', description: 'Started Ritalin 5mg daily', date: '2024-01-15', status: 'normal' },
      { id: 'hl3', type: 'checkup', title: 'ADHD quarterly review', description: 'Medication working well. Teacher reports improvement. No side effects.', date: '2026-04-01', status: 'normal' },
      { id: 'hl4', type: 'symptom', title: 'Anxiety spike', description: 'Increased worry about school, difficulty sleeping', date: '2026-05-15', status: 'resolved' },
    ],
    symptomAssessments: [
      { id: 'sa1', date: '2026-05-15', symptoms: ['Anxiety', 'Sleep Issues', 'Irritability'], bodyArea: 'general', triageLevel: 'home', result: 'Home Care Recommended', recommendations: ['Talk about feelings', 'Establish bedtime routine', 'Consider therapy', 'Monitor for worsening'] },
    ],
  },

  // Account 5: Healthcare System Admin
  'healthcare_admin': {
    email: 'admin@pediatric-clinic.com',
    password: 'demo123',
    userRole: 'clinic_admin' as UserRole,
    user: {
      id: 'user_005',
      name: 'Dr. Robert Kim',
      email: 'admin@pediatric-clinic.com',
      phone: '+1-555-0105',
      createdAt: '2023-01-01T10:00:00Z',
    },
    children: [
      {
        id: 'child_006',
        name: 'Mia',
        dateOfBirth: '2021-11-05',
        gender: 'female',
        weight: 15.8,
        height: 95,
        bloodType: 'A-',
        allergies: ['Eggs'],
        conditions: ['Eczema'],
        avatar: '👧',
      },
    ],
    activeChildId: 'child_006',
    growthRecords: {
      'child_006': [
        { date: '2021-11-05', weight: 3.2, height: 50 },
        { date: '2022-05-05', weight: 7.5, height: 65 },
        { date: '2022-11-05', weight: 10.2, height: 75 },
        { date: '2023-05-05', weight: 12.8, height: 82 },
        { date: '2023-11-05', weight: 14.2, height: 88 },
        { date: '2024-05-05', weight: 15.2, height: 92 },
        { date: '2025-05-05', weight: 15.8, height: 95 },
      ],
    },
    vaccinations: [
      { id: 'v1', name: 'MMR', dueDate: '2022-11-05', administeredDate: '2022-11-05', status: 'completed' },
      { id: 'v2', name: 'Varicella', dueDate: '2022-11-05', administeredDate: '2022-11-05', status: 'completed' },
      { id: 'v3', name: 'DTaP', dueDate: '2022-11-05', administeredDate: '2022-11-05', status: 'completed', doseNumber: 5, totalDoses: 5 },
      { id: 'v4', name: 'Flu Shot', dueDate: '2025-10-01', administeredDate: '2025-10-05', status: 'completed' },
      { id: 'v5', name: 'Flu Shot', dueDate: '2026-10-01', status: 'upcoming' },
    ],
    milestones: [
      { id: 'm1', title: 'Walks independently', domain: 'motor', dueDate: '2022-05-05', completedDate: '2022-05-10', status: 'completed', description: 'Walking well without support' },
      { id: 'm2', title: 'First words', domain: 'language', dueDate: '2022-08-05', completedDate: '2022-08-12', status: 'completed', description: 'Says mama, dada, and a few other words' },
      { id: 'm3', title: 'Potty trained', domain: 'cognitive', dueDate: '2023-03-05', completedDate: '2023-03-10', status: 'completed', description: 'Uses potty independently day and night' },
      { id: 'm4', title: 'Tells stories', domain: 'language', dueDate: '2023-11-05', completedDate: '2023-11-08', status: 'completed', description: 'Narrates detailed stories' },
      { id: 'm5', title: 'Knows letters', domain: 'cognitive', dueDate: '2024-05-05', completedDate: '2024-05-10', status: 'completed', description: 'Recognizes all letters and some words' },
      { id: 'm6', title: 'Social friends', domain: 'social', dueDate: '2025-05-05', completedDate: '2025-05-08', status: 'completed', description: 'Has close friends at preschool' },
    ],
    medications: [
      { id: 'med1', name: 'Hydrocortisone Cream', dosage: 'Apply thin layer', frequency: 'Twice daily', startDate: '2022-03-01', prescribedBy: 'Dr. Lee', notes: 'For eczema flare-ups' },
      { id: 'med2', name: 'Cetirizine (Zyrtec)', dosage: '2.5ml', frequency: 'Daily as needed', startDate: '2022-06-01', prescribedBy: 'Dr. Lee', notes: 'For allergy-related eczema itching' },
    ],
    healthLog: [
      { id: 'hl1', type: 'note', title: 'Eczema diagnosis', description: 'Diagnosed with mild-moderate atopic dermatitis. Start skincare routine.', date: '2022-03-01', status: 'normal' },
      { id: 'hl2', type: 'symptom', title: 'Eczema flare', description: 'Red, itchy patches on cheeks and arms. Trigger: new laundry detergent.', date: '2026-05-25', status: 'resolved' },
      { id: 'hl3', type: 'note', title: 'Food trial', description: 'Starting egg elimination trial to identify eczema triggers.', date: '2026-05-01', status: 'normal' },
      { id: 'hl4', type: 'checkup', title: 'Annual physical', description: 'Growth normal. Eczema well-controlled. Development on track.', date: '2026-02-15', status: 'normal' },
    ],
    symptomAssessments: [
      { id: 'sa1', date: '2026-05-25', symptoms: ['Rash', 'Itching', 'Skin Redness'], bodyArea: 'skin', triageLevel: 'home', result: 'Home Care Recommended', recommendations: ['Apply moisturizer frequently', 'Use prescribed hydrocortisone', 'Avoid triggers', 'See dermatologist if not improving'] },
    ],
  },

  // Account 6: Pediatric Nurse
  'pediatric_nurse': {
    email: 'nurse.jones@demo.com',
    password: 'demo123',
    userRole: 'nurse' as UserRole,
    user: {
      id: 'user_006',
      name: 'Jessica Jones',
      email: 'nurse.jones@demo.com',
      phone: '+1-555-0106',
      createdAt: '2023-06-15T10:00:00Z',
    },
    children: [
      {
        id: 'child_007',
        name: 'Noah',
        dateOfBirth: '2023-08-20',
        gender: 'male',
        weight: 14.2,
        height: 88,
        bloodType: 'O+',
        allergies: [],
        conditions: [],
        avatar: '👦',
      },
    ],
    activeChildId: 'child_007',
    growthRecords: {
      'child_007': [
        { date: '2023-08-20', weight: 3.8, height: 52 },
        { date: '2023-12-20', weight: 7.5, height: 65 },
        { date: '2024-04-20', weight: 10.2, height: 75 },
        { date: '2024-08-20', weight: 12.0, height: 82 },
        { date: '2025-02-20', weight: 13.5, height: 86 },
        { date: '2026-02-20', weight: 14.2, height: 88 },
      ],
    },
    vaccinations: [
      { id: 'v1', name: 'MMR', dueDate: '2024-08-20', administeredDate: '2024-08-20', status: 'completed' },
      { id: 'v2', name: 'Varicella', dueDate: '2024-08-20', administeredDate: '2024-08-20', status: 'completed' },
      { id: 'v3', name: 'Hepatitis A', dueDate: '2024-08-20', administeredDate: '2024-08-20', status: 'completed', doseNumber: 1, totalDoses: 2 },
      { id: 'v4', name: 'Hepatitis A', dueDate: '2025-02-20', administeredDate: '2025-02-20', status: 'completed', doseNumber: 2, totalDoses: 2 },
      { id: 'v5', name: 'Flu Shot', dueDate: '2025-10-01', administeredDate: '2025-10-05', status: 'completed' },
      { id: 'v6', name: 'DTaP', dueDate: '2026-02-20', administeredDate: '2026-02-20', status: 'completed', doseNumber: 5, totalDoses: 5 },
    ],
    milestones: [
      { id: 'm1', title: 'First steps', domain: 'motor', dueDate: '2024-06-20', completedDate: '2024-06-15', status: 'completed', description: 'Walking independently' },
      { id: 'm2', title: 'First words', domain: 'language', dueDate: '2024-04-20', completedDate: '2024-04-25', status: 'completed', description: 'Says mama, dada, ball' },
      { id: 'm3', title: 'Runs', domain: 'motor', dueDate: '2024-10-20', completedDate: '2024-10-18', status: 'completed', description: 'Running with coordination' },
      { id: 'm4', title: 'Puts sentences together', domain: 'language', dueDate: '2025-02-20', completedDate: '2025-02-25', status: 'completed', description: 'Speaks in 3-4 word sentences' },
    ],
    medications: [
      { id: 'med1', name: 'None', dosage: '', frequency: '', startDate: '2023-08-20', notes: 'No medications' },
    ],
    healthLog: [
      { id: 'hl1', type: 'checkup', title: 'Annual physical', description: '2-year checkup. Development normal. Growth on track.', date: '2026-02-20', status: 'normal' },
      { id: 'hl2', type: 'note', title: 'Surgery - ear tubes', description: 'PET tubes placed for recurrent ear infections', date: '2025-08-15', status: 'resolved' },
    ],
    symptomAssessments: [],
  },

  // Account 7: Platform Administrator
  'platform_admin': {
    email: 'superadmin@demo.com',
    password: 'demo123',
    userRole: 'platform_admin' as UserRole,
    user: {
      id: 'user_007',
      name: 'Alex Thompson',
      email: 'superadmin@demo.com',
      phone: '+1-555-0107',
      createdAt: '2022-01-01T10:00:00Z',
    },
    children: [],
    activeChildId: '',
    growthRecords: {},
    vaccinations: [],
    milestones: [],
    medications: [],
    healthLog: [],
    symptomAssessments: [],
  },
};

// Demo credentials for easy reference
export const DEMO_CREDENTIALS = [
  {
    email: 'anxious@demo.com',
    password: 'demo123',
    description: 'High-Anxiety Parent (2 children: infant + toddler)',
    icon: '😰',
  },
  {
    email: 'dr.chen@demo.com',
    password: 'demo123',
    description: 'Pediatrician/Clinician (child with asthma)',
    icon: '👩‍⚕️',
  },
  {
    email: 'james@demo.com',
    password: 'demo123',
    description: 'First-Time Parent (newborn)',
    icon: '👨',
  },
  {
    email: 'maria@demo.com',
    password: 'demo123',
    description: 'Parent of Child with ADHD',
    icon: '👩',
  },
  {
    email: 'admin@pediatric-clinic.com',
    password: 'demo123',
    description: 'Healthcare System Admin (child with eczema)',
    icon: '👨‍💼',
  },
  {
    email: 'nurse.jones@demo.com',
    password: 'demo123',
    description: 'Pediatric Nurse (vitals & vaccinations)',
    icon: '👩‍⚕️',
  },
  {
    email: 'superadmin@demo.com',
    password: 'demo123',
    description: 'Platform Administrator (full system access)',
    icon: '🔐',
  },
];

// API helper functions
export const DEMO_ACCOUNTS_LIST = Object.values(DEMO_ACCOUNTS);
