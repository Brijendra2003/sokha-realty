# Sokha Realty — Premium Real Estate Website

A production-ready, premium real estate website built for **Sokha Realty**, featuring a public marketing site and a full admin panel for managing projects, blogs, leads, and career applications.

## 🛠 Tech Stack

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| Framework      | Next.js 14 (App Router)               |
| Language       | TypeScript                            |
| Styling        | Tailwind CSS                          |
| 3D / Animation | Three.js (hero particles)             |
| Backend / DB   | Firebase Firestore                    |
| File Storage   | Firebase Storage                      |
| Auth           | Firebase Authentication (Admin panel) |
| Forms          | React Hook Form + Zod                 |
| Bot Protection | Google reCAPTCHA v3                   |
| Lead Sync      | Google Sheets API                     |
| Indexing       | Google Indexing API                   |
| Rich Text      | React Quill                           |

## 📁 Project Structure

```
sokha-realty/
├── app/
│   ├── page.tsx                      # Home
│   ├── about/page.tsx                # About
│   ├── projects/page.tsx             # Projects listing
│   ├── projects/[slug]/page.tsx      # Project detail (elevation hero + sticky form)
│   ├── blogs/page.tsx                # Blogs listing
│   ├── blogs/[slug]/page.tsx         # Blog detail (sticky form)
│   ├── career/page.tsx               # Career page + application form
│   ├── contact/page.tsx              # Contact page
│   ├── admin/page.tsx                # Admin login (/admin)
│   ├── admin/dashboard/              # Protected admin panel
│   │   ├── page.tsx                  # Overview/stats
│   │   ├── leads/page.tsx            # Lead stage management (Kanban)
│   │   ├── projects/                 # Project CRUD
│   │   ├── blogs/                    # Blog CRUD (rich text editor)
│   │   └── careers/page.tsx          # Applications + job postings
│   ├── api/
│   │   ├── leads/route.ts            # Lead submission + reCAPTCHA + Sheets sync
│   │   ├── contact/route.ts          # Contact form submission
│   │   ├── career/route.ts           # Career application submission
│   │   └── seo/index/route.ts        # Google Indexing API trigger
│   ├── sitemap.ts                    # Dynamic XML sitemap
│   ├── robots.ts                     # robots.txt
│   └── manifest.ts                   # PWA manifest
├── components/
│   ├── layout/                       # Navbar, Footer, ThemeToggle
│   ├── home/                         # Homepage sections (Hero w/ Three.js, Stats, etc.)
│   ├── projects/                     # Project detail components
│   ├── common/                       # EnquiryForm, ContactForm, CareerForm
│   └── admin/                        # Admin sidebar, rich text editor
├── lib/
│   ├── firebase.ts                   # Client SDK
│   ├── firebase-admin.ts             # Admin SDK (server-only)
│   ├── firestore.ts                  # CRUD helpers
│   ├── storage.ts                    # File upload helpers
│   ├── googleSheets.ts               # Lead → Sheets sync
│   ├── indexing.ts                   # Google Indexing API
│   ├── validators.ts                 # Zod schemas incl. Indian phone validation
│   ├── seo.ts                        # Metadata + JSON-LD generators
│   └── utils.ts
├── types/index.ts                    # All TypeScript interfaces
├── hooks/                            # useRecaptcha, useAdmin
├── firestore.rules                   # Firestore security rules
├── storage.rules                     # Storage security rules
└── scripts/seed.ts                   # Sample data seeder
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore Database**, **Storage**, and **Authentication** (Email/Password provider)
3. Create an admin user under Authentication → Users (this is who logs into `/admin`)
4. Generate a Web App config (Project Settings → General → Your apps)
5. Generate a Service Account key (Project Settings → Service Accounts → Generate new private key)

### 3. Set up reCAPTCHA v3

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register a new site, choose **reCAPTCHA v3**
3. Add your domain(s)
4. Copy the Site Key and Secret Key

### 4. Set up Google Sheets (Lead Storage)

1. Create a Google Sheet for leads
2. Create a Service Account in [Google Cloud Console](https://console.cloud.google.com) with **Google Sheets API** enabled
3. Share the Sheet with the service account email (Editor access)
4. Copy the Spreadsheet ID from the URL

### 5. Set up Google Indexing API (Auto-indexing)

1. Enable the **Indexing API** in Google Cloud Console
2. Use the same or a new service account
3. Add the service account as an **Owner** in [Google Search Console](https://search.google.com/search-console) for your domain

### 6. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in all values in `.env.local` from the steps above.

### 7. Deploy Firestore & Storage rules

```bash
npm install -g firebase-tools
firebase login
firebase init   # select Firestore + Storage, point to existing rules files
firebase deploy --only firestore:rules,storage:rules
```

### 8. (Optional) Seed sample data

```bash
npx tsx scripts/seed.ts
```

### 9. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin panel.

## 🔑 Key Features

### Public Site

- **Home** — Three.js particle hero, animated stats, featured projects, testimonials, latest blogs
- **About** — Company story, founder's note, timeline, values
- **Projects** (`/projects/[slug]`) — Full-width elevation hero, left content (highlights, amenities, configurations, floor plans, connectivity dropdowns, Google Maps), right sticky enquiry form
- **Blogs** (`/blogs/[slug]`) — Cover image hero, article content, right sticky enquiry form
- **Career** — Job listings + application form with resume upload
- **Contact** — Contact form + office map
- **Dark/Light mode** toggle (persisted via `next-themes`)
- **1200px max-width container** on desktop, full-width responsive on mobile
- **Indian mobile number validation** (regex: `^(\+91)?[6-9]\d{9}$`)
- **reCAPTCHA v3** on all public forms (enquiry, contact, career)

### Admin Panel (`/admin`)

- Firebase Auth–protected login
- **Dashboard** — Stats overview, recent leads
- **Leads** — Kanban-style stage management (drag & drop): New → Contacted → Site Visit Scheduled → Site Visit Done → Negotiation → Booked / Not Interested
- **Projects** — Full CRUD with image uploads (elevation, gallery, floor plans), dynamic highlight/amenity/configuration/connectivity fields
- **Blogs** — Full CRUD with rich text editor (React Quill), auto reading-time calculation
- **Careers** — View applications (with resume downloads), create job postings

### SEO

- Dynamic per-page metadata (title, description, OG tags, Twitter cards)
- JSON-LD structured data: `RealEstateAgent`, `Accommodation` (per project), `BlogPosting` (per blog), `BreadcrumbList`
- Auto-generated `sitemap.xml` (includes all projects & blogs)
- `robots.txt` with admin routes disallowed
- **Auto-indexing**: when a project or blog is created/updated in the admin panel, it automatically pings the Google Indexing API and re-pings sitemaps to Google & Bing for faster discovery

## 🎨 Design System

- **Colors**: Charcoal (dark base) + Gold (#C9A84C accent) + Ivory (light base)
- **Typography**: Cormorant Garamond (display/serif) + DM Sans (body) + DM Mono (labels/numbers)
- **Container**: 1200px max-width, full-width on mobile
- All design tokens are defined in `tailwind.config.ts` for easy rebranding

## 📦 Building for Production

```bash
npm run build
npm run start
```

Deploy easily to **Vercel** (recommended for Next.js) — just connect your repo and add the same environment variables in the Vercel dashboard.

## 📝 Notes

- Replace placeholder images in `/public/images/` with real photography before launch
- Update the RERA number, office address, and phone numbers in `components/layout/Footer.tsx` and `app/contact/page.tsx`
- The Google Maps embed URLs in seed data and the contact page are placeholders — replace with your actual office/project coordinates
- For production, consider adding Firebase custom claims for stricter admin role verification (see comments in `firestore.rules`)

- .\ffmpeg.exe -i Patil_Builders_Hero_Video.mp4 -g 1 -keyint_min 1 -sc_threshold 0 -crf 22 -vf scale=1920:-2 -pix_fmt yuv420p -movflags +faststart -an Patil_Builders_Hero_Video_Converted.mp4
