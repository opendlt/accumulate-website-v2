"use client";

import { useState, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DiagramNodeProps {
  label: string;
  sublabel?: string;
  type?: "org" | "site" | "vendor" | "role" | "policy" | "proof";
  className?: string;
  delay?: number;
  id?: string;
  highlighted?: boolean;
  onHover?: (id: string | null) => void;
  isInView?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Animated connection line (SVG)                                     */
/* ------------------------------------------------------------------ */

function ConnectionLine({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
  highlighted = false,
  isInView = true,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  highlighted?: boolean;
  isInView?: boolean;
}) {
  return (
    <g>
      {/* Glow layer */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#lineGlow)"
        strokeWidth={highlighted ? 4 : 2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? (highlighted ? 0.6 : 0.25) : 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        style={{ filter: "blur(3px)" }}
      />
      {/* Core line */}
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="url(#lineGradient)"
        strokeWidth={highlighted ? 2.5 : 1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? (highlighted ? 1 : 0.6) : 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
      {/* Data-flow dot */}
      <motion.circle
        r={highlighted ? 3 : 2}
        fill="#3B82F6"
        initial={{ opacity: 0 }}
        animate={isInView ? {
          cx: [x1, x2],
          cy: [y1, y2],
          opacity: [0, 1, 1, 0],
        } : { opacity: 0 }}
        transition={{
          duration: 2.5,
          delay: delay + 0.8,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        }}
        style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,0.8))" }}
      />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated path connection (for curved lines)                        */
/* ------------------------------------------------------------------ */

function ConnectionPath({
  d,
  delay = 0,
  highlighted = false,
  isInView = true,
}: {
  d: string;
  delay?: number;
  highlighted?: boolean;
  isInView?: boolean;
}) {
  return (
    <g>
      {/* Glow layer */}
      <motion.path
        d={d}
        stroke="url(#lineGlow)"
        strokeWidth={highlighted ? 4 : 2}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? (highlighted ? 0.6 : 0.25) : 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        style={{ filter: "blur(3px)" }}
      />
      {/* Core line */}
      <motion.path
        d={d}
        stroke="url(#lineGradient)"
        strokeWidth={highlighted ? 2.5 : 1.5}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? (highlighted ? 1 : 0.6) : 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        style={{
          strokeDasharray: "6 4",
          animation: isInView ? "dash-flow 1.5s linear infinite" : "none",
        }}
      />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG gradient definitions (shared)                                  */
/* ------------------------------------------------------------------ */

function SvgDefs() {
  return (
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#00A6FB" />
      </linearGradient>
      <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#00A6FB" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  );
}

/* ------------------------------------------------------------------ */
/*  DiagramNode                                                        */
/* ------------------------------------------------------------------ */

function DiagramNode({
  label,
  sublabel,
  type,
  className,
  delay = 0,
  id,
  highlighted,
  onHover,
  isInView = true,
}: DiagramNodeProps) {
  const isOrg = type === "org";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.4, 0.25, 1] as const,
      }}
      onMouseEnter={() => onHover?.(id ?? null)}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        "relative bg-surface/80 backdrop-blur-sm border rounded-[14px] px-4 py-3 transition-all duration-300",
        "group cursor-default",
        isOrg
          ? "border-primary/40 shadow-[0_0_24px_rgba(59,130,246,0.12)]"
          : "border-border",
        type === "vendor" && "border-dashed border-primary/25",
        highlighted &&
          "border-primary/60 shadow-[0_0_28px_rgba(59,130,246,0.2)]",
        !highlighted &&
          "hover:border-primary/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
        className
      )}
    >
      {/* Glow layer behind on hover / highlight */}
      <div
        className={cn(
          "absolute inset-0 rounded-[14px] bg-primary/5 transition-opacity duration-300",
          highlighted ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      />

      {/* Org ring pulse */}
      {isOrg && (
        <div
          className="absolute -inset-[2px] rounded-[16px] border border-primary/20"
          style={{ animation: "glow-pulse 3s ease-in-out infinite" }}
        />
      )}

      <div className="relative">
        <div
          className={cn(
            "font-semibold text-text",
            isOrg ? "text-[0.875rem]" : "text-[0.8125rem]"
          )}
        >
          {label}
        </div>
        {sublabel && (
          <div className="text-xs text-text-muted mt-0.5">{sublabel}</div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  PolicyPill                                                         */
/* ------------------------------------------------------------------ */

function PolicyPill({
  label,
  delay = 0,
  isInView = true,
}: {
  label: string;
  delay?: number;
  isInView?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className="inline-flex items-center bg-primary-soft text-primary text-xs font-semibold rounded-[999px] px-2.5 py-1 border border-primary/20"
    >
      {label}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  ProofStamp (with checkmark draw animation)                         */
/* ------------------------------------------------------------------ */

function ProofStamp({
  label = "Verifiable Proof",
  delay = 0,
  isInView = true,
  stampBounce = false,
}: {
  label?: string;
  delay?: number;
  isInView?: boolean;
  stampBounce?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8, scale: stampBounce ? 0.6 : 1 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: stampBounce ? 0.6 : 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
        ...(stampBounce && isInView ? {
          scale: { type: "spring" as const, stiffness: 300, damping: 15, delay },
        } : {}),
      }}
      className="inline-flex items-center gap-1.5 border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E] text-xs font-semibold rounded-[10px] px-3 py-1.5 shadow-[0_0_16px_rgba(34,197,94,0.1)]"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <motion.path
          d="M5.25 7L6.5 8.25L8.75 5.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 0.6, delay: delay + 0.2, ease: "easeOut" }}
        />
        <motion.path
          d="M12.25 7C12.25 9.8995 9.8995 12.25 7 12.25C4.10051 12.25 1.75 9.8995 1.75 7C1.75 4.10051 4.10051 1.75 7 1.75C9.8995 1.75 12.25 4.10051 12.25 7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeOut" }}
        />
      </svg>
      {label}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile animated tree border                                        */
/* ------------------------------------------------------------------ */

function AnimatedTreeBorder({
  children,
  dashed = false,
  delay = 0,
  className,
  isInView = true,
}: {
  children: React.ReactNode;
  dashed?: boolean;
  delay?: number;
  className?: string;
  isInView?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "ml-6 space-y-3 pl-4 relative",
        className
      )}
    >
      {/* Animated left-border line */}
      <motion.div
        className={cn(
          "absolute left-0 top-0 w-0.5",
          dashed ? "border-l-2 border-dashed border-primary/30" : "bg-gradient-to-b from-primary/40 to-primary/10"
        )}
        initial={{ height: 0 }}
        animate={{ height: isInView ? "100%" : 0 }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
        style={!dashed ? {} : { background: "none" }}
      />
      {/* Glow on the line */}
      {!dashed && (
        <motion.div
          className="absolute left-0 top-0 w-0.5 bg-primary/20"
          initial={{ height: 0 }}
          animate={{ height: isInView ? "100%" : 0 }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
          style={{ filter: "blur(4px)", transform: "translateX(-1px)" }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  IDENTITY TREE DIAGRAM                                              */
/* ================================================================== */

export function IdentityTreeDiagram({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const isHighlighted = useCallback(
    (nodeId: string) => {
      if (!hoveredNode) return false;
      // Highlight connections: parent-child relationships
      const connections: Record<string, string[]> = {
        org: ["siteA", "siteB"],
        siteA: ["org", "vendorX", "roleY"],
        siteB: ["org", "systemZ"],
        vendorX: ["siteA"],
        roleY: ["siteA"],
        systemZ: ["siteB"],
      };
      return (
        nodeId === hoveredNode ||
        (connections[hoveredNode]?.includes(nodeId) ?? false)
      );
    },
    [hoveredNode]
  );

  /* ---- Desktop layout coordinates ---- */
  // Node centres (approx) for SVG connection lines
  // Layout: Org top-centre, SiteA & SiteB below, children below those
  const SVG_W = 520;
  const SVG_H = 340;

  // Node positions (centres)
  const nodes = {
    org: { x: SVG_W / 2, y: 24 },
    siteA: { x: 150, y: 100 },
    siteB: { x: 380, y: 100 },
    vendorX: { x: 100, y: 195 },
    roleY: { x: 210, y: 195 },
    systemZ: { x: 380, y: 195 },
  };

  return (
    <div ref={containerRef} className={cn("relative select-none", className)}>
      {/* ========== Desktop tree layout ========== */}
      <div className="hidden md:block relative" style={{ width: SVG_W, height: SVG_H }}>
        {/* SVG connection layer */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={SVG_W}
          height={SVG_H}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          fill="none"
        >
          <SvgDefs />

          {/* Org -> Site A */}
          <ConnectionLine
            x1={nodes.org.x}
            y1={nodes.org.y + 22}
            x2={nodes.siteA.x}
            y2={nodes.siteA.y - 22}
            delay={0.3}
            highlighted={isHighlighted("org") && isHighlighted("siteA")}
            isInView={isInView}
          />
          {/* Org -> Site B */}
          <ConnectionLine
            x1={nodes.org.x}
            y1={nodes.org.y + 22}
            x2={nodes.siteB.x}
            y2={nodes.siteB.y - 22}
            delay={0.45}
            highlighted={isHighlighted("org") && isHighlighted("siteB")}
            isInView={isInView}
          />
          {/* Site A -> Vendor X */}
          <ConnectionLine
            x1={nodes.siteA.x}
            y1={nodes.siteA.y + 22}
            x2={nodes.vendorX.x}
            y2={nodes.vendorX.y - 22}
            delay={0.6}
            highlighted={isHighlighted("siteA") && isHighlighted("vendorX")}
            isInView={isInView}
          />
          {/* Site A -> Role Y */}
          <ConnectionLine
            x1={nodes.siteA.x}
            y1={nodes.siteA.y + 22}
            x2={nodes.roleY.x}
            y2={nodes.roleY.y - 22}
            delay={0.7}
            highlighted={isHighlighted("siteA") && isHighlighted("roleY")}
            isInView={isInView}
          />
          {/* Site B -> System Z */}
          <ConnectionLine
            x1={nodes.siteB.x}
            y1={nodes.siteB.y + 22}
            x2={nodes.systemZ.x}
            y2={nodes.systemZ.y - 22}
            delay={0.8}
            highlighted={isHighlighted("siteB") && isHighlighted("systemZ")}
            isInView={isInView}
          />
        </svg>

        {/* Nodes as positioned divs */}
        <div className="absolute" style={{ left: nodes.org.x - 82, top: 0 }}>
          <DiagramNode
            label="Org Identity"
            sublabel="acc://acme-corp.acme"
            type="org"
            delay={0}
            id="org"
            highlighted={isHighlighted("org")}
            onHover={setHoveredNode}
            className="w-[164px] text-center"
            isInView={isInView}
          />
        </div>

        <div className="absolute" style={{ left: nodes.siteA.x - 64, top: 78 }}>
          <DiagramNode
            label="Site A"
            sublabel="Operations"
            type="site"
            delay={0.15}
            id="siteA"
            highlighted={isHighlighted("siteA")}
            onHover={setHoveredNode}
            className="w-[128px] text-center"
            isInView={isInView}
          />
        </div>

        <div className="absolute" style={{ left: nodes.siteB.x - 64, top: 78 }}>
          <DiagramNode
            label="Site B"
            sublabel="Engineering"
            type="site"
            delay={0.2}
            id="siteB"
            highlighted={isHighlighted("siteB")}
            onHover={setHoveredNode}
            className="w-[128px] text-center"
            isInView={isInView}
          />
        </div>

        <div className="absolute" style={{ left: nodes.vendorX.x - 60, top: 172 }}>
          <DiagramNode
            label="Vendor X"
            sublabel="Maintenance"
            type="vendor"
            delay={0.35}
            id="vendorX"
            highlighted={isHighlighted("vendorX")}
            onHover={setHoveredNode}
            className="w-[120px] text-center"
            isInView={isInView}
          />
        </div>

        <div className="absolute" style={{ left: nodes.roleY.x - 52, top: 172 }}>
          <DiagramNode
            label="Role Y"
            sublabel="Inspector"
            type="role"
            delay={0.4}
            id="roleY"
            highlighted={isHighlighted("roleY")}
            onHover={setHoveredNode}
            className="w-[104px] text-center"
            isInView={isInView}
          />
        </div>

        <div className="absolute" style={{ left: nodes.systemZ.x - 60, top: 172 }}>
          <DiagramNode
            label="System Z"
            sublabel="Firmware Auth"
            type="role"
            delay={0.45}
            id="systemZ"
            highlighted={isHighlighted("systemZ")}
            onHover={setHoveredNode}
            className="w-[120px] text-center"
            isInView={isInView}
          />
        </div>

        {/* Policy pills under Vendor X */}
        <div
          className="absolute flex flex-col items-center gap-1.5"
          style={{ left: nodes.vendorX.x - 42, top: 222 }}
        >
          <PolicyPill label="2-of-3" delay={0.6} isInView={isInView} />
          <PolicyPill label="Expires 30d" delay={0.7} isInView={isInView} />
        </div>

        {/* Proof stamp */}
        <div
          className="absolute"
          style={{ left: SVG_W / 2 - 70, top: 290 }}
        >
          <ProofStamp delay={1.0} isInView={isInView} />
        </div>
      </div>

      {/* ========== Mobile stacked layout ========== */}
      <div className="md:hidden space-y-3">
        <DiagramNode
          label="Org Identity"
          sublabel="acc://acme-corp.acme"
          type="org"
          delay={0}
          isInView={isInView}
        />
        <AnimatedTreeBorder delay={0.2} isInView={isInView}>
          <DiagramNode label="Site A" sublabel="Operations" type="site" delay={0.3} isInView={isInView} />
          <AnimatedTreeBorder dashed delay={0.4} isInView={isInView}>
            <div className="space-y-2">
              <DiagramNode
                label="Vendor X"
                sublabel="Maintenance"
                type="vendor"
                delay={0.5}
                isInView={isInView}
              />
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.65 }}
              >
                <PolicyPill label="2-of-3" delay={0.7} isInView={isInView} />
                <PolicyPill label="Expires 30d" delay={0.75} isInView={isInView} />
              </motion.div>
            </div>
            <DiagramNode label="Role Y" sublabel="Inspector" type="role" delay={0.6} isInView={isInView} />
          </AnimatedTreeBorder>
          <DiagramNode
            label="Site B"
            sublabel="Engineering"
            type="site"
            delay={0.55}
            isInView={isInView}
          />
          <AnimatedTreeBorder delay={0.65} isInView={isInView}>
            <DiagramNode
              label="System Z"
              sublabel="Firmware Auth"
              type="role"
              delay={0.7}
              isInView={isInView}
            />
          </AnimatedTreeBorder>
        </AnimatedTreeBorder>
        <div className="mt-4">
          <ProofStamp delay={0.9} isInView={isInView} />
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  AUTHORITY POLICY DIAGRAM                                           */
/* ================================================================== */

export function AuthorityPolicyDiagram({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <div ref={containerRef} className={cn("space-y-4 relative", className)}>
      {/* Desktop row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Step 1 */}
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <DiagramNode label="Operator" sublabel="Defines vendor role" delay={0.1} isInView={isInView} />
          <span className="text-xs text-text-subtle">1. Define identity</span>
        </motion.div>

        {/* Arrow 1 */}
        <div className="hidden md:flex items-center justify-center">
          <svg width="60" height="12" viewBox="0 0 60 12" className="overflow-visible">
            <SvgDefs />
            <motion.path
              d="M0 6H50M50 6L44 1M50 6L44 11"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 0.7 : 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.circle
              r="2.5"
              fill="#3B82F6"
              initial={{ opacity: 0 }}
              animate={isInView ? {
                cx: [0, 50],
                cy: [6, 6],
                opacity: [0, 1, 1, 0],
              } : { opacity: 0 }}
              transition={{
                duration: 2,
                delay: 1,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 3px rgba(59,130,246,0.8))" }}
            />
          </svg>
        </div>

        {/* Step 2 */}
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-2">
            <DiagramNode
              label="Authority Policy"
              sublabel="Scoped delegation"
              delay={0.3}
              isInView={isInView}
            />
            <div className="flex flex-wrap justify-center gap-2">
              <PolicyPill label="2-of-3 threshold" delay={0.5} isInView={isInView} />
              <PolicyPill label="Scope: Site A" delay={0.6} isInView={isInView} />
            </div>
          </div>
          <span className="text-xs text-text-subtle">
            2. Grant scoped authority
          </span>
        </motion.div>

        {/* Arrow 2 */}
        <div className="hidden md:flex items-center justify-center">
          <svg width="60" height="12" viewBox="0 0 60 12" className="overflow-visible">
            <SvgDefs />
            <motion.path
              d="M0 6H50M50 6L44 1M50 6L44 11"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 0.7 : 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
            <motion.circle
              r="2.5"
              fill="#3B82F6"
              initial={{ opacity: 0 }}
              animate={isInView ? {
                cx: [0, 50],
                cy: [6, 6],
                opacity: [0, 1, 1, 0],
              } : { opacity: 0 }}
              transition={{
                duration: 2,
                delay: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 3px rgba(59,130,246,0.8))" }}
            />
          </svg>
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Step 3 */}
        <motion.div
          className="flex flex-col items-center gap-2 text-center md:col-start-1"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DiagramNode label="Vendor Action" sublabel="Signs transaction" delay={0.5} isInView={isInView} />
          <span className="text-xs text-text-subtle">3. Vendor signs</span>
        </motion.div>

        {/* Arrow 3 */}
        <div className="hidden md:flex items-center justify-center">
          <svg width="60" height="12" viewBox="0 0 60 12" className="overflow-visible">
            <SvgDefs />
            <motion.path
              d="M0 6H50M50 6L44 1M50 6L44 11"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 0.7 : 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
            <motion.circle
              r="2.5"
              fill="#3B82F6"
              initial={{ opacity: 0 }}
              animate={isInView ? {
                cx: [0, 50],
                cy: [6, 6],
                opacity: [0, 1, 1, 0],
              } : { opacity: 0 }}
              transition={{
                duration: 2,
                delay: 2,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              style={{ filter: "drop-shadow(0 0 3px rgba(59,130,246,0.8))" }}
            />
          </svg>
        </div>

        {/* Step 4 */}
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ProofStamp label="Independently Verifiable" delay={0.8} isInView={isInView} />
          <span className="text-xs text-text-subtle">4. Anyone can verify</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  VERIFICATION FLOW DIAGRAM                                          */
/* ================================================================== */

export function VerificationFlowDiagram({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const steps = [
    { label: "Key Rotated", sublabel: "Old key revoked" },
    { label: "Authority Intact", sublabel: "Continuity preserved" },
    { label: "Proofs Valid", sublabel: "Across all changes" },
  ];

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col md:flex-row items-center gap-4 md:gap-6",
        className
      )}
    >
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-4 md:gap-6">
          <DiagramNode
            label={step.label}
            sublabel={step.sublabel}
            delay={i * 0.2}
            isInView={isInView}
          />
          {i < steps.length - 1 && (
            /* Desktop arrow */
            <svg
              width="40"
              height="12"
              viewBox="0 0 40 12"
              className="hidden md:block shrink-0 overflow-visible"
            >
              <SvgDefs />
              <motion.path
                d="M0 6H34M34 6L28 1M34 6L28 11"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 0.7 : 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
              />
              <motion.circle
                r="2"
                fill="#3B82F6"
                initial={{ opacity: 0 }}
                animate={isInView ? {
                  cx: [0, 34],
                  cy: [6, 6],
                  opacity: [0, 1, 1, 0],
                } : { opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.5 + 1,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                style={{ filter: "drop-shadow(0 0 3px rgba(59,130,246,0.8))" }}
              />
            </svg>
          )}
          {i < steps.length - 1 && (
            /* Mobile arrow */
            <svg
              width="12"
              height="32"
              viewBox="0 0 12 32"
              className="md:hidden shrink-0 overflow-visible"
            >
              <SvgDefs />
              <motion.path
                d="M6 0V26M6 26L1 20M6 26L11 20"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? 0.7 : 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
              />
            </svg>
          )}
        </div>
      ))}
      <motion.div
        className="mt-2 md:mt-0"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{
          duration: 0.5,
          delay: 0.8,
          scale: { type: "spring" as const, stiffness: 300, damping: 15, delay: 0.8 },
        }}
      >
        <ProofStamp delay={0.9} isInView={isInView} stampBounce />
      </motion.div>
    </div>
  );
}
