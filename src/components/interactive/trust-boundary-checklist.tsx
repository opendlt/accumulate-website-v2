"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "@phosphor-icons/react";
import Link from "next/link";

interface ChecklistItem {
  readonly id: string;
  readonly label: string;
}

interface TrustBoundaryChecklistProps {
  items: readonly ChecklistItem[];
  className?: string;
}

export function TrustBoundaryChecklist({
  items,
  className,
}: TrustBoundaryChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const thresholdMet = checked.size >= 2;

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item, i) => {
        const isChecked = checked.has(item.id);
        return (
          <motion.label
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 min-h-[44px] group/check",
              isChecked
                ? "bg-primary/[0.06] border border-primary/20"
                : "border border-transparent hover:bg-overlay/[0.03]"
            )}
          >
            <motion.div
              className={cn(
                "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200",
                isChecked
                  ? "bg-primary border-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  : "border-white/20 bg-transparent group-hover/check:border-white/30"
              )}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence>
                {isChecked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check size={14} weight="bold" className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggle(item.id)}
              className="sr-only"
            />
            <span
              className={cn(
                "text-base transition-colors duration-200",
                isChecked ? "text-text" : "text-text-muted"
              )}
            >
              {item.label}
            </span>
          </motion.label>
        );
      })}

      <AnimatePresence>
        {thresholdMet && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-5 overflow-hidden"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-[#22C55E]/[0.06] border border-[#22C55E]/20">
              <span className="inline-flex items-center gap-1.5 rounded-full h-7 px-3 text-[0.8125rem] font-semibold bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                <Check size={14} weight="bold" />
                Accumulate is a fit
              </span>
              <span className="text-sm text-text-muted">
                Start with a 30-day pilot.
              </span>
              <Link
                href="/pilot"
                className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors ml-auto"
              >
                Start a Pilot →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
