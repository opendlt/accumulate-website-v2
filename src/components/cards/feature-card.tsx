import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

const cardBase =
  "relative bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] p-6 transition-all duration-300 group/card";

const cardHover =
  "hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] hover:-translate-y-1";

export function FeatureCard({
  icon,
  title,
  description,
  href,
  className,
}: FeatureCardProps) {
  const content = (
    <>
      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-primary/10 via-transparent to-[#00A6FB]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        {icon && (
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-4 [&_svg]:size-5 transition-colors duration-300 group-hover/card:bg-primary/20">
            {icon}
          </span>
        )}
        <h3 className="font-heading text-[1.125rem] font-semibold leading-snug">{title}</h3>
        <p className="text-sm text-text-muted mt-2 leading-relaxed">{description}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(cardBase, cardHover, "block", className)}>
        {content}
      </Link>
    );
  }

  return <div className={cn(cardBase, cardHover, className)}>{content}</div>;
}
