'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/lib/auth-context'

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10M12 3L4 7V11C4 16.52 7.39 21.74 12 23C16.61 21.74 20 16.52 20 11V7L12 3Z" fill="#2c4a45" stroke="#2c4a45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
)

const LogoutIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [hasNotifications] = useState(true)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const { session, logout, getActiveChild } = useAuth()
  const activeChild = getActiveChild()

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <header className="sticky top-0 z-30 bg-cream/95 backdrop-blur-xl border-b border-mist/50">
      <div className="flex items-center justify-between gap-4 px-4 lg:px-8 py-4">
        {/* Date Display */}
        <div className="hidden sm:block">
          <p className="text-sm text-forest/60">{currentDate}</p>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-forest/40">
              <SearchIcon />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symptoms, meds..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-mist/50 rounded-full text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all"
            />
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-forest/5 rounded-full border border-forest/10">
          <ShieldIcon />
          <span className="text-xs font-medium text-forest">IAP Reviewed</span>
        </div>

        {/* Notifications */}
        <Link href="/notifications" className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-mist transition-colors">
          <BellIcon />
          {hasNotifications && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-coral rounded-full animate-pulse-dot" />
          )}
        </Link>

        {/* User Profile Menu */}
        {session && (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full hover:bg-mist transition-colors"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-sage/20 flex items-center justify-center">
                <span className="text-lg">{activeChild?.avatar || '👶'}</span>
              </div>

              {/* User info */}
              <div className="hidden lg:block text-left">
                <p className="text-sm font-medium text-forest leading-tight">{session.user.name}</p>
                <p className="text-xs text-forest/50 leading-tight">
                  {activeChild ? `${activeChild.name}, ${Math.floor((Date.now() - new Date(activeChild.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 30))}mo` : 'No child profile'}
                </p>
              </div>

              <ChevronDownIcon />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />

                {/* Menu */}
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-mist/50 z-50 overflow-hidden">
                  {/* User Header */}
                  <div className="p-4 bg-forest/5 border-b border-mist/50">
                    <p className="font-medium text-forest">{session.user.name}</p>
                    <p className="text-sm text-forest/60">{session.user.email}</p>
                  </div>

                  {/* Active Child */}
                  {activeChild && (
                    <div className="p-4 border-b border-mist/50">
                      <p className="text-xs text-forest/50 uppercase tracking-wide mb-2">Active Child</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-xl">
                          {activeChild.avatar || '👶'}
                        </div>
                        <div>
                          <p className="font-medium text-forest">{activeChild.name}</p>
                          <p className="text-sm text-forest/60">
                            {Math.floor((Date.now() - new Date(activeChild.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 30))} months old
                          </p>
                        </div>
                      </div>

                      {/* Other children */}
                      {session.children.length > 1 && (
                        <div className="mt-3 pt-3 border-t border-mist/50">
                          <p className="text-xs text-forest/50 mb-2">Switch child:</p>
                          <div className="flex flex-wrap gap-2">
                            {session.children.filter(c => c.id !== activeChild.id).map(child => (
                              <button
                                key={child.id}
                                className="px-3 py-1.5 text-sm bg-cream rounded-full hover:bg-mist transition-colors flex items-center gap-1.5"
                              >
                                <span>{child.avatar || '👶'}</span>
                                <span>{child.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Menu Items */}
                  <div className="p-2">
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-cream transition-colors text-forest"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <SettingsIcon />
                      <span className="text-sm">Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-danger-bg transition-colors text-danger"
                    >
                      <LogoutIcon />
                      <span className="text-sm">Sign out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
