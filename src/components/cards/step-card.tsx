import React from "react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  number: 1 | 2 | 3;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function StepCard({ number, title, description, icon }: StepCardProps) {
  return (
    <div className="relative bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] p-6 group/step transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.12)]">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/step:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="relative w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center transition-all duration-300 group-hover/step:bg-primary/20 group-hover/step:shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            {number}
            {/* Ring pulse on hover */}
            <span className="absolute inset-0 rounded-xl border border-primary/20 opacity-0 group-hover/step:opacity-100 group-hover/step:animate-ping transition-opacity" style={{ animationDuration: "2s" }} />
          </span>
          {icon && (
            <span className="inline-flex text-text-muted [&_svg]:size-6">
              {icon}
            </span>
          )}
        </div>
        <h3 className="font-heading text-[1.125rem] font-semibold mt-4 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-text-muted mt-2 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
