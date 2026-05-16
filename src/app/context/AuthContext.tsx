'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, AuthState, LoginCredentials, UserRole, Child } from '@/app/types/auth';

// Demo users
const DEMO_USERS: Record<string, { user: User; password: string }> = {
  'parent@pedi-ai.com': {
    password: 'demo123',
    user: {
      id: 'usr_parent_001',
      email: 'parent@pedi-ai.com',
      name: 'Sarah Johnson',
      role: 'parent',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      children: [
        {
          id: 'child_001',
          name: 'Emma',
          dateOfBirth: '2022-03-15',
          gender: 'female',
          weight: 14.5,
          height: 92,
        },
        {
          id: 'child_002',
          name: 'Oliver',
          dateOfBirth: '2024-01-08',
          gender: 'male',
          weight: 10.2,
          height: 75,
        },
      ],
    },
  },
  'doctor@pedi-ai.com': {
    password: 'demo123',
    user: {
      id: 'usr_doctor_001',
      email: 'doctor@pedi-ai.com',
      name: 'Dr. Michael Chen',
      role: 'doctor',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop',
      specialty: 'General Pediatrics',
      licenseNumber: 'MD-2024-12345',
    },
  },
  'admin@pedi-ai.com': {
    password: 'demo123',
    user: {
      id: 'usr_admin_001',
      email: 'admin@pedi-ai.com',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
  },
};

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchChild: (childId: string) => void;
  selectedChild: Child | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const stored = localStorage.getItem('pedi_ai_user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        if (user.role === 'parent' && user.children?.length > 0) {
          setSelectedChild(user.children[0]);
        }
      } catch {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const demoUser = DEMO_USERS[credentials.email.toLowerCase()];

    if (!demoUser || demoUser.password !== credentials.password) {
      return { success: false, error: 'Invalid email or password' };
    }

    const user = demoUser.user;

    // Store in localStorage
    localStorage.setItem('pedi_ai_user', JSON.stringify(user));

    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });

    if (user.role === 'parent' && user.children?.length > 0) {
      setSelectedChild(user.children[0]);
    }

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('pedi_ai_user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    setSelectedChild(null);
  }, []);

  const switchChild = useCallback((childId: string) => {
    const child = state.user?.children?.find((c) => c.id === childId);
    if (child) {
      setSelectedChild(child);
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, switchChild, selectedChild }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper to check role
export function hasRole(user: User | null, role: UserRole): boolean {
  return user?.role === role;
}

// Demo credentials helper
export const DEMO_CREDENTIALS = {
  parent: {
    email: 'parent@pedi-ai.com',
    password: 'demo123',
    label: 'Parent Demo',
  },
  doctor: {
    email: 'doctor@pedi-ai.com',
    password: 'demo123',
    label: 'Doctor Demo',
  },
  admin: {
    email: 'admin@pedi-ai.com',
    password: 'demo123',
    label: 'Admin Demo',
  },
};
