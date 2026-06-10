import { NextResponse } from 'next/server';

// Demo medications data
const MEDICATIONS = [
  {
    id: 'med_001',
    name: 'Amoxicillin',
    dosage: '250mg/5ml',
    frequency: '3 times daily',
    prescribedFor: 'Ear Infection',
    prescribedBy: 'Dr. Michael Chen',
    startDate: '2026-05-01',
    endDate: '2026-05-11',
    instructions: 'Shake well before use. Give with food.',
    refillsRemaining: 0,
    childId: 'child_001',
  },
  {
    id: 'med_002',
    name: 'Acetaminophen',
    dosage: '160mg/5ml',
    frequency: 'As needed',
    prescribedFor: 'Fever/Pain',
    prescribedBy: 'Dr. Michael Chen',
    startDate: '2026-04-15',
    instructions: 'Do not exceed 5 doses in 24 hours.',
    refillsRemaining: 2,
    childId: 'child_001',
  },
  {
    id: 'med_003',
    name: 'Vitamin D3',
    dosage: '400 IU',
    frequency: 'Once daily',
    prescribedFor: 'Supplement',
    prescribedBy: 'Dr. Michael Chen',
    startDate: '2024-02-01',
    instructions: 'Give with food.',
    refillsRemaining: 11,
    childId: 'child_001',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const childId = searchParams.get('childId');

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const medications = childId
    ? MEDICATIONS.filter((m) => m.childId === childId)
    : MEDICATIONS;

  return NextResponse.json({ medications });
}
