import { Section } from "@/components/layout/section";
import { createMetadata } from "@/lib/metadata";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export const metadata = createMetadata({
  title: "Terms and Conditions",
  description:
    "Terms and conditions for the Accumulate Network website and services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <ScrollReveal direction="up">
          <div className="max-w-[760px]">
            <h1 className="font-heading text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight text-text">
              Terms and Conditions
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
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using the Accumulate Network website
                (accumulatenetwork.io) and any related services, you agree to be
                bound by these Terms and Conditions. If you do not agree to these
                terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                2. Description of Service
              </h2>
              <p>
                Accumulate is an identity-based blockchain protocol. The website
                provides information about the protocol, documentation, developer
                resources, and related services. The protocol itself is
                open-source software provided as-is.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                3. Use of the Protocol
              </h2>
              <p>
                Use of the Accumulate protocol is subject to the terms of its
                open-source license. You are responsible for understanding and
                complying with all applicable laws and regulations when using the
                protocol or any related tools.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                4. Intellectual Property
              </h2>
              <p>
                The Accumulate name, logo, and branding are the property of
                their respective owners. The protocol source code is available
                under its respective open-source license. Content on this website,
                including text, graphics, and documentation, is protected by
                applicable intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                5. Disclaimer of Warranties
              </h2>
              <p>
                The website and protocol are provided &ldquo;as is&rdquo; and
                &ldquo;as available&rdquo; without warranties of any kind, either
                express or implied. We do not warrant that the service will be
                uninterrupted, timely, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                In no event shall Accumulate Network, its contributors, or its
                community development partners be liable for any indirect,
                incidental, special, consequential, or punitive damages arising
                out of or relating to your use of the website or protocol.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                7. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting to the website. Your
                continued use of the website after any changes constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-text mb-3">
                8. Contact
              </h2>
              <p>
                If you have questions about these Terms and Conditions, please
                contact us at{" "}
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
