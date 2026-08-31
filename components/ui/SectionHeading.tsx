import { cn } from "@/lib/utils";
import { Sparkle } from "./Decor";

/* ════════════════════════════════════════════════════════════════════
   SectionHeading

   Every section opens the same way — a pill eyebrow, a serif heading
   whose last phrase can be set in italic brass, and an optional lead.
   Centring this in one component is what keeps the vertical rhythm
   identical from Home through to the legal pages.
   ════════════════════════════════════════════════════════════════════ */

export function SectionHeading({
  eyebrow,
  title,
  accent,
  lead,
  align = "center",
  tone = "champagne",
  className,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  /** Italic brass phrase appended after the title. */
  accent?: string;
  lead?: React.ReactNode;
  align?: "center" | "left";
  tone?: "champagne" | "clay";
  className?: string;
  /** Trailing slot — usually a CTA that sits beside a left-aligned heading. */
  children?: React.ReactNode;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "relative",
        centered ? "mx-auto max-w-2xl text-center" : "max-w-xl",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-4",
            tone === "clay" ? "eyebrow-pill-clay" : "eyebrow-pill",
          )}
        >
          <Sparkle className="h-2.5 w-2.5" />
          {eyebrow}
        </span>
      )}

      <h2 className="heading-lg text-balance text-navy-800 dark:text-sand-100">
        {title}
        {accent && (
          <>
            {" "}
            <em
              className={cn(
                "script-accent",
                tone === "clay" && "script-accent-clay",
              )}
            >
              {accent}
            </em>
          </>
        )}
      </h2>

      {lead && (
        <p
          className={cn(
            "lead mt-5 text-pretty",
            centered && "mx-auto max-w-xl",
          )}
        >
          {lead}
        </p>
      )}

      {children}
    </div>
  );
}
