/* ============================================================================
   PROFESSIONAL CREDENTIALS — the three REAL certificates supplied by the client
   ----------------------------------------------------------------------------
   Titles/descriptions below are written ONLY from text visibly readable on the
   uploaded documents. Attendance certificates are described as attendance —
   never as degrees. Save the original files in src/assets/certificates/ using
   the filenames listed in `file` (see README.md there).
   ============================================================================ */

const files = import.meta.glob<string>(
  "../assets/certificates/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG}",
  { eager: true, import: "default" }
);

function resolve(baseName: string): string | undefined {
  const key = Object.keys(files).find((k) => {
    const name = k.split("/").pop() ?? "";
    return name.replace(/\.[^.]+$/, "").toLowerCase() === baseName.toLowerCase();
  });
  return key ? files[key] : undefined;
}

export interface Certificate {
  id: string;
  num: string;
  file: string;
  src?: string;
  title: string;
  enTitle: string;
  kind: string;
  description: string;
  facts: { label: string; value: string }[];
  alt: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-01",
    num: "01",
    file: "certificate-01-laser-fellowship",
    src: resolve("certificate-01-laser-fellowship"),
    title: "فلوشیپ لیزر دندانپزشکی",
    enTitle: "LASER DENTISTRY FELLOWSHIP COURSE",
    kind: "CERTIFICATE OF ATTENDANCE",
    description:
      "گواهی حضور (Certificate of Attendance) دکتر شهرام اسعدی در دوره فلوشیپ لیزر دندانپزشکی، مرتبط با دانشگاه جنوا (Università degli Studi di Genova) — مرکز دپارتمانی جراحی و لیزرتراپی — با همکاری Doctor Smile؛ برگزارشده در ویچنزا، ایتالیا.",
    facts: [
      { label: "نوع سند", value: "گواهی حضور در دوره فلوشیپ" },
      { label: "نهاد مرتبط", value: "Università degli Studi di Genova · Doctor Smile" },
      { label: "محل و زمان", value: "Vicenza, Italy · June 2017" },
    ],
    alt: "گواهی حضور دکتر شهرام اسعدی در دوره فلوشیپ لیزر دندانپزشکی، دانشگاه جنوا، ایتالیا",
  },
  {
    id: "cert-02",
    num: "02",
    file: "certificate-02-restorative-congress",
    src: resolve("certificate-02-restorative-congress"),
    title: "گواهی شرکت در سمینارها و کنگره‌ها",
    enTitle: "10TH CONGRESS — IRANIAN ACADEMY OF RESTORATIVE DENTISTRY",
    kind: "CONTINUING EDUCATION CERTIFICATE",
    description:
      "گواهی شرکت دکتر شهرام اسعدی در دهمین کنگره انجمن متخصصین دندانپزشکی ترمیمی ایران (Materials & Techniques)، برگزارشده به مدت سه روز از ۱۲ تا ۱۴ آبان ۱۳۸۹، در چارچوب برنامه آموزش مداوم جامعه پزشکی. مطابق متن سند، این گواهی صرفاً دلیل شرکت در دوره آموزش مداوم است و جایگزین مدارک آموزشی تخصصی نیست.",
    facts: [
      { label: "صادرکننده", value: "انجمن متخصصین دندانپزشکی ترمیمی ایران" },
      { label: "برنامه", value: "دهمین کنگره انجمن — Materials & Techniques" },
      { label: "تاریخ", value: "۱۲ تا ۱۴ آبان ۱۳۸۹" },
    ],
    alt: "گواهی شرکت دکتر شهرام اسعدی در دهمین کنگره انجمن متخصصین دندانپزشکی ترمیمی ایران، آبان ۱۳۸۹",
  },
  {
    id: "cert-03",
    num: "03",
    file: "certificate-03-scientific-conference",
    src: resolve("certificate-03-scientific-conference"),
    title: "گواهی شرکت در کنفرانس‌های علمی",
    enTitle: "SCIENTIFIC CONFERENCE CERTIFICATE",
    kind: "CONTINUING EDUCATION CERTIFICATE",
    description:
      "گواهی شرکت دکتر شهرام اسعدی در برنامه آموزش مداوم (کنفرانس علمی) برگزارشده در دانشگاه علوم پزشکی لرستان، مورخ ۱۳۸۲/۱/۲۸، با امتیاز آموزش مداوم جامعه پزشکی. مطابق متن سند، این گواهی صرفاً دلیل شرکت در دوره آموزش مداوم است و جایگزین مدارک آموزشی و تخصصی نیست.",
    facts: [
      { label: "صادرکننده", value: "دانشگاه علوم پزشکی لرستان" },
      { label: "نوع برنامه", value: "کنفرانس علمی — آموزش مداوم" },
      { label: "تاریخ برنامه", value: "۱۳۸۲/۱/۲۸" },
    ],
    alt: "گواهی شرکت دکتر شهرام اسعدی در کنفرانس‌های علمی، دانشگاه علوم پزشکی لرستان، ۱۳۸۲",
  },
];
