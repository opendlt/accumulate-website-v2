import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "full" | "icon";
  className?: string;
}

export function Logo({ variant = "full", className }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo-icon.png"
        alt=""
        width={28}
        height={28}
        className="shrink-0"
      />
      {variant === "full" && (
        <Image
          src="/logo-wordmark.png"
          alt="Accumulate"
          width={120}
          height={18}
          className="h-[18px] w-auto"
          style={{ filter: "brightness(0) invert(var(--logo-invert))" }}
        />
      )}
    </Link>
  );
}
