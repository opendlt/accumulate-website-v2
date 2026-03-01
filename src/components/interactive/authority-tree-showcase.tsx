"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type NodeType = "org" | "department" | "team" | "vendor" | "role" | "system";

interface ShowcaseNode {
  id: string;
  type: NodeType;
  label: string;
  parentId: string | null;
  policies: string[];
}

interface ShowcaseExample {
  title: string;
  subtitle: string;
  nodes: ShowcaseNode[];
}

/* ------------------------------------------------------------------ */
/*  Node type metadata                                                 */
/* ------------------------------------------------------------------ */

const NODE_META: Record<
  NodeType,
  { label: string; color: string; bg: string }
> = {
  org: { label: "Organization", color: "#3B82F6", bg: "rgba(59,130,246,0.10)" },
  department: { label: "Department", color: "#06B6D4", bg: "rgba(6,182,212,0.10)" },
  team: { label: "Team", color: "#3B82F6", bg: "rgba(59,130,246,0.08)" },
  vendor: { label: "Vendor", color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
  role: { label: "Role", color: "#94A3B8", bg: "rgba(148,163,184,0.06)" },
  system: { label: "System", color: "#8B5CF6", bg: "rgba(139,92,246,0.10)" },
};

/* ------------------------------------------------------------------ */
/*  Curated examples                                                   */
/* ------------------------------------------------------------------ */

const EXAMPLES: ShowcaseExample[] = [
  {
    title: "Enterprise Vendor Management",
    subtitle: "Scoped delegation windows for external partners across sites",
    nodes: [
      { id: "1", type: "org", label: "Acme Corp", parentId: null, policies: [] },
      { id: "2", type: "department", label: "Site Alpha", parentId: "1", policies: [] },
      { id: "3", type: "department", label: "Site Beta", parentId: "1", policies: [] },
      { id: "4", type: "vendor", label: "Vendor X", parentId: "2", policies: ["Expires 30d"] },
      { id: "5", type: "vendor", label: "Vendor Y", parentId: "3", policies: ["2-of-3", "Expires 30d"] },
      { id: "6", type: "role", label: "Tech Lead", parentId: "2", policies: [] },
    ],
  },
  {
    title: "Corporate Treasury",
    subtitle: "Threshold approvals and delegation for high-value actions",
    nodes: [
      { id: "1", type: "org", label: "Board", parentId: null, policies: [] },
      { id: "2", type: "department", label: "Treasury", parentId: "1", policies: ["3-of-5"] },
      { id: "3", type: "role", label: "CFO", parentId: "2", policies: ["2-of-3"] },
      { id: "4", type: "role", label: "Controller", parentId: "2", policies: ["2-of-3"] },
      { id: "5", type: "role", label: "Auditor", parentId: "2", policies: ["Read Only"] },
    ],
  },
  {
    title: "Government Coalition",
    subtitle: "Federated authority — no single administrator",
    nodes: [
      { id: "1", type: "org", label: "Coalition", parentId: null, policies: ["3-of-5"] },
      { id: "2", type: "department", label: "Agency A", parentId: "1", policies: [] },
      { id: "3", type: "department", label: "Agency B", parentId: "1", policies: [] },
      { id: "4", type: "team", label: "Shared Ops", parentId: "2", policies: ["2-of-3"] },
      { id: "5", type: "team", label: "Shared Ops", parentId: "3", policies: ["2-of-3"] },
      { id: "6", type: "system", label: "Joint Ledger", parentId: "1", policies: ["Read Only"] },
    ],
  },
  {
    title: "Prime / Sub Contractor",
    subtitle: "Scoped delegation with expiration across contract hierarchy",
    nodes: [
      { id: "1", type: "org", label: "Prime Corp", parentId: null, policies: [] },
      { id: "2", type: "department", label: "Program Office", parentId: "1", policies: [] },
      { id: "3", type: "vendor", label: "Sub A", parentId: "2", policies: ["Expires 90d"] },
      { id: "4", type: "vendor", label: "Sub B", parentId: "2", policies: ["Expires 90d"] },
      { id: "5", type: "role", label: "Program Mgr", parentId: "2", policies: ["2-of-3"] },
    ],
  },
  {
    title: "Multi-Division Enterprise",
    subtitle: "Parent company governance across divisions, departments, and roles",
    nodes: [
      { id: "1", type: "org", label: "Holding Company", parentId: null, policies: [] },
      { id: "2", type: "department", label: "Division A", parentId: "1", policies: [] },
      { id: "3", type: "department", label: "Division B", parentId: "1", policies: [] },
      { id: "4", type: "team", label: "Engineering", parentId: "2", policies: [] },
      { id: "5", type: "team", label: "Operations", parentId: "3", policies: [] },
      { id: "6", type: "role", label: "CTO", parentId: "4", policies: ["2-of-3"] },
      { id: "7", type: "role", label: "COO", parentId: "5", policies: ["2-of-3"] },
    ],
  },
  {
    title: "Regulated Network",
    subtitle: "Consortium governance with validator rotation policies",
    nodes: [
      { id: "1", type: "org", label: "Consortium", parentId: null, policies: ["3-of-5"] },
      { id: "2", type: "department", label: "Member A", parentId: "1", policies: [] },
      { id: "3", type: "department", label: "Member B", parentId: "1", policies: [] },
      { id: "4", type: "system", label: "Validator 1", parentId: "2", policies: ["Key Rotation"] },
      { id: "5", type: "system", label: "Validator 2", parentId: "3", policies: ["Key Rotation"] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Layout engine                                                      */
/* ------------------------------------------------------------------ */

const NODE_W = 136;
const NODE_H = 44;
const LEVEL_GAP = 90;
const SIBLING_GAP = 154;

interface LayoutNode extends ShowcaseNode {
  x: number;
  y: number;
}

function layoutTree(nodes: ShowcaseNode[]): LayoutNode[] {
  if (nodes.length === 0) return [];

  const childrenOf: Record<string, string[]> = {};
  const nodeMap: Record<string, LayoutNode> = {};
  let rootId: string | null = null;

  for (const n of nodes) {
    nodeMap[n.id] = { ...n, x: 0, y: 0 };
    if (n.parentId === null) rootId = n.id;
    if (!childrenOf[n.id]) childrenOf[n.id] = [];
  }
  for (const n of nodes) {
    if (n.parentId && childrenOf[n.parentId]) {
      childrenOf[n.parentId].push(n.id);
    }
  }

  if (!rootId) return nodes.map((n) => ({ ...n, x: 0, y: 0 }));

  const depthOf: Record<string, number> = {};
  const queue = [rootId];
  depthOf[rootId] = 0;
  const ordered: string[] = [];

  while (queue.length > 0) {
    const cur = queue.shift()!;
    ordered.push(cur);
    for (const k of childrenOf[cur] ?? []) {
      depthOf[k] = (depthOf[cur] ?? 0) + 1;
      queue.push(k);
    }
  }

  const levels: Record<number, string[]> = {};
  let maxDepth = 0;
  for (const id of ordered) {
    const d = depthOf[id] ?? 0;
    if (!levels[d]) levels[d] = [];
    levels[d].push(id);
    if (d > maxDepth) maxDepth = d;
  }

  for (let d = 0; d <= maxDepth; d++) {
    const row = levels[d] ?? [];
    const totalWidth = row.length * SIBLING_GAP;
    const startX = -totalWidth / 2 + SIBLING_GAP / 2;
    for (let i = 0; i < row.length; i++) {
      nodeMap[row[i]].x = startX + i * SIBLING_GAP;
      nodeMap[row[i]].y = d * LEVEL_GAP;
    }
  }

  return ordered.map((id) => nodeMap[id]);
}

/* ------------------------------------------------------------------ */
/*  Node icon (inline SVG)                                             */
/* ------------------------------------------------------------------ */

function NodeIcon({ type, size = 14 }: { type: NodeType; size?: number }) {
  const c = NODE_META[type].color;
  switch (type) {
    case "org":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <rect x="4" y="1" width="8" height="6" rx="1" stroke={c} strokeWidth="1.5" />
          <rect x="1" y="9" width="5" height="6" rx="1" stroke={c} strokeWidth="1.5" />
          <rect x="10" y="9" width="5" height="6" rx="1" stroke={c} strokeWidth="1.5" />
          <line x1="8" y1="7" x2="8" y2="9" stroke={c} strokeWidth="1.5" />
          <line x1="3.5" y1="9" x2="12.5" y2="9" stroke={c} strokeWidth="1.5" />
        </svg>
      );
    case "department":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <rect x="2" y="2" width="12" height="12" rx="2" stroke={c} strokeWidth="1.5" />
          <line x1="2" y1="6" x2="14" y2="6" stroke={c} strokeWidth="1.5" />
          <line x1="6" y1="6" x2="6" y2="14" stroke={c} strokeWidth="1.5" />
        </svg>
      );
    case "team":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <circle cx="5" cy="5" r="2.5" stroke={c} strokeWidth="1.5" />
          <circle cx="11" cy="5" r="2.5" stroke={c} strokeWidth="1.5" />
          <circle cx="8" cy="12" r="2.5" stroke={c} strokeWidth="1.5" />
          <line x1="6.5" y1="7" x2="7.5" y2="10" stroke={c} strokeWidth="1" strokeLinecap="round" />
          <line x1="9.5" y1="7" x2="8.5" y2="10" stroke={c} strokeWidth="1" strokeLinecap="round" />
        </svg>
      );
    case "vendor":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <path d="M2 6L8 2L14 6V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="6" y="9" width="4" height="5" stroke={c} strokeWidth="1.5" />
        </svg>
      );
    case "role":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="5" r="3" stroke={c} strokeWidth="1.5" />
          <path d="M3 14C3 11.2386 5.23858 9 8 9C10.7614 9 13 11.2386 13 14" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "system":
      return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="8" rx="1.5" stroke={c} strokeWidth="1.5" />
          <line x1="5" y1="14" x2="11" y2="14" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="11" x2="8" y2="14" stroke={c} strokeWidth="1.5" />
          <circle cx="8" cy="7" r="1" fill={c} />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Connection line                                                    */
/* ------------------------------------------------------------------ */

function ConnectionLine({
  x1, y1, x2, y2, delay, uniqueId,
}: {
  x1: number; y1: number; x2: number; y2: number; delay: number; uniqueId: string;
}) {
  const midY = y1 + (y2 - y1) * 0.5;
  const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

  return (
    <g>
      <motion.path
        d={d}
        stroke={`url(#ats-glow-${uniqueId})`}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        style={{ filter: "blur(3px)" }}
      />
      <motion.path
        d={d}
        stroke={`url(#ats-grad-${uniqueId})`}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
      />
      <motion.circle
        r={2.5}
        fill="#3B82F6"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, delay: delay + 0.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,0.8))" }}
      >
        <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${delay + 0.5}s`} path={d} />
      </motion.circle>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Proof stamp                                                        */
/* ------------------------------------------------------------------ */

function ProofStamp({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="inline-flex items-center gap-2 border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E] text-[0.75rem] font-semibold rounded-[10px] px-3.5 py-2 shadow-[0_0_20px_rgba(34,197,94,0.12)]"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <motion.path
          d="M6 8L7.5 9.5L10 6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.15 }}
        />
        <motion.path
          d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.05 }}
        />
      </svg>
      Verifiable Proof
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single example view                                                */
/* ------------------------------------------------------------------ */

function ExampleView({ example, uniqueId }: { example: ShowcaseExample; uniqueId: string }) {
  const layout = layoutTree(example.nodes);

  // Canvas bounds
  let minX = Infinity, maxX = -Infinity, maxY = 0;
  for (const n of layout) {
    if (n.x - NODE_W / 2 < minX) minX = n.x - NODE_W / 2;
    if (n.x + NODE_W / 2 > maxX) maxX = n.x + NODE_W / 2;
    if (n.y + NODE_H > maxY) maxY = n.y + NODE_H;
  }
  const canvasW = maxX - minX + 40;
  const canvasH = maxY + 80;
  const offsetX = -minX + 20;

  // Build connections
  const nodeMap: Record<string, LayoutNode> = {};
  for (const n of layout) nodeMap[n.id] = n;
  const connections: { from: LayoutNode; to: LayoutNode; index: number }[] = [];
  let connIdx = 0;
  for (const n of layout) {
    if (n.parentId && nodeMap[n.parentId]) {
      connections.push({ from: nodeMap[n.parentId], to: n, index: connIdx++ });
    }
  }

  // Animation stagger: 0.3s per node
  const nodeDelay = (i: number) => i * 0.3;
  // Connections appear after their child node
  const connDelay = (conn: { to: LayoutNode }) => {
    const childIdx = layout.findIndex((n) => n.id === conn.to.id);
    return childIdx * 0.3;
  };
  const totalBuildTime = layout.length * 0.3 + 0.5;

  return (
    <motion.div
      key={example.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Tree canvas */}
      <div
        className="relative mx-auto"
        style={{
          width: Math.max(canvasW, 300),
          height: Math.max(canvasH, 200),
          minHeight: 320,
        }}
      >
        {/* SVG connections */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id={`ats-grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#00A6FB" />
            </linearGradient>
            <linearGradient id={`ats-glow-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00A6FB" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {connections.map((conn) => (
            <ConnectionLine
              key={`${conn.from.id}-${conn.to.id}`}
              x1={conn.from.x + offsetX}
              y1={conn.from.y + NODE_H + 16}
              x2={conn.to.x + offsetX}
              y2={conn.to.y + 16}
              delay={connDelay(conn)}
              uniqueId={uniqueId}
            />
          ))}
        </svg>

        {/* Nodes */}
        {layout.map((node, i) => {
          const meta = NODE_META[node.type];
          return (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                left: node.x + offsetX - NODE_W / 2,
                top: node.y + 16,
                width: NODE_W,
              }}
              initial={{ opacity: 0, scale: 0.6, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: nodeDelay(i),
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <div
                className={`rounded-[12px] px-3 py-2.5 backdrop-blur-sm border transition-all duration-200 ${
                  node.type === "vendor" ? "border-dashed" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, ${meta.bg}, color-mix(in srgb, var(--surface) 70%, transparent))`,
                  borderColor: `${meta.color}33`,
                  boxShadow: `inset 0 1px 0 color-mix(in srgb, var(--overlay) 4%, transparent)`,
                }}
              >
                <div className="flex items-center gap-2">
                  <NodeIcon type={node.type} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.75rem] font-semibold truncate" style={{ color: "var(--text-color)" }}>
                      {node.label}
                    </div>
                    <div className="text-[0.625rem] truncate" style={{ color: "var(--text-subtle)" }}>
                      {meta.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Policy pills */}
              {node.policies.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-1 mt-1.5 justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: nodeDelay(i) + 0.2 }}
                >
                  {node.policies.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center text-[0.625rem] font-semibold rounded-full px-2 py-0.5 border"
                      style={{
                        background: "rgba(59,130,246,0.12)",
                        borderColor: "rgba(59,130,246,0.2)",
                        color: "#3B82F6",
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Proof stamp */}
      <div className="flex justify-center mt-2">
        <ProofStamp delay={totalBuildTime} />
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  AUTHORITY TREE SHOWCASE                                            */
/* ================================================================== */

const AUTO_ROTATE_INTERVAL = 8000; // 8 seconds per example

export function AuthorityTreeShowcase({ className }: { className?: string }) {
  const uniqueId = useId().replace(/:/g, "");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EXAMPLES.length);
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
    // Resume auto-rotate after 15s of inactivity
    const resume = setTimeout(() => setIsPaused(false), 15000);
    return () => clearTimeout(resume);
  }, []);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + EXAMPLES.length) % EXAMPLES.length);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % EXAMPLES.length);
  }, [activeIndex, goTo]);

  const example = EXAMPLES[activeIndex];

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      {/* Glow backgrounds */}
      <div
        className="absolute rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
        style={{ width: 500, height: 500, background: "#3B82F6", top: -100, left: -150 }}
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{ width: 400, height: 400, background: "#8B5CF6", bottom: -100, right: -100 }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="mb-6 text-center">
        <h3
          className="text-xl md:text-2xl font-semibold mb-2"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-color)" }}
        >
          <span className="bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
            Authority Structures That Match Reality
          </span>
        </h3>
        <p className="text-[0.875rem] max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
          See how Accumulate models real organizational authority — from enterprises to coalitions.
        </p>
      </div>

      {/* Example selector chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {EXAMPLES.map((ex, i) => (
          <motion.button
            key={ex.title}
            onClick={() => goTo(i)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-[0.75rem] font-medium px-3 py-1.5 rounded-[8px] border transition-all duration-200 cursor-pointer"
            style={{
              background: i === activeIndex ? "rgba(59,130,246,0.12)" : "color-mix(in srgb, var(--surface) 50%, transparent)",
              borderColor: i === activeIndex ? "rgba(59,130,246,0.3)" : "color-mix(in srgb, var(--overlay) 6%, transparent)",
              color: i === activeIndex ? "#60A5FA" : "var(--text-muted)",
            }}
          >
            {ex.title}
          </motion.button>
        ))}
      </div>

      {/* Canvas area */}
      <div
        className="relative rounded-[14px] border border-overlay/[0.06] backdrop-blur-sm overflow-hidden"
        style={{ background: "color-mix(in srgb, var(--surface) 60%, transparent)", minHeight: 420 }}
      >
        {/* Title + subtitle for active example */}
        <div className="pt-5 px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-heading text-base font-semibold text-text mb-1">
                {example.title}
              </h4>
              <p className="text-[0.8125rem] text-text-muted">{example.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tree view */}
        <div className="px-4 pb-4">
          <AnimatePresence mode="wait">
            <ExampleView key={activeIndex} example={example} uniqueId={uniqueId} />
          </AnimatePresence>
        </div>

        {/* Nav arrows */}
        <button
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-overlay/[0.08] hover:border-overlay/[0.2] bg-[color-mix(in srgb, var(--surface) 70%, transparent)] hover:bg-[color-mix(in srgb, var(--surface) 90%, transparent)] flex items-center justify-center transition-all duration-200 cursor-pointer"
          aria-label="Previous example"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8.5 3.5L5 7L8.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }} />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-overlay/[0.08] hover:border-overlay/[0.2] bg-[color-mix(in srgb, var(--surface) 70%, transparent)] hover:bg-[color-mix(in srgb, var(--surface) 90%, transparent)] flex items-center justify-center transition-all duration-200 cursor-pointer"
          aria-label="Next example"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5.5 3.5L9 7L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }} />
          </svg>
        </button>
      </div>

      {/* Progress dots + auto-rotate indicator */}
      <div className="mt-4 flex justify-center items-center gap-2">
        {EXAMPLES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative cursor-pointer p-1"
            aria-label={`Go to example ${i + 1}`}
          >
            <div
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === activeIndex ? "#3B82F6" : "color-mix(in srgb, var(--overlay) 15%, transparent)",
                boxShadow: i === activeIndex ? "0 0 8px rgba(59,130,246,0.5)" : "none",
              }}
            />
            {/* Auto-rotate progress ring */}
            {i === activeIndex && !isPaused && (
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 18 18"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="9"
                  cy="9"
                  r="7"
                  fill="none"
                  stroke="rgba(59,130,246,0.3)"
                  strokeWidth="1.5"
                  strokeDasharray={`${2 * Math.PI * 7}`}
                  style={{
                    animation: `ats-progress ${AUTO_ROTATE_INTERVAL}ms linear`,
                    strokeDashoffset: "0",
                  }}
                />
              </svg>
            )}
          </button>
        ))}
        {isPaused && (
          <button
            onClick={() => setIsPaused(false)}
            className="ml-2 text-[0.625rem] font-medium text-text-muted hover:text-text transition-colors cursor-pointer"
          >
            Resume
          </button>
        )}
      </div>

      {/* CSS animation for progress ring */}
      <style>{`
        @keyframes ats-progress {
          from { stroke-dashoffset: ${2 * Math.PI * 7}; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
