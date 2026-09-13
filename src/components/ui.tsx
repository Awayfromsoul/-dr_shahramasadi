import type { ReactNode } from "react";
import { ArrowUpLeft } from "lucide-react";
import { cn } from "../utils/cn";

/**
 * Fluid container: viewport-driven padding via clamp() and a readable
 * max-width for ultra-wide screens. Not one-size-fits-all — editorial
 * full-width moments can break outside it intentionally.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[84rem] px-[clamp(1.25rem,4vw,3rem)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  index,
  enTitle,
  title,
  lead,
  align = "start",
  className,
}: {
  index?: string;
  enTitle?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        {index && (
          <span className="font-serif text-sm tracking-[0.25em] text-[#D4AF37]">
            {index}
          </span>
        )}
        {index && enTitle && (
          <span className="h-px w-6 bg-[#D4AF37]/40" aria-hidden />
        )}
        {enTitle && (
          <span className="font-serif text-[11px] font-medium tracking-[0.28em] text-[#D4AF37] uppercase">
            {enTitle}
          </span>
        )}
      </div>

      <h2 className="text-[clamp(1.6rem,1.15rem+2vw,2.9rem)] leading-[1.3] font-semibold tracking-tight text-[#F5F2EA]">
        {title}
      </h2>

      {lead && (
        <p
          className={cn(
            "max-w-2xl text-sm leading-relaxed text-[#A7A39A] sm:text-base",
            align === "center" && "mx-auto"
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <ArrowUpLeft
      className={cn(
        "h-4 w-4 transition-transform duration-300 group-hover:rotate-45",
        className
      )}
    />
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-px w-full bg-gradient-to-l from-transparent via-[#D4AF37]/35 to-transparent",
        className
      )}
      aria-hidden
    />
  );
}
