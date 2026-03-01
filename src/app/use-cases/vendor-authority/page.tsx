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
  title: "Vendor / Contractor Authority",
  description:
    "Prove vendor authority across systems—without trusting one admin. Verifiable delegation windows, multi-party approvals, and audit-ready proofs.",
  path: "/use-cases/vendor-authority",
});

const PILOT_WEEKS = [
  {
    week: 1,
    title: "Map the authority model",
    deliverables:
      "Identity map (org → sites → vendors → roles). Role inventory and scope definitions for one workflow.",
  },
  {
    week: 2,
    title: "Encode delegation policy",
    deliverables:
      "Authority policies (thresholds, delegation scopes, expiration windows). Recovery and revocation rules on-chain.",
  },
  {
    week: 3,
    title: "Integrate one workflow",
    deliverables:
      "Integration reference implementation with event and proof outputs. Verification checklist for auditors.",
  },
  {
    week: 4,
    title: "Measure and expand",
    deliverables:
      "Pilot report with ROI metrics. Rollout plan for additional sites, vendors, and workflows.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How does this differ from our existing IAM system?",
    answer:
      "IAM systems manage access within one admin domain. Accumulate manages authority across admin domains—so when vendors, partners, and auditors span multiple organizations, you have verifiable proof of who was authorized to do what, and when. IAM stays; Accumulate adds the cross-boundary governance layer.",
  },
  {
    question: "What happens when a vendor's key is compromised?",
    answer:
      "Accumulate's hierarchical key model means you can rotate or revoke a vendor's key without losing authority continuity. The identity persists, proofs from before the rotation remain valid, and the new key inherits the same scoped delegation—no re-onboarding required.",
  },
  {
    question: "How do we get started without replacing existing systems?",
    answer:
      "The 30-day pilot integrates alongside your current tools. Accumulate acts as the verifiable authority layer—your IAM, ticketing, and workflow tools keep running. We start with one workflow and one vendor relationship so you can measure value before expanding.",
  },
];

export default function VendorAuthorityPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <ScrollReveal direction="up">
          <div className="max-w-[760px]">
            <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
              Prove <GradientText variant="blue">vendor authority</GradientText> across systems&mdash;without trusting one
              admin.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              Accumulate makes delegated authority a verifiable record: who could
              authorize what, under what scope, for what window of time&mdash;even
              as keys, roles, and vendors change.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" size="lg" href="/pilot">
                Start a 30-Day Pilot
              </Button>
              <Button variant="secondary" size="lg" href="#">
                Download Pilot Kit
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
      <Section title="The problem isn&rsquo;t access. It&rsquo;s authority over time.">
        <ScrollReveal direction="up">
          <ul className="space-y-4 max-w-[760px]">
            {[
              "Vendor access and approvals drift across tools and partners—no single system has the full picture.",
              "Turnover and rotation break authority continuity. When people leave, the proof of what they were authorized to do leaves with them.",
              'After incidents, proving "who was authorized when" is slow, political, and expensive.',
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
            IAM and logs work inside one admin domain. Across partners and
            vendors, they become bilateral integrations, manual reconciliation,
            and &ldquo;trust us&rdquo; evidence&mdash;especially under audit or
            investigation.
          </p>
        </div>
      </Section>

      {/* ===== WHAT SUCCESS LOOKS LIKE ===== */}
      <Section title="What you gain immediately.">
        <StaggerChildren>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <FeatureCard
                title="Delegation windows you can verify"
                description="Every vendor authorization has a defined scope (asset, task, time window) that anyone can independently verify—without calling you."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                title="Multi-party approval for high-consequence actions"
                description="Threshold signatures ensure that critical operations require sign-off from multiple authorized parties before execution."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                title="Audit-ready proof that survives churn"
                description="Authority records persist independently of any single system. When people leave, the proof of what they were authorized to do stays."
              />
            </StaggerItem>
          </div>
        </StaggerChildren>
      </Section>

      {/* ===== HOW ACCUMULATE ENABLES THIS ===== */}
      <div className="relative">
        <GlowOrb color="blue" size="lg" className="top-0 -left-32" />
        <GlowOrb color="purple" size="md" className="bottom-0 -right-24" />
        <Section title="How Accumulate enables this.">
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StaggerItem>
                <FeatureCard
                  icon={<TreeStructure size={24} />}
                  title="Identity Namespaces"
                  description="Human-readable identities that model real-world structure: org → sites → vendors → roles. Reduce operational mistakes and ambiguity. Every entity gets a durable, addressable identity."
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  icon={<ShieldCheck size={24} />}
                  title="Hierarchical Authorization"
                  description="Multi-party approvals, scoped delegation, and time-bounded authority—built into the protocol. Key rotation without losing continuity. Recovery and revocation as first-class operations."
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  icon={<CurrencyCircleDollar size={24} />}
                  title="Predictable Operations"
                  description="Credit-based pricing designed for budgeting, not gas-market volatility. Stable costs for ongoing governance workflows. No surprises when you scale from one workflow to twenty."
                />
              </StaggerItem>
            </div>
          </StaggerChildren>
        </Section>
      </div>

      {/* ===== THE 30-DAY PILOT ===== */}
      <Section
        title="The 30-day pilot."
        subtitle="We start with one workflow. You leave with a reusable governance pattern."
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
          <Button variant="secondary" href="#">
            Download Pilot Kit
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
                label="Authority actions verifiable"
                description="Every delegation, approval, and revocation recorded with cryptographic proof."
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                value="<1 min"
                label="Time to verify authorization"
                description="Independent verification without calling the issuing organization."
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                value="0"
                label="Manual reconciliation steps"
                description="Authority state is always current and independently queryable."
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                value="30 days"
                label="Time to production pattern"
                description="From first workflow to reusable governance template."
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
          title="Start with one workflow."
          body="If authority is provable, everything downstream gets easier."
          primaryCTA={{ label: "Start a 30-Day Pilot", href: "/pilot" }}
          secondaryCTA={{ label: "Talk to an Engineer", href: "/contact" }}
        />
      </Section>
    </>
  );
}
