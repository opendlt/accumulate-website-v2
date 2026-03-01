"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Use the raw value (no spring) when reduced motion is preferred
  const progress = prefersReducedMotion ? scrollYProgress : springProgress;

  // Map 0-1 progress to a percentage string for the tip dot position
  const tipLeft = useTransform(progress, (v) => `${v * 100}%`);

  // Show/hide the tip dot based on scroll progress
  useMotionValueEvent(progress, "change", (latest) => {
    setIsVisible(latest > 0.005);
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-60 pointer-events-none"
      style={{ height: "3px" }}
    >
      {/* Progress bar */}
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: progress,
          background: "linear-gradient(90deg, #3B82F6, #00A6FB)",
          boxShadow:
            "0 0 8px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.2)",
        }}
      />

      {/* Glowing tip dot at the progress edge */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
        style={{
          left: tipLeft,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#00A6FB",
          boxShadow:
            "0 0 6px 2px rgba(0, 166, 251, 0.6), 0 0 14px 4px rgba(59, 130, 246, 0.3)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />
    </div>
  );
}
