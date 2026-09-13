import { useState } from "react";
import { FileWarning, Maximize2 } from "lucide-react";
import { CERTIFICATES } from "../data/certificates";
import { Lightbox, type LightboxSlide } from "./Lightbox";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./ui";

/**
 * 05 — PROFESSIONAL CREDENTIALS
 * Three dedicated editorial blocks. For each certificate:
 *   number → title → English label → accurate description → REAL document image.
 * Images come from src/assets/certificates/ (see README there). No placeholders,
 * no recreated documents: a missing file renders an explicit "file missing" state.
 */
export function ProfessionalLicenses() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const available = CERTIFICATES.filter((c) => c.src);
  const slides: LightboxSlide[] = available.map((c) => ({
    src: c.src as string,
    alt: c.alt,
    title: c.title,
    subtitle: c.enTitle,
  }));

  const openFor = (id: string) => {
    const i = available.findIndex((c) => c.id === id);
    if (i >= 0) setLightbox(i);
  };

  return (
    <section
      id="credentials"
      className="relative overflow-hidden border-t border-[#D4AF37]/20 bg-[#070707] py-24 md:py-32"
    >
      <div
        className="ghost-num pointer-events-none absolute -top-6 left-4 select-none font-serif font-semibold text-[#D4AF37]/[0.035] lg:left-12"
        aria-hidden
      >
        05
      </div>

      <Container className="relative">
        {/* Short editorial intro */}
        <div className="max-w-3xl">
          <SectionHeading
            index="05"
            enTitle="PROFESSIONAL CREDENTIALS"
            title="مدارک و مجوزهای حرفه‌ای"
            lead="مدارک تخصصی، دوره‌های حرفه‌ای و سوابق آموزشی"
          />
          <Reveal delay={90}>
            <p className="mt-5 text-sm leading-8 text-[#A7A39A]">
              در کنار سوابق تخصصی و حرفه‌ای، بخشی از مدارک و گواهی‌های آموزشی
              دکتر شهرام اسعدی را در ادامه مشاهده می‌کنید. عناوین و توضیحات هر
              سند دقیقاً بر اساس متن خوانای همان مدرک تنظیم شده است.
            </p>
          </Reveal>
        </div>

        {/* Three vertical editorial blocks */}
        <div className="mt-16 flex flex-col">
          {CERTIFICATES.map((c, i) => (
            <article
              key={c.id}
              aria-labelledby={`${c.id}-title`}
              className="relative py-14 first:pt-0 md:py-20 md:first:pt-0"
            >
              {/* Header: number (left) — title/description (right) */}
              <div className="grid gap-6 md:grid-cols-12 md:gap-10">
                <Reveal className="md:col-span-3">
                  <div className="flex items-baseline gap-4 md:flex-col md:items-start md:gap-2">
                    <span className="font-serif text-6xl font-light leading-none text-[#D4AF37] md:text-7xl">
                      {c.num}
                    </span>
                    <span className="font-serif text-[10px] tracking-[0.3em] text-[#A7A39A]/70">
                      {c.kind}
                    </span>
                  </div>
                </Reveal>

                <Reveal delay={80} className="text-right md:col-span-9">
                  <span className="font-serif text-[11px] font-medium tracking-[0.28em] text-[#D4AF37]">
                    {c.enTitle}
                  </span>
                  <h3
                    id={`${c.id}-title`}
                    className="mt-2 text-2xl font-semibold leading-snug text-[#F5F2EA] sm:text-3xl"
                  >
                    {c.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-sm leading-8 text-[#A7A39A]">
                    {c.description}
                  </p>

                  <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3 border-t border-[#D4AF37]/20 pt-4">
                    {c.facts.map((f) => (
                      <div key={f.label} className="flex flex-col">
                        <dt className="text-[10px] text-[#A7A39A]/70">{f.label}</dt>
                        <dd className="mt-0.5 text-xs font-medium text-[#F5F2EA]">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>

              {/* Certificate image — BELOW the explanation */}
              <Reveal delay={140} className="mt-10 md:mt-12">
                <div className="md:grid md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-9 md:col-start-4">
                    <div className="relative">
                      <div className="pointer-events-none absolute -inset-3 border border-[#D4AF37]/25" aria-hidden />
                      <div className="pointer-events-none absolute -top-3 -right-3 h-6 w-6 border-t-2 border-r-2 border-[#D4AF37]" aria-hidden />
                      <div className="pointer-events-none absolute -bottom-3 -left-3 h-6 w-6 border-b-2 border-l-2 border-[#D4AF37]" aria-hidden />

                      {c.src ? (
                        <button
                          onClick={() => openFor(c.id)}
                          aria-label={`بزرگ‌نمایی: ${c.title}`}
                          className="group relative block w-full overflow-hidden border border-[#D4AF37]/35 bg-[#070707] focus:outline-none"
                        >
                          <img
                            src={c.src}
                            alt={c.alt}
                            loading="lazy"
                            className="mx-auto block max-h-[80dvh] w-full object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                          />
                          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 border border-[#D4AF37]/40 bg-[#070707]/85 px-3 py-1.5 text-[11px] text-[#D4AF37] opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                            <Maximize2 className="h-3.5 w-3.5" />
                            مشاهده در اندازه بزرگ
                          </span>
                        </button>
                      ) : (
                        /* Explicit missing-file state — never a fake certificate */
                        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 border border-dashed border-[#D4AF37]/40 bg-[#0D0D0D] p-8 text-center">
                          <FileWarning className="h-6 w-6 text-[#D4AF37]" />
                          <p className="text-sm font-medium text-[#F5F2EA]">
                            فایل اصلی این گواهی هنوز در پروژه قرار نگرفته است
                          </p>
                          <p className="max-w-md min-w-0 text-xs leading-relaxed break-words text-[#A7A39A]">
                            تصویر اصلی ارائه‌شده را با نام{" "}
                            <code dir="ltr" className="break-all text-[#D4AF37]">
                              {c.file}
                            </code>{" "}
                            و هر پسوند دلخواه (
                            <code dir="ltr" className="text-[#D4AF37]">
                              .jpg
                            </code>
                            ،
                            <code dir="ltr" className="text-[#D4AF37]">
                              .png
                            </code>
                            ،
                            <code dir="ltr" className="text-[#D4AF37]">
                              .webp
                            </code>
                            ) در مسیر{" "}
                            <code dir="ltr" className="break-all text-[#D4AF37]">
                              src/assets/certificates/
                            </code>{" "}
                            ذخیره کنید؛ این بلوک به‌صورت خودکار سند واقعی را نمایش
                            می‌دهد.
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="mt-5 flex items-center justify-between text-[11px] text-[#A7A39A]/70">
                      <span>سند اصلی — بدون هرگونه بازطراحی یا تغییر محتوا</span>
                      <span className="font-serif tracking-[0.2em]">CERTIFICATE {c.num}</span>
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Gold divider between blocks */}
              {i < CERTIFICATES.length - 1 && (
                <div className="gold-hairline absolute inset-x-0 bottom-0" aria-hidden />
              )}
            </article>
          ))}
        </div>
      </Container>

      {lightbox !== null && slides.length > 0 && (
        <Lightbox
          slides={slides}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndex={setLightbox}
          label="گالری مدارک و مجوزهای حرفه‌ای"
        />
      )}
    </section>
  );
}
