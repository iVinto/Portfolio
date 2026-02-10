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
 *   preview     - Which image to show on hover in the table (e.g. "2.jpg")
 *   about       - Object with: title, description, date, location
 */

const EVENTS = [
  {
    id: "owf-yeat",
    title: "YEAT / ORANGE WARSAW FESTIVAL",
    year: 2024,
    tags: ["OUTDOOR", "FESTIVAL", "FOREIGN"],
    folder: "Photography/OWF_yeat",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    columns: 3,
    preview: "4.jpg",
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
    folder: "Photography/OWF_Yungblud",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"],
    columns: 3,
    preview: "2.jpg",
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
    folder: "Photography/OWF_KenCarson",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    columns: 3,
    preview: "1.jpg",
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
    folder: "Photography/Bambi",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    columns: 3,
    preview: "2.jpg",
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
    folder: "Photography/YoungMultiSBM2023",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],
    columns: 2,
    preview: "1.jpg",
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
    folder: "Photography/SBM2023",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg"],
    columns: 3,
    preview: "11.jpg",
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
    folder: "Photography/CLOUT2.0",
    images: [
      "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg",
      "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg",
      "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg"
    ],
    columns: 3,
    preview: "5.jpg",
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
    folder: "Photography/zabson_ostatniziomal",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"],
    columns: 3,
    preview: "9.jpg",
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
    folder: "Photography/MataGliwice",
    images: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg"],
    columns: 3,
    preview: "2.jpeg",
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
    folder: "Photography/PierreRoadToClout",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    columns: 2,
    preview: "3.jpg",
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
    folder: "Photography/MATA_TOUR",
    images: [
      "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg",
      "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg"
    ],
    columns: 2,
    preview: "7.jpg",
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
    folder: "Photography/White2115PrettyBoyTour",
    images: ["1.jpeg", "2.jpeg", "3.jpeg"],
    columns: 3,
    preview: "1.jpeg",
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
    folder: "Photography/JakubOnStageMegaHipHopTour",
    images: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpg", "6.jpeg", "7.jpg"],
    columns: 2,
    preview: "2.jpeg",
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
    folder: "Photography/KacperczykSBM2022",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"],
    columns: 3,
    preview: "6.jpg",
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
    folder: "Photography/KlaksonSBM2022",
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
    columns: 2,
    preview: "1.jpg",
    about: {
      title: "MŁODY KLAKSON AT SBMFFESTIVAL 2022",
      description: "Personal project.",
      date: "26.08.2022",
      location: "Bemowo Airport, Warsaw"
    }
  },
  {
    id: "mata-bemowo",
    title: "MATA",
    year: 2021,
    tags: ["CONCERT", "OUTDOOR", "POLAND"],
    folder: "Photography/MataBemowo",
    images: ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"],
    columns: 3,
    preview: "3.jpeg",
    about: {
      title: "MATA BEMOWO 2021",
      description: "Personal project.",
      date: "2021",
      location: "Bemowo, Warsaw"
    }
  }
];
