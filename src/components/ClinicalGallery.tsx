import { useState } from "react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  HAS_CUSTOM_GALLERY,
  type GalleryCategory,
} from "../data/content";
import { Lightbox, type LightboxSlide } from "./Lightbox";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

/**
 * CLINICAL GALLERY — masonry-like editorial composition.
 * NOTE: placeholder clinical photography — replace with real supplied
 * clinical images where available.
 */
export function ClinicalGallery() {
  const [category, setCategory] = useState<GalleryCategory>("همه");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    category === "همه"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((g) => g.category === category);

  const slides: LightboxSlide[] = filtered.map((g) => ({
    src: g.src,
    alt: g.alt,
    title: g.faLabel,
    subtitle: g.category.toUpperCase(),
  }));

  return (
    <section
      id="gallery"
      className="relative bg-[#070707] py-24 md:py-32 border-t border-[#D4AF37]/20"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            enTitle="CLINICAL GALLERY"
            title="گالری تصاویر کلینیکی"
            lead="مستندسازی محیط درمان، ابزارهای تخصصی و فرآیندهای جراحی."
          />

          <div className="flex flex-wrap gap-2">
            {GALLERY_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  setLightbox(null);
                }}
                className={cn(
                  "border px-4 py-2 font-serif text-[11px] tracking-[0.15em] transition-all duration-300",
                  category === c
                    ? "border-[#D4AF37] bg-[#D4AF37] font-medium text-[#070707]"
                    : "border-white/10 text-[#A7A39A] hover:border-[#D4AF37]/40 hover:text-[#F5F2EA]"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry editorial grid: 1 column on small mobile for maximum clarity, 2 on tablet, 3 on desktop */}
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((g, i) => (
            <Reveal key={g.id} delay={i * 60} className="mb-4 break-inside-avoid">
              <button
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden border border-white/10 bg-[#0D0D0D] text-right transition-colors duration-300 hover:border-[#D4AF37]/60 focus:outline-none"
                aria-label={`بزرگ‌نمایی: ${g.faLabel}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className={cn(
                    "w-full object-cover object-center brightness-[0.92] transition-transform duration-700 group-hover:scale-[1.04]",
                    g.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  )}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070707]/90 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between p-3.5">
                  <span className="text-[11px] font-medium text-[#F5F2EA]">{g.faLabel}</span>
                  <span className="font-serif text-[9px] tracking-[0.2em] text-[#D4AF37]">
                    {g.category.toUpperCase()}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* The "these are samples" disclaimer applies only to the placeholder
            plates — once real images are dropped into src/assets/gallery/ the
            grid shows supplied clinical photography and the note is removed. */}
        {HAS_CUSTOM_GALLERY ? (
          <p className="mt-8 text-center text-[11px] leading-relaxed text-[#A7A39A]/70">
            تصاویر کلینیکی ارائه‌شده توسط مطب دکتر شهرام اسعدی.
          </p>
        ) : (
          <p className="mt-8 text-center text-[11px] leading-relaxed text-[#A7A39A]/70">
            تصاویر فوق نمونه هستند و با تصاویر واقعی کلینیکی ارائه‌شده توسط مطب
            جایگزین می‌شوند.
          </p>
        )}
      </Container>

      {lightbox !== null && (
        <Lightbox
          slides={slides}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndex={setLightbox}
          label="گالری تصاویر کلینیکی"
        />
      )}
    </section>
  );
}
