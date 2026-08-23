/**
 * Seed script — populates Firestore with sample data for local development.
 *
 * Usage:
 *   1. Ensure .env.local has valid FIREBASE_ADMIN_* credentials
 *   2. Run: npx tsx scripts/seed.ts
 */
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();
const now = admin.firestore.FieldValue.serverTimestamp();

const SAMPLE_PROJECT = {
  slug: "sokha-serene-heights",
  name: "Sokha Serene Heights",
  tagline: "Where Comfort Meets Elegance",
  location: "Powai, Mumbai",
  status: "Ongoing",
  category: "Residential",
  elevationImageUrl:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600",
  galleryImages: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
  ],
  highlights: [
    { icon: "Trees", label: "Open Space", value: "70%" },
    { icon: "Building2", label: "Towers", value: "4" },
    { icon: "Home", label: "Units", value: "320" },
    { icon: "Car", label: "Parking", value: "1:1" },
  ],
  amenities: [
    {
      category: "Recreation",
      items: ["Swimming Pool", "Clubhouse", "Kids Play Area", "Jogging Track"],
    },
    { category: "Wellness", items: ["Gymnasium", "Yoga Deck", "Spa"] },
    {
      category: "Convenience",
      items: ["24x7 Security", "Power Backup", "Covered Parking"],
    },
  ],
  configurations: [
    { type: "1 BHK", area: "450 – 520 sq.ft.", price: "₹65 L onwards" },
    { type: "2 BHK", area: "750 – 900 sq.ft.", price: "₹95 L onwards" },
    { type: "3 BHK", area: "1100 – 1350 sq.ft.", price: "₹1.45 Cr onwards" },
  ],
  floorPlans: [
    {
      type: "2 BHK",
      imageUrl:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
      area: "750 sq.ft.",
    },
    {
      type: "3 BHK",
      imageUrl:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800",
      area: "1100 sq.ft.",
    },
  ],
  connectivity: [
    { name: "Powai Lake", distance: "1.2 km", direction: "Landmarks" },
    { name: "Hiranandani Gardens", distance: "2.5 km", direction: "Landmarks" },
    { name: "Powai Metro Station", distance: "900 m", direction: "Transit" },
    { name: "JVLR Highway", distance: "600 m", direction: "Transit" },
    { name: "IIT Bombay", distance: "3 km", direction: "Education" },
  ],
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60356!2d72.9!3d19.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1",
  rera: "P51800012345",
  priceRange: "₹65 L – ₹1.45 Cr",
  isFeatured: true,
  metaTitle: "Sokha Serene Heights | 1/2/3 BHK in Powai, Mumbai",
  metaDescription:
    "Premium residences at Sokha Serene Heights, Powai. 1, 2 & 3 BHK apartments starting ₹65 L. RERA registered. Book a site visit today.",
  metaKeywords: [
    "Sokha Realty",
    "Powai apartments",
    "Sokha Serene Heights",
    "2 BHK Powai",
    "new projects Mumbai",
  ],
};

const SAMPLE_BLOG = {
  slug: "home-buying-checklist-mumbai-2026",
  title: "10-Point Checklist Before Buying a Home in Mumbai",
  excerpt:
    "From RERA verification to carpet area calculations — everything you need to check before signing on the dotted line.",
  content: `<h2>1. Verify RERA Registration</h2><p>Always check the project's MahaRERA registration number on the official portal before making any payment.</p><h2>2. Understand Carpet Area vs Built-up Area</h2><p>RERA mandates pricing based on carpet area. Make sure your agreement reflects this correctly.</p><h2>3. Check the Builder's Track Record</h2><p>Look at past project delivery timelines and quality before committing to a new launch.</p><h2>4. Review the Payment Schedule</h2><p>Construction-linked plans are generally safer than down-payment plans for under-construction properties.</p><h2>5. Inspect Connectivity</h2><p>Proximity to metro stations, highways, and social infrastructure significantly impacts resale value.</p>`,
  coverImageUrl:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
  author: "Sokha Realty Team",
  category: "Home Buying Guide",
  tags: ["home buying", "RERA", "Mumbai real estate"],
  readTime: 5,
  isFeatured: true,
  metaTitle: "10-Point Home Buying Checklist Mumbai 2026 | Sokha Realty",
  metaDescription:
    "Essential checklist for buying a home in Mumbai — RERA verification, carpet area, payment plans, and more.",
  metaKeywords: [
    "home buying checklist Mumbai",
    "RERA verification",
    "Sokha Realty blog",
  ],
};

async function seed() {
  console.log("Seeding projects...");
  await db
    .collection("projects")
    .add({ ...SAMPLE_PROJECT, createdAt: now, updatedAt: now });

  console.log("Seeding blogs...");
  await db
    .collection("blogs")
    .add({ ...SAMPLE_BLOG, publishedAt: now, updatedAt: now });

  console.log("Seeding job postings...");
  await db.collection("job_postings").add({
    title: "Site Engineer",
    department: "Construction",
    location: "Powai, Mumbai",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "We are looking for an experienced Site Engineer to oversee construction quality and timelines.",
    requirements: [
      "B.E./B.Tech Civil Engineering",
      "3+ years residential construction experience",
      "Strong knowledge of IS codes",
    ],
    isActive: true,
    createdAt: now,
  });

  console.log("✅ Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
