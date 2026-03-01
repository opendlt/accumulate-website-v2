import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { MetricCard } from "@/components/cards/metric-card";
import { createMetadata } from "@/lib/metadata";
import { EXTERNAL_LINKS } from "@/lib/constants";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GlowOrb } from "@/components/visual/glow-orb";

export const metadata = createMetadata({
  title: "Network Status",
  description:
    "Current operational status of the Accumulate network. Uptime, explorer links, and release information.",
  path: "/network-status",
});

export default function NetworkStatusPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <ScrollReveal direction="up">
          <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
            Network Status
          </h1>
          <p className="mt-4 text-lg text-text-muted leading-relaxed max-w-[760px]">
            Current operational status of the Accumulate network.
          </p>
        </ScrollReveal>
      </Section>

      <div className="relative">
        <GlowOrb color="blue" size="lg" className="top-0 -left-32" />
        <GlowOrb color="cyan" size="md" className="bottom-0 -right-24" />
        <Section title="Current Status">
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StaggerItem>
                <MetricCard
                  value="Operational"
                  label="Network Status"
                  description="All partitions functioning normally."
                />
              </StaggerItem>
              <StaggerItem>
                <MetricCard
                  value="Mainnet"
                  label="Active Network"
                  description="Production network with full validator set."
                />
              </StaggerItem>
              <StaggerItem>
                <MetricCard
                  value="Testnet"
                  label="Development Network"
                  description="Available for pilot integrations and testing."
                />
              </StaggerItem>
            </div>
          </StaggerChildren>
        </Section>
      </div>

      <Section title="Network Resources">
        <StaggerChildren>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerItem>
              <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6">
                <h3 className="font-heading text-[1.25rem] font-semibold text-text">
                  Block Explorer
                </h3>
                <p className="text-sm text-text-muted mt-2">
                  Browse transactions, accounts, and identity records on the
                  Accumulate network.
                </p>
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    href={EXTERNAL_LINKS.explorer}
                  >
                    Open Explorer
                  </Button>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6">
                <h3 className="font-heading text-[1.25rem] font-semibold text-text">
                  GitLab Releases
                </h3>
                <p className="text-sm text-text-muted mt-2">
                  Latest releases, changelogs, and protocol updates.
                </p>
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    href={EXTERNAL_LINKS.gitlab}
                  >
                    View on GitLab
                  </Button>
                </div>
              </div>
            </StaggerItem>
          </div>
        </StaggerChildren>
      </Section>

      <Section title="Architecture Overview">
        <ScrollReveal direction="up">
          <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6 max-w-[760px]">
            <p className="text-text-muted leading-relaxed">
              Accumulate uses a multi-partition architecture with a Directory
              Network (DN) coordinating multiple Block Validator Networks (BVNs).
              Each partition processes transactions independently, enabling
              horizontal scaling while maintaining global state consistency through
              anchoring.
            </p>
            <ul className="mt-4 space-y-2 text-text-muted">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                Directory Network (DN) — global coordination and anchoring
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                Block Validator Networks (BVNs) — parallel transaction processing
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                Merkle-tree anchoring — cryptographic state proofs across
                partitions
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </Section>

      <Section>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" href="/docs">
            Read the Docs
          </Button>
          <Button variant="secondary" href="/contact">
            Report an Issue
          </Button>
        </div>
      </Section>
    </>
  );
}
