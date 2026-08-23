// ─── Project Types ──────────────────────────────────────────────
export interface ProjectHighlight {
  icon: string;
  label: string;
  value: string;
}

export interface ProjectAmenity {
  category: string;
  items: string[];
}

export interface ProjectConfiguration {
  type: string;         // e.g., "2 BHK", "3 BHK"
  area: string;         // e.g., "950 – 1200 sq.ft."
  price: string;        // e.g., "₹85 L – ₹1.05 Cr"
}

export interface FloorPlan {
  type: string;
  imageUrl: string;
  area: string;
}

export interface ConnectivityPoint {
  name: string;
  distance: string;
  direction?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  category: 'Residential' | 'Commercial' | 'Luxury' | 'Affordable';
  elevationImageUrl: string;
  galleryImages: string[];
  highlights: ProjectHighlight[];
  amenities: ProjectAmenity[];
  configurations: ProjectConfiguration[];
  floorPlans: FloorPlan[];
  connectivity: ConnectivityPoint[];
  googleMapsEmbedUrl: string;
  googleMapsCoords?: { lat: number; lng: number };
  rera?: string;
  launchDate?: string;
  possessionDate?: string;
  totalUnits?: number;
  priceRange: string;
  brochureUrl?: string;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Blog Types ──────────────────────────────────────────────────
export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;         // HTML from rich-text editor
  coverImageUrl: string;
  author: string;
  authorImageUrl?: string;
  category: string;
  tags: string[];
  readTime: number;        // minutes
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  publishedAt: string;
  updatedAt: string;
}

// ─── Lead Types ──────────────────────────────────────────────────
export type LeadStage =
  | 'New'
  | 'Contacted'
  | 'Site Visit Scheduled'
  | 'Site Visit Done'
  | 'Negotiation'
  | 'Booked'
  | 'Not Interested';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectInterest?: string;
  message?: string;
  source: 'Project Page' | 'Blog Page' | 'Contact Page' | 'Home Page' | 'Career Page';
  stage: LeadStage;
  notes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

// ─── Career Types ─────────────────────────────────────────────────
export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  experience: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

export interface CareerApplication {
  id: string;
  jobId?: string;
  jobTitle?: string;
  name: string;
  phone: string;
  email: string;
  experience: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: 'New' | 'Reviewed' | 'Shortlisted' | 'Rejected' | 'Hired';
  createdAt: string;
}

// ─── Form Types ───────────────────────────────────────────────────
export interface EnquiryFormData {
  name: string;
  phone: string;
  email?: string;
  projectInterest?: string;
  message?: string;
  source: string;
  recaptchaToken: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

export interface CareerFormData {
  name: string;
  phone: string;
  email: string;
  experience: string;
  position?: string;
  coverLetter?: string;
  recaptchaToken: string;
}

// ─── SEO / Meta ───────────────────────────────────────────────────
export interface SeoMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
}

// ─── Admin ────────────────────────────────────────────────────────
export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
}

// ─── API Response ─────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── Navigation ───────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
