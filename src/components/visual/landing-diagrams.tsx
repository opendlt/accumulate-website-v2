import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Trust Boundary Diagram                                                     */
/*  Two org domains with cross-boundary connections animated via dash-flow.     */
/* -------------------------------------------------------------------------- */

export function TrustBoundaryDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 420 300"
        fill="none"
        className="w-full h-auto max-w-[420px] mx-auto"
      >
        <defs>
          <filter id="tb-glow">
            <feGaussianBlur stdDeviation="4" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glass panels */}
        <rect
          x="15" y="45" width="185" height="215" rx="12"
          fill="var(--surface)" fillOpacity="0.5" stroke="var(--border-color)" strokeWidth="1"
        />
        <rect
          x="220" y="45" width="185" height="215" rx="12"
          fill="var(--surface)" fillOpacity="0.5" stroke="var(--border-color)" strokeWidth="1"
        />

        {/* Trust boundary dashed line */}
        <line
          x1="210" y1="25" x2="210" y2="280"
          stroke="#3B82F6" strokeWidth="1" strokeDasharray="8 6" opacity="0.3"
        />

        {/* Left internal connections */}
        <line x1="70" y1="110" x2="145" y2="110" stroke="#3B82F6" strokeWidth="1" opacity="0.15" />
        <line x1="70" y1="110" x2="90" y2="175" stroke="#3B82F6" strokeWidth="1" opacity="0.15" />
        <line x1="145" y1="110" x2="90" y2="175" stroke="#3B82F6" strokeWidth="1" opacity="0.15" />
        <line x1="90" y1="175" x2="130" y2="230" stroke="#3B82F6" strokeWidth="1" opacity="0.15" />

        {/* Right internal connections */}
        <line x1="275" y1="110" x2="350" y2="110" stroke="#00A6FB" strokeWidth="1" opacity="0.15" />
        <line x1="275" y1="110" x2="330" y2="175" stroke="#00A6FB" strokeWidth="1" opacity="0.15" />
        <line x1="350" y1="110" x2="330" y2="175" stroke="#00A6FB" strokeWidth="1" opacity="0.15" />
        <line x1="330" y1="175" x2="290" y2="230" stroke="#00A6FB" strokeWidth="1" opacity="0.15" />

        {/* Cross-boundary connections (animated) */}
        <line
          x1="145" y1="110" x2="275" y2="110"
          stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="6 4"
          filter="url(#tb-glow)" opacity="0.7"
          style={{ animation: "dash-flow 1.5s linear infinite" }}
        />
        <line
          x1="90" y1="175" x2="330" y2="175"
          stroke="#00A6FB" strokeWidth="1.5" strokeDasharray="6 4"
          filter="url(#tb-glow)" opacity="0.7"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.75s" }}
        />

        {/* Left nodes */}
        <circle cx="70" cy="110" r="5" fill="#3B82F6" opacity="0.7" />
        <circle cx="145" cy="110" r="5" fill="#3B82F6" opacity="0.8" />
        <circle cx="90" cy="175" r="5" fill="#3B82F6" opacity="0.7" />
        <circle cx="130" cy="230" r="5" fill="#3B82F6" opacity="0.5" />

        {/* Right nodes */}
        <circle cx="275" cy="110" r="5" fill="#00A6FB" opacity="0.8" />
        <circle cx="350" cy="110" r="5" fill="#00A6FB" opacity="0.7" />
        <circle cx="330" cy="175" r="5" fill="#00A6FB" opacity="0.7" />
        <circle cx="290" cy="230" r="5" fill="#00A6FB" opacity="0.5" />

        {/* Labels */}
        <text x="107" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="500">
          Org A
        </text>
        <text x="312" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="500">
          Org B
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Use-Case Hero Diagram                                                      */
/*  Hub-and-spoke: three org domains converging on a central authority node.    */
/* -------------------------------------------------------------------------- */

export function UseCaseHeroDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 380 330"
        fill="none"
        className="w-full h-auto max-w-[380px] mx-auto"
      >
        <defs>
          <filter id="uch-glow">
            <feGaussianBlur stdDeviation="6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── connection lines (animated dashed) ── */}
        <line
          x1="80" y1="92" x2="170" y2="148"
          stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"
          style={{ animation: "dash-flow 1.5s linear infinite" }}
        />
        <line
          x1="300" y1="92" x2="210" y2="148"
          stroke="#00A6FB" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.5s" }}
        />
        <line
          x1="190" y1="228" x2="190" y2="178"
          stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "1s" }}
        />

        {/* ── top-left group: Vendors (blue) ── */}
        <rect
          x="20" y="22" width="120" height="70" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1" opacity="0.3"
        />
        <circle cx="50" cy="52" r="4" fill="#3B82F6" opacity="0.6" />
        <circle cx="80" cy="44" r="4" fill="#3B82F6" opacity="0.7" />
        <circle cx="110" cy="58" r="4" fill="#3B82F6" opacity="0.5" />
        <line x1="50" y1="52" x2="80" y2="44" stroke="#3B82F6" strokeWidth="0.75" opacity="0.2" />
        <line x1="80" y1="44" x2="110" y2="58" stroke="#3B82F6" strokeWidth="0.75" opacity="0.2" />
        <text x="80" y="108" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontWeight="500">
          Vendors
        </text>

        {/* ── top-right group: Treasury (cyan) ── */}
        <rect
          x="240" y="22" width="120" height="70" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#00A6FB" strokeWidth="1" opacity="0.3"
        />
        <circle cx="270" cy="50" r="4" fill="#00A6FB" opacity="0.6" />
        <circle cx="300" cy="60" r="4" fill="#00A6FB" opacity="0.7" />
        <circle cx="330" cy="46" r="4" fill="#00A6FB" opacity="0.5" />
        <line x1="270" y1="50" x2="300" y2="60" stroke="#00A6FB" strokeWidth="0.75" opacity="0.2" />
        <line x1="300" y1="60" x2="330" y2="46" stroke="#00A6FB" strokeWidth="0.75" opacity="0.2" />
        <text x="300" y="108" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontWeight="500">
          Treasury
        </text>

        {/* ── bottom group: Coalition (purple) ── */}
        <rect
          x="130" y="228" width="120" height="70" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#8B5CF6" strokeWidth="1" opacity="0.3"
        />
        <circle cx="160" cy="258" r="4" fill="#8B5CF6" opacity="0.6" />
        <circle cx="190" cy="250" r="4" fill="#8B5CF6" opacity="0.7" />
        <circle cx="220" cy="262" r="4" fill="#8B5CF6" opacity="0.5" />
        <line x1="160" y1="258" x2="190" y2="250" stroke="#8B5CF6" strokeWidth="0.75" opacity="0.2" />
        <line x1="190" y1="250" x2="220" y2="262" stroke="#8B5CF6" strokeWidth="0.75" opacity="0.2" />
        <text x="190" y="316" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontWeight="500">
          Coalition
        </text>

        {/* ── central hub: verified authority ── */}
        <circle cx="190" cy="158" r="28" fill="#3B82F6" opacity="0.05" filter="url(#uch-glow)" />
        <circle
          cx="190" cy="158" r="24"
          fill="var(--surface)" fillOpacity="0.6" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6"
        />
        <path
          d="M182 158L187 163L198 153"
          stroke="#3B82F6" strokeWidth="2.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.8"
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Broken Evidence Diagram                                                    */
/*  Vertical timeline with a red gap in the authority chain.                   */
/* -------------------------------------------------------------------------- */

