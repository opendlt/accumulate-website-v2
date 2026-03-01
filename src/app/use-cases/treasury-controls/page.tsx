import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { FeatureCard } from "@/components/cards/feature-card";
import { MetricCard } from "@/components/cards/metric-card";
import { CTABand } from "@/components/content/cta-band";
import { FAQAccordion } from "@/components/content/faq-accordion";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import {
  TreeStructure,
  ShieldCheck,
  CurrencyCircleDollar,
} from "@phosphor-icons/react/dist/ssr";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GlowOrb } from "@/components/visual/glow-orb";
import { GradientText } from "@/components/visual/gradient-text";

export const metadata = createMetadata({
  title: "Treasury & Multi-Entity Controls",
  description:
    "Encode approval policy for high-value movements. Threshold approvals and delegation as a system primitive—so authority, policy, and audit continuity survive personnel churn.",
  path: "/use-cases/treasury-controls",
});

const PILOT_WEEKS = [
  {
    week: 1,
    title: "Map the authority model",
    deliverables:
      "Identity map (treasury → entities → signers → roles). Approval flow inventory and threshold definitions for one movement type.",
  },
  {
    week: 2,
    title: "Encode approval policy",
    deliverables:
      "Authority policies (threshold approvals, delegation scopes, expiration windows). Key rotation and recovery rules on-chain.",
  },
  {
    week: 3,
    title: "Integrate one workflow",
    deliverables:
      "Integration reference for one high-value movement type. Verification checklist for auditors and compliance.",
  },
  {
    week: 4,
    title: "Measure and expand",
    deliverables:
      "Pilot report with ROI metrics. Rollout plan for additional movement types, entities, and approval flows.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How does this differ from our existing approval workflows?",
    answer:
      "Existing approval workflows enforce policy within one system. Accumulate makes the policy itself verifiable—so auditors, counterparties, and regulators can independently confirm that the right approvals happened, with the right thresholds, at the right time. The workflow tools stay; Accumulate adds the provable authority layer.",
  },
  {
    question: "What happens during key rotation or personnel changes?",
    answer:
      "Accumulate's hierarchical key model separates identity from keys. When a signer rotates out, the identity persists, historical proofs remain valid, and the new signer inherits the same scoped authority. No re-approval of standing policies, no gaps in audit continuity.",
  },
  {
    question: "How does pricing work for ongoing treasury operations?",
    answer:
      "Accumulate uses a credit-based model with stable, predictable pricing. You purchase credits at a fixed rate and spend them on operations (signatures, data writes, authority updates). No gas auctions, no fee spikes. Designed so you can budget for ongoing governance like any other operational cost.",
  },
];

