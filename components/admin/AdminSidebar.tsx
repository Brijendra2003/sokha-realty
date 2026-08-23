"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Newspaper,
  Briefcase,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAdmin } from "@/hooks/useAdmin";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const NAV = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/dashboard/leads", icon: Users },
  { label: "Projects", href: "/admin/dashboard/projects", icon: Building2 },
  { label: "Blogs", href: "/admin/dashboard/blogs", icon: Newspaper },
  { label: "Careers", href: "/admin/dashboard/careers", icon: Briefcase },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAdmin();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    router.push("/admin");
  };

  return (
    <aside className="sticky top-0 h-screen w-64 flex-shrink-0 bg-charcoal-900 border-r border-charcoal-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-charcoal-700">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-gold-gradient flex items-center justify-center flex-shrink-0">
            <span className="font-display text-charcoal-900 font-bold">S</span>
          </div>
          <div>
            <p className="font-display text-base font-semibold text-white">
              Sokha Realty
            </p>
            <p className="font-mono text-2xs tracking-wider uppercase text-gold-500">
              Admin
            </p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium transition-all duration-200",
                active
                  ? "bg-gold-500/15 text-gold-400 border-l-2 border-gold-500"
                  : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white border-l-2 border-transparent"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-charcoal-700 space-y-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 rounded-sm text-xs text-charcoal-400 hover:text-gold-400 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" /> View Live Site
        </a>

        <div className="flex items-center justify-between px-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">
              {user?.email}
            </p>
            <p className="text-2xs text-charcoal-500">Administrator</p>
          </div>
          <ThemeToggle />
        </div>

        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm font-medium text-charcoal-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
