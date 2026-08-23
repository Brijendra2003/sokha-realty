import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, IndianRupee } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<Project["status"], string> = {
  Upcoming: "badge-blue",
  Ongoing: "badge-gold",
  Completed: "badge-green",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card group block overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-ivory-200 dark:bg-charcoal-700">
        <Image
          src={project.elevationImageUrl || "/images/placeholder.jpg"}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
        <span
          className={`absolute top-3 left-3 ${STATUS_STYLES[project.status]}`}
        >
          {project.status}
        </span>
        <span className="absolute top-3 right-3 badge bg-charcoal-900/70 text-ivory-100 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-charcoal-800 dark:text-ivory-100 mb-1 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
          {project.name}
        </h3>
        <p className="font-body text-sm text-charcoal-500 dark:text-charcoal-300 mb-3 line-clamp-1">
          {project.tagline}
        </p>

        <div className="flex items-center gap-1.5 text-sm text-charcoal-500 dark:text-charcoal-400 mb-4">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gold-400" />
          <span className="truncate">{project.location}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-ivory-200 dark:border-charcoal-600">
          <div>
            <p className="font-mono text-2xs tracking-wider uppercase text-charcoal-400 mb-0.5">
              Starting From
            </p>
            <p className="text-ls font-semibold text-gold-500">
              {project.priceRange}
            </p>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-gold-500 group-hover:gap-2.5 transition-all">
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section className="section-py bg-ivory-100 dark:bg-charcoal-900">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-label">Our Portfolio</span>
            <h2 className="heading-lg text-charcoal-800 dark:text-ivory-100">
              Featured Projects
            </h2>
            <p className="font-body text-charcoal-500 dark:text-charcoal-300 mt-3 max-w-lg">
              Each project is a testament to our commitment to quality living,
              thoughtful design, and enduring value.
            </p>
          </div>
          <Link
            href="/projects"
            className="btn-secondary flex-shrink-0 self-start md:self-auto"
          >
            All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20 text-charcoal-400">
            Projects coming soon…
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
