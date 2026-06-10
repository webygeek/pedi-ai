'use client';

import React, { useState, useMemo } from 'react';
import { PatientCard, PatientCardSkeleton } from '../components/PatientCard';
import { DEMO_DOCTOR_PATIENTS, DoctorPatient, calculateAge } from '../lib/doctor-data';

type SortOption = 'name' | 'lastVisit' | 'dateAdded';
type FilterTab = 'all' | 'shared';

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [isLoading, setIsLoading] = useState(false);

  const filteredPatients = useMemo(() => {
    let patients = [...DEMO_DOCTOR_PATIENTS];

    // Apply filter tab
    if (filterTab === 'shared') {
      patients = patients.filter(p => p.isShared);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      patients = patients.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.parentName.toLowerCase().includes(query) ||
        p.conditions.some(c => c.toLowerCase().includes(query))
      );
    }

    // Apply sort
    patients.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'lastVisit':
          if (!a.lastVisit) return 1;
          if (!b.lastVisit) return -1;
          return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
        case 'dateAdded':
          return new Date(b.dateOfBirth).getTime() - new Date(a.dateOfBirth).getTime();
        default:
          return 0;
      }
    });

    return patients;
  }, [searchQuery, sortBy, filterTab]);

  const sharedCount = DEMO_DOCTOR_PATIENTS.filter(p => p.isShared).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
              <p className="text-gray-500 mt-1">
                {DEMO_DOCTOR_PATIENTS.length} patients in your care
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Doctor
              </span>
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-lg">👨‍⚕️</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Controls */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search patients by name, parent, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="name">Name</option>
                <option value="lastVisit">Last Visit</option>
                <option value="dateAdded">Date Added</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => setFilterTab('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterTab === 'all'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Clinic Patients ({DEMO_DOCTOR_PATIENTS.length})
            </button>
            <button
              onClick={() => setFilterTab('shared')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterTab === 'shared'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Shared with Me ({sharedCount})
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Showing {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Patient List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <PatientCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredPatients.length > 0 ? (
          <div className="space-y-3">
            {filteredPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No patients matching "${searchQuery}"`
                : 'No patients in this category'}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredPatients.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              disabled
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-400 cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
              1
            </span>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
}