import { BookingForm } from "./BookingForm";
import { PhoneList } from "./PhoneList";
import { Reveal } from "./Reveal";
import { Container } from "./ui";

/**
 * BOOK A CONSULTATION — large black section, thin champagne-gold frame,
 * large elegant typography.
 */
export function BookingSection() {
  return (
    <section
      id="booking"
      className="relative bg-[#070707] py-24 md:py-32 border-t border-[#D4AF37]/20"
    >
      <Container>
        <Reveal>
          <div className="relative border border-[#D4AF37]/40 bg-[#0D0D0D] p-5 sm:p-10 lg:p-16">
            {/* corner ticks */}
            <div className="pointer-events-none absolute -top-px -right-px h-7 w-7 border-t-2 border-r-2 border-[#D4AF37]" aria-hidden />
            <div className="pointer-events-none absolute -bottom-px -left-px h-7 w-7 border-b-2 border-l-2 border-[#D4AF37]" aria-hidden />

            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Large typography */}
              <div className="flex flex-col text-right lg:col-span-5">
                <span className="font-serif text-[11px] font-medium tracking-[0.32em] text-[#D4AF37] uppercase">
                  BOOK A CONSULTATION
                </span>
                <h2 className="mt-4 font-serif text-3xl leading-[1.3] text-[#F5F2EA] sm:text-4xl lg:text-5xl">
                  رزرو مشاوره
                </h2>
                <p className="mt-5 text-sm leading-8 text-[#A7A39A]">
                  برای بررسی شرایط لثه و استخوان و طراحی طرح درمان اختصاصی،
                  درخواست مشاوره خود را ثبت کنید؛ همکاران مطب برای هماهنگی با
                  شما تماس می‌گیرند.
                </p>

                <div className="mt-8 border-t border-[#D4AF37]/25 pt-6">
                  <span className="font-serif text-[10px] tracking-[0.25em] text-[#D4AF37]">
                    CONTACT THE CLINIC
                  </span>
                  <p className="mt-1 text-sm font-medium text-[#F5F2EA]">تماس با مطب</p>
                  <PhoneList className="mt-3" size="sm" />
                </div>

                <span className="mt-auto hidden pt-10 font-serif text-[10px] tracking-[0.3em] text-[#A7A39A]/50 lg:block">
                  DR. SHAHRAM ASADI — PERIODONTICS & IMPLANT SURGERY
                </span>
              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <BookingForm compact={false} />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
