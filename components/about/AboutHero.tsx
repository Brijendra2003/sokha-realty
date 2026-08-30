import { ArrowDown } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden min-h-[560px] flex items-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/images/Cta_Bg_Img.jpeg')" }}
      />

      {/* Layered overlay — darker toward the base so it melts into the section below */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/70 to-charcoal-900" />
      <div className="absolute inset-0 bg-noise opacity-40" />

      {/* Decorative gold glow orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-gold-400/[0.08] blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-gold-600/[0.07] blur-[120px] pointer-events-none" />

      {/* Hairline frame */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container-max relative z-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-7 opacity-0 animate-fade-up">
          <span className="h-px w-10 bg-gold-500/40" />
          <span className="font-mono text-xs font-medium tracking-[0.25em] uppercase text-gold-400">
            Our Story
          </span>
          <span className="h-px w-10 bg-gold-500/40" />
        </div>

        <h1
          className="heading-xl text-white max-w-2xl mx-auto text-balance opacity-0 animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          Three Decades of{" "}
          <em className="text-gradient-gold not-italic">Building Trust</em>
        </h1>

        <p
          className="font-body text-charcoal-300 text-lg leading-relaxed max-w-xl mx-auto mt-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          From a single project in 1995 to a name synonymous with quality
          across Mumbai — this is the Sokha Realty journey.
        </p>

        <div
          className="mt-14 flex items-center justify-center gap-2 text-charcoal-400 opacity-0 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <span className="font-mono text-2xs tracking-[0.2em] uppercase">
            Discover Our Journey
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-float" />
        </div>
      </div>
    </section>
  );
}
