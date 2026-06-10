import { NextResponse } from 'next/server';

// Demo milestones data
const MILESTONES = [
  {
    id: 'm1',
    childId: 'child_001',
    category: 'gross_motor',
    title: 'Walks independently',
    expectedAge: '12-15 months',
    status: 'achieved',
    achievedDate: '2023-02-15',
  },
  {
    id: 'm2',
    childId: 'child_001',
    category: 'fine_motor',
    title: 'Stacks 2 blocks',
    expectedAge: '12-15 months',
    status: 'achieved',
    achievedDate: '2023-03-01',
  },
  {
    id: 'm3',
    childId: 'child_001',
    category: 'language',
    title: 'Says 3-5 words',
    expectedAge: '12-15 months',
    status: 'achieved',
    achievedDate: '2023-04-10',
  },
  {
    id: 'm4',
    childId: 'child_001',
    category: 'social',
    title: 'Waves bye-bye',
    expectedAge: '9-12 months',
    status: 'achieved',
    achievedDate: '2023-01-20',
  },
  {
    id: 'm5',
    childId: 'child_001',
    category: 'gross_motor',
    title: 'Runs well',
    expectedAge: '18-24 months',
    status: 'in_progress',
  },
  {
    id: 'm6',
    childId: 'child_001',
    category: 'language',
    title: 'Says 50+ words',
    expectedAge: '18-24 months',
    status: 'in_progress',
  },
  {
    id: 'm7',
    childId: 'child_001',
    category: 'cognitive',
    title: 'Parallel play',
    expectedAge: '24-30 months',
    status: 'upcoming',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const childId = searchParams.get('childId');
  const category = searchParams.get('category');

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 250));

  let milestones = childId
    ? MILESTONES.filter((m) => m.childId === childId)
    : MILESTONES;

  if (category) {
    milestones = milestones.filter((m) => m.category === category);
  }

  return NextResponse.json({ milestones });
}
