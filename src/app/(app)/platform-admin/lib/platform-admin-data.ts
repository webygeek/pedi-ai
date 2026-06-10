// Demo data for Platform Admin

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: string; // Allow any role string for flexibility
  clinic?: string;
  status: string; // Allow any status for flexibility
  createdAt: string;
  lastLogin: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  ipAddress: string;
  details?: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

// Demo Platform Users
export const DEMO_PLATFORM_USERS: PlatformUser[] = [
  { id: 'u001', name: 'Sarah Mitchell', email: 'anxious@demo.com', role: 'parent', status: 'active', clinic: 'PediAi Main Clinic', createdAt: '2024-01-15', lastLogin: '2026-06-08' },
  { id: 'u002', name: 'Dr. Emily Chen', email: 'dr.chen@pediai.com', role: 'doctor', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2022-03-15', lastLogin: '2026-06-08' },
  { id: 'u003', name: 'James Rodriguez', email: 'james@demo.com', role: 'parent', status: 'active', clinic: 'PediAi Downtown', createdAt: '2024-06-20', lastLogin: '2026-06-07' },
  { id: 'u004', name: 'Maria Thompson', email: 'maria@demo.com', role: 'parent', status: 'active', clinic: 'PediAi South Bay', createdAt: '2023-09-01', lastLogin: '2026-06-06' },
  { id: 'u005', name: 'Dr. Robert Kim', email: 'admin@pediatric-clinic.com', role: 'clinic_admin', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2023-01-01', lastLogin: '2026-06-08' },
  { id: 'u006', name: 'Nurse Lisa Martinez', email: 'lisa.martinez@pediai.com', role: 'nurse', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2022-06-01', lastLogin: '2026-06-08' },
  { id: 'u007', name: 'Michael Brown', email: 'michael.b@demo.com', role: 'parent', status: 'pending', clinic: 'PediAi Downtown', createdAt: '2026-06-05', lastLogin: '-' },
  { id: 'u008', name: 'Dr. Michael Sharma', email: 'dr.sharma@pediai.com', role: 'doctor', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2021-08-20', lastLogin: '2026-06-07' },
  { id: 'u009', name: 'Jennifer Lee', email: 'jennifer.l@demo.com', role: 'parent', status: 'active', clinic: 'PediAi Main Clinic', createdAt: '2024-02-10', lastLogin: '2026-06-05' },
  { id: 'u010', name: 'Nurse Amanda Brown', email: 'amanda.brown@pediai.com', role: 'nurse', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2021-11-15', lastLogin: '2026-06-08' },
  { id: 'u011', name: 'David Wilson', email: 'david.w@demo.com', role: 'parent', status: 'suspended', clinic: 'PediAi South Bay', createdAt: '2023-05-20', lastLogin: '2026-05-15' },
  { id: 'u012', name: 'Dr. Sarah Johnson', email: 'dr.johnson@pediai.com', role: 'doctor', clinic: 'PediAi Downtown', status: 'active', createdAt: '2023-01-10', lastLogin: '2026-06-08' },
  { id: 'u013', name: 'Lisa Anderson', email: 'lisa.a@demo.com', role: 'parent', status: 'active', clinic: 'PediAi Main Clinic', createdAt: '2024-03-05', lastLogin: '2026-06-06' },
  { id: 'u014', name: 'Dr. Priya Patel', email: 'dr.patel@pediai.com', role: 'doctor', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2020-09-01', lastLogin: '2026-06-07' },
  { id: 'u015', name: 'Robert Garcia', email: 'robert.g@demo.com', role: 'parent', status: 'inactive', clinic: 'PediAi Downtown', createdAt: '2022-11-15', lastLogin: '2026-04-01' },
  { id: 'u016', name: 'Platform Admin', email: 'admin@pedi-ai.com', role: 'platform_admin', status: 'active', createdAt: '2020-01-01', lastLogin: '2026-06-08' },
  { id: 'u017', name: 'Susan Clark', email: 'susan.c@demo.com', role: 'parent', status: 'active', clinic: 'PediAi South Bay', createdAt: '2024-08-12', lastLogin: '2026-06-05' },
  { id: 'u018', name: 'Nurse James Wilson', email: 'james.wilson@pediai.com', role: 'nurse', clinic: 'PediAi Main Clinic', status: 'on_leave', createdAt: '2023-04-20', lastLogin: '2026-06-01' },
  { id: 'u019', name: 'Maria Garcia', email: 'maria.garcia@pediai.com', role: 'receptionist', clinic: 'PediAi Main Clinic', status: 'active', createdAt: '2022-01-05', lastLogin: '2026-06-08' },
  { id: 'u020', name: 'Kevin Martinez', email: 'kevin.m@demo.com', role: 'parent', status: 'active', clinic: 'PediAi Main Clinic', createdAt: '2024-09-18', lastLogin: '2026-06-07' },
  { id: 'u021', name: 'Amanda White', email: 'amanda.w@demo.com', role: 'parent', status: 'pending', clinic: 'PediAi Downtown', createdAt: '2026-06-07', lastLogin: '-' },
  { id: 'u022', name: 'Chris Taylor', email: 'chris.t@demo.com', role: 'parent', status: 'active', clinic: 'PediAi South Bay', createdAt: '2024-04-22', lastLogin: '2026-06-06' },
];

// Demo Audit Logs
export const generateAuditLogs = (): AuditLogEntry[] => {
  const actions = [
    { action: 'LOGIN', resource: 'Authentication' },
    { action: 'CREATE', resource: 'User Account' },
    { action: 'UPDATE', resource: 'User Profile' },
    { action: 'DELETE', resource: 'User Account' },
    { action: 'SUSPEND', resource: 'User Account' },
    { action: 'ACTIVATE', resource: 'User Account' },
    { action: 'LOGIN', resource: 'Authentication' },
    { action: 'CREATE', resource: 'Clinic' },
    { action: 'UPDATE', resource: 'Clinic Settings' },
    { action: 'EXPORT', resource: 'Reports' },
    { action: 'VIEW', resource: 'Audit Logs' },
    { action: 'CREATE', resource: 'Staff Member' },
    { action: 'UPDATE', resource: 'Staff Role' },
    { action: 'DELETE', resource: 'Staff Member' },
    { action: 'VIEW', resource: 'Analytics' },
  ];

  const users = [
    { id: 'u016', name: 'Platform Admin', role: 'platform_admin' },
    { id: 'u005', name: 'Dr. Robert Kim', role: 'clinic_admin' },
    { id: 'u002', name: 'Dr. Emily Chen', role: 'doctor' },
    { id: 'u006', name: 'Nurse Lisa Martinez', role: 'nurse' },
    { id: 'u001', name: 'Sarah Mitchell', role: 'parent' },
  ];

  const ips = ['192.168.1.100', '10.0.0.45', '172.16.0.23', '192.168.2.55', '10.0.1.78'];

  const logs: AuditLogEntry[] = [];
  const now = new Date();

  for (let i = 0; i < 60; i++) {
    const actionData = actions[Math.floor(Math.random() * actions.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const timestamp = new Date(now.getTime() - i * 3600000 * Math.random() * 2);

    logs.push({
      id: `log_${i.toString().padStart(3, '0')}`,
      timestamp: timestamp.toISOString(),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: actionData.action,
      resource: actionData.resource,
      ipAddress: ips[Math.floor(Math.random() * ips.length)],
      details: i % 5 === 0 ? 'Additional context note' : undefined,
    });
  }

  return logs;
};

export const DEMO_AUDIT_LOGS = generateAuditLogs();

// Demo Alerts
export const DEMO_ALERTS: Alert[] = [
  { id: 'alert_001', type: 'warning', title: 'Pending User Approvals', message: '5 user accounts require verification', timestamp: '2026-06-08T09:00:00Z' },
  { id: 'alert_002', type: 'error', title: 'System Error', message: '3 failed login attempts detected', timestamp: '2026-06-08T08:30:00Z' },
  { id: 'alert_003', type: 'info', title: 'Scheduled Maintenance', message: 'System update scheduled for June 10, 2:00 AM', timestamp: '2026-06-07T18:00:00Z' },
  { id: 'alert_004', type: 'warning', title: 'Storage Warning', message: 'Database storage at 75% capacity', timestamp: '2026-06-06T12:00:00Z' },
];

// Platform Stats
export const getPlatformStats = () => ({
  totalUsers: 2350,
  activeClinics: 3,
  totalAppointments: 12450,
  issuesReported: 12,
});