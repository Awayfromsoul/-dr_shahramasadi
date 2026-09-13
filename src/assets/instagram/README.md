# Instagram grid — drop folder  ·  پوشه تصاویر اینستاگرام

Save screenshots of real Instagram posts here and the **اینستاگرام دکتر اسعدی**
section (`05`) fills itself automatically. No code to edit, no imports to
change, no Instagram API or access token required.

```
src/assets/instagram/
├── post-01.jpg
├── post-02.jpg
├── post-03.png
└── captions.json      ← optional Persian alt text + permalinks
```

Rules:

- Accepted extensions: `.jpg` `.jpeg` `.png` `.webp` `.avif` `.gif` `.bmp`
  (upper or lower case). Doubled extensions such as `post-01.jpg.png` also work.
- Tiles are square (`object-cover`) — a square export looks best.
- Images appear in **file-name order** — prefix with `01-`, `02-` … to control
  the sequence. Six fills the grid neatly on desktop, but any number works.
- While this folder is empty, six curated pictures from `src/assets/` are used.
- Each tile links to the profile by default; add a per-post permalink in
  `captions.json` if you want it to open the actual post.

## captions.json (optional)

Keys are file names; every field is optional.

```json
{
  "post-01.jpg": {
    "alt": "کیس ایمپلنت تک‌واحدی — نتیجه نهایی",
    "href": "https://www.instagram.com/p/XXXXXXXXXXX/"
  },
  "post-02.jpg": {
    "alt": "مراحل جراحی لثه با لیزر"
  }
}
```

| Field  | Purpose                                                          |
|--------|------------------------------------------------------------------|
| `alt`  | Persian alt text — screen readers and SEO                         |
| `href` | Permalink of that post; falls back to the profile URL when absent |

## Compress before you commit

Every picture is inlined into the single built `dist/index.html` as base64,
which adds ~33%. Export at **≤ 1080 px, quality 75–82** (or WebP).

Check what was found with:

```bash
npm run images
```
