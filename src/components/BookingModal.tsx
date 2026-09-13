import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { BookingForm } from "./BookingForm";

export function BookingModal() {
  const { open, prefill, close } = useBooking();
  if (!open) return null;

  /* Portaled to <body> — always viewport-relative fixed positioning. */
  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="رزرو مشاوره دکتر شهرام اسعدی"
    >
      {/* Dim backdrop */}
      <button
        aria-label="بستن"
        onClick={close}
        className="absolute inset-0 bg-[#070707]/85 backdrop-blur-md"
      />

      {/* Surface: Dark #0D0D0D with thin gold border */}
      <div className="relative w-full max-h-[92dvh] overflow-y-auto border border-[#D4AF37]/35 bg-[#0D0D0D] p-6 text-right sm:max-w-xl sm:p-9 safe-bottom">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37]">
              DR. SHAHRAM ASADI
            </span>
            <h3 className="mt-1 text-2xl font-semibold text-[#F5F2EA]">
              رزرو مشاوره تخصصی
            </h3>
            <p className="mt-1 text-xs text-[#A7A39A]">
              مشاوره بیماری‌های لثه و کاشت ایمپلنت — با بیش از ۵۰۰۰ ایمپلنت موفق
            </p>
          </div>

          <button
            onClick={close}
            aria-label="بستن پنجره"
            className="flex h-9 w-9 flex-none items-center justify-center border border-white/15 text-[#A7A39A] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <BookingForm initialService={prefill} compact />
      </div>
    </div>,
    document.body
  );
}
