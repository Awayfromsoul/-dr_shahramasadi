import { CalendarCheck, Phone } from "lucide-react";
import { APPROVED_CLAIM, HERO_TAGS, IMG, PHONE_TEL } from "../data/content";
import { useBooking } from "../context/BookingContext";
import { Reveal } from "./Reveal";
import { Arrow } from "./ui";

/**
 * HERO — Luxury editorial composition with mobile-first hierarchy.
 * Mobile: Eyebrow → Framed Portrait → Brand Names → Title → Description → CTAs → Claim
 * Desktop: Asymmetric 2-column editorial layout
 */
export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section
      id="home"
      className="relative flex min-h-[90dvh] items-center overflow-hidden bg-[#070707] pt-[76px] sm:pt-[90px] pb-14 lg:pb-20"
    >
      {/* Ambient background lighting */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(212,175,55,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_90%,rgba(212,175,55,0.05),transparent_50%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[84rem] px-[clamp(1rem,4vw,3rem)]">
        {/* ============================================================
            DESKTOP LAYOUT (≥1024px)
           ============================================================ */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* Typography side */}
          <div className="flex flex-col text-right lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-serif text-[11px] font-medium tracking-[0.32em] text-[#D4AF37] uppercase">
                  PERIODONTICS • IMPLANT SURGERY
                </span>
                <span className="h-px w-10 bg-[#D4AF37]/50" aria-hidden />
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="mt-5">
                <span className="hero-name-en block font-serif font-normal tracking-[0.12em] text-[#D4AF37]">
                  DR. SHAHRAM ASADI
                </span>
                <h1 className="hero-name-fa mt-3 font-semibold tracking-tight text-[#F5F2EA]">
                  دکتر شهرام اسعدی
                </h1>
                <p className="mt-3 text-[clamp(1rem,0.9rem+0.6vw,1.3rem)] text-[#D4AF37]">
                  متخصص بیماری‌های لثه و کاشت ایمپلنت
                </p>
              </div>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#A7A39A] sm:text-lg">
                تمرکز بر درمان‌های تخصصی لثه، جراحی و کاشت ایمپلنت با رویکردی
                دقیق، مدرن و شخصی‌سازی‌شده.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={250}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openBooking()}
                  className="inline-flex items-center justify-center gap-2 border border-[#D4AF37] bg-[#070707] px-7 py-3.5 text-xs font-semibold tracking-wide text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#070707]"
                >
                  <CalendarCheck className="h-4 w-4" />
                  رزرو مشاوره
                </button>

                <a
                  href={PHONE_TEL}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 bg-transparent px-7 py-3.5 text-xs font-medium tracking-wide text-[#F5F2EA] transition-all duration-300 hover:border-[#D4AF37]/70 hover:text-[#D4AF37]"
                >
                  <Phone className="h-4 w-4" />
                  تماس با مطب
                </a>

                <a
                  href="#cases"
                  className="group inline-flex items-center gap-1.5 px-2 py-3 text-xs text-[#A7A39A] transition-colors hover:text-[#D4AF37]"
                >
                  مشاهده نمونه‌کارها
                  <Arrow className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>

            {/* Verified claim */}
            <Reveal delay={330}>
              <div className="mt-12 border-t border-[#D4AF37]/25 pt-7">
                <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
                  <div className="flex flex-col">
                    <span className="font-serif text-[clamp(2.2rem,1.6rem+2vw,3rem)] font-medium leading-none tracking-tight text-[#D4AF37]">
                      {APPROVED_CLAIM.value}
                    </span>
                    <span className="mt-2 text-xs font-medium text-[#F5F2EA]">
                      {APPROVED_CLAIM.label}
                    </span>
                    <span className="mt-0.5 text-[11px] text-[#A7A39A]">
                      {APPROVED_CLAIM.since}
                    </span>
                  </div>

                  <div className="h-12 w-px bg-[#D4AF37]/30" aria-hidden />

                  <div className="flex flex-wrap gap-x-8 gap-y-3">
                    {HERO_TAGS.map((tag, i) => (
                      <div key={tag} className="flex items-center gap-3">
                        <span className="font-serif text-xs text-[#D4AF37]/80">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs font-medium text-[#A7A39A] sm:text-sm">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Desktop Portrait */}
          <div className="relative lg:col-span-5">
            <Reveal delay={130} className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3.5 border border-[#D4AF37]/35" aria-hidden />
              <div className="absolute -top-3.5 -right-3.5 h-6 w-6 border-t-2 border-r-2 border-[#D4AF37]" aria-hidden />
              <div className="absolute -bottom-3.5 -left-3.5 h-6 w-6 border-b-2 border-l-2 border-[#D4AF37]" aria-hidden />

              <div className="relative overflow-hidden bg-[#0D0D0D]">
                <img
                  src={IMG.doctorHero}
                  alt="دکتر شهرام اسعدی، متخصص بیماری‌های لثه و کاشت ایمپلنت"
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-top brightness-[0.97] contrast-[1.04]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070707]/85 via-transparent to-transparent"
                  aria-hidden
                />
              </div>

              <div className="absolute bottom-5 inset-x-5 border border-[#D4AF37]/30 bg-[#070707]/90 p-3.5 backdrop-blur-md text-right">
                <p className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37]">
                  DR. SHAHRAM ASADI
                </p>
                <p className="mt-0.5 text-xs text-[#F5F2EA]">
                  {APPROVED_CLAIM.value} {APPROVED_CLAIM.label} {APPROVED_CLAIM.since}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ============================================================
            MOBILE-FIRST INTENTIONAL HIERARCHY (<1024px)
            Eyebrow → Doctor Image → Brand Titles → Text → CTAs → Claim
           ============================================================ */}
        <div className="flex flex-col text-right lg:hidden">
          {/* 1. Eyebrow */}
          <Reveal>
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-[10px] sm:text-[11px] font-medium tracking-[0.25em] text-[#D4AF37] uppercase">
                PERIODONTICS • IMPLANT SURGERY
              </span>
              <span className="h-px flex-1 max-w-[3rem] bg-[#D4AF37]/45" aria-hidden />
            </div>
          </Reveal>

          {/* 2. Doctor Image with strong face-prioritized crop & gold framing */}
          <Reveal delay={70} className="mt-5">
            <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem]">
              <div className="absolute -inset-2.5 border border-[#D4AF37]/35" aria-hidden />
              <div className="absolute -top-2.5 -right-2.5 h-5 w-5 border-t-2 border-r-2 border-[#D4AF37]" aria-hidden />
              <div className="absolute -bottom-2.5 -left-2.5 h-5 w-5 border-b-2 border-l-2 border-[#D4AF37]" aria-hidden />

              <div className="relative overflow-hidden bg-[#0D0D0D]">
                <img
                  src={IMG.doctorHero}
                  alt="دکتر شهرام اسعدی، متخصص بیماری‌های لثه و کاشت ایمپلنت"
                  loading="eager"
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover object-top brightness-[0.98] contrast-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070707]/90 via-transparent to-transparent"
                  aria-hidden
                />
              </div>

              {/* Minimal floating badge */}
              <div className="absolute bottom-3 inset-x-3 border border-[#D4AF37]/30 bg-[#070707]/92 p-2.5 backdrop-blur-md text-right">
                <span className="font-serif text-[10px] tracking-[0.2em] text-[#D4AF37]">
                  DR. SHAHRAM ASADI
                </span>
                <p className="text-[11px] font-medium text-[#F5F2EA]">
                  {APPROVED_CLAIM.value} {APPROVED_CLAIM.label} {APPROVED_CLAIM.since}
                </p>
              </div>
            </div>
          </Reveal>

          {/* 3 & 4. Names & Titles */}
          <Reveal delay={120} className="mt-7">
            <div>
              <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.14em] text-[#D4AF37]">
                DR. SHAHRAM ASADI
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F2EA]">
                دکتر شهرام اسعدی
              </h1>
              <p className="mt-2 text-sm sm:text-base font-medium text-[#D4AF37]">
                متخصص بیماری‌های لثه و کاشت ایمپلنت
              </p>
            </div>
          </Reveal>

          {/* 5. Short supporting text */}
          <Reveal delay={170}>
            <p className="mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-[#A7A39A]">
              تمرکز بر درمان‌های تخصصی لثه، جراحی و کاشت ایمپلنت با رویکردی
              دقیق، مدرن و شخصی‌سازی‌شده.
            </p>
          </Reveal>

          {/* 6. Mobile CTAs */}
          <Reveal delay={220}>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <button
                onClick={() => openBooking()}
                className="flex items-center justify-center gap-2 border border-[#D4AF37] bg-[#D4AF37] py-3.5 text-xs font-semibold tracking-wide text-[#070707] transition-all hover:bg-[#E6C766]"
              >
                <CalendarCheck className="h-4 w-4" />
                رزرو مشاوره
              </button>

              <a
                href={PHONE_TEL}
                className="flex items-center justify-center gap-2 border border-white/20 bg-[#0D0D0D] py-3.5 text-xs font-medium text-[#F5F2EA] transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
              >
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                تماس با مطب
              </a>
            </div>
          </Reveal>

          {/* 7. Experience Trust strip */}
          <Reveal delay={270}>
            <div className="mt-8 border-t border-[#D4AF37]/25 pt-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-serif text-2xl sm:text-3xl font-medium leading-none text-[#D4AF37]">
                    {APPROVED_CLAIM.value}
                  </span>
                  <span className="mt-1 text-[11px] font-medium text-[#F5F2EA]">
                    {APPROVED_CLAIM.label}
                  </span>
                  <span className="text-[10px] text-[#A7A39A]">
                    {APPROVED_CLAIM.since}
                  </span>
                </div>

                <div className="h-10 w-px bg-[#D4AF37]/25" aria-hidden />

                <div className="flex flex-col gap-1 text-[11px] text-[#A7A39A]">
                  <span className="text-[#F5F2EA] font-medium">بورد تخصصی جراحی لثه و ایمپلنت</span>
                  <span>فلوشیپ لیزر از جنوا (ایتالیا)</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
