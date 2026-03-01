import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { FOOTER_LINKS, EXTERNAL_LINKS } from "@/lib/constants";

export function Footer() {
  const sections = [
    { title: "Product", links: FOOTER_LINKS.product },
    { title: "Developers", links: FOOTER_LINKS.developers },
    { title: "Company", links: FOOTER_LINKS.company },
    { title: "Legal", links: FOOTER_LINKS.legal },
  ];

  return (
    <footer className="relative border-t border-overlay/[0.06] bg-surface/50">
      {/* Gradient top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-primary/[0.03] blur-[120px]" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-text-muted leading-relaxed max-w-[240px]">
              Delegated authority you can prove — across organizations.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link
                href={EXTERNAL_LINKS.gitlab}
                className="text-text-muted hover:text-text transition-colors p-1.5 rounded-lg hover:bg-overlay/[0.04]"
                aria-label="GitLab"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 00-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 00-.867 0L1.386 9.452.044 13.587a.924.924 0 00.331 1.023L12 23.054l11.625-8.443a.92.92 0 00.33-1.024" />
                </svg>
              </Link>
              <Link
                href={EXTERNAL_LINKS.discord}
                className="text-text-muted hover:text-text transition-colors p-1.5 rounded-lg hover:bg-overlay/[0.04]"
                aria-label="Discord"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-overlay/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-subtle">
            &copy; {new Date().getFullYear()} Accumulate Network. All rights reserved.
          </p>
          <p className="text-xs text-text-subtle">
            Built for governance-first systems.
          </p>
        </div>
      </div>
    </footer>
  );
}
