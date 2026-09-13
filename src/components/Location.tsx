import { Navigation, MapPin } from "lucide-react";
import { ADDRESS_LINES, IMG, MAPS_URL } from "../data/content";
import { useBooking } from "../context/BookingContext";
import { PhoneList } from "./PhoneList";
import { Reveal } from "./Reveal";
import { Arrow, Container, SectionHeading } from "./ui";

export function LocationSection() {
  const { openBooking } = useBooking();

  return (
    <section
      id="location"
      className="relative border-t border-[#D4AF37]/20 bg-[#070707] py-24 md:py-32"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Map-style preview — links to the official Google Maps location */}
          <div className="min-w-0 lg:col-span-5">
            <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="مشاهده لوکیشن مطب در گوگل مپس"
                className="group relative block w-full overflow-hidden border border-[#D4AF37]/35 bg-[#0D0D0D] focus:outline-none"
              >
                <img
                  src={IMG.clinic}
                  alt="موقعیت مطب دندانپزشکی دکتر شهرام اسعدی در خیابان شریعتی"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover object-center opacity-55 grayscale-[0.35] transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/30 to-transparent"
                  aria-hidden
                />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37] bg-[#070707]/90 text-[#D4AF37] shadow-[0_0_0_10px_rgba(212,175,55,0.12)] transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#070707]">
                    <MapPin className="h-5 w-5" />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-[#D4AF37]/30 bg-[#070707]/90 p-4 backdrop-blur-md">
                  <div className="min-w-0">
                    <span className="font-serif text-[10px] tracking-[0.3em] text-[#D4AF37]">
                      SHARIATI · TEHRAN
                    </span>
                    <p className="mt-1 truncate text-xs text-[#F5F2EA]">
                      خیابان شریعتی، بالاتر از میرداماد، روبروی مترو شریعتی
                    </p>
                  </div>
                  <span className="flex-none text-[11px] text-[#D4AF37]">مشاهده لوکیشن ←</span>
                </div>
              </a>
            </Reveal>
          </div>

          {/* Address, phones & actions */}
          <div className="flex min-w-0 flex-col text-right lg:col-span-7">
            <SectionHeading
              index="07"
              enTitle="CLINIC LOCATION"
              title="مطب دکتر شهرام اسعدی"
            />

            <Reveal delay={90}>
              <div className="mt-8 border border-[#D4AF37]/28 bg-[#0D0D0D] p-6 sm:p-7">
                <span className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37]">
                  ADDRESS
                </span>
                <address className="mt-4 flex flex-col gap-2 not-italic">
                  {ADDRESS_LINES.map((line) => (
                    <span key={line} className="flex items-center gap-3 text-sm text-[#F5F2EA]">
                      <span className="h-1.5 w-1.5 flex-none rotate-45 border border-[#D4AF37]" aria-hidden />
                      {line}
                    </span>
                  ))}
                </address>

                <div className="my-6 border-t border-white/10" />

                <span className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37]">
                  CONTACT
                </span>
                <p className="mt-1 text-sm font-medium text-[#F5F2EA]">تماس با مطب</p>
                <PhoneList className="mt-3" size="md" />
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 border border-[#D4AF37] bg-[#D4AF37] px-6 py-3 text-xs font-semibold text-[#070707] transition-all duration-300 hover:bg-[#E6C766]"
                >
                  <Navigation className="h-4 w-4" />
                  مسیریابی تا مطب
                </a>

                <button
                  onClick={() => openBooking()}
                  className="group inline-flex min-h-[48px] items-center gap-2 border border-white/20 bg-transparent px-6 py-3 text-xs text-[#F5F2EA] transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  رزرو مشاوره
                  <Arrow />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
