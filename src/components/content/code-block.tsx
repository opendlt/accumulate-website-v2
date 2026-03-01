"use client";

import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }, [code]);

  return (
    <div
      className={cn(
        "group/code-block relative bg-[#0A0D14] border border-border rounded-[14px] p-4",
        className
      )}
    >
      {language && (
        <span className="absolute top-3 right-14 text-xs text-text-muted select-none">
          {language}
        </span>
      )}

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "absolute top-3 right-3 px-2 py-1 text-xs rounded-md",
          "bg-surface border border-border text-text-muted",
          "opacity-0 group-hover/code-block:opacity-100 transition-opacity duration-150",
          "hover:text-text cursor-pointer"
        )}
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      <pre className="overflow-x-auto text-sm leading-relaxed text-text-muted">
        <code>{code}</code>
      </pre>
    </div>
  );
}