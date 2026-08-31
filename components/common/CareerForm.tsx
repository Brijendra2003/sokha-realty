'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { User, Phone, Mail, Briefcase, FileText, Upload, Send, CheckCircle2, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { careerSchema, type CareerInput } from '@/lib/validators';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { uploadFile } from '@/lib/storage';

export function CareerForm({ jobTitle }: { jobTitle?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [resume,    setResume]    = useState<File | null>(null);
  const [uploadPct, setUploadPct] = useState(0);
  const { execute } = useRecaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<CareerInput, 'recaptchaToken'>>({
    resolver: zodResolver(careerSchema.omit({ recaptchaToken: true })),
    defaultValues: { position: jobTitle ?? '' },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: files => { if (files[0]) setResume(files[0]); },
  });

  const onSubmit = async (data: Omit<CareerInput, 'recaptchaToken'>) => {
    setLoading(true);
    try {
      let resumeUrl = '';
      if (resume) {
        resumeUrl = await uploadFile(
          resume,
          `careers/resumes/${Date.now()}-${resume.name}`,
          setUploadPct
        );
      }

      const recaptchaToken = await execute('career_submit');

      const res = await fetch('/api/career', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, resumeUrl, recaptchaToken }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Submission failed');

      setSubmitted(true);
      reset();
      setResume(null);
      toast.success('Application submitted successfully!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
      setUploadPct(0);
    }
  };

  if (submitted) {
    return (
      <div className="card p-10 text-center">
        <span className="icon-blob blob-sage mx-auto mb-6 h-20 w-20">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mb-2 font-display text-2xl font-semibold text-navy-800 dark:text-sand-100">
          Application received!
        </h3>
        <p className="mx-auto mb-7 max-w-md font-body text-navy-500 dark:text-sand-400">
          Thank you for your interest in joining Sokha Realty. Our HR team will review your application and reach out if there&apos;s a match.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-secondary">
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5 p-7 md:p-9" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="form-label">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input id="name" className="form-input !pl-11" placeholder="Your full name" {...register('name')} />
          </div>
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="form-label">Mobile Number</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <span className="absolute left-11 top-1/2 -translate-y-1/2 font-mono text-sm text-navy-400">+91</span>
            <input id="phone" type="tel" inputMode="numeric" maxLength={10} className="form-input !pl-[5.5rem]" placeholder="98765 43210" {...register('phone')} />
          </div>
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="form-label">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input id="email" type="email" className="form-input !pl-11" placeholder="you@example.com" {...register('email')} />
          </div>
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="experience" className="form-label">Experience</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <select id="experience" className="form-input !pl-11 appearance-none" {...register('experience')}>
              <option value="">Select experience</option>
              <option value="Fresher">Fresher</option>
              <option value="1-3 years">1–3 years</option>
              <option value="3-5 years">3–5 years</option>
              <option value="5-10 years">5–10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
          {errors.experience && <p className="form-error">{errors.experience.message}</p>}
        </div>
      </div>

      <input type="hidden" {...register('position')} />

      {/* Resume upload */}
      <div>
        <label className="form-label">Resume (PDF/DOC, max 5MB)</label>
        {resume ? (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-sand-300 bg-sand-100 p-4 dark:border-navy-600 dark:bg-navy-800">
            <div className="flex min-w-0 items-center gap-3">
              <span className="icon-blob blob-champagne h-10 w-10">
                <FileText className="h-4 w-4" />
              </span>
              <span className="truncate font-body text-sm text-navy-700 dark:text-sand-200">{resume.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setResume(null)}
              aria-label="Remove resume"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy-400 transition-colors hover:bg-clay-100 hover:text-clay-600 dark:hover:bg-navy-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[24px] border-2 border-dashed p-9 transition-colors ${
              isDragActive
                ? 'border-champagne-400 bg-champagne-50 dark:bg-champagne-500/10'
                : 'border-sand-400 hover:border-champagne-400 hover:bg-sand-100 dark:border-navy-600 dark:hover:bg-navy-800'
            }`}
          >
            <input {...getInputProps()} />
            <span className="icon-blob blob-clay h-12 w-12">
              <Upload className="h-5 w-5" />
            </span>
            <p className="text-center font-body text-sm text-navy-500 dark:text-sand-400">
              Drag &amp; drop your resume, or <span className="font-semibold text-champagne-700 dark:text-champagne-400">browse</span>
            </p>
          </div>
        )}
        {loading && uploadPct > 0 && uploadPct < 100 && (
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sand-300 dark:bg-navy-700">
            <div className="h-full bg-gold-gradient transition-all duration-300" style={{ width: `${uploadPct}%` }} />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="coverLetter" className="form-label">Cover Letter <span className="normal-case text-navy-400">(optional)</span></label>
        <textarea
          id="coverLetter"
          rows={4}
          placeholder="Tell us why you'd be a great fit…"
          className="form-input resize-none"
          {...register('coverLetter')}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full !py-3.5 disabled:opacity-60">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : <><Send className="w-4 h-4" /> Submit Application</>}
      </button>
    </form>
  );
}
