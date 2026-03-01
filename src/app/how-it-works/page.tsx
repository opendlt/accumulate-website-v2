import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { FeatureCard } from "@/components/cards/feature-card";
import { CTABand } from "@/components/content/cta-band";
import { Table } from "@/components/content/table";
import {
  IdentityTreeDiagram,
  AuthorityPolicyDiagram,
  VerificationFlowDiagram,
} from "@/components/interactive/identity-tree-diagram";
import { createMetadata } from "@/lib/metadata";
import { CREDIT_PRICING } from "@/lib/constants";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientText } from "@/components/visual/gradient-text";
import { GlowOrb } from "@/components/visual/glow-orb";
import {
  AuthorityLedgerDiagram,
  GovernanceComparisonDiagram,
  PricingStabilityDiagram,
} from "@/components/visual/landing-diagrams";
import {
  TreeStructure,
  ShieldCheck,
  CurrencyCircleDollar,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const metadata = createMetadata({
  title: "How It Works",
  description:
    "Identity and authority are the ledger. Accumulate treats governance as a first-class primitive with structured identities, hierarchical authorization, and verifiable proofs.",
  path: "/how-it-works",
});

const PRICING_COLUMNS = [
  { key: "operation", header: "Operation" },
  { key: "usd", header: "Cost" },
];

const pricingData = CREDIT_PRICING.map((row) => ({
  operation: row.operation,
  usd: row.usd,
}));

export default function HowItWorksPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <AuthorityLedgerDiagram />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
                Identity and authority are the ledger.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-relaxed">
                Accumulate is built for governance-first systems: structured
                identities, hierarchical authorization, and proofs that outsiders
                can verify.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg" href="/pilot">
                  Start a Pilot
                </Button>
                <Button variant="secondary" size="lg" href="/use-cases">
                  See Use Cases
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== THE MODEL (DIAGRAM) ===== */}
      <ScrollReveal direction="up">
        <div className="relative">
          <GlowOrb color="cyan" size="lg" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Section
            title="Model reality, then enforce it"
            subtitle="Create an identity tree (org → site → vendor → role). Attach authority policies (thresholds, scopes, expirations). Every action produces a verifiable proof."
          >
            <div className="flex justify-center">
              <IdentityTreeDiagram />
            </div>
          </Section>
        </div>
      </ScrollReveal>

      {/* ===== THREE PRIMITIVES ===== */}
      <Section title={<>Three primitives that make <GradientText variant="blue">governance durable</GradientText></>}>
        <StaggerChildren>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <FeatureCard
                icon={<TreeStructure size={24} />}
                title="Identity Namespaces"
                description="Human-readable identities organize accounts and roles in a way enterprises already understand. Map reality: organizations, sites, vendors, roles, and systems as named accounts with clear ownership boundaries."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                icon={<ShieldCheck size={24} />}
                title="Hierarchical Authorization"
                description="Multi-party approvals, delegation, revocation, and recovery are native — so governance doesn't live in scattered app logic. Thresholds, scoped authority, and key rotation without losing continuity."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                icon={<CurrencyCircleDollar size={24} />}
                title="Predictable Operations"
                description="Governance workflows are operational infrastructure. Costs should be budgetable, not subject to gas-market volatility. Credit-based pricing designed for always-on enterprise workflows."
              />
            </StaggerItem>
          </div>
        </StaggerChildren>
      </Section>

      {/* ===== TWO FLOWS ===== */}
      <Section title="Two workflows to understand Accumulate">
        <div className="space-y-12">
          {/* Flow A */}
          <ScrollReveal direction="up" delay={0}>
            <div>
              <h3 className="font-heading text-lg font-semibold text-text mb-6">
                Flow A: Delegation window
              </h3>
              <AuthorityPolicyDiagram />
            </div>
          </ScrollReveal>

          {/* Flow B */}
          <ScrollReveal direction="up" delay={0.2}>
            <div>
              <h3 className="font-heading text-lg font-semibold text-text mb-6">
                Flow B: Rotation / recovery
              </h3>
              <VerificationFlowDiagram />
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== WHAT'S DIFFERENT ===== */}
      <Section title="What&#39;s different from typical chains">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <GovernanceComparisonDiagram className="lg:w-[380px]" />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6 md:p-8">
              <p className="text-lg text-text-muted leading-relaxed">
                Most chains treat governance as application logic you rebuild
                repeatedly. Accumulate treats identity + authority as primitives, so
                you get durable patterns that survive time and organizational churn.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== CREDIT PRICING ===== */}
      <Section title="Predictable pricing without cryptocurrency">
        {/* Value points + diagram row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <p className="text-lg text-text-muted leading-relaxed">
                  <span className="text-text font-semibold">No tokens or cryptocurrency required.</span>{" "}
                  Accumulate credits work without wallets, exchanges, or holding any digital asset.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <p className="text-lg text-text-muted leading-relaxed">
                  <span className="text-text font-semibold">Pay with fiat like any enterprise service.</span>{" "}
                  Credits are fixed at $0.01 per 100 &mdash; no gas volatility, no market speculation.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <p className="text-lg text-text-muted leading-relaxed">
                  <span className="text-text font-semibold">Budget with confidence.</span>{" "}
                  Fixed per-operation pricing designed for always-on governance workflows.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="flex justify-center">
              <PricingStabilityDiagram className="w-full max-w-[380px]" />
            </div>
          </ScrollReveal>
        </div>

        {/* Pricing table full-width below */}
        <ScrollReveal direction="up">
          <div className="max-w-[640px] mx-auto">
            <Table
              columns={PRICING_COLUMNS}
              data={pricingData}
            />
          </div>
        </ScrollReveal>
      </Section>

      {/* ===== CTA BAND ===== */}
      <Section>
        <CTABand
          title="Want to see it applied to your environment?"
          body="Pick one workflow and run a 30-day pilot."
          primaryCTA={{ label: "Start a Pilot", href: "/pilot" }}
          secondaryCTA={{ label: "Download Pilot Kit", href: "#" }}
        />
      </Section>
    </>
  );
}
