// vinto.work static build.
// Reads events.js, selected.js and content.js, then writes dist/:
//   - thumbnails (160/480/960 px WebP) next to the originals, cached in .cache/ by content hash
//   - one page per gallery (/work/<id>/) with its own title, description and 1200×630 link-preview image
//   - home (Selected), Index (/work/), About & Book (/about/), 404, sitemap, robots, _headers
//   - gallery.html: redirect for old ?event=<id> links
// Usage: node tools/build.mjs [--events path/to/events.js] [--out dist]
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const arg = (name, fallback) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : fallback; };
const OUT = path.resolve(root, arg("--out", "dist"));
const EVENTS_FILE = path.resolve(root, arg("--events", "events.js"));
const CACHE = path.join(root, ".cache");
const THUMB_WIDTHS = [480, 960];
const SMALL = 160; // previews and portrait also get a tiny size for list thumbnails

function load(file, name) {
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(`${fs.readFileSync(file, "utf8")}\nthis.${name} = ${name};`, ctx);
  return ctx[name];
}
const EVENTS = load(EVENTS_FILE, "EVENTS");
const SELECTED = load(path.join(root, "selected.js"), "SELECTED");
const C = load(path.join(root, "content.js"), "CONTENT");
const SITE = C.site.replace(/\/$/, "");
const YEAR = new Date().getFullYear();

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const json = v => JSON.stringify(v).replace(/</g, "\\u003c");
const hashOf = buf => crypto.createHash("md5").update(buf).digest("hex").slice(0, 10);
const mkdir = p => fs.mkdirSync(p, { recursive: true });
const write = (rel, data) => { const p = path.join(OUT, rel); mkdir(path.dirname(p)); fs.writeFileSync(p, data); };

// ---------- events ----------
const isListed = e => e.category === "concerts" && !e.hidden;
const listed = EVENTS.filter(isListed);
const byId = new Map(EVENTS.map(e => [e.id, e]));
const typeOf = e => {
  const t = e.tags || [];
  return t.includes("FESTIVAL") ? "Festival" : t.includes("ARENA") ? "Arena" : t.includes("CLUB") ? "Club" : "Concert";
};
const placeOf = e => {
  const l = e.about?.location || "";
  if (/Warsaw/i.test(l)) return "Warsaw";
  if (/Gdynia/i.test(l)) return "Gdynia";
  if (/Gliwice/i.test(l)) return "Gliwice";
  if (/Przytkowice/i.test(l)) return "Przytkowice";
  if (/Zielonka/i.test(l)) return "Zielonka";
  if (/Porto/i.test(l)) return "Porto";
  if (/\//.test(l)) return `${l.split(/[/,]/)[0].trim().replace("Krakow", "Kraków")} +${l.split("/").length - 1}`;
  return /^Poland$/i.test(l.trim()) ? "Tour, PL" : l.split(",").pop().trim();
};
const pageOf = e => `/work/${e.id}/`;

for (const s of SELECTED) {
  const e = byId.get(s.event);
  if (!e) throw new Error(`selected.js: unknown event "${s.event}"`);
  if (!isListed(e)) throw new Error(`selected.js: "${s.event}" is hidden or unlisted — pick a public gallery`);
  if (!e.images.includes(s.image)) throw new Error(`selected.js: ${s.event} has no image ${s.image}`);
  if (s.focus !== undefined && !/^\d{1,3}% \d{1,3}%$/.test(s.focus)) throw new Error(`selected.js: focus for ${s.event} ${s.image} should look like "50% 20%"`);
}

// ---------- images: metadata, thumbnails, link previews ----------
const records = new Map(); // rel → { rel, w, h, hash, small }
const want = (rel, small = false) => {
  const r = records.get(rel) || { rel, small: false };
  r.small ||= small;
  records.set(rel, r);
};
for (const e of EVENTS) {
  for (const img of e.images) want(`${e.folder}/${img}`);
  want(`${e.folder}/${e.preview}`, true);
}
want(C.portrait, true);

mkdir(path.join(CACHE, "thumbs"));
mkdir(path.join(CACHE, "og"));
const metaFile = path.join(CACHE, "meta.json");
const metaCache = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, "utf8")) : {};

async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) await fn(items[i++]); }));
}

