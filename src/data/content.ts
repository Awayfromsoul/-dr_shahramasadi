/* ============================================================================
   DR. SHAHRAM ASADI — Black & Gold Luxury Editorial — Final Content
   ----------------------------------------------------------------------------
   IMAGE NOTE (NON-NEGOTIABLE):
   Placeholder medical imagery must be replaced with real patient images
   obtained with appropriate consent. Real supplied assets (doctor portraits,
   clinical photography, Before/After material, certificates, Instagram
   screenshots) take absolute priority. Do NOT generate fake patient results.

   ▸ HOW TO CHANGE A PICTURE — see src/data/images.ts and src/assets/README.md.
     Drop your file into src/assets/ with an accepted name; there is no import
     to edit in this file any more. Every picture is bundled locally, so the
     built site never depends on a remote URL or on files next to index.html.

   CLAIM DISCIPLINE:
   Only the client-approved wording "+5000 ایمپلنت موفق از سال ۱۳۸۷" is used.
   The separate "۲۰ هزار واحد ایمپلنت" material is NOT merged with it.
   ============================================================================ */

import { captionFor, folderImages, IMAGES } from "./images";

/** `1` → `۱` — used for auto-numbered gallery labels. */
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function toPersianDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

/* Every picture used below comes from the local image system. The names are
   kept identical to the old static imports so the rest of this file — and every
   component reading `IMG.*` — is unchanged. */
const {
  doctorHero,
  doctorAbout,
  doctorAboutAlt,
  implantMacro,
  implantModel,
  clinic,
  digitalPlan,
  gum,
  caseModel,
} = IMAGES;

/* ------------------------------ CONTACT ------------------------------- */
/* FINAL OFFICIAL CONTACT DATA — the only phone numbers used anywhere on the
   site. Visible formatting keeps the hyphens; tel: links use E.164. */
export interface PhoneEntry {
  label: string;
  display: string;
  tel: string;
  kind: "landline" | "mobile";
}

export const PHONES: PhoneEntry[] = [
  { label: "تلفن مطب ۱", display: "021-22879397", tel: "tel:+982122879397", kind: "landline" },
  { label: "تلفن مطب ۲", display: "021-22879395", tel: "tel:+982122879395", kind: "landline" },
  { label: "همراه", display: "09379509395", tel: "tel:+989379509395", kind: "mobile" },
];

/* Primary number — used where only ONE number fits (header, hero CTA). */
export const PRIMARY_PHONE = PHONES[0];
export const PHONE_DISPLAY = PRIMARY_PHONE.display;
export const PHONE_TEL = PRIMARY_PHONE.tel;

/* OFFICIAL Google Maps location supplied by the client — used for every
   map / directions / location CTA. */
export const MAPS_URL =
  "https://www.google.com/maps/place/%D8%AF%D9%86%D8%AF%D8%A7%D9%86%D9%BE%D8%B2%D8%B4%DA%A9%DB%8C+%D8%AF%DA%A9%D8%AA%D8%B1+%D8%B4%D9%87%D8%B1%D8%A7%D9%85+%D8%A7%D8%B3%D8%B9%D8%AF%DB%8C%E2%80%AD/@35.7600861,51.4431299,16z/data=!4m6!3m5!1s0x3f8e050a1f56d91b:0x1aa55392da54605d!8m2!3d35.7619666!4d51.4454473!16s%2Fg%2F11gy8ghpqt?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D";

export const ADDRESS_FULL =
  "تهران، خیابان شریعتی، بالاتر از میرداماد، روبروی مترو شریعتی، کوچه منظری‌نژاد (نیام)، پلاک ۴۵، واحد ۳، طبقه اول";

export const INSTAGRAM_URL = "https://www.instagram.com/dr_shahramasadii/";
export const INSTAGRAM_HANDLE = "@dr_shahramasadii";

/* Client-approved experience claim — use ONLY this wording */
export const APPROVED_CLAIM = {
  value: "+5000",
  label: "ایمپلنت موفق",
  since: "از سال ۱۳۸۷",
};

/**
 * Pictures for the whole site — always local, always defined.
 * To swap one, replace the file in `src/assets/` (see src/data/images.ts).
 */