export function BrokenEvidenceDiagram({ className }: { className?: string }) {
  const x = 48;
  const lx = 82;

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 260 384"
        fill="none"
        className="w-full h-auto max-w-[260px] mx-auto"
      >
        <defs>
          <filter id="be-glow">
            <feGaussianBlur stdDeviation="8" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── connecting lines ── */}
        {/* ok → ok */}
        <line x1={x} y1="62" x2={x} y2="92" stroke="#3B82F6" strokeWidth="1.5" opacity="0.3" />
        {/* ok → broken */}
        <line x1={x} y1="128" x2={x} y2="172" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.35" />
        {/* broken → dim */}
        <line x1={x} y1="208" x2={x} y2="252" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.35" />
        {/* dim → warn */}
        <line x1={x} y1="288" x2={x} y2="322" stroke="var(--text-muted)" strokeWidth="1.5" opacity="0.12" />

        {/* Red glow behind broken node */}
        <circle cx={x} cy="190" r="30" fill="#EF4444" opacity="0.07" filter="url(#be-glow)" />

        {/* ── node 1: ok ── */}
        <circle cx={x} cy="44" r="16" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
        <path
          d={`M${x - 5} ${44}L${x - 1} ${48}L${x + 6} ${40}`}
          stroke="#3B82F6" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.7"
        />
        <text x={lx} y="48" fill="var(--text-muted)" fontSize="12">Recorded</text>

        {/* ── node 2: ok ── */}
        <circle cx={x} cy="110" r="16" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
        <path
          d={`M${x - 5} ${110}L${x - 1} ${114}L${x + 6} ${106}`}
          stroke="#3B82F6" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.7"
        />
        <text x={lx} y="114" fill="var(--text-muted)" fontSize="12">Approved</text>

        {/* ── node 3: broken ── */}
        <circle cx={x} cy="190" r="16" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.6" />
        <text
          x={x} y="196" textAnchor="middle"
          fill="#EF4444" fontSize="16" fontWeight="700" opacity="0.85"
        >
          ?
        </text>
        <text x={lx} y="194" fill="#EF4444" fontSize="12" opacity="0.8">Authority gap</text>

        {/* ── node 4: dim ── */}
        <circle cx={x} cy="270" r="16" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" opacity="0.18" />
        <path
          d={`M${x - 5} ${270}L${x - 1} ${274}L${x + 6} ${266}`}
          stroke="var(--text-muted)" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.18"
        />
        <text x={lx} y="274" fill="var(--text-muted)" fontSize="12" opacity="0.35">Executed</text>

        {/* ── node 5: warning ── */}
        <circle cx={x} cy="340" r="16" fill="none" stroke="#F59E0B" strokeWidth="1.5" opacity="0.5" />
        <text
          x={x} y="346" textAnchor="middle"
          fill="#F59E0B" fontSize="16" fontWeight="700" opacity="0.7"
        >
          !
        </text>
        <text x={lx} y="344" fill="#F59E0B" fontSize="12" opacity="0.65">Disputed</text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Verified Chain Diagram                                                     */
/*  Vertical chain of green-verified authority records.                        */
/* -------------------------------------------------------------------------- */

