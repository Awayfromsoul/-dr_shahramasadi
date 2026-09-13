import { MapPin } from "lucide-react";
import {
  ADDRESS_FULL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  MAPS_URL,
  NAV,
  PHONES,
} from "../data/content";
import { InstagramIcon } from "./icons";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="relative border-t border-[#D4AF37]/25 bg-[#070707] text-right">
      <div className="h-[1px] w-full bg-gradient-to-l from-transparent via-[#D4AF37]/45 to-transparent" />

      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="flex flex-col items-start text-right md:col-span-5">
            <span className="font-serif text-xl font-light tracking-[0.2em] text-[#D4AF37] sm:text-2xl">
              DR. SHAHRAM ASADI
            </span>
            <p className="mt-1.5 text-sm font-semibold text-[#F5F2EA]">دکتر شهرام اسعدی</p>
            <p className="mt-0.5 text-xs text-[#A7A39A]">
              متخصص بیماری‌های لثه و کاشت ایمپلنت
            </p>

            <div className="mt-5 w-full max-w-sm border border-[#D4AF37]/30 bg-[#0D0D0D] p-3.5 text-right">
              <span className="font-serif text-[10px] tracking-[0.2em] text-[#D4AF37]">
                SPECIALIZED PERIODONTICS
              </span>
              <p className="mt-0.5 text-xs text-[#F5F2EA]">
                بیش از ۵۰۰۰ ایمپلنت موفق از سال ۱۳۸۷ در تهران
              </p>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-xs font-medium text-[#A7A39A] transition-colors hover:text-[#D4AF37]"
            >
              <InstagramIcon className="h-4 w-4 text-[#D4AF37]" />
              {INSTAGRAM_HANDLE}
            </a>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <span className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37]">
              NAVIGATION
            </span>
            <ul className="mt-3.5 space-y-1">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="block py-1.5 text-xs text-[#A7A39A] transition-colors hover:text-[#D4AF37]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & address — three independent tel: links */}
          <div className="min-w-0 md:col-span-4">
            <span className="font-serif text-[11px] tracking-[0.25em] text-[#D4AF37]">
              CONTACT & ADDRESS
            </span>

            <p className="mt-3.5 text-xs text-[#A7A39A]">تماس با مطب:</p>
            <ul className="mt-1.5 flex flex-col">
              {PHONES.map((p) => (
                <li key={p.tel}>
                  <a
                    href={p.tel}
                    dir="ltr"
                    aria-label={`تماس با ${p.label}: ${p.display}`}
                    className="block py-1.5 text-right font-serif text-base font-medium tracking-wider text-[#D4AF37] transition-colors hover:text-[#E6C766] sm:text-lg"
                  >
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-[#A7A39A]">آدرس:</p>
            <address className="mt-1 text-xs leading-relaxed text-[#F5F2EA] not-italic">
              {ADDRESS_FULL}
            </address>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 border border-[#D4AF37]/50 px-4 py-2 text-xs font-semibold text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#070707]"
            >
              <MapPin className="h-3.5 w-3.5" />
              مشاهده لوکیشن
            </a>
          </div>
        </div>

        {/* Medical disclaimer */}
        <div className="mt-10 border border-white/10 bg-[#0D0D0D] p-4 sm:mt-14 sm:p-5">
          <p className="text-center text-[11px] leading-relaxed text-[#A7A39A]/75">
            محتوای این وب‌سایت صرفاً جهت اطلاع‌رسانی ارائه گردیده و هرگز جایگزین
            معاینه بالینی، تشخیص و طرح درمان حضوری توسط دندانپزشک متخصص نخواهد
            بود. نتایج درمان‌ها بر اساس ویژگی‌های بیولوژیک و آناتومیک هر بیمار
            متفاوت است.
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-center text-[11px] text-[#A7A39A]/60 sm:mt-8 sm:flex-row sm:text-right">
          <p>© {new Date().getFullYear()} دکتر شهرام اسعدی — متخصص بیماری‌های لثه و کاشت ایمپلنت</p>
          <p className="font-serif tracking-[0.2em] text-[#D4AF37]/70">DR. SHAHRAM ASADI</p>
        </div>
      </Container>
    </footer>
  );
}
