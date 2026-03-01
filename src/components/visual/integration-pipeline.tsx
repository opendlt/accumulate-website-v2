"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface PipelineStation {
  title: string;
  description: string;
}

interface IntegrationPipelineProps {
  stations: PipelineStation[];
}

function AnimatedArrow({
  isInView,
  delay,
}: {
  isInView: boolean;
  delay: number;
}) {
  return (
    <div className="hidden md:flex items-center justify-center w-16 shrink-0">
      <svg
        width="64"
        height="24"
        viewBox="0 0 64 24"
        fill="none"
        className="overflow-visible"
      >
        {/* Line */}
        <motion.line
          x1="0"
          y1="12"
          x2="52"
          y2="12"
          stroke="var(--border-color)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, delay, ease: "easeOut" }}
        />
        {/* Arrow head */}
        <motion.path
          d="M48 6 L58 12 L48 18"
          stroke="var(--border-color)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
        />
        {/* Traveling dot */}
        {isInView && (
          <motion.circle
            r="3"
            fill="#3B82F6"
            initial={{ cx: 0, cy: 12, opacity: 0 }}
            animate={{
              cx: [0, 52],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.8,
              delay: delay + 0.6,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "linear",
            }}
          />
        )}
      </svg>
    </div>
  );
}

export function IntegrationPipeline({ stations }: IntegrationPipelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0">
      {stations.map((station, i) => (
        <div key={station.title} className="contents">
          {/* Station node */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: i * 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="flex-1 bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] overflow-hidden hover:border-overlay/[0.12] transition-all duration-300"
          >
            {/* Glass header bar */}
            <div className="px-5 py-3 border-b border-overlay/[0.06] bg-overlay/[0.03]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="font-heading text-[1rem] font-semibold text-text">
                  {station.title}
                </h3>
              </div>
            </div>
            <div className="p-5">
              <p className="text-[0.8125rem] text-text-muted leading-relaxed">
                {station.description}
              </p>
            </div>
          </motion.div>

          {/* Animated arrow between stations */}
          {i < stations.length - 1 && (
            <>
              <AnimatedArrow isInView={isInView} delay={i * 0.2 + 0.3} />
              {/* Mobile: vertical arrow */}
              <div className="flex md:hidden items-center justify-center py-1">
                <svg
                  width="24"
                  height="32"
                  viewBox="0 0 24 32"
                  fill="none"
                >
                  <line
                    x1="12"
                    y1="0"
                    x2="12"
                    y2="24"
                    stroke="var(--border-color)"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 20 L12 28 L18 20"
                    stroke="var(--border-color)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
