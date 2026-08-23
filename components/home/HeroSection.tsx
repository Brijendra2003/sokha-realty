"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    import("three").then(
      ({
        WebGLRenderer,
        Scene,
        PerspectiveCamera,
        BufferGeometry,
        BufferAttribute,
        Points,
        PointsMaterial,
        Color,
        AdditiveBlending,
        Float32BufferAttribute,
      }) => {
        const renderer = new WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        const scene = new Scene();
        const camera = new PerspectiveCamera(
          60,
          canvas.clientWidth / canvas.clientHeight,
          0.1,
          1000,
        );
        camera.position.z = 3;

        // ── Particles ────────────────────────────────────────────────
        const COUNT = 2200;
        const positions = new Float32Array(COUNT * 3);
        const colors = new Float32Array(COUNT * 3);
        const sizes = new Float32Array(COUNT);

        const goldColor1 = new Color("#C9A84C");
        const goldColor2 = new Color("#E4B530");
        const ivoryColor = new Color("#F5F0E8");

        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          // Spread in a sphere-like volume
          const r = Math.random() * 5;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);

          positions[i3] = r * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = r * Math.cos(phi);

          // Mix between gold and ivory
          const t = Math.random();
          const col =
            t < 0.6 ? goldColor1.lerp(goldColor2, Math.random()) : ivoryColor;
          colors[i3] = col.r;
          colors[i3 + 1] = col.g;
          colors[i3 + 2] = col.b;

          sizes[i] = Math.random() * 3 + 0.5;
        }

        const geometry = new BufferGeometry();
        geometry.setAttribute(
          "position",
          new Float32BufferAttribute(positions, 3),
        );
        geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
        geometry.setAttribute("size", new Float32BufferAttribute(sizes, 1));

        const material = new PointsMaterial({
          size: 0.04,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          blending: AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
        });

        const particles = new Points(geometry, material);
        scene.add(particles);

        // ── Mouse parallax ───────────────────────────────────────────
        let mouseX = 0,
          mouseY = 0;
        const onMouseMove = (e: MouseEvent) => {
          mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
          mouseY = (e.clientY / window.innerHeight - 0.5) * 0.2;
        };
        window.addEventListener("mousemove", onMouseMove);

        // ── Resize ───────────────────────────────────────────────────
        const onResize = () => {
          if (!canvas) return;
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize);

        // ── Animation Loop ───────────────────────────────────────────
        let t = 0;
        const animate = () => {
          animFrameId = requestAnimationFrame(animate);
          t += 0.003;

          particles.rotation.y = t * 0.08 + mouseX;
          particles.rotation.x = mouseY * 0.5;
          particles.rotation.z = t * 0.02;

          renderer.render(scene, camera);
        };
        animate();

        // ── Cleanup ──────────────────────────────────────────────────
        return () => {
          cancelAnimationFrame(animFrameId);
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("resize", onResize);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        };
      },
    );

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal-900">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/30 via-charcoal-900/60 to-charcoal-900/90" />
      <div className="absolute inset-0 bg-hero-pattern" />

      {/* Content */}
      <div className="relative z-10 container-max py-32 pt-40">
        <div className="max-w-3xl">
          <span className="section-label !text-gold-400 block mb-6">
            Mumbai's Trusted Developer
          </span>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.08] mb-6 text-balance">
            Building Dreams,
            <br />
            <em className="text-gradient-gold not-italic">Defining Skylines</em>
          </h1>

          <p className="font-body text-lg text-charcoal-200 max-w-xl mb-10 leading-relaxed">
            30+ years of landmark projects across Mumbai. Premium residences
            crafted for the discerning few, with quality that outlasts
            generations.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="/projects"
              className="btn-primary text-base !px-8 !py-4"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="btn-secondary !border-white/30 !text-white hover:!bg-white hover:!text-charcoal-900 text-base !px-8 !py-4"
            >
              Get in Touch
            </Link>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            {[
              { value: "30+", label: "Years of Trust" },
              { value: "5,000+", label: "Happy Families" },
              { value: "42+", label: "Projects Delivered" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-display text-3xl font-bold text-gradient-gold">
                  {stat.value}
                </p>
                <p className="font-body text-xs text-charcoal-300 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
        <p className="font-mono text-2xs tracking-[0.25em] uppercase text-charcoal-400">
          Scroll
        </p>
        <ChevronDown className="w-4 h-4 text-gold-500" />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory-100 dark:from-charcoal-900 to-transparent" />
    </section>
  );
}
