import { PHILOSOPHY_HEADING, PHILOSOPHY_PRINCIPLES } from "../data/content";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./ui";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden bg-[#070707] py-24 md:py-32">
      {/* Oversized faint section number */}
      <div
        className="ghost-num pointer-events-none absolute top-10 left-4 select-none font-serif font-semibold text-[#D4AF37]/[0.04] lg:left-16"
        aria-hidden
      >
        01
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              index="01"
              enTitle="PHILOSOPHY"
              title={PHILOSOPHY_HEADING}
            />
            <Reveal delay={100}>
              <div className="mt-6 space-y-4 text-base leading-8 text-[#A7A39A]">
                <p>
                  «ایمپلنت موفق فقط جایگزین کردن یک دندان نیست؛ بلکه بازگرداندن
                  عملکرد، سلامت بافت‌ها و هماهنگی لبخند است.»
                </p>
                <p>
                  در این رویکرد، هر درمان با بررسی دقیق شرایط دهان، استخوان و لثه
                  آغاز می‌شود و تصمیم‌ها بر پایه نیاز واقعی بیمار گرفته می‌شود —
                  نه الگوهای عمومی.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Principles — editorial numbered rows, not an icon grid */}
          <div className="lg:col-span-6">
            <div className="divide-y divide-[#D4AF37]/20 border-y border-[#D4AF37]/20">
              {PHILOSOPHY_PRINCIPLES.map((p, i) => (
                <Reveal key={p.num} delay={i * 70}>
                  <div className="group flex items-start gap-5 py-5 transition-colors duration-300">
                    <span className="font-serif text-sm text-[#D4AF37]">{p.num}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-[#F5F2EA] transition-colors group-hover:text-[#E6C766]">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#A7A39A]">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