export const IMG = {
  doctorHero,
  doctorAbout,
  doctorAboutAlt,
  implantMacro,
  implantModel,
  clinic,
  digitalPlan,
  gum,
  caseModel,
};

/* Re-exported so components can import either `IMG` or `IMAGES`. */
export { IMAGES, RESOLVED_SLOTS, type ImageKey } from "./images";

/* ------------------------------- NAV ---------------------------------- */
export const NAV = [
  { label: "درباره دکتر", id: "about" },
  { label: "خدمات", id: "services" },
  { label: "نمونه‌کارها", id: "cases" },
  { label: "سوابق حرفه‌ای", id: "experience" },
  { label: "مدارک و مجوزها", id: "credentials" },
  { label: "مسیر درمان", id: "journey" },
  { label: "سوالات متداول", id: "faq" },
  { label: "مطب", id: "location" },
];

/* ---------------------------- TRUST STRIP ------------------------------ */
export const TRUST_ITEMS = [
  "متخصص بیماری‌های لثه",
  "بورد تخصصی جراحی لثه و ایمپلنت",
  "فلوشیپ لیزر از جنوا، ایتالیا",
  "کاشت ایمپلنت و بازسازی بافت",
];

export const HERO_TAGS = ["متخصص بیماری‌های لثه", "کاشت ایمپلنت", "جراحی لثه"];

/* ---------------------------- PHILOSOPHY ------------------------------- */
export const PHILOSOPHY_HEADING = "درمان دقیق، نتیجه طبیعی، تصمیم آگاهانه";

export const PHILOSOPHY_PRINCIPLES = [
  { num: "01", title: "دقت در تشخیص", text: "ارزیابی جامع بافت لثه، استخوان و شرایط عمومی پیش از هر تصمیم." },
  { num: "02", title: "برنامه‌ریزی بلندمدت", text: "طراحی درمان با نگاه به ماندگاری و سلامت سال‌های آینده." },
  { num: "03", title: "نتیجه طبیعی", text: "هماهنگی با آناتومی چهره و عملکرد طبیعی دندان‌ها." },
  { num: "04", title: "درمان شخصی‌سازی‌شده", text: "هر طرح درمان بر اساس شرایط منحصربه‌فرد هر بیمار." },
  { num: "05", title: "تکنولوژی مدرن", text: "بهره‌گیری از ابزارهای دیجیتال و روش‌های کم‌تهاجمی." },
];

/* ------------------------ VERIFIED CREDENTIALS -------------------------- */
export const CREDENTIALS_LIST = [
  "متخصص بیماری‌های لثه",
  "بورد تخصصی جراحی لثه و ایمپلنت",
  "فلوشیپ لیزر از جنوا (ایتالیا)",
  "دارای دانشنامه تخصصی جراحی لثه",
];

/* ------------------------- APPROACH (ABOUT) ----------------------------- */
export const APPROACH = [
  {
    num: "01",
    enTitle: "DIAGNOSIS",
    title: "تشخیص دقیق",
    text: "بررسی جامع شرایط بالینی، بافت استخوان و سلامت لثه پیش از تدوین طرح درمان.",
  },
  {
    num: "02",
    enTitle: "PERSONALIZED PLAN",
    title: "طرح درمان اختصاصی",
    text: "برنامه‌ریزی متناسب با آناتومی، نیاز عملکردی و انتظار هر بیمار.",
  },
  {
    num: "03",
    enTitle: "PRECISION SURGERY",
    title: "جراحی با دقت بالا",
    text: "اجرای درمان در بالاترین استانداردهای تخصصی پریودنتولوژی.",
  },
  {
    num: "04",
    enTitle: "LONG-TERM CARE",
    title: "پیگیری و مراقبت",
    text: "پایش مرحله‌به‌مرحله ترمیم برای پایداری درازمدت نتیجه.",
  },
];

/* Real certificate documents live in src/data/certificates.ts (section 05). */

/* ---------------------- PROFESSIONAL EXPERIENCE -------------------------- */
export const EXPERIENCE = [
  {
    period: "از سال ۱۳۸۸ تا کنون",
    role: "سابقه کاری مستمر تخصصی",
    detail: "فعالیت مستمر در حوزه جراحی لثه و کاشت ایمپلنت.",
  },
  {
    period: APPROVED_CLAIM.since,
    role: `${APPROVED_CLAIM.value} ${APPROVED_CLAIM.label}`,
    detail: "طبق عبارت تأییدشده توسط مطب.",
  },
  {
    period: "تخصص بالینی",
    role: "متخصص جراحی لثه و ایمپلنت",
    detail: "تمرکز بر درمان‌های پیشرفته لثه، بازسازی بافت و ایمپلنتولوژی.",
  },
];

