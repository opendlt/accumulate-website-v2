import { Section } from "@/components/layout/section";
import { createMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for the Accumulate Network website and services.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <ScrollReveal direction="up">
          <div className="max-w-[760px]">
            <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              Last updated: September 8, 2021
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <Section>
        <div className="max-w-[760px] prose-custom">
          <div className="space-y-8 text-text-muted leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                1. Introduction
              </h2>
              <p>
                Accumulate Network (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
                &ldquo;us&rdquo;) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, and safeguard
                information when you visit our website (accumulatenetwork.io) or
                use our services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-3">
                We may collect information you provide directly, such as:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Contact information (name, email, organization) submitted
                  through forms
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Pilot intake form submissions
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Communications sent to us via email
                </li>
              </ul>
              <p className="mt-3">
                We may also automatically collect technical information such as
                browser type, device information, IP address, and usage patterns
                through standard web server logs and analytics tools.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                3. How We Use Information
              </h2>
              <p className="mb-3">We use collected information to:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Respond to inquiries and pilot intake requests
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Improve our website and services
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Communicate updates about the protocol and ecosystem
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Comply with legal obligations
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                4. Data Sharing
              </h2>
              <p>
                We do not sell your personal information. We may share
                information with service providers who assist in operating our
                website, or when required by law. Any third-party service
                providers are obligated to protect your information.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                5. Blockchain Data
              </h2>
              <p>
                The Accumulate protocol is a public blockchain. Transactions and
                identity records on the protocol are publicly visible by design.
                This is a core feature of the protocol&rsquo;s verifiability
                model. Data written to the blockchain cannot be deleted or
                modified.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                6. Cookies and Tracking
              </h2>
              <p>
                Our website may use cookies and similar technologies to improve
                your browsing experience and analyze site usage. You can control
                cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                7. Data Security
              </h2>
              <p>
                We implement reasonable security measures to protect your
                information. However, no method of transmission over the internet
                or electronic storage is completely secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will
                be posted on this page with an updated revision date. Your
                continued use of the website after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                9. Contact
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us
                at{" "}
                <a
                  href="mailto:contact@accumulatenetwork.io"
                  className="text-primary hover:text-primary-hover transition-colors"
                >
                  contact@accumulatenetwork.io
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
