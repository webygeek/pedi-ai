'use client';

import React from 'react';
import Link from 'next/link';
import { DoctorPatient, calculateAge, formatDate } from '../lib/doctor-data';

interface PatientCardProps {
  patient: DoctorPatient;
  showLastVisit?: boolean;
  showConditions?: boolean;
  compact?: boolean;
}

export function PatientCard({
  patient,
  showLastVisit = true,
  showConditions = true,
  compact = false
}: PatientCardProps) {
  const age = calculateAge(patient.dateOfBirth);

  return (
    <Link
      href={`/doctor/patient/${patient.id}`}
      className={`block bg-white rounded-xl border border-gray-200 p-4 transition-all hover:shadow-md hover:border-primary-200 ${
        compact ? 'hover:scale-[1.02]' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl ${
          compact ? 'w-10 h-10 text-xl' : ''
        }`}>
          {patient.avatar || (patient.gender === 'female' ? '👧' : '👦')}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-gray-900 truncate ${compact ? 'text-sm' : ''}`}>
              {patient.name}
            </h3>
            {patient.isShared && (
              <span className="px-1.5 py-0.5 text-xs bg-amber-100 text-amber-700 rounded">
                Shared
              </span>
            )}
          </div>

          <div className={`flex items-center gap-3 text-gray-500 ${compact ? 'text-xs' : 'text-sm'} mt-1`}>
            <span>DOB: {formatDate(patient.dateOfBirth)}</span>
            <span className="text-gray-300">|</span>
            <span>{age.display} old</span>
            {patient.bloodType && (
              <>
                <span className="text-gray-300">|</span>
                <span>{patient.bloodType}</span>
              </>
            )}
          </div>

          {/* Conditions */}
          {showConditions && patient.conditions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {patient.conditions.map((condition, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs ${
                    compact ? 'text-[10px] px-1.5' : ''
                  }`}
                >
                  {condition}
                </span>
              ))}
            </div>
          )}

          {/* Allergies */}
          {patient.allergies.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {patient.allergies.map((allergy, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 bg-danger-bg text-danger rounded text-xs ${
                    compact ? 'text-[10px] px-1.5' : ''
                  }`}
                >
                  {allergy} allergy
                </span>
              ))}
            </div>
          )}

          {/* Last Visit */}
          {showLastVisit && patient.lastVisit && (
            <p className={`text-gray-400 mt-2 ${compact ? 'text-xs' : 'text-sm'}`}>
              Last visit: {formatDate(patient.lastVisit)}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 text-gray-400">
          <svg className={`w-5 h-5 ${compact ? 'w-4 h-4' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

interface PatientCardSkeletonProps {
  compact?: boolean;
}

export function PatientCardSkeleton({ compact = false }: PatientCardSkeletonProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 animate-pulse ${compact ? 'p-3' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 bg-gray-200 rounded-full ${compact ? 'w-10 h-10' : 'w-12 h-12'}`} />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-32" />
          <div className="h-3 bg-gray-200 rounded w-48" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}