#!/usr/bin/env node
/* ============================================================================
   PICTURE REPORT  ·  npm run images
   ----------------------------------------------------------------------------
   Prints exactly which file fills every picture slot on the site, so you can
   confirm a replacement was picked up BEFORE you deploy.

   It loads the real `src/data/images.ts` through Vite (the same pipeline
   `npm run build` uses), so what this prints is what the site will render —
   including the base64 inlining that makes every image local after build.
   ============================================================================ */

import { createServer } from "vite";

const RESET = "\x1b[0m";
const DIM = "\x1b[2m";
const GOLD = "\x1b[33m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";

const vite = await createServer({
  configFile: false,
  logLevel: "error",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
  /* No dependency pre-bundling — this script only reads the data modules, and
     the scan would otherwise race with `vite.close()` and print a warning. */
  optimizeDeps: { noDiscovery: true, include: [] },
  /* Keeps the dev-only console output inside src/data/images.ts out of the way;
     this script prints the report instead. */
  define: {
    "import.meta.env.DEV": "false",
    "import.meta.env.PROD": "true",
  },
});

let exitCode = 0;

try {
  const images = await vite.ssrLoadModule("/src/data/images.ts");
  const certificates = await vite.ssrLoadModule("/src/data/certificates.ts");
  const cases = await vite.ssrLoadModule("/src/data/patientCases.ts");

  const { IMAGE_ENTRIES, RESOLVED_SLOTS, IMAGE_KEYS, folderImages } = images;

  console.log();
  console.log(`${GOLD}DR. SHAHRAM ASADI — local picture report${RESET}`);
  console.log(
    `${DIM}${IMAGE_ENTRIES.length} image file(s) found under src/assets/ · all bundled locally${RESET}`
  );
  console.log();

  /* ------------------------------- main slots ------------------------------ */
  console.log(`${GOLD}MAIN PICTURE SLOTS${RESET}  ${DIM}(src/assets/)${RESET}`);
  for (const key of IMAGE_KEYS) {
    const slot = RESOLVED_SLOTS[key];
    if (slot.missing) {
      exitCode = 1;
      console.log(`  ${RED}✗${RESET} ${key.padEnd(15)} ${RED}MISSING${RESET}`);
      console.log(
        `    ${DIM}save one of: ${slot.accepts.join(" · ")}  → src/assets/${RESET}`
      );
    } else {
      console.log(`  ${GREEN}✓${RESET} ${key.padEnd(15)} ${slot.entry.fileName}`);
      console.log(`    ${DIM}${slot.usedFor}${RESET}`);
    }
  }
  console.log();

  /* ------------------------------ certificates ----------------------------- */
  console.log(`${GOLD}CERTIFICATES${RESET}  ${DIM}(src/assets/certificates/)${RESET}`);
  for (const cert of certificates.CERTIFICATES) {
    if (cert.src) {
      console.log(`  ${GREEN}✓${RESET} ${cert.num} ${cert.file}`);
      console.log(`    ${DIM}${fileNameOf(IMAGE_ENTRIES, cert.src)}${RESET}`);
    } else {
      exitCode = 1;
      console.log(`  ${RED}✗${RESET} ${cert.num} ${cert.file} ${RED}MISSING${RESET}`);
      console.log(
        `    ${DIM}save ${cert.file}.jpg (any extension) → src/assets/certificates/${RESET}`
      );
    }
  }
  console.log();

  /* --------------------------- before / after case -------------------------- */
  console.log(`${GOLD}REAL PATIENT CASE${RESET}  ${DIM}(src/assets/cases/)${RESET}`);
  const realCase = cases.REAL_CASE;
  for (const [role, src, hint] of [
    ["BEFORE (2.png)", realCase.before, "2.png · before.jpg · case-before.*"],
    ["AFTER  (1.png)", realCase.after, "1.png · after.jpg · case-after.*"],
  ]) {
    if (src) {
      console.log(`  ${GREEN}✓${RESET} ${role.padEnd(15)} ${fileNameOf(IMAGE_ENTRIES, src)}`);
    } else {
      console.log(`  ${RED}✗${RESET} ${role.padEnd(15)} ${RED}MISSING${RESET}`);
      console.log(`    ${DIM}save one of: ${hint}  → src/assets/cases/${RESET}`);
    }
  }
  console.log(
    `  ${DIM}CASE 01 is ${cases.HAS_REAL_CASE ? "shown" : "hidden"} — it appears only once a real photograph exists.${RESET}`
  );
  console.log();

  /* ------------------------------ drop folders ----------------------------- */
  for (const [folder, title] of [
    ["gallery", "CLINICAL GALLERY"],
    ["instagram", "INSTAGRAM GRID"],
  ]) {
    const items = folderImages(folder);
    console.log(`${GOLD}${title}${RESET}  ${DIM}(src/assets/${folder}/)${RESET}`);
    if (!items.length) {
      console.log(`  ${DIM}empty — the built-in sample plates are used${RESET}`);
    } else {
      for (const item of items) console.log(`  ${GREEN}✓${RESET} ${item.fileName}`);
    }
    console.log();
  }

  /* ------------------------------- duplicates ------------------------------ */
  const seen = new Map();
  for (const entry of IMAGE_ENTRIES) {
    const id = entry.folder ? `${entry.folder}/${entry.slug}` : entry.slug;
    if (seen.has(id)) seen.get(id).push(entry.fileName);
    else seen.set(id, [entry.fileName]);
  }
  const dupes = [...seen].filter(([, names]) => names.length > 1);
  if (dupes.length) {
    console.log(`${RED}AMBIGUOUS NAMES${RESET}`);
    for (const [id, names] of dupes) {
      console.log(
        `  src/assets/${id} → ${names.join(", ")}  ${DIM}(first alphabetically wins)${RESET}`
      );
    }
    console.log();
  }

  console.log(
    exitCode === 0
      ? `${GREEN}Every required picture resolves to a local file — all bundled into dist/index.html.${RESET}`
      : `${RED}Some required pictures are missing — the site shows a placeholder frame for them.${RESET}`
  );
  if (!cases.HAS_REAL_CASE) {
    console.log(
      `${DIM}Optional: no before/after pair yet, so CASE 01 stays hidden. Drop 1.png + 2.png into src/assets/cases/.${RESET}`
    );
  }
  console.log(
    `${DIM}Guide: src/assets/README.md · slot table: src/data/images.ts${RESET}\n`
  );
} finally {
  await vite.close();
}

process.exit(exitCode);

/** Maps a resolved src back to the file name on disk. */
function fileNameOf(entries, src) {
  return entries.find((e) => e.src === src)?.fileName ?? "(inlined)";
}
