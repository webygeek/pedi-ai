'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/app/lib/auth-context'
import { IsDoctor, IsNurse, IsClinicAdmin, IsPlatformAdmin, IsParent } from '@/app/lib/rbac'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface NavSection {
  title: string
  items: NavItem[]
  roles?: ('parent' | 'doctor' | 'nurse' | 'clinic_admin' | 'platform_admin')[]
}

// Icon components
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const SymptomIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const DosageIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
)

const MilestoneIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const VaccineIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const HistoryIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const LogIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
)

const EmergencyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const NotificationIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

const ReportIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
)

const AddChildIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
)

const StreakIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 8 6 12 8 16C10 20 14 22 18 22C18 18 16 14 14 10C20 12 22 16 22 20C22 10 18 4 12 2Z" fill="#c04f7a"/>
  </svg>
)

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { session, getActiveChild, userRole } = useAuth()
  const activeChild = getActiveChild()
  const [sidebarOpen, setSidebarOpen] = useState(isOpen)

  // Helper to check role
  const isDoctorUser = userRole === 'doctor'
  const isNurseUser = userRole === 'nurse'
  const isClinicAdminUser = userRole === 'clinic_admin'
  const isPlatformAdminUser = userRole === 'platform_admin'
  const isParentUser = userRole === 'parent' || !userRole // Default to parent view if no role

  // Parent navigation
  const parentNavigation: NavSection[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: '/dashboard', icon: <HomeIcon /> },
        { label: 'Symptom Check', href: '/symptom-check', icon: <SymptomIcon /> },
        { label: 'Growth Charts', href: '/growth-charts', icon: <ChartIcon /> },
        { label: 'Dosage Calculator', href: '/dosage-calculator', icon: <DosageIcon /> },
        { label: 'Emergency Guide', href: '/emergency', icon: <EmergencyIcon /> },
      ],
    },
    {
      title: 'Child Health',
      items: [
        { label: 'Milestones', href: '/milestones', icon: <MilestoneIcon /> },
        { label: 'Vaccinations', href: '/vaccinations', icon: <VaccineIcon /> },
        { label: 'Medical History', href: '/medical-history', icon: <HistoryIcon /> },
        { label: 'Medicine Cabinet', href: '/medicine-cabinet', icon: <LogIcon /> },
      ],
    },
    {
      title: 'Family & Support',
      items: [
        { label: 'Caregiver Access', href: '/caregiver', icon: <UsersIcon /> },
        { label: 'AI Consultant', href: '/ai-consultant', icon: <SettingsIcon /> },
        { label: 'Add Child', href: '/add-child', icon: <AddChildIcon /> },
      ],
    },
    {
      title: 'Scheduling',
      items: [
        { label: 'Appointments', href: '/appointments', icon: <CalendarIcon /> },
        { label: 'Reports', href: '/reports', icon: <ReportIcon /> },
        { label: 'Notifications', href: '/notifications', icon: <NotificationIcon /> },
      ],
    },
  ]

  // Doctor navigation
  const doctorNavigation: NavSection[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: '/doctor', icon: <HomeIcon /> },
        { label: 'My Patients', href: '/doctor/patients', icon: <UsersIcon /> },
        { label: 'Appointments', href: '/doctor/appointments', icon: <CalendarIcon /> },
      ],
    },
    {
      title: 'Patient Care',
      items: [
        { label: 'Growth Charts', href: '/growth-charts', icon: <ChartIcon /> },
        { label: 'Vaccinations', href: '/vaccinations', icon: <VaccineIcon /> },
        { label: 'Medical History', href: '/medical-history', icon: <HistoryIcon /> },
        { label: 'AI Consultant', href: '/ai-consultant', icon: <SettingsIcon /> },
      ],
    },
    {
      title: 'Settings',
      items: [
        { label: 'Notifications', href: '/notifications', icon: <NotificationIcon /> },
        { label: 'Emergency Guide', href: '/emergency', icon: <EmergencyIcon /> },
      ],
    },
  ]

  // Nurse navigation
  const nurseNavigation: NavSection[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: '/nurse', icon: <HomeIcon /> },
        { label: 'Patients', href: '/nurse/patients', icon: <UsersIcon /> },
        { label: 'Record Vitals', href: '/nurse/vitals', icon: <ChartIcon /> },
        { label: 'Tasks', href: '/nurse/tasks', icon: <LogIcon /> },
      ],
    },
    {
      title: 'Patient Care',
      items: [
        { label: 'Growth Charts', href: '/growth-charts', icon: <ChartIcon /> },
        { label: 'Vaccinations', href: '/vaccinations', icon: <VaccineIcon /> },
        { label: 'Medical History', href: '/medical-history', icon: <HistoryIcon /> },
      ],
    },
    {
      title: 'Settings',
      items: [
        { label: 'Notifications', href: '/notifications', icon: <NotificationIcon /> },
        { label: 'Emergency Guide', href: '/emergency', icon: <EmergencyIcon /> },
      ],
    },
  ]

  // Clinic Admin navigation
  const clinicAdminNavigation: NavSection[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: '/clinic-admin', icon: <HomeIcon /> },
        { label: 'Staff', href: '/clinic-admin/staff', icon: <UsersIcon /> },
        { label: 'Clinics', href: '/clinic-admin/clinics', icon: <ChartIcon /> },
        { label: 'Reports', href: '/clinic-admin/reports', icon: <ReportIcon /> },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Patients', href: '/clinic-admin/patients', icon: <LogIcon /> },
        { label: 'AI Consultant', href: '/ai-consultant', icon: <SettingsIcon /> },
      ],
    },
    {
      title: 'Settings',
      items: [
        { label: 'Notifications', href: '/notifications', icon: <NotificationIcon /> },
        { label: 'Emergency Guide', href: '/emergency', icon: <EmergencyIcon /> },
      ],
    },
  ]

  // Platform Admin navigation
  const platformAdminNavigation: NavSection[] = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', href: '/platform-admin', icon: <HomeIcon /> },
        { label: 'Users', href: '/platform-admin/users', icon: <UsersIcon /> },
        { label: 'Audit Logs', href: '/platform-admin/audit', icon: <LogIcon /> },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'AI Consultant', href: '/ai-consultant', icon: <SettingsIcon /> },
      ],
    },
    {
      title: 'Settings',
      items: [
        { label: 'Notifications', href: '/notifications', icon: <NotificationIcon /> },
        { label: 'Emergency Guide', href: '/emergency', icon: <EmergencyIcon /> },
      ],
    },
  ]

  // Select navigation based on role
  const getNavigation = () => {
    if (isDoctorUser) return doctorNavigation
    if (isNurseUser) return nurseNavigation
    if (isClinicAdminUser) return clinicAdminNavigation
    if (isPlatformAdminUser) return platformAdminNavigation
    return parentNavigation
  }

  const navigationSections = getNavigation()

  const isActive = (href: string) => pathname === href

  // Calculate child age
  const getChildAge = (dateOfBirth: string) => {
    const birth = new Date(dateOfBirth)
    const now = new Date()
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth())
    if (months < 12) {
      return `${months} months`
    }
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    return remainingMonths > 0 ? `${years} year${years > 1 ? 's' : ''} ${remainingMonths} months` : `${years} year${years > 1 ? 's' : ''}`
  }

  const sidebarContent = (
    <div className="flex flex-col h-full w-72 bg-white border-r border-mist/50">
      {/* Logo */}
      <div className="p-5 border-b border-mist/50">
        <Link href={isDoctorUser ? '/doctor' : isNurseUser ? '/nurse' : isClinicAdminUser ? '/clinic-admin' : isPlatformAdminUser ? '/platform-admin' : '/dashboard'} className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold text-forest">
            Pedi<span className="text-coral">·</span>Ai
          </span>
        </Link>
        {/* Role Badge */}
        {userRole && (
          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-sage/20 text-forest rounded-full">
            {userRole.replace('_', ' ')}
          </span>
        )}
      </div>

      {/* Child Profile Card - Only for Parents */}
      {activeChild && isParentUser && (
        <div className="mx-4 my-4 p-4 bg-gradient-to-br from-mist/30 to-cream rounded-2xl border border-mist/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-2xl">
              {activeChild.avatar || '👶'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-forest truncate">{activeChild.name}</p>
              <p className="text-sm text-forest/60">{getChildAge(activeChild.dateOfBirth)}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="bg-white/60 rounded-lg p-2 text-center">
              <p className="text-xs text-forest/60">Weight</p>
              <p className="font-medium text-forest">{activeChild.weight} kg</p>
            </div>
            <div className="bg-white/60 rounded-lg p-2 text-center">
              <p className="text-xs text-forest/60">Height</p>
              <p className="font-medium text-forest">{activeChild.height} cm</p>
            </div>
          </div>
          {activeChild.conditions && activeChild.conditions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {activeChild.conditions.map((condition, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                  {condition}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Other Children Indicator */}
      {session && session.children.length > 1 && (
        <div className="mx-4 mb-4 p-3 bg-coral/5 rounded-xl border border-coral/20">
          <p className="text-xs text-forest/60 mb-2">Other children:</p>
          <div className="flex flex-wrap gap-2">
            {session.children.filter(c => c.id !== activeChild?.id).map(child => (
              <span key={child.id} className="px-2 py-1 bg-white rounded-full text-sm flex items-center gap-1">
                <span>{child.avatar || '👶'}</span>
                <span className="text-forest">{child.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-4">
            <h3 className="section-label px-3 mb-2">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive(item.href)
                        ? 'bg-sage/15 text-forest font-medium'
                        : 'text-forest/70 hover:bg-mist/50 hover:text-forest'
                    }`}
                  >
                    <span className={isActive(item.href) ? 'text-coral' : 'text-forest/50'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Streak Counter - Only for Parents */}
      {isParentUser && (
        <div className="mx-4 mb-4 p-3 bg-gradient-to-r from-coral/10 to-coral/5 rounded-xl border border-coral/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-coral/10 rounded-full flex items-center justify-center">
              <StreakIcon />
            </div>
            <div>
              <p className="font-semibold text-forest">7 Day Streak</p>
              <p className="text-xs text-forest/60">Keep tracking daily!</p>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Button */}
      <div className="p-4 border-t border-mist/50">
        <Link href="/emergency" className="block w-full py-3 px-4 bg-danger-bg text-danger rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-danger-bg/70 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Emergency Guide
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-72 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-forest/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={onClose}
        className="lg:hidden fixed top-4 left-4 z-40 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
      >
        <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  )
}
