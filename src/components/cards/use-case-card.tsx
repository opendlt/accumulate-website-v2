import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/interactive/badge";

interface UseCaseCardProps {
  title: string;
  whoItsFor: string[];
  pains: string[];
  outcomes: string[];
  href: string;
}

export function UseCaseCard({
  title,
  whoItsFor,
  pains,
  outcomes,
  href,
}: UseCaseCardProps) {
  return (
    <div className="relative bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] p-6 flex flex-col group/uc transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/uc:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <h3 className="font-heading text-[1.25rem] font-semibold">{title}</h3>

        {/* Who it's for */}
        <div className="mt-4 flex flex-wrap gap-2">
          {whoItsFor.map((who) => (
            <Badge key={who}>{who}</Badge>
          ))}
        </div>

        {/* Pains */}
        <div className="mt-5">
          <h4 className="text-xs font-semibold text-text-subtle uppercase tracking-wider">
            Pains
          </h4>
          <ul className="mt-2 space-y-1.5">
            {pains.map((pain) => (
              <li
                key={pain}
                className="text-sm text-text-muted flex items-start gap-2"
              >
                <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-danger/70 shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
                {pain}
              </li>
            ))}
          </ul>
        </div>

        {/* Outcomes */}
        <div className="mt-5">
          <h4 className="text-xs font-semibold text-text-subtle uppercase tracking-wider">
            Outcomes
          </h4>
          <ul className="mt-2 space-y-1.5">
            {outcomes.map((outcome) => (
              <li
                key={outcome}
                className="text-sm text-text-muted flex items-start gap-2"
              >
                <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_6px_rgba(59,130,246,0.4)]" />
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer link */}
        <div className="mt-auto pt-6">
          <Link
            href={href}
            className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1"
          >
            See the pilot plan
            <span className="transition-transform group-hover/uc:translate-x-0.5">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
