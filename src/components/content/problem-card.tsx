import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/interactive/badge";

type ProblemType = "external" | "internal" | "philosophical";

interface ProblemCardProps {
  type: ProblemType;
  quote: string;
  className?: string;
}

const typeLabels: Record<ProblemType, string> = {
  external: "External",
  internal: "Internal",
  philosophical: "Philosophical",
};

export function ProblemCard({ type, quote, className }: ProblemCardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-[14px] p-6",
        className
      )}
    >
      <Badge>{typeLabels[type]}</Badge>
      <blockquote className="mt-4 text-lg italic text-text-muted">
        “{quote}”
      </blockquote>
    </div>
  );
}
