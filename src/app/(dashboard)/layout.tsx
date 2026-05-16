'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/app/components/ui/Sidebar'
import Topbar from '@/app/components/ui/Topbar'
import BottomNav from '@/app/components/ui/BottomNav'
import ProtectedRoute from '@/app/components/ProtectedRoute'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-cream">
        {/* Desktop Sidebar */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <div className="lg:pl-72">
          {/* Topbar */}
          <Topbar />

          {/* Page Content */}
          <main className="p-4 lg:p-8 pb-28 lg:pb-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        {/* Bottom Navigation - Mobile */}
        <BottomNav />
      </div>
    </ProtectedRoute>
  )
}
