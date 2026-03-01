import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { CTABand } from "@/components/content/cta-band";
import { FAQAccordion } from "@/components/content/faq-accordion";
import { PilotTrackSelector } from "@/components/interactive/pilot-track-selector";
import { PilotIntakeForm } from "@/components/forms/pilot-intake-form";
import { createMetadata } from "@/lib/metadata";
import { PILOT_TIMELINE } from "@/lib/constants";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GradientText } from "@/components/visual/gradient-text";
import { GlowOrb } from "@/components/visual/glow-orb";
import Link from "next/link";
import {
  PilotSprintDiagram,
  DeliverablesStackDiagram,
  TeamTopologyDiagram,
  PilotTimelineDiagram,
  SuccessOutcomesDiagram,
} from "@/components/visual/landing-diagrams";

export const metadata = createMetadata({
  title: "Start a Governance Pilot",
  description:
    "One workflow. Clear deliverables. Measurable ROI. Start a governance pilot with Accumulate — set up in days, prove value in a week.",
  path: "/pilot",
});

const DELIVERABLES = [
  "Identity model diagram + definitions",
  "Authority policy spec (thresholds, scopes, expirations, recovery)",
  "Integration reference (events, signatures, verification)",
  "Verification checklist (what a third party can validate)",
  "Pilot report + rollout plan",
];

const REQUIREMENTS = [
  "1 process owner (ops/compliance)",
  "1 security/IAM stakeholder",
  "1 engineer (integration)",
  "A sample workflow + role list",
  "1–2 vendors or partner entities (for realism)",
];

const SUCCESS_METRICS = [
  "A third party can verify authority for actions without calling your internal APIs",
  "Vendor authority can be granted/revoked/rotated with clear continuity",
  'You can prove "who was authorized when" in minutes, not days',
];

const FAQ_ITEMS = [
  {
    question: "Is this production-ready?",
    answer:
      "The pilot is designed to validate the pattern with real constraints before any broader rollout.",
  },
  {
    question: "Will this replace our IAM?",
    answer:
      "No. It complements IAM by providing a cross-org, independently verifiable authority record.",
  },
  {
    question: "What happens after the pilot?",
    answer:
      "You expand to additional workflows and identities using the same governance pattern.",
  },
];

export default function PilotPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <PilotSprintDiagram />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
                Start a <GradientText variant="blue">Governance Pilot</GradientText> in days, not months.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-relaxed">
                One workflow. Clear deliverables. Measurable ROI.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg" href="#intake-form">
                  Schedule Pilot Intake
                </Button>
                <Button variant="secondary" size="lg" href="#">
                  Download Pilot Kit
                </Button>
              </div>
              <p className="mt-4">
                <Link
                  href="/docs"
                  className="text-sm text-text-muted hover:text-text transition-colors"
                >
                  Prefer to build first? Go to Docs →
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== CHOOSE YOUR PILOT TRACK ===== */}
      <Section title="Choose your pilot track">
        <PilotTrackSelector />
      </Section>

      {/* ===== DELIVERABLES ===== */}
      <Section title="Deliverables you'll have in hand">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <DeliverablesStackDiagram className="lg:w-[260px]" />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <ul className="space-y-4">
              {DELIVERABLES.map((item) => (
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
      </Section>

      {/* ===== WHAT YOU NEED ===== */}
      <Section title="What we need from your side">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <TeamTopologyDiagram className="lg:w-[300px]" />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <ul className="space-y-4">
              {REQUIREMENTS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-lg text-text-muted"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== TIMELINE ===== */}
      <Section title="Timeline">
        <div className="relative">
          <GlowOrb color="blue" size="lg" className="top-0 right-0 -translate-y-1/4" />
          <GlowOrb color="purple" size="md" className="bottom-0 left-0 translate-y-1/4" />
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
            <ScrollReveal direction="left">
              <PilotTimelineDiagram className="lg:w-[240px]" />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <StaggerChildren>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PILOT_TIMELINE.map((step) => (
                    <StaggerItem key={step.phase}>
                      <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6">
                        <span className="inline-flex items-center rounded-[999px] h-7 px-2.5 text-[0.8125rem] font-semibold text-primary bg-primary-soft border border-primary/20 mb-4">
                          {step.label}
                        </span>
                        <h3 className="font-heading text-[1.25rem] font-semibold text-text">
                          {step.title}
                        </h3>
                        <p className="text-sm text-text-muted mt-2">{step.description}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerChildren>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* ===== SUCCESS METRICS ===== */}
      <Section title="How we define success">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <SuccessOutcomesDiagram className="lg:w-[300px]" />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <ul className="space-y-4">
              {SUCCESS_METRICS.map((item) => (
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
      </Section>

      {/* ===== PILOT INTAKE FORM ===== */}
      <Section id="intake-form" title="Schedule your pilot intake">
        <div className="max-w-[760px]">
          <PilotIntakeForm />
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <ScrollReveal direction="up">
        <Section title="Common questions">
          <div className="max-w-[760px]">
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </Section>
      </ScrollReveal>

      {/* ===== FINAL CTA BAND ===== */}
      <Section>
        <CTABand
          title="Ready to start?"
          body="One workflow is all it takes to validate the ROI."
          primaryCTA={{ label: "Schedule Pilot Intake", href: "#intake-form" }}
          secondaryCTA={{ label: "Talk to an Engineer", href: "/contact" }}
        />
      </Section>
    </>
  );
}
