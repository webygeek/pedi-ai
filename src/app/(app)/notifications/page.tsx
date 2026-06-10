'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-context';
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
  Notification,
} from './lib/notification-store';
import NotificationCard from './components/NotificationCard';

type TabType = 'all' | 'unread' | 'important';

export default function NotificationsPage() {
  const { session } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const userId = session?.user.id || 'demo-user';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setNotifications(getNotifications(userId));
    }
  }, [mounted, userId]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const importantCount = notifications.filter(n => n.priority === 'important' || n.priority === 'high').length;

  const handleMarkAsRead = useCallback((id: string) => {
    setNotifications(markAsRead(userId, id));
  }, [userId]);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(markAllAsRead(userId));
  }, [userId]);

  const handleDelete = useCallback((id: string) => {
    setNotifications(deleteNotification(userId, id));
  }, [userId]);

  const handleNotificationClick = useCallback((notification: Notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      router.push(notification.actionUrl);
    }
  }, [handleMarkAsRead, router]);

  const filteredNotifications = notifications.filter(n => {
    switch (activeTab) {
      case 'unread':
        return !n.read;
      case 'important':
        return n.priority === 'important' || n.priority === 'high';
      default:
        return true;
    }
  });

  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-mist/50 rounded w-1/3"></div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 bg-mist/50 rounded-full w-24"></div>
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-mist/50 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-forest">Notifications</h1>
          <p className="text-forest/60 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up!'
            }
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 text-sm font-medium text-sage hover:text-forest hover:bg-sage/10 rounded-full transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" />
            </svg>
            Mark all as read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-mist/30 rounded-full w-fit">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
            activeTab === 'all'
              ? 'bg-white text-forest shadow-sm'
              : 'text-forest/60 hover:text-forest'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('unread')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
            activeTab === 'unread'
              ? 'bg-white text-forest shadow-sm'
              : 'text-forest/60 hover:text-forest'
          }`}
        >
          Unread
          {unreadCount > 0 && (
            <span className="w-5 h-5 bg-coral text-white text-xs font-semibold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('important')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-all flex items-center gap-2 ${
            activeTab === 'important'
              ? 'bg-white text-forest shadow-sm'
              : 'text-forest/60 hover:text-forest'
          }`}
        >
          Important
          {importantCount > 0 && (
            <span className="w-5 h-5 bg-amber-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              {importantCount}
            </span>
          )}
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDelete}
              onClick={() => handleNotificationClick(notification)}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-mist/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-forest/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </div>
            <h3 className="font-display text-lg text-forest mb-1">
              {activeTab === 'unread' ? 'All read!' : 'No notifications'}
            </h3>
            <p className="text-forest/50 text-sm">
              {activeTab === 'unread'
                ? "You've seen everything. Check back later for updates."
                : "You're all caught up. We'll notify you when something important happens."
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-mist/50">
        <a href="/vaccinations" className="p-4 bg-white rounded-xl border border-mist/50 hover:border-sage/30 hover:shadow-sm transition-all text-center">
          <div className="w-10 h-10 bg-sage/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
          </div>
          <p className="text-sm font-medium text-forest">Vaccinations</p>
        </a>
        <a href="/appointments" className="p-4 bg-white rounded-xl border border-mist/50 hover:border-sage/30 hover:shadow-sm transition-all text-center">
          <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
          </div>
          <p className="text-sm font-medium text-forest">Appointments</p>
        </a>
        <a href="/milestones" className="p-4 bg-white rounded-xl border border-mist/50 hover:border-sage/30 hover:shadow-sm transition-all text-center">
          <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-coral" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-forest">Milestones</p>
        </a>
        <a href="/reports" className="p-4 bg-white rounded-xl border border-mist/50 hover:border-sage/30 hover:shadow-sm transition-all text-center">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
          </div>
          <p className="text-sm font-medium text-forest">Reports</p>
        </a>
      </div>
    </div>
  );
}