/* ------------------------------ SERVICES --------------------------------- */
export interface Service {
  num: string;
  enTitle: string;
  title: string;
  desc: string;
  tag: string;
}

export const SERVICES: Service[] = [
  {
    num: "01",
    enTitle: "DENTAL IMPLANT",
    title: "کاشت ایمپلنت",
    desc: "جایگزینی دقیق دندان از دست رفته با برنامه‌ریزی اختصاصی و استانداردهای پریودنتولوژی.",
    tag: "کاشت ایمپلنت",
  },
  {
    num: "02",
    enTitle: "PERIODONTAL SURGERY",
    title: "جراحی لثه",
    desc: "جراحی‌های تخصصی بافت لثه و بازسازی بافت‌های پشتیبان دندان.",
    tag: "جراحی لثه",
  },
  {
    num: "03",
    enTitle: "GUM DISEASE TREATMENT",
    title: "درمان بیماری‌های لثه",
    desc: "درمان قطعی عفونت‌ها و التهاب‌های بافت لثه و کنترل پریودنتیت.",
    tag: "درمان بیماری‌های لثه",
  },
  {
    num: "04",
    enTitle: "BONE GRAFTING",
    title: "جراحی و بازسازی استخوان",
    desc: "پیوند و بازسازی استخوان فک جهت فراهم‌سازی بستر مناسب ایمپلنت.",
    tag: "بازسازی استخوان",
  },
  {
    num: "05",
    enTitle: "SOFT TISSUE GRAFT",
    title: "پیوند بافت نرم",
    desc: "ترمیم و تقویت بافت نرم لثه برای پایداری و زیبایی نتیجه درمان.",
    tag: "پیوند بافت نرم",
  },
  {
    num: "06",
    enTitle: "DIGITAL IMPLANT PLANNING",
    title: "ایمپلنت دیجیتال",
    desc: "برنامه‌ریزی سه‌بعدی و جراحی هدایت‌شده بر پایه تصاویر CBCT.",
    tag: "ایمپلنت دیجیتال",
  },
  {
    num: "07",
    enTitle: "LASER DENTISTRY",
    title: "درمان‌های لیزری",
    desc: "به‌کارگیری لیزر در موارد انتخابی درمان‌های بافت نرم — فلوشیپ لیزر از جنوا، ایتالیا.",
    tag: "درمان‌های لیزری",
  },
  {
    num: "08",
    enTitle: "COMPLEX RECONSTRUCTION",
    title: "بازسازی و درمان‌های پیچیده",
    desc: "مدیریت کیس‌های پیچیده با ترکیب بازسازی استخوان، بافت نرم و ایمپلنت.",
    tag: "بازسازی و درمان‌های پیچیده",
  },
];

/* ------------------------- CASE LIBRARY ---------------------------------- */
export type CaseCategory =
  | "همه"
  | "ایمپلنت"
  | "جراحی لثه"
  | "بازسازی"
  | "ترمیم"
  | "زیبایی";

export const CASE_CATEGORIES: CaseCategory[] = [
  "همه",
  "ایمپلنت",
  "جراحی لثه",
  "بازسازی",
  "ترمیم",
  "زیبایی",
];

export interface CaseItem {
  id: string;
  num: string;
  title: string;
  enTitle: string;
  category: Exclude<CaseCategory, "همه">;
  image: string;
  /* Real patient cases supply an authentic BEFORE/AFTER pair instead of a
     single placeholder plate. When present, no filter is applied. */
  beforeImage?: string;
  afterImage?: string;
  beforeFile?: string;
  afterFile?: string;
  /** Tailwind aspect class — real clinical pairs use the source ratio so the
      treatment area is never cropped. Defaults to the editorial 4/5 plate. */
  aspect?: string;
  duration: string;
  tags: string[];
  note: string;
}

