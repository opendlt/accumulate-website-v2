import React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
 *  Shimmer keyframes – embedded as a <style> tag so the component
 *  remains self-contained (no globals.css dependency).
 *  React deduplicates identical <style> elements in the same head,
 *  so rendering this from multiple Skeleton instances is safe.
 * ------------------------------------------------------------------ */

function ShimmerStyle() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
@keyframes skeleton-shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`,
      }}
    />
  );
}

/* ------------------------------------------------------------------
 *  1. Skeleton – base shimmer element
 * ------------------------------------------------------------------ */

const roundedMap = {
  sm: "rounded-[6px]",
  md: "rounded-[10px]",
  full: "rounded-full",
} as const;

interface SkeletonProps {
  className?: string;
  rounded?: "sm" | "md" | "full";
  style?: React.CSSProperties;
}

export function Skeleton({ className, rounded = "md", style }: SkeletonProps) {
  return (
    <>
      <ShimmerStyle />
      <span
        aria-hidden="true"
        style={style}
        className={cn(
          "relative block overflow-hidden bg-overlay/[0.04]",
          roundedMap[rounded],
          className,
        )}
      >
        {/* Shimmer gradient overlay */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
            animation: "skeleton-shimmer 1.8s ease-in-out infinite",
          }}
        />
      </span>
    </>
  );
}

/* ------------------------------------------------------------------
 *  2. SkeletonText – multiple text-line placeholders
 * ------------------------------------------------------------------ */

const lineWidths = ["100%", "90%", "75%", "95%", "60%", "85%", "70%"];

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          rounded="sm"
          className="h-4"
          style={{ width: lineWidths[i % lineWidths.length] }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
 *  3. SkeletonCard – mirrors the glass-morphism feature cards
 * ------------------------------------------------------------------ */

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] p-6",
        className,
      )}
    >
      {/* Icon circle */}
      <Skeleton rounded="full" className="h-10 w-10 mb-4" />
      {/* Title */}
      <Skeleton rounded="sm" className="h-5 w-[60%] mb-4" />
      {/* Body text lines */}
      <SkeletonText lines={3} />
    </div>
  );
}

/* ------------------------------------------------------------------
 *  4. SkeletonGrid – grid of SkeletonCards
 * ------------------------------------------------------------------ */

const columnMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

interface SkeletonGridProps {
  count?: number;
  columns?: number;
  className?: string;
}

export function SkeletonGrid({
  count = 3,
  columns = 3,
  className,
}: SkeletonGridProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        columnMap[columns] ?? columnMap[3],
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
