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
      className={`block bg-white rounded-2xl border border-mist/50 p-4 transition-all hover:shadow-md hover:border-sage/30 ${
        compact ? '' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center text-2xl ${
          compact ? 'w-10 h-10 text-xl' : ''
        }`}>
          {patient.avatar || (patient.gender === 'female' ? '👧' : '👦')}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-forest truncate ${compact ? 'text-sm' : ''}`}>
              {patient.name}
            </h3>
            {patient.isShared && (
              <span className="px-2 py-0.5 text-xs bg-coral/10 text-coral rounded-full border border-coral/20">
                Shared
              </span>
            )}
          </div>

          <div className={`flex items-center gap-3 text-forest/50 ${compact ? 'text-xs' : 'text-sm'} mt-1`}>
            <span>DOB: {formatDate(patient.dateOfBirth)}</span>
            <span className="text-mist">|</span>
            <span>{age.display} old</span>
            {patient.bloodType && (
              <>
                <span className="text-mist">|</span>
                <span className="font-medium">{patient.bloodType}</span>
              </>
            )}
          </div>

          {/* Conditions */}
          {showConditions && patient.conditions.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {patient.conditions.map((condition, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 bg-forest/10 text-forest rounded-full text-xs font-medium ${
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
            <div className="flex flex-wrap gap-1.5 mt-2">
              {patient.allergies.map((allergy, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 bg-danger-bg text-danger rounded-full text-xs font-medium border border-danger/20 ${
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
            <p className={`text-forest/40 mt-2 ${compact ? 'text-xs' : 'text-sm'}`}>
              Last visit: {formatDate(patient.lastVisit)}
            </p>
          )}
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 text-forest/30">
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
    <div className={`bg-white rounded-2xl border border-mist/50 p-4 animate-pulse ${compact ? 'p-3' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 bg-mist rounded-full ${compact ? 'w-10 h-10' : 'w-12 h-12'}`} />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-mist rounded w-32" />
          <div className="h-3 bg-mist rounded w-48" />
          <div className="h-3 bg-mist rounded w-24" />
        </div>
      </div>
    </div>
  );
}
