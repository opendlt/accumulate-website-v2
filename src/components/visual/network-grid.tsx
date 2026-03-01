"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface NetworkGridProps {
  className?: string;
}

export function NetworkGrid({ className }: NetworkGridProps) {
  const { scrollY } = useScroll();

  // Subtle zoom as user scrolls — grid gently expands to reinforce depth
  const gridScale = useTransform(scrollY, [0, 500], [1, 1.05]);

  return (
    <motion.div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden="true"
      style={{ scale: gridScale, willChange: "transform" }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Animated scan line */}
      <div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        style={{
          animation: "scanline 8s ease-in-out infinite",
          top: "0%",
        }}
      />
      {/* Glowing nodes at intersections */}
      {[
        { top: "15%", left: "20%", delay: "0s" },
        { top: "35%", left: "75%", delay: "2s" },
        { top: "60%", left: "40%", delay: "4s" },
        { top: "80%", left: "65%", delay: "1s" },
        { top: "25%", left: "50%", delay: "3s" },
        { top: "70%", left: "15%", delay: "5s" },
        { top: "45%", left: "90%", delay: "2.5s" },
      ].map((node, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
          style={{
            top: node.top,
            left: node.left,
            animation: `pulse-node 4s ease-in-out ${node.delay} infinite`,
          }}
        >
          <div
            className="absolute inset-0 rounded-full bg-primary/20 animate-ping"
            style={{ animationDuration: "3s", animationDelay: node.delay }}
          />
        </div>
      ))}
    </motion.div>
  );
}
