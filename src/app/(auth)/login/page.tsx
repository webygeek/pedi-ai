'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, DEMO_CREDENTIALS } from '@/app/context/AuthContext';
import { Mail, Lock, User, Stethoscope, AlertCircle, Loader2, Shield } from 'lucide-react';

type Role = 'parent' | 'doctor' | 'admin';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('parent');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login({ email, password });

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
    setIsLoading(false);
  };

  const handleDemoLogin = (role: Role) => {
    const credentials = DEMO_CREDENTIALS[role];
    setEmail(credentials.email);
    setPassword(credentials.password);
    setSelectedRole(role);
    setError('');
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Pedi·Ai</h1>
        <p className="text-white/70">AI-Powered Pediatric Care</p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-[#2c4a45] mb-6 text-center">Welcome Back</h2>

        {/* Role Selector */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => handleDemoLogin('parent')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl border-2 transition-all ${
              selectedRole === 'parent'
                ? 'border-[#2c4a45] bg-[#2c4a45]/5 text-[#2c4a45]'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="font-medium text-sm">Parent</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('doctor')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl border-2 transition-all ${
              selectedRole === 'doctor'
                ? 'border-[#2c4a45] bg-[#2c4a45]/5 text-[#2c4a45]'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span className="font-medium text-sm">Doctor</span>
          </button>
          <button
            type="button"
            onClick={() => handleDemoLogin('admin')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl border-2 transition-all ${
              selectedRole === 'admin'
                ? 'border-[#2c4a45] bg-[#2c4a45]/5 text-[#2c4a45]'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="font-medium text-sm">Admin</span>
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="bg-[#2c4a45]/5 rounded-xl p-4 mb-6">
          <p className="text-sm font-medium text-[#2c4a45] mb-2">Demo Credentials:</p>
          <div className="space-y-1 text-sm text-[#2c4a45]/70">
            <p><span className="font-medium">Email:</span> {DEMO_CREDENTIALS[selectedRole].email}</p>
            <p><span className="font-medium">Password:</span> demo123</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2c4a45]/20 focus:border-[#2c4a45] transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2c4a45]/20 focus:border-[#2c4a45] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#2c4a45] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#234039] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Demo Quick Login */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500 mb-3">Quick Demo Login</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                handleDemoLogin('parent');
                document.querySelector('form')?.requestSubmit();
              }}
              disabled={isLoading}
              className="py-2 px-3 bg-[#2c4a45]/10 text-[#2c4a45] rounded-lg text-sm font-medium hover:bg-[#2c4a45]/20 transition-colors disabled:opacity-50"
            >
              Parent
            </button>
            <button
              onClick={() => {
                handleDemoLogin('doctor');
                document.querySelector('form')?.requestSubmit();
              }}
              disabled={isLoading}
              className="py-2 px-3 bg-[#2c4a45]/10 text-[#2c4a45] rounded-lg text-sm font-medium hover:bg-[#2c4a45]/20 transition-colors disabled:opacity-50"
            >
              Doctor
            </button>
            <button
              onClick={() => {
                handleDemoLogin('admin');
                document.querySelector('form')?.requestSubmit();
              }}
              disabled={isLoading}
              className="py-2 px-3 bg-[#2c4a45]/10 text-[#2c4a45] rounded-lg text-sm font-medium hover:bg-[#2c4a45]/20 transition-colors disabled:opacity-50"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-white/50 text-sm mt-6">
        Trusted by 10,000+ parents and pediatricians
      </p>
    </div>
  );
}
