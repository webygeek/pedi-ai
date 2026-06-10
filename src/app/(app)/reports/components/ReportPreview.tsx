'use client';

import React from 'react';
import { ChildProfile } from '@/app/types/auth';

export type ReportType = 'growth' | 'vaccination' | 'medical_history' | 'milestones';

interface ReportPreviewProps {
  reportType: ReportType;
  child: ChildProfile;
  dateRange: { start: string; end: string };
  options: {
    includeCharts: boolean;
    includeNotes: boolean;
    includeImages: boolean;
  };
  onPrint?: () => void;
  onDownload?: () => void;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({
  reportType,
  child,
  dateRange,
  options,
  onPrint,
  onDownload,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateAge = (dob: string) => {
    const birth = new Date(dob);
    const now = new Date();
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (months < 12) return `${months} months`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return remainingMonths > 0 ? `${years} years, ${remainingMonths} months` : `${years} years`;
  };

  const getReportTitle = () => {
    switch (reportType) {
      case 'growth':
        return 'Growth Report';
      case 'vaccination':
        return 'Vaccination Certificate';
      case 'medical_history':
        return 'Medical History Summary';
      case 'milestones':
        return 'Development Milestones Report';
      default:
        return 'Health Report';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-mist/50 overflow-hidden">
      {/* Report Header */}
      <div className="bg-gradient-to-r from-forest to-sage p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-2xl">
                Pedi<span className="text-coral">·</span>Ai
              </span>
            </div>
            <h2 className="text-xl font-semibold">{getReportTitle()}</h2>
            <p className="text-white/80 text-sm mt-1">
              Generated on {formatDate(new Date().toISOString())}
            </p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-2">
              {child.avatar || '👶'}
            </div>
          </div>
        </div>
      </div>

      {/* Child Info */}
      <div className="p-6 border-b border-mist/50">
        <h3 className="text-sm font-semibold text-forest/50 uppercase tracking-wide mb-3">Child Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-forest/50">Name</p>
            <p className="font-medium text-forest">{child.name}</p>
          </div>
          <div>
            <p className="text-xs text-forest/50">Date of Birth</p>
            <p className="font-medium text-forest">{formatDate(child.dateOfBirth)}</p>
          </div>
          <div>
            <p className="text-xs text-forest/50">Age</p>
            <p className="font-medium text-forest">{calculateAge(child.dateOfBirth)}</p>
          </div>
          <div>
            <p className="text-xs text-forest/50">Gender</p>
            <p className="font-medium text-forest capitalize">{child.gender}</p>
          </div>
        </div>
        {child.weight && child.height && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-xs text-forest/50">Weight</p>
              <p className="font-medium text-forest">{child.weight} kg</p>
            </div>
            <div>
              <p className="text-xs text-forest/50">Height</p>
              <p className="font-medium text-forest">{child.height} cm</p>
            </div>
            {child.bloodType && (
              <div>
                <p className="text-xs text-forest/50">Blood Type</p>
                <p className="font-medium text-forest">{child.bloodType}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Report Content */}
      <div className="p-6">
        {reportType === 'growth' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4">Growth Summary</h3>
              <p className="text-forest/70 mb-4">
                Report period: {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
              </p>
              {options.includeCharts && (
                <div className="bg-mist/30 rounded-xl p-4">
                  <p className="text-sm text-forest/60 mb-4">Growth Chart Visualization</p>
                  <div className="h-40 flex items-end justify-around gap-4 px-4">
                    {[85, 88, 91, 93, 95].map((height, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 flex-1">
                        <div
                          className="w-full max-w-12 bg-gradient-to-t from-sage to-sage/70 rounded-t-lg"
                          style={{ height: `${(height / 100) * 120}px` }}
                        />
                        <span className="text-xs text-forest/50">{height}cm</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-sage/5 rounded-xl p-4">
                <p className="text-sm text-forest/60 mb-1">Weight Progress</p>
                <p className="text-2xl font-semibold text-forest">+2.3 kg</p>
              </div>
              <div className="bg-sage/5 rounded-xl p-4">
                <p className="text-sm text-forest/60 mb-1">Height Progress</p>
                <p className="text-2xl font-semibold text-forest">+10 cm</p>
              </div>
            </div>
          </div>
        )}

        {reportType === 'vaccination' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4">Vaccination Records</h3>
              <p className="text-forest/70 mb-4">
                This certificate confirms the vaccination history of {child.name}.
              </p>
            </div>
            <div className="border border-mist/50 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-mist/30">
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold text-forest">Vaccine</th>
                    <th className="text-left p-3 text-sm font-semibold text-forest">Date</th>
                    <th className="text-left p-3 text-sm font-semibold text-forest">Dose</th>
                    <th className="text-left p-3 text-sm font-semibold text-forest">Provider</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist/50">
                  <tr>
                    <td className="p-3 text-sm text-forest">Hepatitis B</td>
                    <td className="p-3 text-sm text-forest">Jan 15, 2025</td>
                    <td className="p-3 text-sm text-forest">1st Dose</td>
                    <td className="p-3 text-sm text-forest">Dr. Sarah Chen</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-sm text-forest">DTaP</td>
                    <td className="p-3 text-sm text-forest">Mar 20, 2025</td>
                    <td className="p-3 text-sm text-forest">1st Dose</td>
                    <td className="p-3 text-sm text-forest">Children's Health</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-sm text-forest">MMR</td>
                    <td className="p-3 text-sm text-forest">Jun 10, 2025</td>
                    <td className="p-3 text-sm text-forest">1st Dose</td>
                    <td className="p-3 text-sm text-forest">Dr. Sarah Chen</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-sage/5 rounded-xl p-4 text-center">
              <p className="text-sm text-forest/60">Certificate ID</p>
              <p className="font-mono text-forest">PEDI-VAX-{Date.now().toString(36).toUpperCase()}</p>
            </div>
          </div>
        )}

        {reportType === 'medical_history' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4">Medical History Summary</h3>
              <p className="text-forest/70 mb-4">
                Complete medical history for {child.name} from {formatDate(dateRange.start)} to {formatDate(dateRange.end)}.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-mist/30 rounded-xl p-4">
                <h4 className="font-medium text-forest mb-2">Allergies</h4>
                {child.allergies && child.allergies.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-forest/70">
                    {child.allergies.map((allergy, i) => (
                      <li key={i}>{allergy}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-forest/50">No known allergies</p>
                )}
              </div>
              <div className="bg-mist/30 rounded-xl p-4">
                <h4 className="font-medium text-forest mb-2">Medical Conditions</h4>
                {child.conditions && child.conditions.length > 0 ? (
                  <ul className="list-disc list-inside text-sm text-forest/70">
                    {child.conditions.map((condition, i) => (
                      <li key={i}>{condition}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-forest/50">No known conditions</p>
                )}
              </div>
              {options.includeNotes && (
                <div className="bg-mist/30 rounded-xl p-4">
                  <h4 className="font-medium text-forest mb-2">Clinical Notes</h4>
                  <div className="space-y-3">
                    <div className="border-l-2 border-sage pl-3">
                      <p className="text-sm text-forest">Annual checkup completed. Growth is on track.</p>
                      <p className="text-xs text-forest/50">Dr. Sarah Chen - June 5, 2026</p>
                    </div>
                    <div className="border-l-2 border-sage pl-3">
                      <p className="text-sm text-forest">Vaccination administered without complications.</p>
                      <p className="text-xs text-forest/50">Dr. Sarah Chen - May 15, 2026</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {reportType === 'milestones' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-forest mb-4">Development Milestones</h3>
              <p className="text-forest/70 mb-4">
                Tracking {child.name}'s developmental progress.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { domain: 'Motor', milestone: 'Walking independently', status: 'completed', date: 'May 2026' },
                { domain: 'Language', milestone: 'Says "mama" and "dada"', status: 'completed', date: 'Apr 2026' },
                { domain: 'Cognitive', milestone: 'Object permanence', status: 'completed', date: 'Mar 2026' },
                { domain: 'Social', milestone: 'Waves bye-bye', status: 'completed', date: 'Apr 2026' },
                { domain: 'Motor', milestone: 'Stacks3 blocks', status: 'in_progress', date: 'Due Jun 2026' },
                { domain: 'Language', milestone: 'First words (3+)', status: 'in_progress', date: 'Due Jul 2026' },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-xl border ${
                  item.status === 'completed'
                    ? 'bg-sage/5 border-sage/20'
                    : 'bg-amber-50 border-amber-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      item.status === 'completed'
                        ? 'bg-sage/20 text-sage'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.domain}
                    </span>
                    {item.status === 'completed' ? (
                      <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-amber-400" />
                    )}
                  </div>
                  <p className="font-medium text-forest">{item.milestone}</p>
                  <p className="text-xs text-forest/50 mt-1">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-mist/50 bg-mist/20 flex items-center justify-between">
        <div className="text-sm text-forest/50">
          <p>Pedi·Ai Health Reports</p>
          <p>IAP Clinically Reviewed</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onPrint}
            className="px-4 py-2 text-sm font-medium text-forest hover:bg-white rounded-full transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print
          </button>
          <button
            onClick={onDownload}
            className="px-4 py-2 text-sm font-medium bg-forest text-white hover:bg-forest-light rounded-full transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
