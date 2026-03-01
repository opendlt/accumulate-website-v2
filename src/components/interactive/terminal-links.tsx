"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TerminalLinkItem {
  command: string;
  comment: string;
  href: string;
}

interface TerminalLinksProps {
  items: TerminalLinkItem[];
}

export function TerminalLinks({ items }: TerminalLinksProps) {
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
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-overlay/[0.06] bg-overlay/[0.02]">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="text-xs text-text-muted font-code ml-2">
          developer-resources
        </span>
      </div>

      {/* Terminal rows */}
      <div className="py-2">
        {items.map((item, i) => (
          <motion.div
            key={item.command}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.2 + i * 0.12,
              ease: "easeOut",
            }}
          >
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-0 px-4 py-2.5 transition-colors duration-150 hover:bg-overlay/[0.04]"
            >
              {/* Prompt */}
              <span className="font-code text-sm text-[#22C55E] shrink-0 select-none">
                ${" "}
              </span>

              {/* Command */}
              <span className="font-code text-sm text-text group-hover:text-primary transition-colors whitespace-nowrap">
                open {item.command}
              </span>

              {/* Comment */}
              <span className="font-code text-sm text-text-subtle ml-3 truncate">
                # {item.comment}
              </span>

              {/* Blinking cursor on hover */}
              <span className="font-code text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-1 animate-pulse select-none">
                &#9646;
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
