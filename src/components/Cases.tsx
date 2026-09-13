import { useState } from "react";
import { CASE_CATEGORIES, CASES, type CaseCategory, type CaseItem } from "../data/content";
import { REAL_CASE } from "../data/patientCases";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

/**
 * CASE 01 is the REAL patient case (2.png = BEFORE · 1.png = AFTER) and is
 * always first, so it is the default visible case as soon as the section is
 * reached — no filter selection required. It appears under «همه» and «ایمپلنت».
 */
const ALL_CASES: CaseItem[] = [
  {
    id: REAL_CASE.id,
    num: REAL_CASE.num,
    title: REAL_CASE.title,
    enTitle: REAL_CASE.enTitle,
    category: REAL_CASE.category,
    image: REAL_CASE.after ?? REAL_CASE.before ?? "",
    beforeImage: REAL_CASE.before,
    afterImage: REAL_CASE.after,
    beforeFile: REAL_CASE.beforeFile,
    afterFile: REAL_CASE.afterFile,
    aspect: REAL_CASE.aspect,
    duration: REAL_CASE.duration,
    tags: [...REAL_CASE.tags],
    note: REAL_CASE.note,
  },
  ...CASES,
];

export function Cases() {
  const [category, setCategory] = useState<CaseCategory>("همه");
  const filtered =
    category === "همه" ? ALL_CASES : ALL_CASES.filter((c) => c.category === category);
  const [activeId, setActiveId] = useState<string>(ALL_CASES[0].id);
  const active = filtered.find((c) => c.id === activeId) ?? filtered[0];

  const handleSelectCategory = (cat: CaseCategory) => {
    setCategory(cat);
    const subset =
      cat === "همه" ? ALL_CASES : ALL_CASES.filter((x) => x.category === cat);
    if (subset.length) setActiveId(subset[0].id);
  };

  return (
    <section
      id="cases"
      className="relative bg-[#070707] py-24 md:py-32 overflow-hidden border-t border-[#D4AF37]/20"
    >
      {/* Giant faint background case number (e.g. 01, 02) */}
      <div
        className="ghost-num pointer-events-none absolute -top-12 left-6 select-none font-serif font-bold text-[#D4AF37]/[0.035] sm:left-16"
        aria-hidden
      >
        {active.num}
      </div>

      <Container className="relative">
        {/* Section title */}
        <SectionHeading
          index="04"
          enTitle="SELECTED CASES"
          title="نمونه‌کارهای واقعی"
          lead="بررسی نتایج بالینی در درمان‌های کاشت ایمپلنت و جراحی‌های پیشرفته لثه."
        />

        {/*
          Category filters — own full-width row.
          Fluid + wrapping (never clipped, never horizontally scrolled):
          flex-wrap, width 100%, max-width 100%, explicit RTL direction,
          comfortable touch targets, and a fixed font-weight so the active
          state never changes button size (no layout jump).
        */}
        <div
          role="tablist"
          aria-label="دسته‌بندی نمونه‌کارها"
          dir="rtl"
          className="mt-10 flex w-full max-w-full flex-wrap items-center justify-start gap-2.5 sm:gap-3"
        >
          {CASE_CATEGORIES.map((c) => {
            const isActive = category === c;
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectCategory(c)}
                className={cn(
                  "inline-flex min-h-[44px] shrink-0 items-center justify-center whitespace-nowrap border px-4 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-300 sm:px-5 sm:text-sm",
                  isActive
                    ? "border-[#D4AF37] bg-[#070707] text-[#E6C766] shadow-[inset_0_0_0_1px_rgba(212,175,55,0.35)]"
                    : "border-[#D4AF37]/20 bg-[#0D0D0D] text-[#A7A39A] hover:border-[#D4AF37]/60 hover:bg-[#111111] hover:text-[#F5F2EA]"
                )}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Three-rail layout on desktop */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT: Case selector (Col 3) */}
          <div className="min-w-0 lg:col-span-3">
            {/* Desktop vertical rail (≥1024px) */}
            <div className="hidden flex-col gap-2.5 lg:flex" role="tablist" aria-label="انتخاب کیس">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={c.id === active.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "group flex min-w-0 items-start gap-3.5 border p-4 text-right transition-all duration-300",
                    c.id === active.id
                      ? "border-[#D4AF37] bg-[#111111] text-[#F5F2EA]"
                      : "border-white/10 bg-[#070707] text-[#A7A39A] hover:border-[#D4AF37]/35 hover:bg-[#0D0D0D]"
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-sm font-medium transition-colors",
                      c.id === active.id ? "text-[#D4AF37]" : "text-[#A7A39A]/60"
                    )}
                  >
                    {c.num}
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="font-serif text-[10px] tracking-[0.18em] break-words text-[#D4AF37]/80">
                      {c.enTitle}
                    </span>
                    <span className="mt-1 text-xs font-medium leading-snug break-words">
                      {c.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/*
              Mobile / tablet case selector (<1024px).
              ROOT-CAUSE FIX: the previous horizontal RTL scroll rail used
              negative margins (-mx-5 / -mx-8) and fixed-width flex-none cards
              (6 × 192px), so the row bled past the viewport and the last cards
              were clipped on the left. Replaced with a contained, wrapping,
              fluid grid: auto-fill columns whose min never exceeds 100% of the
              available width, no negative margins, no transforms, no fixed
              card widths. RTL flow (01 at the right → 05/06 at the left)
              stays intact because the grid follows the document direction.
            */}
            <div
              role="tablist"
              aria-label="انتخاب کیس"
              className="grid w-full max-w-full min-w-0 grid-cols-[repeat(auto-fill,minmax(min(100%,10.5rem),1fr))] gap-3 lg:hidden"
            >
              {filtered.map((c) => {
                const isActive = c.id === active.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(c.id)}
                    className={cn(
                      "flex h-full min-h-[5.5rem] min-w-0 flex-col items-stretch gap-2 border p-4 text-right transition-colors duration-300",
                      isActive
                        ? "border-[#D4AF37] bg-[#111111]"
                        : "border-white/10 bg-[#070707] hover:border-[#D4AF37]/40 hover:bg-[#0D0D0D]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "font-serif text-sm font-medium",
                          isActive ? "text-[#D4AF37]" : "text-[#A7A39A]/70"
                        )}
                      >
                        {c.num}
                      </span>
                      <span className="truncate text-[10px] text-[#D4AF37]/80">{c.category}</span>
                    </div>
                    <p className="text-xs leading-snug font-medium break-words text-[#F5F2EA]">
                      {c.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CENTER: Interactive Before/After comparison (Col 6) */}
          <div className="min-w-0 lg:col-span-6">
            <Reveal delay={90} className="mx-auto w-full max-w-md lg:max-w-none">
              <BeforeAfterSlider
                beforeImage={active.beforeImage ?? active.image}
                afterImage={active.afterImage ?? active.image}
                alt={active.title}
                aspect={active.aspect}
                /* Authentic patient imagery is never filtered — the desaturated
                   treatment applies only to the remaining placeholder plates. */
                enhanceBefore={!active.beforeImage}
              />
              <p className="mt-4 text-center text-xs leading-relaxed text-[#A7A39A]/80">
                نتایج درمان بسته به شرایط دهان، استخوان، لثه و شرایط عمومی هر
                بیمار متفاوت است.
              </p>
            </Reveal>
          </div>

          {/* RIGHT: Case details & info (Col 3) */}
          <div className="lg:col-span-3">
            <Reveal delay={160}>
              <div className="border border-white/10 bg-[#0D0D0D] p-6 text-right">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-serif text-xs tracking-[0.2em] text-[#D4AF37]">
                    CASE {active.num}
                  </span>
                  <span className="border border-[#D4AF37]/40 px-2.5 py-0.5 font-sans text-[11px] text-[#D4AF37]">
                    {active.category}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-xs tracking-wider text-[#A7A39A]">
                  {active.enTitle}
                </h3>
                <p className="mt-1 text-base font-semibold leading-snug text-[#F5F2EA]">
                  {active.title}
                </p>

                <div className="mt-5 border-t border-white/10 pt-4">
                  <span className="text-[11px] text-[#A7A39A]">طول دوره درمان</span>
                  <p className="mt-0.5 text-xs font-medium text-[#F5F2EA]">
                    {active.duration}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-white/10 bg-[#070707] px-2.5 py-1 text-[11px] text-[#A7A39A]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-[11px] leading-relaxed text-[#A7A39A]/70">
                  {active.note}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom medical disclaimer note */}
        <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs leading-relaxed text-[#A7A39A]/70">
          نتایج درمان بسته به شرایط هر بیمار متفاوت است. تمام موارد بالینی بر
          اساس وضعیت فردی بیمار و پس از معاینه حضوری طرح‌ریزی می‌شود.
        </p>
      </Container>
    </section>
  );
}
