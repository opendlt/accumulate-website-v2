import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { StepCard } from "@/components/cards/step-card";
import { CTABand } from "@/components/content/cta-band";
import { createMetadata } from "@/lib/metadata";
import {
  User,
  ShieldCheck,
  ArrowsClockwise,
  NotePencil,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GlowOrb } from "@/components/visual/glow-orb";
import { GradientText } from "@/components/visual/gradient-text";
import { BuilderStackDiagram, CreditFlowDiagram } from "@/components/visual/landing-diagrams";
import { TaskPalette } from "@/components/interactive/task-palette";
import { SDKCarousel } from "@/components/interactive/sdk-carousel";

export const metadata = createMetadata({
  title: "Documentation",
  description:
    "Build governance-first systems with Accumulate. Quickstart guides, API reference, SDKs, and developer resources.",
  path: "/docs",
});

export default function DocsPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <BuilderStackDiagram />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
                Build <GradientText variant="blue">governance-first</GradientText> systems.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-relaxed">
                Everything you need to model identities, define authority, and
                integrate verifiable governance into your systems.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="secondary" href="#quickstart">
                  Quickstart
                </Button>
                <Button variant="secondary" href="#tasks">
                  Create an Identity
                </Button>
                <Button variant="secondary" href="#tasks">
                  Key Management
                </Button>
                <Button variant="secondary" href="#credits">
                  Credits
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== QUICKSTART ===== */}
      <div className="relative">
        <GlowOrb color="blue" size="lg" className="top-0 -left-32" />
        <GlowOrb color="cyan" size="md" className="bottom-0 -right-24" />
        <Section id="quickstart" title="Quickstart">
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>
          </StaggerChildren>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" href="#">
              Full Quickstart Guide
            </Button>
            <Button variant="secondary" href="https://accumulate-studio.vercel.app/">
              Open Accumulate Studio
            </Button>
          </div>
        </Section>
      </div>

      {/* ===== COMMON TASKS ===== */}
      <Section id="tasks" title="Common tasks">
        <TaskPalette
          items={[
            {
              icon: <User size={24} />,
              title: "Create Identity",
              description: "Model org structure with human-readable ADI names.",
            },
            {
              icon: <ShieldCheck size={24} />,
              title: "Define Authority Thresholds",
              description: "Set M-of-N approval requirements on key pages.",
            },
            {
              icon: <ArrowsClockwise size={24} />,
              title: "Rotate / Revoke Keys",
              description: "Update key books while preserving authority continuity.",
            },
            {
              icon: <NotePencil size={24} />,
              title: "Write an Attestation",
              description: "Record verifiable data entries on-chain.",
            },
            {
              icon: <SealCheck size={24} />,
              title: "Verify a Proof",
              description: "Independently validate authority and state.",
            },
          ]}
        />
      </Section>

      {/* ===== SDKs & TOOLS ===== */}
      <Section id="sdks" title="SDKs & Tools">
        <SDKCarousel
          items={[
            {
              title: "Go SDK",
              description:
                "Full-featured reference SDK for building Accumulate integrations in Go.",
              href: "https://gitlab.com/accumulatenetwork/accumulate",
            },
            {
              title: "JavaScript SDK",
              description:
                "Client library for browser and Node.js environments.",
              href: "https://gitlab.com/accumulatenetwork",
            },
            {
              title: "Python SDK",
              description:
                "Idiomatic Python client library aligned to Accumulate API v2/v3.",
              href: "https://github.com/opendlt",
            },
            {
              title: "Dart SDK",
              description:
                "Dart client library and SDK for mobile and cross-platform integrations.",
              href: "https://github.com/opendlt",
            },
            {
              title: "Rust SDK",
              description:
                "Generated Rust SDK derived from the Go reference implementation.",
              href: "https://github.com/opendlt",
            },
            {
              title: "CLI Tool",
              description:
                "Command-line interface for identity, key, and transaction management.",
              href: "https://gitlab.com/accumulatenetwork",
            },
            {
              title: "Block Explorer",
              description:
                "Browse transactions, accounts, and identity records on mainnet.",
              href: "https://explorer.accumulatenetwork.io",
            },
            {
              title: "DevNet Startup Pack",
              description:
                "Docker-based turnkey local DevNet for development and testing.",
              href: "https://github.com/opendlt/accumulate-devnet-distribution",
            },
            {
              title: "Accumulate Studio",
              description:
                "Developer studio by OpenDLT — build with all five SDKs (Dart, Rust, C#, Python, JavaScript) instantly in the browser.",
              href: "https://accumulate-studio.vercel.app/",
            },
            {
              title: "OpenDLT",
              description:
                "Open-source tooling, SDKs, and infrastructure maintained by the OpenDLT community.",
              href: "https://opendlt.org",
            },
          ]}
        />
      </Section>

      {/* ===== CREDITS & PRICING ===== */}
      <Section id="credits" title="Credits & Pricing">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <CreditFlowDiagram className="lg:w-[360px]" />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <p className="text-lg text-text-muted leading-relaxed">
                Accumulate uses a credit-based model for predictable operational
                costs. Credits are fixed at $0.01 per 100&mdash;no gas
                volatility, no token speculation.
              </p>
              <p className="mt-4 text-lg text-text-muted leading-relaxed">
                Organizations pay with any fiat currency. No wallets, no tokens,
                no cryptocurrency required to use the network.
              </p>
              <p className="mt-4">
                <Link
                  href="/how-it-works"
                  className="text-sm text-primary hover:text-primary-hover transition-colors font-semibold"
                >
                  View full pricing table &rarr;
                </Link>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== REFERENCE ===== */}
      <Section title="Reference">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[760px]">
            {[
              { label: "API Reference", href: "#" },
              { label: "CLI Reference", href: "#" },
              { label: "Protocol Specification", href: "#" },
              {
                label: "Accumulate Studio",
                href: "https://accumulate-studio.vercel.app/",
              },
              {
                label: "GitLab",
                href: "https://gitlab.com/accumulatenetwork",
              },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] px-5 py-4 hover:-translate-y-px"
              >
                <span className="font-heading font-semibold text-text">
                  {link.label}
                </span>
                <span className="text-text-muted ml-auto">&rarr;</span>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* ===== CTA BAND ===== */}
      <Section>
        <CTABand
          title="Need help?"
          body="Our engineering team can help you scope your first integration — or jump straight into Studio."
          primaryCTA={{ label: "Talk to an Engineer", href: "/contact" }}
          secondaryCTA={{ label: "Start a Pilot", href: "/pilot" }}
          tertiaryCTA={{ label: "Open Studio", href: "https://accumulate-studio.vercel.app/" }}
        />
      </Section>
    </>
  );
}
