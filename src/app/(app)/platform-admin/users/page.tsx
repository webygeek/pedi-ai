'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IsPlatformAdmin } from '@/app/lib/rbac';
import { usePlatformUsers } from '@/app/lib/role-api-hooks';

export default function UserManagementPage() {
  const { users, isLoading } = usePlatformUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [userStatuses, setUserStatuses] = useState<Record<string, string>>(
    users.reduce((acc, user) => ({ ...acc, [user.id]: user.status }), {})
  );

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || userStatuses[user.id] === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'platform_admin': return 'bg-coral/10 text-coral';
      case 'clinic_admin': return 'bg-purple-100 text-purple-700';
      case 'doctor': return 'bg-sage/20 text-forest';
      case 'nurse': return 'bg-blue-100 text-blue-700';
      case 'parent': return 'bg-mist text-forest/70';
      case 'receptionist': return 'bg-amber-100 text-amber-700';
      default: return 'bg-mist text-forest/70';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-sage/20 text-forest';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'suspended': return 'bg-coral/10 text-coral';
      case 'inactive': return 'bg-mist text-forest/50';
      case 'on_leave': return 'bg-orange-100 text-orange-700';
      default: return 'bg-mist text-forest/70';
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUserStatuses(prev => {
      const currentStatus = prev[userId];
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      return { ...prev, [userId]: newStatus };
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'platform_admin': return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      );
      case 'clinic_admin': return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
      case 'doctor': return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'nurse': return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 5l4-1 4 1m0 0l-4 3 4 1 4-1m-8 1v8m-4 0h8m-8 0H3m12 0a2 2 0 110 4H9a2 2 0 010-4h6z" />
        </svg>
      );
      default: return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      );
    }
  };

  return (
    <IsPlatformAdmin fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-display font-bold text-forest mb-2">Access Denied</h1>
          <p className="text-forest/60">You need platform admin privileges to access this page.</p>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-cream">
        {/* Header */}
        <header className="bg-white border-b border-mist/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Link href="/platform-admin" className="text-forest/40 hover:text-forest/70 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                  <span className="text-forest/40">/</span>
                  <span className="text-forest/50 text-sm">User Management</span>
                </div>
                <h1 className="text-2xl font-display font-bold text-forest">User Management</h1>
                <p className="text-forest/60 mt-1">Manage all platform users and their permissions</p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-forest text-white rounded-xl font-medium hover:bg-forest/90 transition-colors shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add User
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-mist/50 p-4">
              <p className="text-sm text-forest/60">Total Users</p>
              <p className="text-2xl font-display font-bold text-forest">{users.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-mist/50 p-4">
              <p className="text-sm text-forest/60">Active</p>
              <p className="text-2xl font-display font-bold text-forest">{users.filter(u => userStatuses[u.id] === 'active').length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-mist/50 p-4">
              <p className="text-sm text-forest/60">Pending</p>
              <p className="text-2xl font-display font-bold text-amber-600">{users.filter(u => userStatuses[u.id] === 'pending').length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-mist/50 p-4">
              <p className="text-sm text-forest/60">Suspended</p>
              <p className="text-2xl font-display font-bold text-coral">{users.filter(u => userStatuses[u.id] === 'suspended').length}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-mist/50 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-forest/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-mist/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage text-forest placeholder:text-forest/40"
                  />
                </div>
              </div>
              <div className="w-full md:w-44">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-mist/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/50 text-forest bg-white"
                >
                  <option value="all">All Roles</option>
                  <option value="platform_admin">Platform Admin</option>
                  <option value="clinic_admin">Clinic Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="nurse">Nurse</option>
                  <option value="parent">Parent</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
              <div className="w-full md:w-44">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-mist/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/50 text-forest bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl border border-mist/50 overflow-hidden">
            {isLoading ? (
              <div className="p-8 space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-mist/30 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-mist/20 border-b border-mist/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">Clinic</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">Last Login</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-mist/30">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-mist/10 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center mr-3 text-forest">
                                {getRoleIcon(user.role)}
                              </div>
                              <div>
                                <p className="font-medium text-forest">{user.name}</p>
                                <p className="text-sm text-forest/50">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                              {user.role.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-forest/60">
                            {user.clinic || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(userStatuses[user.id])}`}>
                              {userStatuses[user.id]}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-forest/50">
                            {user.lastLogin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <button className="p-2 text-forest/40 hover:text-forest hover:bg-mist/30 rounded-lg transition-colors" title="View">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </button>
                              <button className="p-2 text-forest/40 hover:text-forest hover:bg-mist/30 rounded-lg transition-colors" title="Edit">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              {userStatuses[user.id] === 'active' ? (
                                <button
                                  onClick={() => toggleUserStatus(user.id)}
                                  className="p-2 text-forest/40 hover:text-coral hover:bg-coral/10 rounded-lg transition-colors"
                                  title="Suspend"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                  </svg>
                                </button>
                              ) : (
                                <button
                                  onClick={() => toggleUserStatus(user.id)}
                                  className="p-2 text-forest/40 hover:text-sage hover:bg-sage/10 rounded-lg transition-colors"
                                  title="Reactivate"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-mist/50">
                  <p className="text-sm text-forest/50">
                    Showing {filteredUsers.length} of {users.length} users
                  </p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </IsPlatformAdmin>
  );
}