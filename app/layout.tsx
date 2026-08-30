import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { PageLoaderProvider } from "@/contexts/PageLoaderContext";
import { GlobalLoadingOverlay } from "@/components/common/GlobalLoadingOverlay";
import { Toaster } from "react-hot-toast";
import { defaultMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// ─── Fonts ────────────────────────────────────────────────────────
// Display: Fraunces — warm optical serif for headlines and the wordmark.
const displaySerif = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body: Plus Jakarta Sans — crisp geometric sans for all running text.
const bodySans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

// Labels: JetBrains Mono — eyebrows, RERA numbers, tabular data.
const labelMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displaySerif.variable} ${bodySans.variable} ${labelMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </head>
      <body className="font-body bg-sand-100 dark:bg-navy-900 text-navy-700 dark:text-sand-200 antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <SmoothScroll>
            <PageLoaderProvider>
              {children}
              <GlobalLoadingOverlay />
            </PageLoaderProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                className:
                  "!bg-white dark:!bg-charcoal-700 !text-charcoal-800 dark:!text-ivory-100 !shadow-card",
                duration: 4000,
              }}
            />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
