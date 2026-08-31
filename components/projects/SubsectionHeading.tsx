import { Sparkle } from "@/components/ui/Decor";

/* Shared heading for the blocks inside a project detail page, so every
   section on that long scroll opens with the same eyebrow + serif pair. */
export function SubsectionHeading({
  eyebrow,
  title,
  tone = "champagne",
}: {
  eyebrow: string;
  title: string;
  tone?: "champagne" | "clay";
}) {
  return (
    <div className="mb-7">
      <span
        className={
          tone === "clay" ? "eyebrow-pill-clay mb-3" : "eyebrow-pill mb-3"
        }
      >
        <Sparkle className="h-2.5 w-2.5" />
        {eyebrow}
      </span>
      <h2 className="heading-md text-navy-800 dark:text-sand-100">{title}</h2>
    </div>
  );
}
