import { IMG, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../data/content";
import { captionFor, folderImages } from "../data/images";
import { InstagramIcon } from "./icons";
import { Reveal } from "./Reveal";
import { Arrow, Container, SectionHeading } from "./ui";

/* ── INSTAGRAM PICTURES ─────────────────────────────────────────────────────
   ▸ DROP FOLDER: `src/assets/instagram/`
     Save screenshots of real posts there and this grid fills itself — the
     samples below are used only while that folder is empty.
     Optional `src/assets/instagram/captions.json` adds Persian alt text and a
     permalink for each post:

       { "post-01.jpg": { "alt": "کیس ایمپلنت…",
                          "href": "https://www.instagram.com/p/…" } }

   Every image is bundled locally, so the grid keeps working after
   `npm run build` with no Instagram API, token or remote request.
   ──────────────────────────────────────────────────────────────────────── */
interface Post {
  src: string;
  alt: string;
  href: string;
}

const SAMPLE_POSTS: Post[] = [
  { src: IMG.doctorHero, alt: "دکتر شهرام اسعدی — متخصص لثه و ایمپلنت", href: INSTAGRAM_URL },
  { src: IMG.implantMacro, alt: "فیکسچر دقیق ایمپلنت تیتانیومی", href: INSTAGRAM_URL },
  { src: IMG.caseModel, alt: "بازسازی قوس دندانی روی مدل ایمپلنت", href: INSTAGRAM_URL },
  { src: IMG.digitalPlan, alt: "برنامه‌ریزی سه‌بعدی دیجیتال فک", href: INSTAGRAM_URL },
  { src: IMG.gum, alt: "درمان تخصصی بافت لثه", href: INSTAGRAM_URL },
  { src: IMG.clinic, alt: "محیط مطب دکتر شهرام اسعدی", href: INSTAGRAM_URL },
];

const DROPPED_POSTS: Post[] = folderImages("instagram").map((entry) => {
  const caption = captionFor(entry);
  return {
    src: entry.src,
    alt: caption.alt?.trim() || caption.label?.trim() || `پست اینستاگرام ${entry.fileName}`,
    href: caption.href?.trim() || INSTAGRAM_URL,
  };
});

const POSTS: Post[] = DROPPED_POSTS.length ? DROPPED_POSTS : SAMPLE_POSTS;

export function InstagramFeed() {
  return (
    <section
      id="instagram"
      className="relative bg-[#070707] py-24 md:py-32 border-t border-[#D4AF37]/20"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            index="06"
            enTitle="INSTAGRAM"
            title="اینستاگرام دکتر اسعدی"
            lead="مستندسازی کیس‌های بالینی، فرآیندهای جراحی و محتوای آموزشی تخصصی."
          />

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-[#D4AF37]/50 bg-transparent px-6 py-3 text-xs font-semibold text-[#D4AF37] transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#070707]"
          >
            <InstagramIcon className="h-4 w-4" />
            مشاهده اینستاگرام
            <Arrow />
          </a>
        </div>

        {/* Editorial grid — each post links to the real profile */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={`${p.src}-${i}`} delay={i * 60}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden border border-white/10 bg-[#0D0D0D] transition-all duration-300 hover:border-[#D4AF37]"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover object-center brightness-[0.92] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070707]/80 p-4 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <InstagramIcon className="h-6 w-6 text-[#D4AF37]" />
                  <span className="mt-2 font-serif text-[11px] tracking-wider text-[#F5F2EA]">
                    {INSTAGRAM_HANDLE}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Profile banner — no invented statistics */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border border-[#D4AF37]/25 bg-[#0D0D0D] p-6 text-center sm:flex-row sm:text-right">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-[#D4AF37]/50 text-[#D4AF37]">
              <InstagramIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-serif text-sm tracking-wider text-[#D4AF37]">
                {INSTAGRAM_HANDLE}
              </p>
              <p className="text-xs text-[#A7A39A]">
                صفحه رسمی دکتر شهرام اسعدی — نمونه‌کارها و اطلاع‌رسانی تخصصی
              </p>
            </div>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#D4AF37] px-6 py-2.5 text-xs font-semibold text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-[#070707]"
          >
            دنبال کردن صفحه
          </a>
        </div>
      </Container>
    </section>
  );
}
