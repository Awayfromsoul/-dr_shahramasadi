import { OUT_OF_TOWN } from "../data/content";
import { useBooking } from "../context/BookingContext";
import { Reveal } from "./Reveal";
import { Arrow, Container, SectionHeading } from "./ui";

export function OutOfTown() {
  const { openBooking } = useBooking();

  return (
    <section id="out-of-town" className="relative bg-[#0D0D0D] py-24 md:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              enTitle="OUT-OF-TOWN PATIENTS"
              title="بیماران مراجعه‌کننده از شهرهای دیگر"
              lead="برنامه‌ریزی درمان به‌گونه‌ای که با سفر شما هماهنگ باشد؛ آرام، دقیق و از پیش طراحی‌شده."
            />
            <Reveal delay={100}>
              <p className="mt-6 text-sm leading-8 text-[#A7A39A]">
                اگر از شهر دیگری به تهران مراجعه می‌کنید، مراحل درمان از پیش با
                شما هماهنگ می‌شود تا مراجعات حضوری در حداقل زمان ممکن و با
                بیشترین بهره‌وری انجام شود.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {OUT_OF_TOWN.map((o, i) => (
                <Reveal key={o.num} delay={i * 70}>
                  <div className="group h-full border border-white/10 bg-[#070707] p-6 text-right transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-[#111111]">
                    <span className="font-serif text-2xl font-light text-[#D4AF37]">{o.num}</span>
                    <h3 className="mt-3 text-sm font-semibold text-[#F5F2EA]">{o.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#A7A39A]">{o.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <button
                onClick={() => openBooking()}
                className="group mt-8 inline-flex items-center justify-center gap-2 border border-[#D4AF37] bg-transparent px-7 py-3.5 text-xs font-semibold tracking-wide text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#070707]"
              >
                هماهنگی مشاوره اولیه
                <Arrow />
              </button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
