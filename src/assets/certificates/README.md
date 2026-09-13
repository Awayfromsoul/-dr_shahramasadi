# Certificates — REAL uploaded documents go here

Save the three certificate images supplied by Dr. Asadi's office into this
folder using EXACTLY these filenames (jpg / jpeg / png / webp all accepted):

| # | Filename                                   | Document                                                            |
|---|--------------------------------------------|---------------------------------------------------------------------|
| 1 | `certificate-01-laser-fellowship.jpg`      | Certificate of Attendance — Laser Dentistry Fellowship Course (Vicenza, Italy, 2017; Università degli Studi di Genova / Doctor Smile) |
| 2 | `certificate-02-restorative-congress.jpg`  | گواهی شرکت در سمینارها و کنگره‌ها — دهمین کنگره انجمن متخصصین دندانپزشکی ترمیمی ایران (آبان ۱۳۸۹) |
| 3 | `certificate-03-scientific-conference.jpg` | گواهی شرکت در کنفرانس‌های علمی — دانشگاه علوم پزشکی لرستان (۱۳۸۲) |

Rules (non-negotiable):
- Use the ORIGINAL files. Do not recreate, redraw, recolor, or retouch them.
- You MAY crop away the surrounding black caption area above the document;
  keep the full certificate incl. seals, stamps and signatures.
- Do not use placeholders, stock images, or AI-generated certificates.

The section `src/components/ProfessionalLicenses.tsx` picks these files up
automatically (via `import.meta.glob`). Until a file is present, that block
shows an explicit "document file missing" state instead of a fake image.