/* Placeholder plates — replace with real consented patient images. */
export const CASES: CaseItem[] = [
  {
    id: "c1",
    num: "01",
    title: "کاشت ایمپلنت در ناحیه خلفی فک",
    enTitle: "POSTERIOR IMPLANT PLACEMENT",
    category: "ایمپلنت",
    image: implantModel,
    duration: "طرح درمان مرحله‌ای",
    tags: ["کاشت ایمپلنت", "پروتز"],
    note: "نمونه جایگزین — تصویر واقعی بیمار پس از اخذ رضایت جایگزین می‌شود.",
  },
  {
    id: "c2",
    num: "02",
    title: "جراحی و بازسازی بافت لثه",
    enTitle: "PERIODONTAL TISSUE SURGERY",
    category: "جراحی لثه",
    image: gum,
    duration: "دوره کنترل و ترمیم",
    tags: ["جراحی لثه", "بافت نرم"],
    note: "نمونه جایگزین — تصویر واقعی بیمار پس از اخذ رضایت جایگزین می‌شود.",
  },
  {
    id: "c3",
    num: "03",
    title: "بازسازی استخوان و کاشت فیکسچر",
    enTitle: "BONE GRAFTING & FIXTURE",
    category: "بازسازی",
    image: implantMacro,
    duration: "طرح درمان چندماهه",
    tags: ["پیوند استخوان", "ایمپلنت"],
    note: "نمونه جایگزین — تصویر واقعی بیمار پس از اخذ رضایت جایگزین می‌شود.",
  },
  {
    id: "c4",
    num: "04",
    title: "ایمپلنت با برنامه‌ریزی دیجیتال",
    enTitle: "DIGITALLY PLANNED IMPLANT",
    category: "ایمپلنت",
    image: digitalPlan,
    duration: "جراحی هدایت‌شده",
    tags: ["ایمپلنت دیجیتال", "جراحی هدایت‌شده"],
    note: "نمونه جایگزین — تصویر واقعی بیمار پس از اخذ رضایت جایگزین می‌شود.",
  },
  {
    id: "c5",
    num: "05",
    title: "ترمیم و بازسازی پروتزی",
    enTitle: "PROSTHETIC RESTORATION",
    category: "ترمیم",
    image: caseModel,
    duration: "چند جلسه ترمیمی",
    tags: ["ترمیم", "پروتز"],
    note: "نمونه جایگزین — تصویر واقعی بیمار پس از اخذ رضایت جایگزین می‌شود.",
  },
  {
    id: "c6",
    num: "06",
    title: "هماهنگی لبخند و بافت نرم",
    enTitle: "SMILE & SOFT TISSUE HARMONY",
    category: "زیبایی",
    image: doctorAboutAlt,
    duration: "بسته به طرح درمان",
    tags: ["زیبایی", "بافت نرم"],
    note: "نمونه جایگزین — تصویر واقعی بیمار پس از اخذ رضایت جایگزین می‌شود.",
  },
];

/* ------------------------- CLINICAL GALLERY ------------------------------- */
export type GalleryCategory =
  | "همه"
  | "Implant Surgery"
  | "Periodontal Surgery"
  | "Digital Dentistry"
  | "Clinical Experience";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "همه",
  "Implant Surgery",
  "Periodontal Surgery",
  "Digital Dentistry",
  "Clinical Experience",
];

export interface GalleryItem {
  id: string;
  src: string;
  category: Exclude<GalleryCategory, "همه">;
  faLabel: string;
  alt: string;
  tall?: boolean;
}

/* ── GALLERY PICTURES ───────────────────────────────────────────────────────
   ▸ DROP FOLDER: `src/assets/gallery/`
     Every image saved there appears in this gallery automatically — no code
     edit needed. Add `src/assets/gallery/captions.json` to give each one a
     Persian label, alt text and category:

       { "implant-01.jpg": { "label": "جراحی ایمپلنت",
                             "alt": "…",
                             "category": "Implant Surgery" } }

     While that folder is empty the curated sample plates below are used, and
     the section keeps its "these are samples" footnote.
   ──────────────────────────────────────────────────────────────────────── */
const GALLERY_DROP_FOLDER = folderImages("gallery");

/** `true` once real images have been dropped into `src/assets/gallery/`. */
export const HAS_CUSTOM_GALLERY = GALLERY_DROP_FOLDER.length > 0;

