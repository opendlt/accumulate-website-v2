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
  title: "Government / Coalition Delegation",
  description:
    "Federated delegation without a single administrator. When no one party can be the admin, authority records must be independently verifiable.",
  path: "/use-cases/coalition-delegation",
});

const PILOT_WEEKS = [
  {
    week: 1,
    title: "Map the authority model",
    deliverables:
      "Identity map (coalition → agencies → delegated roles → operators). Authority inventory and boundary definitions for one shared operation.",
  },
  {
    week: 2,
    title: "Encode delegation policy",
    deliverables:
      "Authority policies (multi-party thresholds, delegation boundaries, expiration windows). Revocation and succession rules on-chain.",
  },
  {
    week: 3,
    title: "Integrate one workflow",
    deliverables:
      "Integration reference for one cross-boundary operation. Independent verification checklist for each participating organization.",
  },
  {
    week: 4,
    title: "Measure and expand",
    deliverables:
      "Pilot report with governance metrics. Rollout plan for additional operations, agencies, and delegation patterns.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How does this work when no single party controls the system?",
    answer:
      "That's the point. Accumulate's identity and authority model is designed for exactly this scenario. Each organization maintains its own identity and key management. Authority is delegated through verifiable, scoped records that any party can independently verify. No single administrator is needed—or possible.",
  },
  {
    question: "What happens when an agency reorganizes or rotates personnel?",
    answer:
      "Accumulate separates identity from keys. When personnel rotate, the organizational identity persists. Historical authority records remain valid and verifiable. New personnel inherit scoped authority through the same delegation model—no re-negotiation of trust relationships required.",
  },
  {
    question: "Can verification work without connectivity to other organizations?",
    answer:
      "Yes. Accumulate proofs are self-contained and portable. Any party can verify a delegation record, an approval, or an authority chain using the protocol directly—without calling another organization's API, without relying on another party's database, and without real-time connectivity to the issuing authority.",
  },
];

export default function CoalitionDelegationPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <ScrollReveal direction="up">
          <div className="max-w-[760px]">
            <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
              <GradientText variant="blue">Federated delegation</GradientText> without a single administrator.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              When no one party can be the admin, authority records must be
              independently verifiable. Accumulate makes this a system
              primitive.
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
      <Section title="The problem isn&rsquo;t coordination. It&rsquo;s provable authority across boundaries.">
        <ScrollReveal direction="up">
          <ul className="space-y-4 max-w-[760px]">
            {[
              "No single party can credibly be \u201Cthe administrator.\u201D Shared operations require shared authority—but shared databases create single points of control.",
              "Authority chains must survive reorganizations, rotations, and political transitions. When agencies change leadership, the proof of delegated authority can't disappear.",
              "Verification must work independently from any single organization's APIs. If you can only verify authority by asking the issuer, you don't have independent verification.",
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
            Shared databases and federated identity systems still have an
            operator. When the question is &ldquo;who authorized this
            action&rdquo; and the answer is &ldquo;check our system,&rdquo;
            you&rsquo;ve just moved the trust problem&mdash;not solved it.
          </p>
        </div>
      </Section>

      {/* ===== WHAT SUCCESS LOOKS LIKE ===== */}
      <Section title="What you gain immediately.">
        <StaggerChildren>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <FeatureCard
                title="Shared, independently verifiable authority records"
                description="Every delegation and approval is recorded in a way that any participating organization can verify—without trusting or depending on any other party's system."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                title="Clear delegation boundaries and revocation"
                description="Authority is scoped by organization, role, operation type, and time window. Revocation propagates through the hierarchy. No ambiguity about who can do what."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                title="Proofs that outlive systems and teams"
                description="Authority records persist independently of any organization's infrastructure. When systems are decommissioned or teams reorganize, the proofs survive."
              />
            </StaggerItem>
          </div>
        </StaggerChildren>
      </Section>

      {/* ===== HOW ACCUMULATE ENABLES THIS ===== */}
      <div className="relative">
        <GlowOrb color="purple" size="lg" className="top-0 -left-32" />
        <GlowOrb color="blue" size="md" className="bottom-0 -right-24" />
        <Section title="How Accumulate enables this.">
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StaggerItem>
                <FeatureCard
                  icon={<TreeStructure size={24} />}
                  title="Identity Namespaces"
                  description="Human-readable identities that model coalition structure: program → agencies → delegated roles → operators. Each organization manages its own namespace. No shared admin required."
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  icon={<ShieldCheck size={24} />}
                  title="Hierarchical Authorization"
                  description="Multi-party thresholds across organizations, scoped delegation boundaries, and time-limited authority. Key rotation and succession without breaking the authority chain. Independent revocation by any delegating party."
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  icon={<CurrencyCircleDollar size={24} />}
                  title="Predictable Operations"
                  description="Credit-based pricing designed for government budgeting cycles. Stable, forecastable costs for ongoing operations. No procurement surprises from volatile fee markets."
                />
              </StaggerItem>
            </div>
          </StaggerChildren>
        </Section>
      </div>

      {/* ===== THE 30-DAY PILOT ===== */}
      <Section
        title="The 30-day pilot."
        subtitle="We start with one shared operation. You leave with a reusable federated governance pattern."
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
                label="Delegations independently verifiable"
                description="Every authority delegation provable by any participating organization without external dependencies."
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                value="0"
                label="Single points of admin control"
                description="No single organization can unilaterally modify shared authority records."
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                value="Portable"
                label="Proof format"
                description="Self-contained proofs that verify without real-time connectivity to the issuing organization."
              />
            </StaggerItem>
            <StaggerItem>
              <MetricCard
                value="30 days"
                label="Time to production pattern"
                description="From first shared operation to reusable federated governance template."
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
          title="Start with one shared operation."
          body="If no single party should be the admin, authority must be independently verifiable. That's what Accumulate does."
          primaryCTA={{ label: "Start a 30-Day Pilot", href: "/pilot" }}
          secondaryCTA={{ label: "Talk to an Engineer", href: "/contact" }}
        />
      </Section>
    </>
  );
}
