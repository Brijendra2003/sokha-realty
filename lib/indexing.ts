import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/indexing'];
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sokharealty.com';

function getAuth() {
  return new google.auth.JWT({
    email:  process.env.GOOGLE_INDEXING_CLIENT_EMAIL!,
    key:    process.env.GOOGLE_INDEXING_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    scopes: SCOPES,
  });
}

/**
 * Notify Google Indexing API about a new or updated URL.
 * This helps projects and blogs get indexed immediately after publishing.
 */
export async function notifyGoogleIndexing(
  url: string,
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<void> {
  try {
    const auth        = getAuth();
    const indexing    = google.indexing({ version: 'v3', auth });

    await indexing.urlNotifications.publish({
      requestBody: { url, type },
    });

    console.log(`[Indexing API] Notified: ${url} (${type})`);
  } catch (err) {
    // Non-fatal – log but don't throw so the main flow isn't interrupted
    console.error('[Indexing API] Failed to notify:', err);
  }
}

/**
 * Ping the XML sitemap URL to Google and Bing after content changes.
 */
export async function pingSitemaps(): Promise<void> {
  const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap.xml`);
  const endpoints  = [
    `https://www.google.com/ping?sitemap=${sitemapUrl}`,
    `https://www.bing.com/ping?sitemap=${sitemapUrl}`,
  ];

  await Promise.allSettled(endpoints.map(url => fetch(url)));
  console.log('[SEO] Sitemaps pinged.');
}

/**
 * Auto-index a newly created/updated project or blog.
 * Call this from the API route after creating/updating content.
 */
export async function autoIndexContent(slug: string, type: 'project' | 'blog'): Promise<void> {
  const pageUrl = type === 'project'
    ? `${SITE_URL}/projects/${slug}`
    : `${SITE_URL}/blogs/${slug}`;

  await Promise.all([
    notifyGoogleIndexing(pageUrl),
    pingSitemaps(),
  ]);
}
