/**
 * lib/firestore.ts
 *
 * All Firestore reads/writes use the ADMIN SDK so they work correctly
 * in both Server Components and API routes (Node.js environment).
 *
 * Client components that need real-time data should import from
 * firebase/firestore directly using the client SDK.
 */
import { cache } from "react";
import { adminDb } from "./firebase-admin";
import type {
  Project,
  Blog,
  Lead,
  CareerApplication,
  JobPosting,
  LeadStage,
} from "@/types";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

/**
 * NOTE on caching: reads below are wrapped in React's `cache()`. This
 * de-dupes identical calls made *within the same server render pass* —
 * e.g. a project detail page calls `getProjectBySlug(slug)` once from
 * `generateMetadata()` and again from the page component; without this,
 * that was 2 Firestore reads per request for the same document. With
 * `cache()`, the second call reuses the first call's in-flight/resolved
 * result, so it costs a single Firestore read. Combined with the
 * `revalidate = 3600` ISR setting on these routes, each route only hits
 * Firestore at most once per hour in production regardless.
 */

// ─── Helper ───────────────────────────────────────────────────────
function tsToIso(ts: unknown): string {
  if (!ts) return new Date().toISOString();
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  if (typeof ts === "string") return ts;
  return new Date().toISOString();
}

// ─── Projects ─────────────────────────────────────────────────────
const PROJECTS = "projects";

export const getProjects = cache(async function getProjects(opts?: {
  featured?: boolean;
  status?: string;
  limitTo?: number;
}): Promise<Project[]> {
  // Single-field orderBy only — no composite index needed
  let ref = adminDb
    .collection(PROJECTS)
    .orderBy("createdAt", "desc") as FirebaseFirestore.Query;

  // Filter in memory to avoid composite index requirement
  const snap = await ref.get();

  let docs = snap.docs.map((d) => {
    const data = d.data();
    return {
      ...data,
      id: d.id,
      createdAt: tsToIso(data.createdAt),
      updatedAt: tsToIso(data.updatedAt),
    } as Project;
  });

  if (opts?.featured) docs = docs.filter((p) => p.isFeatured === true);
  if (opts?.status) docs = docs.filter((p) => p.status === opts.status);
  if (opts?.limitTo) docs = docs.slice(0, opts.limitTo);

  return docs;
});

export const getProjectBySlug = cache(async function getProjectBySlug(
  slug: string,
): Promise<Project | null> {
  const snap = await adminDb
    .collection(PROJECTS)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snap.empty) return null;
  const d = snap.docs[0];
  const data = d.data();
  return {
    ...data,
    id: d.id,
    createdAt: tsToIso(data.createdAt),
    updatedAt: tsToIso(data.updatedAt),
  } as Project;
});

export async function createProject(
  data: Omit<Project, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const ref = await adminDb.collection(PROJECTS).add({
    ...data,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function updateProject(
  id: string,
  data: Partial<Project>,
): Promise<void> {
  await adminDb
    .collection(PROJECTS)
    .doc(id)
    .update({
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    });
}

export async function deleteProject(id: string): Promise<void> {
  await adminDb.collection(PROJECTS).doc(id).delete();
}

// ─── Blogs ────────────────────────────────────────────────────────
const BLOGS = "blogs";

export const getBlogs = cache(async function getBlogs(opts?: {
  featured?: boolean;
  limitTo?: number;
}): Promise<Blog[]> {
  const snap = await adminDb
    .collection(BLOGS)
    .orderBy("publishedAt", "desc")
    .get();

  let docs = snap.docs.map((d) => {
    const data = d.data();
    return {
      ...data,
      id: d.id,
      publishedAt: tsToIso(data.publishedAt),
      updatedAt: tsToIso(data.updatedAt),
    } as Blog;
  });

  if (opts?.featured) docs = docs.filter((b) => b.isFeatured === true);
  if (opts?.limitTo) docs = docs.slice(0, opts.limitTo);

  return docs;
});

export const getBlogBySlug = cache(async function getBlogBySlug(
  slug: string,
): Promise<Blog | null> {
  const snap = await adminDb
    .collection(BLOGS)
    .where("slug", "==", slug)
    .limit(1)
    .get();

  if (snap.empty) return null;
  const d = snap.docs[0];
  const data = d.data();
  return {
    ...data,
    id: d.id,
    publishedAt: tsToIso(data.publishedAt),
    updatedAt: tsToIso(data.updatedAt),
  } as Blog;
});

export async function createBlog(
  data: Omit<Blog, "id" | "publishedAt" | "updatedAt">,
): Promise<string> {
  const ref = await adminDb.collection(BLOGS).add({
    ...data,
    publishedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export async function updateBlog(
  id: string,
  data: Partial<Blog>,
): Promise<void> {
  await adminDb
    .collection(BLOGS)
    .doc(id)
    .update({
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    });
}

export async function deleteBlog(id: string): Promise<void> {
  await adminDb.collection(BLOGS).doc(id).delete();
}

// ─── Leads ────────────────────────────────────────────────────────
const LEADS = "leads";

export async function createLead(
  data: Omit<Lead, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const ref = await adminDb.collection(LEADS).add({
    ...data,
    stage: data.stage || "New",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export const getLeads = cache(async function getLeads(): Promise<Lead[]> {
  const snap = await adminDb
    .collection(LEADS)
    .orderBy("createdAt", "desc")
    .get();

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      ...data,
      id: d.id,
      createdAt: tsToIso(data.createdAt),
      updatedAt: tsToIso(data.updatedAt),
    } as Lead;
  });
});

export async function updateLeadStage(
  id: string,
  stage: LeadStage,
  notes?: string,
): Promise<void> {
  await adminDb
    .collection(LEADS)
    .doc(id)
    .update({
      stage,
      ...(notes !== undefined ? { notes } : {}),
      updatedAt: FieldValue.serverTimestamp(),
    });
}

export async function deleteLead(id: string): Promise<void> {
  await adminDb.collection(LEADS).doc(id).delete();
}

// ─── Career ───────────────────────────────────────────────────────
const APPLICATIONS = "career_applications";
const JOBS = "job_postings";

export async function createApplication(
  data: Omit<CareerApplication, "id" | "createdAt">,
): Promise<string> {
  const ref = await adminDb.collection(APPLICATIONS).add({
    ...data,
    status: "New",
    createdAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}

export const getApplications = cache(async function getApplications(): Promise<
  CareerApplication[]
> {
  const snap = await adminDb
    .collection(APPLICATIONS)
    .orderBy("createdAt", "desc")
    .get();

  return snap.docs.map((d) => {
    const data = d.data();
    return {
      ...data,
      id: d.id,
      createdAt: tsToIso(data.createdAt),
    } as CareerApplication;
  });
});

export const getJobPostings = cache(async function getJobPostings(): Promise<
  JobPosting[]
> {
  const snap = await adminDb
    .collection(JOBS)
    .orderBy("createdAt", "desc")
    .get();

  // Filter active in memory — avoids composite index on isActive + createdAt
  return snap.docs
    .map((d) => {
      const data = d.data();
      return {
        ...data,
        id: d.id,
        createdAt: tsToIso(data.createdAt),
      } as JobPosting;
    })
    .filter((j) => j.isActive === true);
});

export async function createJobPosting(
  data: Omit<JobPosting, "id" | "createdAt">,
): Promise<string> {
  const ref = await adminDb.collection(JOBS).add({
    ...data,
    createdAt: FieldValue.serverTimestamp(),
  });
  return ref.id;
}
