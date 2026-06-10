'use client';

import React from 'react';
import { Notification, NotificationType } from '../lib/notification-store';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClick?: () => void;
}

// Icon components for notification types
const VaccinationIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const MilestoneIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const AppointmentIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SystemIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const getNotificationIcon = (type: NotificationType): React.ReactNode => {
  switch (type) {
    case 'vaccination_reminder':
      return <VaccinationIcon />;
    case 'milestone_alert':
      return <MilestoneIcon />;
    case 'appointment_reminder':
      return <AppointmentIcon />;
    case 'message':
      return <MessageIcon />;
    case 'system':
      return <SystemIcon />;
    default:
      return <SystemIcon />;
  }
};

const getNotificationColors = (type: NotificationType) => {
  switch (type) {
    case 'vaccination_reminder':
      return { bg: 'bg-sage/10', icon: 'text-sage', border: 'border-sage/20' };
    case 'milestone_alert':
      return { bg: 'bg-coral/10', icon: 'text-coral', border: 'border-coral/20' };
    case 'appointment_reminder':
      return { bg: 'bg-forest/10', icon: 'text-forest', border: 'border-forest/20' };
    case 'message':
      return { bg: 'bg-blue-50', icon: 'text-blue-500', border: 'border-blue-200' };
    case 'system':
      return { bg: 'bg-gray-100', icon: 'text-gray-500', border: 'border-gray-200' };
    default:
      return { bg: 'bg-gray-100', icon: 'text-gray-500', border: 'border-gray-200' };
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'important':
      return <span className="px-2 py-0.5 bg-danger-bg text-danger text-xs font-semibold rounded-full">Important</span>;
    case 'high':
      return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">High</span>;
    case 'normal':
      return null;
    case 'low':
      return <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">Low</span>;
    default:
      return null;
  }
};

const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function NotificationCard({
  notification,
  onMarkAsRead,
  onDelete,
  onClick
}: NotificationCardProps) {
  const colors = getNotificationColors(notification.type);
  const isUnread = !notification.read;

  return (
    <div
      className={`relative group transition-all duration-200 ${
        isUnread
          ? 'bg-white border-l-4 border-l-coral shadow-sm'
          : 'bg-white/50 hover:bg-white'
      } rounded-2xl border border-mist/50 p-4`}
    >
      {/* Unread indicator */}
      {isUnread && (
        <div className="absolute top-4 right-4">
          <div className="w-2 h-2 rounded-full bg-coral" />
        </div>
      )}

      <div className="flex gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.bg} ${colors.icon} flex items-center justify-center`}>
          {getNotificationIcon(notification.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`font-semibold text-forest ${!isUnread ? 'text-forest/70' : ''}`}>
              {notification.title}
            </h3>
            {getPriorityBadge(notification.priority)}
          </div>

          <p className={`text-sm mb-2 ${isUnread ? 'text-forest/70' : 'text-forest/50'}`}>
            {notification.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-forest/40">
              {formatRelativeTime(notification.timestamp)}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {isUnread && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                  className="p-1.5 text-forest/50 hover:text-sage hover:bg-sage/10 rounded-lg transition-colors"
                  title="Mark as read"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification.id);
                }}
                className="p-1.5 text-forest/50 hover:text-danger hover:bg-danger-bg rounded-lg transition-colors"
                title="Delete"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clickable overlay */}
      {notification.actionUrl && (
        <div
          className="absolute inset-0 rounded-2xl cursor-pointer"
          onClick={onClick}
        />
      )}
    </div>
  );
}
