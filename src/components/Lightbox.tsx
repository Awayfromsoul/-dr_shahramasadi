import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "../utils/cn";

export interface LightboxSlide {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
}

interface LightboxProps {
  slides: LightboxSlide[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  label: string;
}

/**
 * Premium full-screen lightbox:
 * black backdrop, thin champagne-gold frame, zoom toggle (click / button),
 * keyboard (ESC, ←/→), touch swipe, body scroll lock. Images are never distorted.
 */
export function Lightbox({ slides, index, onClose, onIndex, label }: LightboxProps) {
  const count = slides.length;
  const slide = slides[index];
  const [zoomed, setZoomed] = useState(false);
  const touchX = useRef<number | null>(null);

  const next = () => onIndex((index + 1) % count);
  const prev = () => onIndex((index - 1 + count) % count);

  useEffect(() => setZoomed(false), [index]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") next();
      else if (e.key === "ArrowRight") prev();
      else if (e.key === "+" || e.key === "=") setZoomed(true);
      else if (e.key === "-") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count, onClose]);

  if (!slide) return null;

  /* Portaled to <body> so `fixed` always resolves against the true viewport,
     regardless of transforms/filters on section ancestors. */
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button aria-label="بستن" onClick={onClose} className="absolute inset-0 bg-[#070707]/94 backdrop-blur-sm" />

      <div className="relative w-full max-w-4xl">
        {/* Top controls */}
        <div className="mb-3 flex items-center justify-between">
          <button
            onClick={onClose}
            aria-label="بستن"
            className="flex h-10 w-10 items-center justify-center border border-[#D4AF37]/40 bg-[#0D0D0D] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#070707]"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomed((z) => !z)}
              aria-label={zoomed ? "کوچک‌نمایی" : "بزرگ‌نمایی"}
              aria-pressed={zoomed}
              className="flex h-10 items-center gap-2 border border-white/15 bg-[#0D0D0D] px-3 text-xs text-[#A7A39A] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              {zoomed ? "نمای کامل" : "بزرگ‌نمایی"}
            </button>
            <span className="font-serif text-xs tracking-[0.2em] text-[#A7A39A]">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Frame */}
        <div className="relative border border-[#D4AF37]/45 bg-[#0D0D0D] p-2 sm:p-4">
          <div className="pointer-events-none absolute -top-px -right-px h-5 w-5 border-t-2 border-r-2 border-[#D4AF37]" aria-hidden />
          <div className="pointer-events-none absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-[#D4AF37]" aria-hidden />

          <div
            className={cn(
              "max-h-[66dvh] bg-[#070707]",
              zoomed ? "overflow-auto" : "overflow-hidden"
            )}
            onTouchStart={(e) => {
              touchX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (zoomed || touchX.current === null) return;
              const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
              if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
              touchX.current = null;
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              onClick={() => setZoomed((z) => !z)}
              className={cn(
                "mx-auto block select-none",
                zoomed
                  ? "w-[190%] max-w-none cursor-zoom-out sm:w-[160%]"
                  : "max-h-[66dvh] w-full cursor-zoom-in object-contain"
              )}
              draggable={false}
            />
          </div>

          <div className="mt-3 flex items-end justify-between gap-4 border-t border-[#D4AF37]/25 pt-3 text-right">
            <div>
              <p className="text-sm font-semibold text-[#F5F2EA]">{slide.title}</p>
              {slide.subtitle && (
                <p className="mt-1 font-serif text-[10px] tracking-[0.2em] text-[#D4AF37]">
                  {slide.subtitle}
                </p>
              )}
            </div>
            <span className="hidden text-[10px] text-[#A7A39A]/60 sm:block">
              برای بزرگ‌نمایی روی تصویر کلیک کنید
            </span>
          </div>
        </div>

        {count > 1 && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              aria-label="قبلی"
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#A7A39A] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="بعدی"
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#A7A39A] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
