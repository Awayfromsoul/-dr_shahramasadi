# Real Patient Case — BEFORE / AFTER images

Save the two supplied photographs here using **exactly** these filenames.
The filename decides which side of the comparison each image appears on.

| Filename  | Role      | Side of the comparison |
|-----------|-----------|------------------------|
| `2.png`   | **BEFORE** | Left side (قبل) |
| `1.png`   | **AFTER**  | Right side (بعد) |

> `1.png` = AFTER · `2.png` = BEFORE
> This mapping is fixed. Do **not** swap them, and do not "fix" it by judging
> which photo looks like the before state.

The section picks these files up automatically (`import.meta.glob`) — once both
files exist, CASE 01 becomes the default visible case in the Selected Cases
section, and it appears under both **همه** and **ایمپلنت**.

Rules:
- Use the ORIGINAL files. Do not retouch, whiten, recolour, or otherwise alter
  the clinical result.
- You may compress / convert to WebP for performance, and crop only excess
  background — never the mouth or treatment area.
- Both images must keep matching framing so the comparison stays aligned.
