import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { CTABand } from "@/components/content/cta-band";
import { createMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GlowOrb } from "@/components/visual/glow-orb";
import { GradientText } from "@/components/visual/gradient-text";
import { ProgressMomentumDiagram } from "@/components/visual/landing-diagrams";
import { RoadmapKanban } from "@/components/interactive/roadmap-kanban";
import { AIPLedger } from "@/components/content/aip-ledger";
import { BentoGrid } from "@/components/layout/bento-grid";
import {
  ROADMAP_SHIPPED,
  ROADMAP_IN_PROGRESS,
  ROADMAP_PLANNED,
  ROADMAP_AIPS,
} from "@/lib/constants";
import Link from "next/link";
import {
  IdentificationCard,
  Bank,
  Globe,
  SealCheck,
  FileText,
  Table,
  CreditCard,
  Coins,
  Rocket,
} from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

export const metadata = createMetadata({
  title: "Progress",
  description:
    "See what's shipping, in progress, and coming next for the Accumulate protocol. Active development, AIPs, and ecosystem growth.",
  path: "/progress",
});

export default function ProgressPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <ProgressMomentumDiagram />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
                What&apos;s{" "}
                <GradientText variant="cyan">coming</GradientText>.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-relaxed">
                Accumulate is actively developed and growing. Explore what
                we&apos;ve shipped, what&apos;s in progress, and what&apos;s
                planned next.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== ROADMAP KANBAN ===== */}
      <div className="relative">
        <GlowOrb color="cyan" size="md" className="top-0 right-1/4 -translate-y-1/2" />
        <GlowOrb color="blue" size="lg" className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
        <Section
          eyebrow="Roadmap"
          title={
            <>
              Development{" "}
              <GradientText variant="rainbow">status</GradientText>
            </>
          }
          subtitle="Milestones shipped, work in progress, and what's planned next — all in one view."
        >
          <RoadmapKanban
            shipped={[...ROADMAP_SHIPPED]}
            inProgress={[...ROADMAP_IN_PROGRESS]}
            planned={[...ROADMAP_PLANNED]}
          />
        </Section>
      </div>

      {/* ===== AIPs ===== */}
      <div className="relative">
        <GlowOrb color="purple" size="md" className="top-0 right-0 -translate-y-1/2" />
        <Section
          eyebrow="Governance"
          title={
            <>
              Accumulate{" "}
              <GradientText variant="blue">Improvement Proposals</GradientText>
            </>
          }
          subtitle="AIPs are the formal process for proposing changes to the Accumulate protocol. Anyone can author an AIP — proposals are reviewed, discussed, and accepted by the community."
        >
          <AIPLedger items={[...ROADMAP_AIPS]} />
          <div className="mt-6">
            <Link
              href="https://gitlab.com/accumulatenetwork/governance/aip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary-hover transition-colors font-semibold"
            >
              View all AIPs on GitLab &rarr;
            </Link>
          </div>
        </Section>
      </div>

      {/* ===== ECOSYSTEM GROWTH ===== */}
      <Section
        title={
          <>
            Ecosystem{" "}
            <GradientText variant="rainbow">growth</GradientText>
          </>
        }
        subtitle="Projects and platforms building on Accumulate."
      >
        <BentoGrid
          items={[
            {
              title: "OperateID",
              icon: <IdentificationCard size={24} weight="duotone" /> as ReactNode,
              description:
                "Decentralized identity management platform built on Accumulate — create and manage digital identities, assets, and documents across Web3.",
              href: "https://www.operateid.com/",
              featured: true,
            },
            {
              title: "Bank On Ledger",
              icon: <Bank size={24} weight="duotone" /> as ReactNode,
              description:
                "Blockchain-based platform for creating and managing decentralized digital identities and financial data stores.",
              href: "https://www.bankonledger.com/website/index.html",
            },
            {
              title: "Qoboto",
              icon: <Globe size={24} weight="duotone" /> as ReactNode,
              description:
                "Decentralized website and link-in-bio builder — connect your audience to content, stores, and socials with data stored on-chain.",
              href: "https://www.qoboto.com/website/index.html",
            },
            {
              title: "Data Proof Labs",
              icon: <SealCheck size={24} weight="duotone" /> as ReactNode,
              description:
                "Create immutable, verifiable records on multiple blockchains with advanced Merkle tree optimization and significant cost savings.",
              href: "https://www.dataprooflabs.com/website/index.html",
              featured: true,
            },
            {
              title: "Ledger Documents",
              icon: <FileText size={24} weight="duotone" /> as ReactNode,
              description:
                "Create, store, and verify important documents on a distributed ledger with multi-signature approval and permanent on-chain records.",
              href: "https://www.ledgerdocuments.com/website/index.html",
            },
            {
              title: "Metial",
              icon: <Table size={24} weight="duotone" /> as ReactNode,
              description:
                "Blockchain-based form builder — design, publish, and share forms with on-chain data storage and optional IPFS integration.",
              href: "https://www.metial.com/website/index.html",
            },
            {
              title: "MicroPay Technologies",
              icon: <CreditCard size={24} weight="duotone" /> as ReactNode,
              description:
                "Payment processing, identity verification, fraud prevention, and payroll management solutions for businesses.",
              href: "https://micropaytechnologies.com",
            },
            {
              title: "Accumulated Finance",
              icon: <Coins size={24} weight="duotone" /> as ReactNode,
              description:
                "Omnichain liquid staking platform built on the Accumulate network.",
              href: "https://accumulated.finance/",
            },
            {
              title: "LV8R Labs",
              icon: <Rocket size={24} weight="duotone" /> as ReactNode,
              description:
                "Digital transformation lab building next-generation solutions on blockchain infrastructure.",
              href: "https://lv8rlabs.com/",
            },
          ]}
        />
        <div className="mt-8">
          <Button variant="secondary" size="sm" href="/ecosystem">
            View all ecosystem partners
          </Button>
        </div>
      </Section>

      {/* ===== CTA BAND ===== */}
      <Section>
        <CTABand
          title="Help shape what's next"
          body="Join the community, contribute to development, or start building with Studio."
          primaryCTA={{ label: "Join Discord", href: "https://discord.gg/accumulate" }}
          secondaryCTA={{ label: "Read the Docs", href: "/docs" }}
          tertiaryCTA={{ label: "Open Studio", href: "https://accumulate-studio.vercel.app/" }}
        />
      </Section>
    </>
  );
}
