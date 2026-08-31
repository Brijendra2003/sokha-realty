import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import type { Project } from "@/types";
import { Sparkle, Sprig } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<Project["status"], string> = {
  Upcoming: "badge-blue",
  Ongoing: "badge-gold",
  Completed: "badge-green",
};

/* Cards on the deep band are light "paper" tiles with an arched photo —
   the arch is the shape that carries through every image on the site. */
function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-[28px] bg-white/[0.06] p-3 backdrop-blur-sm transition-all duration-400 ease-expo-out hover:-translate-y-2 hover:bg-white/[0.1]"
    >
      {/* Arched image */}
      <div className="arch-frame relative h-64 overflow-hidden bg-navy-700 sm:h-72">
        <Image
          src={project.elevationImageUrl || "/images/placeholder.jpg"}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-[900ms] ease-expo-out group-hover:scale-[1.07]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/75 via-navy-900/10 to-transparent" />

        <span
          className={cn(
            "absolute left-4 top-4 backdrop-blur-sm",
            STATUS_STYLES[project.status],
          )}
        >
          {project.status}
        </span>

        {/* Price sits on the image, where the eye already is */}
        <div className="absolute inset-x-4 bottom-4">
          <p className="font-mono text-2xs uppercase tracking-label text-champagne-300">
            From
          </p>
          <p className="font-display text-lg font-semibold text-white">
            {project.priceRange}
          </p>
        </div>
      </div>

      {/* Caption */}
      <div className="px-3 pb-2 pt-5 text-center">
        <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-champagne-300">
          {project.name}
        </h3>
        <p className="mt-1.5 flex items-center justify-center gap-1.5 font-mono text-2xs uppercase tracking-label text-sand-400">
          <MapPin className="h-3 w-3 text-champagne-400" />
          <span className="truncate">{project.location}</span>
        </p>
        <p className="mt-3 line-clamp-2 font-body text-sm text-sand-300/80">
          {project.tagline}
        </p>
      </div>
    </Link>
  );
}

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="curve-top-lg curve-bottom-lg relative -mt-4 overflow-hidden bg-navy-900 py-24 dark:bg-navy-800 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-noise opacity-60" />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-blob bg-champagne-500/[0.07] blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-blob-2 bg-clay-500/[0.07] blur-3xl" />
        <Sprig className="left-[4%] top-24 hidden h-32 w-24 -rotate-12 text-sage-400/25 lg:block" />
        <Sprig className="right-[5%] bottom-24 hidden h-28 w-20 rotate-[200deg] text-champagne-400/25 lg:block" />
      </div>

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-2xs font-medium uppercase tracking-label text-champagne-300">
            <Sparkle className="h-2.5 w-2.5" />
            Featured Homes
          </span>
          <h2 className="heading-lg mt-4 text-balance text-white">
            Addresses people{" "}
            <em className="script-accent text-champagne-300">grow into.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty font-body text-sand-300/85">
            Each project is a promise kept — thoughtful design, honest
            construction and a handover date we hold ourselves to.
          </p>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-white/15 py-20 text-center font-body text-sand-400">
            New launches are being finalised — check back shortly.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <Link href="/projects" className="btn-primary group">
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
