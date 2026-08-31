import Image from "next/image";
import { Blob, Sprig, Sparkle, DotScatter } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   PageHero

   The masthead every interior page opens with. Warm paper rather than
   the old dark slab, so the page starts light and the navbar (which is
   transparent until scroll) stays legible over it.

   Pass `image` for the arched portrait treatment; omit it for a purely
   typographic, centred header.
   ════════════════════════════════════════════════════════════════════ */

export function PageHero({
  eyebrow,
  title,
  accent,
  lead,
  image,
  imageAlt = "",
  tone = "champagne",
  children,
}: {
  eyebrow: string;
  title: string;
  /** Italic brass phrase closing the headline. */
  accent?: string;
  lead?: string;
  image?: string;
  imageAlt?: string;
  tone?: "champagne" | "clay";
  /** CTAs or filters sitting under the lead. */
  children?: React.ReactNode;
}) {
  const hasImage = Boolean(image);

  return (
    <section className="relative overflow-hidden bg-sand-100 pb-20 pt-28 dark:bg-navy-900 md:pb-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-warm-wash opacity-70 dark:opacity-20" />
        <Blob tone="clay" className="-left-32 top-4 h-96 w-96" />
        <Blob tone="champagne" className="-right-28 top-24 h-[26rem] w-[26rem]" />
        <Sprig className="left-[5%] bottom-10 hidden h-32 w-24 rotate-[12deg] text-sage-400/60 lg:block" />
        <DotScatter
          className="right-[6%] bottom-16 hidden text-clay-400 xl:grid"
          rows={3}
          cols={4}
        />
      </div>

      <div className="container-max relative z-10">
        <div
          className={cn(
            hasImage
              ? "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
              : "mx-auto max-w-3xl text-center",
          )}
        >
          <div>
            <span
              className={cn(
                "mb-5",
                tone === "clay" ? "eyebrow-pill-clay" : "eyebrow-pill",
              )}
            >
              <Sparkle className="h-2.5 w-2.5" />
              {eyebrow}
            </span>

            <h1 className="heading-xl text-balance text-navy-800 dark:text-sand-100">
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
            </h1>

            {lead && (
              <p
                className={cn(
                  "lead mt-6 text-pretty",
                  !hasImage && "mx-auto max-w-xl",
                )}
              >
                {lead}
              </p>
            )}

            {children && (
              <div
                className={cn(
                  "mt-9 flex flex-wrap gap-4",
                  !hasImage && "justify-center",
                )}
              >
                {children}
              </div>
            )}
          </div>

          {hasImage && (
            <div className="relative">
              <div className="arch-frame-lg relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-sand-200 shadow-soft-lg dark:bg-navy-700">
                <Image
                  src={image!}
                  alt={imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </div>
              {/* Brass outline offset behind the arch, for depth */}
              <div
                aria-hidden
                className="arch-frame-lg pointer-events-none absolute inset-0 mx-auto max-w-sm translate-x-4 translate-y-4 border border-champagne-500/40"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
