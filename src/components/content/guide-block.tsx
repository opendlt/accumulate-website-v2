import React from "react";
import { cn } from "@/lib/utils";

interface GuideBlockProps {
  variant: "empathy" | "authority";
  title: string;
  body: string;
  className?: string;
}

export function GuideBlock({
  variant,
  title,
  body,
  className,
}: GuideBlockProps) {
  return (
    <div
      className={cn(
        "border-l-2 pl-6",
        variant === "empathy" ? "border-text-subtle" : "border-primary",
        className
      )}
    >
      <h3 className="font-heading text-[1.25rem] font-semibold">{title}</h3>
      <p className="text-text-muted mt-2">{body}</p>
    </div>
  );
}
