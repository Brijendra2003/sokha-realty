# PPT Generation Prompt — Sokha Realty Website

> Paste everything below the line into your PPT generator (Gamma, Claude, ChatGPT, Copilot in PowerPoint, Beautiful.ai, etc.).

---

## ROLE

You are a senior presentation designer and technical storyteller. Build a **client-facing PowerPoint deck** that explains a completed real-estate website + admin platform to a **non-technical business owner** (a real estate developer). The client is paying for this build and wants to understand *what they got, what they can do with it, and why it makes them money.*

## AUDIENCE & TONE

- Audience: business owner / marketing head at a real-estate developer. **Not technical.**
- Tone: confident, benefit-led, plain English. Never dump jargon without translating it.
- Rule: every technical feature must be followed by a **"What this means for you"** line in business terms.
- Example: *"ISR caching with a 1-hour revalidation window"* → *"Pages load instantly for visitors, and your Google costs stay near zero."*

## DECK SPECIFICATION

- **Slides:** 27 (as sequenced below — do not merge or reorder)
- **Format:** 16:9 widescreen
- **Per slide:** short headline (max 8 words) + 3–5 bullets (max 12 words each) + one "What this means for you" callout
- **Speaker notes:** write 60–90 words of presenter script under every slide
- **Visuals:** for each slide, describe the diagram / screenshot placeholder / icon set to insert
- Use flow diagrams for any slide describing a process (Slides 13, 15, 16, 19)

## BRAND & DESIGN DIRECTION

- **Palette:** Charcoal `#1C1C1E` (dark base), Gold `#C9A84C` (accent), Ivory `#FDFCFA` (light base)
- **Typography:** Serif display for headlines (Fraunces / Playfair style), clean geometric sans for body (Plus Jakarta Sans / Inter style), monospace for numbers and labels
- **Style:** premium real-estate luxury — generous whitespace, thin gold rules, large numerals, subtle shadows. Think a high-end property brochure, not a startup pitch deck.
- Dark slides for section dividers, ivory slides for content.

---

# SLIDE-BY-SLIDE CONTENT

## SLIDE 1 — Title
**Sokha Realty — Your Complete Digital Platform**
Subtitle: A premium website + a self-serve control panel that markets your projects for you.
Include: logo placeholder, date, "Prepared for: Sokha Realty".

## SLIDE 2 — What We'll Cover
Agenda in 6 parts:
1. The platform at a glance
2. The public website — page by page
3. **Listing a new project (the core workflow)**
4. Automatic Google / SEO engine
5. The admin panel — leads, blogs, careers
6. Security, performance, and go-live

## SLIDE 3 — Two Systems, One Platform
- **The Public Website** — what your buyers see
- **The Admin Panel** — what your team controls, at `/admin`
- Nothing on the website is hard-coded. Everything is editable by your team.
- No developer needed for day-to-day content.
**What this means for you:** you stop paying an agency every time you launch a project.

## SLIDE 4 — Built on Enterprise-Grade Technology
Present as a clean logo/label grid, one line of plain-English benefit each:
| Layer | Technology | Why it matters |
|---|---|---|
| Framework | Next.js 14 | Google-friendly, extremely fast page loads |
| Database | Firebase Firestore | Real-time, scales to millions of visitors |
| Images / Files | Cloudinary | Auto-compressed images, fast on mobile data |
| Login | Firebase Authentication | Bank-grade admin security |
| Bot Protection | Google reCAPTCHA v3 | Invisible spam blocking on every form |
| Lead Backup | Google Sheets API | Every enquiry lands in a live spreadsheet |
| SEO | Google Indexing API + Sitemap | New pages submitted to Google automatically |
| Maps | Google Maps | Live location on every project |
| Animation | GSAP + Three.js + Lenis | Cinematic scroll experience |

## SLIDE 5 — Complete Site Map
Show as a tree diagram. Public pages:
`Home · About · Projects · Project Detail · Blogs · Blog Detail · Career · Contact`
Legal pages: `Privacy Policy · Terms of Service · RERA Disclosures · Disclaimer`
System pages: `Sitemap.xml · robots.txt · PWA manifest · 404 page · Global error page`
Admin: `Login → Dashboard → Leads · Projects · Blogs · Careers`
**What this means for you:** 16 public pages plus unlimited auto-generated project and blog pages.

## SLIDE 6 — Homepage: The First Impression
- **Cinematic scroll hero** — a 192-frame image sequence that plays as the visitor scrolls
- Animated counters: 42+ Projects, 5,000+ Families, 30+ Years, 18 Locations
- Featured Projects strip — you choose which projects appear here with one checkbox
- Why Choose Us · Testimonials · Latest Blog Posts · Call-to-Action band
- Smooth-scroll engine and a branded loading screen while the hero preloads
**What this means for you:** a first 10 seconds that positions you as a premium developer.

