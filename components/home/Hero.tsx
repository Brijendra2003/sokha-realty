"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const ctx = gsap.context(() => {
      const setup = () => {
        video
          .play()
          .then(() => video.pause())
          .catch(() => {});

        let rafId: number | null = null;
        let pendingProgress = 0;

        const seek = () => {
          rafId = null;
          if (!video.duration) return;
          video.currentTime = pendingProgress * video.duration;
        };

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // no smoothing delay — 1:1 with scroll
          onUpdate: (self) => {
            pendingProgress = self.progress;
            if (rafId === null) {
              rafId = requestAnimationFrame(seek);
            }
          },
        });

        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" },
        );
      };

      if (video.readyState >= 1) {
        setup();
      } else {
        video.addEventListener("loadedmetadata", setup, { once: true });
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[500vh]">
      <section className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="/videos/Patil_Builders_Hero_Video_6.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

        <div
          ref={headingRef}
          className="absolute inset-0 flex items-center px-12 text-white"
        >
          {/* your heading content here */}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white">
          ↓ Scroll
        </div>
      </section>
    </div>
  );
}
