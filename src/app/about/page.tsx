import { Section } from "@/components/layout/section";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger-children";
import { GlowOrb } from "@/components/visual/glow-orb";
import { GradientText } from "@/components/visual/gradient-text";

export const metadata = createMetadata({
  title: "About Accumulate",
  description:
    "Accumulate is a governance-first blockchain protocol for real-world identity and multi-party approval. Learn about our mission, model, and team.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section className="pt-16 md:pt-24">
        <ScrollReveal direction="up">
          <div className="max-w-[760px]">
            <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
              <GradientText variant="cyan">Governance</GradientText> over hype.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              Accumulate exists because high-consequence operations shouldn&rsquo;t
              depend on a single admin system&rsquo;s truth.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* ===== WHAT WE BELIEVE ===== */}
      <div className="relative">
        <GlowOrb color="cyan" size="lg" className="top-0 -left-32" />
        <GlowOrb color="purple" size="md" className="bottom-0 -right-24" />
        <Section title="What we believe">
          <StaggerChildren>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  heading: "Identity is infrastructure",
                  body: "Real organizations aren't wallets. They're hierarchies of people, teams, vendors, and systems—with authority that changes constantly.",
                },
                {
                  heading: "Governance must be native",
                  body: "If authority, delegation, and audit trails are bolted on after the fact, they break under real-world pressure.",
                },
                {
                  heading: "Honesty about scope",
                  body: "Not everything needs a blockchain. When trust boundaries exist, when no single admin can be the truth, when authority must be independently verifiable—that's when Accumulate is the right tool.",
                },
              ].map((belief) => (
                <StaggerItem key={belief.heading}>
                  <div
                    className="bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] p-6"
                  >
                    <h3 className="font-heading text-[1.25rem] font-semibold text-text mb-2">
                      {belief.heading}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {belief.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </Section>
      </div>

      {/* ===== WHAT ACCUMULATE IS ===== */}
      <Section title="What Accumulate is">
        <ScrollReveal direction="up">
          <div className="max-w-[760px]">
            <p className="text-lg text-text-muted leading-relaxed">
              A blockchain protocol where identity and hierarchical authorization
              are first-class primitives. This means
              governance&mdash;delegation, thresholds, revocation, recovery, and
              audit&mdash;is native, not recreated in application logic.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* ===== ORIGIN ===== */}
      <Section title={<>Where it <GradientText variant="blue">started</GradientText></>}>
        <ScrollReveal direction="up">
          <div className="max-w-[760px] space-y-4 text-text-muted leading-relaxed">
            <p>
              Accumulate grew out of the Factom protocol, a data-publishing layer
              founded in 2014 by Paul Snow. When Inveniam Capital Partners
              acquired Factom in 2021, lead engineers Paul Snow and Jay Smith
              carried the best ideas forward&mdash;data integrity, identity-first
              design, and practical governance&mdash;into a ground-up rewrite
              that became Accumulate.
            </p>
            <p>
              Paul Snow, Chief Blockchain Scientist at Inveniam and DeFi Devs,
              designed the Accumulate protocol. He previously served as CEO and
              chief architect of Factom and co-authored the Factom White Paper,
              developing and implementing a &ldquo;multi-leader&rdquo; consensus
              algorithm. Inveniam created the DeFi Devs subsidiary to serve as
              lead community developers for the Accumulate ecosystem.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* ===== WHAT IT ISN'T ===== */}
      <Section title="What Accumulate isn't">
        <ScrollReveal direction="up">
          <ul className="space-y-4 max-w-[760px]">
            {[
              "Not a general-purpose smart contract platform",
              "Not trying to replace internal IAM or access management",
              "Not a cryptocurrency project dressed up as enterprise infrastructure",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-lg text-text-muted"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted mt-2.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Section>

      {/* ===== COMMUNITY & RESOURCES ===== */}
      <Section title="Community & resources">
        <StaggerChildren>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[760px]">
            {[
              {
                label: "GitLab",
                href: "https://gitlab.com/accumulatenetwork",
              },
              {
                label: "Discord",
                href: "https://discord.gg/accumulate",
              },
              {
                label: "Documentation",
                href: "/docs",
              },
              {
                label: "Whitepaper",
                href: "https://accumulatenetwork.io/whitepaper/",
              },
              {
                label: "Ecosystem",
                href: "/ecosystem",
              },
            ].map((link) => (
              <StaggerItem key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] hover:border-overlay/[0.12] transition-all duration-300 rounded-[14px] px-5 py-4 hover:-translate-y-px"
                >
                  <span className="font-heading font-semibold text-text">
                    {link.label}
                  </span>
                  <span className="text-text-muted ml-auto">&rarr;</span>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>
      </Section>
    </>
  );
}
