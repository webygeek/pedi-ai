// Notification store for managing notifications with localStorage persistence

export type NotificationType =
  | 'vaccination_reminder'
  | 'milestone_alert'
  | 'appointment_reminder'
  | 'message'
  | 'system';

export type NotificationPriority = 'low' | 'normal' | 'high' | 'important';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  relatedId?: string;
  actionUrl?: string;
}

const STORAGE_KEY = 'pedi_ai_notifications';

// Demo notifications generator
function generateDemoNotifications(userId: string): Notification[] {
  const now = new Date();

  const notifications: Notification[] = [
    {
      id: 'notif-1',
      userId,
      type: 'vaccination_reminder',
      priority: 'high',
      title: 'Vaccination Due Tomorrow',
      description: 'MMR Vaccine (2nd dose) is scheduled for tomorrow at 10:00 AM with Dr. Sarah Chen.',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: '/vaccinations',
    },
    {
      id: 'notif-2',
      userId,
      type: 'milestone_alert',
      priority: 'normal',
      title: 'New Milestone Achieved!',
      description: 'Emma has started walking independently! Track this milestone in her development records.',
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: '/milestones',
    },
    {
      id: 'notif-3',
      userId,
      type: 'appointment_reminder',
      priority: 'important',
      title: 'Appointment Reminder',
      description: 'Reminder: Annual checkup scheduled for June 15, 2026 at Children\'s Health Clinic.',
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: '/appointments',
    },
    {
      id: 'notif-4',
      userId,
      type: 'system',
      priority: 'low',
      title: 'Weekly Health Summary Ready',
      description: 'Your weekly health summary for Emma is now available. View growth trends and activity insights.',
      timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/reports',
    },
    {
      id: 'notif-5',
      userId,
      type: 'vaccination_reminder',
      priority: 'normal',
      title: 'Vaccination Records Updated',
      description: 'Dr. Chen has updated Emma\'s vaccination records with the latest flu shot information.',
      timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/vaccinations',
    },
    {
      id: 'notif-6',
      userId,
      type: 'message',
      priority: 'normal',
      title: 'Message from Dr. Sarah Chen',
      description: 'Dr. Chen sent a message regarding Emma\'s recent growth chart analysis.',
      timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/consultant',
    },
    {
      id: 'notif-7',
      userId,
      type: 'milestone_alert',
      priority: 'low',
      title: 'Milestone Check Reminder',
      description: 'Time for Emma\'s 18-month developmental screening. Check her progress on key milestones.',
      timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: '/milestones',
    },
    {
      id: 'notif-8',
      userId,
      type: 'appointment_reminder',
      priority: 'high',
      title: 'Appointment Rescheduled',
      description: 'Your appointment on June 20 has been moved to June 22 due to doctor availability.',
      timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/appointments',
    },
    {
      id: 'notif-9',
      userId,
      type: 'system',
      priority: 'normal',
      title: 'App Updated',
      description: 'Pedi·Ai has been updated to version 2.1 with improved growth charts and new features.',
      timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'notif-10',
      userId,
      type: 'vaccination_reminder',
      priority: 'important',
      title: 'Overdue Vaccination',
      description: 'Hepatitis B (3rd dose) was due 5 days ago. Please schedule an appointment soon.',
      timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: '/appointments',
    },
    {
      id: 'notif-11',
      userId,
      type: 'message',
      priority: 'normal',
      title: 'Lab Results Available',
      description: 'Emma\'s blood test results from June 1 are now available. View them in your reports.',
      timestamp: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/reports',
    },
    {
      id: 'notif-12',
      userId,
      type: 'milestone_alert',
      priority: 'normal',
      title: 'First Words Detected',
      description: 'Emma said "mama" and "dada" this week! This is an exciting language development milestone.',
      timestamp: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/milestones',
    },
    {
      id: 'notif-13',
      userId,
      type: 'system',
      priority: 'low',
      title: 'Data Backup Complete',
      description: 'Your child\'s health data has been automatically backed up securely.',
      timestamp: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: 'notif-14',
      userId,
      type: 'vaccination_reminder',
      priority: 'normal',
      title: 'Vaccination Certificate Ready',
      description: 'Your vaccination certificate for Emma is ready to download from Reports.',
      timestamp: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
      actionUrl: '/reports',
    },
    {
      id: 'notif-15',
      userId,
      type: 'appointment_reminder',
      priority: 'high',
      title: 'Checkup Summary Available',
      description: 'View the summary from Emma\'s June 5 checkup including growth measurements and notes.',
      timestamp: new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/medical-history',
    },
    {
      id: 'notif-16',
      userId,
      type: 'milestone_alert',
      priority: 'low',
      title: 'Sleep Pattern Update',
      description: 'Based on health logs, Emma\'s sleep patterns have improved this week. Great job!',
      timestamp: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/medical-history',
    },
    {
      id: 'notif-17',
      userId,
      type: 'message',
      priority: 'normal',
      title: 'Medicine Reminder Set',
      description: 'Reminder: Amoxicillin course for Emma ends on June 20. Don\'t forget the last dose.',
      timestamp: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      actionUrl: '/medicine-cabinet',
    },
    {
      id: 'notif-18',
      userId,
      type: 'system',
      priority: 'important',
      title: 'Security Alert',
      description: 'A new device logged into your Pedi·Ai account. If this wasn\'t you, please secure your account.',
      timestamp: new Date(now.getTime() - 16 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
  ];

  return notifications;
}

// Get notifications for a user
export function getNotifications(userId: string): Notification[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return generateDemoNotifications(userId);
    }
  }

  // Initialize with demo data
  const demo = generateDemoNotifications(userId);
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(demo));
  return demo;
}

// Save notifications
function saveNotifications(userId: string, notifications: Notification[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(notifications));
}

// Mark notification as read
export function markAsRead(userId: string, notificationId: string): Notification[] {
  const notifications = getNotifications(userId);
  const updated = notifications.map(n =>
    n.id === notificationId ? { ...n, read: true } : n
  );
  saveNotifications(userId, updated);
  return updated;
}

// Mark all notifications as read
export function markAllAsRead(userId: string): Notification[] {
  const notifications = getNotifications(userId);
  const updated = notifications.map(n => ({ ...n, read: true }));
  saveNotifications(userId, updated);
  return updated;
}

// Delete notification
export function deleteNotification(userId: string, notificationId: string): Notification[] {
  const notifications = getNotifications(userId);
  const updated = notifications.filter(n => n.id !== notificationId);
  saveNotifications(userId, updated);
  return updated;
}

// Get unread count
export function getUnreadCount(userId: string): number {
  const notifications = getNotifications(userId);
  return notifications.filter(n => !n.read).length;
}

// Get notifications by type
export function getNotificationsByType(userId: string, type: NotificationType): Notification[] {
  const notifications = getNotifications(userId);
  return notifications.filter(n => n.type === type);
}

// Get unread notifications
export function getUnreadNotifications(userId: string): Notification[] {
  const notifications = getNotifications(userId);
  return notifications.filter(n => !n.read);
}

// Get important notifications
export function getImportantNotifications(userId: string): Notification[] {
  const notifications = getNotifications(userId);
  return notifications.filter(n => n.priority === 'important' || n.priority === 'high');
}

// Add a new notification
export function addNotification(userId: string, notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Notification[] {
  const notifications = getNotifications(userId);
  const newNotification: Notification = {
    ...notification,
    id: `notif-${Date.now()}`,
    timestamp: new Date().toISOString(),
    read: false,
  };
  const updated = [newNotification, ...notifications];
  saveNotifications(userId, updated);
  return updated;
}
