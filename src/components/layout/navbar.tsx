"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/buttons/button";
import { NAV_ITEMS } from "@/lib/constants";
import { ThemeToggle } from "@/components/interactive/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-overlay/[0.06] bg-bg/70 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/60">
      <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-text"
                    : "text-text-muted hover:text-text hover:bg-overlay/[0.04]"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button href="/pilot" size="sm">
            Start a Pilot
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-text-muted hover:text-text rounded-lg hover:bg-overlay/[0.04] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-overlay/[0.06] bg-bg/95 backdrop-blur-xl"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-3 py-3 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "text-text bg-overlay/[0.04]"
                        : "text-text-muted hover:text-text hover:bg-overlay/[0.04]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="flex items-center justify-between pt-3">
                <ThemeToggle />
                <Button href="/pilot" className="flex-1 ml-3">
                  Start a Pilot
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
