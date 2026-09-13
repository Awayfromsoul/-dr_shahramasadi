import { IMG } from "../data/content";
import { useBooking } from "../context/BookingContext";
import { Reveal } from "./Reveal";
import { Arrow, Container, SectionHeading } from "./ui";

const IMPLANT_PILLARS = [
  { num: "01", title: "برنامه‌ریزی درمان", text: "طراحی دقیق مسیر درمان پیش از هر اقدام جراحی." },
  { num: "02", title: "ارزیابی استخوان", text: "بررسی حجم و تراکم استخوان فک با تصاویر سه‌بعدی." },
  { num: "03", title: "پیوند استخوان در صورت نیاز", text: "فراهم‌سازی بستر مناسب برای پایداری ایمپلنت." },
  { num: "04", title: "مدیریت بافت نرم", text: "حفاظت از سلامت و زیبایی مارجین لثه." },
  { num: "05", title: "برنامه‌ریزی دیجیتال", text: "تعیین موقعیت دقیق فیکسچر در فضای سه‌بعدی." },
  { num: "06", title: "رویکرد بلندمدت", text: "پیگیری و مراقبت برای ماندگاری نتیجه درمان." },
];

export function Implant() {
  const { openBooking } = useBooking();

  return (
    <section
      id="implant"
      className="relative bg-[#070707] py-24 md:py-32 border-t border-[#D4AF37]/20 overflow-hidden"
    >
      <div
        className="ghost-num pointer-events-none absolute top-8 right-4 select-none font-serif font-semibold text-[#D4AF37]/[0.035]"
        aria-hidden
      >
        D
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image plate */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-3.5 border border-[#D4AF37]/35" aria-hidden />
              <div className="absolute -top-3.5 -right-3.5 h-6 w-6 border-t-2 border-r-2 border-[#D4AF37]" aria-hidden />
              <div className="absolute -bottom-3.5 -left-3.5 h-6 w-6 border-b-2 border-l-2 border-[#D4AF37]" aria-hidden />

              <div className="relative overflow-hidden bg-[#0D0D0D]">
                <img
                  src={IMG.implantMacro}
                  alt="فیکسچر تیتانیومی ایمپلنت دندان"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-center brightness-[0.95]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-80"
                  aria-hidden
                />
              </div>

              <div className="absolute bottom-5 inset-x-5 border border-[#D4AF37]/30 bg-[#070707]/90 p-4 text-right backdrop-blur-md">
                <span className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37]">
                  DENTAL IMPLANTS
                </span>
                <p className="mt-0.5 text-xs text-[#F5F2EA]">
                  دقت در کاشت، پایداری در نتیجه
                </p>
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="order-1 flex flex-col text-right lg:order-2 lg:col-span-7">
            <SectionHeading
              enTitle="DENTAL IMPLANTS"
              title="کاشت ایمپلنت دندان"
              lead="جایگزینی ریشه از دست رفته با استانداردهای پریودنتولوژی و بازسازی عملکرد کامل فک."
            />

            <Reveal delay={90}>
              <p className="mt-6 text-base leading-8 text-[#A7A39A]">
                درمان ایمپلنت در این مطب فراتر از قرار دادن یک فیکسچر است؛
                ارزیابی دقیق استخوان فک، سلامت بافت لثه و روابط اکلوژنی، اساس هر
                تصمیم جراحی را تشکیل می‌دهند و در صورت نیاز، پیوند استخوان و
                مدیریت بافت نرم بخشی از طرح درمان خواهد بود.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {IMPLANT_PILLARS.map((p, i) => (
                <Reveal key={p.num} delay={i * 60}>
                  <div className="h-full bg-[#0D0D0D] p-5 text-right transition-colors duration-300 hover:bg-[#111111]">
                    <span className="font-serif text-xs text-[#D4AF37]">{p.num}</span>
                    <h4 className="mt-1.5 text-xs font-semibold text-[#F5F2EA]">{p.title}</h4>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-[#A7A39A]">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openBooking("کاشت ایمپلنت")}
                  className="group inline-flex items-center justify-center gap-2 border border-[#D4AF37] bg-[#070707] px-7 py-3.5 text-xs font-semibold tracking-wide text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#070707]"
                >
                  رزرو مشاوره ایمپلنت
                  <Arrow />
                </button>
                <a
                  href="#cases"
                  className="text-xs text-[#A7A39A] underline-offset-4 transition-colors hover:text-[#D4AF37] hover:underline"
                >
                  مشاهده نمونه‌کارهای ایمپلنت ←
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
