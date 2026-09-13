import { CREDENTIALS_LIST, EXPERIENCE } from "../data/content";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./ui";

/** PROFESSIONAL EXPERIENCE — verified wording only; documents live in 05. */
export function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-[#D4AF37]/20 bg-[#0D0D0D] py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              enTitle="PROFESSIONAL EXPERIENCE"
              title="سوابق و تجربه حرفه‌ای"
              lead="اعتبارنامه‌ها و سابقه فعالیت تخصصی — مستندات مربوطه در بخش «مدارک و مجوزهای حرفه‌ای» قابل مشاهده است."
            />
            <Reveal delay={100}>
              <ul className="mt-8 space-y-3 border border-[#D4AF37]/28 bg-[#070707] p-6">
                {CREDENTIALS_LIST.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-sm text-[#F5F2EA]">
                    <span className="h-1.5 w-1.5 flex-none rotate-45 border border-[#D4AF37]" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-[#D4AF37]/20 border-y border-[#D4AF37]/20">
              {EXPERIENCE.map((e, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="group grid gap-3 py-7 sm:grid-cols-12 sm:items-center">
                    <span className="font-serif text-sm tracking-[0.15em] text-[#D4AF37] sm:col-span-4">
                      {e.period}
                    </span>
                    <div className="sm:col-span-8">
                      <h3 className="text-base font-semibold text-[#F5F2EA] transition-colors group-hover:text-[#E6C766]">
                        {e.role}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#A7A39A]">{e.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <a
              href="#credentials"
              className="mt-8 inline-flex items-center gap-2 text-xs text-[#A7A39A] underline-offset-4 transition-colors hover:text-[#D4AF37] hover:underline"
            >
              مشاهده مدارک و مجوزهای حرفه‌ای ←
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
