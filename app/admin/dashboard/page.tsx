"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Building2,
  Newspaper,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import {
  collection,
  getDocs,
  getCountFromServer,
  query,
  orderBy,
  limit as fbLimit,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatRelativeDate } from "@/lib/utils";
import { Spinner } from "@/components/common/Spinner";
import type { Lead } from "@/types";

interface Counts {
  leads: number;
  projects: number;
  blogs: number;
  applications: number;
}

function tsToIso(ts: unknown): string {
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  return new Date().toISOString();
}

export default function AdminOverviewPage() {
  const [counts, setCounts] = useState<Counts>({
    leads: 0,
    projects: 0,
    blogs: 0,
    applications: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        // Use Firestore's server-side aggregation (`getCountFromServer`)
        // instead of downloading every document just to read `.size`.
        // This turns 4 full-collection reads into 4 lightweight count
        // queries, and runs them alongside the "recent leads" query
        // in a single parallel batch rather than sequential awaits.
        const [
          leadsCountSnap,
          projectsCountSnap,
          blogsCountSnap,
          appsCountSnap,
          recentSnap,
        ] = await Promise.all([
          getCountFromServer(collection(db, "leads")),
          getCountFromServer(collection(db, "projects")),
          getCountFromServer(collection(db, "blogs")),
          getCountFromServer(collection(db, "career_applications")),
          getDocs(
            query(
              collection(db, "leads"),
              orderBy("createdAt", "desc"),
              fbLimit(6),
            ),
          ),
        ]);

        setCounts({
          leads: leadsCountSnap.data().count,
          projects: projectsCountSnap.data().count,
          blogs: blogsCountSnap.data().count,
          applications: appsCountSnap.data().count,
        });

        setRecentLeads(
          recentSnap.docs.map(
            (d) =>
              ({
                ...d.data(),
                id: d.id,
                createdAt: tsToIso(d.data().createdAt),
                updatedAt: tsToIso(d.data().updatedAt),
              }) as Lead,
          ),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const STATS = [
    {
      label: "Total Leads",
      value: counts.leads,
      icon: Users,
      href: "/admin/dashboard/leads",
      color: "text-blue-400 bg-blue-400/10",
    },
    {
      label: "Projects",
      value: counts.projects,
      icon: Building2,
      href: "/admin/dashboard/projects",
      color: "text-gold-400 bg-gold-400/10",
    },
    {
      label: "Blog Posts",
      value: counts.blogs,
      icon: Newspaper,
      href: "/admin/dashboard/blogs",
      color: "text-purple-400 bg-purple-400/10",
    },
    {
      label: "Job Applications",
      value: counts.applications,
      icon: Briefcase,
      href: "/admin/dashboard/careers",
      color: "text-green-400 bg-green-400/10",
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-ivory-100">
          Dashboard
        </h1>
        <p className="text-sm text-charcoal-500 dark:text-charcoal-300 mt-1">
          Welcome back!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {STATS.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card p-5 group">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-sm flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-charcoal-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-display text-3xl font-bold text-charcoal-800 dark:text-ivory-100">
              {loading ? "—" : stat.value}
            </p>
            <p className="text-sm text-charcoal-500 dark:text-charcoal-300 mt-1">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ivory-200 dark:border-charcoal-600">
          <h2 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100">
            Recent Leads
          </h2>
          <Link
            href="/admin/dashboard/leads"
            className="text-xs font-medium text-gold-500 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {loading ? (
          <Spinner label="Loading…" />
        ) : recentLeads.length === 0 ? (
          <div className="p-10 text-center text-charcoal-400">
            No leads yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-mono uppercase tracking-wider text-charcoal-400 border-b border-ivory-200 dark:border-charcoal-600">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Source</th>
                <th className="px-6 py-3">Stage</th>
                <th className="px-6 py-3 text-right">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-200 dark:divide-charcoal-600">
              {recentLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-ivory-50 dark:hover:bg-charcoal-800/50"
                >
                  <td className="px-6 py-3.5 font-medium text-charcoal-800 dark:text-ivory-100">
                    {lead.name}
                  </td>
                  <td className="px-6 py-3.5 text-charcoal-500 font-mono text-xs">
                    {lead.phone}
                  </td>
                  <td className="px-6 py-3.5 text-charcoal-500">
                    {lead.source}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="badge-gold">{lead.stage}</span>
                  </td>
                  <td className="px-6 py-3.5 text-right text-xs text-charcoal-400">
                    {formatRelativeDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