## SLIDE 7 — Projects Page: The Buyer's Search Experience
- Grid of every project you've published, with elevation image, status badge, location, starting price
- Instant filters: **Status** (Upcoming / Ongoing / Completed) and **Category** (Residential / Commercial / Luxury / Affordable)
- Additional filter engine already built: locality search, BHK configuration, budget range (25 L → 5 Cr)
- **Compare tool:** shortlist up to 3 projects side by side — location, price, configurations, units, possession, RERA
**What this means for you:** buyers self-qualify before they call you, so your sales team talks to serious leads.

## SLIDE 8 — Project Detail Page: The Conversion Engine
Describe the two-column layout with a labeled wireframe:
- **Full-width elevation hero** at the top
- **Left column (scrolls):** jump navigation, Highlights, Amenities by category, Configurations & Pricing table, Floor Plans, Connectivity distances, Google Map, Photo Gallery, RERA disclaimer
- **Right column (sticky):** an enquiry form that follows the buyer down the entire page and never leaves the screen
- Breadcrumb trail for both users and Google
**What this means for you:** the "Enquire" button is always one tap away — this is the single biggest driver of lead volume.

## SLIDE 9 — Blog: Your SEO Traffic Machine
- Featured article hero + clean card grid
- Categories: Real Estate Tips, Market Trends, Home Buying Guide, Investment, Lifestyle, Legal & Finance
- Auto-calculated reading time, publish dates, tags, author
- Every blog article also carries a **sticky enquiry form**
**What this means for you:** blogs pull in buyers searching Google for advice — and then capture them as leads.

## SLIDE 10 — Career Page
- Live list of open positions, pulled straight from your admin panel
- Perks strip, department / location / type / experience on each role
- Application form with **drag-and-drop resume upload** (PDF/DOC, up to 5 MB)
**What this means for you:** hiring runs through your own site instead of a job portal.

## SLIDE 11 — Contact Page
- Office address, two phone lines, two email addresses, office hours
- Embedded Google Map of your office
- Validated contact form feeding the same lead pipeline
**What this means for you:** every enquiry, from every page, lands in one place.

## SLIDE 12 — Legal & RERA Compliance (Built In)
- **RERA Disclosures page** — a registration register table (project, location, MahaRERA number, valid till) with a direct link to the official MahaRERA portal for independent verification
- Statutory statement under Section 11 of the RERA Act, 2016
- Privacy Policy, Terms of Service, Disclaimer — all full-length, structured legal pages
- The RERA number and "artistic impression" disclaimer appear on every project page and in the footer
**What this means for you:** advertising compliance is handled at the platform level, not per campaign.

---

## SLIDE 13 — ⭐ THE CORE WORKFLOW: Listing a New Project
**This is the headline slide. Present it as a numbered 5-step flow diagram.**

1. **Log in** at `yoursite.com/admin` with your email and password
2. Go to **Projects → New Project**
3. **Fill the form** (one screen, all fields — detailed on the next slide)
4. **Upload images** by drag-and-drop — elevation, gallery, floor plans
5. Click **Save Project**

Then, with no further action from anyone:
→ A brand new page goes live at `yoursite.com/projects/your-project-name`
→ It appears on the Projects page and in the filters
→ It is added to your sitemap
→ It is submitted to Google for indexing

**What this means for you:** a full project microsite in about 10 minutes, by a marketing executive, with zero developer involvement.

## SLIDE 14 — What the Project Form Captures
Present as a grouped checklist, 4 columns:

**Basic Information** — Project name · URL (auto-generated from the name) · Tagline · Location · Status · Category · Price range · MahaRERA number · "Feature on homepage" toggle

**Images** — Elevation hero image · Unlimited gallery images · Floor plan images (auto-compressed and delivered worldwide)

**Repeatable Content Blocks** — add as many rows as you need, in any order:
- **Highlights** — icon + label + value (e.g. "Open Space — 70%")
- **Amenities** — grouped by category (e.g. Recreation → Clubhouse, Pool, Gym)
- **Configurations** — type + area + price (e.g. 2 BHK · 950 sq.ft. · ₹85 L)
- **Floor Plans** — type + area + uploaded plan image
- **Connectivity** — landmark + distance + group (e.g. Powai Lake · 1.2 km · Landmarks)

**Location & SEO** — Google Maps embed · Meta Title · Meta Description · Meta Keywords

**What this means for you:** every project can have a different structure — a luxury tower and an affordable scheme are not forced into the same template.

