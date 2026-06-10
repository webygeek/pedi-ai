'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    childName: '',
    childDOB: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.childName.trim()) {
      newErrors.childName = "Child's name is required";
    }

    if (!formData.childDOB) {
      newErrors.childDOB = "Child's date of birth is required";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate signup
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, redirect to dashboard
    router.push('/dashboard');
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-forest relative overflow-hidden">
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
              Join thousands of parents who trust Pedi·Ai for their child's health journey.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="text-2xl">👶</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Track From Day One</h3>
                <p className="text-white/70 text-sm">Comprehensive health tracking from birth</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Growth Visualization</h3>
                <p className="text-white/70 text-sm">WHO/CDC standards at your fingertips</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="text-2xl">🏥</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Peace of Mind</h3>
                <p className="text-white/70 text-sm">24/7 AI-powered health guidance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="font-display text-4xl text-forest mb-2">
              Pedi<span className="text-coral">·</span>Ai
            </div>
            <p className="text-forest/60">Create Your Account</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-mist/50">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl text-forest mb-2">Get Started Free</h1>
              <p className="text-forest/60">Start your 30-day free trial today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Parent Info */}
              <div className="pb-4 border-b border-mist/50">
                <h2 className="font-semibold text-forest mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-coral/10 text-coral text-sm flex items-center justify-center">1</span>
                  Parent Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-forest/70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange('name')}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-danger bg-danger-bg' : 'border-mist/50'} bg-white text-forest focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none transition-all`}
                      placeholder="Sarah Mitchell"
                    />
                    {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-forest/70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-danger bg-danger-bg' : 'border-mist/50'} bg-white text-forest focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none transition-all`}
                      placeholder="sarah@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-forest/70 mb-1.5">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange('password')}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.password ? 'border-danger bg-danger-bg' : 'border-mist/50'} bg-white text-forest focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none transition-all`}
                        placeholder="••••••"
                      />
                      {errors.password && <p className="mt-1 text-xs text-danger">{errors.password}</p>}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-forest/70 mb-1.5">
                        Confirm
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        className={`w-full px-4 py-3 rounded-xl border-2 ${errors.confirmPassword ? 'border-danger bg-danger-bg' : 'border-mist/50'} bg-white text-forest focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none transition-all`}
                        placeholder="••••••"
                      />
                      {errors.confirmPassword && <p className="mt-1 text-xs text-danger">{errors.confirmPassword}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Child Info */}
              <div className="pt-4">
                <h2 className="font-semibold text-forest mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-coral/10 text-coral text-sm flex items-center justify-center">2</span>
                  Your Child
                </h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="childName" className="block text-sm font-medium text-forest/70 mb-1.5">
                      Child's Name
                    </label>
                    <input
                      id="childName"
                      type="text"
                      value={formData.childName}
                      onChange={handleChange('childName')}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.childName ? 'border-danger bg-danger-bg' : 'border-mist/50'} bg-white text-forest focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none transition-all`}
                      placeholder="Emma"
                    />
                    {errors.childName && <p className="mt-1 text-xs text-danger">{errors.childName}</p>}
                  </div>

                  <div>
                    <label htmlFor="childDOB" className="block text-sm font-medium text-forest/70 mb-1.5">
                      Date of Birth
                    </label>
                    <input
                      id="childDOB"
                      type="date"
                      value={formData.childDOB}
                      onChange={handleChange('childDOB')}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${errors.childDOB ? 'border-danger bg-danger-bg' : 'border-mist/50'} bg-white text-forest focus:border-sage focus:ring-2 focus:ring-sage/20 focus:outline-none transition-all`}
                    />
                    {errors.childDOB && <p className="mt-1 text-xs text-danger">{errors.childDOB}</p>}
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange('agreeTerms')}
                    className="mt-1 w-4 h-4 rounded border-mist/50 text-sage focus:ring-sage/20"
                  />
                  <span className="text-sm text-forest/70">
                    I agree to the{' '}
                    <a href="#" className="text-sage hover:text-forest font-medium">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-sage hover:text-forest font-medium">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeTerms && <p className="mt-1 text-xs text-danger">{errors.agreeTerms}</p>}
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
                    Creating account...
                  </>
                ) : (
                  'Create My Free Account'
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-forest/60">
              Already have an account?{' '}
              <Link href="/login" className="text-coral hover:text-coral-light font-semibold">
                Sign in
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-forest/40">
            By signing up, you agree to our{' '}
            <a href="#" className="hover:text-forest/60">Terms</a>
            {' '}and{' '}
            <a href="#" className="hover:text-forest/60">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
