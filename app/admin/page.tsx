'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdmin } from '@/hooks/useAdmin';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, signIn } = useAdmin();
  const { execute } = useRecaptcha();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/admin/dashboard');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ── Verify reCAPTCHA v3 before attempting sign-in ─────────────
      const recaptchaToken = await execute('admin_login');
      const verifyRes = await fetch('/api/admin/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: recaptchaToken }),
      });
      const verifyJson = await verifyRes.json();

      if (!verifyJson.success) {
        toast.error('Bot verification failed. Please try again.');
        return;
      }

      await signIn(email, password);
      toast.success('Welcome back!');
      router.push('/admin/dashboard');
    } catch (err) {
      toast.error('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-100 dark:bg-charcoal-900 px-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-sm bg-gold-gradient flex items-center justify-center mb-4">
            <span className="font-display text-charcoal-900 font-bold text-2xl">S</span>
          </div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-ivory-100">
            Sokha Realty
          </h1>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold-500 mt-1">
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <div>
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@sokharealty.com"
                className="form-input !pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input !pl-10 !pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 disabled:opacity-60">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</> : 'Sign In'}
          </button>

          <p className="text-center text-2xs text-charcoal-400">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-500">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-500">
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </form>

        <p className="text-center text-xs text-charcoal-400 mt-6">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </div>
  );
}
