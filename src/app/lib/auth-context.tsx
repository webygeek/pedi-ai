'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserSession, ParentProfile, ChildProfile, DemoAccount } from '@/app/types/auth';
import { DEMO_ACCOUNTS, DEMO_ACCOUNTS_LIST } from './demo-data';
import {
  UserRole,
  Permission,
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  isHealthcareProvider,
  isAdmin,
  ROLE_PERMISSIONS,
  ROLE_DISPLAY_NAMES,
  isPlatformAdmin,
  isClinicAdmin,
  isParent,
  isDoctor,
  isNurse
} from '@/app/types/users';

interface AuthContextType {
  session: UserSession | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchChild: (childId: string) => void;
  getActiveChild: () => ChildProfile | null;
  updateChildData: (childId: string, data: Partial<ChildProfile>) => void;
  isAuthenticated: boolean;

  // Role-based access
  userRole: UserRole | null;
  userPermissions: Permission[];
  hasPermission: (permission: Permission) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  isHealthcareProvider: () => boolean;
  isAdmin: () => boolean;
  isPlatformAdmin: () => boolean;
  isClinicAdmin: () => boolean;
  isParent: () => boolean;
  isDoctor: () => boolean;
  isNurse: () => boolean;
  getRoleDisplayName: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'pedi_ai_session';
const STORAGE_VERSION = '1.0';

interface StoredSession {
  version: string;
  session: UserSession;
  expiresAt: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const loadSession = () => {
      try {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
          const parsed: StoredSession = JSON.parse(stored);
          if (parsed.version === STORAGE_VERSION && new Date(parsed.expiresAt) > new Date()) {
            setSession(parsed.session);
          } else {
            localStorage.removeItem(SESSION_KEY);
          }
        }
      } catch (err) {
        console.error('Failed to load session:', err);
        localStorage.removeItem(SESSION_KEY);
      }
      setIsLoading(false);
    };

    loadSession();
  }, []);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (session) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

      const toStore: StoredSession = {
        version: STORAGE_VERSION,
        session,
        expiresAt: expiresAt.toISOString(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(toStore));
    }
  }, [session]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setError(null);

    try {
      // Find matching demo account
      const account = DEMO_ACCOUNTS_LIST.find(
        acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
      );

      if (!account) {
        setError('Invalid email or password');
        return false;
      }

      const newSession: UserSession = {
        user: account.user,
        children: account.children,
        activeChildId: account.activeChildId,
        isAuthenticated: true,
        userRole: account.userRole,
      };

      setSession(newSession);
      return true;
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    setError(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const switchChild = useCallback((childId: string) => {
    setSession(prev => {
      if (!prev) return null;
      const childExists = prev.children.some(c => c.id === childId);
      if (!childExists) return prev;
      return { ...prev, activeChildId: childId };
    });
  }, []);

  const getActiveChild = useCallback((): ChildProfile | null => {
    if (!session) return null;
    return session.children.find(c => c.id === session.activeChildId) || null;
  }, [session]);

  const updateChildData = useCallback((childId: string, data: Partial<ChildProfile>) => {
    setSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        children: prev.children.map(child =>
          child.id === childId ? { ...child, ...data } : child
        ),
      };
    });
  }, []);

  // Role-based access helpers
  const userRole = session?.userRole || null;
  const userPermissions = userRole ? ROLE_PERMISSIONS[userRole] || [] : [];

  const checkPermission = useCallback((permission: Permission): boolean => {
    return hasPermission(userRole!, permission);
  }, [userRole]);

  const checkAllPermissions = useCallback((permissions: Permission[]): boolean => {
    return hasAllPermissions(userRole!, permissions);
  }, [userRole]);

  const checkAnyPermission = useCallback((permissions: Permission[]): boolean => {
    return hasAnyPermission(userRole!, permissions);
  }, [userRole]);

  const checkIsHealthcareProvider = useCallback((): boolean => {
    return userRole ? isHealthcareProvider(userRole) : false;
  }, [userRole]);

  const checkIsAdmin = useCallback((): boolean => {
    return userRole ? isAdmin(userRole) : false;
  }, [userRole]);

  const checkIsPlatformAdmin = useCallback((): boolean => {
    return userRole ? isPlatformAdmin(userRole) : false;
  }, [userRole]);

  const checkIsClinicAdmin = useCallback((): boolean => {
    return userRole ? isClinicAdmin(userRole) : false;
  }, [userRole]);

  const checkIsParent = useCallback((): boolean => {
    return userRole ? isParent(userRole) : false;
  }, [userRole]);

  const checkIsDoctor = useCallback((): boolean => {
    return userRole ? isDoctor(userRole) : false;
  }, [userRole]);

  const checkIsNurse = useCallback((): boolean => {
    return userRole ? isNurse(userRole) : false;
  }, [userRole]);

  const getRoleDisplayName = useCallback((): string => {
    return userRole ? ROLE_DISPLAY_NAMES[userRole] : '';
  }, [userRole]);

  const value: AuthContextType = {
    session,
    isLoading,
    error,
    login,
    logout,
    switchChild,
    getActiveChild,
    updateChildData,
    isAuthenticated: !!session,

    // Role-based access
    userRole,
    userPermissions,
    hasPermission: checkPermission,
    hasAllPermissions: checkAllPermissions,
    hasAnyPermission: checkAnyPermission,
    isHealthcareProvider: checkIsHealthcareProvider,
    isAdmin: checkIsAdmin,
    isPlatformAdmin: checkIsPlatformAdmin,
    isClinicAdmin: checkIsClinicAdmin,
    isParent: checkIsParent,
    isDoctor: checkIsDoctor,
    isNurse: checkIsNurse,
    getRoleDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook to require authentication
export function useRequireAuth(redirectTo: string = '/login') {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = redirectTo;
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  return { isAuthenticated, isLoading };
}
