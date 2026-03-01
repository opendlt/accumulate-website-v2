"use client";

import { useState, useCallback, useMemo, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type NodeType = "org" | "department" | "team" | "vendor" | "role" | "system";

interface TreeNode {
  id: string;
  type: NodeType;
  label: string;
  parentId: string | null;
  policies: string[];
  x: number;
  y: number;
}

type InteractionMode =
  | { kind: "idle" }
  | { kind: "selectParent"; pendingType: NodeType; pendingLabel: string };

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const NODE_TYPE_META: Record<
  NodeType,
  { label: string; color: string; borderClass: string; bgAccent: string }
> = {
  org: {
    label: "Organization",
    color: "#3B82F6",
    borderClass: "border-[#3B82F6]/40",
    bgAccent: "rgba(59,130,246,0.10)",
  },
  department: {
    label: "Department",
    color: "#06B6D4",
    borderClass: "border-[#06B6D4]/40",
    bgAccent: "rgba(6,182,212,0.10)",
  },
  team: {
    label: "Team",
    color: "#3B82F6",
    borderClass: "border-[#3B82F6]/30",
    bgAccent: "rgba(59,130,246,0.08)",
  },
  vendor: {
    label: "Vendor",
    color: "#F59E0B",
    borderClass: "border-[#F59E0B]/30",
    bgAccent: "rgba(245,158,11,0.08)",
  },
  role: {
    label: "Role",
    color: "#94A3B8",
    borderClass: "border-[#94A3B8]/30",
    bgAccent: "rgba(148,163,184,0.06)",
  },
  system: {
    label: "System",
    color: "#8B5CF6",
    borderClass: "border-[#8B5CF6]/40",
    bgAccent: "rgba(139,92,246,0.10)",
  },
};

const POLICY_OPTIONS = ["2-of-3", "Expires 30d", "Read Only"] as const;

const CANVAS_NODE_W = 140;
const CANVAS_NODE_H = 48;
const LEVEL_GAP_Y = 100;
const SIBLING_GAP_X = 160;

/* ------------------------------------------------------------------ */
/*  Unique id helper                                                   */
/* ------------------------------------------------------------------ */

let _seq = 0;
function uid(): string {
  _seq += 1;
  return `n-${Date.now()}-${_seq}`;
}

/* ------------------------------------------------------------------ */
/*  Tree layout: auto-position nodes top-down                          */
/* ------------------------------------------------------------------ */

function layoutTree(nodes: TreeNode[]): TreeNode[] {
  if (nodes.length === 0) return [];

  // Build adjacency
  const childrenOf: Record<string, string[]> = {};
  const nodeMap: Record<string, TreeNode> = {};
  let rootId: string | null = null;

  for (const n of nodes) {
    nodeMap[n.id] = { ...n };
    if (n.parentId === null) rootId = n.id;
    if (!childrenOf[n.id]) childrenOf[n.id] = [];
  }
  for (const n of nodes) {
    if (n.parentId && childrenOf[n.parentId]) {
      childrenOf[n.parentId].push(n.id);
    }
  }

  if (!rootId) return nodes;

  // BFS to assign depth
  const depthOf: Record<string, number> = {};
  const queue = [rootId];
  depthOf[rootId] = 0;
  const ordered: string[] = [];

  while (queue.length > 0) {
    const cur = queue.shift()!;
    ordered.push(cur);
    const kids = childrenOf[cur] ?? [];
    for (const k of kids) {
      depthOf[k] = (depthOf[cur] ?? 0) + 1;
      queue.push(k);
    }
  }

  // Group by depth
  const levels: Record<number, string[]> = {};
  let maxDepth = 0;
  for (const id of ordered) {
    const d = depthOf[id] ?? 0;
    if (!levels[d]) levels[d] = [];
    levels[d].push(id);
    if (d > maxDepth) maxDepth = d;
  }

  // Assign positions
  for (let d = 0; d <= maxDepth; d++) {
    const row = levels[d] ?? [];
    const totalWidth = row.length * SIBLING_GAP_X;
    const startX = -totalWidth / 2 + SIBLING_GAP_X / 2;
    for (let i = 0; i < row.length; i++) {
      const id = row[i];
      nodeMap[id].x = startX + i * SIBLING_GAP_X;
      nodeMap[id].y = d * LEVEL_GAP_Y;
    }
  }

  return ordered.map((id) => nodeMap[id]);
}

/* ------------------------------------------------------------------ */
/*  SVG Defs (gradients)                                               */
/* ------------------------------------------------------------------ */

function SvgDefs({ uniqueId }: { uniqueId: string }) {
  return (
    <defs>
      <linearGradient
        id={`atb-lineGrad-${uniqueId}`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#00A6FB" />
      </linearGradient>
      <linearGradient
        id={`atb-lineGlow-${uniqueId}`}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#00A6FB" stopOpacity="0.3" />
      </linearGradient>
    </defs>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated connection line                                           */
/* ------------------------------------------------------------------ */

function TreeConnectionLine({
  x1,
  y1,
  x2,
  y2,
  uniqueId,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  uniqueId: string;
}) {
  // Curved path: vertical then curve to child
  const midY = y1 + (y2 - y1) * 0.5;
  const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

  return (
    <g>
      {/* Glow */}
      <motion.path
        d={d}
        stroke={`url(#atb-lineGlow-${uniqueId})`}
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ filter: "blur(3px)" }}
      />
      {/* Core */}
      <motion.path
        d={d}
        stroke={`url(#atb-lineGrad-${uniqueId})`}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Data-flow dot */}
      <motion.circle
        r={2.5}
        fill="#3B82F6"
        initial={{ opacity: 0, offsetDistance: "0%" }}
        animate={{
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.5,
          delay: 0.6,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        }}
        style={{
          filter: "drop-shadow(0 0 4px rgba(59,130,246,0.8))",
          offsetPath: `path('${d}')`,
          animation: "atb-dot-move 2.5s ease-in-out 0.6s infinite",
        }}
      >
        <animateMotion
          dur="2.5s"
          repeatCount="indefinite"
          begin="0.6s"
          path={d}
        />
      </motion.circle>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Node type icons (inline SVGs)                                      */
/* ------------------------------------------------------------------ */

function NodeIcon({ type, size = 16 }: { type: NodeType; size?: number }) {
  const color = NODE_TYPE_META[type].color;

  switch (type) {
    case "org":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="1"
            width="8"
            height="6"
            rx="1"
            stroke={color}
            strokeWidth="1.5"
          />
          <rect
            x="1"
            y="9"
            width="5"
            height="6"
            rx="1"
            stroke={color}
            strokeWidth="1.5"
          />
          <rect
            x="10"
            y="9"
            width="5"
            height="6"
            rx="1"
            stroke={color}
            strokeWidth="1.5"
          />
          <line
            x1="8"
            y1="7"
            x2="8"
            y2="9"
            stroke={color}
            strokeWidth="1.5"
          />
          <line
            x1="3.5"
            y1="9"
            x2="12.5"
            y2="9"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      );
    case "department":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="2"
            width="12"
            height="12"
            rx="2"
            stroke={color}
            strokeWidth="1.5"
          />
          <line
            x1="2"
            y1="6"
            x2="14"
            y2="6"
            stroke={color}
            strokeWidth="1.5"
          />
          <line
            x1="6"
            y1="6"
            x2="6"
            y2="14"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      );
    case "team":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5" cy="5" r="2.5" stroke={color} strokeWidth="1.5" />
          <circle cx="11" cy="5" r="2.5" stroke={color} strokeWidth="1.5" />
          <circle cx="8" cy="12" r="2.5" stroke={color} strokeWidth="1.5" />
          <line
            x1="6.5"
            y1="7"
            x2="7.5"
            y2="10"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
          />
          <line
            x1="9.5"
            y1="7"
            x2="8.5"
            y2="10"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      );
    case "vendor":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 6L8 2L14 6V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V6Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <rect
            x="6"
            y="9"
            width="4"
            height="5"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      );
    case "role":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="5" r="3" stroke={color} strokeWidth="1.5" />
          <path
            d="M3 14C3 11.2386 5.23858 9 8 9C10.7614 9 13 11.2386 13 14"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "system":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="3"
            width="12"
            height="8"
            rx="1.5"
            stroke={color}
            strokeWidth="1.5"
          />
          <line
            x1="5"
            y1="14"
            x2="11"
            y2="14"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="11"
            x2="8"
            y2="14"
            stroke={color}
            strokeWidth="1.5"
          />
          <circle cx="8" cy="7" r="1" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Palette chip                                                       */
/* ------------------------------------------------------------------ */

function PaletteChip({
  type,
  isActive,
  onClick,
}: {
  type: NodeType;
  isActive: boolean;
  onClick: () => void;
}) {
  const meta = NODE_TYPE_META[type];
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-[10px] text-[0.8125rem] font-medium
        transition-all duration-200 cursor-pointer select-none border
        ${
          isActive
            ? `${meta.borderClass} shadow-[0_0_16px_${meta.color}22]`
            : "border-overlay/[0.06] hover:border-overlay/[0.12]"
        }
      `}
      style={{
        background: isActive ? meta.bgAccent : "color-mix(in srgb, var(--surface) 50%, transparent)",
        color: isActive ? meta.color : "var(--text-muted)",
      }}
    >
      <NodeIcon type={type} size={14} />
      <span>{meta.label}</span>
      <span className="ml-auto text-[0.6875rem] opacity-60">+</span>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Tree canvas node                                                   */
/* ------------------------------------------------------------------ */

function CanvasNode({
  node,
  isSelected,
  isParentSelectable,
  onSelect,
  onRemove,
  onTogglePolicy,
}: {
  node: TreeNode;
  isSelected: boolean;
  isParentSelectable: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onTogglePolicy: (policy: string) => void;
}) {
  const meta = NODE_TYPE_META[node.type];
  const [showPolicyMenu, setShowPolicyMenu] = useState(false);
  const showPolicyButton = node.type === "vendor" || node.type === "role";

  return (
    <motion.div
      className="absolute"
      style={{
        left: node.x - CANVAS_NODE_W / 2,
        top: node.y,
        width: CANVAS_NODE_W,
      }}
      initial={{ opacity: 0, scale: 0.6, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 10 }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const }}
      layout
    >
      {/* Main node */}
      <motion.div
        onClick={onSelect}
        className={`
          relative cursor-pointer rounded-[12px] px-3 py-2.5
          backdrop-blur-sm border transition-all duration-200 group
          ${node.type === "vendor" ? "border-dashed" : ""}
          ${isSelected ? "ring-2 ring-offset-1 ring-offset-transparent" : ""}
        `}
        style={{
          background: `linear-gradient(135deg, ${meta.bgAccent}, color-mix(in srgb, var(--surface) 70%, transparent))`,
          borderColor: isSelected
            ? meta.color
            : isParentSelectable
              ? `${meta.color}66`
              : "color-mix(in srgb, var(--overlay) 6%, transparent)",
          boxShadow: isSelected
            ? `0 0 20px ${meta.color}33, inset 0 1px 0 color-mix(in srgb, var(--overlay) 4%, transparent)`
            : "inset 0 1px 0 color-mix(in srgb, var(--overlay) 4%, transparent)",
          "--tw-ring-color": isSelected ? meta.color : "transparent",
        } as React.CSSProperties}
        whileHover={{
          boxShadow: `0 0 24px ${meta.color}28, inset 0 1px 0 color-mix(in srgb, var(--overlay) 6%, transparent)`,
        }}
      >
        {/* Pulsing border for selected */}
        {isSelected && (
          <motion.div
            className="absolute -inset-[2px] rounded-[14px] border pointer-events-none"
            style={{ borderColor: `${meta.color}40` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Selectable indicator */}
        {isParentSelectable && !isSelected && (
          <motion.div
            className="absolute -inset-[2px] rounded-[14px] border pointer-events-none"
            style={{ borderColor: `${meta.color}30` }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="flex items-center gap-2 relative z-10">
          <NodeIcon type={node.type} size={14} />
          <div className="flex-1 min-w-0">
            <div
              className="text-[0.75rem] font-semibold truncate"
              style={{ color: "var(--text-color)" }}
            >
              {node.label}
            </div>
            <div
              className="text-[0.625rem] truncate"
              style={{ color: "var(--text-subtle)" }}
            >
              {meta.label}
            </div>
          </div>
          {/* Remove button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="opacity-0 group-hover:opacity-70 hover:!opacity-100 transition-opacity duration-150 text-[var(--text-subtle)] hover:text-[var(--danger)] p-0.5"
            aria-label="Remove node"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 3L9 9M9 3L3 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Policy pills */}
      <AnimatePresence>
        {node.policies.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-1 mt-1.5 justify-center"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {node.policies.map((p) => (
              <motion.button
                key={p}
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePolicy(p);
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center text-[0.625rem] font-semibold rounded-full px-2 py-0.5 border cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  borderColor: "rgba(59,130,246,0.2)",
                  color: "#3B82F6",
                }}
              >
                {p}
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  className="ml-1"
                >
                  <path
                    d="M2 2L6 6M6 2L2 6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Policy button */}
      {showPolicyButton && (
        <div className="relative mt-1.5 flex justify-center">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setShowPolicyMenu((v) => !v);
            }}
            className="text-[0.625rem] px-2 py-0.5 rounded-full border border-overlay/[0.08] hover:border-overlay/[0.15] transition-colors cursor-pointer"
            style={{
              color: "var(--text-subtle)",
              background: "color-mix(in srgb, var(--surface) 40%, transparent)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            + Policy
          </motion.button>

          <AnimatePresence>
            {showPolicyMenu && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full mt-1 z-20 flex flex-col gap-0.5 p-1.5 rounded-[8px] border border-overlay/[0.08]"
                style={{ background: "color-mix(in srgb, var(--surface) 95%, transparent)", backdropFilter: "blur(12px)" }}
              >
                {POLICY_OPTIONS.map((opt) => {
                  const active = node.policies.includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTogglePolicy(opt);
                        setShowPolicyMenu(false);
                      }}
                      className={`text-[0.625rem] font-medium px-2.5 py-1 rounded-[6px] text-left whitespace-nowrap transition-colors cursor-pointer ${
                        active
                          ? "text-[#3B82F6] bg-[#3B82F6]/10"
                          : "text-[var(--text-muted)] hover:bg-overlay/[0.04]"
                      }`}
                    >
                      {active ? "- " : "+ "}
                      {opt}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preset definitions                                                 */
/* ------------------------------------------------------------------ */

interface Preset {
  label: string;
  description: string;
  build: () => TreeNode[];
}

function makePresets(): Preset[] {
  return [
    {
      label: "Vendor Authority",
      description: "Org → Site → Vendor",
      build: () => [
        {
          id: "p-1",
          type: "org",
          label: "Acme Corp",
          parentId: null,
          policies: [],
          x: 0,
          y: 0,
        },
        {
          id: "p-2",
          type: "department",
          label: "Site A",
          parentId: "p-1",
          policies: [],
          x: 0,
          y: 0,
        },
        {
          id: "p-3",
          type: "vendor",
          label: "Vendor X",
          parentId: "p-2",
          policies: ["2-of-3"],
          x: 0,
          y: 0,
        },
      ],
    },
    {
      label: "Treasury Controls",
      description: "Board → Treasury → CFO, Auditor",
      build: () => [
        {
          id: "p-1",
          type: "org",
          label: "Board",
          parentId: null,
          policies: [],
          x: 0,
          y: 0,
        },
        {
          id: "p-2",
          type: "department",
          label: "Treasury",
          parentId: "p-1",
          policies: [],
          x: 0,
          y: 0,
        },
        {
          id: "p-3",
          type: "role",
          label: "CFO",
          parentId: "p-2",
          policies: ["2-of-3"],
          x: 0,
          y: 0,
        },
        {
          id: "p-4",
          type: "role",
          label: "Auditor",
          parentId: "p-2",
          policies: ["Read Only"],
          x: 0,
          y: 0,
        },
      ],
    },
    {
      label: "Coalition",
      description: "Coalition → Agencies → Shared Ops",
      build: () => [
        {
          id: "p-1",
          type: "org",
          label: "Coalition",
          parentId: null,
          policies: [],
          x: 0,
          y: 0,
        },
        {
          id: "p-2",
          type: "department",
          label: "Agency A",
          parentId: "p-1",
          policies: [],
          x: 0,
          y: 0,
        },
        {
          id: "p-3",
          type: "department",
          label: "Agency B",
          parentId: "p-1",
          policies: [],
          x: 0,
          y: 0,
        },
        {
          id: "p-4",
          type: "team",
          label: "Shared Ops",
          parentId: "p-2",
          policies: [],
          x: 0,
          y: 0,
        },
        {
          id: "p-5",
          type: "team",
          label: "Shared Ops",
          parentId: "p-3",
          policies: [],
          x: 0,
          y: 0,
        },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Proof Stamp                                                        */
/* ------------------------------------------------------------------ */

function ProofStamp() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        />
        <motion.path
          d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        />
      </svg>
      Verifiable Proof
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Status message                                                     */
/* ------------------------------------------------------------------ */

function StatusMessage({ mode, nodeCount }: { mode: InteractionMode; nodeCount: number }) {
  let text = "";
  if (nodeCount === 0) {
    text = "Click a node type from the palette to add the root of your tree";
  } else if (mode.kind === "selectParent") {
    text = `Click an existing node to set it as the parent of "${mode.pendingLabel}"`;
  } else {
    text = "Click a node type to add \u00B7 Click a node to select \u00B7 Hover to see details";
  }

  return (
    <motion.div
      key={text}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="text-[0.6875rem] text-center py-1.5 px-3"
      style={{ color: "var(--text-subtle)" }}
    >
      {text}
    </motion.div>
  );
}

/* ================================================================== */
/*  AUTHORITY TREE BUILDER                                             */
/* ================================================================== */

export function AuthorityTreeBuilder({
  className,
}: {
  className?: string;
}) {
  const instanceId = useId().replace(/:/g, "");

  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [mode, setMode] = useState<InteractionMode>({ kind: "idle" });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [animatingPreset, setAnimatingPreset] = useState(false);

  const presets = useMemo(() => makePresets(), []);

  // Layout nodes
  const layoutNodes = useMemo(() => layoutTree(nodes), [nodes]);

  // Canvas bounds
  const canvasBounds = useMemo(() => {
    if (layoutNodes.length === 0) return { width: 0, height: 0, offsetX: 0 };
    let minX = Infinity,
      maxX = -Infinity,
      maxY = 0;
    for (const n of layoutNodes) {
      if (n.x - CANVAS_NODE_W / 2 < minX) minX = n.x - CANVAS_NODE_W / 2;
      if (n.x + CANVAS_NODE_W / 2 > maxX) maxX = n.x + CANVAS_NODE_W / 2;
      if (n.y + CANVAS_NODE_H > maxY) maxY = n.y + CANVAS_NODE_H;
    }
    const width = maxX - minX + 40;
    const height = maxY + 80;
    const offsetX = -minX + 20;
    return { width, height, offsetX };
  }, [layoutNodes]);

  // Default label from type
  const defaultLabel = useCallback(
    (type: NodeType): string => {
      const existing = nodes.filter((n) => n.type === type).length;
      const base = NODE_TYPE_META[type].label;
      return existing > 0 ? `${base} ${existing + 1}` : base;
    },
    [nodes]
  );

  // Add a node
  const addNode = useCallback(
    (type: NodeType) => {
      if (animatingPreset) return;

      const label = defaultLabel(type);

      if (nodes.length === 0) {
        // First node becomes root
        const newNode: TreeNode = {
          id: uid(),
          type,
          label,
          parentId: null,
          policies: [],
          x: 0,
          y: 0,
        };
        setNodes([newNode]);
        setSelectedNodeId(newNode.id);
        setMode({ kind: "idle" });
      } else {
        // Need to select parent
        setMode({ kind: "selectParent", pendingType: type, pendingLabel: label });
      }
    },
    [nodes, animatingPreset, defaultLabel]
  );

  // Select a node on canvas
  const handleCanvasNodeClick = useCallback(
    (nodeId: string) => {
      if (animatingPreset) return;

      if (mode.kind === "selectParent") {
        // Create child under clicked node
        const newNode: TreeNode = {
          id: uid(),
          type: mode.pendingType,
          label: mode.pendingLabel,
          parentId: nodeId,
          policies: [],
          x: 0,
          y: 0,
        };
        setNodes((prev) => [...prev, newNode]);
        setSelectedNodeId(newNode.id);
        setMode({ kind: "idle" });
      } else {
        setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
      }
    },
    [mode, animatingPreset]
  );

  // Remove a node (and all descendants)
  const removeNode = useCallback(
    (nodeId: string) => {
      if (animatingPreset) return;

      setNodes((prev) => {
        // Collect all descendants
        const toRemove = new Set<string>();
        const queue = [nodeId];
        while (queue.length > 0) {
          const cur = queue.shift()!;
          toRemove.add(cur);
          for (const n of prev) {
            if (n.parentId === cur && !toRemove.has(n.id)) {
              queue.push(n.id);
            }
          }
        }
        return prev.filter((n) => !toRemove.has(n.id));
      });
      if (selectedNodeId === nodeId) setSelectedNodeId(null);
      setMode({ kind: "idle" });
    },
    [selectedNodeId, animatingPreset]
  );

  // Toggle policy on a node
  const togglePolicy = useCallback(
    (nodeId: string, policy: string) => {
      setNodes((prev) =>
        prev.map((n) => {
          if (n.id !== nodeId) return n;
          const has = n.policies.includes(policy);
          return {
            ...n,
            policies: has
              ? n.policies.filter((p) => p !== policy)
              : [...n.policies, policy],
          };
        })
      );
    },
    []
  );

  // Load preset with step-by-step animation
  const loadPreset = useCallback(
    async (preset: Preset) => {
      setAnimatingPreset(true);
      setNodes([]);
      setSelectedNodeId(null);
      setMode({ kind: "idle" });

      const presetNodes = layoutTree(preset.build());

      // Animate adding one by one
      for (let i = 0; i < presetNodes.length; i++) {
        await new Promise((r) => setTimeout(r, 400));
        setNodes((prev) => [...prev, presetNodes[i]]);
        setSelectedNodeId(presetNodes[i].id);
      }

      await new Promise((r) => setTimeout(r, 200));
      setSelectedNodeId(null);
      setAnimatingPreset(false);
    },
    []
  );

  // Connection lines data
  const connections = useMemo(() => {
    const result: { from: TreeNode; to: TreeNode }[] = [];
    const nodeMap: Record<string, TreeNode> = {};
    for (const n of layoutNodes) nodeMap[n.id] = n;
    for (const n of layoutNodes) {
      if (n.parentId && nodeMap[n.parentId]) {
        result.push({ from: nodeMap[n.parentId], to: n });
      }
    }
    return result;
  }, [layoutNodes]);

  const showProof = nodes.length >= 3;

  return (
    <div
      className={`relative w-full ${className ?? ""}`}
    >
      {/* Glow orbs background */}
      <div
        className="absolute rounded-full opacity-[0.06] blur-[120px] pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "#3B82F6",
          top: -100,
          left: -150,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full opacity-[0.04] blur-[120px] pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background: "#8B5CF6",
          bottom: -100,
          right: -100,
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="mb-6 text-center">
        <h3
          className="text-xl md:text-2xl font-semibold mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--text-color)",
          }}
        >
          <span className="bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent">
            Build Your Authority Tree
          </span>
        </h3>
        <p
          className="text-[0.875rem] max-w-md mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          See how Accumulate's delegation model works. Add nodes, connect them,
          and attach policies to build a verifiable authority structure.
        </p>
      </div>

      {/* Preset buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {presets.map((preset) => (
          <motion.button
            key={preset.label}
            onClick={() => loadPreset(preset)}
            disabled={animatingPreset}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              text-[0.75rem] font-medium px-3 py-1.5 rounded-[8px] border
              border-overlay/[0.08] hover:border-overlay/[0.16] transition-all duration-200
              disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
            "
            style={{
              background: "color-mix(in srgb, var(--surface) 50%, transparent)",
              color: "var(--text-muted)",
            }}
          >
            <span className="font-semibold" style={{ color: "var(--text-color)" }}>
              {preset.label}
            </span>
            <span className="ml-1.5 opacity-60">{preset.description}</span>
          </motion.button>
        ))}

        {/* Clear button */}
        {nodes.length > 0 && (
          <motion.button
            onClick={() => {
              setNodes([]);
              setSelectedNodeId(null);
              setMode({ kind: "idle" });
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={animatingPreset}
            className="
              text-[0.75rem] font-medium px-3 py-1.5 rounded-[8px] border
              transition-all duration-200
              disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
            "
            style={{
              background: "rgba(239,68,68,0.06)",
              color: "var(--danger)",
              borderColor: "rgba(239,68,68,0.2)",
            }}
          >
            Clear
          </motion.button>
        )}
      </div>

      {/* Main layout: palette + canvas */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left: Node Palette */}
        <div
          className="
            shrink-0 w-full md:w-[180px]
            rounded-[14px] border border-overlay/[0.06] p-3
            backdrop-blur-sm
          "
          style={{ background: "color-mix(in srgb, var(--surface) 40%, transparent)" }}
        >
          <div
            className="text-[0.6875rem] font-semibold uppercase tracking-wider mb-3"
            style={{ color: "var(--text-subtle)" }}
          >
            Node Types
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5">
            {(Object.keys(NODE_TYPE_META) as NodeType[]).map((type) => (
              <PaletteChip
                key={type}
                type={type}
                isActive={
                  mode.kind === "selectParent" && mode.pendingType === type
                }
                onClick={() => addNode(type)}
              />
            ))}
          </div>
        </div>

        {/* Right: Tree Canvas */}
        <div className="flex-1 flex flex-col">
          <div
            className="
              relative rounded-[14px] border border-overlay/[0.06]
              backdrop-blur-sm overflow-hidden
            "
            style={{
              background: "color-mix(in srgb, var(--surface) 60%, transparent)",
              minHeight: 400,
            }}
          >
            {/* Empty state */}
            {nodes.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center">
                  <div
                    className="mb-2 opacity-30"
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      className="mx-auto"
                    >
                      <rect
                        x="16"
                        y="4"
                        width="16"
                        height="12"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                      <rect
                        x="4"
                        y="28"
                        width="14"
                        height="10"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                      <rect
                        x="30"
                        y="28"
                        width="14"
                        height="10"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                      <line
                        x1="24"
                        y1="16"
                        x2="24"
                        y2="22"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                      <line
                        x1="11"
                        y1="22"
                        x2="37"
                        y2="22"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                      <line
                        x1="11"
                        y1="22"
                        x2="11"
                        y2="28"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                      <line
                        x1="37"
                        y1="22"
                        x2="37"
                        y2="28"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                    </svg>
                  </div>
                  <div
                    className="text-[0.8125rem] font-medium mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Your authority tree canvas
                  </div>
                  <div
                    className="text-[0.6875rem]"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    Add a node from the palette or try a preset above
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tree rendering area */}
            {nodes.length > 0 && (
              <div
                className="relative mx-auto"
                style={{
                  width: Math.max(canvasBounds.width, 300),
                  height: Math.max(canvasBounds.height, 200),
                  minHeight: 380,
                }}
              >
                {/* SVG connections */}
                <svg
                  className="absolute inset-0 pointer-events-none"
                  width="100%"
                  height="100%"
                  style={{ overflow: "visible" }}
                >
                  <SvgDefs uniqueId={instanceId} />
                  {connections.map(({ from, to }) => (
                    <TreeConnectionLine
                      key={`${from.id}-${to.id}`}
                      x1={from.x + canvasBounds.offsetX}
                      y1={from.y + CANVAS_NODE_H + 20}
                      x2={to.x + canvasBounds.offsetX}
                      y2={to.y + 20}
                      uniqueId={instanceId}
                    />
                  ))}
                </svg>

                {/* Nodes */}
                <AnimatePresence>
                  {layoutNodes.map((node) => (
                    <CanvasNode
                      key={node.id}
                      node={{
                        ...node,
                        x: node.x + canvasBounds.offsetX,
                        y: node.y + 20,
                      }}
                      isSelected={selectedNodeId === node.id}
                      isParentSelectable={mode.kind === "selectParent"}
                      onSelect={() => handleCanvasNodeClick(node.id)}
                      onRemove={() => removeNode(node.id)}
                      onTogglePolicy={(policy) => togglePolicy(node.id, policy)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Proof stamp */}
            <AnimatePresence>
              {showProof && (
                <motion.div
                  className="flex justify-center pb-4 pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProofStamp />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <StatusMessage mode={mode} nodeCount={nodes.length} />
        </div>
      </div>

      {/* Node count indicator */}
      <div className="mt-3 flex justify-center">
        <div
          className="flex items-center gap-3 text-[0.6875rem]"
          style={{ color: "var(--text-subtle)" }}
        >
          <span>
            {nodes.length} node{nodes.length !== 1 ? "s" : ""}
          </span>
          <span className="opacity-30">|</span>
          <span>
            {connections.length} connection{connections.length !== 1 ? "s" : ""}
          </span>
          {nodes.filter((n) => n.policies.length > 0).length > 0 && (
            <>
              <span className="opacity-30">|</span>
              <span>
                {nodes.reduce((acc, n) => acc + n.policies.length, 0)} polic
                {nodes.reduce((acc, n) => acc + n.policies.length, 0) !== 1
                  ? "ies"
                  : "y"}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
