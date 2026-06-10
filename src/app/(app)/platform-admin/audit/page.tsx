'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IsPlatformAdmin } from '@/app/lib/rbac';
import { useAuditLogs } from '@/app/lib/role-api-hooks';

export default function AuditLogsPage() {
  const { logs, isLoading } = useAuditLogs();
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('7days');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case 'LOGIN': return 'bg-sage/20 text-forest';
      case 'CREATE': return 'bg-green-100 text-green-700';
      case 'UPDATE': return 'bg-amber-100 text-amber-700';
      case 'DELETE': return 'bg-coral/10 text-coral';
      case 'SUSPEND': return 'bg-orange-100 text-orange-700';
      case 'ACTIVATE': return 'bg-teal-100 text-teal-700';
      case 'EXPORT': return 'bg-purple-100 text-purple-700';
      case 'VIEW': return 'bg-mist text-forest/60';
      default: return 'bg-mist text-forest/70';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'LOGIN': return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      );
      case 'CREATE': return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      );
      case 'UPDATE': return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      );
      case 'DELETE': return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      );
      case 'SUSPEND': return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      );
      case 'ACTIVATE': return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      case 'EXPORT': return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      );
      default: return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      );
    }
  };

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Link href="/platform-admin" className="text-forest/40 hover:text-forest/70 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Link>
                  <span className="text-forest/40">/</span>
                  <span className="text-forest/50 text-sm">Audit Logs</span>
                </div>
                <h1 className="text-2xl font-display font-bold text-forest">Audit Logs</h1>
                <p className="text-forest/60 mt-1">Track all system activities and user actions</p>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-mist/50 text-forest rounded-xl font-medium hover:bg-mist/30 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Logs
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-mist/50 p-4">
              <p className="text-sm text-forest/60">Total Entries</p>
              <p className="text-2xl font-display font-bold text-forest">{filteredLogs.length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-mist/50 p-4">
              <p className="text-sm text-forest/60">Logins</p>
              <p className="text-2xl font-display font-bold text-forest">{filteredLogs.filter(l => l.action === 'LOGIN').length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-mist/50 p-4">
              <p className="text-sm text-forest/60">Creations</p>
              <p className="text-2xl font-display font-bold text-green-600">{filteredLogs.filter(l => l.action === 'CREATE').length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-mist/50 p-4">
              <p className="text-sm text-forest/60">Deletions</p>
              <p className="text-2xl font-display font-bold text-coral">{filteredLogs.filter(l => l.action === 'DELETE').length}</p>
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
                    placeholder="Search by user, action, or resource..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-mist/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage text-forest placeholder:text-forest/40"
                  />
                </div>
              </div>
              <div className="w-full md:w-44">
                <select
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className="w-full px-4 py-2.5 border border-mist/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/50 text-forest bg-white"
                >
                  <option value="all">All Actions</option>
                  {uniqueActions.map(action => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-44">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-mist/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage/50 text-forest bg-white"
                >
                  <option value="today">Today</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audit Log Table */}
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
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">Timestamp</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">Action</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">Resource</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">IP Address</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-forest/60 uppercase tracking-wider">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-mist/30">
                      {filteredLogs.slice(0, 50).map((log) => (
                        <tr key={log.id} className="hover:bg-mist/10 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-forest/60">
                            {formatTimestamp(log.timestamp)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="font-medium text-forest">{log.userName}</p>
                              <p className="text-xs text-forest/50 capitalize">{log.userRole.replace('_', ' ')}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${getActionBadgeColor(log.action)}`}>
                              {getActionIcon(log.action)}
                              {log.action}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-forest/60">
                            {log.resource}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-forest/50 font-mono">
                            {log.ipAddress}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-forest/50">
                            {log.details || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-mist/50">
                  <p className="text-sm text-forest/50">
                    Showing {Math.min(50, filteredLogs.length)} of {filteredLogs.length} log entries
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