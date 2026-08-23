'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, ExternalLink, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { getProjects, deleteProject } from "@/lib/firestore-client";
import { Spinner } from '@/components/common/Spinner';
import type { Project } from '@/types';

const STATUS_STYLES: Record<Project['status'], string> = {
  Upcoming:  'badge-blue',
  Ongoing:   'badge-gold',
  Completed: 'badge-green',
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading,   setLoading] = useState(true);
  const [search,    setSearch]  = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      setProjects(await getProjects());
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Project deleted');
    } catch {
      toast.error('Failed to delete project');
    }
  }

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-ivory-100">Projects</h1>
          <p className="text-sm text-charcoal-500 dark:text-charcoal-300 mt-1">{projects.length} projects total</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search…"
              className="form-input !pl-10 w-48"
            />
          </div>
          <Link href="/admin/dashboard/projects/new" className="btn-primary !py-2.5 !px-5 text-sm whitespace-nowrap">
            <Plus className="w-4 h-4" /> New Project
          </Link>
        </div>
      </div>

      {loading ? (
        <Spinner label="Loading projects…" />
      ) : filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <p className="text-charcoal-400 mb-4">No projects found.</p>
          <Link href="/admin/dashboard/projects/new" className="btn-primary !py-2.5 !px-5 text-sm inline-flex">
            <Plus className="w-4 h-4" /> Create First Project
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-mono uppercase tracking-wider text-charcoal-400 border-b border-ivory-200 dark:border-charcoal-600">
                <th className="px-6 py-3">Project</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200 dark:divide-charcoal-600">
              {filtered.map(project => (
                <tr key={project.id} className="hover:bg-ivory-50 dark:hover:bg-charcoal-800/50">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-sm overflow-hidden bg-ivory-200 dark:bg-charcoal-700 flex-shrink-0">
                        {project.elevationImageUrl && (
                          <Image src={project.elevationImageUrl} alt={project.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-charcoal-800 dark:text-ivory-100 truncate">{project.name}</p>
                        <p className="text-xs text-charcoal-400 truncate">{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-charcoal-500 dark:text-charcoal-300">{project.location}</td>
                  <td className="px-6 py-3.5"><span className={STATUS_STYLES[project.status]}>{project.status}</span></td>
                  <td className="px-6 py-3.5 text-gold-500 font-medium">{project.priceRange}</td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/projects/${project.slug}`} target="_blank" rel="noopener noreferrer"
                         className="w-8 h-8 flex items-center justify-center rounded-sm text-charcoal-400 hover:text-gold-500 hover:bg-ivory-100 dark:hover:bg-charcoal-700">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <Link href={`/admin/dashboard/projects/${project.id}`}
                         className="w-8 h-8 flex items-center justify-center rounded-sm text-charcoal-400 hover:text-gold-500 hover:bg-ivory-100 dark:hover:bg-charcoal-700">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(project.id, project.name)}
                         className="w-8 h-8 flex items-center justify-center rounded-sm text-charcoal-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