## SLIDE 15 — ⭐ What Happens the Moment You Hit "Save"
**Present as a horizontal automation pipeline diagram — this is the "wow" slide.**

`YOU CLICK SAVE`
→ **1.** Project saved to the database
→ **2.** A live page is generated at `/projects/your-project-slug`
→ **3.** Page metadata built automatically — title, description, keywords, Facebook/WhatsApp preview card, Twitter card
→ **4.** Structured data (Schema.org) attached so Google can display it as a rich property result
→ **5.** Your `sitemap.xml` regenerates with the new URL included
→ **6.** **Google's Indexing API is notified directly** — a "please crawl this new page" signal sent from your site to Google
→ **7.** Search engines are pinged that the sitemap has changed

Time elapsed: **under 2 seconds.** Manual steps: **zero.**

**What this means for you:** you are not waiting weeks for Google to stumble across your new launch. You tell Google the moment it goes live.

## SLIDE 16 — The SEO Engine (Working 24/7)
Group into four boxes:

**On every page**
- Unique title, description, and keywords
- Canonical URLs (no duplicate-content penalties)
- Open Graph + Twitter cards — links look professional when shared on WhatsApp, Facebook, LinkedIn

**Structured data (Schema.org JSON-LD)**
- `RealEstateAgent` — your company profile, address, phone, social profiles
- `Accommodation` — one per project, so Google understands it as a property listing
- `BlogPosting` — one per article
- `BreadcrumbList` — shows the navigation path in search results

**Automatic technical SEO**
- `sitemap.xml` — regenerates itself, includes every project and blog with priority and update frequency
- `robots.txt` — search engines guided to public pages, blocked from admin
- Admin panel excluded from search results

**Google Search Console integration**
- Verification tag slot ready
- Sitemap submitted at your domain
- Indexing API connected via a Google service account added as an owner in Search Console

**What this means for you:** organic Google traffic instead of paying for every single lead.

> ⚠️ **Presenter honesty note (keep this out of the client slide, use in speaker notes):** Google's Indexing API is officially supported for job-posting and live-stream pages; for other page types it acts as a strong crawl signal, not a guarantee of instant indexing. Google also retired the old `ping?sitemap=` endpoints, so the sitemap is discovered via `robots.txt` and Search Console. The sitemap, structured data, and Search Console submission are what do the real work — and they're all in place.

---

## SLIDE 17 — The Admin Panel: Your Control Room
- Secure login at `/admin` — email + password, **plus invisible bot protection on the login screen itself**
- Dark, focused sidebar: Overview · Leads · Projects · Blogs · Careers
- Live counters on the dashboard: Total Leads · Projects · Blog Posts · Job Applications
- "Recent Leads" table — name, phone, source, stage, how long ago
- "View Live Site" shortcut, light/dark theme toggle, one-click sign out
**What this means for you:** one screen tells you how the business is doing today.

## SLIDE 18 — ⭐ Lead Management: A Built-In CRM
Present as a Kanban board graphic with 7 columns:
`New → Contacted → Site Visit Scheduled → Site Visit Done → Negotiation → Booked / Not Interested`

- **Drag a lead card from one column to the next** as it progresses
- Each card shows name, phone, project of interest, source page, and time since enquiry
- Click any lead for full detail: **tap-to-call, tap-to-email**, their message, and a stage dropdown
- Live search across name, phone, email, and project interest
- Every lead is tagged with its source: Project Page, Blog Page, Contact Page, Home Page, Career Page
**What this means for you:** you can see exactly which project page and which channel is producing bookings — and no enquiry ever gets forgotten.

## SLIDE 19 — Every Lead, Backed Up to Google Sheets
Flow diagram: `Visitor submits form → Spam check → Saved to database → Appended to your Google Sheet → Appears in your Leads board`

- Sheet columns: Date (IST) · Name · Phone · Email · Project Interest · Source · Message · Stage
- The sheet is created and formatted automatically
- If the sheet is ever unreachable, **the lead is still saved** — nothing is lost
**What this means for you:** your sales team can work in a spreadsheet on their phone, while management works the pipeline board. Same data, no double entry.

## SLIDE 20 — Blog Management
- Full **rich-text editor** — headings, bold, lists, quotes, links, embedded images
- Title typed → URL generated automatically
- Reading time calculated as you write
- Cover image upload, category, tags, author, excerpt
- "Feature on homepage" toggle
- Its own SEO meta section
- **Publishing an article triggers the same Google notification pipeline as a project**
**What this means for you:** your marketing team publishes SEO content without touching code.

