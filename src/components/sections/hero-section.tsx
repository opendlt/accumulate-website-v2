"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/buttons/button";
import { IdentityTreeDiagram } from "@/components/interactive/identity-tree-diagram";
import { FloatingElement } from "@/components/motion/floating-element";
import { NetworkGrid } from "@/components/visual/network-grid";
import Link from "next/link";

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function HeroSection() {
  const { scrollY } = useScroll();

  // Parallax transforms — each layer moves at a different rate to create depth
  const glowOrbsY = useTransform(scrollY, [0, 500], [0, -150]);
  const networkGridY = useTransform(scrollY, [0, 500], [0, -80]);
  const diagramY = useTransform(scrollY, [0, 500], [0, -30]);

  // Subtle opacity fade as user scrolls past the hero
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 pt-16 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
      {/* ---- Background effects (slowest parallax layer) ---- */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ y: glowOrbsY, willChange: "transform" }}
      >
        {/* Primary blue glow orb - top left */}
        <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[#3B82F6] opacity-[0.07] blur-[120px]" />
        {/* Cyan glow orb - bottom right */}
        <div className="absolute bottom-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-[#00A6FB] opacity-[0.05] blur-[120px]" />
        {/* Subtle accent orb - centre */}
        <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-[#3B82F6] opacity-[0.04] blur-[100px]" />
      </motion.div>

      {/* ---- Network grid background (medium parallax layer) ---- */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ y: networkGridY, willChange: "transform" }}
      >
        <NetworkGrid />
      </motion.div>

      {/* ---- Content (fades out on scroll, normal scroll speed) ---- */}
      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ opacity: contentOpacity }}
      >
        {/* Left column: copy */}
        <div>
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text"
          >
            <span className="gradient-text">Delegated authority</span> you can
            prove &mdash; across organizations.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-text-muted leading-relaxed"
          >
            Accumulate is a governance-first blockchain built for real-world
            identity and multi-party approval &mdash; so authority, delegation,
            and audit trails remain verifiable even as people, vendors, and keys
            change.
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-6 space-y-2 text-text-muted">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              Model real org structure (teams, vendors, systems) as identities
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              Enforce multi-party approvals &amp; delegation natively
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              Keep costs predictable for ongoing operations
            </li>
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button variant="primary" size="lg" href="/pilot">
              Start a 30-Day Pilot
            </Button>
            <Button variant="secondary" size="lg" href="/how-it-works">
              See How It Works
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-4">
            <Link
              href="/docs"
              className="text-sm text-text-muted hover:text-text transition-colors"
            >
              Builder? Go to Docs &rarr;
            </Link>
          </motion.p>
        </div>

        {/* Right column: animated diagram (slight parallax offset) */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center"
          style={{ y: diagramY, willChange: "transform" }}
        >
          <FloatingElement duration={8} distance={8}>
            <IdentityTreeDiagram />
          </FloatingElement>
        </motion.div>
      </motion.div>
    </section>
  );
}
