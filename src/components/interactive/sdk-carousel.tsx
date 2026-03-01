"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/interactive/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SDKItem {
  title: string;
  description: string;
  href: string;
}

interface SDKCarouselProps {
  items: SDKItem[];
}

export function SDKCarousel({ items }: SDKCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cardWidth = 280;
  const gap = 16;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    // Find the closest card to center
    const centerX = el.scrollLeft + el.clientWidth / 2;
    const index = Math.round(centerX / (cardWidth + gap)) - 1;
    setActiveIndex(Math.max(0, Math.min(items.length - 1, index)));
  }, [items.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = cardWidth + gap;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // Total dot count — show up to 9 dots or group
  const totalDots = items.length;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="relative"
    >
      {/* Arrow buttons */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={cn(
          "absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-sm border border-overlay/[0.1] flex items-center justify-center transition-all",
          canScrollLeft
            ? "text-text hover:bg-surface hover:border-overlay/[0.2]"
            : "text-text-subtle/30 cursor-not-allowed"
        )}
        aria-label="Scroll left"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={cn(
          "absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-surface/80 backdrop-blur-sm border border-overlay/[0.1] flex items-center justify-center transition-all",
          canScrollRight
            ? "text-text hover:bg-surface hover:border-overlay/[0.2]"
            : "text-text-subtle/30 cursor-not-allowed"
        )}
        aria-label="Scroll right"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-2 px-2 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((sdk, i) => (
          <motion.div
            key={sdk.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{
              duration: 0.4,
              delay: i * 0.05,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="snap-center shrink-0"
            style={{ width: cardWidth }}
          >
            <Link
              href={sdk.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "block bg-surface/60 backdrop-blur-sm border rounded-[14px] p-5 h-full transition-all duration-300 hover:-translate-y-px group",
                i === activeIndex
                  ? "border-overlay/[0.12] shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)]"
                  : "border-overlay/[0.06] hover:border-overlay/[0.12]"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading text-[1rem] font-semibold text-text group-hover:text-primary transition-colors">
                  {sdk.title}
                </h3>
                <Badge variant="success" className="text-[0.6875rem] h-6 px-2">
                  Maintained
                </Badge>
              </div>
              <p className="text-[0.8125rem] text-text-muted leading-relaxed">
                {sdk.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              el.scrollTo({
                left: i * (cardWidth + gap),
                behavior: "smooth",
              });
            }}
            className={cn(
              "rounded-full transition-all duration-200",
              i === activeIndex
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-text-muted/30 hover:bg-text-muted/50"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
