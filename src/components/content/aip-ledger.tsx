"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/interactive/badge";
import { cn } from "@/lib/utils";

interface AIPItem {
  number: number;
  title: string;
  status: string;
  description: string;
}

interface AIPLedgerProps {
  items: AIPItem[];
}

function LedgerRow({
  aip,
  index,
  isInView,
}: {
  aip: AIPItem;
  index: number;
  isInView: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
      transition={{
        duration: 0.35,
        delay: index * 0.06,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={cn(
        "group relative transition-colors duration-200 hover:bg-overlay/[0.03]",
        index > 0 && "border-t border-overlay/[0.04]"
      )}
    >
      {/* Hover glow bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Desktop row */}
      <div className="hidden md:grid md:grid-cols-[80px_1fr_100px] gap-4 items-start px-5 py-4">
        <span className="font-code text-sm text-primary font-medium tabular-nums pt-0.5">
          AIP-{aip.number}
        </span>
        <div>
          <h4 className="font-heading text-[0.9375rem] font-semibold text-text leading-snug">
            {aip.title}
          </h4>
          <p className="text-[0.8125rem] text-text-muted leading-relaxed mt-1">
            {aip.description}
          </p>
        </div>
        <div className="flex justify-end pt-0.5">
          <Badge
            variant={aip.status === "Accepted" ? "success" : "neutral"}
          >
            {aip.status}
          </Badge>
        </div>
      </div>

      {/* Mobile accordion */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="md:hidden w-full text-left px-5 py-4 flex items-center gap-3"
      >
        <span className="font-code text-sm text-primary font-medium tabular-nums shrink-0">
          AIP-{aip.number}
        </span>
        <span className="font-heading text-[0.9375rem] font-semibold text-text leading-snug flex-1 truncate">
          {aip.title}
        </span>
        <Badge
          variant={aip.status === "Accepted" ? "success" : "neutral"}
          className="shrink-0"
        >
          {aip.status}
        </Badge>
        <svg
          className={cn(
            "w-4 h-4 text-text-muted shrink-0 transition-transform",
            expanded && "rotate-180"
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
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <p className="text-[0.8125rem] text-text-muted leading-relaxed px-5 pb-4">
              {aip.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AIPLedger({ items }: AIPLedgerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] overflow-hidden"
    >
      {/* Table header - desktop only */}
      <div className="hidden md:grid md:grid-cols-[80px_1fr_100px] gap-4 px-5 py-3 border-b border-overlay/[0.06] bg-overlay/[0.02]">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          AIP
        </span>
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Proposal
        </span>
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wider text-right">
          Status
        </span>
      </div>

      {/* Rows */}
      {items.map((aip, i) => (
        <LedgerRow key={aip.number} aip={aip} index={i} isInView={isInView} />
      ))}
    </motion.div>
  );
}
