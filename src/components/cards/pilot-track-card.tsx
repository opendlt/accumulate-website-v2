"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PilotTrackCardProps {
  id: string;
  title: string;
  outcome: string;
  exampleWorkflow: string;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function PilotTrackCard({
  id,
  title,
  outcome,
  exampleWorkflow,
  selected,
  onSelect,
}: PilotTrackCardProps) {
  return (
    <motion.div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(id);
        }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative bg-surface/60 backdrop-blur-sm border rounded-[14px] p-6 cursor-pointer transition-all duration-300",
        selected
          ? "border-primary/50 shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]"
          : "border-overlay/[0.06] hover:border-overlay/[0.12]"
      )}
    >
      {/* Selected indicator glow */}
      {selected && (
        <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
      )}

      {/* Radio indicator */}
      <div className="absolute top-5 right-5">
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
            selected
              ? "border-primary bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              : "border-white/20"
          )}
        >
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-white"
            />
          )}
        </div>
      </div>

      <div className="relative pr-8">
        <h3 className="font-heading text-[1.125rem] font-semibold">{title}</h3>

        <div className="mt-4">
          <h4 className="text-xs font-semibold text-text-subtle uppercase tracking-wider">
            Outcome
          </h4>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">{outcome}</p>
        </div>

        <div className="mt-3">
          <h4 className="text-xs font-semibold text-text-subtle uppercase tracking-wider">
            Example Workflow
          </h4>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">{exampleWorkflow}</p>
        </div>
      </div>
    </motion.div>
  );
}