const DEFAULT_GALLERY_CATEGORY: Exclude<GalleryCategory, "همه"> = "Clinical Experience";

function isGalleryCategory(value: unknown): value is Exclude<GalleryCategory, "همه"> {
  return (
    typeof value === "string" &&
    value !== "همه" &&
    (GALLERY_CATEGORIES as string[]).includes(value)
  );
}

const CUSTOM_GALLERY: GalleryItem[] = GALLERY_DROP_FOLDER.map((entry, i) => {
  const caption = captionFor(entry);
  const label = caption.label?.trim() || `تصویر کلینیکی ${toPersianDigits(i + 1)}`;
  return {
    id: `gallery-${entry.slug || i}`,
    src: entry.src,
    category: isGalleryCategory(caption.category)
      ? caption.category
      : DEFAULT_GALLERY_CATEGORY,
    faLabel: label,
    alt: caption.alt?.trim() || `${label} — مطب دکتر شهرام اسعدی`,
    /* Alternate the plate height so the masonry column layout keeps its rhythm. */
    tall: i % 2 === 0,
  };
});

/* Placeholder clinical photography — replace by dropping files into
   src/assets/gallery/ (see above) or by editing this list. */
const CURATED_GALLERY: GalleryItem[] = [
  {
    id: "g1",
    src: implantModel,
    category: "Implant Surgery",
    faLabel: "جراحی ایمپلنت",
    alt: "فیکسچر ایمپلنت متصل به مدل استخوان فک",
    tall: true,
  },
  {
    id: "g2",
    src: gum,
    category: "Periodontal Surgery",
    faLabel: "جراحی لثه",
    alt: "درمان تخصصی بافت لثه در محیط کلینیکی",
  },
  {
    id: "g3",
    src: digitalPlan,
    category: "Digital Dentistry",
    faLabel: "دندانپزشکی دیجیتال",
    alt: "برنامه‌ریزی سه‌بعدی ایمپلنت روی تصاویر فک",
    tall: true,
  },
  {
    id: "g4",
    src: implantMacro,
    category: "Implant Surgery",
    faLabel: "جراحی ایمپلنت",
    alt: "فیکسچر تیتانیومی ایمپلنت با جزئیات دقیق",
  },
  {
    id: "g5",
    src: clinic,
    category: "Clinical Experience",
    faLabel: "تجربه کلینیکی",
    alt: "محیط مطب تخصصی دکتر شهرام اسعدی",
    tall: true,
  },
  {
    id: "g6",
    src: caseModel,
    category: "Implant Surgery",
    faLabel: "جراحی ایمپلنت",
    alt: "قوس دندانی بازسازی‌شده روی مدل ایمپلنت",
  },
  {
    id: "g7",
    src: doctorAbout,
    category: "Clinical Experience",
    faLabel: "تجربه کلینیکی",
    alt: "دکتر شهرام اسعدی در حال بررسی تصاویر درمان",
  },
];

/** What `ClinicalGallery.tsx` renders — dropped-in images win over the samples. */
export const GALLERY_ITEMS: GalleryItem[] = HAS_CUSTOM_GALLERY
  ? CUSTOM_GALLERY
  : CURATED_GALLERY;

/* --------------------------- PATIENT JOURNEY ------------------------------ */
export const JOURNEY = [
  { num: "01", enTitle: "CONSULTATION", title: "مشاوره و ارزیابی", text: "گفتگوی اولیه، بررسی سوابق و ارزیابی وضعیت دهان و دندان‌ها." },
  { num: "02", enTitle: "EVALUATION", title: "بررسی شرایط لثه و استخوان", text: "تحلیل تصاویر و ارزیابی سلامت بافت لثه و تراکم استخوان فک." },
  { num: "03", enTitle: "TREATMENT DESIGN", title: "طراحی طرح درمان", text: "تدوین برنامه درمان اختصاصی و تبیین مراحل آن برای بیمار." },
  { num: "04", enTitle: "SURGERY / TREATMENT", title: "جراحی / درمان", text: "اجرای درمان در چارچوب برنامه‌ریزی‌شده با دقت تخصصی." },
  { num: "05", enTitle: "FOLLOW-UP", title: "پیگیری و مراقبت", text: "مراقبت‌های پس از درمان و مراجعات دوره‌ای برای پایداری نتیجه." },
];

