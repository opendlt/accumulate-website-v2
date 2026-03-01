import React from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
}

const headingSizes = {
  h1: "text-4xl md:text-[3.5rem] md:leading-[4rem] font-bold tracking-tight",
  h2: "text-3xl md:text-[2.5rem] md:leading-[3rem] font-bold tracking-tight",
  h3: "text-lg font-semibold",
  h4: "text-base font-semibold",
};

export function Heading({ as: Tag = "h2", children, className }: HeadingProps) {
  return (
    <Tag className={cn("font-heading text-text", headingSizes[Tag], className)}>
      {children}
    </Tag>
  );
}
