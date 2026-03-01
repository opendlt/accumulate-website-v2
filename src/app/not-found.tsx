"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Animation variants                                                        */
/* -------------------------------------------------------------------------- */

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* -------------------------------------------------------------------------- */
/*  Floating particle                                                         */
/* -------------------------------------------------------------------------- */

function Particle({ index }: { index: number }) {
  const size = 2 + Math.random() * 3;
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;
  const duration = 12 + Math.random() * 16;
  const delay = Math.random() * 4;

  return (
    <motion.div
      className="absolute rounded-full bg-primary/30"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      animate={{
        x: [0, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 80, 0],
        y: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 120, 0],
        opacity: [0.2, 0.6, 0.3, 0.2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Broken network grid                                                       */
/* -------------------------------------------------------------------------- */

function BrokenNetworkGrid() {
  /* Nodes at grid intersections -- some are dimmed or invisible to convey
     "broken" connections. */
  const nodes = [
    { top: "10%", left: "15%", delay: "0s", broken: false },
    { top: "25%", left: "45%", delay: "1.5s", broken: true },
    { top: "18%", left: "75%", delay: "3s", broken: false },
    { top: "40%", left: "25%", delay: "0.5s", broken: true },
    { top: "55%", left: "60%", delay: "2s", broken: false },
    { top: "65%", left: "85%", delay: "4s", broken: true },
    { top: "75%", left: "35%", delay: "1s", broken: false },
    { top: "85%", left: "70%", delay: "2.5s", broken: true },
    { top: "50%", left: "10%", delay: "3.5s", broken: false },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Broken horizontal lines -- faded segments */}
      {[20, 40, 60, 80].map((top) => (
        <div
          key={`h-${top}`}
          className="absolute h-px"
          style={{
            top: `${top}%`,
            left: `${10 + Math.random() * 30}%`,
            width: `${15 + Math.random() * 25}%`,
            background: `linear-gradient(90deg, transparent, rgba(59,130,246,${
              Math.random() > 0.5 ? 0.08 : 0.03
            }), transparent)`,
          }}
        />
      ))}

      {/* Broken vertical lines -- faded segments */}
      {[25, 50, 75].map((left) => (
        <div
          key={`v-${left}`}
          className="absolute w-px"
          style={{
            left: `${left}%`,
            top: `${10 + Math.random() * 20}%`,
            height: `${20 + Math.random() * 30}%`,
            background: `linear-gradient(180deg, transparent, rgba(59,130,246,${
              Math.random() > 0.5 ? 0.06 : 0.025
            }), transparent)`,
          }}
        />
      ))}

      {/* Scan line */}
      <div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
        style={{ animation: "scanline 8s ease-in-out infinite", top: "0%" }}
      />

      {/* Nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            top: node.top,
            left: node.left,
            opacity: node.broken ? 0.15 : undefined,
            animation: node.broken
              ? undefined
              : `pulse-node 4s ease-in-out ${node.delay} infinite`,
          }}
        >
          <div
            className={`w-full h-full rounded-full ${
              node.broken ? "bg-primary/10" : "bg-primary/30"
            }`}
          />
          {!node.broken && (
            <div
              className="absolute inset-0 rounded-full bg-primary/20 animate-ping"
              style={{ animationDuration: "3s", animationDelay: node.delay }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pulsing ring around the 404 number                                        */
/* -------------------------------------------------------------------------- */

function PulsingRing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outer ring */}
      <motion.div
        className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-primary/10"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Inner ring */}
      <motion.div
        className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full border border-primary/[0.07]"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main 404 page                                                             */
/* -------------------------------------------------------------------------- */

export default function NotFound() {
  /* Prevent SSR mismatch for random particles by rendering only on client */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      {/* ---- Background glow orbs ---- */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary blue glow - top left */}
        <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] rounded-full bg-[#3B82F6] opacity-[0.07] blur-[120px]" />
        {/* Cyan glow - bottom right */}
        <div className="absolute bottom-[-250px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#00A6FB] opacity-[0.05] blur-[120px]" />
        {/* Subtle centre glow */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#3B82F6] opacity-[0.04] blur-[100px]" />
      </div>

      {/* ---- Broken network grid ---- */}
      <BrokenNetworkGrid />

      {/* ---- Floating particles ---- */}
      {mounted && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>
      )}

      {/* ---- Centred content ---- */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 py-16"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* 404 number with glitch effect and pulsing ring */}
        <motion.div variants={scaleFade} className="relative mb-8">
          <PulsingRing />
          <h2
            className="gradient-text font-heading text-[8rem] md:text-[12rem] font-bold leading-none select-none glitch-404"
            aria-hidden="true"
          >
            404
          </h2>
          {/* Glitch / flicker CSS layers */}
          <style dangerouslySetInnerHTML={{ __html: `
            .glitch-404 {
              position: relative;
            }
            .glitch-404::before,
            .glitch-404::after {
              content: "404";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(
                135deg,
                #3b82f6 0%,
                #00a6fb 50%,
                #60a5fa 100%
              );
              background-size: 200% 200%;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              animation: gradient-shift 6s ease infinite;
            }
            .glitch-404::before {
              animation: glitch-before 4s ease-in-out infinite,
                gradient-shift 6s ease infinite;
              clip-path: inset(0 0 65% 0);
            }
            .glitch-404::after {
              animation: glitch-after 4s ease-in-out infinite,
                gradient-shift 6s ease infinite;
              clip-path: inset(65% 0 0 0);
            }
            @keyframes glitch-before {
              0%,
              90%,
              100% {
                transform: translate(0);
              }
              92% {
                transform: translate(-3px, 1px);
              }
              94% {
                transform: translate(2px, -1px);
              }
              96% {
                transform: translate(-1px, 2px);
              }
            }
            @keyframes glitch-after {
              0%,
              88%,
              100% {
                transform: translate(0);
              }
              90% {
                transform: translate(2px, -1px);
              }
              93% {
                transform: translate(-3px, 1px);
              }
              95% {
                transform: translate(1px, -2px);
              }
            }
          `}} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text mb-4"
        >
          Page not found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="text-lg text-text-muted leading-relaxed max-w-md mb-10"
        >
          The identity you&apos;re looking for doesn&apos;t exist in this
          namespace.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center h-11 px-5 rounded-[10px] font-semibold text-sm text-white bg-primary hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center h-11 px-5 rounded-[10px] font-semibold text-sm text-text border border-border hover:border-overlay/[0.15] hover:bg-overlay/[0.04] transition-all"
          >
            View Docs
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
