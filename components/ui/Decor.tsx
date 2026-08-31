import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   Decorative primitives — "Warm Organic Luxury"

   Purely presentational SVG/CSS ornaments: soft blobs, curved section
   edges, hand-drawn sprigs and scatter dots. They carry the shape
   language that ties every section together.

   All of them are aria-hidden and pointer-events-none by construction —
   they must never intercept a click or reach a screen reader.
   ════════════════════════════════════════════════════════════════════ */

/* ── Section curve ────────────────────────────────────────────────
   A domed edge between two bands. Sits absolutely at the top or bottom
   of a section and is painted in the *neighbouring* band's colour, so
   the two sections appear to nest into each other.

   Usage:
     <section className="relative bg-navy-900">
       <SectionCurve position="top" className="text-sand-100" />
       …
     </section>
   The curve inherits `currentColor`, hence the text-* class.
   ─────────────────────────────────────────────────────────────── */
export function SectionCurve({
  position = "top",
  className,
  height = "clamp(40px, 6vw, 96px)",
}: {
  position?: "top" | "bottom";
  className?: string;
  height?: string;
}) {
  const isTop = position === "top";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 overflow-hidden leading-[0]",
        isTop ? "top-0" : "bottom-0",
        className,
      )}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={cn("h-full w-full", !isTop && "rotate-180")}
        fill="currentColor"
      >
        {/* A single wide arc — the band above spills down and its
            underside is domed, which reads softer than a hard edge. */}
        <path d="M0 0h1440v18c-240 60-480 82-720 82S240 78 0 18V0Z" />
      </svg>
    </div>
  );
}

/* ── Wave ─────────────────────────────────────────────────────────
   A gentler, asymmetric alternative to SectionCurve for places where a
   perfectly symmetric dome would feel too formal. */
export function SectionWave({
  position = "bottom",
  className,
  height = "clamp(48px, 7vw, 110px)",
}: {
  position?: "top" | "bottom";
  className?: string;
  height?: string;
}) {
  const isTop = position === "top";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 overflow-hidden leading-[0]",
        isTop ? "top-0" : "bottom-0",
        className,
      )}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={cn("h-full w-full", !isTop && "rotate-180")}
        fill="currentColor"
      >
        <path d="M0 0h1440v40c-160 46-330 66-520 58C700 90 560 52 380 50 250 49 120 66 0 100V0Z" />
      </svg>
    </div>
  );
}

/* ── Blob ─────────────────────────────────────────────────────────
   A soft, slowly morphing colour field for section backgrounds. Keep
   these low-opacity: they are atmosphere, not content. */
export function Blob({
  className,
  tone = "champagne",
  animate = true,
}: {
  className?: string;
  tone?: "champagne" | "clay" | "sage" | "navy";
  animate?: boolean;
}) {
  const tones: Record<string, string> = {
    champagne: "bg-champagne-300/40 dark:bg-champagne-500/12",
    clay: "bg-clay-200/50 dark:bg-clay-500/12",
    sage: "bg-sage-200/50 dark:bg-sage-500/12",
    navy: "bg-navy-200/40 dark:bg-navy-500/20",
  };

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-blob blur-3xl",
        tones[tone],
        animate && "animate-blob-morph",
        className,
      )}
    />
  );
}

/* ── Sprig ────────────────────────────────────────────────────────
   The hand-drawn leafy stem scattered through the reference layouts.
   Rotate and flip it with utility classes to vary the placement. */
export function Sprig({
  className,
  strokeWidth = 1.6,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 160"
      fill="none"
      className={cn("pointer-events-none absolute", className)}
    >
      {/* stem */}
      <path
        d="M60 158C60 120 58 82 44 46"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* leaves, alternating down the stem */}
      <path
        d="M56 128c-16 4-28-4-32-18 16-6 28 2 32 18Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M58 100c14-2 24-13 24-28-16 0-24 11-24 28Z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M52 74c-15 1-26-8-28-23 15-2 26 7 28 23Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M48 48c13-4 21-16 19-31-15 3-21 15-19 31Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

/* ── Squiggle ─────────────────────────────────────────────────────
   Loose underline / connector stroke. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 160 24"
      fill="none"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M2 14C22 4 34 20 54 12s32-14 52-4 30 12 52 2"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Sparkle ──────────────────────────────────────────────────────
   Four-point star used to punctuate headings and eyebrows. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("pointer-events-none", className)}
    >
      <path d="M12 0c1.1 6.4 4.5 10.4 12 12-7.5 1.6-10.9 5.6-12 12-1.1-6.4-4.5-10.4-12-12C7.5 10.4 10.9 6.4 12 0Z" />
    </svg>
  );
}

/* ── DotScatter ───────────────────────────────────────────────────
   A small confetti field of dots. Purely atmospheric. */
export function DotScatter({
  className,
  rows = 4,
  cols = 4,
}: {
  className?: string;
  rows?: number;
  cols?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute grid gap-2.5", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span
          key={i}
          className="block h-1.5 w-1.5 rounded-full bg-current"
          style={{ opacity: 0.25 + ((i * 7) % 5) * 0.12 }}
        />
      ))}
    </div>
  );
}
