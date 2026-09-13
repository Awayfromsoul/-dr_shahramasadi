import { SERVICES } from "../data/content";
import { useBooking } from "../context/BookingContext";
import { Reveal } from "./Reveal";
import { Arrow, Container, SectionHeading } from "./ui";

export function Services() {
  const { openBooking } = useBooking();

  return (
    <section
      id="services"
      className="relative bg-[#070707] py-24 md:py-32 border-t border-[#D4AF37]/20"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            index="03"
            enTitle="SERVICES"
            title="خدمات تخصصی"
            lead="درمان‌های پیشرفته پریودنتولوژی و ایمپلنتولوژی با محوریت طرح درمان شخصی‌سازی‌شده."
          />
          <span className="hidden font-serif text-[11px] tracking-[0.3em] text-[#A7A39A]/60 md:block">
            08 SPECIALTIES
          </span>
        </div>

        {/* Large editorial rows */}
        <div className="mt-14 divide-y divide-[#D4AF37]/20 border-y border-[#D4AF37]/20">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={Math.min(i, 4) * 60}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => openBooking(s.tag)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openBooking(s.tag);
                  }
                }}
                aria-label={`رزرو مشاوره ${s.title}`}
                className="group relative flex cursor-pointer flex-col justify-between gap-5 bg-[#070707] p-6 transition-all duration-300 hover:bg-[#111111] focus:outline-none sm:p-8 lg:flex-row lg:items-center lg:gap-10"
              >
                {/* Number + titles */}
                <div className="flex items-start gap-6 lg:items-center lg:gap-10">
                  <span className="font-serif text-3xl font-light text-[#D4AF37] transition-colors group-hover:text-[#E6C766] sm:text-4xl">
                    {s.num}
                  </span>
                  <div>
                    <span className="font-serif text-[10px] tracking-[0.24em] text-[#A7A39A]/70 uppercase transition-colors group-hover:text-[#D4AF37]">
                      {s.enTitle}
                    </span>
                    <h3 className="mt-1 text-xl font-semibold text-[#F5F2EA] sm:text-2xl">
                      {s.title}
                    </h3>
                  </div>
                </div>

                {/* Description + gold arrow */}
                <div className="flex items-center justify-between gap-8 lg:justify-end">
                  <p className="max-w-md text-xs leading-relaxed text-[#A7A39A] sm:text-sm">
                    {s.desc}
                  </p>
                  <span className="flex h-11 w-11 flex-none items-center justify-center border border-[#D4AF37]/35 text-[#D4AF37] transition-all duration-300 group-hover:translate-x-[-4px] group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#070707]">
                    <Arrow />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
