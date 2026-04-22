/**
 * Fails if any app/.../page.tsx file has more than three literal h2 opening tags in source.
 * Shared sections (FaqSection, RealScoutLeadSection) may add h2 in components; this only
 * guards page-level copy from heading sprawl. Run: node scripts/verify-max-h2.mjs
 */
import { readdir } from "node:fs/promises";
import { join, dirname, relative } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");
const MAX_H2 = 3;

/** @param {string} dir */
async function collectPageFiles(dir) {
  /** @type {string[]} */
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await collectPageFiles(p)));
    } else if (e.name === "page.tsx") {
      out.push(p);
    }
  }
  return out;
}

function countH2(source) {
  const m = source.match(/<h2[\s>]/g);
  return m ? m.length : 0;
}

const files = await collectPageFiles(appDir);
const root = join(__dirname, "..");
let failed = false;

for (const file of files.sort()) {
  const src = readFileSync(file, "utf8");
  const noLineComments = src.replace(/\/\/.*$/gm, "");
  const n = countH2(noLineComments);
  const rel = relative(root, file);
  if (n > MAX_H2) {
    console.error(
      "[verify-max-h2] " +
        rel +
        ": expected at most " +
        MAX_H2 +
        " h2 elements in page source, found " +
        n,
    );
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
console.log(
  "[verify-max-h2] OK — " +
    files.length +
    " page file(s) each have at most " +
    MAX_H2 +
    " literal h2 in source",
);
