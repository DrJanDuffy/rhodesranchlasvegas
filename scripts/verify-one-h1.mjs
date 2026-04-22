/**
 * Enforces exactly one <h1> per app route (page.tsx) and per global error/404 view.
 * Run: node scripts/verify-one-h1.mjs
 */
import { readdir } from "node:fs/promises";
import { join, dirname, relative } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = join(__dirname, "..", "app");

const extraRoots = [
  join(appDir, "error.tsx"),
  join(appDir, "not-found.tsx"),
  join(appDir, "global-error.tsx"),
];

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

function countH1(source) {
  const m = source.match(/<h1\b/g);
  return m ? m.length : 0;
}

const files = [...(await collectPageFiles(appDir)), ...extraRoots].filter((p) => {
  try {
    readFileSync(p, "utf8");
    return true;
  } catch {
    return false;
  }
});

let failed = false;
const root = join(__dirname, "..");
for (const file of files.sort()) {
  const src = readFileSync(file, "utf8");
  // Ignore h1 in comments (single-line) — rough strip
  const noLineComments = src.replace(/\/\/.*$/gm, "");
  const n = countH1(noLineComments);
  const rel = relative(root, file);
  if (n !== 1) {
    console.error(`[verify-one-h1] ${rel}: expected 1 <h1>, found ${n}`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
console.log(
  `[verify-one-h1] OK — ${files.length} file(s) each have exactly one <h1>:`,
  files.length,
);
