'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export function NewsletterForm() {
  const [email,   setEmail]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: wire up to your email provider / Firestore
    await new Promise(r => setTimeout(r, 800)); // simulate request
    toast.success('You\'re subscribed!');
    setEmail('');
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full sm:w-auto"
    >
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="flex-1 sm:w-64 px-4 py-2.5 rounded-sm text-sm font-body
                   bg-charcoal-700 border border-charcoal-600
                   text-ivory-100 placeholder-charcoal-400
                   focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn-primary !py-2.5 !px-5 text-sm disabled:opacity-60 whitespace-nowrap"
      >
        {loading ? 'Subscribing…' : 'Subscribe'}
      </button>
    </form>
  );
}
