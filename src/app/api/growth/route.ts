import { NextResponse } from 'next/server';

// Demo growth data
const GROWTH_DATA = [
  { childId: 'child_001', date: '2024-01-08', height: 50, weight: 4.2, headCircumference: 35 },
  { childId: 'child_001', date: '2024-02-15', height: 54, weight: 5.1, headCircumference: 37 },
  { childId: 'child_001', date: '2024-04-01', height: 58, weight: 6.0, headCircumference: 39 },
  { childId: 'child_001', date: '2024-06-01', height: 63, weight: 7.2, headCircumference: 41 },
  { childId: 'child_001', date: '2024-09-01', height: 70, weight: 8.5, headCircumference: 43 },
  { childId: 'child_001', date: '2025-01-01', height: 78, weight: 10.2, headCircumference: 45 },
  { childId: 'child_001', date: '2025-05-01', height: 92, weight: 14.5, headCircumference: 47 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const childId = searchParams.get('childId');

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const growthData = childId
    ? GROWTH_DATA.filter((g) => g.childId === childId)
    : GROWTH_DATA;

  return NextResponse.json({ growthData });
}
