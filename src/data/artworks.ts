export interface ArtistLink {
  name: string;
  link: string;
}

export interface Piece {
  title: string;
  artists: ArtistLink[];
  description: string;
  images: string[];
}

export interface StoryArt {
  slug: string;
  story: string;
  cover?: string | null;
  pieces: Piece[];
}

export const artworks: StoryArt[] = [
  {
    slug: "la-grande-pesca",
    story: "La Grande Pesca",
    cover: "/images/tav_2.png",
    pieces: [
      {
        title: "La prima collaborazione non si scorda mai",
        artists: [
          { name: "Walter Pilato", link: "https://www.instagram.com/pil_wal_art?igsh=d2J0dWNrN3kwMmx2" },
        ],
        description: "",
        images: [
          "/images/la_grande_pesca/IMG_0587.webp",
          "/images/la_grande_pesca/IMG_0592.webp",
          "/images/la_grande_pesca/IMG_0603.webp",
          "/images/la_grande_pesca/IMG_0589.webp",
          "/images/la_grande_pesca/IMG_0590.webp",
        ],
      },
    ],
  },
  {
    slug: "la-stazione-del-ritorno",
    story: "La Stazione del Ritorno",
    cover: null,
    pieces: [
      {
        title: "",
        artists: [
          { name: "Walter Pilato", link: "https://www.instagram.com/pil_wal_art?igsh=d2J0dWNrN3kwMmx2" },
          { name: "Luca Picone", link: "https://www.instagram.com/luca.zowie?igsh=MWx0Nm1pczFud2Fidg==" },
        ],
        description: "Due illustrazioni a quattro mani per un racconto breve",
        images: [],
      },
    ],
  },
];

export const findStoryBySlug = (slug: string | undefined): StoryArt | undefined =>
  artworks.find((s) => s.slug === slug);

export const countTavole = (story: StoryArt): number =>
  story.pieces.reduce((sum, p) => sum + p.images.length, 0);
