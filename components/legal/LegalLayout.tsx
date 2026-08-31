import type { ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { Blob, Sparkle } from "@/components/ui/Decor";

export type LegalSection = {
  /** Anchor id — also used by the contents rail. */
  id: string;
  title: string;
  content: ReactNode;
};

type LegalLayoutProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  updated: string;
  effective?: string;
  sections: LegalSection[];
  /** Rendered directly under the intro, above the numbered sections. */
  preamble?: ReactNode;
};

const OTHER_POLICIES = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "RERA Disclosures", href: "/rera" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function LegalLayout({
  eyebrow = "Legal",
  title,
  intro,
  updated,
  effective,
  sections,
  preamble,
}: LegalLayoutProps) {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Header band ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-sand-100 pb-16 pt-28 dark:bg-navy-900 md:pb-20 md:pt-36">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-warm-wash opacity-60 dark:opacity-20" />
            <Blob tone="champagne" className="-right-32 top-8 h-96 w-96" />
            <Blob tone="clay" className="-left-28 bottom-0 h-72 w-72" />
          </div>

          <div className="container-max relative z-10">
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex items-center gap-2 font-mono text-2xs uppercase tracking-label text-navy-400 dark:text-sand-500">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-champagne-700 dark:hover:text-champagne-400"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-sand-400">
                  /
                </li>
                <li className="text-champagne-700 dark:text-champagne-400">
                  {title}
                </li>
              </ol>
            </nav>

            <span className="eyebrow-pill mb-5">
              <Sparkle className="h-2.5 w-2.5" />
              {eyebrow}
            </span>

            <h1 className="heading-xl max-w-3xl text-balance text-navy-800 dark:text-sand-100">
              {title}
            </h1>

            <p className="lead mt-6 max-w-2xl text-pretty">{intro}</p>

            {/* Document metadata as soft chips rather than a bare rule */}
            <dl className="mt-10 flex flex-wrap gap-3">
              {[
                { term: "Last updated", value: updated },
                ...(effective
                  ? [{ term: "Effective from", value: effective }]
                  : []),
                { term: "Applies to", value: "sokharealty.com" },
              ].map((item) => (
                <div
                  key={item.term}
                  className="rounded-2xl border border-sand-300 bg-white px-5 py-3 shadow-soft dark:border-navy-600 dark:bg-navy-700"
                >
                  <dt className="font-mono text-2xs uppercase tracking-label text-navy-400 dark:text-sand-500">
                    {item.term}
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-navy-700 dark:text-sand-200">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Document body ───────────────────────────────────────── */}
        <section className="bg-sand-100 dark:bg-navy-900">
          <div className="container-max py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 lg:gap-20">
              {/* Contents rail */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-2xs uppercase tracking-label text-champagne-700 dark:text-champagne-400 mb-4">
                  Contents
                </p>
                <nav aria-label="Table of contents">
                  <ol className="space-y-1 border-l border-sand-300 dark:border-navy-600">
                    {sections.map((section, i) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="group flex gap-3 -ml-px border-l border-transparent py-2 pl-4 text-sm
                                     text-navy-500 dark:text-sand-400
                                     hover:border-champagne-500 hover:text-champagne-700
                                     dark:hover:text-champagne-400 transition-colors"
                        >
                          <span className="font-mono text-2xs pt-0.5 text-navy-400 dark:text-navy-300 group-hover:text-champagne-500">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="leading-snug">{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-10 hidden lg:block">
                  <p className="font-mono text-2xs uppercase tracking-label text-champagne-700 dark:text-champagne-400 mb-4">
                    Other policies
                  </p>
                  <ul className="space-y-2.5">
                    {OTHER_POLICIES.map((p) => (
                      <li key={p.href}>
                        <Link
                          href={p.href}
                          className="group inline-flex items-center gap-1.5 text-sm text-navy-500 dark:text-sand-400 hover:text-champagne-700 dark:hover:text-champagne-400 transition-colors"
                        >
                          {p.label}
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Sections */}
              <div className="max-w-prose">
                {preamble && <div className="mb-14">{preamble}</div>}

                <div className="space-y-14">
                  {sections.map((section, i) => (
                    <article
                      key={section.id}
                      id={section.id}
                      className="scroll-anchor"
                    >
                      <header className="mb-5">
                        <span className="font-mono text-2xs tracking-label text-champagne-600 dark:text-champagne-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="heading-md mt-2 text-navy-800 dark:text-sand-100">
                          {section.title}
                        </h2>
                        <span className="mt-4 block h-px w-14 bg-gold-gradient" />
                      </header>
                      <div className="legal-prose">{section.content}</div>
                    </article>
                  ))}
                </div>

                {/* Contact card */}
                <div className="mt-20 rounded-[28px] border border-sand-300 bg-white p-8 shadow-soft dark:border-navy-600 dark:bg-navy-700 dark:shadow-dark-card">
                  <p className="section-label">Questions about this document?</p>
                  <h3 className="heading-sm text-navy-800 dark:text-sand-100">
                    Talk to our compliance desk
                  </h3>
                  <p className="mt-3 text-sm text-navy-500 dark:text-sand-400 leading-relaxed">
                    Write to us and we will respond within 7 working days. For
                    grievances under applicable data protection law, please
                    contact our Grievance Officer named in the{" "}
                    <Link
                      href="/privacy"
                      className="text-champagne-700 dark:text-champagne-400 underline underline-offset-4 decoration-champagne-500/40 hover:decoration-champagne-500"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                    <a
                      href="mailto:legal@sokharealty.com"
                      className="inline-flex items-center gap-2.5 text-sm font-medium text-navy-700 dark:text-sand-200 hover:text-champagne-700 dark:hover:text-champagne-400 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-champagne-600 dark:text-champagne-400" />
                      legal@sokharealty.com
                    </a>
                    <a
                      href="tel:+919876543210"
                      className="inline-flex items-center gap-2.5 text-sm font-medium text-navy-700 dark:text-sand-200 hover:text-champagne-700 dark:hover:text-champagne-400 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-champagne-600 dark:text-champagne-400" />
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Mobile: other policies */}
                <div className="mt-12 lg:hidden">
                  <p className="font-mono text-2xs uppercase tracking-label text-champagne-700 dark:text-champagne-400 mb-4">
                    Other policies
                  </p>
                  <ul className="grid grid-cols-2 gap-3">
                    {OTHER_POLICIES.map((p) => (
                      <li key={p.href}>
                        <Link
                          href={p.href}
                          className="block rounded-2xl border border-sand-300 bg-white px-4 py-3 text-sm text-navy-600 transition-colors hover:border-champagne-400 dark:border-navy-600 dark:bg-navy-700 dark:text-sand-300"
                        >
                          {p.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
