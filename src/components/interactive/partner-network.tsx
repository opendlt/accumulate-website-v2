"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

interface Partner {
  name: string;
  role: string;
  description: string;
  href: string;
}

interface PartnerNetworkProps {
  partners: Partner[];
  icons: Record<string, ReactNode>;
}

/* ── Mobile: accordion ─────────────────────────────────────────────── */

function PartnerAccordion({
  partners,
  icons,
  isInView,
}: {
  partners: Partner[];
  icons: Record<string, ReactNode>;
  isInView: boolean;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {partners.map((partner, i) => (
        <motion.div
          key={partner.name}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{
            duration: 0.35,
            delay: i * 0.06,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] overflow-hidden"
        >
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
          >
            <span className="text-primary shrink-0">
              {icons[partner.name]}
            </span>
            <span className="font-heading text-[0.9375rem] font-semibold text-text flex-1">
              {partner.name}
            </span>
            <svg
              className={cn(
                "w-4 h-4 text-text-muted shrink-0 transition-transform duration-200",
                expanded === i && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <AnimatePresence>
            {expanded === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4">
                  <span className="inline-flex items-center rounded-[999px] h-6 px-2.5 text-[0.6875rem] font-semibold text-primary bg-primary/10 border border-primary/20 mb-2">
                    {partner.role}
                  </span>
                  <p className="text-[0.8125rem] text-text-muted leading-relaxed mb-3">
                    {partner.description}
                  </p>
                  <Link
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
                  >
                    Visit &rarr;
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Desktop: master-detail split ──────────────────────────────────── */

export function PartnerNetwork({ partners, icons }: PartnerNetworkProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState(0);

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] overflow-hidden grid grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]"
        >
          {/* ── Left: partner list ── */}
          <div className="border-r border-overlay/[0.06] flex flex-col">
            {partners.map((partner, i) => (
              <motion.button
                key={partner.name}
                initial={{ opacity: 0, x: -12 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -12 }
                }
                transition={{
                  duration: 0.3,
                  delay: i * 0.05,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                onClick={() => setSelected(i)}
                className={cn(
                  "group relative flex items-center gap-3 px-5 py-3.5 text-left transition-colors duration-150",
                  i < partners.length - 1 && "border-b border-overlay/[0.04]",
                  selected === i
                    ? "bg-overlay/[0.05]"
                    : "hover:bg-overlay/[0.03]"
                )}
              >
                {/* Active indicator */}
                <div
                  className={cn(
                    "absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-primary transition-opacity duration-200",
                    selected === i ? "opacity-100" : "opacity-0"
                  )}
                />

                <span
                  className={cn(
                    "shrink-0 transition-colors duration-150 [&_svg]:size-5",
                    selected === i ? "text-primary" : "text-text-muted group-hover:text-text"
                  )}
                >
                  {icons[partner.name]}
                </span>

                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      "block font-heading text-[0.9375rem] font-semibold leading-snug transition-colors duration-150 truncate",
                      selected === i ? "text-text" : "text-text-muted group-hover:text-text"
                    )}
                  >
                    {partner.name}
                  </span>
                  <span className="block text-[0.6875rem] text-text-subtle leading-tight mt-0.5 truncate">
                    {partner.role}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* ── Right: detail panel ── */}
          <div className="p-6 lg:p-8 flex items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                className="w-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-primary [&_svg]:size-6">
                    {icons[partners[selected].name]}
                  </span>
                  <h3 className="font-heading text-[1.25rem] font-semibold text-text">
                    {partners[selected].name}
                  </h3>
                </div>

                <span className="inline-flex items-center rounded-[999px] h-6 px-2.5 text-[0.6875rem] font-semibold text-primary bg-primary/10 border border-primary/20 mb-4">
                  {partners[selected].role}
                </span>

                <p className="text-sm text-text-muted leading-relaxed mb-5">
                  {partners[selected].description}
                </p>

                <Link
                  href={partners[selected].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  Visit {partners[selected].name} &rarr;
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <PartnerAccordion
          partners={partners}
          icons={icons}
          isInView={isInView}
        />
      </div>
    </div>
  );
}
