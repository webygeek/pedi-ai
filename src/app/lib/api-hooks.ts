// API Hooks - Simulates backend API endpoints using demo data

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './auth-context';
import { DEMO_ACCOUNTS_LIST } from './demo-data';
import {
  GrowthRecord,
  VaccinationRecord,
  MilestoneRecord,
  MedicationRecord,
  HealthLogEntry,
  SymptomAssessment,
} from '@/app/types/auth';

// Simulate API delay
const simulateDelay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get current account from session (non-hook utility)
export function getAccountByUserId(userId: string) {
  return DEMO_ACCOUNTS_LIST.find(acc => acc.user.id === userId) || null;
}

// ============================================
// GROWTH API HOOKS
// ============================================

export function useGrowthRecords(childId: string) {
  const { session } = useAuth();
  const [records, setRecords] = useState<GrowthRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!session) {
        setRecords([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();

        const account = DEMO_ACCOUNTS_LIST.find(acc => acc.user.id === session.user.id);
        if (account && account.growthRecords[childId]) {
          setRecords(account.growthRecords[childId]);
        } else {
          setRecords([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch growth records');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [session, childId]);

  const addRecord = useCallback(async (record: GrowthRecord) => {
    await simulateDelay(200);
    setRecords(prev => [...prev, record].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    ));
  }, []);

  return { records, isLoading, error, addRecord };
}

// ============================================
// VACCINATION API HOOKS
// ============================================

export function useVaccinations() {
  const { session } = useAuth();
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVaccinations = async () => {
      if (!session) {
        setVaccinations([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();

        const account = DEMO_ACCOUNTS_LIST.find(acc => acc.user.id === session.user.id);
        if (account) {
          setVaccinations(account.vaccinations);
        } else {
          setVaccinations([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch vaccinations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVaccinations();
  }, [session]);

  const markComplete = useCallback(async (vaccineId: string, date: string) => {
    await simulateDelay(200);
    setVaccinations(prev =>
      prev.map(v =>
        v.id === vaccineId
          ? { ...v, status: 'completed' as const, administeredDate: date }
          : v
      )
    );
  }, []);

  const getUpcoming = useCallback(() => {
    return vaccinations.filter(v => v.status === 'due' || v.status === 'upcoming');
  }, [vaccinations]);

  const getOverdue = useCallback(() => {
    return vaccinations.filter(v => v.status === 'overdue');
  }, [vaccinations]);

  return { vaccinations, isLoading, error, markComplete, getUpcoming, getOverdue };
}

// ============================================
// MILESTONES API HOOKS
// ============================================

export function useMilestones() {
  const { session } = useAuth();
  const [milestones, setMilestones] = useState<MilestoneRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMilestones = async () => {
      if (!session) {
        setMilestones([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();

        const account = DEMO_ACCOUNTS_LIST.find(acc => acc.user.id === session.user.id);
        if (account) {
          setMilestones(account.milestones);
        } else {
          setMilestones([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch milestones');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMilestones();
  }, [session]);

  const markComplete = useCallback(async (milestoneId: string, date: string) => {
    await simulateDelay(200);
    setMilestones(prev =>
      prev.map(m =>
        m.id === milestoneId
          ? { ...m, status: 'completed' as const, completedDate: date }
          : m
      )
    );
  }, []);

  const getByDomain = useCallback((domain: MilestoneRecord['domain']) => {
    return milestones.filter(m => m.domain === domain);
  }, [milestones]);

  const getDue = useCallback(() => {
    return milestones.filter(m => m.status === 'due');
  }, [milestones]);

  return { milestones, isLoading, error, markComplete, getByDomain, getDue };
}

// ============================================
// MEDICATIONS API HOOKS
// ============================================

export function useMedications() {
  const { session } = useAuth();
  const [medications, setMedications] = useState<MedicationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedications = async () => {
      if (!session) {
        setMedications([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();

        const account = DEMO_ACCOUNTS_LIST.find(acc => acc.user.id === session.user.id);
        if (account) {
          setMedications(account.medications);
        } else {
          setMedications([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch medications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedications();
  }, [session]);

  const addMedication = useCallback(async (medication: MedicationRecord) => {
    await simulateDelay(200);
    setMedications(prev => [...prev, medication]);
  }, []);

  const removeMedication = useCallback(async (medicationId: string) => {
    await simulateDelay(200);
    setMedications(prev => prev.filter(m => m.id !== medicationId));
  }, []);

  return { medications, isLoading, error, addMedication, removeMedication };
}

// ============================================
// HEALTH LOG API HOOKS
// ============================================

export function useHealthLog() {
  const { session } = useAuth();
  const [entries, setEntries] = useState<HealthLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthLog = async () => {
      if (!session) {
        setEntries([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();

        const account = DEMO_ACCOUNTS_LIST.find(acc => acc.user.id === session.user.id);
        if (account) {
          setEntries(account.healthLog);
        } else {
          setEntries([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch health log');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHealthLog();
  }, [session]);

  const addEntry = useCallback(async (entry: HealthLogEntry) => {
    await simulateDelay(200);
    setEntries(prev => [entry, ...prev]);
  }, []);

  const getRecent = useCallback((limit: number = 5) => {
    return entries.slice(0, limit);
  }, [entries]);

  const getByType = useCallback((type: HealthLogEntry['type']) => {
    return entries.filter(e => e.type === type);
  }, [entries]);

  return { entries, isLoading, error, addEntry, getRecent, getByType };
}

// ============================================
// SYMPTOM ASSESSMENT API HOOKS
// ============================================

export function useSymptomAssessments() {
  const { session } = useAuth();
  const [assessments, setAssessments] = useState<SymptomAssessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!session) {
        setAssessments([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();

        const account = DEMO_ACCOUNTS_LIST.find(acc => acc.user.id === session.user.id);
        if (account) {
          setAssessments(account.symptomAssessments);
        } else {
          setAssessments([]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch assessments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessments();
  }, [session]);

  const saveAssessment = useCallback(async (assessment: SymptomAssessment) => {
    await simulateDelay(200);
    setAssessments(prev => [assessment, ...prev]);
  }, []);

  const getRecent = useCallback((limit: number = 5) => {
    return assessments.slice(0, limit);
  }, [assessments]);

  return { assessments, isLoading, error, saveAssessment, getRecent };
}

// ============================================
// CHILD PROFILE API HOOKS
// ============================================

export function useChildProfile(childId: string) {
  const { session } = useAuth();
  const [child, setChild] = useState<typeof session extends null ? null : NonNullable<typeof session>['children'][0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChild = async () => {
      if (!session) {
        setChild(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await simulateDelay();

        const foundChild = session.children.find(c => c.id === childId);
        setChild(foundChild || null);
        setError(foundChild ? null : 'Child not found');
      } catch (err) {
        setError('Failed to fetch child profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChild();
  }, [session, childId]);

  return { child, isLoading, error };
}

// ============================================
// DOSAGE CALCULATOR API
// ============================================

export interface DosageResult {
  medication: string;
  dose: number;
  unit: string;
  frequency: string;
  maxDose: number;
  warnings: string[];
  instructions: string[];
}

const MEDICATION_DATABASE = {
  acetaminophen: {
    name: 'Acetaminophen (Tylenol)',
    concentration: [
      { label: 'Infant drops (80mg/0.8ml)', dosePerMl: 100 },
      { label: 'Children\'s liquid (160mg/5ml)', dosePerMl: 32 },
    ],
    maxDose: 75, // mg per kg per day
    dosingInterval: '4-6 hours',
    warnings: [
      'Do not exceed maximum daily dose',
      'Avoid with alcohol',
      'Check other medications for hidden acetaminophen',
    ],
  },
  ibuprofen: {
    name: 'Ibuprofen (Advil/Motrin)',
    concentration: [
      { label: 'Infant drops (50mg/1.25ml)', dosePerMl: 40 },
      { label: 'Children\'s liquid (100mg/5ml)', dosePerMl: 20 },
    ],
    maxDose: 40, // mg per kg per day
    dosingInterval: '6-8 hours',
    warnings: [
      'Take with food to reduce stomach upset',
      'Do not use in children under 6 months',
      'Avoid with aspirin or other NSAIDs',
    ],
  },
};

export function calculateDosage(
  medication: string,
  weightKg: number,
  concentration: string
): DosageResult | null {
  const med = MEDICATION_DATABASE[medication as keyof typeof MEDICATION_DATABASE];
  if (!med) return null;

  const conc = med.concentration.find(c => c.label === concentration);
  if (!conc) return null;

  const maxDose = weightKg * med.maxDose;
  const singleDose = weightKg * 15; // Standard starting dose is 15mg/kg
  const volumeNeeded = singleDose / conc.dosePerMl;

  return {
    medication: med.name,
    dose: Math.round(volumeNeeded * 10) / 10,
    unit: 'ml',
    frequency: med.dosingInterval,
    maxDose: Math.round(maxDose * 10) / 10,
    warnings: med.warnings,
    instructions: [
      `Give ${Math.round(volumeNeeded * 10) / 10}ml of ${concentration}`,
      `Maximum: ${Math.round(maxDose)}mg per day`,
      `Repeat every ${med.dosingInterval}`,
    ],
  };
}

export { MEDICATION_DATABASE };