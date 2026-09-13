import { JOURNEY } from "../data/content";
import { useBooking } from "../context/BookingContext";
import { Reveal } from "./Reveal";
import { Arrow, Container, SectionHeading } from "./ui";

export function Journey() {
  const { openBooking } = useBooking();

  return (
    <section
      id="journey"
      className="relative bg-[#070707] py-24 md:py-32 border-t border-[#D4AF37]/20 overflow-hidden"
    >
      <div
        className="ghost-num pointer-events-none absolute -top-10 left-6 select-none font-serif font-semibold text-[#D4AF37]/[0.035]"
        aria-hidden
      >
        08
      </div>

      <Container className="relative">
        <SectionHeading
          index="08"
          enTitle="TREATMENT PATH"
          title="مسیر درمان"
          lead="فرآیندی شفاف و گام‌به‌گام؛ از نخستین ارزیابی تا پایداری نتیجه."
        />

        {/* Numbered editorial layout — no icon-heavy timeline */}
        <div className="mt-14 divide-y divide-[#D4AF37]/20 border-y border-[#D4AF37]/20">
          {JOURNEY.map((s, i) => (
            <Reveal key={s.num} delay={i * 70}>
              <div className="group grid gap-3 py-8 transition-colors duration-300 hover:bg-[#0D0D0D] sm:grid-cols-12 sm:items-center sm:px-4">
                <div className="flex items-baseline gap-4 sm:col-span-4">
                  <span className="font-serif text-4xl font-light text-[#D4AF37] sm:text-5xl">
                    {s.num}
                  </span>
                  <span className="font-serif text-[10px] tracking-[0.25em] text-[#A7A39A]/60">
                    {s.enTitle}
                  </span>
                </div>
                <div className="sm:col-span-8">
                  <h3 className="text-lg font-semibold text-[#F5F2EA] transition-colors group-hover:text-[#E6C766]">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-[#A7A39A] sm:text-sm">
                    {s.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openBooking()}
              className="group inline-flex items-center justify-center gap-2 border border-[#D4AF37] bg-[#070707] px-7 py-3.5 text-xs font-semibold tracking-wide text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#070707]"
            >
              آغاز مسیر درمان
              <Arrow />
            </button>
            <a
              href="#booking"
              className="text-xs text-[#A7A39A] underline-offset-4 transition-colors hover:text-[#D4AF37] hover:underline"
            >
              رزرو مستقیم مشاوره ←
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
