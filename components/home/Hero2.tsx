"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageLoader } from "@/contexts/PageLoaderContext";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 192;
const FRAME_PATH = "/videos/Sokha_Realty_Hero_mvp_frames";

const getFrameSrc = (index: number) =>
  `${FRAME_PATH}/frame_${String(index).padStart(3, "0")}.jpg`;

export default function Hero2() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { showLoader, hideLoader } = usePageLoader();

  // Preload all frames — while this runs, block the whole page with the
  // full-screen overlay (see GlobalLoadingOverlay / PageLoaderContext).
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    let hasReleasedLock = false;
    const images: HTMLImageElement[] = [];

    const releaseLock = () => {
      if (!hasReleasedLock) {
        hasReleasedLock = true;
        hideLoader();
      }
    };

    showLoader();

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !isCancelled) {
          setImagesLoaded(true);
          releaseLock();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !isCancelled) {
          setImagesLoaded(true);
          releaseLock();
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
      // Safety net: if the component unmounts (e.g. fast navigation away)
      // before frames finish loading, release the lock so the overlay
      // never gets stuck blocking other pages.
      releaseLock();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Draw + scroll wiring, once images are ready
  useEffect(() => {
    if (!imagesLoaded) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      canvas.width = wrapper.clientWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${wrapper.clientWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawFrame(currentFrameRef.current);
    };

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      // cover behavior, matching object-cover
      if (imgAspect > canvasAspect) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgAspect;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imgAspect;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx2d.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx2d.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const ctx = gsap.context(() => {
      let rafId: number | null = null;
      let pendingProgress = 0;

      const render = () => {
        rafId = null;
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(pendingProgress * FRAME_COUNT),
        );
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      };

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          pendingProgress = self.progress;
          if (rafId === null) {
            rafId = requestAnimationFrame(render);
          }
        },
      });

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" },
      );

      // draw first frame immediately
      drawFrame(0);
    }, wrapper);

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ctx.revert();
    };
  }, [imagesLoaded]);

  return (
    <div ref={wrapperRef} className="relative h-[500vh]">
      <section className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

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
