"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handler = () => setScrolled(window.scrollY > 200);
  //   window.addEventListener("scroll", handler, { passive: true });
  //   return () => window.removeEventListener("scroll", handler);
  // }, []);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY;

      if (pathname === "/") {
        // Home page:
        // Navbar stays transparent for the full 500vh hero.
        const heroHeight = window.innerHeight * 5;

        setScrolled(scrollY >= heroHeight);
      } else {
        // Other pages:
        // Navbar becomes white after 5% of the page.
        const documentHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollableHeight = documentHeight - viewportHeight;

        const threshold = scrollableHeight * 0.05;

        setScrolled(scrollY >= threshold);
      }
    };

    handler();

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        scrolled
          ? "bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-md shadow-card border-b border-ivory-200 dark:border-charcoal-700"
          : "bg-transparent",
      )}
    >
      <nav className="container-max">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-sm bg-gold-gradient flex items-center justify-center">
              <span className="font-display text-charcoal-900 font-bold text-lg">
                S
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-semibold text-charcoal-800 dark:text-ivory-100 tracking-tight">
                Sokha Realty
              </span>
              <span className="font-mono text-2xs tracking-[0.15em] uppercase text-gold-500">
                Est. 1995
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 font-body text-sm font-medium rounded-sm transition-colors duration-200",
                    "hover:text-gold-500 dark:hover:text-gold-400",
                    isActive(link.href)
                      ? "text-gold-500 dark:text-gold-400"
                      : "text-charcoal-600 dark:text-ivory-200",
                    isActive(link.href) && [
                      "after:absolute after:bottom-0 after:left-4 after:right-4",
                      "after:h-0.5 after:bg-gold-gradient after:rounded-full",
                    ],
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />

            <a
              href="tel:+919876543210"
              className="hidden md:flex items-center gap-2 btn-primary !py-2.5 !px-5 text-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-sm text-charcoal-700 dark:text-ivory-100 hover:text-gold-500"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileRef}
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-400 ease-expo-out",
          "bg-white dark:bg-charcoal-900 border-t border-ivory-200 dark:border-charcoal-700",
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-max py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-4 py-3 rounded-sm font-body text-sm font-medium transition-all duration-200",
                "border-l-2",
                isActive(link.href)
                  ? "border-gold-500 text-gold-500 bg-gold-50 dark:bg-gold-900/10"
                  : "border-transparent text-charcoal-700 dark:text-ivory-200 hover:border-gold-300 hover:text-gold-500",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-3 px-4">
            <ThemeToggle />
            <a
              href="tel:+919876543210"
              className="btn-primary !py-2.5 !px-5 text-sm flex-1 text-center"
            >
              <Phone className="w-3.5 h-3.5" /> Enquire Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
