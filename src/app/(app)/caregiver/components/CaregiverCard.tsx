'use client';

import React from 'react';

export interface CaregiverPermission {
  id: string;
  label: string;
  description: string;
}

export interface Caregiver {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relationship: string;
  avatar?: string;
  permissions: string[];
  lastAccessed?: string;
  accessExpires?: string;
  status: 'active' | 'pending' | 'expired';
  invitedAt: string;
}

interface CaregiverCardProps {
  caregiver: Caregiver;
  onEdit: (id: string) => void;
  onRevoke: (id: string) => void;
}

const caregiverPermissions: CaregiverPermission[] = [
  { id: 'growth', label: 'Growth Records', description: 'View growth charts and measurements' },
  { id: 'vaccinations', label: 'Vaccinations', description: 'View vaccination history' },
  { id: 'medical_history', label: 'Medical History', description: 'View medical history and conditions' },
  { id: 'milestones', label: 'Milestones', description: 'View development milestones' },
  { id: 'medications', label: 'Medications', description: 'View medication records' },
  { id: 'notifications', label: 'Notifications', description: 'Receive push notifications' },
  { id: 'appointments', label: 'Book Appointments', description: 'Schedule appointments on your behalf' },
];

const getRelationshipLabel = (rel: string) => {
  const labels: Record<string, string> = {
    grandparent: 'Grandparent',
    nanny: 'Nanny',
    au_pair: 'Au Pair',
    relative: 'Relative',
    family_friend: 'Family Friend',
    other: 'Other',
  };
  return labels[rel] || rel;
};

const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function CaregiverCard({ caregiver, onEdit, onRevoke }: CaregiverCardProps) {
  const getStatusBadge = () => {
    switch (caregiver.status) {
      case 'active':
        return <span className="px-2 py-0.5 bg-sage/10 text-sage text-xs font-semibold rounded-full">Active</span>;
      case 'pending':
        return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Pending</span>;
      case 'expired':
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">Expired</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-mist/50 p-5 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center text-2xl flex-shrink-0">
          {caregiver.avatar || caregiver.name.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="font-semibold text-forest">{caregiver.name}</h3>
              <p className="text-sm text-forest/60">{getRelationshipLabel(caregiver.relationship)}</p>
            </div>
            {getStatusBadge()}
          </div>

          <p className="text-sm text-forest/50 mb-3">{caregiver.email}</p>

          {/* Permissions */}
          <div className="flex flex-wrap gap-2 mb-3">
            {caregiver.permissions.map((perm) => {
              const permInfo = caregiverPermissions.find(p => p.id === perm);
              return (
                <span
                  key={perm}
                  className="px-2 py-1 bg-mist/30 text-forest/70 text-xs rounded-full flex items-center gap-1"
                  title={permInfo?.description}
                >
                  {permInfo?.label || perm}
                </span>
              );
            })}
          </div>

          {/* Last accessed */}
          {caregiver.lastAccessed && caregiver.status === 'active' && (
            <p className="text-xs text-forest/40 flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Last accessed {formatRelativeTime(caregiver.lastAccessed)}
            </p>
          )}

          {/* Access expires */}
          {caregiver.accessExpires && (
            <p className="text-xs text-forest/40 flex items-center gap-1 mt-1">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
              </svg>
              Access expires {new Date(caregiver.accessExpires).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-mist/30">
        <button
          onClick={() => onEdit(caregiver.id)}
          className="flex-1 px-3 py-2 text-sm font-medium text-sage hover:text-forest hover:bg-sage/10 rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onRevoke(caregiver.id)}
          className="flex-1 px-3 py-2 text-sm font-medium text-danger hover:text-danger hover:bg-danger-bg rounded-lg transition-colors flex items-center justify-center gap-1"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Revoke Access
        </button>
      </div>
    </div>
  );
}

export { caregiverPermissions };