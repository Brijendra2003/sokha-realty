'use client';

import { useEffect, useState, useMemo } from 'react';
import { Phone, Mail, MessageSquare, Search, Trash2, X, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { getLeads, updateLeadStage, deleteLead } from "@/lib/firestore-client";
import type { Lead, LeadStage } from '@/types';
import { formatRelativeDate, cn } from '@/lib/utils';
import { Spinner } from '@/components/common/Spinner';

const STAGES: LeadStage[] = [
  'New',
  'Contacted',
  'Site Visit Scheduled',
  'Site Visit Done',
  'Negotiation',
  'Booked',
  'Not Interested',
];

const STAGE_COLORS: Record<LeadStage, string> = {
  'New':                   'border-blue-400 bg-blue-50 dark:bg-blue-900/10',
  'Contacted':             'border-purple-400 bg-purple-50 dark:bg-purple-900/10',
  'Site Visit Scheduled':  'border-amber-400 bg-amber-50 dark:bg-amber-900/10',
  'Site Visit Done':       'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/10',
  'Negotiation':           'border-orange-400 bg-orange-50 dark:bg-orange-900/10',
  'Booked':                'border-green-400 bg-green-50 dark:bg-green-900/10',
  'Not Interested':        'border-red-400 bg-red-50 dark:bg-red-900/10',
};

export default function LeadsPage() {
  const [leads,    setLeads]    = useState<Lead[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    if (!search.trim()) return leads;
    const q = search.toLowerCase();
    return leads.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      (l.email ?? '').toLowerCase().includes(q) ||
      (l.projectInterest ?? '').toLowerCase().includes(q)
    );
  }, [leads, search]);

  const byStage = useMemo(() => {
    const map: Record<LeadStage, Lead[]> = {
      'New': [], 'Contacted': [], 'Site Visit Scheduled': [],
      'Site Visit Done': [], 'Negotiation': [], 'Booked': [], 'Not Interested': [],
    };
    filtered.forEach(l => map[l.stage]?.push(l));
    return map;
  }, [filtered]);

  async function handleStageChange(leadId: string, newStage: LeadStage) {
    setLeads(prev => prev.map(l => (l.id === leadId ? { ...l, stage: newStage } : l)));
    try {
      await updateLeadStage(leadId, newStage);
      toast.success(`Moved to ${newStage}`);
    } catch {
      toast.error('Failed to update stage');
      loadLeads();
    }
  }

  async function handleDelete(leadId: string) {
    if (!confirm('Delete this lead permanently?')) return;
    try {
      await deleteLead(leadId);
      setLeads(prev => prev.filter(l => l.id !== leadId));
      setSelected(null);
      toast.success('Lead deleted');
    } catch {
      toast.error('Failed to delete lead');
    }
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-ivory-100">Leads</h1>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-300 mt-1">
            Drag cards between columns to update stage · {leads.length} total leads
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search leads…"
            className="form-input !pl-10"
          />
        </div>
      </div>

      {loading ? (
        <Spinner label="Loading leads…" />
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0">
          {STAGES.map(stage => (
            <div
              key={stage}
              className="flex-shrink-0 w-72"
              onDragOver={e => e.preventDefault()}
              onDrop={() => {
                if (dragging) handleStageChange(dragging, stage);
                setDragging(null);
              }}
            >
              <div className={cn('rounded-t-lg border-t-4 px-4 py-3 bg-white dark:bg-charcoal-700', STAGE_COLORS[stage])}>
                <div className="flex items-center justify-between">
                  <h3 className="font-body text-sm font-semibold text-charcoal-800 dark:text-ivory-100">{stage}</h3>
                  <span className="font-mono text-xs text-charcoal-400">{byStage[stage].length}</span>
                </div>
              </div>

              <div className="bg-ivory-50 dark:bg-charcoal-800/50 rounded-b-lg p-2 min-h-[200px] space-y-2 border border-t-0 border-ivory-200 dark:border-charcoal-700">
                {byStage[stage].map(lead => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => setDragging(lead.id)}
                    onClick={() => setSelected(lead)}
                    className="card p-3.5 cursor-grab active:cursor-grabbing hover:shadow-card-hover"
                  >
                    <p className="font-body text-sm font-semibold text-charcoal-800 dark:text-ivory-100 truncate">
                      {lead.name}
                    </p>
                    <p className="font-mono text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5">{lead.phone}</p>
                    {lead.projectInterest && (
                      <p className="text-xs text-gold-500 mt-1.5 truncate">{lead.projectInterest}</p>
                    )}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-ivory-200 dark:border-charcoal-600">
                      <span className="text-2xs text-charcoal-400">{lead.source}</span>
                      <span className="text-2xs text-charcoal-400">{formatRelativeDate(lead.createdAt)}</span>
                    </div>
                  </div>
                ))}
                {byStage[stage].length === 0 && (
                  <p className="text-xs text-charcoal-300 dark:text-charcoal-600 text-center py-6">No leads</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lead Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="card max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="font-display text-xl font-semibold text-charcoal-800 dark:text-ivory-100">
                  {selected.name}
                </h3>
                <span className="badge-gold mt-2">{selected.stage}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-charcoal-400 hover:text-charcoal-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <a href={`tel:${selected.phone}`} className="flex items-center gap-3 text-sm text-charcoal-600 dark:text-charcoal-300 hover:text-gold-500">
                <Phone className="w-4 h-4 text-gold-500" /> +91 {selected.phone}
              </a>
              {selected.email && (
                <a href={`mailto:${selected.email}`} className="flex items-center gap-3 text-sm text-charcoal-600 dark:text-charcoal-300 hover:text-gold-500">
                  <Mail className="w-4 h-4 text-gold-500" /> {selected.email}
                </a>
              )}
              {selected.message && (
                <div className="flex items-start gap-3 text-sm text-charcoal-600 dark:text-charcoal-300">
                  <MessageSquare className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" /> {selected.message}
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-charcoal-600 dark:text-charcoal-300">
                <Calendar className="w-4 h-4 text-gold-500" /> {formatRelativeDate(selected.createdAt)}
              </div>
            </div>

            <div className="mb-5">
              <label className="form-label">Update Stage</label>
              <select
                value={selected.stage}
                onChange={e => {
                  const newStage = e.target.value as LeadStage;
                  setSelected({ ...selected, stage: newStage });
                  handleStageChange(selected.id, newStage);
                }}
                className="form-input"
              >
                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button
              onClick={() => handleDelete(selected.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-sm text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Delete Lead
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
