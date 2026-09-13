# Real Patient Case — BEFORE / AFTER images

Save the two supplied photographs here. **The file name decides which side of
the comparison each image appears on.**

| Role       | Accepted names (extension is free)                        | Side |
|------------|-----------------------------------------------------------|------|
| **BEFORE** | `2.png` · `before.*` · `case-01-before.*` · `case-before.*` | Left (قبل) |
| **AFTER**  | `1.png` · `after.*` · `case-01-after.*` · `case-after.*`    | Right (بعد) |

> `1.*` = AFTER · `2.*` = BEFORE
> This mapping is fixed. Do **not** swap them, and do not "fix" it by judging
> which photo looks like the before state.

Accepted extensions: `jpg jpeg png webp avif gif bmp`, in any letter case — and
a doubled extension such as `2.jpg.png` still counts as `2`. Matching is done by
`src/data/images.ts`, which strips every extension and folds spaces/underscores
to hyphens.

The section picks these files up automatically — once at least one of the two
exists, CASE 01 becomes the default visible case in the Selected Cases section
and appears under both **همه** and **ایمپلنت**. While the folder is empty CASE 01
is left out entirely, so a placeholder plate is never presented as a real
patient result.

Confirm what was picked up before deploying:

```bash
npm run images
```

Rules:
- Use the ORIGINAL files. Do not retouch, whiten, recolour, or otherwise alter
  the clinical result.
- You may compress / convert to WebP for performance, and crop only excess
  background — never the mouth or treatment area.
- Both images must keep matching framing so the comparison stays aligned.
- They render at the source ratio (4:3) so nothing clinical is cropped away —
  keep that ratio when you export.
- Images are bundled into `dist/index.html` at build time, so they load locally
  with no remote request. Keep each one ≤ 1400 px / quality ~78.