/* ------------------------ OUT-OF-TOWN PATIENTS ---------------------------- */
export const OUT_OF_TOWN = [
  {
    num: "01",
    title: "مشاوره اولیه و بررسی سوابق",
    text: "پیش از سفر، شرایط شما بر اساس سوابق و تصاویر ارسالی بررسی می‌شود.",
  },
  {
    num: "02",
    title: "برنامه‌ریزی طرح درمان",
    text: "مراحل درمان به‌گونه‌ای طراحی می‌شود که با زمان حضور شما هماهنگ باشد.",
  },
  {
    num: "03",
    title: "هماهنگی نوبت و زمان‌بندی",
    text: "جلسات درمان با هماهنگی مطب و متناسب با برنامه سفر شما زمان‌بندی می‌شود.",
  },
  {
    num: "04",
    title: "پیگیری پس از درمان",
    text: "دستورالعمل‌های مراقبت و برنامه پیگیری پس از بازگشت به شهر محل سکونت.",
  },
];

/* --------------------------------- FAQ ----------------------------------- */
export const FAQ = [
  {
    q: "ایمپلنت برای چه افرادی مناسب است؟",
    a: "مناسب بودن ایمپلنت به وضعیت استخوان فک، سلامت بافت لثه و شرایط عمومی سلامت بستگی دارد. این موضوع تنها پس از معاینه بالینی و بررسی تصاویر مشخص می‌شود.",
  },
  {
    q: "آیا قبل از ایمپلنت نیاز به پیوند استخوان وجود دارد؟",
    a: "در صورتی که حجم یا تراکم استخوان فک کافی نباشد، ممکن است پیوند استخوان توصیه شود. نیاز به پیوند پس از ارزیابی تصاویر سه‌بعدی تعیین می‌گردد.",
  },
  {
    q: "فرآیند کاشت ایمپلنت چقدر زمان می‌برد؟",
    a: "مدت زمان درمان به شرایط هر بیمار بستگی دارد و شامل مرحله جراحی، دوره ترمیم و بازسازی پروتزی است. زمان‌بندی دقیق پس از معاینه و در طرح درمان اعلام می‌شود.",
  },
  {
    q: "آیا درمان لثه قبل از ایمپلنت ضروری است؟",
    a: "بله. سلامت بافت لثه از عوامل مهم در ماندگاری ایمپلنت است؛ در صورت وجود بیماری لثه، ابتدا درمان آن در اولویت قرار می‌گیرد.",
  },
  {
    q: "ایمپلنت دیجیتال چیست؟",
    a: "در ایمپلنت دیجیتال، موقعیت ایمپلنت پیش از جراحی بر پایه تصاویر سه‌بعدی و اسکن‌های داخل‌دهانی برنامه‌ریزی می‌شود تا دقت جراحی افزایش یابد.",
  },
  {
    q: "آیا درمان با لیزر برای همه بیماران مناسب است؟",
    a: "خیر. کاربرد لیزر به شرایط بالینی هر بیمار بستگی دارد و تنها در موارد انتخابی و بر اساس ارزیابی پزشک به کار می‌رود.",
  },
  {
    q: "هزینه درمان چگونه تعیین می‌شود؟",
    a: "هزینه درمان بر اساس نوع درمان، شرایط بالینی و طرح درمان اختصاصی هر بیمار تعیین می‌شود و پس از معاینه به‌صورت شفاف اعلام می‌گردد.",
  },
];

/* ------------------------------- ADDRESS ---------------------------------- */
export const ADDRESS_LINES = [
  "تهران، خیابان شریعتی،",
  "بالاتر از میرداماد،",
  "روبروی مترو شریعتی،",
  "کوچه منظری‌نژاد (نیام)،",
  "پلاک ۴۵،",
  "واحد ۳، طبقه اول",
];

/* --------------------------- TREATMENT OPTIONS ----------------------------- */
export const TREATMENT_OPTIONS = [
  "کاشت ایمپلنت",
  "جراحی لثه",
  "درمان بیماری‌های لثه",
  "بازسازی استخوان",
  "پیوند بافت نرم",
  "ایمپلنت دیجیتال",
  "درمان‌های لیزری",
  "سایر",
];
