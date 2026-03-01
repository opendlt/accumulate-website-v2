import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "cyan" | "rainbow";
}

const gradients = {
  blue: "from-[#3B82F6] via-[#60A5FA] to-[#93C5FD]",
  cyan: "from-[#00A6FB] via-[#3B82F6] to-[#8B5CF6]",
  rainbow: "from-[#3B82F6] via-[#00A6FB] to-[#22C55E]",
};

export function GradientText({
  children,
  className,
  variant = "blue",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
