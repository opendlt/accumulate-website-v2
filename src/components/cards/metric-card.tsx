import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  value: string;
  label: string;
  description?: string;
  className?: string;
}

export function MetricCard({
  value,
  label,
  description,
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "relative bg-surface/60 backdrop-blur-sm border border-overlay/[0.06] rounded-[14px] p-6 group/metric transition-all duration-300",
        "hover:border-primary/30 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.12)]",
        className
      )}
    >
      {/* Accent glow line at top */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <p className="text-[2rem] font-heading font-bold leading-tight bg-gradient-to-br from-text via-text to-primary/60 bg-clip-text text-transparent">
          {value}
        </p>
        <p className="text-sm font-medium text-text-muted mt-1">{label}</p>
        {description && (
          <p className="text-sm text-text-subtle mt-2 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
