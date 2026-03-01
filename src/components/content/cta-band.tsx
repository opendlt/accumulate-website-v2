import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/buttons/button";
import { Heading } from "@/components/typography/heading";

interface CTABandProps {
  title: string;
  body: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  tertiaryCTA?: { label: string; href: string };
  className?: string;
}

export function CTABand({
  title,
  body,
  primaryCTA,
  secondaryCTA,
  tertiaryCTA,
  className,
}: CTABandProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[14px] p-6 md:p-8",
        "bg-gradient-to-br from-surface via-surface to-[#0d1525]",
        "border border-overlay/[0.08]",
        "flex flex-col md:flex-row md:items-center md:justify-between gap-6",
        className
      )}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[300px] rounded-full bg-primary/[0.06] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />

      <div className="relative max-w-xl">
        <Heading as="h3">{title}</Heading>
        <p className="text-text-muted mt-2">{body}</p>
      </div>

      <div className="relative flex flex-wrap items-center gap-3 shrink-0">
        <Button href={primaryCTA.href}>{primaryCTA.label}</Button>
        {secondaryCTA && (
          <Button href={secondaryCTA.href} variant="secondary">
            {secondaryCTA.label}
          </Button>
        )}
        {tertiaryCTA && (
          <Button href={tertiaryCTA.href} variant="secondary">
            {tertiaryCTA.label}
          </Button>
        )}
      </div>
    </div>
  );
}
