'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone, Mail, MessageSquare, FileText, Send, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactSchema, type ContactInput } from '@/lib/validators';
import { useRecaptcha } from '@/hooks/useRecaptcha';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const { execute } = useRecaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<ContactInput, 'recaptchaToken'>>({
    resolver: zodResolver(contactSchema.omit({ recaptchaToken: true })),
  });

  const onSubmit = async (data: Omit<ContactInput, 'recaptchaToken'>) => {
    setLoading(true);
    try {
      const recaptchaToken = await execute('contact_submit');

      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, recaptchaToken }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Submission failed');

      setSubmitted(true);
      reset();
      toast.success('Message sent successfully!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card p-10 text-center">
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-ivory-100 mb-2">
          Message Sent!
        </h3>
        <p className="font-body text-charcoal-500 dark:text-charcoal-300 mb-5">
          Thank you for reaching out. Our team will respond within 24 hours.
        </p>
        <button onClick={() => setSubmitted(false)} className="text-sm font-medium text-gold-500 hover:text-gold-600">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 md:p-8 space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="form-label">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <input id="name" className="form-input !pl-10" placeholder="Your full name" {...register('name')} />
          </div>
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="form-label">Mobile Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm text-charcoal-400 font-mono">+91</span>
            <input id="phone" type="tel" inputMode="numeric" maxLength={10} className="form-input !pl-20" placeholder="98765 43210" {...register('phone')} />
          </div>
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="form-label">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input id="email" type="email" className="form-input !pl-10" placeholder="you@example.com" {...register('email')} />
        </div>
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="form-label">Subject</label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input id="subject" className="form-input !pl-10" placeholder="What's this about?" {...register('subject')} />
        </div>
        {errors.subject && <p className="form-error">{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="form-label">Message</label>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-charcoal-400" />
          <textarea id="message" rows={5} className="form-input !pl-10 resize-none" placeholder="How can we help you?" {...register('message')} />
        </div>
        {errors.message && <p className="form-error">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 disabled:opacity-60">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send Message</>}
      </button>

      <p className="text-2xs text-center text-charcoal-400">
        Protected by reCAPTCHA. By submitting, you agree to our Privacy Policy.
      </p>
    </form>
  );
}
