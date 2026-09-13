# Changing pictures  ·  راهنمای جایگزینی تصاویر

**Every image on this website is local and every image is changed from this one
folder.** Drop a file in, save, done — there is no import statement to edit and
no path to fix.

```bash
npm run dev      # see the change instantly
npm run images   # print which file fills which slot   ← run this to verify
npm run build    # produce dist/index.html
```

---

## Why the images load after `npm run build`

All pictures live under `src/assets/`, so Vite pulls them through its asset
pipeline at build time. This project uses `vite-plugin-singlefile`, which
inlines every one of them as a base64 `data:` URI **inside `dist/index.html`**.

That means the built site:

- has **no `assets/` folder** to upload and no relative path to get wrong;
- makes **no request** to a CDN, a stock-photo host or any remote server;
- still shows every picture when `dist/index.html` is opened straight from disk
  (`file://`), because a data URI has no path to resolve;
- needs **no `base` setting** for GitHub Pages or any sub-folder deploy.

> ⚠️ The one rule: keep pictures in `src/assets/`, **not** in `public/`.
> Files in `public/` are copied next to the HTML but are *not* inlined, so they
> break the moment `index.html` is opened on its own or served from a different
> path. Everything under `src/assets/` is bundled and always works.

---

## Main pictures — `src/assets/`

Save your file with **the first name that applies**. The extension is free
(`.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif` `.bmp`, any letter case), and
doubled extensions like `hero.jpg.png` are matched too.

| Where it appears | Save as (first match wins) | Shipped default |
|---|---|---|
| **Hero** — editorial portrait in the gold frame | `hero` → `doctor-hero-luxury` → `doctor-hero` → `doctor-portrait` → `portrait` | `doctor-hero-luxury.jpg` |
| **02 About** — main portrait | `about` → `doctor-consultation-luxury` → `doctor-consultation` | `doctor-consultation-luxury.jpg` |
| **02 About** — secondary portrait | `about-alt` → `doctor-about` → `doctor-about-alt` | `doctor-about.jpg` |
| **Implant** — titanium fixture macro | `implant-macro` → `implant-macro-gold` → `implant-fixture` | `implant-macro-gold.jpg` |
| **Implant / cases** — fixture on the jaw model | `implant-model` → `implant-jaw-model` | `implant-model.jpg` |
| **06 Location** — the practice interior | `clinic` → `office` → `practice` → `clinic-interior` | `clinic.jpg` |
| **Digital implant** — 3D planning screen | `digital-plan` → `digital-implant` → `digital-planning` | `digital-plan.jpg` |
| **Periodontal surgery** — soft tissue | `gum` → `periodontal` → `gum-surgery` → `soft-tissue` | `gum.jpg` |
| **Cases / Instagram** — restored arch on a model | `case-model` → `case` → `restored-arch` | `case-model.jpg` |

**Example — replace the hero portrait:**

```bash
# either overwrite the default in place…
cp ~/Desktop/new-portrait.jpg  src/assets/doctor-hero-luxury.jpg

# …or drop in a file with the top-priority name and delete nothing
cp ~/Desktop/new-portrait.png  src/assets/hero.png
```

`hero.png` wins over `doctor-hero-luxury.jpg`, so the second form is the safe
one — you can always revert by deleting `hero.png`.

The authoritative table lives in `src/data/images.ts` → `SLOT_DEFINITIONS`.
Editing `accepts` there changes which names are recognised.

### Two files with the same name

If both `hero.jpg` and `hero.png` exist, the first in alphabetical order wins
and `npm run dev` prints a warning. Delete the one you do not want.

### If a slot has no file at all

The site never shows a broken-image icon: it renders a generated gold placeholder
frame that names the missing file. `npm run images` lists those slots in red and
exits non-zero, so a deploy can fail on them.

> Note: `doctor-hero.jpg` is currently shipped but unused — `doctor-hero-luxury.jpg`
> has priority for the hero slot.

---

## Certificates — `src/assets/certificates/`

The three real documents supplied by the office. The file name must **start
with** the expected base name; the extension is free and may be doubled.

| # | Base name | Document |
|---|---|---|
| 01 | `certificate-01-laser-fellowship` | Certificate of Attendance — Laser Dentistry Fellowship Course (Vicenza, Italy, June 2017 · Università degli Studi di Genova / Doctor Smile) |
| 02 | `certificate-02-restorative-congress` | گواهی شرکت در دهمین کنگره انجمن متخصصین دندانپزشکی ترمیمی ایران (۱۲–۱۴ آبان ۱۳۸۹) |
| 03 | `certificate-03-scientific-conference` | گواهی شرکت در کنفرانس‌های علمی — دانشگاه علوم پزشکی لرستان (۱۳۸۲/۱/۲۸) |

All of these resolve to the same certificate:

```
certificate-01-laser-fellowship.jpg
certificate-01-laser-fellowship.png
certificate-01-laser-fellowship.jpg.png    ← what is shipped today
Certificate 01 Laser Fellowship.JPG
```

Until a file is present, that block shows an explicit «فایل اصلی این گواهی هنوز
در پروژه قرار نگرفته است» state — **never** a placeholder certificate.

Use the original scans. Cropping away a surrounding caption bar is fine;
redrawing, recolouring or retouching a document is not. See the folder's own
`README.md`.

---

## Before / After patient case — `src/assets/cases/`

The file name decides the side of the comparison. **This mapping is locked and
must never be reversed by judging what the photos look like.**

| Side | Accepted names |
|---|---|
| **BEFORE** (قبل, left) | `2.png` · `before.*` · `case-01-before.*` · `case-before.*` |
| **AFTER** (بعد, right) | `1.png` · `after.*` · `case-01-after.*` · `case-after.*` |

While the folder is empty, CASE 01 is left out of the نمونه‌کارها section
entirely and the curated sample plates are shown instead — a placeholder is
never presented as a real patient result.

Rendered with **no filter, no retouching, no recolouring**. Compressing to WebP
and cropping excess background is allowed; altering the clinical result is not.
Both images must keep matching framing so the slider stays aligned.

---

## Clinical gallery — `src/assets/gallery/`

Drop images here and the gallery fills itself; the sample plates and their
«these are samples» disclaimer disappear. Add `captions.json` for Persian
labels, alt text and categories. Full details in that folder's `README.md`.

## Instagram grid — `src/assets/instagram/`

Drop post screenshots here and the grid fills itself — no API, no token.
`captions.json` can add alt text and a per-post permalink. Full details in that
folder's `README.md`.

---

## File size matters

Base64 inlining adds ~33% to each file's size, and everything ends up in one
HTML document. The current build is ~4.7 MB (the three certificate scans are
2.1 MB of that).

Recommended exports:

| Picture | Long edge | Quality |
|---|---|---|
| Hero / portraits | 1600 px | 78 |
| Gallery, Instagram, cases | 1080–1400 px | 75–80 |
| Certificates | keep legible — 2000 px is plenty | 80 |

```bash
# WebP, if you have cwebp installed
cwebp -q 78 -resize 1600 0 input.jpg -o src/assets/hero.webp
```

Never sacrifice legibility on a certificate to save bytes.

---

## Ethics — non-negotiable

- Placeholder medical imagery must be replaced with **real patient images
  obtained with appropriate consent**.
- Do not generate, composite or "improve" a treatment result.
- Do not present a stock or sample photograph as a real patient case.
- Certificates must be the original documents — no recreations, no AI output.
