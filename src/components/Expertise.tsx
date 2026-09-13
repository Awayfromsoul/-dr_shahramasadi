import { IMG } from "../data/content";
import { useBooking } from "../context/BookingContext";
import { Reveal } from "./Reveal";
import { Arrow, Container, SectionHeading } from "./ui";

/* ---------------------- 15 — DIGITAL IMPLANT DENTISTRY --------------------- */
export function DigitalImplant() {
  const { openBooking } = useBooking();

  const steps = [
    "تصویربرداری سه‌بعدی و اسکن داخل‌دهانی",
    "برنامه‌ریزی دیجیتال موقعیت ایمپلنت",
    "شبیه‌سازی و تجسم طرح درمان",
    "ساخت راهنمای جراحی اختصاصی",
    "اجرای جراحی هدایت‌شده با حداقل تهاجم",
  ];

  return (
    <section id="digital" className="relative bg-[#0D0D0D] py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col text-right lg:col-span-7">
            <SectionHeading
              enTitle="DIGITAL IMPLANT DENTISTRY"
              title="ایمپلنت دیجیتال"
              lead="برنامه‌ریزی دقیق، تجسم درمان و شخصی‌سازی کامل بر پایه داده‌های دیجیتال."
            />

            <Reveal delay={90}>
              <p className="mt-6 text-base leading-8 text-[#A7A39A]">
                در workflow تشخیصی مدرن، پیش از جراحی، موقعیت ایده‌آل فیکسچر بر
                اساس تصاویر سه‌بعدی و اسکن داخل‌دهانی مدل‌سازی می‌شود. این
                رویکرد دقت را افزایش داده و نتیجه را قابل پیش‌بینی‌تر می‌کند.
              </p>
            </Reveal>

            <div className="mt-8 space-y-2.5">
              {steps.map((s, idx) => (
                <Reveal key={idx} delay={idx * 60}>
                  <div className="flex items-center gap-4 border border-white/10 bg-[#070707] p-3.5 text-right transition-colors duration-300 hover:border-[#D4AF37]/45">
                    <span className="font-serif text-xs text-[#D4AF37]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs font-medium text-[#F5F2EA] sm:text-sm">{s}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <button
                onClick={() => openBooking("ایمپلنت دیجیتال")}
                className="group mt-8 inline-flex items-center justify-center gap-2 border border-[#D4AF37] bg-[#070707] px-7 py-3.5 text-xs font-semibold tracking-wide text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#070707]"
              >
                مشاوره ایمپلنت دیجیتال
                <Arrow />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={120} className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden border border-[#D4AF37]/35 bg-[#070707]">
                <img
                  src={IMG.digitalPlan}
                  alt="برنامه‌ریزی دیجیتال کاشت ایمپلنت دندان"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-center brightness-[0.95]"
                />
              </div>
              <span className="font-serif text-[10px] tracking-[0.3em] text-[#A7A39A]/60">
                DIGITAL WORKFLOW
              </span>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------ 16 — PERIODONTAL SURGERY ------------------------- */
export function PeriodontalSection() {
  const { openBooking } = useBooking();

  const items = [
    "درمان بیماری‌های لثه و کنترل پریودنتیت",
    "جراحی‌های تخصصی بافت لثه",
    "بازسازی لثه و بافت‌های پشتیبان",
    "روش‌های جراحی بافت نرم",
    "درمان‌های پریودنتال مرتبط با ایمپلنت",
  ];

  return (
    <section id="gum" className="relative bg-[#070707] py-24 md:py-32 border-t border-[#D4AF37]/20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden border border-[#D4AF37]/35 bg-[#0D0D0D]">
                <img
                  src={IMG.gum}
                  alt="جراحی و درمان تخصصی لثه"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-center brightness-[0.95]"
                />
              </div>
              <span className="font-serif text-[10px] tracking-[0.3em] text-[#A7A39A]/60">
                PERIODONTAL SURGERY
              </span>
            </Reveal>
          </div>

          <div className="order-1 flex flex-col text-right lg:order-2 lg:col-span-7">
            <SectionHeading
              enTitle="PERIODONTAL SURGERY"
              title="جراحی و درمان لثه"
              lead="سلامت بافت لثه، پایه و اساس ماندگاری هر درمان دندان و ایمپلنت است."
            />

            <Reveal delay={90}>
              <p className="mt-6 text-base leading-8 text-[#A7A39A]">
                تمرکز تخصصی دکتر شهرام اسعدی بر بیماری‌های لثه، جراحی‌های
                پریودنتال، بازسازی لثه و روش‌های بافت نرم است؛ از جمله
                درمان‌های پریودنتال مرتبط با ایمپلنت که پایداری درازمدت نتیجه
                را تضمین می‌کنند.
              </p>
            </Reveal>

            <div className="mt-7 divide-y divide-[#D4AF37]/20 border-y border-[#D4AF37]/20">
              {items.map((t, i) => (
                <Reveal key={t} delay={i * 60}>
                  <div className="flex items-center gap-4 py-3.5">
                    <span className="font-serif text-xs text-[#D4AF37]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-[#F5F2EA]">{t}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <button
                onClick={() => openBooking("جراحی لثه")}
                className="group mt-8 inline-flex items-center justify-center gap-2 border border-[#D4AF37] bg-[#070707] px-7 py-3.5 text-xs font-semibold tracking-wide text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#070707]"
              >
                مشاوره جراحی لثه
                <Arrow />
              </button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------- 17 — LASER DENTISTRY --------------------------- */
export function LaserSection() {
  const { openBooking } = useBooking();

  return (
    <section id="laser" className="relative bg-[#0D0D0D] py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading
            align="center"
            enTitle="LASER DENTISTRY"
            title="درمان با لیزر"
          />

          <Reveal delay={90}>
            {/* Verified credential — presented as a fact, not an award */}
            <div className="mx-auto mt-8 inline-flex flex-col items-center gap-2 border border-[#D4AF37]/35 bg-[#070707] px-8 py-5">
              <span className="font-serif text-[10px] tracking-[0.3em] text-[#D4AF37]">
                FELLOWSHIP IN LASER DENTISTRY
              </span>
              <span className="text-sm font-semibold text-[#F5F2EA]">
                فلوشیپ لیزر از جنوا، ایتالیا
              </span>
              <span className="font-serif text-[10px] tracking-[0.3em] text-[#A7A39A]/70">
                GENOA · ITALY
              </span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-7 text-sm leading-8 text-[#A7A39A]">
              در موارد انتخابی و بر اساس ارزیابی بالینی، از لیزر به‌عنوان ابزار
              کمکی در درمان‌های بافت نرم لثه استفاده می‌شود. مناسب بودن این روش
              برای هر بیمار، تنها پس از معاینه حضوری تعیین می‌گردد.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <button
              onClick={() => openBooking("درمان‌های لیزری")}
              className="mt-8 border border-white/20 bg-transparent px-7 py-3 text-xs font-medium text-[#F5F2EA] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              مشاوره و ارزیابی درمانی
            </button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
