/* ============================================================================
   LOCAL IMAGE SYSTEM  ·  سیستم تصاویر محلی
   ----------------------------------------------------------------------------
   ▸ ONE place to change every picture on the website.
   ▸ Drop a file into src/assets/ — no code edit, no import to fix, no rebuild
     of the data files. `npm run dev` picks it up instantly and `npm run build`
     bakes it into the output.

   WHY EVERY IMAGE LOADS AFTER `npm run build`
   -------------------------------------------
   Every file matched below is imported through Vite's asset pipeline, so at
   build time each picture becomes part of the bundle. This project uses
   `vite-plugin-singlefile`, which inlines those assets as base64 `data:` URIs
   directly inside `dist/index.html`.

   Consequences (all of them good):
     · `dist/index.html` is completely self-contained — there is no `assets/`
       folder to upload, no relative path to get wrong and no `base` URL to
       configure for GitHub Pages / sub-folders.
     · Nothing is fetched from a remote host, a CDN or a stock-photo service.
     · Opening `dist/index.html` straight from disk (`file://`) still shows
       every image, because a data URI has no path to resolve.

   The ONLY rule: pictures must live under `src/assets/` so the bundler can see
   them. Files in `public/` are NOT inlined and would break when the single
   HTML file is opened on its own — do not use `public/` for these images.

   HOW TO CHANGE A PICTURE
   -----------------------
   Save your file into `src/assets/` using one of the accepted names listed next
   to each slot below (extension is free: .jpg .jpeg .png .webp .avif .gif .bmp,
   upper or lower case). The FIRST name in each slot's list that exists wins, so
   `hero.jpg` always beats the shipped default.

   Full guide: src/assets/README.md
   ============================================================================ */

/**
 * Every image under `src/assets/`, at any depth, with any of these extensions
 * in either letter case: jpg jpeg png webp avif gif bmp.
 *
 * `**` matches zero path segments too, so files sitting directly in
 * `src/assets/` are found as well as files in `certificates/`, `cases/`,
 * `gallery/` and `instagram/`.
 *
 * NOTE: Vite resolves glob patterns statically at build time, so this MUST stay
 * a plain string literal — no variable, no template literal, no concatenation.
 * Add any new extension inside the braces here (both letter cases).
 */
const modules = import.meta.glob<string>(
  "../assets/**/*.{jpg,jpeg,png,webp,avif,gif,bmp,JPG,JPEG,PNG,WEBP,AVIF,GIF,BMP}",
  { eager: true, import: "default" }
);

/** Optional per-folder captions: `src/assets/<folder>/captions.json`. */
const captionModules = import.meta.glob<CaptionFile>("../assets/**/captions.json", {
  eager: true,
  import: "default",
});

const ASSETS_PREFIX = "../assets/";

/* ------------------------------ NORMALISING ----------------------------- */

/** Every trailing extension, so `certificate-01.jpg.png` → `certificate-01`. */
const TRAILING_EXTENSIONS = /(?:\.[a-z0-9]{2,5})+$/i;

/**
 * Turns a file name (or a name typed by hand) into the slug used for matching.
 * Lower-cased, all extensions removed, spaces/underscores folded to `-`.
 * Persian characters are preserved so Persian file names work as well.
 */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(TRAILING_EXTENSIONS, "")
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9\u0600-\u06ff-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

/* -------------------------------- ENTRIES ------------------------------- */

export interface ImageEntry {
  /** Path relative to `src/assets/`, e.g. `certificates/certificate-01.png`. */
  path: string;
  /** Folder relative to `src/assets/` — `""` for files directly in it. */
  folder: string;
  /** File name exactly as saved on disk. */
  fileName: string;
  /** Extension-less, lower-cased name used for matching. */
  slug: string;
  /** What to put in `<img src>` — always local (a bundled URL or data URI). */
  src: string;
}

