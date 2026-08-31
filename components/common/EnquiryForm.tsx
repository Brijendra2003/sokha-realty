'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, User, MessageSquare, Send, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { enquirySchema, type EnquiryInput } from '@/lib/validators';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { cn } from '@/lib/utils';

interface EnquiryFormProps {
  projectName?: string;
  source: 'Project Page' | 'Blog Page' | 'Contact Page' | 'Home Page' | 'Career Page';
  variant?: 'sticky' | 'inline';
  title?: string;
  subtitle?: string;
}

export function EnquiryForm({
  projectName,
  source,
  variant = 'sticky',
  title = 'Enquire Now',
  subtitle = 'Get a callback within 30 minutes',
}: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const { execute } = useRecaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<EnquiryInput, 'recaptchaToken'>>({
    resolver: zodResolver(enquirySchema.omit({ recaptchaToken: true })),
    defaultValues: { projectInterest: projectName ?? '', source },
  });

  const onSubmit = async (data: Omit<EnquiryInput, 'recaptchaToken'>) => {
    setLoading(true);
    try {
      const recaptchaToken = await execute('enquiry_submit');

      const res = await fetch('/api/leads', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, source, recaptchaToken }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Something went wrong');
      }

      setSubmitted(true);
      reset();
      toast.success('Thank you! Our team will contact you shortly.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={cn(
        'card p-8 text-center',
        variant === 'sticky' && 'sticky top-28'
      )}>
        <span className="icon-blob blob-sage mx-auto mb-5 h-16 w-16">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mb-2 font-display text-xl font-semibold text-navy-800 dark:text-sand-100">
          Thank you!
        </h3>
        <p className="mb-6 font-body text-sm text-navy-500 dark:text-sand-400">
          Our relationship manager will reach out to you within 30 minutes.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-secondary !px-6 !py-2.5 text-xs"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className={cn(
      'card p-7',
      variant === 'sticky' && 'sticky top-28'
    )}>
      {/* Header */}
      <div className="mb-6">
        <span className="eyebrow-pill mb-3">{subtitle}</span>
        <h3 className="font-display text-xl font-semibold text-navy-800 dark:text-sand-100">
          {title}
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="name" className="form-label">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="form-input !pl-11"
              {...register('name')}
            />
          </div>
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="form-label">Mobile Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <span className="absolute left-11 top-1/2 -translate-y-1/2 font-mono text-sm text-navy-400">+91</span>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="98765 43210"
              className="form-input !pl-[5.5rem]"
              {...register('phone')}
            />
          </div>
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>

        {/* Email (optional) */}
        <div>
          <label htmlFor="email" className="form-label">Email <span className="normal-case text-navy-400">(optional)</span></label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="form-input !pl-11"
              {...register('email')}
            />
          </div>
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        {/* Message (optional) */}
        <div>
          <label htmlFor="message" className="form-label">Message <span className="normal-case text-navy-400">(optional)</span></label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-navy-400" />
            <textarea
              id="message"
              rows={3}
              placeholder="Tell us what you're looking for…"
              className="form-input !pl-11 resize-none"
              {...register('message')}
            />
          </div>
        </div>

        {/* Hidden project interest field */}
        <input type="hidden" {...register('projectInterest')} />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full !py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Submit Enquiry
            </>
          )}
        </button>

        <p className="text-center text-2xs leading-relaxed text-navy-400 dark:text-sand-500">
          By submitting, you agree to our Privacy Policy. Protected by reCAPTCHA.
        </p>
      </form>
    </div>
  );
}