export default function TreasuryControlsPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <ScrollReveal direction="up">
          <div className="max-w-[760px]">
            <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
              Encode <GradientText variant="blue">approval policy</GradientText> for high-value movements.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              Accumulate makes threshold approvals and delegation a system
              primitive&mdash;so authority, policy, and audit continuity survive
              personnel churn and operational change.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href="/pilot">
                Start a 30-Day Pilot
              </Button>
              <Button variant="secondary" size="lg" href="https://accumulate-usecase-simulator.vercel.app/">
                Try the Use Case Simulator
              </Button>
            </div>
            <p className="mt-4">
              <Link
                href="/how-it-works"
                className="text-sm text-text-muted hover:text-text transition-colors"
              >
                See How It Works &rarr;
              </Link>
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* ===== THE SITUATION ===== */}
      <Section title="The problem isn&rsquo;t approval workflows. It&rsquo;s provable authority.">
        <ScrollReveal direction="up">
          <ul className="space-y-4 max-w-[760px]">
            {[
              "Approval rules live in spreadsheets and workflow tools, not in verifiable policy—so proving compliance means reconstructing intent after the fact.",
              "Key rotation and personnel changes create operational risk. Every signer change is a potential gap in the authority chain.",
              "Audits require manual reconstruction of who had authority to approve what, and when. The longer the history, the harder it gets.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-lg text-text-muted"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-danger mt-2.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <div className="mt-8 max-w-[760px] border-l-2 border-[#F59E0B] pl-6 py-2">
          <p className="text-text-muted leading-relaxed">
            Traditional approval workflows enforce rules inside one
            system&rsquo;s database. When approvals cross entities, custodians,
            or jurisdictions, the proof becomes &ldquo;we exported a
            spreadsheet&rdquo;&mdash;not independently verifiable policy.
          </p>
        </div>
      </Section>

      {/* ===== WHAT SUCCESS LOOKS LIKE ===== */}
      <Section title="What you gain immediately.">
        <StaggerChildren>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <FeatureCard
                title="Threshold approvals as primitives"
                description="M-of-N approval requirements encoded at the protocol level. Not a workflow rule—a cryptographic requirement that can't be bypassed or misconfigured."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                title="Durable audit continuity"
                description="Authority history persists across personnel changes, key rotations, and organizational restructuring. Auditors can verify the full chain independently."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                title="Predictable operating cost"
                description="Credit-based pricing you can budget for. No gas auctions, no fee spikes. Governance operations cost the same on busy days as quiet ones."
              />
            </StaggerItem>
          </div>
        </StaggerChildren>
      </Section>

      {/* ===== HOW ACCUMULATE ENABLES THIS ===== */}
      <div className="relative">
        <GlowOrb color="blue" size="lg" className="top-0 -left-32" />
        <GlowOrb color="cyan" size="md" className="bottom-0 -right-24" />
        <Section title="How Accumulate enables this.">
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StaggerItem>
                <FeatureCard
                  icon={<TreeStructure size={24} />}
                  title="Identity Namespaces"
                  description="Human-readable identities that model treasury structure: holding company → entities → signers → systems. Every participant gets a durable, addressable identity that persists across key changes."
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  icon={<ShieldCheck size={24} />}
                  title="Hierarchical Authorization"
                  description="Threshold approvals, scoped delegation, and time-bounded authority built into the protocol. Key rotation without losing continuity. Cascading revocation when authority needs to be unwound."
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  icon={<CurrencyCircleDollar size={24} />}
                  title="Predictable Operations"
                  description="Credit-based pricing designed for treasury budgeting. Stable costs for ongoing approval workflows. No surprises when transaction volumes fluctuate."
                />
              </StaggerItem>
            </div>
          </StaggerChildren>
        </Section>
      </div>

      {/* ===== THE 30-DAY PILOT ===== */}
      <Section
        title="The 30-day pilot."
        subtitle="We start with one movement type. You leave with a reusable approval pattern."
      >
        <StaggerChildren>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PILOT_WEEKS.map((week) => (
              <StaggerItem key={week.week}>
                <div
                  className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-primary-soft text-primary font-semibold text-sm flex items-center justify-center">
                      {week.week}
                    </span>
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                      Week {week.week}
                    </span>
                  </div>
                  <h3 className="font-heading text-[1.25rem] font-semibold">
                    {week.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-2">
                    {week.deliverables}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" href="/pilot">
            Start a 30-Day Pilot
          </Button>
          <Button variant="secondary" href="https://accumulate-usecase-simulator.vercel.app/">
            Try the Use Case Simulator
          </Button>
        </div>
      </Section>

      {/* ===== METRICS ===== */}
      <Section title="What you can measure in 30 days.">
        <StaggerChildren>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <StaggerItem>
              <MetricCard
                value="100%"
                label="Approvals cryptographically verifiable"
                description="Every threshold approval recorded with independent proof of each signer's authority."
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                value="0"
                label="Authority gaps during rotation"
                description="Key rotation preserves identity and authority continuity automatically."
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                value="Minutes"
                label="Audit reconstruction time"
                description="Full authority history queryable on demand—no spreadsheet archaeology."
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                value="Fixed"
                label="Per-operation cost"
                description="Predictable credit-based pricing. Budget with confidence."
              />
            </StaggerItem>
          </div>
        </StaggerChildren>
      </Section>

      {/* ===== FAQ ===== */}
      <Section title="Common questions.">
        <div className="max-w-[760px]">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </Section>

      {/* ===== FINAL CTA ===== */}
      <Section>
        <CTABand
          title="Start with one movement type."
          body="If approval policy is provable, compliance becomes a system property—not a manual exercise."
          primaryCTA={{ label: "Start a 30-Day Pilot", href: "/pilot" }}
          secondaryCTA={{ label: "Talk to an Engineer", href: "/contact" }}
        />
      </Section>
    </>
  );
}
