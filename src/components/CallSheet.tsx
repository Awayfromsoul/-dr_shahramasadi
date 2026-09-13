import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Phone, Smartphone, X } from "lucide-react";
import { PHONES } from "../data/content";

interface CallSheetProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Mobile phone-selection sheet for the sticky "تماس با مطب" action.
 * Black surface, thin champagne-gold border, three independent tel: links,
 * safe-area aware, ESC + backdrop close. No WhatsApp.
 */
export function CallSheet({ open, onClose }: CallSheetProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  /* Portaled to <body> — always viewport-relative fixed positioning. */
  return createPortal(
    <div
      className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="انتخاب شماره تماس مطب"
    >
      <button
        aria-label="بستن"
        onClick={onClose}
        className="absolute inset-0 bg-[#070707]/85 backdrop-blur-md"
      />

      <div className="safe-bottom relative w-full border border-[#D4AF37]/40 bg-[#0D0D0D] p-5 text-right sm:max-w-md sm:p-7">
        <div className="pointer-events-none absolute -top-px -right-px h-5 w-5 border-t-2 border-r-2 border-[#D4AF37]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-[#D4AF37]" aria-hidden />

        <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="font-serif text-[10px] tracking-[0.25em] text-[#D4AF37]">
              CONTACT THE CLINIC
            </span>
            <h3 className="mt-1 text-lg font-semibold text-[#F5F2EA]">تماس با مطب</h3>
            <p className="mt-1 text-xs text-[#A7A39A]">
              یکی از شماره‌های رسمی مطب را انتخاب کنید.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن"
            className="flex h-10 w-10 flex-none items-center justify-center border border-white/15 text-[#A7A39A] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {PHONES.map((p) => (
            <li key={p.tel}>
              <a
                href={p.tel}
                onClick={onClose}
                className="group flex min-h-[56px] items-center justify-between gap-4 border border-[#D4AF37]/30 bg-[#070707] px-4 py-3 transition-colors hover:border-[#D4AF37] hover:bg-[#111111]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#070707]">
                    {p.kind === "mobile" ? (
                      <Smartphone className="h-4 w-4" />
                    ) : (
                      <Phone className="h-4 w-4" />
                    )}
                  </span>
                  <span className="text-xs text-[#A7A39A]">{p.label}</span>
                </span>
                <span
                  dir="ltr"
                  className="font-serif text-lg font-medium tracking-wider text-[#D4AF37] group-hover:text-[#E6C766]"
                >
                  {p.display}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}
