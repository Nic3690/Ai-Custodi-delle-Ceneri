import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, User } from "lucide-react";
import GradientText from "@/components/text/GradientText";

const artworks = [
  {
    story: "The Fractured Protocol",
    pieces: [
      {
        title: "Memory Fragments",
        artist: "Alex Cyber",
        link: "https://example.com/artist1",
        description: "Digital consciousness dissolving into data streams",
      },
      {
        title: "The Protocol Chamber",
        artist: "Sarah Neon",
        link: "https://example.com/artist2",
        description: "Where memories are stored and manipulated",
      },
    ],
  },
  {
    story: "Neon Ghosts",
    pieces: [
      {
        title: "Digital Afterlife",
        artist: "Marcus Glitch",
        link: "https://example.com/artist3",
        description: "Souls trapped in abandoned servers",
      },
      {
        title: "Ghost Protocol",
        artist: "Elena Dark",
        link: "https://example.com/artist4",
        description: "The liminal space between life and code",
      },
    ],
  },
  {
    story: "Silent Uprising",
    pieces: [
      {
        title: "Underground Network",
        artist: "Alex Cyber",
        link: "https://example.com/artist1",
        description: "The hidden infrastructure of rebellion",
      },
    ],
  },
  {
    story: "The Last Analog",
    pieces: [
      {
        title: "Unplugged",
        artist: "Sarah Neon",
        link: "https://example.com/artist2",
        description: "One person's refusal to upgrade",
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
          Interpretazioni visive dei mondi distopici da artisti talentuosi.
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
                    <div className="h-64 bg-muted border-b border-border flex items-center justify-center">
                      <p className="text-muted-foreground font-mono text-sm">
                        Artwork Placeholder
                      </p>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                        {piece.title}
                      </CardTitle>
                      <CardDescription>
                        {piece.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <a
                        href={piece.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span>{piece.artist}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
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
          <p className="text-primary">
            Contattami per collaborare
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
