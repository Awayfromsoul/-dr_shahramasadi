import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Phone, X } from "lucide-react";
import { NAV, PHONE_TEL, PHONE_DISPLAY, PHONES } from "../data/content";
import { useBooking } from "../context/BookingContext";
import { cn } from "../utils/cn";

/**
 * GLOBAL NAVIGATION — viewport-level UI.
 *
 * The header bar is `position: fixed` to the viewport (top), so the menu
 * button never scrolls with the page on desktop or mobile.
 *
 * ROOT-CAUSE FIX for the "menu disappears after scrolling" bug:
 * the full-screen menu overlay used to be a DOM descendant of the header,
 * which gains `backdrop-filter` (blur) when scrolled. `backdrop-filter`
 * creates a CSS containing block, so the overlay's `fixed inset-0` resolved
 * against the 64px header box instead of the viewport. The overlay is now
 * rendered through a PORTAL to <body>, guaranteeing true viewport-relative
 * fixed positioning at every scroll depth. No overflow hacks involved.
 *
 * Z-INDEX hierarchy:  page content < sticky CTA (40) < header/menu button (50)
 *                     < menu overlay (80) < booking modal (90) < call sheet (95)
 *                     < lightbox (100).
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body scroll lock while the overlay is open. `overflow: hidden` preserves
     the scroll position exactly — closing never jumps to the top. */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ESC closes the overlay (keyboard accessibility). */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-[#D4AF37]/30 bg-[#070707]/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
        /* Keep the bar (and its buttons) clear of notches / Dynamic Island. */
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="mx-auto flex h-[64px] w-full max-w-[84rem] items-center justify-between gap-3 px-[clamp(1rem,3.5vw,2.5rem)] sm:h-[72px]">
          {/* Menu button — inside the viewport-fixed bar, so it is itself
              viewport-fixed at every scroll position (<xl). 44px+ target. */}
          <div className="flex items-center xl:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منوی سایت"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="flex h-11 w-11 items-center justify-center border border-[#D4AF37]/30 bg-[#0D0D0D] text-[#D4AF37] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070707]"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Brand */}
          <a href="#home" className="group flex flex-col text-center xl:text-right">
            <span className="font-serif text-[13px] font-medium tracking-[0.16em] whitespace-nowrap text-[#D4AF37] transition-colors group-hover:text-[#E6C766] sm:text-[15px] sm:tracking-[0.2em]">
              DR. SHAHRAM ASADI
            </span>
            <div className="flex items-center justify-center gap-1.5 xl:justify-start">
              <span className="text-[11px] font-semibold whitespace-nowrap text-[#F5F2EA] sm:text-xs">
                دکتر شهرام اسعدی
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#D4AF37]/60 sm:block" aria-hidden />
              <span className="hidden text-[10px] whitespace-nowrap text-[#A7A39A] sm:block sm:text-[11px]">
                متخصص لثه و کاشت ایمپلنت
              </span>
            </div>
          </a>

          {/* Desktop inline nav (xl+) — lives in the fixed bar, always visible */}
          <nav className="hidden items-center gap-5 xl:flex min-[1400px]:gap-7" aria-label="منوی اصلی">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[13px] tracking-wide whitespace-nowrap text-[#A7A39A] transition-colors duration-300 hover:text-[#D4AF37]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop right: primary phone + CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={PHONE_TEL}
              className="flex items-center gap-2 font-serif text-sm whitespace-nowrap tracking-wider text-[#A7A39A] transition-colors hover:text-[#D4AF37]"
            >
              <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>

            <button
              onClick={() => openBooking()}
              className="whitespace-nowrap border border-[#D4AF37]/60 bg-transparent px-5 py-2.5 text-xs font-medium tracking-wide text-[#D4AF37] transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070707]"
            >
              رزرو مشاوره
            </button>
          </div>

          {/* Mobile right: direct phone tap */}
          <div className="flex items-center xl:hidden">
            <a
              href={PHONE_TEL}
              aria-label="تماس مستقیم با مطب"
              className="flex h-11 w-11 items-center justify-center border border-[#D4AF37]/35 bg-[#0D0D0D] text-[#D4AF37] transition-colors hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070707]"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ================================================================
          FULL-SCREEN MENU OVERLAY — PORTALED TO <body>.
          Never a descendant of the blurred header, so `fixed inset-0` is
          always resolved against the real viewport at any scroll depth.
         ================================================================ */}
      {createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="منوی سایت"
          className={cn(
            "fixed inset-0 z-[80] flex flex-col overflow-y-auto overscroll-contain bg-[#070707] transition-opacity duration-400 xl:hidden",
            menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          )}
          style={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
            paddingInlineStart: "env(safe-area-inset-left, 0px)",
            paddingInlineEnd: "env(safe-area-inset-right, 0px)",
          }}
        >
          {/* Overlay top bar — mirrors the header height for visual continuity */}
          <div className="flex h-[64px] flex-none items-center justify-between border-b border-[#D4AF37]/25 px-5 sm:h-[72px] sm:px-8">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="بستن منو"
              className="flex h-11 w-11 items-center justify-center border border-[#D4AF37]/40 bg-[#0D0D0D] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#070707]"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <span className="font-serif text-xs tracking-[0.2em] text-[#D4AF37] sm:text-sm">
                DR. SHAHRAM ASADI
              </span>
              <p className="text-[11px] text-[#F5F2EA]">دکتر شهرام اسعدی</p>
            </div>

            <a
              href={PHONE_TEL}
              aria-label="تماس مستقیم با مطب"
              className="flex h-11 w-11 items-center justify-center border border-[#D4AF37]/35 bg-[#0D0D0D] text-[#D4AF37]"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>

          {/* Menu content */}
          <div className="flex flex-1 flex-col justify-between px-6 py-8 sm:px-10">
            <nav className="flex flex-col divide-y divide-white/5 text-right" aria-label="منوی موبایل">
              {NAV.map((item, idx) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="group flex min-h-[52px] items-center justify-between py-3.5 text-base font-medium text-[#F5F2EA] transition-colors hover:text-[#D4AF37]"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-serif text-xs text-[#D4AF37]/70">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  <span className="font-serif text-xs text-[#D4AF37] opacity-0 transition-opacity group-hover:opacity-100">
                    ←
                  </span>
                </a>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#D4AF37]/25 pt-6">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openBooking();
                }}
                className="w-full border border-[#D4AF37] bg-[#D4AF37] py-4 text-sm font-semibold tracking-wide text-[#070707] transition-all hover:bg-[#E6C766]"
              >
                رزرو مشاوره
              </button>

              <p className="mt-1 text-right text-xs text-[#A7A39A]">تماس با مطب</p>
              <ul className="flex flex-col gap-2">
                {PHONES.map((p) => (
                  <li key={p.tel}>
                    <a
                      href={p.tel}
                      aria-label={`تماس با ${p.label}: ${p.display}`}
                      className="flex min-h-[48px] items-center justify-between gap-3 border border-white/15 bg-[#0D0D0D] px-4 py-2.5 transition-colors hover:border-[#D4AF37]"
                    >
                      <span className="flex items-center gap-2 text-xs text-[#A7A39A]">
                        <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                        {p.label}
                      </span>
                      <span dir="ltr" className="font-serif text-sm tracking-wider text-[#D4AF37]">
                        {p.display}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