export function VerifiedChainDiagram({ className }: { className?: string }) {
  const x = 48;
  const lx = 82;

  const nodes = [
    { cy: 44, label: "Verified authority" },
    { cy: 130, label: "Scoped delegation" },
    { cy: 216, label: "Portable proof" },
    { cy: 302, label: "Independent audit" },
  ];

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 280 346"
        fill="none"
        className="w-full h-auto max-w-[280px] mx-auto"
      >
        <defs>
          <filter id="vc-glow">
            <feGaussianBlur stdDeviation="6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft green glow line behind the chain */}
        <line
          x1={x} y1="40" x2={x} y2="306"
          stroke="#22C55E" strokeWidth="4" opacity="0.06" filter="url(#vc-glow)"
        />

        {/* Connecting lines */}
        {nodes.slice(0, -1).map((node, i) => (
          <line
            key={i}
            x1={x} y1={node.cy + 18}
            x2={x} y2={nodes[i + 1].cy - 18}
            stroke="#22C55E" strokeWidth="1.5" opacity="0.3"
          />
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.cy}>
            <circle
              cx={x} cy={node.cy} r="16"
              fill="none" stroke="#22C55E" strokeWidth="1.5" opacity="0.5"
            />
            <path
              d={`M${x - 5} ${node.cy}L${x - 1} ${node.cy + 4}L${x + 6} ${node.cy - 4}`}
              stroke="#22C55E" strokeWidth="2" fill="none"
              strokeLinecap="round" strokeLinejoin="round" opacity="0.7"
            />
            <text x={lx} y={node.cy + 4} fill="var(--text-muted)" fontSize="12">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Authority Ledger Diagram                                                   */
/*  Three-layer pyramid: Identities → Authority → Proofs.                     */
/* -------------------------------------------------------------------------- */

export function AuthorityLedgerDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 320 300"
        fill="none"
        className="w-full h-auto max-w-[320px] mx-auto"
      >
        <defs>
          <filter id="ald-glow">
            <feGaussianBlur stdDeviation="4" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── upward-flow connecting lines ── */}
        <line
          x1="160" y1="208" x2="160" y2="177"
          stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3"
          filter="url(#ald-glow)"
          style={{ animation: "dash-flow 1.5s linear infinite" }}
        />
        <line
          x1="160" y1="113" x2="160" y2="82"
          stroke="#00A6FB" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3"
          filter="url(#ald-glow)"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.5s" }}
        />

        {/* ── Layer 1: Identities (bottom, widest) ── */}
        <rect
          x="20" y="210" width="280" height="60" rx="8"
          fill="var(--surface)" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1" opacity="0.35"
        />
        {/* mini tree icon */}
        <circle cx="48" cy="234" r="2.5" fill="#3B82F6" opacity="0.6" />
        <circle cx="40" cy="246" r="2" fill="#3B82F6" opacity="0.4" />
        <circle cx="56" cy="246" r="2" fill="#3B82F6" opacity="0.4" />
        <line x1="48" y1="237" x2="40" y2="244" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
        <line x1="48" y1="237" x2="56" y2="244" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
        <text x="70" y="244" fill="var(--text-muted)" fontSize="12" fontWeight="500">
          Identity namespaces
        </text>

        {/* ── Layer 2: Authority (middle) ── */}
        <rect
          x="40" y="115" width="240" height="60" rx="8"
          fill="var(--surface)" fillOpacity="0.5" stroke="#00A6FB" strokeWidth="1" opacity="0.35"
        />
        {/* mini shield icon */}
        <path
          d="M68 138L75 135V142Q75 148 68 150Q61 148 61 142V135Z"
          fill="none" stroke="#00A6FB" strokeWidth="1.5" opacity="0.5"
        />
        <text x="86" y="147" fill="var(--text-muted)" fontSize="12" fontWeight="500">
          Authority policies
        </text>

        {/* ── Layer 3: Proofs (top, narrowest) ── */}
        <rect
          x="60" y="20" width="200" height="60" rx="8"
          fill="var(--surface)" fillOpacity="0.5" stroke="#22C55E" strokeWidth="1" opacity="0.35"
        />
        {/* checkmark icon */}
        <path
          d="M83 50L87 54L95 46"
          stroke="#22C55E" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
        />
        <text x="104" y="54" fill="var(--text-muted)" fontSize="12" fontWeight="500">
          Verifiable proofs
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Governance Comparison Diagram                                              */
/*  Left: scattered app logic. Right: native primitives.                       */
/* -------------------------------------------------------------------------- */

export function GovernanceComparisonDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 400 220"
        fill="none"
        className="w-full h-auto max-w-[400px] mx-auto"
      >
        <defs>
          <filter id="gc-glow">
            <feGaussianBlur stdDeviation="4" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Divider */}
        <line
          x1="200" y1="15" x2="200" y2="205"
          stroke="var(--border-color)" strokeWidth="1" strokeDasharray="6 6" opacity="0.5"
        />

        {/* ── LEFT: Typical chains ── */}
        <text x="95" y="22" textAnchor="middle" fill="var(--text-subtle)" fontSize="11" fontWeight="500">
          Typical chains
        </text>

        {/* Scattered boxes */}
        <rect x="25" y="42" width="70" height="38" rx="6"
              fill="var(--surface)" fillOpacity="0.4" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 3" />
        <text x="60" y="65" textAnchor="middle" fill="var(--text-subtle)" fontSize="9">IAM logic</text>

        <rect x="110" y="55" width="70" height="38" rx="6"
              fill="var(--surface)" fillOpacity="0.4" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 3" />
        <text x="145" y="78" textAnchor="middle" fill="var(--text-subtle)" fontSize="9">Audit logs</text>

        <rect x="35" y="105" width="70" height="38" rx="6"
              fill="var(--surface)" fillOpacity="0.4" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 3" />
        <text x="70" y="128" textAnchor="middle" fill="var(--text-subtle)" fontSize="9">App auth</text>

        <rect x="115" y="115" width="70" height="38" rx="6"
              fill="var(--surface)" fillOpacity="0.4" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 3" />
        <text x="150" y="138" textAnchor="middle" fill="var(--text-subtle)" fontSize="9">Workflows</text>

        {/* Broken / partial connections */}
        <line x1="95" y1="61" x2="110" y2="68" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="70" y1="80" x2="60" y2="105" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        {/* Break mark */}
        <text x="85" y="95" textAnchor="middle" fill="#EF4444" fontSize="11" opacity="0.5">✕</text>

        <text x="95" y="195" textAnchor="middle" fill="var(--text-subtle)" fontSize="10">
          Rebuilt each time
        </text>

        {/* ── RIGHT: Accumulate ── */}
        <text x="305" y="22" textAnchor="middle" fill="#3B82F6" fontSize="11" fontWeight="500">
          Accumulate
        </text>

        {/* Organized hierarchy */}
        {/* Top node */}
        <rect x="278" y="42" width="56" height="30" rx="6"
              fill="var(--surface)" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1" opacity="0.5" />
        <text x="306" y="61" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Identity</text>

        {/* Middle nodes */}
        <rect x="248" y="100" width="50" height="28" rx="5"
              fill="var(--surface)" fillOpacity="0.5" stroke="#00A6FB" strokeWidth="1" opacity="0.5" />
        <text x="273" y="118" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Auth</text>

        <rect x="315" y="100" width="50" height="28" rx="5"
              fill="var(--surface)" fillOpacity="0.5" stroke="#00A6FB" strokeWidth="1" opacity="0.5" />
        <text x="340" y="118" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Policy</text>

        {/* Bottom nodes */}
        <rect x="253" y="156" width="40" height="24" rx="4"
              fill="var(--surface)" fillOpacity="0.5" stroke="#22C55E" strokeWidth="1" opacity="0.4" />
        <text x="273" y="172" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Proof</text>

        <rect x="320" y="156" width="40" height="24" rx="4"
              fill="var(--surface)" fillOpacity="0.5" stroke="#22C55E" strokeWidth="1" opacity="0.4" />
        <text x="340" y="172" textAnchor="middle" fill="var(--text-muted)" fontSize="8">Proof</text>

        {/* Solid connections with glow */}
        <line x1="306" y1="72" x2="273" y2="100"
              stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" filter="url(#gc-glow)" />
        <line x1="306" y1="72" x2="340" y2="100"
              stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" filter="url(#gc-glow)" />
        <line x1="273" y1="128" x2="273" y2="156"
              stroke="#00A6FB" strokeWidth="1.5" opacity="0.4" />
        <line x1="340" y1="128" x2="340" y2="156"
              stroke="#00A6FB" strokeWidth="1.5" opacity="0.4" />

        <text x="305" y="200" textAnchor="middle" fill="#3B82F6" fontSize="10" opacity="0.7">
          Native primitives
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pricing Stability Diagram                                                  */
/*  Left: flat credit line. Right: volatile gas line.                           */
/* -------------------------------------------------------------------------- */

export function PricingStabilityDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 400 200"
        fill="none"
        className="w-full h-auto max-w-[400px] mx-auto"
      >
        {/* ── LEFT: Credits (stable) ── */}
        <text x="95" y="20" textAnchor="middle" fill="#3B82F6" fontSize="11" fontWeight="500">
          Credits
        </text>
        <text x="95" y="34" textAnchor="middle" fill="var(--text-subtle)" fontSize="9">
          Predictable
        </text>

        {/* Axis lines */}
        <line x1="20" y1="160" x2="175" y2="160" stroke="var(--border-color)" strokeWidth="1" opacity="0.4" />
        <line x1="20" y1="50" x2="20" y2="160" stroke="var(--border-color)" strokeWidth="1" opacity="0.4" />

        {/* Stable line */}
        <polyline
          points="20,105 40,103 60,106 80,104 100,105 120,103 140,106 160,104 175,105"
          stroke="#3B82F6" strokeWidth="2" opacity="0.7"
          strokeLinejoin="round" strokeLinecap="round"
        />
        {/* Fill under stable line */}
        <polygon
          points="20,105 40,103 60,106 80,104 100,105 120,103 140,106 160,104 175,105 175,160 20,160"
          fill="#3B82F6" opacity="0.06"
        />

        {/* ── RIGHT: Gas fees (volatile) ── */}
        <text x="305" y="20" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="500">
          Gas fees
        </text>
        <text x="305" y="34" textAnchor="middle" fill="var(--text-subtle)" fontSize="9">
          Volatile
        </text>

        {/* Axis lines */}
        <line x1="225" y1="160" x2="380" y2="160" stroke="var(--border-color)" strokeWidth="1" opacity="0.4" />
        <line x1="225" y1="50" x2="225" y2="160" stroke="var(--border-color)" strokeWidth="1" opacity="0.4" />

        {/* Volatile line */}
        <polyline
          points="225,110 240,65 255,130 270,55 285,120 300,50 315,95 330,60 345,140 360,52 375,90"
          stroke="#F59E0B" strokeWidth="2" opacity="0.6"
          strokeLinejoin="round" strokeLinecap="round"
        />
        {/* Fill under volatile line */}
        <polygon
          points="225,110 240,65 255,130 270,55 285,120 300,50 315,95 330,60 345,140 360,52 375,90 375,160 225,160"
          fill="#F59E0B" opacity="0.04"
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ecosystem Network Diagram                                                  */
/*  Central hub with satellite clusters: Partners, Tools, Community.           */
/* -------------------------------------------------------------------------- */

export function EcosystemNetworkDiagram({ className }: { className?: string }) {
  const cx = 190;
  const cy = 170;

  /* Satellite positions grouped by cluster */
  const satellites = [
    /* Partners cluster (top-left) */
    { x: 65, y: 65, r: 8, color: "#3B82F6", op: 0.7 },
    { x: 105, y: 45, r: 6, color: "#3B82F6", op: 0.5 },
    { x: 45, y: 110, r: 5, color: "#3B82F6", op: 0.4 },
    /* Tools cluster (top-right) */
    { x: 310, y: 60, r: 7, color: "#00A6FB", op: 0.6 },
    { x: 340, y: 110, r: 6, color: "#00A6FB", op: 0.5 },
    { x: 280, y: 45, r: 5, color: "#00A6FB", op: 0.4 },
    /* Community cluster (bottom) */
    { x: 80, y: 280, r: 7, color: "#8B5CF6", op: 0.6 },
    { x: 310, y: 285, r: 8, color: "#8B5CF6", op: 0.7 },
    { x: 190, y: 310, r: 6, color: "#8B5CF6", op: 0.5 },
  ];

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 380 340"
        fill="none"
        className="w-full h-auto max-w-[380px] mx-auto"
      >
        <defs>
          <filter id="en-glow">
            <feGaussianBlur stdDeviation="6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── satellite-to-satellite connections (cluster internal) ── */}
        <line x1="65" y1="65" x2="105" y2="45" stroke="#3B82F6" strokeWidth="0.75" opacity="0.12" />
        <line x1="65" y1="65" x2="45" y2="110" stroke="#3B82F6" strokeWidth="0.75" opacity="0.1" />
        <line x1="310" y1="60" x2="340" y2="110" stroke="#00A6FB" strokeWidth="0.75" opacity="0.12" />
        <line x1="310" y1="60" x2="280" y2="45" stroke="#00A6FB" strokeWidth="0.75" opacity="0.1" />
        <line x1="80" y1="280" x2="190" y2="310" stroke="#8B5CF6" strokeWidth="0.75" opacity="0.1" />
        <line x1="310" y1="285" x2="190" y2="310" stroke="#8B5CF6" strokeWidth="0.75" opacity="0.1" />

        {/* ── hub-to-satellite connections (animated) ── */}
        {satellites.map((sat, i) => (
          <line
            key={i}
            x1={cx} y1={cy} x2={sat.x} y2={sat.y}
            stroke={sat.color} strokeWidth="1" opacity="0.15"
            strokeDasharray="6 4"
            style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: `${i * 0.18}s` }}
          />
        ))}

        {/* ── central hub ── */}
        <circle cx={cx} cy={cy} r="30" fill="#3B82F6" opacity="0.06" filter="url(#en-glow)" />
        <circle
          cx={cx} cy={cy} r="20"
          fill="var(--surface)" fillOpacity="0.6" stroke="#3B82F6" strokeWidth="1.5" opacity="0.7"
        />
        <circle cx={cx} cy={cy} r="5" fill="#3B82F6" opacity="0.8" />

        {/* ── satellite nodes ── */}
        {satellites.map((sat, i) => (
          <circle key={i} cx={sat.x} cy={sat.y} r={sat.r} fill={sat.color} opacity={sat.op} />
        ))}

        {/* ── cluster labels ── */}
        <text x="55" y="140" fill="var(--text-muted)" fontSize="9" opacity="0.45">
          Partners
        </text>
        <text x="320" y="140" fill="var(--text-muted)" fontSize="9" opacity="0.45">
          Tools
        </text>
        <text x="175" y="335" fill="var(--text-muted)" fontSize="9" opacity="0.45">
          Community
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Builder Stack Diagram                                                      */
/*  Three terminal-style panels: Identity → Authority → Proof.                 */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*  Security Shield Layers Diagram                                             */
/*  Concentric rings representing layered security principles.                 */
/* -------------------------------------------------------------------------- */

export function SecurityShieldDiagram({ className }: { className?: string }) {
  const cx = 190;
  const cy = 175;

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 380 350"
        fill="none"
        className="w-full h-auto max-w-[380px] mx-auto"
      >
        <defs>
          <filter id="ss-glow">
            <feGaussianBlur stdDeviation="6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── outer ring: Operational discipline ── */}
        <circle
          cx={cx} cy={cy} r="145"
          fill="none" stroke="var(--text-muted)" strokeWidth="1" opacity="0.08"
        />
        <circle
          cx={cx} cy={cy} r="145"
          fill="none" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="8 6" opacity="0.15"
          style={{ animation: "dash-flow 8s linear infinite reverse" }}
        />
        {/* gear icon placeholder */}
        <circle cx="335" cy={cy} r="10" fill="var(--surface)" fillOpacity="0.6" stroke="var(--text-muted)" strokeWidth="1" opacity="0.3" />
        <circle cx="335" cy={cy} r="4" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" opacity="0.4" />
        <text x="335" y={cy + 24} textAnchor="middle" fill="var(--text-muted)" fontSize="8" opacity="0.5">
          Discipline
        </text>

        {/* ── third ring: Independent verification ── */}
        <circle
          cx={cx} cy={cy} r="105"
          fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.1"
        />
        <circle
          cx={cx} cy={cy} r="105"
          fill="none" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="6 5" opacity="0.2"
          style={{ animation: "dash-flow 6s linear infinite" }}
        />
        {/* magnifying glass icon */}
        <circle cx={cx + 105} cy={cy} r="10" fill="var(--surface)" fillOpacity="0.6" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
        <circle cx={cx + 103} cy={cy - 2} r="3.5" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" />
        <line x1={cx + 106} y1={cy + 1} x2={cx + 109} y2={cy + 4} stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" />
        <text x={cx} y={cy - 115} textAnchor="middle" fill="#8B5CF6" fontSize="9" opacity="0.5">
          Verification
        </text>

        {/* ── second ring: Least privilege delegation ── */}
        <circle
          cx={cx} cy={cy} r="65"
          fill="none" stroke="#00A6FB" strokeWidth="1" opacity="0.12"
        />
        <circle
          cx={cx} cy={cy} r="65"
          fill="none" stroke="#00A6FB" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.25"
          style={{ animation: "dash-flow 4s linear infinite reverse" }}
        />
        {/* shield icon */}
        <circle cx={cx} cy={cy + 65} r="10" fill="var(--surface)" fillOpacity="0.6" stroke="#00A6FB" strokeWidth="1" opacity="0.4" />
        <path
          d={`M${cx} ${cy + 60}L${cx + 5} ${cy + 58}V${cy + 64}Q${cx + 5} ${cy + 69} ${cx} ${cy + 71}Q${cx - 5} ${cy + 69} ${cx - 5} ${cy + 64}V${cy + 58}Z`}
          fill="none" stroke="#00A6FB" strokeWidth="1.2" opacity="0.5"
        />
        <text x={cx} y={cy + 88} textAnchor="middle" fill="#00A6FB" fontSize="9" opacity="0.5">
          Delegation
        </text>

        {/* ── inner core: Key lifecycle ── */}
        <circle
          cx={cx} cy={cy} r="28"
          fill="#3B82F6" opacity="0.04" filter="url(#ss-glow)"
        />
        <circle
          cx={cx} cy={cy} r="28"
          fill="var(--surface)" fillOpacity="0.6" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5"
        />
        {/* key icon */}
        <circle cx={cx - 3} cy={cy - 3} r="5" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.7" />
        <line x1={cx + 1} y1={cy + 1} x2={cx + 10} y2={cy + 10} stroke="#3B82F6" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
        <line x1={cx + 7} y1={cy + 7} x2={cx + 10} y2={cy + 5} stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <text x={cx} y={cy + 44} textAnchor="middle" fill="#3B82F6" fontSize="9" opacity="0.6" fontWeight="500">
          Key Lifecycle
        </text>

        {/* ── radial connecting dots ── */}
        <circle cx={cx} cy={cy - 65} r="2.5" fill="#00A6FB" opacity="0.4" />
        <circle cx={cx - 65} cy={cy} r="2.5" fill="#00A6FB" opacity="0.4" />
        <circle cx={cx - 105} cy={cy} r="2.5" fill="#8B5CF6" opacity="0.3" />
        <circle cx={cx} cy={cy + 105} r="2.5" fill="#8B5CF6" opacity="0.3" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Governance Patterns Diagram                                                */
/*  Four governance pattern blocks in a 2×2 grid with connections.             */
/* -------------------------------------------------------------------------- */

export function GovernancePatternsDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 340 340"
        fill="none"
        className="w-full h-auto max-w-[340px] mx-auto"
      >
        <defs>
          <filter id="gp-glow">
            <feGaussianBlur stdDeviation="4" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── cross connections ── */}
        <line
          x1="155" y1="80" x2="185" y2="80"
          stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"
          filter="url(#gp-glow)"
          style={{ animation: "dash-flow 1.5s linear infinite" }}
        />
        <line
          x1="155" y1="260" x2="185" y2="260"
          stroke="#22C55E" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"
          filter="url(#gp-glow)"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.5s" }}
        />
        <line
          x1="80" y1="155" x2="80" y2="185"
          stroke="#00A6FB" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"
          filter="url(#gp-glow)"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.25s" }}
        />
        <line
          x1="260" y1="155" x2="260" y2="185"
          stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"
          filter="url(#gp-glow)"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.75s" }}
        />

        {/* ── Block 1: Threshold Approvals (top-left) ── */}
        <rect
          x="15" y="15" width="140" height="140" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1" opacity="0.3"
        />
        {/* M-of-N gate visual */}
        <circle cx="55" cy="60" r="6" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
        <circle cx="85" cy="50" r="6" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
        <circle cx="115" cy="60" r="6" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.3" />
        {/* Lines converging to threshold gate */}
        <line x1="55" y1="66" x2="75" y2="85" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
        <line x1="85" y1="56" x2="85" y2="85" stroke="#3B82F6" strokeWidth="1" opacity="0.4" />
        <line x1="115" y1="66" x2="95" y2="85" stroke="#3B82F6" strokeWidth="1" opacity="0.2" />
        {/* Gate bar */}
        <rect x="68" y="82" width="34" height="12" rx="3" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.4" />
        <text x="85" y="92" textAnchor="middle" fill="#3B82F6" fontSize="7" opacity="0.7">2/3</text>
        {/* Checkmark output */}
        <line x1="85" y1="94" x2="85" y2="108" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
        <path d="M80 108L83 111L90 104" stroke="#22C55E" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
        <text x="85" y="135" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontWeight="500">
          Threshold
        </text>

        {/* ── Block 2: Scoped Delegation (top-right) ── */}
        <rect
          x="185" y="15" width="140" height="140" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#00A6FB" strokeWidth="1" opacity="0.3"
        />
        {/* Time window visual */}
        <rect x="210" y="45" width="90" height="40" rx="5" fill="none" stroke="#00A6FB" strokeWidth="1" opacity="0.25" />
        {/* Solid filled portion (active window) */}
        <rect x="210" y="45" width="55" height="40" rx="5" fill="#00A6FB" opacity="0.06" />
        {/* Start/end markers */}
        <line x1="210" y1="42" x2="210" y2="48" stroke="#00A6FB" strokeWidth="1.5" opacity="0.4" />
        <line x1="300" y1="42" x2="300" y2="48" stroke="#00A6FB" strokeWidth="1.5" opacity="0.4" />
        {/* "now" marker with pulse */}
        <line x1="265" y1="45" x2="265" y2="85" stroke="#00A6FB" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
        <circle cx="265" cy="65" r="3" fill="#00A6FB" opacity="0.6" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
        {/* Labels */}
        <text x="210" y="100" fill="var(--text-muted)" fontSize="7" opacity="0.4">start</text>
        <text x="288" y="100" fill="var(--text-muted)" fontSize="7" opacity="0.4">expiry</text>
        <text x="255" y="135" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontWeight="500">
          Scoped delegation
        </text>

        {/* ── Block 3: Role-Based Identities (bottom-left) ── */}
        <rect
          x="15" y="185" width="140" height="140" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#22C55E" strokeWidth="1" opacity="0.3"
        />
        {/* Mini org tree */}
        <circle cx="85" cy="215" r="5" fill="#22C55E" opacity="0.5" />
        <circle cx="55" cy="245" r="4" fill="#22C55E" opacity="0.4" />
        <circle cx="85" cy="245" r="4" fill="#22C55E" opacity="0.4" />
        <circle cx="115" cy="245" r="4" fill="#22C55E" opacity="0.4" />
        <circle cx="45" cy="270" r="3" fill="#22C55E" opacity="0.3" />
        <circle cx="65" cy="270" r="3" fill="#22C55E" opacity="0.3" />
        <circle cx="105" cy="270" r="3" fill="#22C55E" opacity="0.3" />
        <circle cx="125" cy="270" r="3" fill="#22C55E" opacity="0.3" />
        {/* Tree connections */}
        <line x1="85" y1="220" x2="55" y2="241" stroke="#22C55E" strokeWidth="1" opacity="0.25" />
        <line x1="85" y1="220" x2="85" y2="241" stroke="#22C55E" strokeWidth="1" opacity="0.25" />
        <line x1="85" y1="220" x2="115" y2="241" stroke="#22C55E" strokeWidth="1" opacity="0.25" />
        <line x1="55" y1="249" x2="45" y2="267" stroke="#22C55E" strokeWidth="0.75" opacity="0.2" />
        <line x1="55" y1="249" x2="65" y2="267" stroke="#22C55E" strokeWidth="0.75" opacity="0.2" />
        <line x1="115" y1="249" x2="105" y2="267" stroke="#22C55E" strokeWidth="0.75" opacity="0.2" />
        <line x1="115" y1="249" x2="125" y2="267" stroke="#22C55E" strokeWidth="0.75" opacity="0.2" />
        <text x="85" y="305" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontWeight="500">
          Role identities
        </text>

        {/* ── Block 4: Authority Reviews (bottom-right) ── */}
        <rect
          x="185" y="185" width="140" height="140" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#8B5CF6" strokeWidth="1" opacity="0.3"
        />
        {/* Cycle/review arrows */}
        <path
          d="M240 245 A25 25 0 1 1 280 245"
          fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4"
          strokeDasharray="5 3"
          style={{ animation: "dash-flow 2s linear infinite" }}
        />
        <path
          d="M280 245 A25 25 0 1 1 240 245"
          fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4"
          strokeDasharray="5 3"
          style={{ animation: "dash-flow 2s linear infinite reverse" }}
        />
        {/* Arrow heads */}
        <polygon points="240,241 244,248 236,248" fill="#8B5CF6" opacity="0.4" />
        <polygon points="280,249 276,242 284,242" fill="#8B5CF6" opacity="0.4" />
        {/* Center checkmark in review */}
        <circle cx="260" cy="245" r="8" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
        <path d="M256 245L259 248L265 242" stroke="#8B5CF6" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
        <text x="260" y="305" textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontWeight="500">
          Authority reviews
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Audit Verification Flow Diagram                                            */
/*  Vertical chain of audit checkpoints converging to a verified result.       */
/* -------------------------------------------------------------------------- */

export function AuditVerificationDiagram({ className }: { className?: string }) {
  const x = 48;
  const lx = 82;

  const checks = [
    { cy: 44, label: "Authority policy", color: "#3B82F6" },
    { cy: 120, label: "Signatures & thresholds", color: "#00A6FB" },
    { cy: 196, label: "Identity-role linkage", color: "#8B5CF6" },
    { cy: 272, label: "Time constraints", color: "#F59E0B" },
  ];

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 280 380"
        fill="none"
        className="w-full h-auto max-w-[280px] mx-auto"
      >
        <defs>
          <filter id="av-glow">
            <feGaussianBlur stdDeviation="6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connecting lines between checkpoints */}
        {checks.slice(0, -1).map((check, i) => (
          <line
            key={i}
            x1={x} y1={check.cy + 18}
            x2={x} y2={checks[i + 1].cy - 18}
            stroke={check.color} strokeWidth="1.5" opacity="0.25"
            strokeDasharray="4 3"
            style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* Line from last check to result */}
        <line
          x1={x} y1="290" x2={x} y2="330"
          stroke="#22C55E" strokeWidth="1.5" opacity="0.3"
          strokeDasharray="4 3"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.9s" }}
        />

        {/* Checkpoint nodes */}
        {checks.map((check) => (
          <g key={check.cy}>
            <circle
              cx={x} cy={check.cy} r="16"
              fill="none" stroke={check.color} strokeWidth="1.5" opacity="0.4"
            />
            <path
              d={`M${x - 5} ${check.cy}L${x - 1} ${check.cy + 4}L${x + 6} ${check.cy - 4}`}
              stroke={check.color} strokeWidth="2" fill="none"
              strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
            />
            <text x={lx} y={check.cy + 4} fill="var(--text-muted)" fontSize="12">
              {check.label}
            </text>
          </g>
        ))}

        {/* ── Result: Verified ── */}
        <circle cx={x} cy="348" r="20" fill="#22C55E" opacity="0.05" filter="url(#av-glow)" />
        <circle
          cx={x} cy="348" r="18"
          fill="var(--surface)" fillOpacity="0.6" stroke="#22C55E" strokeWidth="2" opacity="0.6"
        />
        <path
          d={`M${x - 6} 348L${x - 2} 352L${x + 7} 343`}
          stroke="#22C55E" strokeWidth="2.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.8"
        />
        <text x={lx} y="352" fill="#22C55E" fontSize="12" fontWeight="600" opacity="0.8">
          Verified
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Builder Stack Diagram                                                      */
/*  Three terminal-style panels: Identity → Authority → Proof.                 */
/* -------------------------------------------------------------------------- */

export function BuilderStackDiagram({ className }: { className?: string }) {
  const panels = [
    { y: 15, label: "Identity", code: "> acc://org.acme", color: "#3B82F6" },
    { y: 120, label: "Authority", code: "{ threshold: 2, signers: 3 }", color: "#00A6FB" },
    { y: 225, label: "Proof", code: "\u2713 verified  \u2022  portable", color: "#22C55E" },
  ];

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 300 310"
        fill="none"
        className="w-full h-auto max-w-[300px] mx-auto"
      >
        <defs>
          <filter id="bs-glow">
            <feGaussianBlur stdDeviation="4" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── connecting lines ── */}
        <line
          x1="150" y1="90" x2="150" y2="120"
          stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3"
          filter="url(#bs-glow)"
          style={{ animation: "dash-flow 1.5s linear infinite" }}
        />
        <line
          x1="150" y1="195" x2="150" y2="225"
          stroke="#00A6FB" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3"
          filter="url(#bs-glow)"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.5s" }}
        />

        {/* ── panels ── */}
        {panels.map((panel) => (
          <g key={panel.y}>
            {/* Card background */}
            <rect
              x="20" y={panel.y} width="260" height="75" rx="8"
              fill="var(--surface)" fillOpacity="0.6" stroke={panel.color} strokeWidth="1" opacity="0.3"
            />

            {/* Header separator */}
            <line
              x1="20" y1={panel.y + 24} x2="280" y2={panel.y + 24}
              stroke={panel.color} strokeWidth="0.5" opacity="0.15"
            />

            {/* Traffic-light dots */}
            <circle cx="34" cy={panel.y + 12} r="2.5" fill="#EF4444" opacity="0.4" />
            <circle cx="44" cy={panel.y + 12} r="2.5" fill="#F59E0B" opacity="0.4" />
            <circle cx="54" cy={panel.y + 12} r="2.5" fill="#22C55E" opacity="0.4" />

            {/* Header label */}
            <text
              x="270" y={panel.y + 16} textAnchor="end"
              fill={panel.color} fontSize="10" opacity="0.6" fontWeight="500"
            >
              {panel.label}
            </text>

            {/* Code text */}
            <text
              x="35" y={panel.y + 55}
              fill={panel.color} fontSize="13" opacity="0.8"
              style={{ fontFamily: "var(--font-code), 'JetBrains Mono', monospace" }}
            >
              {panel.code}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pilot Sprint Ring Diagram                                                  */
/*  Circular 30-day progress arc with 4 week milestone markers.                */
/* -------------------------------------------------------------------------- */

export function PilotSprintDiagram({ className }: { className?: string }) {
  const cx = 160;
  const cy = 160;
  const r = 110;

  /* Milestone positions around the arc (12 o'clock start, clockwise) */
  const milestones = [
    { angle: -60, label: "W1", color: "#3B82F6" },
    { angle: 15, label: "W2", color: "#00A6FB" },
    { angle: 90, label: "W3", color: "#8B5CF6" },
    { angle: 165, label: "W4", color: "#22C55E" },
  ];

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 320 320"
        fill="none"
        className="w-full h-auto max-w-[320px] mx-auto"
      >
        <defs>
          <filter id="ps-glow">
            <feGaussianBlur stdDeviation="6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track ring */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke="var(--border-color)" strokeWidth="3" opacity="0.4"
        />

        {/* Progress arc (270° = 3/4 turn, from -135° to 135° = top-left to bottom-left) */}
        <path
          d={`M ${cx + r * Math.cos(toRad(-135))} ${cy + r * Math.sin(toRad(-135))} A ${r} ${r} 0 1 1 ${cx + r * Math.cos(toRad(165))} ${cy + r * Math.sin(toRad(165))}`}
          fill="none" stroke="#3B82F6" strokeWidth="3" opacity="0.3"
          strokeLinecap="round"
        />

        {/* Animated dashed overlay on progress arc */}
        <path
          d={`M ${cx + r * Math.cos(toRad(-135))} ${cy + r * Math.sin(toRad(-135))} A ${r} ${r} 0 1 1 ${cx + r * Math.cos(toRad(165))} ${cy + r * Math.sin(toRad(165))}`}
          fill="none" stroke="#3B82F6" strokeWidth="3" opacity="0.5"
          strokeLinecap="round" strokeDasharray="8 6"
          style={{ animation: "dash-flow 3s linear infinite" }}
        />

        {/* Center content */}
        <text
          x={cx} y={cy - 8} textAnchor="middle"
          fill="#3B82F6" fontSize="36" fontWeight="700" opacity="0.7"
        >
          30
        </text>
        <text
          x={cx} y={cy + 14} textAnchor="middle"
          fill="var(--text-muted)" fontSize="11" opacity="0.5"
        >
          days
        </text>

        {/* Milestone markers */}
        {milestones.map((m) => {
          const mx = cx + r * Math.cos(toRad(m.angle));
          const my = cy + r * Math.sin(toRad(m.angle));
          const lx = cx + (r + 22) * Math.cos(toRad(m.angle));
          const ly = cy + (r + 22) * Math.sin(toRad(m.angle));
          return (
            <g key={m.label}>
              <circle cx={mx} cy={my} r="8" fill="var(--surface)" fillOpacity="0.8" stroke={m.color} strokeWidth="1.5" opacity="0.6" />
              <circle cx={mx} cy={my} r="3" fill={m.color} opacity="0.7" />
              <text
                x={lx} y={ly + 4} textAnchor="middle"
                fill={m.color} fontSize="10" fontWeight="600" opacity="0.6"
              >
                {m.label}
              </text>
            </g>
          );
        })}

        {/* Start indicator (arrow) */}
        {(() => {
          const sx = cx + r * Math.cos(toRad(-135));
          const sy = cy + r * Math.sin(toRad(-135));
          return (
            <>
              <circle cx={sx} cy={sy} r="6" fill="#3B82F6" opacity="0.15" filter="url(#ps-glow)" />
              <circle cx={sx} cy={sy} r="4" fill="#3B82F6" opacity="0.7" />
              <text
                x={sx - 14} y={sy - 10} textAnchor="middle"
                fill="var(--text-muted)" fontSize="9" opacity="0.4"
              >
                Start
              </text>
            </>
          );
        })()}

        {/* End indicator (flag) */}
        {(() => {
          const ex = cx + r * Math.cos(toRad(165));
          const ey = cy + r * Math.sin(toRad(165));
          return (
            <>
              <circle cx={ex} cy={ey} r="6" fill="#22C55E" opacity="0.15" filter="url(#ps-glow)" />
              <circle cx={ex} cy={ey} r="4" fill="#22C55E" opacity="0.7" />
              <text
                x={ex - 14} y={ey + 16} textAnchor="middle"
                fill="#22C55E" fontSize="9" opacity="0.5"
              >
                Done
              </text>
            </>
          );
        })()}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Deliverables Stack Diagram                                                 */
/*  Five fanned document artifacts with checkmarks.                            */
/* -------------------------------------------------------------------------- */

export function DeliverablesStackDiagram({ className }: { className?: string }) {
  const docs = [
    { x: 10, y: 8, label: "Identity model", color: "#3B82F6" },
    { x: 18, y: 56, label: "Authority spec", color: "#00A6FB" },
    { x: 14, y: 104, label: "Integration ref", color: "#8B5CF6" },
    { x: 20, y: 152, label: "Verification list", color: "#F59E0B" },
    { x: 12, y: 200, label: "Pilot report", color: "#22C55E" },
  ];

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 260 260"
        fill="none"
        className="w-full h-auto max-w-[260px] mx-auto"
      >
        <defs>
          <filter id="ds-glow">
            <feGaussianBlur stdDeviation="3" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {docs.map((doc, i) => (
          <g key={doc.label}>
            {/* Document card */}
            <rect
              x={doc.x} y={doc.y} width="230" height="44" rx="6"
              fill="var(--surface)" fillOpacity="0.6"
              stroke={doc.color} strokeWidth="1" opacity={0.25 + i * 0.05}
            />

            {/* Document icon (folded corner) */}
            <rect
              x={doc.x + 12} y={doc.y + 10} width="16" height="20" rx="2"
              fill="none" stroke={doc.color} strokeWidth="1" opacity="0.35"
            />
            <path
              d={`M${doc.x + 22} ${doc.y + 10}L${doc.x + 28} ${doc.y + 16}L${doc.x + 22} ${doc.y + 16}Z`}
              fill={doc.color} opacity="0.15"
            />
            {/* Fake text lines on doc */}
            <line
              x1={doc.x + 15} y1={doc.y + 22} x2={doc.x + 25} y2={doc.y + 22}
              stroke={doc.color} strokeWidth="0.75" opacity="0.2"
            />
            <line
              x1={doc.x + 15} y1={doc.y + 26} x2={doc.x + 22} y2={doc.y + 26}
              stroke={doc.color} strokeWidth="0.75" opacity="0.15"
            />

            {/* Label */}
            <text
              x={doc.x + 42} y={doc.y + 26}
              fill="var(--text-muted)" fontSize="12" fontWeight="500"
            >
              {doc.label}
            </text>

            {/* Checkmark */}
            <circle
              cx={doc.x + 210} cy={doc.y + 22} r="10"
              fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.25"
            />
            <path
              d={`M${doc.x + 205} ${doc.y + 22}L${doc.x + 208} ${doc.y + 25}L${doc.x + 215} ${doc.y + 18}`}
              stroke="#22C55E" strokeWidth="1.5" fill="none"
              strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Team Topology Diagram                                                      */
/*  Three role nodes connected to a central workflow node.                      */
/* -------------------------------------------------------------------------- */

export function TeamTopologyDiagram({ className }: { className?: string }) {
  const cx = 150;
  const cy = 145;

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 300 300"
        fill="none"
        className="w-full h-auto max-w-[300px] mx-auto"
      >
        <defs>
          <filter id="tt-glow">
            <feGaussianBlur stdDeviation="5" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── connections to center ── */}
        <line
          x1="75" y1="65" x2={cx} y2={cy}
          stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.25"
          style={{ animation: "dash-flow 1.5s linear infinite" }}
        />
        <line
          x1="225" y1="65" x2={cx} y2={cy}
          stroke="#00A6FB" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.25"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.5s" }}
        />
        <line
          x1={cx} y1="250" x2={cx} y2={cy + 20}
          stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.25"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "1s" }}
        />

        {/* ── input connections (workflow & vendors) ── */}
        <line
          x1="45" y1="200" x2={cx - 20} y2={cy + 5}
          stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 3" opacity="0.2"
        />
        <line
          x1="255" y1="200" x2={cx + 20} y2={cy + 5}
          stroke="#22C55E" strokeWidth="1" strokeDasharray="4 3" opacity="0.2"
        />

        {/* ── central workflow hub ── */}
        <circle cx={cx} cy={cy} r="28" fill="#3B82F6" opacity="0.04" filter="url(#tt-glow)" />
        <circle
          cx={cx} cy={cy} r="24"
          fill="var(--surface)" fillOpacity="0.6" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5"
        />
        {/* Gear icon in center */}
        <circle cx={cx} cy={cy} r="7" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
        <circle cx={cx} cy={cy} r="3" fill="#3B82F6" opacity="0.5" />
        <text x={cx} y={cy + 40} textAnchor="middle" fill="#3B82F6" fontSize="9" fontWeight="500" opacity="0.6">
          Pilot workflow
        </text>

        {/* ── Role 1: Process Owner (top-left) ── */}
        <circle cx="75" cy="55" r="18" fill="var(--surface)" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1" opacity="0.4" />
        {/* Person icon */}
        <circle cx="75" cy="49" r="4" fill="none" stroke="#3B82F6" strokeWidth="1.2" opacity="0.5" />
        <path d="M67 62Q67 56 75 56Q83 56 83 62" fill="none" stroke="#3B82F6" strokeWidth="1.2" opacity="0.4" />
        <text x="75" y="86" textAnchor="middle" fill="var(--text-muted)" fontSize="9">
          Process owner
        </text>

        {/* ── Role 2: Security (top-right) ── */}
        <circle cx="225" cy="55" r="18" fill="var(--surface)" fillOpacity="0.5" stroke="#00A6FB" strokeWidth="1" opacity="0.4" />
        {/* Shield icon */}
        <path
          d="M225 46L231 43V50Q231 56 225 58Q219 56 219 50V43Z"
          fill="none" stroke="#00A6FB" strokeWidth="1.2" opacity="0.5"
        />
        <text x="225" y="86" textAnchor="middle" fill="var(--text-muted)" fontSize="9">
          Security / IAM
        </text>

        {/* ── Role 3: Engineer (bottom) ── */}
        <circle cx={cx} cy="255" r="18" fill="var(--surface)" fillOpacity="0.5" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
        {/* Code bracket icon */}
        <text x={cx} y="260" textAnchor="middle" fill="#8B5CF6" fontSize="14" opacity="0.5"
          style={{ fontFamily: "var(--font-code), monospace" }}
        >
          {"</>"}
        </text>
        <text x={cx} y="286" textAnchor="middle" fill="var(--text-muted)" fontSize="9">
          Engineer
        </text>

        {/* ── Input 1: Sample workflow (bottom-left) ── */}
        <rect x="15" y="190" width="60" height="28" rx="5"
              fill="var(--surface)" fillOpacity="0.4" stroke="#F59E0B" strokeWidth="1" opacity="0.25" />
        <text x="45" y="208" textAnchor="middle" fill="#F59E0B" fontSize="7" opacity="0.5">
          Workflow
        </text>

        {/* ── Input 2: Vendors (bottom-right) ── */}
        <rect x="225" y="190" width="60" height="28" rx="5"
              fill="var(--surface)" fillOpacity="0.4" stroke="#22C55E" strokeWidth="1" opacity="0.25" />
        <text x="255" y="208" textAnchor="middle" fill="#22C55E" fontSize="7" opacity="0.5">
          Vendors
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pilot Timeline Diagram                                                     */
/*  Vertical timeline with 4 milestone nodes showing weekly progression.       */
/* -------------------------------------------------------------------------- */

export function PilotTimelineDiagram({ className }: { className?: string }) {
  const x = 40;
  const lx = 72;

  const weeks = [
    { cy: 44, week: "Week 1", label: "Scope & model", color: "#3B82F6" },
    { cy: 124, week: "Week 2", label: "Configure", color: "#00A6FB" },
    { cy: 204, week: "Week 3", label: "Integrate & test", color: "#8B5CF6" },
    { cy: 284, week: "Week 4", label: "Verify & report", color: "#22C55E" },
  ];

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 240 330"
        fill="none"
        className="w-full h-auto max-w-[240px] mx-auto"
      >
        <defs>
          <filter id="pt-glow">
            <feGaussianBlur stdDeviation="4" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft glow line behind the timeline */}
        <line
          x1={x} y1="40" x2={x} y2="288"
          stroke="#3B82F6" strokeWidth="4" opacity="0.04" filter="url(#pt-glow)"
        />

        {/* Connecting lines */}
        {weeks.slice(0, -1).map((week, i) => (
          <line
            key={i}
            x1={x} y1={week.cy + 18}
            x2={x} y2={weeks[i + 1].cy - 18}
            stroke={week.color} strokeWidth="1.5" opacity="0.25"
            strokeDasharray="5 4"
            style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: `${i * 0.35}s` }}
          />
        ))}

        {/* Week nodes */}
        {weeks.map((week, i) => (
          <g key={week.cy}>
            {/* Node circle */}
            <circle
              cx={x} cy={week.cy} r="16"
              fill="var(--surface)" fillOpacity="0.6" stroke={week.color} strokeWidth="1.5" opacity="0.5"
            />
            {/* Week number */}
            <text
              x={x} y={week.cy + 5} textAnchor="middle"
              fill={week.color} fontSize="13" fontWeight="700" opacity="0.7"
            >
              {i + 1}
            </text>
            {/* Week label */}
            <text x={lx} y={week.cy - 4} fill={week.color} fontSize="10" fontWeight="600" opacity="0.6">
              {week.week}
            </text>
            <text x={lx} y={week.cy + 12} fill="var(--text-muted)" fontSize="11">
              {week.label}
            </text>
          </g>
        ))}

        {/* Progress arrow at bottom */}
        <path
          d={`M${x - 5} 310L${x} 318L${x + 5} 310`}
          stroke="#22C55E" strokeWidth="1.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.4"
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Success Outcomes Diagram                                                   */
/*  Three checkpoints converging to a green "Success" result.                  */
/* -------------------------------------------------------------------------- */

export function SuccessOutcomesDiagram({ className }: { className?: string }) {
  const rx = 240; /* result node x */
  const ry = 140; /* result node y */

  const checks = [
    { x: 35, y: 45, label: "Verifiable authority", color: "#3B82F6" },
    { x: 35, y: 140, label: "Grantable / revocable", color: "#00A6FB" },
    { x: 35, y: 235, label: "Provable history", color: "#8B5CF6" },
  ];

  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 300 280"
        fill="none"
        className="w-full h-auto max-w-[300px] mx-auto"
      >
        <defs>
          <filter id="so-glow">
            <feGaussianBlur stdDeviation="6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── converging lines ── */}
        {checks.map((check, i) => (
          <line
            key={i}
            x1={check.x + 70} y1={check.y}
            x2={rx - 24} y2={ry}
            stroke={check.color} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2"
            style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* ── checkpoint nodes ── */}
        {checks.map((check) => (
          <g key={check.label}>
            <circle
              cx={check.x} cy={check.y} r="14"
              fill="none" stroke={check.color} strokeWidth="1.5" opacity="0.4"
            />
            <path
              d={`M${check.x - 4} ${check.y}L${check.x - 1} ${check.y + 3}L${check.x + 5} ${check.y - 3}`}
              stroke={check.color} strokeWidth="2" fill="none"
              strokeLinecap="round" strokeLinejoin="round" opacity="0.6"
            />
            <text x={check.x + 20} y={check.y + 4} fill="var(--text-muted)" fontSize="11">
              {check.label}
            </text>
          </g>
        ))}

        {/* ── result node: Success ── */}
        <circle cx={rx} cy={ry} r="30" fill="#22C55E" opacity="0.05" filter="url(#so-glow)" />
        <circle
          cx={rx} cy={ry} r="24"
          fill="var(--surface)" fillOpacity="0.6" stroke="#22C55E" strokeWidth="2" opacity="0.6"
        />
        <path
          d={`M${rx - 7} ${ry}L${rx - 2} ${ry + 5}L${rx + 8} ${ry - 6}`}
          stroke="#22C55E" strokeWidth="2.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.8"
        />
        <text
          x={rx} y={ry + 42} textAnchor="middle"
          fill="#22C55E" fontSize="11" fontWeight="600" opacity="0.7"
        >
          Success
        </text>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Progress Momentum Diagram                                                  */
/*  Three-stage horizontal flow: Shipped → In Progress → Planned.              */
/* -------------------------------------------------------------------------- */

export function ProgressMomentumDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 380 320"
        fill="none"
        className="w-full h-auto max-w-[380px] mx-auto"
      >
        <defs>
          <filter id="pm-glow">
            <feGaussianBlur stdDeviation="6" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── momentum arrow background ── */}
        <path
          d="M40 160 Q120 60 190 160 Q260 260 340 160"
          fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.06"
          filter="url(#pm-glow)"
        />
        <path
          d="M40 160 Q120 60 190 160 Q260 260 340 160"
          fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="8 6" opacity="0.15"
          style={{ animation: "dash-flow 3s linear infinite" }}
        />

        {/* ── Stage 1: Shipped (left) ── */}
        <rect
          x="15" y="55" width="110" height="110" rx="12"
          fill="var(--surface)" fillOpacity="0.5" stroke="#22C55E" strokeWidth="1" opacity="0.3"
        />
        {/* Checkmarks stack */}
        <circle cx="48" cy="88" r="8" fill="none" stroke="#22C55E" strokeWidth="1.5" opacity="0.4" />
        <path d="M44 88L47 91L53 85" stroke="#22C55E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <circle cx="85" cy="88" r="8" fill="none" stroke="#22C55E" strokeWidth="1.5" opacity="0.3" />
        <path d="M81 88L84 91L90 85" stroke="#22C55E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        <circle cx="48" cy="115" r="8" fill="none" stroke="#22C55E" strokeWidth="1.5" opacity="0.25" />
        <path d="M44 115L47 118L53 112" stroke="#22C55E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        <circle cx="85" cy="115" r="8" fill="none" stroke="#22C55E" strokeWidth="1.5" opacity="0.2" />
        <path d="M81 115L84 118L90 112" stroke="#22C55E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
        <text x="70" y="148" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="600" opacity="0.6">
          Shipped
        </text>

        {/* ── connector 1→2 ── */}
        <line
          x1="125" y1="110" x2="145" y2="130"
          stroke="#22C55E" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3"
          style={{ animation: "dash-flow 1.5s linear infinite" }}
        />

        {/* ── Stage 2: In Progress (center) ── */}
        <rect
          x="135" y="115" width="110" height="110" rx="12"
          fill="var(--surface)" fillOpacity="0.5" stroke="#F59E0B" strokeWidth="1" opacity="0.3"
        />
        {/* Animated pulse dots */}
        <circle cx="168" cy="155" r="6" fill="#F59E0B" opacity="0.15" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
        <circle cx="168" cy="155" r="3" fill="#F59E0B" opacity="0.5" />
        <circle cx="202" cy="148" r="6" fill="#F59E0B" opacity="0.15" style={{ animation: "glow-pulse 2s ease-in-out infinite", animationDelay: "0.5s" }} />
        <circle cx="202" cy="148" r="3" fill="#F59E0B" opacity="0.4" />
        <circle cx="185" cy="175" r="6" fill="#F59E0B" opacity="0.15" style={{ animation: "glow-pulse 2s ease-in-out infinite", animationDelay: "1s" }} />
        <circle cx="185" cy="175" r="3" fill="#F59E0B" opacity="0.35" />
        {/* Progress bar */}
        <rect x="155" y="192" width="70" height="4" rx="2" fill="var(--border-color)" opacity="0.4" />
        <rect x="155" y="192" width="42" height="4" rx="2" fill="#F59E0B" opacity="0.4" />
        <text x="190" y="212" textAnchor="middle" fill="#F59E0B" fontSize="10" fontWeight="600" opacity="0.6">
          In Progress
        </text>

        {/* ── connector 2→3 ── */}
        <line
          x1="245" y1="170" x2="265" y2="155"
          stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.25"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.5s" }}
        />

        {/* ── Stage 3: Planned (right) ── */}
        <rect
          x="255" y="80" width="110" height="110" rx="12"
          fill="var(--surface)" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1" opacity="0.25"
        />
        {/* Dotted placeholder outlines */}
        <rect x="275" y="105" width="28" height="22" rx="4"
              fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 2" opacity="0.2" />
        <rect x="310" y="105" width="28" height="22" rx="4"
              fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 2" opacity="0.15" />
        <rect x="275" y="135" width="28" height="22" rx="4"
              fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 2" opacity="0.15" />
        <rect x="310" y="135" width="28" height="22" rx="4"
              fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 2" opacity="0.12" />
        <text x="310" y="178" textAnchor="middle" fill="#3B82F6" fontSize="10" fontWeight="600" opacity="0.5">
          Planned
        </text>

        {/* ── forward arrow at far right ── */}
        <path
          d="M350 135L362 135M358 130L364 135L358 140"
          stroke="#3B82F6" strokeWidth="1.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.3"
        />

        {/* ── Bottom momentum label ── */}
        <text x="190" y="280" textAnchor="middle" fill="var(--text-muted)" fontSize="10" opacity="0.35">
          Active development momentum
        </text>
        {/* Arrow underneath */}
        <line x1="110" y1="292" x2="270" y2="292" stroke="#3B82F6" strokeWidth="1" strokeDasharray="6 4" opacity="0.15"
          style={{ animation: "dash-flow 2s linear infinite" }}
        />
        <path d="M266 288L272 292L266 296" stroke="#3B82F6" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.2" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Credit Flow Diagram                                                        */
/*  Fiat → Credits → Operations. No tokens required.                           */
/* -------------------------------------------------------------------------- */

export function CreditFlowDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("select-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 360 300"
        fill="none"
        className="w-full h-auto max-w-[360px] mx-auto"
      >
        <defs>
          <filter id="cf-glow">
            <feGaussianBlur stdDeviation="5" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── flow arrows ── */}
        <line
          x1="118" y1="75" x2="145" y2="75"
          stroke="#22C55E" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.35"
          style={{ animation: "dash-flow 1.5s linear infinite" }}
        />
        <line
          x1="215" y1="75" x2="242" y2="75"
          stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.35"
          style={{ animation: "dash-flow 1.5s linear infinite", animationDelay: "0.5s" }}
        />

        {/* ── Stage 1: Fiat input (left) ── */}
        <rect
          x="10" y="40" width="108" height="70" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#22C55E" strokeWidth="1" opacity="0.3"
        />
        {/* Currency symbols */}
        <text x="35" y="72" textAnchor="middle" fill="#22C55E" fontSize="16" fontWeight="600" opacity="0.6">$</text>
        <text x="64" y="66" textAnchor="middle" fill="#22C55E" fontSize="12" fontWeight="600" opacity="0.4">&euro;</text>
        <text x="89" y="72" textAnchor="middle" fill="#22C55E" fontSize="12" fontWeight="600" opacity="0.4">&pound;</text>
        {/* Subtle fiat lines */}
        <line x1="30" y1="82" x2="92" y2="82" stroke="#22C55E" strokeWidth="0.5" opacity="0.15" />
        <text x="64" y="98" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontWeight="500">
          Any fiat currency
        </text>

        {/* ── Stage 2: Credits (center) ── */}
        <rect
          x="145" y="40" width="70" height="70" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4"
        />
        {/* Credit coin icon */}
        <circle cx="180" cy="68" r="14" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.5" />
        <text x="180" y="73" textAnchor="middle" fill="#3B82F6" fontSize="13" fontWeight="700" opacity="0.7">C</text>
        <text x="180" y="98" textAnchor="middle" fill="#3B82F6" fontSize="9" fontWeight="600" opacity="0.6">
          Credits
        </text>

        {/* ── Stage 3: Operations (right) ── */}
        <rect
          x="242" y="40" width="108" height="70" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#00A6FB" strokeWidth="1" opacity="0.3"
        />
        {/* Mini operation icons */}
        {/* Identity icon */}
        <circle cx="268" cy="65" r="4" fill="none" stroke="#00A6FB" strokeWidth="1" opacity="0.4" />
        <path d="M264 75Q264 71 268 71Q272 71 272 75" fill="none" stroke="#00A6FB" strokeWidth="1" opacity="0.3" />
        {/* Key icon */}
        <circle cx="296" cy="63" r="3" fill="none" stroke="#00A6FB" strokeWidth="1" opacity="0.4" />
        <line x1="298" y1="65" x2="304" y2="71" stroke="#00A6FB" strokeWidth="1" opacity="0.3" strokeLinecap="round" />
        {/* Check icon */}
        <path d="M320 64L323 67L328 61" stroke="#00A6FB" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" />
        <text x="296" y="98" textAnchor="middle" fill="var(--text-muted)" fontSize="9" fontWeight="500">
          On-chain ops
        </text>

        {/* ── Fixed rate callout ── */}
        <rect
          x="105" y="135" width="150" height="36" rx="8"
          fill="var(--surface)" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1" opacity="0.25"
        />
        <circle cx="180" cy="153" r="16" fill="#3B82F6" opacity="0.03" filter="url(#cf-glow)" />
        <text x="180" y="157" textAnchor="middle" fill="#3B82F6" fontSize="11" fontWeight="600" opacity="0.7">
          Fixed rate: $0.01 / 100
        </text>

        {/* ── "No crypto required" badge ── */}
        <rect
          x="80" y="195" width="200" height="44" rx="10"
          fill="var(--surface)" fillOpacity="0.5" stroke="#22C55E" strokeWidth="1" opacity="0.2"
        />
        {/* strikethrough crypto icon */}
        <circle cx="116" cy="217" r="10" fill="none" stroke="var(--text-muted)" strokeWidth="1" opacity="0.2" />
        <text x="116" y="221" textAnchor="middle" fill="var(--text-muted)" fontSize="9" opacity="0.25"
          style={{ fontFamily: "var(--font-code), monospace" }}
        >
          BTC
        </text>
        <line x1="108" y1="223" x2="124" y2="211" stroke="#EF4444" strokeWidth="1.5" opacity="0.35" />
        <text x="196" y="221" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="600" opacity="0.65">
          No tokens required
        </text>

        {/* ── Bottom: stability comparison mini-chart ── */}
        <text x="95" y="270" textAnchor="middle" fill="#3B82F6" fontSize="9" opacity="0.45">
          Credits
        </text>
        {/* Flat line */}
        <line x1="50" y1="282" x2="140" y2="282" stroke="#3B82F6" strokeWidth="1.5" opacity="0.4" />
        {/* Axis */}
        <line x1="50" y1="275" x2="50" y2="292" stroke="var(--border-color)" strokeWidth="0.75" opacity="0.3" />
        <line x1="50" y1="292" x2="140" y2="292" stroke="var(--border-color)" strokeWidth="0.75" opacity="0.3" />

        <text x="265" y="270" textAnchor="middle" fill="#F59E0B" fontSize="9" opacity="0.45">
          Gas fees
        </text>
        {/* Volatile line */}
        <polyline
          points="220,284 232,276 244,290 256,272 268,286 280,270 292,282 304,274 310,288"
          stroke="#F59E0B" strokeWidth="1.5" opacity="0.35"
          strokeLinejoin="round" strokeLinecap="round"
        />
        {/* Axis */}
        <line x1="220" y1="275" x2="220" y2="292" stroke="var(--border-color)" strokeWidth="0.75" opacity="0.3" />
        <line x1="220" y1="292" x2="310" y2="292" stroke="var(--border-color)" strokeWidth="0.75" opacity="0.3" />
      </svg>
    </div>
  );
}
