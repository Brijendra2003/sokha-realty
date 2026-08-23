/**
 * lib/firestore-client.ts
 * For 'use client' components ONLY.
 * Uses the Firebase CLIENT SDK — safe for the browser.
 * Server Components + API routes use lib/firestore.ts (Admin SDK).
 */
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  Project,
  Blog,
  Lead,
  CareerApplication,
  JobPosting,
  LeadStage,
} from "@/types";

function tsToIso(ts: unknown): string {
  if (ts instanceof Timestamp) return ts.toDate().toISOString();
  return new Date().toISOString();
}

// ─── Projects ─────────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  const snap = await getDocs(
    query(collection(db, "projects"), orderBy("createdAt", "desc")),
  );
  return snap.docs.map(
    (d) =>
      ({
        ...d.data(),
        id: d.id,
        createdAt: tsToIso(d.data().createdAt),
        updatedAt: tsToIso(d.data().updatedAt),
      }) as Project,
  );
}

export async function createProject(
  data: Omit<Project, "id" | "createdAt" | "updatedAt">,
): Promise<string> {
  const ref = await addDoc(collection(db, "projects"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProject(
  id: string,
  data: Partial<Project>,
): Promise<void> {
  await updateDoc(doc(db, "projects", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, "projects", id));
}

// ─── Blogs ────────────────────────────────────────────────────────
export async function getBlogs(): Promise<Blog[]> {
  const snap = await getDocs(
    query(collection(db, "blogs"), orderBy("publishedAt", "desc")),
  );
  return snap.docs.map(
    (d) =>
      ({
        ...d.data(),
        id: d.id,
        publishedAt: tsToIso(d.data().publishedAt),
        updatedAt: tsToIso(d.data().updatedAt),
      }) as Blog,
  );
}

export async function createBlog(
  data: Omit<Blog, "id" | "publishedAt" | "updatedAt">,
): Promise<string> {
  const ref = await addDoc(collection(db, "blogs"), {
    ...data,
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateBlog(
  id: string,
  data: Partial<Blog>,
): Promise<void> {
  await updateDoc(doc(db, "blogs", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlog(id: string): Promise<void> {
  await deleteDoc(doc(db, "blogs", id));
}

// ─── Leads ────────────────────────────────────────────────────────
export async function getLeads(): Promise<Lead[]> {
  const snap = await getDocs(
    query(collection(db, "leads"), orderBy("createdAt", "desc")),
  );
  return snap.docs.map(
    (d) =>
      ({
        ...d.data(),
        id: d.id,
        createdAt: tsToIso(d.data().createdAt),
        updatedAt: tsToIso(d.data().updatedAt),
      }) as Lead,
  );
}

export async function updateLeadStage(
  id: string,
  stage: LeadStage,
  notes?: string,
): Promise<void> {
  await updateDoc(doc(db, "leads", id), {
    stage,
    ...(notes !== undefined ? { notes } : {}),
    updatedAt: serverTimestamp(),
  });
}

export async function deleteLead(id: string): Promise<void> {
  await deleteDoc(doc(db, "leads", id));
}

// ─── Career ───────────────────────────────────────────────────────
export async function getApplications(): Promise<CareerApplication[]> {
  const snap = await getDocs(
    query(collection(db, "career_applications"), orderBy("createdAt", "desc")),
  );
  return snap.docs.map(
    (d) =>
      ({
        ...d.data(),
        id: d.id,
        createdAt: tsToIso(d.data().createdAt),
      }) as CareerApplication,
  );
}

export async function getJobPostings(): Promise<JobPosting[]> {
  const snap = await getDocs(
    query(collection(db, "job_postings"), orderBy("createdAt", "desc")),
  );
  return snap.docs
    .map(
      (d) =>
        ({
          ...d.data(),
          id: d.id,
          createdAt: tsToIso(d.data().createdAt),
        }) as JobPosting,
    )
    .filter((j) => j.isActive);
}

export async function createJobPosting(
  data: Omit<JobPosting, "id" | "createdAt">,
): Promise<string> {
  const ref = await addDoc(collection(db, "job_postings"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}
