'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/admin');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-100 dark:bg-charcoal-900">
        <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ivory-100 dark:bg-charcoal-900">
      <AdminSidebar />
      <div className="flex-1 min-w-0">
        {children}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
