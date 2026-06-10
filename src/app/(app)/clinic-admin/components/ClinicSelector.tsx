'use client';

import React from 'react';

interface Clinic {
  id: string;
  name: string;
  address: string;
}

interface ClinicSelectorProps {
  clinics: Clinic[];
  selectedClinicId: string;
  onSelectClinic: (clinicId: string) => void;
  disabled?: boolean;
}

export function ClinicSelector({
  clinics,
  selectedClinicId,
  onSelectClinic,
  disabled = false
}: ClinicSelectorProps) {
  return (
    <div className="relative">
      <select
        value={selectedClinicId}
        onChange={(e) => onSelectClinic(e.target.value)}
        disabled={disabled}
        className="appearance-none w-full px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
      >
        {clinics.map((clinic) => (
          <option key={clinic.id} value={clinic.id}>
            {clinic.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}