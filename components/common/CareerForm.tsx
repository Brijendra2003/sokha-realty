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
        <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-ivory-100 mb-2">
          Application Received!
        </h3>
        <p className="font-body text-charcoal-500 dark:text-charcoal-300 mb-5 max-w-md mx-auto">
          Thank you for your interest in joining Sokha Realty. Our HR team will review your application and reach out if there's a match.
        </p>
        <button onClick={() => setSubmitted(false)} className="text-sm font-medium text-gold-500 hover:text-gold-600">
          Submit another application
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="form-label">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <input id="email" type="email" className="form-input !pl-10" placeholder="you@example.com" {...register('email')} />
          </div>
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="experience" className="form-label">Experience</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <select id="experience" className="form-input !pl-10 appearance-none" {...register('experience')}>
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
          <div className="flex items-center justify-between p-4 rounded-sm border border-ivory-300 dark:border-charcoal-600 bg-ivory-50 dark:bg-charcoal-800">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-sm text-charcoal-700 dark:text-ivory-200 truncate">{resume.name}</span>
            </div>
            <button type="button" onClick={() => setResume(null)} className="text-charcoal-400 hover:text-red-500 flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center gap-2 p-8 rounded-sm border-2 border-dashed cursor-pointer transition-colors ${
              isDragActive
                ? 'border-gold-400 bg-gold-50 dark:bg-gold-900/10'
                : 'border-ivory-300 dark:border-charcoal-600 hover:border-gold-300'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-6 h-6 text-charcoal-400" />
            <p className="text-sm text-charcoal-500 dark:text-charcoal-300 text-center">
              Drag &amp; drop your resume, or <span className="text-gold-500 font-medium">browse</span>
            </p>
          </div>
        )}
        {loading && uploadPct > 0 && uploadPct < 100 && (
          <div className="mt-2 h-1.5 bg-ivory-200 dark:bg-charcoal-700 rounded-full overflow-hidden">
            <div className="h-full bg-gold-500 transition-all duration-300" style={{ width: `${uploadPct}%` }} />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="coverLetter" className="form-label">Cover Letter <span className="normal-case text-charcoal-400">(optional)</span></label>
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
