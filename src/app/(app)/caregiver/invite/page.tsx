'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/lib/auth-context';
import { caregiverPermissions } from '../components/CaregiverCard';

const relationships = [
  { value: 'grandparent', label: 'Grandparent' },
  { value: 'nanny', label: 'Nanny / Au Pair' },
  { value: 'relative', label: 'Other Relative' },
  { value: 'family_friend', label: 'Family Friend' },
  { value: 'other', label: 'Other' },
];

export default function InviteCaregiverPage() {
  const router = useRouter();
  const { getActiveChild } = useAuth();
  const activeChild = getActiveChild();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
  });
  const [permissions, setPermissions] = useState<string[]>(['growth', 'vaccinations', 'milestones']);
  const [hasExpiry, setHasExpiry] = useState(false);
  const [expiresAt, setExpiresAt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handlePermissionToggle = (permId: string) => {
    setPermissions(prev =>
      prev.includes(permId)
        ? prev.filter(p => p !== permId)
        : [...prev, permId]
    );
  };

  const handleSelectAll = () => {
    setPermissions(caregiverPermissions.map(p => p.id));
  };

  const handleSelectNone = () => {
    setPermissions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Please enter a name');
      return;
    }
    if (!formData.email.trim()) {
      setError('Please enter an email address');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.relationship) {
      setError('Please select a relationship');
      return;
    }
    if (permissions.length === 0) {
      setError('Please select at least one permission');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Success - redirect back to caregiver page
    router.push('/caregiver');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <Link href="/caregiver" className="inline-flex items-center gap-2 text-sage hover:text-forest transition-colors mb-4">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Caregivers
        </Link>
        <h1 className="font-display text-3xl text-forest">Invite Caregiver</h1>
        <p className="text-forest/60 mt-1">Share access to your child's health information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-danger-bg border border-danger/30 text-danger px-4 py-3 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            {error}
          </div>
        )}

        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-mist/50 p-6 space-y-4">
          <h2 className="font-display text-lg text-forest">Personal Information</h2>

          <div>
            <label className="block text-sm font-medium text-forest/70 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Maria Garcia"
              className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest placeholder:text-forest/30 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-forest/70 mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="maria@example.com"
              className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest placeholder:text-forest/30 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-forest/70 mb-2">Phone Number (Optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 555-0123"
              className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest placeholder:text-forest/30 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-forest/70 mb-2">Relationship *</label>
            <select
              value={formData.relationship}
              onChange={(e) => setFormData(prev => ({ ...prev, relationship: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
            >
              <option value="">Select relationship...</option>
              {relationships.map(rel => (
                <option key={rel.value} value={rel.value}>{rel.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white rounded-2xl border border-mist/50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-forest">Permissions</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs text-sage hover:text-forest transition-colors"
              >
                Select All
              </button>
              <span className="text-forest/30">|</span>
              <button
                type="button"
                onClick={handleSelectNone}
                className="text-xs text-forest/50 hover:text-forest transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {caregiverPermissions.map(perm => (
              <label
                key={perm.id}
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  permissions.includes(perm.id)
                    ? 'bg-sage/5 border-sage/30'
                    : 'border-mist/50 hover:border-sage/20'
                }`}
              >
                <input
                  type="checkbox"
                  checked={permissions.includes(perm.id)}
                  onChange={() => handlePermissionToggle(perm.id)}
                  className="w-5 h-5 rounded border-mist/50 text-sage focus:ring-sage/20 mt-0.5"
                />
                <div className="flex-1">
                  <p className="font-medium text-forest">{perm.label}</p>
                  <p className="text-sm text-forest/60">{perm.description}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="pt-2 border-t border-mist/30">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.includes('appointments')}
                onChange={() => handlePermissionToggle('appointments')}
                className="w-5 h-5 rounded border-mist/50 text-coral focus:ring-coral/20"
              />
              <div>
                <p className="font-medium text-forest">Book Appointments</p>
                <p className="text-sm text-forest/60">Allow scheduling appointments on your behalf</p>
              </div>
            </label>
          </div>
        </div>

        {/* Access Expiry */}
        <div className="bg-white rounded-2xl border border-mist/50 p-6 space-y-4">
          <h2 className="font-display text-lg text-forest">Access Duration</h2>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasExpiry}
              onChange={(e) => setHasExpiry(e.target.checked)}
              className="w-5 h-5 rounded border-mist/50 text-sage focus:ring-sage/20"
            />
            <div>
              <p className="font-medium text-forest">Set expiration date</p>
              <p className="text-sm text-forest/60">Automatically revoke access after a specific date</p>
            </div>
          </label>

          {hasExpiry && (
            <div className="pl-8">
              <label className="block text-sm font-medium text-forest/70 mb-2">Expires On</label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
              />
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="bg-sage/10 rounded-2xl border border-sage/20 p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <div className="text-sm text-forest/70">
            <p className="font-medium text-forest">What happens next?</p>
            <p className="mt-1">
              The caregiver will receive an email invitation with a link to access {activeChild?.name || 'your child'}'s health information based on the permissions you grant.
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Link
            href="/caregiver"
            className="flex-1 px-6 py-3 border border-mist/50 text-forest font-semibold rounded-full hover:bg-mist/30 transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-coral text-white font-semibold rounded-full hover:bg-coral-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending Invite...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
                Send Invite
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}