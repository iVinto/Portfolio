import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const allowedRootHtml = new Set(["index.html", "gallery.html"]);
const expectedNonGalleryImages = new Set([
  "Photography_web/vinto-portrait.webp",
  "og-image.png",
  "apple-touch-icon.png",
  "favicon-32x32.png"
]);

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function walk(dir) {
  const entries = [];
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) entries.push(...walk(rel));
    else entries.push(rel);
  }
  return entries;
}

function loadEvents() {
  const context = {};
  vm.createContext(context);
  vm.runInContext(`${read("events.js")}\nthis.EVENTS = EVENTS;`, context);
  return context.EVENTS;
}

function imageDimensions(relPath) {
  const output = execFileSync("sips", ["-g", "pixelWidth", "-g", "pixelHeight", path.join(root, relPath)], {
    encoding: "utf8"
  });
  const width = Number(output.match(/pixelWidth:\s+(\d+)/)?.[1]);
  const height = Number(output.match(/pixelHeight:\s+(\d+)/)?.[1]);
  if (!width || !height) throw new Error(`Could not read image dimensions for ${relPath}`);
  return { width, height };
}

const events = loadEvents();

const rootHtml = fs.readdirSync(root).filter(file => file.endsWith(".html"));
assert.deepEqual(
  rootHtml.sort(),
  [...allowedRootHtml].sort(),
  "Only the canonical index and gallery HTML files should be deployed from the root."
);

const indexHtml = read("index.html");
assert(!indexHtml.includes("editorials.html"), "Editorials should be hidden from public navigation.");
assert(!indexHtml.includes("others.html"), "Others should be hidden from public navigation.");
assert(!indexHtml.includes("mobileGate"), "Mobile should use a simplified responsive interface, not a blocking gate.");
assert(indexHtml.includes("mobile-experience-note"), "Index needs the desktop-experience note for mobile visitors.");

const galleryHtml = read("gallery.html");
const galleryJs = read("gallery.js");
const styleCss = read("style.css");
assert(!galleryHtml.includes("protect.js"), "Gallery should not block saving or source shortcuts.");
assert(galleryHtml.includes("mobile-experience-note"), "Gallery needs the desktop-experience note for mobile visitors.");
assert(!/(\bimg|\bfullscreenImg)\.title\s*=/.test(galleryJs), "Gallery images should not set title attributes that create native cursor tooltips.");
assert(!galleryJs.includes("dataset.caption"), "Gallery images should not carry redundant caption data.");
assert(
  galleryJs.includes("function updateCounterPosition()") && galleryJs.includes("fullscreenImg.getBoundingClientRect()"),
  "Fullscreen counter should be positioned from the rendered image bounds."
);
assert(galleryJs.includes("galleryCounter.offsetWidth"), "Fullscreen counter positioning should account for its rendered width.");
assert(
  galleryJs.includes("function updateCursorDirection") && galleryJs.includes("cursor-left") && galleryJs.includes("cursor-right"),
  "Fullscreen navigation should update left/right cursor direction classes."
);
assert(
  galleryJs.includes("rect.left + rect.width / 2") && !galleryJs.includes("window.innerWidth / 2"),
  "Fullscreen click and cursor direction should use the rendered image halves, not the whole viewport."
);
assert(
  styleCss.includes("height: 34px;") && styleCss.includes("align-items: center;"),
  "Filter buttons should use a compact fixed height with centered text."
);
assert(!styleCss.includes("translateX(-50%)"), "Gallery counter should not be centered under the fullscreen image.");
assert(styleCss.includes("white-space: nowrap;"), "Gallery counter should stay on one line.");
assert(styleCss.includes("cursor-left") && styleCss.includes("cursor-right"), "Left/right fullscreen cursor classes should exist.");
assert(fs.existsSync(path.join(root, "robots.txt")), "robots.txt should exist.");
assert(fs.existsSync(path.join(root, "sitemap.xml")), "sitemap.xml should exist.");

const referenced = new Set();
for (const event of events) {
  assert(event.about.description.trim(), `About description should not be empty for ${event.id}.`);
  assert(
    !/(personal project|experimental personal project|photo relation|media team work|work for)/i.test(event.about.description),
    `About description should be specific and polished for ${event.id}: ${event.about.description}`
  );
  for (const image of event.images) referenced.add(path.join(event.folder, image));
  referenced.add(path.join(event.folder, event.preview));
}

for (const relPath of referenced) {
  assert(fs.existsSync(path.join(root, relPath)), `Referenced image missing: ${relPath}`);
  const { width, height } = imageDimensions(relPath);
  assert(
    Math.max(width, height) <= 2200,
    `Referenced image exceeds 2200 px on the long edge: ${relPath} (${width}x${height})`
  );
}

const deployImages = walk("Photography_web")
  .filter(file => /\.(avif|gif|jpe?g|png|webp)$/i.test(file))
  .filter(file => !expectedNonGalleryImages.has(file));

const unused = deployImages.filter(file => !referenced.has(file));
assert.deepEqual(unused, [], `Unused images should be removed from Photography_web: ${unused.join(", ")}`);

const sitemap = read("sitemap.xml");
assert(sitemap.includes("<loc>https://vinto-portfolio.pages.dev/</loc>"), "Sitemap should include the production home URL.");
assert(sitemap.includes("gallery.html?event=clout-festival-4"), "Sitemap should include gallery URLs.");

console.log(`Portfolio verification passed for ${events.length} events and ${referenced.size} referenced images.`);
