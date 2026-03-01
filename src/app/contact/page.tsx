import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { createMetadata } from "@/lib/metadata";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GlowOrb } from "@/components/visual/glow-orb";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with the Accumulate team. Schedule a pilot intake, talk to an engineer, or reach out with questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <ScrollReveal direction="up">
          <div className="max-w-[760px]">
            <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
              Get in touch.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              Whether you&apos;re exploring a pilot, have technical questions, or
              want to talk to an engineer about your use case — we&apos;re here to
              help.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <div className="relative">
        <GlowOrb color="blue" size="lg" className="top-0 -left-32" />
        <GlowOrb color="purple" size="md" className="bottom-0 -right-24" />
        <Section>
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StaggerItem>
                <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6">
                  <h3 className="font-heading text-[1.25rem] font-semibold text-text mb-2">
                    Start a Pilot
                  </h3>
                  <p className="text-sm text-text-muted mb-4">
                    Schedule a pilot intake to discuss your use case, timeline, and
                    deliverables.
                  </p>
                  <Button variant="primary" size="sm" href="/pilot#intake-form">
                    Schedule Pilot Intake
                  </Button>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6">
                  <h3 className="font-heading text-[1.25rem] font-semibold text-text mb-2">
                    Talk to an Engineer
                  </h3>
                  <p className="text-sm text-text-muted mb-4">
                    Have technical questions about identity, authority, or
                    integration? Let&apos;s discuss.
                  </p>
                  <Button variant="secondary" size="sm" href={EXTERNAL_LINKS.discord}>
                    Join Discord
                  </Button>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6">
                  <h3 className="font-heading text-[1.25rem] font-semibold text-text mb-2">
                    Open Source
                  </h3>
                  <p className="text-sm text-text-muted mb-4">
                    Accumulate is open source. File issues, contribute, or explore the
                    codebase.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    href={EXTERNAL_LINKS.gitlab}
                  >
                    GitLab
                  </Button>
                </div>
              </StaggerItem>
            </div>
          </StaggerChildren>
        </Section>
      </div>

      <Section>
        <ScrollReveal direction="up">
          <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6 md:p-8 max-w-[760px]">
            <h2 className="font-heading text-xl font-semibold text-text mb-4">
              Email us directly
            </h2>
            <p className="text-text-muted leading-relaxed">
              For partnership inquiries, security disclosures, or general
              questions:
            </p>
            <p className="mt-3">
              <a
                href="mailto:contact@accumulatenetwork.io"
                className="text-primary hover:underline font-semibold"
              >
                contact@accumulatenetwork.io
              </a>
            </p>
          </div>
        </ScrollReveal>
      </Section>
    </>
  );
}
