"use client";

import { useState, useRef, useEffect } from "react";
import { GLOSSARY } from "@/content/glossary";
import { cn } from "@/lib/utils";

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
}

export function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [show, setShow] = useState(false);
  const [above, setAbove] = useState(true);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const definition = GLOSSARY[term.toLowerCase()];

  useEffect(() => {
    if (show && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setAbove(rect.top > 200);
    }
  }, [show]);

  if (!definition) {
    return <>{children}</>;
  }

  return (
    <span
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <span
        className="border-b border-dashed border-text-subtle cursor-help"
        tabIndex={0}
        role="button"
        aria-describedby={`glossary-${term}`}
      >
        {children}
      </span>
      <span
        id={`glossary-${term}`}
        role="tooltip"
        className={cn(
          "absolute left-1/2 -translate-x-1/2 z-50 w-64 p-3 text-sm text-text-muted bg-surface border border-border rounded-[14px] shadow-lg transition-all duration-200 pointer-events-none",
          show ? "opacity-100 scale-100" : "opacity-0 scale-95",
          above ? "bottom-full mb-2" : "top-full mt-2"
        )}
      >
        <span className="font-semibold text-text block mb-1 capitalize">{term}</span>
        {definition}
      </span>
    </span>
  );
}
