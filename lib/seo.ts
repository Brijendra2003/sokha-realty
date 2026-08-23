import type { Metadata } from 'next';
import type { Project, Blog } from '@/types';

const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sokharealty.com';
const SITE_NAME = 'Sokha Realty';
const DEFAULT_OG = `${SITE_URL}/images/og-default.jpg`;

// ─── Base Metadata ────────────────────────────────────────────────
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:  'Sokha Realty | Premium Real Estate in Mumbai',
    template: '%s | Sokha Realty',
  },
  description:
    'Sokha Realty – Mumbai\'s trusted premium real estate developer. Explore luxury residential and commercial properties in prime locations across Mumbai.',
  keywords: [
    'Sokha Realty',
    'Sokha Realty Mumbai',
    'real estate Mumbai',
    'luxury apartments Mumbai',
    'new projects Mumbai',
    'residential projects Mumbai',
    'buy flat Mumbai',
  ],
  authors: [{ name: 'Sokha Realty', url: SITE_URL }],
  creator: 'Sokha Realty',
  publisher: 'Sokha Realty',
  openGraph: {
    type:       'website',
    locale:     'en_IN',
    url:        SITE_URL,
    siteName:   SITE_NAME,
    title:      'Sokha Realty | Premium Real Estate in Mumbai',
    description: 'Mumbai\'s trusted premium real estate developer.',
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: 'Sokha Realty' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Sokha Realty | Premium Real Estate in Mumbai',
    description: 'Mumbai\'s trusted premium real estate developer.',
    images:      [DEFAULT_OG],
  },
  robots: {
    index:             true,
    follow:            true,
    googleBot: {
      index:          true,
      follow:         true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':  -1,
    },
  },
  verification: {
    // google: 'YOUR_GSC_VERIFICATION_CODE',
  },
};

// ─── Project Metadata ─────────────────────────────────────────────
export function getProjectMetadata(project: Project): Metadata {
  const canonical = `${SITE_URL}/projects/${project.slug}`;
  const ogImage   = project.elevationImageUrl || DEFAULT_OG;

  return {
    title:       project.metaTitle       || `${project.name} by Sokha Realty | ${project.location}`,
    description: project.metaDescription || `Discover ${project.name} – ${project.tagline}. ${project.priceRange} in ${project.location}. Enquire now!`,
    keywords:    [
      ...project.metaKeywords,
      project.name,
      'Sokha Realty',
      project.location,
      'new project Mumbai',
      `${project.category} projects Mumbai`,
    ],
    alternates:  { canonical },
    openGraph: {
      type:        'website',
      url:         canonical,
      title:       project.metaTitle       || `${project.name} | Sokha Realty`,
      description: project.metaDescription || `${project.tagline} – ${project.priceRange}`,
      images:      [{ url: ogImage, width: 1200, height: 630, alt: project.name }],
      locale:      'en_IN',
      siteName:    SITE_NAME,
    },
    twitter: {
      card:        'summary_large_image',
      title:       project.name,
      description: project.tagline,
      images:      [ogImage],
    },
  };
}

// ─── Blog Metadata ────────────────────────────────────────────────
export function getBlogMetadata(blog: Blog): Metadata {
  const canonical = `${SITE_URL}/blogs/${blog.slug}`;
  const ogImage   = blog.coverImageUrl || DEFAULT_OG;

  return {
    title:       blog.metaTitle       || `${blog.title} | Sokha Realty Blog`,
    description: blog.metaDescription || blog.excerpt,
    keywords:    [
      ...blog.metaKeywords,
      'Sokha Realty',
      'real estate blog',
      'Mumbai real estate',
      ...blog.tags,
    ],
    alternates:  { canonical },
    openGraph: {
      type:             'article',
      url:              canonical,
      title:            blog.title,
      description:      blog.excerpt,
      images:           [{ url: ogImage, width: 1200, height: 630, alt: blog.title }],
      publishedTime:    blog.publishedAt,
      modifiedTime:     blog.updatedAt,
      authors:          [blog.author],
      locale:           'en_IN',
      siteName:         SITE_NAME,
    },
    twitter: {
      card:        'summary_large_image',
      title:       blog.title,
      description: blog.excerpt,
      images:      [ogImage],
    },
  };
}

// ─── JSON-LD Schemas ──────────────────────────────────────────────
export function organizationJsonLd() {
  return {
    '@context':    'https://schema.org',
    '@type':       'RealEstateAgent',
    name:          'Sokha Realty',
    url:           SITE_URL,
    logo:          `${SITE_URL}/images/logo.png`,
    description:   'Premium real estate developer in Mumbai, India.',
    foundingDate:  '1995',
    address: {
      '@type':          'PostalAddress',
      streetAddress:    'Your Office Address',
      addressLocality:  'Mumbai',
      addressRegion:    'Maharashtra',
      postalCode:       '400001',
      addressCountry:   'IN',
    },
    contactPoint: {
      '@type':             'ContactPoint',
      telephone:           '+91-XXXXXXXXXX',
      contactType:         'customer service',
      availableLanguage:   ['English', 'Hindi', 'Marathi'],
    },
    sameAs: [
      'https://www.facebook.com/sokharealty',
      'https://www.instagram.com/sokharealty',
      'https://www.linkedin.com/company/sokharealty',
      'https://twitter.com/sokharealty',
    ],
  };
}

export function projectJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type':    'Accommodation',
    name:       project.name,
    description: project.tagline,
    url:        `${SITE_URL}/projects/${project.slug}`,
    image:      project.elevationImageUrl,
    address: {
      '@type':          'PostalAddress',
      addressLocality:  project.location,
      addressRegion:    'Maharashtra',
      addressCountry:   'IN',
    },
    provider: {
      '@type': 'RealEstateAgent',
      name:    'Sokha Realty',
      url:     SITE_URL,
    },
  };
}

export function blogJsonLd(blog: Blog) {
  return {
    '@context':      'https://schema.org',
    '@type':         'BlogPosting',
    headline:        blog.title,
    description:     blog.excerpt,
    image:           blog.coverImageUrl,
    author: {
      '@type': 'Person',
      name:    blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name:    'Sokha Realty',
      logo:    `${SITE_URL}/images/logo.png`,
    },
    datePublished: blog.publishedAt,
    dateModified:  blog.updatedAt,
    url:           `${SITE_URL}/blogs/${blog.slug}`,
    keywords:      blog.metaKeywords.join(', '),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement:   items.map((item, index) => ({
      '@type':    'ListItem',
      position:   index + 1,
      name:       item.name,
      item:       item.url,
    })),
  };
}
