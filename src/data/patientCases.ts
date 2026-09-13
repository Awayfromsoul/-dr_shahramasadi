/* ============================================================================
   REAL PATIENT CASE — BEFORE / AFTER
   ----------------------------------------------------------------------------
   FILE NAME DEFINES THE ROLE — this mapping is mandatory and must never be
   reversed or "corrected" by judging what the images look like:

       src/assets/cases/2.png   →  BEFORE   (قبل)
       src/assets/cases/1.png   →  AFTER    (بعد)

   The two files are the SAME patient case and are always presented together
   as one comparison. They are rendered with NO filters, NO retouching and NO
   recolouring — only responsive sizing, aspect-ratio reservation and lazy
   loading. The container ratio matches the source (4:3) so nothing clinical
   is cropped away.
   ============================================================================ */

const files = import.meta.glob<string>(
  "../assets/cases/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, import: "default" }
);

function resolve(name: string): string | undefined {
  const key = Object.keys(files).find(
    (k) => (k.split("/").pop() ?? "").toLowerCase() === name.toLowerCase()
  );
  return key ? files[key] : undefined;
}

export const REAL_CASE = {
  id: "real-case-01",
  num: "01",
  /* 2.png = BEFORE (locked) */
  before: resolve("2.png"),
  beforeFile: "2.png",
  /* 1.png = AFTER (locked) */
  after: resolve("1.png"),
  afterFile: "1.png",
  title: "بازسازی پروتز ایمپلنت‌پایه",
  enTitle: "IMPLANT-SUPPORTED PROSTHESIS",
  category: "ایمپلنت" as const,
  duration: "بر اساس طرح درمان اختصاصی",
  tags: ["ایمپلنت", "پروتز ایمپلنت‌پایه"],
  note: "پرونده واقعی بیمار — تصاویر بدون هیچ‌گونه تغییر یا بازسازی در نتایج درمان ارائه شده‌اند.",
  alt: "مقایسه قبل و بعد از بازسازی پروتز ایمپلنت‌پایه — تصاویر واقعی بیمار",
  /* Source ratio is 4:3 — kept identical so the clinical area is never cropped. */
  aspect: "aspect-[4/3]",
};
