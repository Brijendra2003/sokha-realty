"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: wire up to your email provider / Firestore
    await new Promise((r) => setTimeout(r, 800)); // simulate request
    toast.success("You're subscribed!");
    setEmail("");
    setLoading(false);
  };

  return (
    /* One continuous pill: the field and the submit button share a
       single rounded shell so it reads as one control, not two. */
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] p-1.5 focus-within:border-champagne-500/60 sm:w-auto"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Your email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="min-w-0 flex-1 bg-transparent px-5 py-2.5 font-body text-sm text-white placeholder-sand-500 focus:outline-none sm:w-64"
      />
      <button
        type="submit"
        disabled={loading}
        className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-gradient px-6 py-2.5 font-body text-sm font-semibold text-navy-900 transition-all duration-300 hover:shadow-gold disabled:opacity-60"
      >
        {loading ? "Subscribing…" : "Subscribe"}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
