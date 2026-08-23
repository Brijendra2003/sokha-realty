"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "lenis";

interface SmoothScrollContextValue {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({ lenis: null });

export const useLenis = () => useContext(SmoothScrollContext);

interface SmoothScrollProps {
  children: ReactNode;
  /** Scroll duration in seconds — higher = smoother/slower */
  duration?: number;
  /** Disable on touch devices (recommended: native scroll feels better on mobile) */
  smoothTouch?: boolean;
}

export default function SmoothScroll({
  children,
  duration = 1.2,
  smoothTouch = false,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      touchMultiplier: smoothTouch ? 2 : 0,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [duration, smoothTouch]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