## SLIDE 21 — Careers Management
- **Applications tab** — every candidate with phone, email, position, experience, date, and a **one-click resume download**
- **Job Postings tab** — create a role with title, department, location, type, experience, description, and requirements
- Toggle a posting Active or Closed; active roles appear on the public Career page instantly
**What this means for you:** recruitment runs itself through your own website.

## SLIDE 22 — Security & Spam Protection
- **Firebase Authentication** — admin passwords are never stored on the site
- **Route-level protection** — admin URLs redirect anyone not signed in
- **Database rules** — the public can *submit* enquiries and applications, but only signed-in admins can read, edit, or delete them
- **Google reCAPTCHA v3 on every form** — enquiry, contact, career, and admin login. Invisible to real users, blocks bots.
- **Server-side validation** — Indian mobile numbers verified against the `6/7/8/9 + 10 digit` standard; every field length- and format-checked before it reaches the database
- **Security headers** — clickjacking blocked, MIME-sniffing blocked, referrer policy enforced, camera/microphone access denied
- All uploads processed server-side; credentials never exposed to the browser
**What this means for you:** no fake leads clogging your sales team, and no exposure to common website attacks.

## SLIDE 23 — Performance & Experience
- **Pre-built pages with hourly refresh** — projects and blogs are served instantly, and the database is only queried once an hour no matter how much traffic arrives
- **Images auto-optimised** — compressed and format-converted per device by Cloudinary
- **Fully responsive** — desktop, tablet, and mobile, with a 1200px premium container on large screens
- **Light and dark mode** across the entire site *and* admin panel
- **Smooth-scroll engine** and cinematic scroll animations
- **Installable as a mobile app** (PWA manifest with your brand colours and icons)
- Custom 404 and error pages
**What this means for you:** fast pages keep buyers on site, and page speed is a direct Google ranking factor.

## SLIDE 24 — Design System: Built for Rebranding
- **Colours:** Charcoal · Gold `#C9A84C` · Ivory
- **Fonts:** Fraunces (display serif) · Plus Jakarta Sans (body) · JetBrains Mono (numbers, RERA IDs)
- Every colour, font, spacing, and shadow lives in **one central design file**
- Change the accent colour once and the entire site — public and admin — updates
**What this means for you:** a future rebrand is a settings change, not a rebuild.

## SLIDE 25 — What's Needed to Go Live
Present as a clean checklist with owner column:

| # | Item | Owner |
|---|---|---|
| 1 | Domain name pointed to hosting | Client |
| 2 | Real project photography, elevations, floor plans | Client |
| 3 | Actual MahaRERA registration numbers per project | Client |
| 4 | Final office address, phone numbers, email addresses | Client |
| 5 | Social media profile links | Client |
| 6 | Google Search Console verification + service-account owner access | Developer |
| 7 | Google Sheet created and shared with the service account | Developer |
| 8 | reCAPTCHA keys registered for the live domain | Developer |
| 9 | Admin user account created | Developer |
| 10 | Deploy to Vercel + go-live checks | Developer |

## SLIDE 26 — Where This Can Go Next (Optional Phase 2)
- Turn on the advanced filter sidebar and compare tray on the Projects page
- WhatsApp instant-alert on every new lead
- Email auto-responder to the buyer within 60 seconds
- Downloadable brochure gated behind the enquiry form
- Multi-user admin with roles (Sales / Marketing / Admin)
- Google Analytics 4 + Meta Pixel + campaign (UTM) attribution — the lead structure already supports UTM tracking
- Virtual site tours / 360° walkthroughs
- Multi-language (Hindi / Marathi)

## SLIDE 27 — Closing
**Your website is now a sales channel, not a brochure.**
Three closing stats, large numerals:
- **10 minutes** — to publish a new project, start to finish
- **0** — developer hours needed for day-to-day content
- **Automatic** — every new page announced to Google the moment it's live

End with: *Thank you · Questions?* and contact details placeholder.

---

# ADDITIONAL INSTRUCTIONS

1. Slides **13, 15, 16, 18, and 19** are the most important — give them the strongest visuals and the most speaker-note detail. These are the features the client is paying for.
2. Insert **screenshot placeholders** with clear captions on slides 6, 7, 8, 13, 17, 18, and 20 (e.g. *"[SCREENSHOT: Admin → New Project form, Basic Information section]"*).
3. Add **section divider slides** (dark charcoal, gold rule, large numeral) before slides 6, 13, 17, and 25.
4. Never use a technical term without an immediate plain-English translation.
5. Keep every slide readable from the back of a room — no paragraphs, no font smaller than 18pt.
6. Deliver as an editable presentation with speaker notes filled in for all 27 slides.
