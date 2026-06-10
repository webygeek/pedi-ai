'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/lib/auth-context';
import CaregiverCard, { Caregiver, caregiverPermissions } from './components/CaregiverCard';

// Demo caregivers data
const getDemoCaregivers = (): Caregiver[] => {
  const now = new Date();
  return [
    {
      id: 'cg-1',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 555-0123',
      relationship: 'grandparent',
      avatar: '👵',
      permissions: ['growth', 'vaccinations', 'milestones', 'notifications'],
      lastAccessed: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      invitedAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'cg-2',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 555-0456',
      relationship: 'grandparent',
      avatar: '👴',
      permissions: ['growth', 'vaccinations', 'medical_history', 'milestones', 'medications'],
      lastAccessed: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      invitedAt: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'cg-3',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      relationship: 'nanny',
      avatar: '👩',
      permissions: ['growth', 'milestones', 'medications', 'notifications'],
      lastAccessed: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      invitedAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'cg-4',
      name: 'Robert Wilson',
      email: 'r.wilson@email.com',
      relationship: 'relative',
      permissions: ['growth', 'vaccinations', 'milestones'],
      status: 'pending',
      invitedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
};

export default function CaregiverPage() {
  const { getActiveChild } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string | null>(null);

  const activeChild = getActiveChild();

  useEffect(() => {
    setMounted(true);
    setCaregivers(getDemoCaregivers());
  }, []);

  const handleEdit = (id: string) => {
    // In a real app, this would open an edit modal
    alert('Edit caregiver functionality would open here (Demo)');
  };

  const handleRevoke = (id: string) => {
    setSelectedCaregiverId(id);
    setShowRevokeModal(true);
  };

  const confirmRevoke = () => {
    if (selectedCaregiverId) {
      setCaregivers(prev => prev.filter(c => c.id !== selectedCaregiverId));
      setShowRevokeModal(false);
      setSelectedCaregiverId(null);
    }
  };

  const activeCount = caregivers.filter(c => c.status === 'active').length;
  const pendingCount = caregivers.filter(c => c.status === 'pending').length;

  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-mist/50 rounded w-1/3"></div>
        <div className="grid gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-40 bg-mist/50 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl text-forest">Caregiver Access</h1>
          <p className="text-forest/60 mt-1">
            Manage who can access {activeChild?.name}'s health information
          </p>
        </div>
        <Link
          href="/caregiver/invite"
          className="px-5 py-2.5 bg-coral text-white font-semibold rounded-full hover:bg-coral-light transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Invite Caregiver
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-mist/50 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-forest">{activeCount}</p>
              <p className="text-sm text-forest/60">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-mist/50 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-forest">{pendingCount}</p>
              <p className="text-sm text-forest/60">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-mist/50 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-semibold text-forest">{caregivers.length}</p>
              <p className="text-sm text-forest/60">Total Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-sage/10 to-sage/5 rounded-2xl border border-sage/20 p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-forest">What caregivers can access</h3>
            <p className="text-sm text-forest/70 mt-1">
              You control exactly what each caregiver can see. They won't be able to modify any records or make appointments unless specifically granted permission.
            </p>
          </div>
        </div>
      </div>

      {/* Caregivers List */}
      <div className="space-y-4">
        <h2 className="font-display text-xl text-forest">People with Access</h2>
        {caregivers.length > 0 ? (
          caregivers.map(caregiver => (
            <CaregiverCard
              key={caregiver.id}
              caregiver={caregiver}
              onEdit={handleEdit}
              onRevoke={handleRevoke}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-mist/50">
            <div className="w-16 h-16 bg-mist/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-forest/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <h3 className="font-display text-lg text-forest mb-1">No caregivers yet</h3>
            <p className="text-forest/50 text-sm mb-4">
              Invite family members or caregivers to share access to your child's health records.
            </p>
            <Link
              href="/caregiver/invite"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white font-semibold rounded-full hover:bg-coral-light transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Invite Caregiver
            </Link>
          </div>
        )}
      </div>

      {/* Permission Legend */}
      <div className="bg-white rounded-2xl border border-mist/50 p-6">
        <h3 className="font-semibold text-forest mb-4">Permission Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caregiverPermissions.map(perm => (
            <div key={perm.id} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-sage/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-forest text-sm">{perm.label}</p>
                <p className="text-xs text-forest/60">{perm.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revoke Confirmation Modal */}
      {showRevokeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={() => setShowRevokeModal(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="w-12 h-12 bg-danger-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-forest text-center mb-2">Revoke Access?</h3>
            <p className="text-forest/70 text-center mb-6">
              This will remove all access for this caregiver. They will no longer be able to view {activeChild?.name}'s health information.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRevokeModal(false)}
                className="flex-1 px-4 py-2.5 border border-mist/50 text-forest font-medium rounded-full hover:bg-mist/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRevoke}
                className="flex-1 px-4 py-2.5 bg-danger text-white font-medium rounded-full hover:bg-danger/90 transition-colors"
              >
                Revoke Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}