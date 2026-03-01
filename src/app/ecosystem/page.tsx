import { Section } from "@/components/layout/section";
import { Button } from "@/components/buttons/button";
import { CTABand } from "@/components/content/cta-band";
import { createMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GlowOrb } from "@/components/visual/glow-orb";
import { GradientText } from "@/components/visual/gradient-text";
import { EcosystemNetworkDiagram } from "@/components/visual/landing-diagrams";
import { IntegrationPipeline } from "@/components/visual/integration-pipeline";
import { PartnerNetwork } from "@/components/interactive/partner-network";
import { TerminalLinks } from "@/components/interactive/terminal-links";
import { WalletShowcase } from "@/components/interactive/wallet-showcase";
import { COMMUNITY_PARTNERS, COMMUNITY_LINKS, EXTERNAL_LINKS } from "@/lib/constants";
import {
  DiscordLogo,
  TelegramLogo,
  LinkedinLogo,
  MediumLogo,
  InstagramLogo,
  Code,
  GitBranch,
  HardDrives,
  Wrench,
  Wallet,
  CloudArrowUp,
  CreditCard,
  Cube,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";

const COMMUNITY_ICONS: Record<string, ReactNode> = {
  Discord: <DiscordLogo size={20} weight="fill" />,
  Telegram: <TelegramLogo size={20} weight="fill" />,
  LinkedIn: <LinkedinLogo size={20} weight="fill" />,
  Medium: <MediumLogo size={20} weight="fill" />,
  Instagram: <InstagramLogo size={20} weight="fill" />,
};

const PARTNER_ICONS: Record<string, ReactNode> = {
  "DeFi Devs": <Code size={24} weight="duotone" />,
  "De Facto": <GitBranch size={24} weight="duotone" />,
  "Inveniam": <HardDrives size={24} weight="duotone" />,
  "OpenDLT": <Wrench size={24} weight="duotone" />,
  "Kompendium": <Wallet size={24} weight="duotone" />,
  "OperateCrypto": <CloudArrowUp size={24} weight="duotone" />,
  "MicroPay Technologies": <CreditCard size={24} weight="duotone" />,
  "Cybitron": <Cube size={24} weight="duotone" />,
};

export const metadata = createMetadata({
  title: "Ecosystem",
  description:
    "The Accumulate ecosystem: community development partners, integrations, and community channels. Join the network building governance-first infrastructure.",
  path: "/ecosystem",
});

export default function EcosystemPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <EcosystemNetworkDiagram />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
                <GradientText variant="cyan">Ecosystem</GradientText> &
                community.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-relaxed">
                Accumulate is a fully decentralized protocol developed by various
                organizations. Explore the partners building governance-first
                infrastructure and join the community.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* ===== COMMUNITY DEVELOPMENT PARTNERS ===== */}
      <div className="relative">
        <GlowOrb color="blue" size="lg" className="top-0 left-1/4 -translate-y-1/2" />
        <GlowOrb color="cyan" size="md" className="bottom-0 right-1/4 translate-y-1/2" />
        <Section
          title={
            <>
              Community{" "}
              <GradientText variant="blue">development partners</GradientText>
            </>
          }
        >
          <PartnerNetwork
            partners={[...COMMUNITY_PARTNERS]}
            icons={PARTNER_ICONS}
          />
        </Section>
      </div>

      {/* ===== KEY INTEGRATIONS ===== */}
      <Section title="Key integrations">
        <IntegrationPipeline
          stations={[
            {
              title: "Accumulate Bridge",
              description:
                "Decentralized bridge enabling token transfers between Accumulate and multiple EVM chains including Ethereum, Base, Arbitrum, and BSC. Built and maintained by De Facto.",
            },
            {
              title: "Certen",
              description:
                "Cross-chain governance and institutional control layer for enterprise and consortia use cases, built on Accumulate.",
            },
            {
              title: "Cross-Chain Anchoring",
              description:
                "Cryptographic anchors written into Bitcoin and Ethereum for independent verification and cross-chain security proofs.",
            },
          ]}
        />
      </Section>

      {/* ===== DEVELOPER RESOURCES ===== */}
      <Section title="Developer resources">
        <TerminalLinks
          items={[
            {
              command: "gitlab",
              comment: "Source code, SDKs, and protocol implementation",
              href: EXTERNAL_LINKS.gitlab,
            },
            {
              command: "docs",
              comment: "Tutorials, API reference, and integration guides",
              href: EXTERNAL_LINKS.docs,
            },
            {
              command: "legacy-docs",
              comment: "Original protocol docs, CLI tutorials, staking guides",
              href: "https://docs.accumulatenetwork.io/accumulate/",
            },
            {
              command: "explorer",
              comment: "Browse transactions, accounts, and identity records",
              href: EXTERNAL_LINKS.explorer,
            },
            {
              command: "studio",
              comment: "Accumulate Studio — build with all five SDKs instantly",
              href: "https://accumulate-studio.vercel.app/",
            },
          ]}
        />
      </Section>

      {/* ===== WALLETS & TOOLS ===== */}
      <Section title="Wallets & tools">
        <WalletShowcase
          tabs={[
            {
              name: "Accumulate Wallet",
              description:
                "Official community mobile wallet with ADI and token account support.",
              type: "phone",
              links: [
                {
                  label: "App Store",
                  href: "https://apps.apple.com/us/app/accumulate-wallet/id1592574608",
                },
                {
                  label: "Google Play",
                  href: "https://play.google.com/store/apps/details?id=io.defidevs.accumulatewallet",
                },
              ],
            },
            {
              name: "Accu2",
              description:
                "Community-built mobile wallet by Kompendium.",
              type: "phone",
              links: [
                {
                  label: "App Store",
                  href: "https://apps.apple.com/us/app/accu2/id6479600650",
                },
                {
                  label: "Google Play",
                  href: "https://play.google.com/store/apps/details?id=co.kompendium.accu2",
                },
              ],
            },
            {
              name: "OperateCrypto Wallet",
              description:
                "Browser extension wallet by OperateCrypto for managing Accumulate identities and token accounts directly from Chrome.",
              type: "browser",
              links: [
                {
                  label: "Chrome Web Store",
                  href: "https://chromewebstore.google.com/detail/accumulate-wallet/pmdjifngcmnnafdfmfnnkdpkpjdkficg",
                },
              ],
            },
            {
              name: "Accumulate Studio",
              description:
                "Developer studio by OpenDLT to aid development and onboarding to Accumulate with full support for Dart, Rust, C#, Python, and JavaScript SDKs.",
              type: "browser",
              links: [
                {
                  label: "Open Studio",
                  href: "https://accumulate-studio.vercel.app/",
                },
              ],
            },
          ]}
        />
      </Section>

      {/* ===== COMMUNITY ===== */}
      <div className="relative">
        <GlowOrb color="purple" size="md" className="top-0 right-0 -translate-y-1/2" />
        <Section
          title={
            <>
              Join the{" "}
              <GradientText variant="rainbow">community</GradientText>
            </>
          }
        >
          <ScrollReveal direction="up">
            <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-[760px]">
              Accumulate invites you to join its community and participate in the
              next generation of governance-first blockchain infrastructure.
            </p>
          </ScrollReveal>
          <StaggerChildren>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {COMMUNITY_LINKS.map((link) => (
                <StaggerItem key={link.label}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] px-5 py-4 hover:-translate-y-px group"
                  >
                    <span className="text-text-muted group-hover:text-primary transition-colors shrink-0">
                      {COMMUNITY_ICONS[link.label]}
                    </span>
                    <span className="font-heading font-semibold text-text group-hover:text-primary transition-colors">
                      {link.label}
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </Section>
      </div>

      {/* ===== WHITEPAPER ===== */}
      <Section>
        <ScrollReveal direction="up">
          <div className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6 md:p-8 max-w-[760px]">
            <h2 className="font-heading text-xl font-semibold text-text mb-3">
              Whitepaper
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Read the full Accumulate protocol whitepaper for a deep technical
              overview of identity namespaces, hierarchical authorization,
              credit-based pricing, and the multi-partition architecture.
            </p>
            <Button
              variant="secondary"
              size="sm"
              href={EXTERNAL_LINKS.whitepaper}
            >
              Read the Whitepaper
            </Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* ===== CTA BAND ===== */}
      <Section>
        <CTABand
          title="Want to build on Accumulate?"
          body="Start with a 30-day pilot, dive into the docs, or jump straight into building with Studio."
          primaryCTA={{ label: "Start a Pilot", href: "/pilot" }}
          secondaryCTA={{ label: "Read the Docs", href: "/docs" }}
          tertiaryCTA={{ label: "Open Studio", href: "https://accumulate-studio.vercel.app/" }}
        />
      </Section>
    </>
  );
}
