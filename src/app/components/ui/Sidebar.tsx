'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface NavSection {
  title: string
  items: NavItem[]
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
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
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

const AddChildIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
)

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

const AvatarIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#e8efee"/>
    <circle cx="50" cy="38" r="18" fill="#7bada6"/>
    <ellipse cx="50" cy="78" rx="28" ry="20" fill="#7bada6"/>
  </svg>
)

const StreakIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8 8 6 12 8 16C10 20 14 22 18 22C18 18 16 14 14 10C20 12 22 16 22 20C22 10 18 4 12 2Z" fill="#c04f7a"/>
  </svg>
)

// Sample child data
const sampleChild = {
  name: 'Aarav Sharma',
  age: '2 years 4 months',
  weight: '12.5 kg',
  avatar: null
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const [role, setRole] = useState<'parent' | 'clinician'>('parent')
  const pathname = usePathname()

  const navigationSections: NavSection[] = [
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
      title: 'Account',
      items: [
        { label: 'AI Consultant', href: '/consultant', icon: <SettingsIcon /> },
        { label: 'Add Child', href: '/add-child', icon: <AddChildIcon /> },
      ],
    },
  ]

  const isActive = (href: string) => pathname === href

  const sidebarContent = (
    <div className="flex flex-col h-full w-72 bg-white border-r border-mist/50">
      {/* Logo */}
      <div className="p-5 border-b border-mist/50">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold text-forest">
            Pedi<span className="text-coral">·</span>Ai
          </span>
        </Link>
      </div>

      {/* Role Switcher */}
      <div className="p-4">
        <div className="flex gap-2 p-1 bg-mist/50 rounded-full">
          <button
            onClick={() => setRole('parent')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              role === 'parent'
                ? 'bg-forest text-white shadow-sm'
                : 'text-forest/70 hover:text-forest'
            }`}
          >
            Parent
          </button>
          <button
            onClick={() => setRole('clinician')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              role === 'clinician'
                ? 'bg-forest text-white shadow-sm'
                : 'text-forest/70 hover:text-forest'
            }`}
          >
            Clinician
          </button>
        </div>
      </div>

      {/* Child Profile Card */}
      <div className="mx-4 mb-4 p-4 bg-gradient-to-br from-mist/30 to-cream rounded-2xl border border-mist/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <AvatarIcon />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-forest truncate">{sampleChild.name}</p>
            <p className="text-sm text-forest/60">{sampleChild.age}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-forest/60">Weight</span>
          <span className="font-medium text-forest">{sampleChild.weight}</span>
        </div>
      </div>

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

      {/* Streak Counter */}
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

      {/* Emergency Button */}
      <div className="p-4 border-t border-mist/50">
        <Link href="/emergency" className="block w-full py-3 px-4 bg-red-50 text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
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
