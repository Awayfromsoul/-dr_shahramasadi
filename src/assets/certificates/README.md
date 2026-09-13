# Certificates — REAL uploaded documents go here

Save the three certificate images supplied by Dr. Asadi's office into this
folder. Each file name must **start with** the base name below — the extension
is free:

| # | Base name                                  | Document                                                            |
|---|--------------------------------------------|---------------------------------------------------------------------|
| 1 | `certificate-01-laser-fellowship`          | Certificate of Attendance — Laser Dentistry Fellowship Course (Vicenza, Italy, 2017; Università degli Studi di Genova / Doctor Smile) |
| 2 | `certificate-02-restorative-congress`      | گواهی شرکت در سمینارها و کنگره‌ها — دهمین کنگره انجمن متخصصین دندانپزشکی ترمیمی ایران (آبان ۱۳۸۹) |
| 3 | `certificate-03-scientific-conference`     | گواهی شرکت در کنفرانس‌های علمی — دانشگاه علوم پزشکی لرستان (۱۳۸۲) |

All of these resolve to certificate 1, so you do not have to rename a scan that
arrived with an odd or doubled extension:

```
certificate-01-laser-fellowship.jpg
certificate-01-laser-fellowship.png
certificate-01-laser-fellowship.webp
certificate-01-laser-fellowship.jpg.png   ← what is currently in this folder
Certificate 01 Laser Fellowship.JPG
```

Matching (done by `src/data/images.ts`) strips **every** trailing extension,
ignores letter case, and folds spaces/underscores to hyphens. Accepted
extensions: `jpg jpeg png webp avif gif bmp`.

Confirm what was picked up before deploying:

```bash
npm run images
```

Rules (non-negotiable):
- Use the ORIGINAL files. Do not recreate, redraw, recolor, or retouch them.
- You MAY crop away the surrounding black caption area above the document;
  keep the full certificate incl. seals, stamps and signatures.
- Do not use placeholders, stock images, or AI-generated certificates.

The section `src/components/ProfessionalLicenses.tsx` picks these files up
automatically (via `src/data/images.ts`). Until a file is present, that block
shows an explicit "document file missing" state instead of a fake image.

These scans are bundled into `dist/index.html` by `npm run build`, so they load
from the built file itself — no separate upload, no remote host. Because they
are inlined as base64 (+33%), keep them around 2000 px on the long edge: sharp
enough to read every seal and signature, small enough to ship.
