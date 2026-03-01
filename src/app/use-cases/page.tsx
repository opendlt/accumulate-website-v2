import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { UseCaseCard } from "@/components/cards/use-case-card";
import { CTABand } from "@/components/content/cta-band";
import { TrustBoundaryChecklist } from "@/components/interactive/trust-boundary-checklist";
import { TRUST_BOUNDARY_CHECKLIST } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientText } from "@/components/visual/gradient-text";
import { GlowOrb } from "@/components/visual/glow-orb";
import {
  UseCaseHeroDiagram,
  TrustBoundaryDiagram,
} from "@/components/visual/landing-diagrams";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Use Cases",
  description:
    "Governance-first systems across trust boundaries—where authority must be provable, delegation must be scoped, and audits can't depend on one admin's database.",
  path: "/use-cases",
});

export default function UseCasesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <UseCaseHeroDiagram />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
                Where Accumulate <GradientText variant="blue">wins fastest</GradientText>.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-relaxed">
                Governance-first systems across trust boundaries&mdash;where
                authority must be provable, delegation must be scoped, and audits
                can&rsquo;t depend on one admin&rsquo;s database.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg" href="/pilot">
                  Start a 30-Day Pilot
                </Button>
                <Button variant="secondary" size="lg" href="/contact">
                  Talk to an Engineer
                </Button>
              </div>
              <p className="mt-4">
                <Link
                  href="#trust-test"
                  className="text-sm text-text-muted hover:text-text transition-colors"
                >
                  Not sure if you need blockchain? Take the 30-second fit check.
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== USE CASE CARDS ===== */}
      <Section title="Pick the pattern closest to your challenge.">
        <div className="relative">
          <GlowOrb color="blue" size="lg" className="top-0 left-1/4 -translate-y-1/2" />
          <GlowOrb color="purple" size="md" className="bottom-0 right-1/4 translate-y-1/2" />
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StaggerItem>
                <UseCaseCard
                  title="Vendor authority you can prove."
                  whoItsFor={[
                    "Utilities",
                    "Industrial operators",
                    "Aviation MRO",
                    "Port operations",
                  ]}
                  pains={[
                    "Vendor access and approvals drift across tools and partners",
                    "Turnover and rotation break authority continuity",
                    'After incidents, proving "who was authorized when" is slow and political',
                  ]}
                  outcomes={[
                    "Delegation scopes you can verify (asset / task / time window)",
                    "Multi-party approvals for high-consequence actions",
                    "Audit-ready proofs that don't depend on any single system",
                  ]}
                  href="/use-cases/vendor-authority"
                />
              </StaggerItem>
              <StaggerItem>
                <UseCaseCard
                  title="Approval policy for high-value movement."
                  whoItsFor={[
                    "Corporate treasury",
                    "Custody",
                    "Regulated fintech",
                  ]}
                  pains={[
                    "Approval rules live in spreadsheets and workflows, not in verifiable policy",
                    "Key rotation and role changes create operational risk",
                    "Audits require manual reconstruction of authority history",
                  ]}
                  outcomes={[
                    "Threshold approvals and delegation as a system primitive",
                    "Durable audit continuity across time and personnel churn",
                    "Predictable operating cost for ongoing controls",
                  ]}
                  href="/use-cases/treasury-controls"
                />
              </StaggerItem>
              <StaggerItem>
                <UseCaseCard
                  title="Federated delegation without a single admin."
                  whoItsFor={[
                    "Cross-agency programs",
                    "Coalition operations",
                    "Regulated networks",
                  ]}
                  pains={[
                    'No one party can credibly be "the administrator"',
                    "Authority chains must survive rotations and reorganizations",
                    "Verification must work offline from any single org's APIs",
                  ]}
                  outcomes={[
                    "Shared, independently verifiable authority records",
                    "Clear delegation boundaries and revocation",
                    "Proofs that outlive systems and teams",
                  ]}
                  href="/use-cases/coalition-delegation"
                />
              </StaggerItem>
            </div>
          </StaggerChildren>
        </div>
      </Section>

      {/* ===== TRUST-BOUNDARY TEST ===== */}
      <Section
        id="trust-test"
        title="Do you actually need a blockchain?"
        subtitle="If everything is inside one company and one admin domain, conventional IAM + WORM logs are enough. Accumulate is for trust boundaries."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ScrollReveal direction="left">
            <TrustBoundaryDiagram />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <TrustBoundaryChecklist items={TRUST_BOUNDARY_CHECKLIST} />
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== CTA BAND ===== */}
      <Section>
        <CTABand
          title="Start a pilot in 30 days."
          body="One workflow. Measurable outcomes. Clear deliverables."
          primaryCTA={{ label: "Start a 30-Day Pilot", href: "/pilot" }}
          secondaryCTA={{ label: "Try the Use Case Simulator", href: "https://accumulate-usecase-simulator.vercel.app/" }}
        />
      </Section>
    </>
  );
}
