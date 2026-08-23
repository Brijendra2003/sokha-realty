'use client';

import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function useAdmin() {
  const [user,    setUser]    = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);

      // Set / clear a lightweight cookie so middleware can check auth
      if (u) {
        u.getIdToken().then(token => {
          document.cookie = `pb_admin_token=${token}; path=/; SameSite=Strict; max-age=3600`;
        });
      } else {
        document.cookie = 'pb_admin_token=; path=/; max-age=0';
      }
    });
    return unsub;
  }, []);

  async function signIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function signOut(): Promise<void> {
    await fbSignOut(auth);
    document.cookie = 'pb_admin_token=; path=/; max-age=0';
  }

  return { user, loading, signIn, signOut };
}
