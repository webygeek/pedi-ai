'use client';

import React from 'react';
import { useAuth } from './auth-context';
import { Permission, UserRole } from '@/app/types/users';

/**
 * Component that only renders children if user has the required permission
 */
export function HasPermission({
 permission,
  children,
  fallback = null
}: {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasPermission: check } = useAuth();

  if (check(permission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user has ALL required permissions
 */
export function HasAllPermissions({
  permissions,
  children,
  fallback = null
}: {
  permissions: Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasAllPermissions: check } = useAuth();

  if (check(permissions)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user has ANY of the required permissions
 */
export function HasAnyPermission({
  permissions,
  children,
  fallback = null
}: {
  permissions: Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { hasAnyPermission: check } = useAuth();

  if (check(permissions)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user has the required role
 */
export function HasRole({
  roles,
  children,
  fallback = null
}: {
  roles: UserRole | UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { userRole } = useAuth();

  const roleArray = Array.isArray(roles) ? roles : [roles];

  if (userRole && roleArray.includes(userRole)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user is a healthcare provider
 */
export function IsHealthcareProvider({
  children,
  fallback = null
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isHealthcareProvider: check } = useAuth();

  if (check()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user is an admin
 */
export function IsAdmin({
  children,
  fallback = null
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isAdmin: check } = useAuth();

  if (check()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user is a parent
 */
export function IsParent({
  children,
  fallback = null
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isParent: check } = useAuth();

  if (check()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user is a doctor
 */
export function IsDoctor({
  children,
  fallback = null
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isDoctor: check } = useAuth();

  if (check()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user is a nurse
 */
export function IsNurse({
  children,
  fallback = null
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isNurse: check } = useAuth();

  if (check()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user is a platform admin
 */
export function IsPlatformAdmin({
  children,
  fallback = null
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isPlatformAdmin: check } = useAuth();

  if (check()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Component that only renders children if user is a clinic admin
 */
export function IsClinicAdmin({
  children,
  fallback = null
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isClinicAdmin: check } = useAuth();

  if (check()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Hook to check permissions programmatically
 */
export function usePermissionCheck() {
  const {
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,
    isHealthcareProvider,
    isAdmin,
    isPlatformAdmin,
    isClinicAdmin,
    isParent,
    isDoctor,
    isNurse,
    userRole,
    userPermissions,
    getRoleDisplayName
  } = useAuth();

  return {
    // Permission checks
    hasPermission,
    hasAllPermissions,
    hasAnyPermission,

    // Role checks
    isHealthcareProvider,
    isAdmin,
    isPlatformAdmin,
    isClinicAdmin,
    isParent,
    isDoctor,
    isNurse,

    // User info
    userRole,
    userPermissions,
    getRoleDisplayName,

    // Utility checks
    canViewHealthRecords: hasPermission('health_record:read'),
    canEditHealthRecords: hasPermission('health_record:update'),
    canManageVaccinations: hasPermission('vaccination:update'),
    canViewGrowthCharts: hasPermission('growth:read'),
    canViewMilestones: hasPermission('milestone:read'),
    canManageMedications: hasPermission('medication:update'),
    canAccessSymptomChecker: hasPermission('symptom:check'),
    canViewMedicalHistory: hasPermission('medical_history:read'),
    canManageAppointments: hasPermission('clinic:manage'),
    canViewAnalytics: hasPermission('analytics:view'),
    canManageUsers: hasPermission('user:update'),
    canManageClinic: hasPermission('clinic:manage'),
    canAccessBilling: hasPermission('billing:view'),
  };
}
