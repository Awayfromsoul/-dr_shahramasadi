import { useState } from "react";
import { MoveHorizontal, RotateCcw } from "lucide-react";

interface SliderProps {
  /** BEFORE side (left). For real cases this is 2.png. */
  beforeImage: string;
  /** AFTER side (right). For real cases this is 1.png. */
  afterImage: string;
  alt: string;
  /** Reserved ratio so nothing shifts while loading. */
  aspect?: string;
  /**
   * Legacy placeholder treatment only (desaturated "before"). Must stay `false`
   * for real patient imagery — an authentic clinical photo is never filtered,
   * recoloured or retouched.
   */
  enhanceBefore?: boolean;
}

/**
 * Interactive 50/50 Before / After comparison.
 * BEFORE = left · AFTER = right · 2px champagne-gold divider, circular handle.
 * Pointer capture + touch drag + full keyboard support. Uses `touch-pan-y` so
 * vertical page scrolling is never blocked by the comparison.
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt,
  aspect = "aspect-[4/5]",
  enhanceBefore = false,
}: SliderProps) {
  const [pos, setPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  const updateFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos(clamp(((e.clientX - rect.left) / rect.width) * 100));
  };

  return (
    <div
      className={`group relative ${aspect} w-full touch-pan-y overflow-hidden border border-[#D4AF37]/35 bg-[#0D0D0D] select-none focus:outline-none`}
      onPointerDown={(e) => {
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        updateFromPointer(e);
      }}
      onPointerMove={(e) => {
        if (isDragging) updateFromPointer(e);
      }}
      onPointerUp={(e) => {
        setIsDragging(false);
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }}
      onPointerCancel={() => setIsDragging(false)}
      role="slider"
      aria-label="مقایسه قبل و بعد درمان"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`${Math.round(pos)} درصد`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => clamp(p - 4));
        else if (e.key === "ArrowRight") setPos((p) => clamp(p + 4));
        else if (e.key === "Home") setPos(0);
        else if (e.key === "End") setPos(100);
      }}
    >
      {/* AFTER layer — base, always full width (1.png) */}
      <img
        src={afterImage}
        alt={`${alt} — بعد از درمان`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* BEFORE layer — clipped from the right (2.png) */}
      <div
        className="absolute inset-0 will-change-[clip-path]"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${alt} — قبل از درمان`}
          draggable={false}
          className={
            enhanceBefore
              ? "absolute inset-0 h-full w-full object-cover object-center grayscale contrast-[0.92] brightness-[0.78]"
              : "absolute inset-0 h-full w-full object-cover object-center"
          }
        />

        <div className="absolute top-3 left-3 border border-white/20 bg-[#070707]/80 px-2.5 py-1.5 backdrop-blur-md sm:top-4 sm:left-4 sm:px-3">
          <span className="font-serif text-[9px] tracking-[0.18em] text-[#A7A39A] sm:text-[10px] sm:tracking-[0.2em]">
            BEFORE • قبل
          </span>
        </div>
      </div>

      {/* AFTER label */}
      <div className="absolute top-3 right-3 border border-[#D4AF37]/40 bg-[#070707]/80 px-2.5 py-1.5 backdrop-blur-md sm:top-4 sm:right-4 sm:px-3">
        <span className="font-serif text-[9px] tracking-[0.18em] text-[#D4AF37] sm:text-[10px] sm:tracking-[0.2em]">
          AFTER • بعد
        </span>
      </div>

      {/* Champagne-gold divider + handle */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-10 w-[2px] -translate-x-1/2 bg-[#E6C766] shadow-[0_0_16px_rgba(230,199,102,0.65)]"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37] bg-[#070707] text-[#D4AF37] shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-transform duration-200 group-hover:scale-105 sm:h-11 sm:w-11">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>

      {/* 50/50 reset */}
      {Math.round(pos) !== 50 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setPos(50);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="بازنشانی نمای نصف‌به‌نصف"
          title="بازنشانی به ۵۰/۵۰"
          className="absolute bottom-3 right-3 z-20 flex h-9 items-center gap-1.5 border border-[#D4AF37]/45 bg-[#070707]/85 px-3 text-[11px] text-[#D4AF37] backdrop-blur-md transition-colors hover:border-[#D4AF37] hover:text-[#E6C766] sm:bottom-4 sm:right-4"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="font-serif tracking-[0.15em]">50/50</span>
        </button>
      )}
    </div>
  );
}
