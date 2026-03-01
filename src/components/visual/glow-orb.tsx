import { cn } from "@/lib/utils";

interface GlowOrbProps {
  color?: "blue" | "cyan" | "purple";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const colors = {
  blue: "bg-[#3B82F6]",
  cyan: "bg-[#00A6FB]",
  purple: "bg-[#8B5CF6]",
};

const sizes = {
  sm: "w-[200px] h-[200px]",
  md: "w-[400px] h-[400px]",
  lg: "w-[600px] h-[600px]",
  xl: "w-[800px] h-[800px]",
};

export function GlowOrb({ color = "blue", size = "md", className }: GlowOrbProps) {
  return (
    <div
      className={cn(
        "absolute rounded-full opacity-[0.07] blur-[120px] pointer-events-none",
        colors[color],
        sizes[size],
        className
      )}
      aria-hidden="true"
    />
  );
}
