'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth-context';
import { DEMO_CREDENTIALS, DEMO_ACCOUNTS_LIST } from '@/app/lib/demo-data';
import { UserRole } from '@/app/types/users';

// Helper to get dashboard route based on user role
const getDashboardRoute = (role: UserRole): string => {
  switch (role) {
    case 'doctor':
      return '/doctor';
    case 'nurse':
      return '/nurse';
    case 'clinic_admin':
      return '/clinic-admin';
    case 'platform_admin':
      return '/platform-admin';
    case 'parent':
    default:
      return '/dashboard';
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading, session } = useAuth();

  // Redirect if already authenticated based on role
  useEffect(() => {
    if (!authLoading && isAuthenticated && session) {
      const redirectTo = getDashboardRoute(session.userRole as UserRole);
      router.push(redirectTo);
    }
  }, [isAuthenticated, authLoading, router, session]);

  const handleDemoSelect = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setSelectedDemo(demoEmail);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Login - this updates the session in auth context
      const success = await login(email, password);

      if (!success) {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
        return;
      }

      // Find the role from DEMO_ACCOUNTS_LIST to get the correct role for redirect
      const demoAccount = DEMO_ACCOUNTS_LIST.find(
        acc => acc.email.toLowerCase() === email.toLowerCase()
      );
      const role = demoAccount?.userRole as UserRole || 'parent';
      const redirectTo = getDashboardRoute(role);

      // Immediate redirect
      router.push(redirectTo);
    } catch {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sage border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-forest relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-coral rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sage rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-white">
          <div className="mb-12">
            <div className="font-display text-5xl xl:text-6xl mb-4">
              Pedi<span className="text-coral">·</span>Ai
            </div>
            <p className="text-xl text-white/80 max-w-md">
              AI-powered pediatric care for the first 2,000 days of life.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Evidence-Based Guidance</h3>
                <p className="text-white/70 text-sm">Powered by AAP and WHO guidelines</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">24/7 AI Support</h3>
                <p className="text-white/70 text-sm">Expert answers whenever you need them</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 8.4m0 0L12.75 6.75m0 0l3 3m-3-3l.75.75M12 16.5V19.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Track Growth & Milestones</h3>
                <p className="text-white/70 text-sm">Monitor your child's development</p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-lg text-sm">
              HIPAA Compliant
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-lg text-sm">
              IAP Reviewed
            </div>
            <div className="px-4 py-2 bg-white/10 rounded-lg text-sm">
              WHO Standards
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="font-display text-4xl text-forest mb-2">
              Pedi<span className="text-coral">·</span>Ai
            </div>
            <p className="text-forest/60">AI-Powered Pediatric Care</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-mist/50">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl text-forest mb-2">Welcome Back</h1>
              <p className="text-forest/60">Sign in to continue to your dashboard</p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-danger-bg border border-danger/30 rounded-xl flex items-center gap-3">
                <svg className="w-5 h-5 text-danger flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm text-danger">{error}</span>
              </div>
            )}

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-forest/70 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-mist/50 bg-white text-forest placeholder:text-forest/40 focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-forest/70 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-mist/50 bg-white text-forest placeholder:text-forest/40 focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none transition-all pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/50 hover:text-forest transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-mist/50 text-sage focus:ring-sage/20"
                  />
                  <span className="text-forest/70">Remember me</span>
                </label>
                <a href="#" className="text-sage hover:text-forest font-medium">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-coral text-white font-semibold rounded-xl hover:bg-coral-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-coral/25"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-8 pt-6 border-t border-mist/50">
              <p className="text-sm text-center text-forest/60 mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-sage rounded-full animate-pulse"></span>
                  Demo Accounts — Click to auto-fill
                </span>
              </p>
              <div className="space-y-2">
                {DEMO_CREDENTIALS.map((demo) => (
                  <button
                    key={demo.email}
                    type="button"
                    onClick={() => handleDemoSelect(demo.email, demo.password)}
                    className={`w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center gap-3 ${
                      selectedDemo === demo.email
                        ? 'bg-sage/10 border-2 border-sage'
                        : 'bg-cream/50 border-2 border-transparent hover:border-sage/30 hover:bg-sage/5'
                    }`}
                  >
                    <span className="text-xl">{demo.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-forest text-sm truncate">{demo.email}</p>
                      <p className="text-xs text-forest/60 truncate">{demo.description}</p>
                    </div>
                    <svg className={`w-4 h-4 flex-shrink-0 transition-colors ${
                      selectedDemo === demo.email ? 'text-sage' : 'text-forest/30'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-forest/60">
              Don't have an account?{' '}
              <Link href="/signup" className="text-coral hover:text-coral-light font-semibold">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-forest/40">
            By signing in, you agree to our{' '}
            <a href="#" className="hover:text-forest/60">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="hover:text-forest/60">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
