import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  id?: string;
  withGlow?: boolean;
}

export function Section({
  children,
  eyebrow,
  title,
  subtitle,
  className,
  id,
  withGlow = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative w-full max-w-[1200px] mx-auto px-6 py-16 md:py-24", className)}
    >
      {withGlow && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>
      )}
      <div className="relative">
        {(eyebrow || title || subtitle) && (
          <div className="mb-10">
            {eyebrow && (
              <span className="inline-flex items-center rounded-[999px] h-7 px-3 text-[0.8125rem] font-semibold text-primary bg-primary/10 border border-primary/20 mb-4">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-heading text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight text-text">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-text-muted leading-relaxed max-w-[760px]">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
