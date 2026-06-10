import { NextResponse } from 'next/server';

// Demo users database (same as client-side)
const DEMO_USERS: Record<string, { password: string; role: string; name: string }> = {
  'parent@pedi-ai.com': {
    password: 'demo123',
    role: 'parent',
    name: 'Sarah Johnson',
  },
  'doctor@pedi-ai.com': {
    password: 'demo123',
    role: 'doctor',
    name: 'Dr. Michael Chen',
  },
  'admin@pedi-ai.com': {
    password: 'demo123',
    role: 'admin',
    name: 'Admin User',
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = DEMO_USERS[email?.toLowerCase()];

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // In production, this would return a JWT token
    const token = Buffer.from(JSON.stringify({ email, role: user.role, exp: Date.now() + 86400000 })).toString('base64');

    return NextResponse.json({
      success: true,
      user: {
        email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
