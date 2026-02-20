import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, User } from "lucide-react";
import { Link } from "react-router-dom";
import GradientText from "@/components/text/GradientText";

interface ArtistLink {
  name: string;
  link: string;
}

interface Piece {
  title: string;
  artists: ArtistLink[];
  description: string;
  image?: string | null;
}

interface StoryArt {
  story: string;
  pieces: Piece[];
}

const artworks: StoryArt[] = [
  {
    story: "La Grande Pesca",
    pieces: [
      {
        title: "La prima collaborazione non si scorda mai",
        artists: [
          { name: "Walter Pilato", link: "https://www.instagram.com/pil_wal_art?igsh=d2J0dWNrN3kwMmx2" },
        ],
        description: "Due illustrazioni a quattro mani per un racconto breve",
        image: "/images/tav_2.png",
      },
    ],
  },
  {
    story: "La Stazione del Ritorno",
    pieces: [
      {
        title: "Due illustrazioni a quattro mani per un racconto breve",
        artists: [
          { name: "Walter Pilato", link: "https://www.instagram.com/pil_wal_art?igsh=d2J0dWNrN3kwMmx2" },
          { name: "Luca Picone", link: "https://www.instagram.com/luca.zowie?igsh=MWx0Nm1pczFud2Fidg==" },
        ],
        description: "",
        image: null,
      },
    ],
  },
];

const Gallery = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <GradientText
            className="text-4xl md:text-6xl font-bold uppercase tracking-widest"
            colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
            animationSpeed={6}
            style={{ fontFamily: "'Equinox', sans-serif" }}
          >
            GALLERIA
          </GradientText>
        </div>

        <p className="text-center text-muted-foreground mb-12 text-lg">
          Interpretazioni visive ispirate agli scritti della saga.
        </p>

        <div className="space-y-12">
          {artworks.map((storyArt, storyIndex) => (
            <div key={storyIndex}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary border-l-4 border-primary pl-4">
                {storyArt.story}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {storyArt.pieces.map((piece, pieceIndex) => (
                  <Card
                    key={pieceIndex}
                    className="bg-card border-border hover:border-primary transition-all duration-300 group"
                  >
                    <div className="h-64 bg-muted border-b border-border flex items-center justify-center overflow-hidden">
                      {piece.image ? (
                        <img
                          src={piece.image}
                          alt={piece.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <p className="text-muted-foreground font-mono text-sm">
                          // DATI IN ARRIVO
                        </p>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {piece.title}
                      </CardTitle>
                      {piece.description && (
                        <CardDescription>
                          {piece.description}
                        </CardDescription>
                      )}
                    </CardHeader>

                    <CardContent>
                      {piece.artists.map((artist, artistIndex) => (
                        <a
                          key={artistIndex}
                          href={artist.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-1 last:mb-0"
                        >
                          <User className="h-4 w-4" />
                          <span>{artist.name}</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8">
          <p className="text-lg text-card-foreground mb-4">
            Vuoi contribuire con le tue opere?
          </p>
          <Link to="/contacts" className="text-primary hover:text-primary/80 transition-colors">
            Contattami per collaborare
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
