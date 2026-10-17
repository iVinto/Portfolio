// Checks the built site in dist/ before deploy. Run after `npm run build` (CI does both).
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://vinto.work";

function load(file, name) {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(`${fs.readFileSync(path.join(root, file), "utf8")}\nthis.${name} = ${name};`, ctx);
  return ctx[name];
}
const eventsArg = process.argv.indexOf("--events");
const EVENTS = load(eventsArg >= 0 ? path.relative(root, path.resolve(process.argv[eventsArg + 1])) : "events.js", "EVENTS");
const SELECTED = load("selected.js", "SELECTED");
const read = rel => fs.readFileSync(path.join(dist, rel), "utf8");
const exists = rel => fs.existsSync(path.join(dist, rel));
const isListed = e => e.category === "concerts" && !e.hidden;
const listed = EVENTS.filter(isListed);
const unlisted = EVENTS.filter(e => !isListed(e));

assert(fs.existsSync(dist), "dist/ is missing — run `npm run build` first.");
for (const f of ["index.html", "work/index.html", "about/index.html", "404.html", "gallery.html", "robots.txt", "sitemap.xml", "_headers", "assets/styles.css", "assets/site.js", "og-image.png", "favicon.svg"]) {
  assert(exists(f), `Missing from the build: ${f}`);
}
assert(!exists("events.js"), "events.js must not be deployed: it lists hidden galleries.");

// Every page: title, canonical and absolute link-preview image on vinto.work; no leftovers of the old mobile note.
const pages = [];
(function walk(dir) {
  for (const f of fs.readdirSync(path.join(dist, dir), { withFileTypes: true })) {
    const rel = path.join(dir, f.name);
    if (f.isDirectory()) walk(rel);
    else if (f.name.endsWith(".html") && rel !== "gallery.html") pages.push(rel);
  }
})("");
for (const rel of pages) {
  const html = read(rel);
  assert(/<title>[^<]+<\/title>/.test(html), `${rel}: missing <title>`);
  assert(html.includes(`<link rel="canonical" href="${SITE}/`), `${rel}: canonical must point to ${SITE}`);
  assert(new RegExp(`<meta property="og:image" content="${SITE}/`).test(html), `${rel}: og:image must be an absolute ${SITE} URL`);
  assert(!html.includes("Simplified mobile view"), `${rel}: the old mobile disclaimer is back`);
  // every local file the page points at must exist in the build
  for (const [, url] of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) {
    const clean = decodeURIComponent(url.split("?")[0]);
    const target = clean.endsWith("/") ? `${clean}index.html` : clean;
    assert(exists(target), `${rel}: broken local link ${url}`);
  }
  for (const [, set] of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const part of set.split(",")) {
      const url = part.trim().split(/\s+/)[0];
      assert(exists(decodeURIComponent(url.split("?")[0])), `${rel}: srcset file missing ${url}`);
    }
  }
}

// Galleries: public ones are listed and in the sitemap; hidden ones get a noindex page and appear nowhere else.
const indexHtml = read("work/index.html"), homeHtml = read("index.html"), sitemap = read("sitemap.xml");
for (const e of listed) {
  assert(exists(`work/${e.id}/index.html`) && exists(`work/${e.id}/og.jpg`), `Public gallery ${e.id} has no page or link preview`);
  assert(indexHtml.includes(`href="/work/${e.id}/"`), `Public gallery ${e.id} is missing from the Index`);
  assert(sitemap.includes(`${SITE}/work/${e.id}/`), `Public gallery ${e.id} is missing from the sitemap`);
  const page = read(`work/${e.id}/index.html`);
  assert(!page.includes('name="robots" content="noindex"'), `Public gallery ${e.id} must be indexable`);
  const photos = JSON.parse(page.match(/<script type="application\/json" id="photos">([\s\S]*?)<\/script>/)[1]);
  assert.equal(photos.length, e.images.length, `${e.id}: viewer data should list every photo`);
}
for (const e of unlisted) {
  const page = read(`work/${e.id}/index.html`);
  assert(page.includes('name="robots" content="noindex"'), `Unlisted gallery ${e.id} must be noindex`);
  for (const [name, html] of [["Index", indexHtml], ["home", homeHtml], ["sitemap", sitemap]]) {
    assert(!html.includes(`/work/${e.id}/`), `Unlisted gallery ${e.id} leaks into the ${name}`);
  }
}
assert.equal((homeHtml.match(/data-i="/g) || []).length, SELECTED.length, "Home should show every Selected photo");

// Source photos: present, at most 2200 px on the long edge, descriptions written for every event.
for (const e of EVENTS) {
  assert(e.about?.description?.trim(), `About description should not be empty for ${e.id}.`);
  for (const img of new Set([...e.images, e.preview])) {
    const rel = path.join(e.folder, img);
    assert(fs.existsSync(path.join(root, rel)), `Referenced image missing: ${rel}`);
    const { width, height } = await sharp(path.join(root, rel)).metadata();
    assert(Math.max(width, height) <= 2200, `Referenced image exceeds 2200 px on the long edge: ${rel} (${width}x${height})`);
  }
}

// Not fatal: photos in Photography_web that no gallery uses are simply not deployed.
const used = new Set(EVENTS.flatMap(e => [...e.images, e.preview].map(i => path.join(e.folder, i))));
used.add("Photography_web/vinto-portrait.webp");
const unused = [];
(function walk(dir) {
  for (const f of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, f.name);
    if (f.isDirectory()) walk(rel);
    else if (/\.(avif|jpe?g|png|webp)$/i.test(f.name) && !used.has(rel)) unused.push(rel);
  }
})("Photography_web");
if (unused.length) console.warn(`Note: ${unused.length} photo(s) in Photography_web are not used by any gallery: ${unused.join(", ")}`);

console.log(`Build verified: ${pages.length} pages, ${listed.length} public + ${unlisted.length} unlisted galleries, ${SELECTED.length} selected photos.`);
