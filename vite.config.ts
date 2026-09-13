import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------------------------------------------------------------------
   IMAGES — READ THIS BEFORE MOVING A PICTURE
   -------------------------------------------------------------------------
   `viteSingleFile()` inlines the JS, the CSS *and every asset imported through
   the bundler* into one self-contained `dist/index.html`.

   That is what makes the pictures survive `npm run build`:
     · no `dist/assets/` folder to upload
     · no relative path or GitHub Pages `base` to get wrong
     · nothing fetched from a CDN or stock-photo host
     · `dist/index.html` still renders every image when opened via `file://`

   Requirement: images must live under `src/assets/` so the bundler sees them
   (see src/data/images.ts and src/assets/README.md). Files in `public/` are
   copied next to the HTML but are NOT inlined, so they break as soon as
   index.html is opened on its own — do not put site pictures there.
   --------------------------------------------------------------------------- */

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    /* Bind every interface so the dev server is reachable from a preview proxy. */
    host: true,
    /* Vite rejects unknown Host headers. Add your own tunnel/preview domain here
       if you serve `npm run dev` through one. */
    allowedHosts: [".e2b.app", "localhost"],
  },
  preview: {
    /* `npm run preview` serves the built dist/index.html — the real check that
       every picture survived `npm run build` as an inlined local asset. */
    host: true,
    port: 4173,
    allowedHosts: [".e2b.app", "localhost"],
  },
});
