import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "neutral" | "accent" | "success" | "warning" | "danger";
  className?: string;
}

const variantStyles = {
  neutral:
    "text-text-muted border-border",
  accent:
    "text-primary bg-primary-soft border-primary/20",
  success:
    "text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30",
  warning:
    "text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30",
  danger:
    "text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[999px] h-7 px-2.5 text-[0.8125rem] font-semibold border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
