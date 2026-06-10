'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/lib/auth-context';
import ReportPreview, { ReportType } from './components/ReportPreview';

const reportTypes: { id: ReportType; name: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'growth',
    name: 'Growth Report',
    description: 'Track height, weight, and growth patterns over time',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    id: 'vaccination',
    name: 'Vaccination Certificate',
    description: 'Official record of all immunizations',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'medical_history',
    name: 'Medical History Summary',
    description: 'Complete overview of health records and conditions',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'milestones',
    name: 'Development Milestones',
    description: 'Track cognitive, motor, and social development',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

export default function ReportsPage() {
  const { session, getActiveChild } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('growth');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [options, setOptions] = useState({
    includeCharts: true,
    includeNotes: true,
    includeImages: false,
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const activeChild = getActiveChild();

  useEffect(() => {
    setMounted(true);
    if (activeChild) {
      setSelectedChildId(activeChild.id);
      // Set default date range (last 6 months)
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      setDateRange({
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
      });
    }
  }, [activeChild]);

  const handleGeneratePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('PDF generated successfully! (Demo)');
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-mist/50 rounded w-1/3"></div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-mist/50 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const selectedChild = session?.children.find(c => c.id === selectedChildId) || activeChild;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl text-forest">Reports</h1>
        <p className="text-forest/60 mt-1">Generate and download health reports for your child</p>
      </div>

      {!showPreview ? (
        <>
          {/* Child Selector */}
          {session && session.children.length > 1 && (
            <div className="bg-white rounded-2xl border border-mist/50 p-6">
              <h3 className="text-sm font-semibold text-forest/50 uppercase tracking-wide mb-4">Select Child</h3>
              <div className="flex flex-wrap gap-3">
                {session.children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedChildId(child.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                      selectedChildId === child.id
                        ? 'bg-sage/10 border-sage/30'
                        : 'border-mist/50 hover:border-sage/20'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-xl">
                      {child.avatar || '👶'}
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-forest">{child.name}</p>
                      <p className="text-xs text-forest/50">
                        {new Date(child.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Report Type Selector */}
          <div className="bg-white rounded-2xl border border-mist/50 p-6">
            <h3 className="text-sm font-semibold text-forest/50 uppercase tracking-wide mb-4">Report Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedReportType(type.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedReportType === type.id
                      ? 'bg-sage/10 border-sage/30 shadow-sm'
                      : 'border-mist/50 hover:border-sage/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                    selectedReportType === type.id ? 'bg-sage text-white' : 'bg-mist/50 text-forest/50'
                  }`}>
                    {type.icon}
                  </div>
                  <h4 className="font-semibold text-forest">{type.name}</h4>
                  <p className="text-sm text-forest/60 mt-1">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-white rounded-2xl border border-mist/50 p-6">
            <h3 className="text-sm font-semibold text-forest/50 uppercase tracking-wide mb-4">Date Range</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-forest/70 mb-2">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                />
              </div>
              <div>
                <label className="block text-sm text-forest/70 mb-2">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {[
                { label: 'Last 30 days', months: 1 },
                { label: 'Last 3 months', months: 3 },
                { label: 'Last 6 months', months: 6 },
                { label: 'Last year', months: 12 },
              ].map(preset => (
                <button
                  key={preset.label}
                  onClick={() => {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(start.getMonth() - preset.months);
                    setDateRange({
                      start: start.toISOString().split('T')[0],
                      end: end.toISOString().split('T')[0],
                    });
                  }}
                  className="px-3 py-1.5 text-sm text-sage hover:text-forest hover:bg-sage/10 rounded-full transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-2xl border border-mist/50 p-6">
            <h3 className="text-sm font-semibold text-forest/50 uppercase tracking-wide mb-4">Report Options</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeCharts}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeCharts: e.target.checked }))}
                  className="w-5 h-5 rounded border-mist/50 text-sage focus:ring-sage/20"
                />
                <div>
                  <p className="font-medium text-forest">Include Charts</p>
                  <p className="text-sm text-forest/60">Add growth charts and visualizations</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeNotes}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeNotes: e.target.checked }))}
                  className="w-5 h-5 rounded border-mist/50 text-sage focus:ring-sage/20"
                />
                <div>
                  <p className="font-medium text-forest">Include Clinical Notes</p>
                  <p className="text-sm text-forest/60">Add doctor notes and observations</p>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.includeImages}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeImages: e.target.checked }))}
                  className="w-5 h-5 rounded border-mist/50 text-sage focus:ring-sage/20"
                />
                <div>
                  <p className="font-medium text-forest">Include Images</p>
                  <p className="text-sm text-forest/60">Attach relevant photos and documents</p>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowPreview(true)}
              className="flex-1 px-6 py-3 bg-white border border-forest text-forest font-semibold rounded-full hover:bg-forest hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview Report
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="flex-1 px-6 py-3 bg-forest text-white font-semibold rounded-full hover:bg-forest-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-3 bg-coral text-white font-semibold rounded-full hover:bg-coral-light transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
              Share via Email
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Preview */}
          <ReportPreview
            reportType={selectedReportType}
            child={selectedChild!}
            dateRange={dateRange}
            options={options}
            onPrint={handlePrint}
            onDownload={handleGeneratePDF}
          />

          {/* Back Button */}
          <button
            onClick={() => setShowPreview(false)}
            className="px-6 py-3 bg-white border border-mist/50 text-forest font-medium rounded-full hover:bg-mist/30 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Options
          </button>
        </>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-forest/50 backdrop-blur-sm" onClick={() => setShowShareModal(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="font-display text-xl text-forest mb-4">Share Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-forest/70 mb-2">Recipient Email</label>
                <input
                  type="email"
                  placeholder="doctor@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20"
                />
              </div>
              <div>
                <label className="block text-sm text-forest/70 mb-2">Message (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Add a note..."
                  className="w-full px-4 py-3 rounded-xl border border-mist/50 bg-white text-forest focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 px-4 py-2 border border-mist/50 text-forest font-medium rounded-full hover:bg-mist/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowShareModal(false);
                    alert('Report shared successfully! (Demo)');
                  }}
                  className="flex-1 px-4 py-2 bg-coral text-white font-medium rounded-full hover:bg-coral-light transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
