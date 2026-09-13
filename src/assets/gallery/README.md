# Clinical gallery — drop folder  ·  پوشه گالری تصاویر کلینیکی

Save clinical photographs here and the **گالری تصاویر کلینیکی** section fills
itself automatically. No code to edit, no imports to change.

```
src/assets/gallery/
├── implant-01.jpg
├── implant-02.jpg
├── surgery-01.png
└── captions.json      ← optional Persian labels
```

Rules:

- Accepted extensions: `.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif` `.bmp`
  (upper or lower case). Doubled extensions such as `photo.jpg.png` also work.
- Images appear in **file-name order** — prefix with `01-`, `02-` … to control
  the sequence.
- While this folder is empty the built-in sample plates are shown and the
  section keeps its «تصاویر فوق نمونه هستند…» disclaimer. As soon as one real
  image is here, the samples are replaced and the disclaimer changes.
- Use original, consented clinical photography. Do not retouch or recolour a
  treatment result.

## captions.json (optional)

Keys are file names; every field is optional.

```json
{
  "implant-01.jpg": {
    "label": "جراحی ایمپلنت ناحیه خلفی",
    "alt": "فیکسچر ایمپلنت قرارگرفته در استخوان فک",
    "category": "Implant Surgery"
  },
  "surgery-01.png": {
    "label": "جراحی لثه",
    "alt": "بازسازی بافت لثه",
    "category": "Periodontal Surgery"
  }
}
```

| Field      | Purpose                                                        |
|------------|----------------------------------------------------------------|
| `label`    | Persian title shown on the tile and in the lightbox             |
| `alt`      | Persian alt text — screen readers and SEO                       |
| `category` | One of: `Implant Surgery`, `Periodontal Surgery`, `Digital Dentistry`, `Clinical Experience`. Without it the image shows under **همه** and `Clinical Experience`. |

## Compress before you commit

Every picture is inlined into the single built `dist/index.html` as base64,
which adds ~33%. A gallery of 20 photos at 4 MB each makes an unusable page —
export at **≤ 1600 px on the long edge, quality 75–82** (or WebP).

Check what was found with:

```bash
npm run images
```