let made = 0;
await pool([...records.values()], Math.max(2, os.cpus().length), async r => {
  const abs = path.join(root, r.rel);
  if (!fs.existsSync(abs)) throw new Error(`Missing image: ${r.rel}`);
  const buf = fs.readFileSync(abs);
  r.hash = hashOf(buf);
  if (!metaCache[r.hash]) {
    const m = await sharp(buf).metadata();
    const swap = (m.orientation || 1) >= 5;
    metaCache[r.hash] = { w: swap ? m.height : m.width, h: swap ? m.width : m.height };
  }
  Object.assign(r, metaCache[r.hash]);
  for (const w of [...THUMB_WIDTHS, ...(r.small ? [SMALL] : [])]) {
    const out = path.join(CACHE, "thumbs", `${r.hash}-${w}.webp`);
    if (fs.existsSync(out)) continue;
    await sharp(buf).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74, effort: 4 }).toFile(out);
    made++;
  }
});

const ogMade = [];
await pool(EVENTS, 4, async e => {
  const r = records.get(`${e.folder}/${e.preview}`);
  const out = path.join(CACHE, "og", `${r.hash}.jpg`);
  if (!fs.existsSync(out)) {
    await sharp(path.join(root, r.rel)).rotate().resize(1200, 630, { fit: "cover", position: sharp.strategy.attention }).jpeg({ quality: 80, mozjpeg: true }).toFile(out);
    ogMade.push(e.id);
  }
});
fs.writeFileSync(metaFile, JSON.stringify(metaCache));

// ---------- dist ----------
fs.rmSync(OUT, { recursive: true, force: true });
mkdir(OUT);
const enc = rel => rel.split("/").map(encodeURIComponent).join("/");
const base = rel => rel.replace(/\.[^.]+$/, "");
for (const r of records.values()) {
  const dst = path.join(OUT, r.rel);
  mkdir(path.dirname(dst));
  fs.copyFileSync(path.join(root, r.rel), dst);
  for (const w of [...THUMB_WIDTHS, ...(r.small ? [SMALL] : [])]) {
    fs.copyFileSync(path.join(CACHE, "thumbs", `${r.hash}-${w}.webp`), path.join(OUT, `${base(r.rel)}-${w}.webp`));
  }
}
const rec = rel => records.get(rel);
const src = r => `/${enc(r.rel)}?v=${r.hash}`;
const thumb = (r, w) => `/${enc(base(r.rel))}-${w}.webp?v=${r.hash}`;
const srcset = (r, { small = false, full = true } = {}) => [
  ...(small && r.small ? [`${thumb(r, SMALL)} ${Math.min(SMALL, r.w)}w`] : []),
  ...THUMB_WIDTHS.map(w => `${thumb(r, w)} ${Math.min(w, r.w)}w`),
  ...(full ? [`${src(r)} ${r.w}w`] : []),
].join(", ");

for (const f of ["favicon.svg", "favicon.ico", "favicon-32x32.png", "apple-touch-icon.png", "og-image.png"]) {
  fs.copyFileSync(path.join(root, f), path.join(OUT, f));
}
// ---------- justified gallery rows ----------
// For each band of screen widths the build decides which photos share a row: rows stay close to the target height
// and every row, the last one included, fills the width. `width` is a typical grid width in the band (main has 40px
// side padding above 760px and none on phones); `max` is the band's widest viewport; `rowH` is the target row height,
// about 20% above --row-h in styles.css so photos stay as large as in the old greedy layout. Each band becomes a media
// query appended to styles.css, so the layout needs no JavaScript.
const ROW_BANDS = [
  { key: "d4", max: null, width: 2400, gap: 8, rowH: 530 },
  { key: "d3", max: 2050, width: 1770, gap: 8, rowH: 530 },
  { key: "d2", max: 1650, width: 1420, gap: 8, rowH: 530 },
  { key: "d1", max: 1350, width: 1145, gap: 8, rowH: 530 },
  { key: "t2", max: 1100, width: 935, gap: 8, rowH: 385 },
  { key: "t1", max: 930, width: 765, gap: 8, rowH: 385 },
  { key: "p4", max: 760, width: 690, gap: 2, rowH: 215 },
  { key: "p3", max: 620, width: 550, gap: 2, rowH: 215 },
  { key: "p2", max: 480, width: 430, gap: 2, rowH: 215 },
  { key: "p1", max: 400, width: 385, gap: 2, rowH: 215 },
];
// Splits photos (aspect ratios, in order) into rows with the least squared deviation from the target height.
// Returns the indexes of photos that start a new row.
function rowStarts(ars, { width, gap, rowH }) {
  const n = ars.length, cost = [0], from = [0];
  for (let end = 1; end <= n; end++) {
    cost[end] = Infinity;
    for (let start = end - 1, sum = 0; start >= 0; start--) {
      sum += ars[start];
      const h = (width - gap * (end - start - 1)) / sum;
      if (h < rowH * 0.6 && end - start > 1) break; // adding photos only makes the row lower
      const c = cost[start] + (h / rowH - 1) ** 2;
      if (c < cost[end]) { cost[end] = c; from[end] = start; }
    }
  }
  const starts = new Set();
  for (let end = n; from[end] > 0; end = from[end]) starts.add(from[end]);
  return starts;
}
const rowBandCss = ROW_BANDS.map(b => b.max ? `@media (max-width: ${b.max}px) { .jb { --jb: var(--${b.key}, 0); } }` : `.jb { --jb: var(--${b.key}, 0); }`).join("\n");

