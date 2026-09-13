import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQ } from "../data/content";
import { Reveal } from "./Reveal";
import { Container, SectionHeading } from "./ui";
import { cn } from "../utils/cn";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative bg-[#070707] py-24 md:py-32 border-t border-[#D4AF37]/20"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            align="center"
            index="09"
            enTitle="FAQ"
            title="سوالات متداول"
            lead="پاسخ‌هایی شفاف بر پایه اصول بالینی؛ طرح درمان هر بیمار پس از معاینه مشخص می‌شود."
          />

          <div className="mt-14 divide-y divide-[#D4AF37]/20 border-y border-[#D4AF37]/20">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={Math.min(i, 4) * 40}>
                  <div>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-right focus:outline-none"
                    >
                      <span
                        className={cn(
                          "text-base font-medium transition-colors",
                          isOpen ? "text-[#E6C766]" : "text-[#F5F2EA] hover:text-[#D4AF37]"
                        )}
                      >
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "flex h-8 w-8 flex-none items-center justify-center border transition-all duration-300",
                          isOpen
                            ? "rotate-45 border-[#D4AF37] text-[#D4AF37]"
                            : "border-white/15 text-[#A7A39A]"
                        )}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      id={`faq-panel-${i}`}
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="text-xs leading-8 text-[#A7A39A] sm:text-sm">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
