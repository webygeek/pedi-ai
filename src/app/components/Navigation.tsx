'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './Button'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#pricing', label: 'Pricing' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/98 backdrop-blur-xl shadow-sm border-b border-forest/5'
          : 'bg-cream/90 backdrop-blur-xl border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="font-display text-2xl text-forest">
              Pedi<span className="text-coral">·</span>Ai
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-forest/80 hover:text-forest transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button variant="primary" size="sm">Get Started Free</Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-3 -mr-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-6 bg-forest rounded transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-6 bg-forest rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-forest rounded transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-[72px] left-0 right-0 bg-white shadow-xl transition-all duration-300 z-40 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium text-forest py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-forest/10 space-y-3">
            <Link href="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full">Sign In</Button>
            </Link>
            <Link href="/login" className="block" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