const assetHash = {};
for (const f of ["styles.css", "site.js"]) {
  let buf = fs.readFileSync(path.join(root, "src", f));
  if (f === "styles.css") buf = Buffer.from(`${buf}\n/* row breaks per band of screen widths (generated by tools/build.mjs) */\n${rowBandCss}\n`);
  assetHash[f] = hashOf(buf);
  write(`assets/${f}`, buf);
}
fs.copyFileSync(path.join(root, "src", "_headers"), path.join(OUT, "_headers"));

// ---------- shared markup ----------
const icon = {
  close: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  share: '<svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden="true"><path d="M9 12.5V1.5M5.5 5L9 1.5l3.5 3.5M6 8H3.5v10h11V8H12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  prev: '<svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true"><path d="M8.5 1.5L1.5 9l7 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true"><path d="M1.5 1.5L8.5 9l-7 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chevron: '<svg class="chev" width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true"><path d="M1.5 1.5L6.5 7l-5 5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};
const mailto = subject => `mailto:${C.email}?subject=${encodeURIComponent(subject)}`;

function page({ title, description, path: p, og, noindex = false, section, body, viewer = null }) {
  const url = `${SITE}${p}`;
  const ogImg = og || { url: `${SITE}/og-image.png`, w: 1200, h: 630 };
  const navItem = (href, label, key) => `<a class="br" href="${href}"${section === key ? ' aria-current="page"' : ""}>${label}</a>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">\n' : ""}<meta property="og:type" content="website">
<meta property="og:site_name" content="Vinto">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg.url}">
<meta property="og:image:width" content="${ogImg.w}">
<meta property="og:image:height" content="${ogImg.h}">
<meta name="twitter:card" content="summary_large_image">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="alternate icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<script>try{var t=localStorage.getItem("vinto-theme");if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="stylesheet" href="/assets/styles.css?v=${assetHash["styles.css"]}">
<script src="/assets/site.js?v=${assetHash["site.js"]}" defer></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <a class="wm" href="/" aria-label="${esc(C.brand)} — home">${esc(C.brand)}</a>
  <a class="btn book" href="/about/#book"><span class="long">Book a date</span><span class="short">Book</span></a>
</header>
<nav class="nav glass" aria-label="Main">${navItem("/", "Selected", "selected")}${navItem("/work/", "Index", "index")}${navItem("/about/", "About", "about")}</nav>
<main id="main">
${body}
</main>
<footer class="foot">
  <a class="wm" href="/">${esc(C.brand)}</a>
  <nav aria-label="Contact"><a href="mailto:${C.email}">${C.email}</a><a class="out" href="${C.instagram.url}" rel="me">Instagram</a><a class="out" href="${C.x.url}" rel="me">X</a><span class="g">&copy; ${YEAR}</span></nav>
</footer>
${viewer ? viewerMarkup(viewer) : ""}
</body>
</html>
`;
}

function viewerMarkup({ photos, linkEvents }) {
  return `<dialog class="viewer" aria-label="Photo viewer">
  <div class="v-track" tabindex="-1"></div>
  <div class="v-top v-ui">
    <button class="gbtn glass-d v-close" type="button" aria-label="Close">${icon.close}</button>
    <div class="v-title glass-d">${linkEvents ? '<a class="v-event" href="/work/"></a>' : '<span class="v-event"></span>'}<span class="v-count"></span></div>
    <button class="gbtn glass-d v-share" type="button" aria-label="Share">${icon.share}</button>
  </div>
  <button class="gbtn glass-d v-prev v-ui" type="button" aria-label="Previous photo">${icon.prev}</button>
  <button class="gbtn glass-d v-next v-ui" type="button" aria-label="Next photo">${icon.next}</button>
  <div class="v-bottom v-ui"><p class="v-caption"></p><div class="v-film glass-d"></div></div>
  <div class="v-toast glass-d" role="status"></div>
</dialog>
<script type="application/json" id="photos">${json(photos)}</script>`;
}

const photoData = (r, e, i, linkEvents) => ({
  src: src(r), srcset: srcset(r), w: r.w, h: r.h,
  thumb: thumb(r, 480), ph: thumb(r, 960),
  alt: `${e.title} — photo ${i + 1}`, event: e.title, date: e.about?.date || "",
  ...(linkEvents ? { href: pageOf(e) } : {}),
});
const img = (r, { sizes, alt, eager = false, high = false, small = false, full = true, cls = "" }) =>
  `<img${cls ? ` class="${cls}"` : ""} src="${thumb(r, small && r.small ? SMALL : 480)}" srcset="${srcset(r, { small, full })}" sizes="${sizes}" width="${r.w}" height="${r.h}" alt="${esc(alt)}" ${eager ? 'loading="eager"' : 'loading="lazy"'} decoding="async"${high ? ' fetchpriority="high"' : ""}>`;

// ---------- home: Selected ----------
// Every photo gets the same 4:5 tile whatever its shape; `focus` in selected.js picks which part of the crop stays.
// On tablets and phones the first photo is a bigger 4:5 tile across the whole row (styles.css).
{
  const items = SELECTED.map((s, i) => {
    const e = byId.get(s.event), r = rec(`${e.folder}/${s.image}`);
    const caption = s.caption || e.title;
    return { e, r, caption, i, focus: s.focus };
  });
  const figs = items.map(({ e, r, caption, i, focus }) => `<figure${focus ? ` style="--focus:${focus}"` : ""}>
  <a class="ph" href="${src(r)}" data-i="${i}">${img(r, { sizes: i === 0 ? "(max-width: 760px) 100vw, (max-width: 1100px) 80vw, 300px" : "(max-width: 760px) 50vw, (max-width: 1100px) 40vw, 300px", alt: `${caption} — ${e.about?.date || e.year}`, eager: i < 3, high: i === 0 })}</a>
  <span class="pill glass-d">${esc(caption)}</span>
  <figcaption><a href="${pageOf(e)}">${esc(caption)}</a><span>${e.year}</span></figcaption>
</figure>`).join("\n");
  const body = `<div class="home">
<section class="intro" aria-label="About">
  <h1>${esc(C.headline[0])} <span>${esc(C.headline[1])}</span></h1>
  <p>${esc(C.intro)}</p>
  <span class="label">Worked with</span>
  <ul class="clients">${C.clients.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
  <div class="contact"><a href="mailto:${C.email}">${C.email}</a><a class="out" href="${C.instagram.url}" rel="me">Instagram ${esc(C.instagram.handle)}</a><a class="out" href="${C.x.url}" rel="me">X ${esc(C.x.handle)}</a></div>
</section>
<section class="sel" aria-label="Selected photographs">
${figs}
</section>
</div>`;
  write("index.html", page({
    title: "Vinto — Concert & Festival Photographer, Warsaw",
    description: `${C.name} (Vinto): concert, festival and artist photography from Warsaw. ${C.intro}`,
    path: "/", section: "selected", body,
    viewer: { photos: items.map(({ e, r, i }) => photoData(r, e, i, true)), linkEvents: true },
  }));
}

// ---------- Index (/work/) ----------
{
  const filters = [["All", "", ""], ["Festival", "FESTIVAL", "type"], ["Concert", "CONCERT", "type"], ["Club", "CLUB", "venue"], ["Arena", "ARENA", "venue"], ["Outdoor", "OUTDOOR", "venue"], ["Polish artists", "POLAND", "origin"], ["Foreign artists", "FOREIGN", "origin"]];
  const first = listed[0], fr = rec(`${first.folder}/${first.preview}`);
  const metaLine = e => `${e.about?.date || e.year} · ${e.about?.location || ""} · ${e.images.length} photos`;
  const rows = listed.map((e, i) => {
    const r = rec(`${e.folder}/${e.preview}`);
    return `<a class="row" href="${pageOf(e)}" data-order="${i}" data-year="${e.year}" data-name="${esc(e.title)}" data-type="${typeOf(e)}" data-place="${esc(placeOf(e))}" data-count="${e.images.length}" data-tags="${(e.tags || []).join(" ")}" data-pv-src="${thumb(r, 960)}" data-pv-srcset="${srcset(r, { full: false })}" data-meta="${esc(metaLine(e))}">${img(r, { cls: "row-thumb", sizes: "56px", alt: "", small: true, full: false })}<span class="y">${e.year}</span><span class="n">${esc(e.title)}<span class="meta">${e.year} · ${typeOf(e)} · ${esc(placeOf(e))} · ${e.images.length}</span></span><span class="t">${typeOf(e)}</span><span class="p">${esc(placeOf(e))}</span><span class="c">${e.images.length}</span>${icon.chevron}</a>`;
  }).join("\n");
  const body = `<div class="index">
<aside class="i-side">
  <div class="i-title"><h1>Index</h1><p class="i-count">${listed.length} events</p></div>
  <div class="filters" role="group" aria-label="Filter">${filters.map(([l, t, g]) => `<button class="br" type="button" data-tag="${t}" data-group="${g}" aria-pressed="${t ? "false" : "true"}">${l}</button>`).join("")}</div>
  <figure class="i-preview" aria-hidden="true">
    <div class="i-ph"><img class="on" src="${thumb(fr, 960)}" srcset="${srcset(fr, { full: false })}" sizes="(max-width: 1100px) 300px, 440px" width="${fr.w}" height="${fr.h}" alt="" decoding="async"><img alt="" decoding="async" sizes="(max-width: 1100px) 300px, 440px"></div>
    <figcaption><b>${esc(first.title)}</b><span>${esc(metaLine(first))}</span></figcaption>
  </figure>
</aside>
<section class="i-list" aria-label="All galleries">
  <div class="i-head"><button type="button" data-sort="year" aria-sort="descending">Year</button><button type="button" data-sort="name" aria-sort="none">Name</button><button type="button" data-sort="type" aria-sort="none">Type</button><button class="p" type="button" data-sort="place" aria-sort="none">Place</button><button type="button" data-sort="count" aria-sort="none">No.</button></div>
  <div class="i-rows">
${rows}
  </div>
</section>
</div>`;
  write("work/index.html", page({
    title: "Index — Vinto",
    description: `All ${listed.length} galleries by ${C.name} (Vinto): festivals, concerts, clubs and arenas, ${listed.at(-1).year}–${listed[0].year}.`,
    path: "/work/", section: "index", body,
  }));
}

// ---------- gallery pages (/work/<id>/) ----------
for (const e of EVENTS) {
  const listedHere = isListed(e);
  const pr = rec(`${e.folder}/${e.preview}`);
  mkdir(path.join(OUT, "work", e.id));
  fs.copyFileSync(path.join(CACHE, "og", `${pr.hash}.jpg`), path.join(OUT, "work", e.id, "og.jpg"));
  const recs = e.images.map(f => rec(`${e.folder}/${f}`));
  const bandStarts = ROW_BANDS.map(b => rowStarts(recs.map(r => r.w / r.h), b));
  const rowBreak = i => {
    const on = ROW_BANDS.filter((b, k) => bandStarts[k].has(i)).map(b => `--${b.key}:1`);
    return on.length ? `<i class="jb" style="${on.join(";")}"></i>\n` : "";
  };
  const tiles = recs.map((r, i) => `${rowBreak(i)}<a class="ph" href="${src(r)}" data-i="${i}" style="--ar:${(r.w / r.h).toFixed(4)}">${img(r, { sizes: "(max-width: 760px) 50vw, (max-width: 1100px) 45vw, 33vw", alt: `${e.title} — photo ${i + 1}`, eager: i < 3, high: i === 0 })}</a>`).join("\n");
  const li = listed.indexOf(e);
  const next = listedHere ? listed[(li + 1) % listed.length] : null;
  const nr = next && rec(`${next.folder}/${next.preview}`);
  const a = e.about || {};
  const body = `<article class="gallery">
<header class="g-head">
  <div>
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/work/">Index</a> / ${typeOf(e)} / ${e.year}</nav>
    <h1 class="g-title">${esc(e.title)}</h1>
  </div>
  <div class="g-info">
    ${a.description ? `<p class="g-desc">${esc(a.description)}</p>` : ""}
    <dl class="g-meta">${a.date ? `<dt>Date</dt><dd>${esc(a.date)}</dd>` : ""}${a.location ? `<dt>Place</dt><dd>${esc(a.location)}</dd>` : ""}${a.client ? `<dt>Client</dt><dd>${esc(a.client)}</dd>` : ""}<dt>Photos</dt><dd>${recs.length} · ${esc(C.name)}</dd></dl>
  </div>
</header>
<div class="jgrid">
${tiles}
</div>
${next ? `<a class="g-next" href="${pageOf(next)}"><span><span class="label">Next</span><span class="t">${esc(next.title)} &rarr;</span></span>${img(nr, { sizes: "120px", alt: "", small: true, full: false })}</a>` : ""}
<div class="bgt" role="group" aria-label="Background"><button class="br" type="button" data-theme-set="light" aria-pressed="false">White</button><button class="br" type="button" data-theme-set="dark" aria-pressed="false">Black</button></div>
</article>`;
  write(`work/${e.id}/index.html`, page({
    title: `${e.title} — Vinto`,
    description: a.description || `${e.title}, photographed by ${C.name} (Vinto).`,
    path: pageOf(e), section: "index", noindex: !listedHere, body,
    og: { url: `${SITE}/work/${e.id}/og.jpg?v=${pr.hash}`, w: 1200, h: 630 },
    viewer: { photos: recs.map((r, i) => photoData(r, e, i, false)), linkEvents: false },
  }));
}

// ---------- About & Book ----------
{
  const pr = rec(C.portrait);
  const body = `<div class="about">
<section class="a-side">
  <h1>About</h1>
  <div class="a-profile">${img(pr, { sizes: "88px", alt: `Portrait of ${C.name}`, small: true, full: false, eager: true })}<div><b>${esc(C.name)}</b><span>${esc(C.role)}</span><span>${esc(C.location)}</span></div></div>
  <p class="a-bio">${esc(C.bio)}</p>
</section>
<section class="a-main">
  <h2 class="label" id="book">Book</h2>
  <ul class="card">${C.services.map(s => `<li><a href="${mailto(`Booking — ${s}`)}">${esc(s)}${icon.chevron}</a></li>`).join("")}</ul>
  <p class="a-note">${esc(C.bookingNote)}</p>
  <a class="btn btn-lg" href="${mailto(C.bookingSubject)}">Write an email</a>
  <div class="a-links"><a class="out" href="${C.instagram.url}" rel="me">Instagram</a><a class="out" href="${C.x.url}" rel="me">X</a></div>
  <div class="a-clients"><h2 class="label">Worked with</h2><p>${C.clients.map(esc).join(" · ")}</p></div>
</section>
</div>`;
  write("about/index.html", page({
    title: "About & Book — Vinto",
    description: `${C.name}: ${C.role.toLowerCase()}. ${C.location}. ${C.services.join(", ")}.`,
    path: "/about/", section: "about", body,
  }));
}

// ---------- 404, old links, robots, sitemap ----------
write("404.html", page({
  title: "Not found — Vinto", description: "This page does not exist.", path: "/404", noindex: true, section: "",
  body: `<div class="lost"><h1>Not found</h1><p>This page doesn't exist — maybe the gallery moved.</p><a class="btn" href="/work/">Open the Index</a></div>`,
}));
write("gallery.html", `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Vinto</title><meta name="robots" content="noindex">
<script>var id=new URLSearchParams(location.search).get("event");location.replace(id?"/work/"+encodeURIComponent(id)+"/"+location.hash:"/work/");</script>
<noscript><meta http-equiv="refresh" content="0; url=/work/"></noscript></head>
<body><a href="/work/">Index</a></body></html>
`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["/", "/work/", "/about/", ...listed.map(pageOf)].map(p => `  <url><loc>${SITE}${p}</loc></url>`).join("\n")}
</urlset>
`);

// ---------- summary ----------
let files = 0, bytes = 0;
(function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else { files++; bytes += fs.statSync(p).size; } } })(OUT);
console.log(`Built ${listed.length} public + ${EVENTS.length - listed.length} unlisted galleries, ${records.size} images (${made} new thumbnails, ${ogMade.length} new link previews) → ${path.relative(root, OUT)}/ (${files} files, ${(bytes / 1048576).toFixed(1)} MB)`);
