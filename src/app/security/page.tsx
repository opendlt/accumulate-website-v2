import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { FeatureCard } from "@/components/cards/feature-card";
import { CTABand } from "@/components/content/cta-band";
import { FAQAccordion } from "@/components/content/faq-accordion";
import { createMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientText } from "@/components/visual/gradient-text";
import { GlowOrb } from "@/components/visual/glow-orb";
import {
  Key,
  ShieldCheck,
  MagnifyingGlass,
  Gear,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  SecurityShieldDiagram,
  GovernancePatternsDiagram,
  AuditVerificationDiagram,
} from "@/components/visual/landing-diagrams";

export const metadata = createMetadata({
  title: "Security",
  description:
    "Security and governance by design. A practical view of key lifecycle, delegation, verification, and operational best practices for governance-first systems.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <SecurityShieldDiagram />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
                Security and governance, by design.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-relaxed">
                A practical view of how Accumulate supports key lifecycle,
                delegation, verification, and operational best practices for
                governance-first systems.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg" href="/contact">
                  Talk to a Security Engineer
                </Button>
                <Button variant="secondary" size="lg" href="/docs">
                  Read the Docs
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== SECURITY PILLARS ===== */}
      <Section title={<>Core <GradientText variant="blue">security principles</GradientText></>}>
        <div className="relative">
          <GlowOrb color="blue" size="lg" className="top-0 left-1/3 -translate-y-1/2" />
          <GlowOrb color="cyan" size="md" className="bottom-0 right-1/4 translate-y-1/2" />
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StaggerItem>
                <FeatureCard
                  icon={<Key size={24} />}
                  title="Key lifecycle over time"
                  description="Rotation and revocation are normal. Governance must survive them."
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  icon={<ShieldCheck size={24} />}
                  title="Least privilege delegation"
                  description="Scoped authority reduces blast radius and clarifies accountability."
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  icon={<MagnifyingGlass size={24} />}
                  title="Independent verification"
                  description="Third parties should verify proofs without trusting a single admin."
                />
              </StaggerItem>
              <StaggerItem>
                <FeatureCard
                  icon={<Gear size={24} />}
                  title="Operational discipline"
                  description="Secure key storage, separation of duties, and policy review are non-optional."
                />
              </StaggerItem>
            </div>
          </StaggerChildren>
        </div>
      </Section>

      {/* ===== THREAT MODEL ===== */}
      <Section title="Threat model (high level)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ScrollReveal direction="up" delay={0}>
            <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6">
              <h3 className="font-heading text-[1.25rem] font-semibold text-text mb-4">
                Accumulate helps you mitigate:
              </h3>
              <ul className="space-y-3">
                {[
                  "Authority ambiguity across organizations and partners",
                  "Undocumented delegation and scope drift",
                  "Audit disputes over who was authorized when",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6">
              <h3 className="font-heading text-[1.25rem] font-semibold text-text mb-4">
                Accumulate does not replace:
              </h3>
              <ul className="space-y-3">
                {[
                  "Secure key storage and custody solutions",
                  "Internal IAM and access management systems",
                  "Secure software development lifecycle (SDLC)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== BEST PRACTICES ===== */}
      <Section title="Recommended governance patterns">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <GovernancePatternsDiagram className="lg:w-[340px]" />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <ul className="space-y-4">
              {[
                "Threshold approvals for high-consequence actions",
                "Scoped delegation with explicit expirations",
                "Role-based identities that map to real organizational structure",
                "Regular authority reviews and revocation drills",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-lg text-text-muted"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== VERIFICATION ===== */}
      <Section title="What independent verification looks like">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <AuditVerificationDiagram className="lg:w-[280px]" />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <p className="text-lg text-text-muted leading-relaxed mb-6">
                Auditors verify:
              </p>
              <ul className="space-y-4">
                {[
                  "The authority policy in force at the time of the action",
                  "Signatures and thresholds satisfied for each approval",
                  "Linkage between identity, role, and scope of delegation",
                  "Time window constraints and expiration enforcement",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-lg text-text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <Section title="Frequently asked questions">
        <div className="max-w-[760px]">
          <FAQAccordion
            items={[
              {
                question: "Can we keep our internal IAM?",
                answer:
                  "Yes. Accumulate complements IAM by providing cross-org verifiable authority. Your existing identity and access management systems remain the source of truth for internal access control. Accumulate adds an independent, verifiable layer for authority that crosses organizational boundaries.",
              },
              {
                question: "What is the operational responsibility split?",
                answer:
                  "You manage key custody and policy decisions; Accumulate provides the verifiable record and enforcement semantics. Your teams retain full control of key generation, storage, and rotation procedures. Accumulate ensures that the authority chain, delegation scopes, and approval history are independently auditable.",
              },
            ]}
          />
        </div>
      </Section>

      {/* ===== CTA BAND ===== */}
      <Section>
        <CTABand
          title="Want a security review of your pilot scope?"
          body="We'll map roles, delegation, and thresholds to a minimum-risk starting workflow."
          primaryCTA={{
            label: "Talk to a Security Engineer",
            href: "/contact",
          }}
          secondaryCTA={{ label: "Start a Pilot", href: "/pilot" }}
        />
      </Section>
    </>
  );
}
