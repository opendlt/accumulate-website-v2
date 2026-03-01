"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

interface BentoItem {
  title: string;
  icon: ReactNode;
  description: string;
  href: string;
  featured?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
}

function BentoCell({
  item,
  index,
  isInView,
  totalColumns,
}: {
  item: BentoItem;
  index: number;
  isInView: boolean;
  totalColumns: number;
}) {
  // Calculate diagonal stagger delay: top-left to bottom-right
  const row = Math.floor(index / totalColumns);
  const col = index % totalColumns;
  const diagonalIndex = row + col;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.45,
        delay: diagonalIndex * 0.08,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(item.featured && "md:col-span-2")}
    >
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] p-6 h-full transition-all duration-300 hover:border-overlay/[0.12] hover:-translate-y-px overflow-hidden"
      >
        {/* Glow border effect on hover */}
        <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-primary/10 via-transparent to-[#00A6FB]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative">
          {/* Icon with glow */}
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-4 [&_svg]:size-5 transition-colors duration-300 group-hover:bg-primary/20 relative">
            {item.icon}
            {/* Subtle icon glow */}
            <span className="absolute inset-0 rounded-lg bg-primary/20 blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
          </span>

          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-[1rem] font-semibold text-text leading-snug group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <span className="text-text-muted group-hover:text-text transition-colors shrink-0 text-sm">
              &rarr;
            </span>
          </div>
          <p className="text-[0.8125rem] text-text-muted leading-relaxed mt-2">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function BentoGrid({ items }: BentoGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {items.map((item, i) => (
        <BentoCell
          key={item.title}
          item={item}
          index={i}
          isInView={isInView}
          totalColumns={3}
        />
      ))}
    </div>
  );
}