/** Every image under `src/assets/`, sorted for stable, reproducible output. */
export const IMAGE_ENTRIES: ImageEntry[] = Object.entries(modules)
  .map(([key, src]) => {
    const path = key.startsWith(ASSETS_PREFIX) ? key.slice(ASSETS_PREFIX.length) : key;
    const slash = path.lastIndexOf("/");
    const folder = slash === -1 ? "" : path.slice(0, slash);
    const fileName = slash === -1 ? path : path.slice(slash + 1);
    return { path, folder, fileName, slug: slugify(fileName), src } satisfies ImageEntry;
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const BY_FOLDER = new Map<string, ImageEntry[]>();
for (const entry of IMAGE_ENTRIES) {
  const list = BY_FOLDER.get(entry.folder);
  if (list) list.push(entry);
  else BY_FOLDER.set(entry.folder, [entry]);
}

/** Wildcard folder — "look anywhere under src/assets/". */
const ANY_FOLDER = "*";

function entriesIn(folder: string): ImageEntry[] {
  return folder === ANY_FOLDER ? IMAGE_ENTRIES : (BY_FOLDER.get(folder) ?? []);
}

/* ------------------------------- LOOK-UPS ------------------------------- */

/**
 * Finds one image by an accepted name, searching `folders` in priority order.
 * Returns `undefined` when nothing matches — callers decide what that means.
 */
export function findImage(
  name: string | undefined | null,
  folders: string[] = ["", ANY_FOLDER]
): ImageEntry | undefined {
  const slug = slugify(name ?? "");
  if (!slug) return undefined;
  for (const folder of folders) {
    const hit = entriesIn(folder).find((entry) => entry.slug === slug);
    if (hit) return hit;
  }
  return undefined;
}

/**
 * Returns the first name from `names` that exists on disk.
 * Candidate order wins over folder order, so the list reads as a priority list:
 * the user's own file first, the shipped default last.
 */
export function findFirstImage(
  names: readonly (string | undefined | null)[],
  folders: string[] = ["", ANY_FOLDER]
): ImageEntry | undefined {
  for (const name of names) {
    const hit = findImage(name, folders);
    if (hit) return hit;
  }
  return undefined;
}

/** All images inside one folder, in file-name order. */
export function folderImages(folder: string, limit?: number): ImageEntry[] {
  const list = entriesIn(folder);
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/* ------------------------------- CAPTIONS ------------------------------- */

export interface CaptionEntry {
  /** Persian label shown as the title in the lightbox. */
  label?: string;
  /** Persian alt text — also used for screen readers and SEO. */
  alt?: string;
  /** Optional gallery category (English, matches GALLERY_CATEGORIES). */
  category?: string;
  /** Optional link, e.g. the Instagram permalink of that post. */
  href?: string;
}

/** Shape of `captions.json` — keys are file names, with or without extension. */
export type CaptionFile = Record<string, CaptionEntry>;

const CAPTIONS = new Map<string, CaptionEntry>();
for (const [key, file] of Object.entries(captionModules)) {
  /* "gallery/captions.json" → "gallery" · "captions.json" → "" (assets root) */
  const folder = key.replace(ASSETS_PREFIX, "").replace(/(^|\/)captions\.json$/, "");
  for (const [fileName, entry] of Object.entries(file ?? {})) {
    CAPTIONS.set(`${folder}/${slugify(fileName)}`, entry);
  }
}

/** Caption for an image, looked up by folder + slugified file name. */
export function captionFor(entry: ImageEntry): CaptionEntry {
  return CAPTIONS.get(`${entry.folder}/${entry.slug}`) ?? {};
}

/* ----------------------------- PLACEHOLDER ------------------------------ */

/**
 * Neutral, generated locally — used ONLY when a slot has no file at all, so the
 * layout never collapses and a broken-image icon never appears.
 * It is deliberately an obvious empty frame, never a fake medical photograph.
 */
function placeholder(label: string): string {
  const safe = label.replace(/[<>&"]/g, "");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">` +
    `<rect width="1200" height="1500" fill="#0D0D0D"/>` +
    `<rect x="24" y="24" width="1152" height="1452" fill="none" stroke="#D4AF37" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="14 12"/>` +
    `<g fill="none" stroke="#D4AF37" stroke-opacity="0.55" stroke-width="3">` +
    `<path d="M520 700h160v96l-40-32-32 40-28-56-24 32z"/>` +
    `<circle cx="566" cy="728" r="12"/></g>` +
    `<text x="600" y="880" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="30" letter-spacing="6" fill="#F5F2EA">IMAGE MISSING</text>` +
    `<text x="600" y="930" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" letter-spacing="2" fill="#A7A39A">${safe}</text>` +
    `<text x="600" y="975" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="22" letter-spacing="2" fill="#A7A39A">src/assets/</text>` +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/* --------------------------------- SLOTS -------------------------------- */

export interface SlotDefinition {
  /** Key used in code: `IMAGES.doctorHero`. */
  key: ImageKey;
  /** Where the picture appears on the site (used in the report + placeholder). */
  usedFor: string;
  /**
   * Accepted file names WITHOUT extension, highest priority first.
   * The last entry is the file currently shipped in the repository.
   */
  accepts: string[];
  /** Folders searched, in priority order. `*` means anywhere under src/assets/. */
  folders?: string[];
}

export const IMAGE_KEYS = [
  "doctorHero",
  "doctorAbout",
  "doctorAboutAlt",
  "implantMacro",
  "implantModel",
  "clinic",
  "digitalPlan",
  "gum",
  "caseModel",
] as const;

export type ImageKey = (typeof IMAGE_KEYS)[number];

/**
 * ── THE PICTURE MAP ────────────────────────────────────────────────────────
 * To change a picture: save your file into `src/assets/` using the FIRST name
 * in the matching `accepts` list. Done — nothing else to edit.
 * To change which names are accepted: edit this table.
 * ───────────────────────────────────────────────────────────────────────────
 */
export const SLOT_DEFINITIONS: SlotDefinition[] = [
  {
    key: "doctorHero",
    usedFor: "Hero — editorial portrait with the gold frame",
    accepts: ["hero", "doctor-hero-luxury", "doctor-hero", "doctor-portrait", "portrait"],
  },
  {
    key: "doctorAbout",
    usedFor: "02 About the doctor — main portrait",
    accepts: ["about", "doctor-consultation-luxury", "doctor-consultation"],
  },
  {
    key: "doctorAboutAlt",
    usedFor: "02 About the doctor — secondary / credentials portrait",
    accepts: ["about-alt", "doctor-about", "doctor-about-alt"],
  },
  {
    key: "implantMacro",
    usedFor: "Implant section — titanium fixture macro shot",
    accepts: ["implant-macro", "implant-macro-gold", "implant-fixture"],
  },
  {
    key: "implantModel",
    usedFor: "Implant / cases — fixture on the jaw model",
    accepts: ["implant-model", "implant-jaw-model"],
  },
  {
    key: "clinic",
    usedFor: "06 Location — the practice interior",
    accepts: ["clinic", "office", "practice", "clinic-interior"],
  },
  {
    key: "digitalPlan",
    usedFor: "Digital implant — 3D planning screen",
    accepts: ["digital-plan", "digital-implant", "digital-planning"],
  },
  {
    key: "gum",
    usedFor: "Periodontal surgery — soft tissue treatment",
    accepts: ["gum", "periodontal", "gum-surgery", "soft-tissue"],
  },
  {
    key: "caseModel",
    usedFor: "Cases / Instagram — restored arch on the implant model",
    accepts: ["case-model", "case", "restored-arch"],
  },
];

export interface ResolvedSlot extends SlotDefinition {
  /** Value for `<img src>` — never undefined, never a remote URL. */
  src: string;
  /** The file that filled the slot, or `undefined` when the placeholder is used. */
  entry?: ImageEntry;
  /** `true` when no accepted file was found and the placeholder is showing. */
  missing: boolean;
}

function resolveSlot(def: SlotDefinition): ResolvedSlot {
  const entry = findFirstImage(def.accepts, def.folders ?? ["", ANY_FOLDER]);
  return {
    ...def,
    src: entry?.src ?? placeholder(def.accepts[0]),
    entry,
    missing: !entry,
  };
}

/** Resolution details for every slot — handy for debugging and the report. */
export const RESOLVED_SLOTS: Record<ImageKey, ResolvedSlot> = Object.fromEntries(
  SLOT_DEFINITIONS.map((def) => [def.key, resolveSlot(def)])
) as Record<ImageKey, ResolvedSlot>;

/**
 * The value to render: `IMAGES.doctorHero` → a local URL or data URI.
 * This is the object the whole site reads its pictures from.
 */
export const IMAGES: Record<ImageKey, string> = Object.fromEntries(
  IMAGE_KEYS.map((key) => [key, RESOLVED_SLOTS[key].src])
) as Record<ImageKey, string>;

/* --------------------------- DEV-TIME REPORTING -------------------------- */

/**
 * In `npm run dev` only: tell the developer which picture is being used and
 * warn about slots that fell back to the placeholder or duplicated names.
 * Compiled out of the production bundle.
 */
if (import.meta.env.DEV) {
  const duplicates = new Map<string, string[]>();
  for (const entry of IMAGE_ENTRIES) {
    const id = entry.folder ? `${entry.folder}/${entry.slug}` : entry.slug;
    const list = duplicates.get(id);
    if (list) list.push(entry.fileName);
    else duplicates.set(id, [entry.fileName]);
  }

  for (const [id, names] of duplicates) {
    if (names.length > 1) {
      console.warn(
        `[images] "src/assets/${id}" matches several files (${names.join(", ")}). ` +
          `The first in alphabetical order wins — delete the one you do not want.`
      );
    }
  }

  for (const key of IMAGE_KEYS) {
    const slot = RESOLVED_SLOTS[key];
    if (slot.missing) {
      console.warn(
        `[images] ${key}: no file found — showing the placeholder frame. ` +
          `Save one of these into src/assets/: ${slot.accepts.join(", ")}`
      );
    }
  }

  console.info(
    `[images] ${IMAGE_ENTRIES.length} local image(s) bundled. ` +
      `Run "npm run images" for the full picture report.`
  );
}
