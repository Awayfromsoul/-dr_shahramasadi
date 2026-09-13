import { useBooking } from "../context/BookingContext";
import {
  APPROACH,
  APPROVED_CLAIM,
  CREDENTIALS_LIST,
  IMG,
  INSTAGRAM_URL,
} from "../data/content";
import { InstagramIcon } from "./icons";
import { Reveal } from "./Reveal";
import { Arrow, Container, SectionHeading } from "./ui";

/**
 * 02 — ABOUT THE DOCTOR.
 * NOTE: portrait is a placeholder — replace with the real supplied
 * photograph of Dr. Shahram Asadi.
 */
export function AboutDoctor() {
  const { openBooking } = useBooking();

  return (
    <section id="about" className="relative bg-[#070707] py-24 md:py-32 border-t border-[#D4AF37]/20">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait with thin gold offset border */}
          <div className="lg:col-span-5">
            <Reveal className="relative mx-auto max-w-md lg:sticky lg:top-28 lg:max-w-none">
              <div className="absolute -inset-3.5 border border-[#D4AF37]/35" aria-hidden />
              <div className="absolute -top-3.5 -right-3.5 h-6 w-6 border-t-2 border-r-2 border-[#D4AF37]" aria-hidden />
              <div className="absolute -bottom-3.5 -left-3.5 h-6 w-6 border-b-2 border-l-2 border-[#D4AF37]" aria-hidden />

              <div className="relative overflow-hidden bg-[#0D0D0D]">
                <img
                  src={IMG.doctorAbout}
                  alt="دکتر شهرام اسعدی در حال بررسی طرح درمان"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-top brightness-[0.95]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80"
                  aria-hidden
                />
              </div>

              <div className="mt-4 border-t border-[#D4AF37]/30 pt-3 text-right">
                <span className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37]">
                  PERIODONTIST & IMPLANT SPECIALIST
                </span>
                <p className="mt-1 text-xs text-[#A7A39A]">
                  {APPROVED_CLAIM.value} {APPROVED_CLAIM.label} {APPROVED_CLAIM.since}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Editorial text composition */}
          <div className="flex flex-col text-right lg:col-span-7">
            <SectionHeading
              index="02"
              enTitle="ABOUT THE DOCTOR"
              title="درباره دکتر شهرام اسعدی"
            />

            <Reveal delay={90}>
              <div className="mt-6 space-y-4 text-base leading-8 text-[#A7A39A]">
                <p className="text-lg font-medium text-[#F5F2EA]">
                  متخصص بیماری‌های لثه و کاشت ایمپلنت دندان
                </p>
                <p>
                  دکتر شهرام اسعدی در حوزه بیماری‌های لثه و کاشت ایمپلنت فعالیت
                  تخصصی دارد و تمرکز اصلی ایشان بر درمان‌های پیشرفته لثه،
                  بازسازی بافت و استخوان، و کاشت ایمپلنت‌های دندانی است.
                </p>
                <p>
                  رویکرد درمانی ایشان بر پایه بررسی دقیق شرایط هر بیمار، طرح
                  درمان اختصاصی و پیگیری مستمر شکل گرفته است — با{" "}
                  <strong className="font-semibold text-[#D4AF37]">
                    {APPROVED_CLAIM.value} {APPROVED_CLAIM.label} {APPROVED_CLAIM.since}
                  </strong>
                  .
                </p>
              </div>
            </Reveal>

            {/* Verified credentials — factual list only */}
            <Reveal delay={140}>
              <div className="mt-8 border border-[#D4AF37]/28 bg-[#0D0D0D] p-6">
                <span className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37]">
                  VERIFIED CREDENTIALS
                </span>
                <ul className="mt-4 space-y-2.5">
                  {CREDENTIALS_LIST.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-sm text-[#F5F2EA]">
                      <span className="h-1.5 w-1.5 flex-none rotate-45 border border-[#D4AF37]" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Approach cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {APPROACH.map((item, i) => (
                <Reveal key={item.num} delay={i * 80}>
                  <div className="group h-full border border-white/10 bg-[#0D0D0D] p-6 transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-[#111111]">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-2xl font-light text-[#D4AF37]">
                        {item.num}
                      </span>
                      <span className="font-serif text-[10px] tracking-[0.2em] text-[#A7A39A]/60">
                        {item.enTitle}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-[#F5F2EA]">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#A7A39A]">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openBooking()}
                  className="group inline-flex items-center justify-center gap-2 border border-[#D4AF37] bg-[#070707] px-7 py-3.5 text-xs font-semibold tracking-wide text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#070707]"
                >
                  رزرو مشاوره
                  <Arrow />
                </button>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/15 bg-transparent px-6 py-3.5 text-xs text-[#F5F2EA] transition-all hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                >
                  <InstagramIcon className="h-4 w-4" />
                  مشاهده اینستاگرام
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
