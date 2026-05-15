/**
 * PORTFOLIO EVENTS CONFIG
 * ========================
 * To add a new event, just add an object to the EVENTS array below.
 * Then drop your photos into the Photography folder.
 *
 * Fields:
 *   id          - URL slug (used as ?event=this-value)
 *   title       - Display name in the portfolio table
 *   year        - Year of the event
 *   tags        - Array of filter tags: FESTIVAL, CONCERT, CLUB, ARENA, OUTDOOR, POLAND, FOREIGN
 *   folder      - Path to image folder (relative to Photography/)
 *   images      - Array of filenames in that folder
 *   columns     - Grid columns for gallery (2 or 3)
 *   preview     - Which image to show on hover in the table (e.g. "2.webp")
 *   about       - Object with: title, description, date, location
 *   category    - Category: "concerts", "editorials", or "others"
 *   hidden      - (optional) If true, hidden from list but accessible via direct link
 */

const EVENTS = [
  {
    id: "2115-strefa57",
    title: "2115 | STREFA57",
    year: 2026,
    tags: ["CONCERT", "OUTDOOR", "POLAND"],
    category: "concerts",
    hidden: true,
    folder: "Photography_web/2115Strefa57",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp"],
    columns: 3,
    preview: "1.webp",
    about: {
      title: "2115 | Strefa57",
      description: "Live documentation prepared for 2115 during the Strefa57 show.",
      date: "02.05.2026",
      location: "Strefa 57, Przytkowice, Poland"
    }
  },
  {
    id: "kuqe2115-nareszcie-w-trasie-vol2",
    title: "KUQE 2115 / NARESZCIE W TRASIE VOL. 2",
    year: 2025,
    tags: ["CLUB", "CONCERT", "POLAND"],
    category: "concerts",
    folder: "Photography_web/kuqe2115_nareszcie_w_trasie_vol2",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp"],
    columns: 3,
    preview: "1.webp",
    about: {
      title: "KUQE 2115 — NARESZCIE W TRASIE VOL. 2",
      description: "Tour documentation covering live performance, promotional moments and backstage material for the artist team.",
      date: "11–12.2025",
      location: "Poland"
    }
  },
  {
    id: "clout-festival-4",
    title: "CLOUT FESTIVAL 4.0",
    year: 2025,
    tags: ["OUTDOOR", "FESTIVAL", "FOREIGN"],
    category: "concerts",
    folder: "Photography_web/CloutFestival4.0",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp"],
    columns: 3,
    preview: "3.webp",
    about: {
      title: "CLOUT FESTIVAL 4.0",
      description: "Selected festival coverage created for CLOUT / BIG IDEA, focused on live performance, production scale and the site.",
      date: "11–12.07.2025",
      location: "Bemowo Airport, Warsaw, Poland"
    }
  },
  {
    id: "fka-twigs-opener2025",
    title: "FKA TWIGS / OPEN'ER FESTIVAL 2025",
    year: 2025,
    tags: ["OUTDOOR", "FESTIVAL", "FOREIGN"],
    category: "concerts",
    folder: "Photography_web/FKA_Twigs_Opener2025",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"],
    columns: 3,
    preview: "1.webp",
    about: {
      title: "FKA TWIGS AT OPEN'ER FESTIVAL 2025",
      description: "Festival coverage prepared for Radio 357 during Open'er Festival 2025.",
      date: "04.07.2025",
      location: "Lotnisko Gdynia-Kosakowo, Gdynia, Poland"
    }
  },
  {
    id: "kuban-opener2025",
    title: "KUBAN / OPEN'ER FESTIVAL 2025",
    year: 2025,
    tags: ["OUTDOOR", "FESTIVAL", "POLAND"],
    category: "concerts",
    folder: "Photography_web/Kuban_Opener2025",
    images: ["9.webp", "8.webp", "7.webp", "6.webp", "5.webp", "4.webp", "3.webp", "2.webp", "1.webp"],
    columns: 3,
    preview: "9.webp",
    about: {
      title: "KUBAN AT OPEN'ER FESTIVAL 2025",
      description: "Festival coverage prepared for Radio 357 during Open'er Festival 2025.",
      date: "05.07.2025",
      location: "Lotnisko Gdynia-Kosakowo, Gdynia, Poland"
    }
  },
  {
    id: "trippie-redd-clout",
    title: "TRIPPIE REDD / CLOUT FESTIVAL 3.0",
    year: 2024,
    tags: ["OUTDOOR", "FESTIVAL", "FOREIGN"],
    category: "concerts",
    folder: "Photography_web/TrippieRedd_Clout",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp"],
    columns: 3,
    preview: "4.webp",
    about: {
      title: "TRIPPIE REDD AT CLOUT FESTIVAL 3.0",
      description: "Festival coverage created for CLOUT / BIG IDEA, focused on the show, staging and backstage rhythm.",
      date: "13.07.2024",
      location: "Tor Wyscigow Konnych Sluzewiec, Warsaw, Poland"
    }
  },
  {
    id: "poland-portugal-porto",
    title: "POLAND - PORTUGAL / PORTO",
    year: 2024,
    tags: [],
    category: "others",
    folder: "Photography_web/Poland_Portugal_Porto",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp"],
    columns: 3,
    preview: "1.webp",
    about: {
      title: "POLAND - PORTUGAL / PORTO",
      description: "A travel and matchday photo story from Porto, built around the city, movement and the Poland - Portugal fixture.",
      date: "15.11.2024",
      location: "Porto, Portugal"
    }
  },
  {
    id: "owf-yeat",
    title: "YEAT / ORANGE WARSAW FESTIVAL",
    year: 2024,
    tags: ["OUTDOOR", "FESTIVAL", "FOREIGN"],
    category: "concerts",
    folder: "Photography_web/OWF_yeat",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"],
    columns: 3,
    preview: "4.webp",
    about: {
      title: "YEAT AT ORANGE WARSAW FESTIVAL",
      description: "Editorial festival coverage from Orange Warsaw Festival, centered on stage presence and production context.",
      date: "08.06.2024",
      location: "Tor Wyscigow Konnych Sluzewiec, Warsaw, Poland"
    }
  },
  {
    id: "owf-yungblud",
    title: "YUNGBLUD / ORANGE WARSAW FESTIVAL",
    year: 2024,
    tags: ["OUTDOOR", "FESTIVAL", "FOREIGN"],
    category: "concerts",
    folder: "Photography_web/OWF_Yungblud",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"],
    columns: 3,
    preview: "2.webp",
    about: {
      title: "YUNGBLUD AT ORANGE WARSAW FESTIVAL",
      description: "Editorial festival coverage from Orange Warsaw Festival, centered on stage presence and production context.",
      date: "07.06.2024",
      location: "Tor Wyscigow Konnych Sluzewiec, Warsaw, Poland"
    }
  },
  {
    id: "owf-kencarson",
    title: "KEN CARSON / ORANGE WARSAW FESTIVAL",
    year: 2024,
    tags: ["OUTDOOR", "FESTIVAL", "FOREIGN"],
    category: "concerts",
    folder: "Photography_web/OWF_KenCarson",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"],
    columns: 3,
    preview: "1.webp",
    about: {
      title: "KEN CARSON AT ORANGE WARSAW FESTIVAL",
      description: "Editorial festival coverage from Orange Warsaw Festival, centered on stage presence and production context.",
      date: "07.06.2024",
      location: "Tor Wyscigow Konnych Sluzewiec, Warsaw, Poland"
    }
  },
  {
    id: "bambi-irl-tour",
    title: "BAMBI / IRL TOUR WARSAW",
    year: 2024,
    tags: ["CLUB", "CONCERT", "POLAND"],
    category: "concerts",
    folder: "Photography_web/Bambi",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"],
    columns: 3,
    preview: "2.webp",
    about: {
      title: "BAMBI IRL TOUR",
      description: "A compact live story from the Warsaw stop of IRL Tour, focused on stage language, styling and lighting.",
      date: "12.04.2024",
      location: "Warsaw, Progresja"
    }
  },
  {
    id: "youngmulti-sbm2023",
    title: "YOUNG MULTI / SBMFFESTIVAL 2023",
    year: 2023,
    tags: ["FESTIVAL", "OUTDOOR", "POLAND"],
    category: "concerts",
    folder: "Photography_web/YoungMultiSBM2023",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp"],
    columns: 2,
    preview: "1.webp",
    about: {
      title: "YOUNG MULTI AT SBMFFESTIVAL 2023",
      description: "Festival coverage from SBMFFestival 2023, built around the live set and the summer setting at Bemowo.",
      date: "26.08.2023",
      location: "Warsaw, Bemowo Airport"
    }
  },
  {
    id: "sbm2023",
    title: "SBMFFESTIVAL 2023",
    year: 2023,
    tags: ["FESTIVAL", "OUTDOOR", "POLAND"],
    category: "concerts",
    folder: "Photography_web/SBM2023",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp"],
    columns: 3,
    preview: "11.webp",
    about: {
      title: "SBMFFESTIVAL 2023",
      description: "Festival coverage from SBMFFestival 2023, documenting the scale of the event across several days.",
      date: "23-26.08.2023",
      location: "Bemowo Airport, Warsaw, Poland"
    }
  },
  {
    id: "clout20",
    title: "CLOUT FESTIVAL 2.0",
    year: 2023,
    tags: ["OUTDOOR", "FESTIVAL", "FOREIGN"],
    category: "concerts",
    folder: "Photography_web/CLOUT2.0",
    images: [
      "1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp",
      "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp",
      "17.webp", "18.webp", "19.webp", "20.webp", "21.webp", "22.webp", "23.webp", "24.webp"
    ],
    columns: 3,
    preview: "5.webp",
    about: {
      title: "CLOUT FESTIVAL 2.0",
      description: "Festival coverage created for CLOUT / BIG IDEA, focused on performances, site layout and production scale.",
      date: "08-09.07.2023",
      location: "Legia Stadion, Warsaw, Poland"
    }
  },
  {
    id: "zabson-ostatniziomal",
    title: "ŻABSON / OSTATNI ZIOMAL TOUR WARSAW",
    year: 2023,
    tags: ["CONCERT", "ARENA", "POLAND"],
    category: "concerts",
    folder: "Photography_web/zabson_ostatniziomal",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp"],
    columns: 3,
    preview: "9.webp",
    about: {
      title: "ŻABSON OSTATNI ZIOMAL TOUR 2023",
      description: "Arena concert coverage from the Warsaw stop of Ostatni Ziomal Tour, focused on staging, movement and scale.",
      date: "01.04.2023",
      location: "Warsaw, Torwar"
    }
  },
  {
    id: "mata-gliwice",
    title: "MATA / MATA TOUR GLIWICE",
    year: 2023,
    tags: ["CONCERT", "ARENA", "POLAND"],
    category: "concerts",
    folder: "Photography_web/MataGliwice",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp"],
    columns: 3,
    preview: "2.webp",
    about: {
      title: "MATA TOUR GLIWICE",
      description: "Tour documentation from the Gliwice finale, focused on production scale, stage design and performance.",
      date: "28.01.2023",
      location: "Gliwice, Arena Gliwice"
    }
  },
  {
    id: "pierreroadtoclout",
    title: "PI'ERRE BOURNE / ROAD TO CLOUT",
    year: 2022,
    tags: ["CLUB", "CONCERT", "FOREIGN"],
    category: "concerts",
    folder: "Photography_web/PierreRoadToClout",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"],
    columns: 2,
    preview: "3.webp",
    about: {
      title: "ROAD TO CLOUT: PI'ERRE BOURNE",
      description: "Club show coverage from Road to CLOUT, created around the intimacy and pressure of the room.",
      date: "11.11.2022",
      location: "Legia Stadion, Warsaw, Poland"
    }
  },
  {
    id: "mata-tour",
    title: "MATA / MATA TOUR :)",
    year: 2022,
    tags: ["CONCERT", "OUTDOOR", "POLAND"],
    category: "concerts",
    folder: "Photography_web/MATA_TOUR",
    images: [
      "1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp",
      "9.webp", "10.webp", "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp"
    ],
    columns: 2,
    preview: "7.webp",
    about: {
      title: "MATA TOUR :) 2022",
      description: "Summer tour documentation for MATA / GOMBAO33 across Krakow, Poznan and Lodz.",
      date: "2022",
      location: "Krakow / Poznan / Lodz, Poland"
    }
  },
  {
    id: "white2115prettyboyour",
    title: "WHITE 2115 / PRETTY BOY TOUR",
    year: 2022,
    tags: ["CONCERT", "OUTDOOR", "POLAND"],
    category: "concerts",
    folder: "Photography_web/White2115PrettyBoyTour",
    images: ["1.webp", "2.webp", "3.webp"],
    columns: 3,
    preview: "1.webp",
    about: {
      title: "WHITE 2115 PRETTY BOY TOUR",
      description: "Outdoor concert coverage from Pretty Boy Tour, focused on the artist, staging and late-summer setting.",
      date: "16.09.2022",
      location: "Progresja, Warsaw"
    }
  },
  {
    id: "jakubonstagamegahiphoptour",
    title: "JAKUB ON STAGE / MEGA HIP-HOP TOUR",
    year: 2022,
    tags: ["CONCERT", "OUTDOOR", "POLAND"],
    category: "concerts",
    folder: "Photography_web/JakubOnStageMegaHipHopTour",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"],
    columns: 2,
    preview: "2.webp",
    about: {
      title: "JAKUB ON STAGE MEGA HIP-HOP TOUR",
      description: "Concert coverage from Mega Hip-Hop Tour, built around local scale, stage movement and the outdoor setting.",
      date: "02.09.2022",
      location: "Zielonka, Poland"
    }
  },
  {
    id: "kacperczyksbm2022",
    title: "BRACIA KACPERCZYK / SBM 2022",
    year: 2022,
    tags: ["FESTIVAL", "OUTDOOR", "POLAND"],
    category: "concerts",
    folder: "Photography_web/KacperczykSBM2022",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp"],
    columns: 3,
    preview: "6.webp",
    about: {
      title: "BRACIA KACPERCZYK AT SBMFFESTIVAL 2022",
      description: "Festival coverage from SBMFFestival 2022, focused on the band's live set and open-air setting.",
      date: "25.08.2022",
      location: "Bemowo Airport, Warsaw"
    }
  },
  {
    id: "klaksonsbm2022",
    title: "MŁODY KLAKSON / SBM 2022",
    year: 2022,
    tags: ["FESTIVAL", "OUTDOOR", "POLAND"],
    category: "concerts",
    folder: "Photography_web/KlaksonSBM2022",
    images: ["1.webp", "2.webp", "3.webp", "4.webp"],
    columns: 2,
    preview: "1.webp",
    about: {
      title: "MŁODY KLAKSON AT SBMFFESTIVAL 2022",
      description: "Festival coverage from SBMFFestival 2022, focused on raw stage movement and the Bemowo setting.",
      date: "26.08.2022",
      location: "Bemowo Airport, Warsaw"
    }
  },
  {
    id: "mata-bemowo",
    title: "MATA / BEMOWO",
    year: 2021,
    tags: ["CONCERT", "OUTDOOR", "POLAND"],
    category: "concerts",
    folder: "Photography_web/MataBemowo",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp"],
    columns: 3,
    preview: "3.webp",
    about: {
      title: "MATA BEMOWO 2021",
      description: "Outdoor concert coverage from Bemowo, documenting an early large-scale MATA show in Warsaw.",
      date: "2021",
      location: "Bemowo, Warsaw"
    }
  }
];
