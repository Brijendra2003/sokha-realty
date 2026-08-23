'use client';

import { useEffect, useState } from 'react';
import { Phone, Mail, FileText, Briefcase, Plus, X, Loader2, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getApplications,
  getJobPostings,
  createJobPosting,
} from "@/lib/firestore-client";
import { formatRelativeDate } from '@/lib/utils';
import { Spinner } from '@/components/common/Spinner';
import type { CareerApplication, JobPosting } from '@/types';

const TABS = ['Applications', 'Job Postings'] as const;

export default function AdminCareersPage() {
  const [tab, setTab] = useState<typeof TABS[number]>('Applications');
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [jobs,         setJobs]         = useState<JobPosting[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const [apps, postings] = await Promise.all([getApplications(), getJobPostings()]);
      setApplications(apps);
      setJobs(postings);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-ivory-100">Careers</h1>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-300 mt-1">
            {applications.length} applications · {jobs.length} open positions
          </p>
        </div>
        {tab === 'Job Postings' && (
          <button onClick={() => setShowJobModal(true)} className="btn-primary !py-2.5 !px-5 text-sm">
            <Plus className="w-4 h-4" /> New Job Posting
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-ivory-200 dark:border-charcoal-600">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? 'border-gold-500 text-gold-500' : 'border-transparent text-charcoal-500 dark:text-charcoal-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner label="Loading…" />
      ) : tab === 'Applications' ? (
        applications.length === 0 ? (
          <div className="card p-16 text-center text-charcoal-400">No applications yet.</div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-mono uppercase tracking-wider text-charcoal-400 border-b border-ivory-200 dark:border-charcoal-600">
                  <th className="px-6 py-3">Candidate</th>
                  <th className="px-6 py-3">Position</th>
                  <th className="px-6 py-3">Experience</th>
                  <th className="px-6 py-3">Applied</th>
                  <th className="px-6 py-3 text-right">Resume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200 dark:divide-charcoal-600">
                {applications.map(app => (
                  <tr key={app.id} className="hover:bg-ivory-50 dark:hover:bg-charcoal-800/50">
                    <td className="px-6 py-3.5">
                      <p className="font-medium text-charcoal-800 dark:text-ivory-100">{app.name}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-charcoal-400">
                        <a href={`tel:${app.phone}`} className="flex items-center gap-1 hover:text-gold-500"><Phone className="w-3 h-3" /> {app.phone}</a>
                        <a href={`mailto:${app.email}`} className="flex items-center gap-1 hover:text-gold-500"><Mail className="w-3 h-3" /> {app.email}</a>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-charcoal-600 dark:text-charcoal-300">{app.jobTitle || '—'}</td>
                    <td className="px-6 py-3.5 text-charcoal-600 dark:text-charcoal-300">{app.experience}</td>
                    <td className="px-6 py-3.5 text-charcoal-400 text-xs">{formatRelativeDate(app.createdAt)}</td>
                    <td className="px-6 py-3.5 text-right">
                      {app.resumeUrl ? (
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gold-500 hover:text-gold-600">
                          <Download className="w-3.5 h-3.5" /> Resume
                        </a>
                      ) : (
                        <span className="text-xs text-charcoal-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <JobPostingsTab jobs={jobs} onCreated={load} />
      )}

      {showJobModal && (
        <JobPostingModal
          onClose={() => setShowJobModal(false)}
          onCreated={() => { setShowJobModal(false); load(); }}
        />
      )}
    </div>
  );
}

function JobPostingsTab({ jobs }: { jobs: JobPosting[]; onCreated: () => void }) {
  if (jobs.length === 0) {
    return <div className="card p-16 text-center text-charcoal-400">No job postings yet. Create one to get started.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {jobs.map(job => (
        <div key={job.id} className="card p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-semibold text-charcoal-800 dark:text-ivory-100">{job.title}</h3>
            <span className={`badge ${job.isActive ? 'badge-green' : 'bg-ivory-200 dark:bg-charcoal-700 text-charcoal-500'}`}>
              {job.isActive ? 'Active' : 'Closed'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-charcoal-400 font-mono mb-3">
            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.department}</span>
            <span>{job.location}</span>
            <span>{job.type}</span>
          </div>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-300 line-clamp-2">{job.description}</p>
        </div>
      ))}
    </div>
  );
}

function JobPostingModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    title: '', department: '', location: '', type: 'Full-time' as JobPosting['type'],
    experience: '', description: '', requirements: '', isActive: true,
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    if (!form.title || !form.department) { toast.error('Title and department are required'); return; }
    setSaving(true);
    try {
      await createJobPosting({
        ...form,
        requirements: form.requirements.split('\n').map(s => s.trim()).filter(Boolean),
      });
      toast.success('Job posting created!');
      onCreated();
    } catch {
      toast.error('Failed to create job posting');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="card max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl font-semibold text-charcoal-800 dark:text-ivory-100">New Job Posting</h3>
          <button onClick={onClose} className="text-charcoal-400 hover:text-charcoal-600"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <input className="form-input" placeholder="Job Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="form-input" placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
            <input className="form-input" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as JobPosting['type'] })}>
              <option>Full-time</option><option>Part-time</option><option>Internship</option><option>Contract</option>
            </select>
            <input className="form-input" placeholder="Experience (e.g. 2-5 years)" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
          </div>
          <textarea className="form-input resize-none" rows={3} placeholder="Job description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <textarea className="form-input resize-none" rows={3} placeholder="Requirements (one per line)" value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} />
          <button onClick={handleSubmit} disabled={saving} className="btn-primary w-full !py-3 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Job Posting'}
          </button>
        </div>
      </div>
    </div>
  );
}
