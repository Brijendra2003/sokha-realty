import type { MetadataRoute } from 'next';
import { getProjects, getBlogs } from '@/lib/firestore';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sokharealty.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, blogs] = await Promise.all([
    getProjects().catch(() => []),
    getBlogs().catch(() => []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                  lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${SITE_URL}/about`,       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects`,    lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE_URL}/blogs`,       lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
    { url: `${SITE_URL}/career`,      lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${SITE_URL}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const blogPages: MetadataRoute.Sitemap = blogs.map(b => ({
    url: `${SITE_URL}/blogs/${b.slug}`,
    lastModified: new Date(b.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
