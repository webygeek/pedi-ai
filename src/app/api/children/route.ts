import { NextResponse } from 'next/server';

// Demo children data
const CHILDREN_DATA = [
  {
    id: 'child_001',
    name: 'Emma',
    dateOfBirth: '2022-03-15',
    gender: 'female',
    weight: 14.5,
    height: 92,
    parentId: 'usr_parent_001',
  },
  {
    id: 'child_002',
    name: 'Oliver',
    dateOfBirth: '2024-01-08',
    gender: 'male',
    weight: 10.2,
    height: 75,
    parentId: 'usr_parent_001',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parentId = searchParams.get('parentId');

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const children = parentId
    ? CHILDREN_DATA.filter((c) => c.parentId === parentId)
    : CHILDREN_DATA;

  return NextResponse.json({ children });
}
