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
      description: "Festival Media Team work for CLOUT/BIG IDEA.",
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
      description: "Photo relation for Radio 357.",
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
      description: "Photo relation for Radio 357.",
      date: "05.07.2025",
      location: "Lotnisko Gdynia-Kosakowo, Gdynia, Poland"
    }
  },
  {
    id: "kuqe2115-nareszcie-w-trasie-vol2",
    title: "KUQE 2115 / NARESZCIE W TRASIE VOL. 2",
    year: 2025,
    tags: ["CLUB", "CONCERT", "POLAND"],
    category: "concerts",
    hidden: true,
    folder: "Photography_web/kuqe2115_nareszcie_w_trasie_vol2",
    images: ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp", "11.webp", "12.webp"],
    columns: 3,
    preview: "1.webp",
    about: {
      title: "KUQE 2115 — NARESZCIE W TRASIE VOL. 2",
      description: "Photo relation from tour for artist, booking and management. Promotional shoots and backstage.",
      date: "11–12.2025",
      location: "Poland"
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
      description: "Festival Media Team work for CLOUT/BIG IDEA.",
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
      description: "",
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
      description: "Photo relation from OWF for a media outlet.",
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
      description: "Photo relation from OWF for a media outlet.",
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
      description: "Photo relation from OWF for a media outlet.",
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
      description: "Experimental personal project.",
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
      description: "Personal project.",
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
      description: "Photo relation from SBM for a media outlet.",
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
      description: "Festival Media Team work for CLOUT/BIG IDEA.",
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
      description: "Personal project.",
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
      description: "Final documentation of the tour.",
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
      description: "Work for CLOUT/BIG IDEA.",
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
      description: "Summer tour concert relation for MATA/GOMBAO33.",
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
      description: "Personal project.",
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
      description: "Personal project.",
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
      description: "Personal project.",
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
      description: "Personal project.",
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
      description: "Personal project.",
      date: "2021",
      location: "Bemowo, Warsaw"
    }
  }
];
