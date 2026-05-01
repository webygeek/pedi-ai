'use client'

import { useState } from 'react'

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

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [hasNotifications] = useState(true)

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

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
          <span className="text-xs font-medium text-forest">IAP Clinically Reviewed</span>
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-mist transition-colors">
          <BellIcon />
          {hasNotifications && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-coral rounded-full animate-pulse-dot" />
          )}
        </button>
      </div>
    </header>
  )
}
