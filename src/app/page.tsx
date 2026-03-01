import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { FeatureCard } from "@/components/cards/feature-card";
import { StepCard } from "@/components/cards/step-card";
import { CTABand } from "@/components/content/cta-band";
import { TrustBoundaryChecklist } from "@/components/interactive/trust-boundary-checklist";
import { HeroSection } from "@/components/sections/hero-section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GlowOrb } from "@/components/visual/glow-orb";
import { GradientText } from "@/components/visual/gradient-text";
import { AuthorityTreeShowcase } from "@/components/interactive/authority-tree-showcase";
import {
  TrustBoundaryDiagram,
  BrokenEvidenceDiagram,
  VerifiedChainDiagram,
} from "@/components/visual/landing-diagrams";
import { TRUST_BOUNDARY_CHECKLIST } from "@/lib/constants";
import {
  TreeStructure,
  ShieldCheck,
  CurrencyCircleDollar,
  Buildings,
  Bank,
  Flag,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <HeroSection />

      {/* ===== TRUST-BOUNDARY TEST ===== */}
      <Section
        title="Do you actually need a blockchain?"
        subtitle="If everything is inside one company and one admin domain, conventional IAM + logs are enough. Accumulate is for trust boundaries."
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

      {/* ===== THE PROBLEM ===== */}
      <Section>
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text mb-10">
            The problem isn&apos;t identity. It&apos;s{" "}
            <GradientText variant="cyan">authority over time.</GradientText>
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "Approvals, delegation, and access scopes drift across tools and partners.",
            },
            {
              quote:
                "When something goes wrong, we can't prove who was authorized to do what — at that time.",
            },
            {
              quote:
                "High-consequence operations shouldn't depend on a single admin system's truth.",
            },
          ].map((problem, i) => (
            <StaggerItem key={i}>
              <div className="relative bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] p-6 hover:border-overlay/[0.12] transition-all duration-300 h-full">
                <p className="text-lg text-text italic leading-relaxed">
                  &ldquo;{problem.quote}&rdquo;
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* ===== THE GUIDE ===== */}
      <div className="relative">
        <GlowOrb color="blue" size="lg" className="top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]" />
        <Section>
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text mb-10">
              Accumulate is built for{" "}
              <GradientText>governance-first</GradientText> systems.
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative border-l-2 border-white/10 pl-6 hover:border-primary/40 transition-colors duration-300">
                <h3 className="font-heading text-lg font-semibold text-text mb-2">
                  The reality
                </h3>
                <p className="text-text-muted leading-relaxed">
                  You can&apos;t run enterprise authorization on &ldquo;one wallet =
                  one person.&rdquo; Real organizations require delegation,
                  thresholds, role changes, and recovery.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative border-l-2 border-primary/40 pl-6 hover:border-primary transition-colors duration-300">
                <h3 className="font-heading text-lg font-semibold text-text mb-2">
                  The solution
                </h3>
                <p className="text-text-muted leading-relaxed">
                  Accumulate makes identity + hierarchical authorization first-class
                  primitives — so governance is native, not bolted on.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Section>
      </div>

      {/* ===== THE PLAN ===== */}
      <Section>
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text mb-10">
            Start small. <GradientText variant="cyan">Prove it.</GradientText> Expand.
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem>
            <StepCard
              number={1}
              title="Model"
              description="Create an identity tree that mirrors reality: org → teams → vendors → systems."
            />
          </StaggerItem>
          <StaggerItem>
            <StepCard
              number={2}
              title="Delegate"
              description="Define who can authorize what: thresholds, scopes, expiration, and recovery."
            />
          </StaggerItem>
          <StaggerItem>
            <StepCard
              number={3}
              title="Integrate"
              description="Connect one workflow (work orders, sign-offs, attestations). Expand from there."
            />
          </StaggerItem>
        </StaggerChildren>
        <ScrollReveal delay={0.4}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" href="/pilot">
              Start a 30-Day Pilot
            </Button>
            <Button variant="secondary" href="#">
              Download Pilot Playbook
            </Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* ===== UNIQUE MECHANISM ===== */}
      <div className="relative">
        <GlowOrb color="cyan" size="md" className="top-0 right-0 -translate-y-1/2 opacity-[0.05]" />
        <Section withGlow>
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text mb-10">
              Three primitives that{" "}
              <GradientText>make this work.</GradientText>
            </h2>
          </ScrollReveal>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <FeatureCard
                icon={<TreeStructure size={24} />}
                title="Identity Namespaces"
                description="Human-readable identities that represent orgs, roles, and systems. Organize accounts like the real world. Reduce operational mistakes and ambiguity."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                icon={<ShieldCheck size={24} />}
                title="Hierarchical Authorization"
                description="Multi-party approvals, delegation, and recovery — built in. Thresholds and scoped authority. Key rotation without losing continuity."
              />
            </StaggerItem>
            <StaggerItem>
              <FeatureCard
                icon={<CurrencyCircleDollar size={24} />}
                title="Predictable Operations"
                description="Costs designed for budgeting, not gas-market roulette. Stable operational pricing model. Designed for always-on governance workflows."
              />
            </StaggerItem>
          </StaggerChildren>
        </Section>
      </div>

      {/* ===== AUTHORITY TREE SHOWCASE ===== */}
      <Section>
        <ScrollReveal>
          <AuthorityTreeShowcase />
        </ScrollReveal>
      </Section>

      {/* ===== USE CASES ===== */}
      <Section>
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text mb-10">
            Where Accumulate{" "}
            <GradientText variant="rainbow">wins fastest.</GradientText>
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StaggerItem>
            <FeatureCard
              icon={<Buildings size={24} />}
              title="Vendor / Contractor Authority"
              description="Prove delegated authorization windows across partners and systems."
              href="/use-cases/vendor-authority"
            />
          </StaggerItem>
          <StaggerItem>
            <FeatureCard
              icon={<Bank size={24} />}
              title="Treasury & Multi-Entity Controls"
              description="Encode approval policy and delegation for high-value movements."
              href="/use-cases/treasury-controls"
            />
          </StaggerItem>
          <StaggerItem>
            <FeatureCard
              icon={<Flag size={24} />}
              title="Government / Coalition Delegation"
              description='Federated authority where no single admin can be "the truth."'
              href="/use-cases/coalition-delegation"
            />
          </StaggerItem>
        </StaggerChildren>
      </Section>

      {/* ===== STAKES ===== */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <BrokenEvidenceDiagram className="lg:w-[240px]" />
          </ScrollReveal>
          <div>
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text mb-6">
                If authority isn&apos;t provable, the cost shows up later.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <ul className="space-y-4">
                {[
                  "Post-incident investigations become slow, political, and expensive",
                  "Vendor access drift creates systemic risk",
                  'Audits depend on "trust us," not independent verification',
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
          </div>
        </div>
      </Section>

      {/* ===== SUCCESS ===== */}
      <div className="relative">
        <GlowOrb color="blue" size="md" className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 opacity-[0.04]" />
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center mb-10">
            <ScrollReveal direction="left">
              <VerifiedChainDiagram className="lg:w-[260px]" />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <h2 className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text mb-6">
                  What{" "}
                  <GradientText variant="rainbow">success</GradientText>{" "}
                  looks like.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <ul className="space-y-4">
                  {[
                    "Every action can be verified against a durable authority record",
                    "Delegation is explicit, scoped, and revocable",
                    "Governance survives turnover, rotation, and vendor churn",
                    "Audits become faster because proofs are portable and independent",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-lg text-text-muted"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-success mt-2.5 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
          <ScrollReveal delay={0.4}>
            <CTABand
              title="Start a Pilot"
              body="One workflow is all it takes to validate the ROI."
              primaryCTA={{ label: "Start a Pilot", href: "/pilot" }}
              secondaryCTA={{ label: "Talk to an Engineer", href: "/contact" }}
            />
          </ScrollReveal>
        </Section>
      </div>

      {/* ===== BUILDER TRACK ===== */}
      <Section>
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text mb-10">
            Prefer to{" "}
            <GradientText variant="cyan">build immediately?</GradientText>
          </h2>
        </ScrollReveal>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StaggerItem>
            <StepCard
              number={1}
              title="Create an identity"
              description="Set up an ADI with human-readable naming."
            />
          </StaggerItem>
          <StaggerItem>
            <StepCard
              number={2}
              title="Define authority"
              description="Configure key books, pages, and thresholds."
            />
          </StaggerItem>
          <StaggerItem>
            <StepCard
              number={3}
              title="Write an attestation"
              description="Move value or write verifiable data."
            />
          </StaggerItem>
        </StaggerChildren>
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" href="/docs#quickstart">
              Quickstart
            </Button>
            <Button variant="secondary" href="https://opendlt.org/tooling/studio/">
              Accumulate Studio
            </Button>
            <Button variant="secondary" href="/docs">
              Docs
            </Button>
            <Button variant="secondary" href="https://gitlab.com/accumulatenetwork">
              GitLab
            </Button>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
