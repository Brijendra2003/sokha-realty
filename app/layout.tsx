import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, DM_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { PageLoaderProvider } from "@/contexts/PageLoaderContext";
import { GlobalLoadingOverlay } from "@/components/common/GlobalLoadingOverlay";
import { Toaster } from "react-hot-toast";
import { defaultMetadata, organizationJsonLd } from "@/lib/seo";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// ─── Fonts ────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
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
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
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
      <body className="font-body bg-ivory-100 dark:bg-charcoal-900 text-charcoal-700 dark:text-ivory-100 antialiased transition-colors duration-300">
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
