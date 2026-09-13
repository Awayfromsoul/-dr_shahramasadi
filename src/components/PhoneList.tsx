import { Phone, Smartphone } from "lucide-react";
import { PHONES } from "../data/content";
import { cn } from "../utils/cn";

interface PhoneListProps {
  /** "stack" = vertical list (contact/footer) · "row" = inline chips */
  variant?: "stack" | "row";
  size?: "sm" | "md" | "lg";
  className?: string;
  showLabels?: boolean;
}

/**
 * The three official clinic numbers — each an independent tel: link with a
 * comfortable touch target. Visible formatting keeps the hyphens.
 */
export function PhoneList({
  variant = "stack",
  size = "md",
  className,
  showLabels = true,
}: PhoneListProps) {
  const numberCls = {
    sm: "text-sm",
    md: "text-base sm:text-lg",
    lg: "text-xl sm:text-2xl",
  }[size];

  return (
    <ul
      className={cn(
        variant === "stack" ? "flex flex-col gap-2.5" : "flex flex-wrap gap-2.5",
        className
      )}
    >
      {PHONES.map((p) => (
        <li key={p.tel} className={variant === "row" ? "min-w-0" : undefined}>
          <a
            href={p.tel}
            aria-label={`تماس با ${p.label}: ${p.display}`}
            className={cn(
              "group flex min-h-[44px] items-center justify-between gap-4 border border-white/10 bg-[#070707] px-4 py-2.5 transition-colors duration-300 hover:border-[#D4AF37]/60 hover:bg-[#111111]",
              variant === "row" && "justify-start"
            )}
          >
            <span className="flex items-center gap-3">
              <span className="flex h-8 w-8 flex-none items-center justify-center border border-[#D4AF37]/35 text-[#D4AF37]">
                {p.kind === "mobile" ? (
                  <Smartphone className="h-3.5 w-3.5" />
                ) : (
                  <Phone className="h-3.5 w-3.5" />
                )}
              </span>
              {showLabels && (
                <span className="text-[11px] text-[#A7A39A]">{p.label}</span>
              )}
            </span>
            <span
              dir="ltr"
              className={cn(
                "font-serif font-medium tracking-wider text-[#D4AF37] transition-colors group-hover:text-[#E6C766]",
                numberCls
              )}
            >
              {p.display}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
