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

   ▸ TO ADD / CHANGE THESE PICTURES
     Drop them into `src/assets/cases/`. `2.*` and `1.*` are the locked names,
     but these friendlier aliases are accepted too and mean exactly the same
     thing — BEFORE stays BEFORE, AFTER stays AFTER:

        BEFORE :  2.png · 2.jpg · before.png · case-01-before.jpg · case-before.*
        AFTER  :  1.png · 1.jpg · after.png  · case-01-after.jpg  · case-after.*

     Any extension works (.jpg .jpeg .png .webp .avif), in any letter case, and
     doubled extensions such as `2.jpg.png` are matched too — the shared image
     system (src/data/images.ts) strips every extension before comparing.
     Until at least one of the two exists, CASE 01 is left out of the section
     rather than showing a broken frame or a fake result.
   ============================================================================ */

import { findFirstImage, type ImageEntry } from "./images";

const CASE_FOLDERS = ["cases", "*"];

/** Locked names first, then the friendly aliases. Order = priority. */
const BEFORE_NAMES = ["2", "before", "case-01-before", "case-before", "before-2"];
const AFTER_NAMES = ["1", "after", "case-01-after", "case-after", "after-1"];

function resolve(names: string[]): ImageEntry | undefined {
  return findFirstImage(names, CASE_FOLDERS);
}

const beforeEntry = resolve(BEFORE_NAMES);
const afterEntry = resolve(AFTER_NAMES);

export const REAL_CASE = {
  id: "real-case-01",
  num: "01",
  /* 2.png = BEFORE (locked) */
  before: beforeEntry?.src,
  beforeFile: beforeEntry?.fileName ?? "2.png",
  /* 1.png = AFTER (locked) */
  after: afterEntry?.src,
  afterFile: afterEntry?.fileName ?? "1.png",
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

/**
 * `true` only when the real photographs are actually on disk.
 * The Selected Cases section uses this so it never presents a placeholder plate
 * as a real patient result.
 */
export const HAS_REAL_CASE = Boolean(REAL_CASE.before || REAL_CASE.after);
