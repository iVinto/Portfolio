/**
 * SELECTED — the home page (vinto.work/)
 * =====================================
 * 12–20 strongest frames, mixed on purpose: stage, crowd, wide shot, detail.
 * Each entry points at an event id from events.js and one of its images.
 * The order below does not matter: the page shuffles the photos on every visit, and whichever comes first
 * is the hero, a bigger tile across the whole row on tablets and phones.
 * Every photo is cropped to the same 4:5 tile, whatever its shape (horizontal and square ones too).
 *
 *   event    - id from events.js (hidden events are not allowed here)
 *   image    - file name inside that event's folder. The number in the photo viewer ("6 / 9") is the photo's
 *              position in the gallery, which is not always its file name (Kuban's gallery runs 9.webp → 1.webp).
 *   caption  - short label under the photo (optional, defaults to the event title)
 *   focus    - which part of the photo the 4:5 crop keeps, as CSS object-position (optional, default "50% 50%")
 */
const SELECTED = [
  { event: "trippie-redd-clout", image: "3.webp", caption: "Trippie Redd / Clout 3.0" },
  { event: "fka-twigs-opener2025", image: "2.webp", caption: "FKA twigs / Open'er" },
  { event: "kuqe2115-nareszcie-w-trasie-vol2", image: "10.webp", caption: "Kuqe 2115 / Tour" },
  { event: "clout-festival-4", image: "1.webp", caption: "Clout Festival 4.0" },
  { event: "owf-yungblud", image: "4.webp", caption: "Yungblud / Orange Warsaw" },
  { event: "owf-yeat", image: "4.webp", caption: "Yeat / Orange Warsaw" },
  { event: "zabson-ostatniziomal", image: "4.webp", caption: "Żabson / Torwar" },
  { event: "kuban-opener2025", image: "4.webp", caption: "Kuban / Open'er" },
  { event: "jakubonstagamegahiphoptour", image: "2.webp", caption: "Jakub on Stage / Mega Hip-Hop Tour" },
  { event: "mata-gliwice", image: "2.webp", caption: "Mata / Arena Gliwice" },
  { event: "youngmulti-sbm2023", image: "1.webp", caption: "Young Multi / SBM" },
  { event: "trippie-redd-clout", image: "11.webp", caption: "Trippie Redd / Clout 3.0" },
  { event: "clout20", image: "5.webp", caption: "Clout Festival 2.0" },
  { event: "2115-strefa57", image: "3.webp", caption: "2115 / Strefa57" },
  { event: "mata-tour", image: "8.webp", caption: "Mata Tour" },
];
