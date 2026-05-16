import { NextResponse } from 'next/server';

// Demo vaccination schedule
const VACCINATIONS = [
  { id: 'v1', name: 'BCG', dueDate: '2024-01-08', status: 'completed', childId: 'child_001' },
  { id: 'v2', name: 'Hepatitis B (1st dose)', dueDate: '2024-01-08', status: 'completed', childId: 'child_001' },
  { id: 'v3', name: 'Hepatitis B (2nd dose)', dueDate: '2024-02-15', status: 'completed', childId: 'child_001' },
  { id: 'v4', name: 'DTaP (1st dose)', dueDate: '2024-03-15', status: 'completed', childId: 'child_001' },
  { id: 'v5', name: 'Hib (1st dose)', dueDate: '2024-03-15', status: 'completed', childId: 'child_001' },
  { id: 'v6', name: 'IPV (1st dose)', dueDate: '2024-03-15', status: 'completed', childId: 'child_001' },
  { id: 'v7', name: 'PCV (1st dose)', dueDate: '2024-03-15', status: 'completed', childId: 'child_001' },
  { id: 'v8', name: 'RV (1st dose)', dueDate: '2024-03-15', status: 'completed', childId: 'child_001' },
  { id: 'v9', name: 'MMR (1st dose)', dueDate: '2025-03-15', status: 'upcoming', childId: 'child_001' },
  { id: 'v10', name: 'Varicella (1st dose)', dueDate: '2025-03-15', status: 'upcoming', childId: 'child_001' },
  { id: 'v11', name: 'Hepatitis A (1st dose)', dueDate: '2025-03-15', status: 'upcoming', childId: 'child_001' },
  { id: 'v12', name: 'DTaP (2nd dose)', dueDate: '2025-04-15', status: 'upcoming', childId: 'child_001' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const childId = searchParams.get('childId');

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const vaccinations = childId
    ? VACCINATIONS.filter((v) => v.childId === childId)
    : VACCINATIONS;

  return NextResponse.json({ vaccinations });
}
