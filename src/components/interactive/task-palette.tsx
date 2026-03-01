"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface TaskItem {
  icon: ReactNode;
  title: string;
  description: string;
}

interface TaskPaletteProps {
  items: TaskItem[];
}

export function TaskPalette({ items }: TaskPaletteProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] overflow-hidden max-w-[700px]"
    >
      {/* Search bar (decorative) */}
      <div className="px-4 py-3 border-b border-overlay/[0.06] bg-overlay/[0.02] flex items-center gap-3">
        <svg
          className="w-4 h-4 text-text-muted shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="text-sm text-text-subtle flex-1">
          What do you want to do?
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-[0.6875rem] font-code text-text-subtle bg-overlay/[0.06] border border-overlay/[0.06] rounded-md px-1.5 py-0.5">
          <span className="text-[0.625rem]">&#8984;</span>K
        </span>
      </div>

      {/* Action rows */}
      <div className="flex flex-col">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            animate={
              isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
            }
            transition={{
              duration: 0.3,
              delay: 0.15 + i * 0.07,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className={cn(
              "group relative flex items-center gap-4 px-4 py-3.5 transition-colors duration-150 hover:bg-overlay/[0.04] cursor-default",
              i < items.length - 1 && "border-b border-overlay/[0.03]"
            )}
          >
            {/* Icon */}
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 text-primary [&_svg]:size-4 shrink-0 transition-colors group-hover:bg-primary/20">
              {item.icon}
            </span>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h4 className="font-heading text-[0.9375rem] font-semibold text-text leading-snug">
                {item.title}
              </h4>
              <p className="text-[0.8125rem] text-text-muted leading-snug mt-0.5 truncate">
                {item.description}
              </p>
            </div>

            {/* Arrow */}
            <span className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              &rarr;
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
