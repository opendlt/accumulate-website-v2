"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/interactive/badge";
import { cn } from "@/lib/utils";

interface RoadmapItem {
  title: string;
  description: string;
}

interface RoadmapKanbanProps {
  shipped: RoadmapItem[];
  inProgress: RoadmapItem[];
  planned: RoadmapItem[];
}

const columns = [
  {
    key: "shipped" as const,
    label: "Shipped",
    badge: "success" as const,
    accentColor: "bg-[#22C55E]",
    borderColor: "border-[#22C55E]/30",
    headerBg: "bg-[#22C55E]/10",
  },
  {
    key: "inProgress" as const,
    label: "In Progress",
    badge: "warning" as const,
    accentColor: "bg-[#F59E0B]",
    borderColor: "border-[#F59E0B]/30",
    headerBg: "bg-[#F59E0B]/10",
  },
  {
    key: "planned" as const,
    label: "Planned",
    badge: "accent" as const,
    accentColor: "bg-primary",
    borderColor: "border-primary/30",
    headerBg: "bg-primary/10",
  },
];

function KanbanColumn({
  column,
  items,
  columnIndex,
}: {
  column: (typeof columns)[number];
  items: RoadmapItem[];
  columnIndex: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: columnIndex * 0.15,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] overflow-hidden flex flex-col min-w-0"
    >
      {/* Column header */}
      <div
        className={cn(
          "px-5 py-4 border-b border-overlay/[0.06] flex items-center justify-between",
          column.headerBg
        )}
      >
        <div className="flex items-center gap-2.5">
          <span
            className={cn("w-2.5 h-2.5 rounded-full", column.accentColor)}
          />
          <h3 className="font-heading text-[1rem] font-semibold text-text">
            {column.label}
          </h3>
        </div>
        <span className="text-xs font-semibold text-text-muted tabular-nums">
          {items.length}
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-col">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{
              duration: 0.35,
              delay: columnIndex * 0.15 + (i + 1) * 0.08,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className={cn(
              "group relative px-5 py-4 transition-colors duration-200 hover:bg-overlay/[0.03]",
              i < items.length - 1 && "border-b border-overlay/[0.04]"
            )}
          >
            {/* Left-edge pip */}
            <div
              className={cn(
                "absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full opacity-40 group-hover:opacity-100 transition-opacity",
                column.accentColor
              )}
            />
            <h4 className="font-heading text-[0.9375rem] font-semibold text-text leading-snug mb-1">
              {item.title}
            </h4>
            <p className="text-[0.8125rem] text-text-muted leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function RoadmapKanban({
  shipped,
  inProgress,
  planned,
}: RoadmapKanbanProps) {
  const [activeTab, setActiveTab] = useState(0);
  const data = { shipped, inProgress, planned };

  return (
    <>
      {/* Mobile: tab pills + single column */}
      <div className="md:hidden">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {columns.map((col, i) => (
            <button
              key={col.key}
              onClick={() => setActiveTab(i)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                activeTab === i
                  ? cn(col.headerBg, col.borderColor, "border text-text")
                  : "text-text-muted hover:text-text bg-surface/40 border border-overlay/[0.06]"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  activeTab === i ? col.accentColor : "bg-text-muted/40"
                )}
              />
              {col.label}
              <span className="text-xs opacity-60">
                {data[col.key].length}
              </span>
            </button>
          ))}
        </div>
        <KanbanColumn
          column={columns[activeTab]}
          items={data[columns[activeTab].key]}
          columnIndex={0}
        />
      </div>

      {/* Desktop: 3-column layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-5">
        {columns.map((col, i) => (
          <KanbanColumn
            key={col.key}
            column={col}
            items={data[col.key]}
            columnIndex={i}
          />
        ))}
      </div>
    </>
  );
}
