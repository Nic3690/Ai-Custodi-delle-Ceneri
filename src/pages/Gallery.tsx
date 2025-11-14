import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, User } from "lucide-react";

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
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center hologram">
          <span className="neon-text">GALLERY</span>
        </h1>
        
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Visual interpretations of dystopian worlds by talented artists. Click to visit their channels.
        </p>
        
        <div className="space-y-12">
          {artworks.map((storyArt, storyIndex) => (
            <div key={storyIndex}>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary font-mono border-l-4 border-primary pl-4">
                {storyArt.story}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {storyArt.pieces.map((piece, pieceIndex) => (
                  <Card
                    key={pieceIndex}
                    className="cyber-glow bg-card border-border hover:border-secondary transition-all duration-300 hover:scale-105 group"
                  >
                    {/* Placeholder for artwork image */}
                    <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 border-b border-border flex items-center justify-center">
                      <p className="text-muted-foreground font-mono text-sm">
                        // ARTWORK_PLACEHOLDER
                      </p>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl font-bold group-hover:text-secondary transition-colors">
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
                        className="flex items-center gap-2 text-primary hover:text-secondary transition-colors font-mono"
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
        
        <div className="mt-16 text-center cyber-glow bg-card p-8 rounded-lg">
          <p className="text-lg text-card-foreground mb-4">
            Want to contribute artwork for these stories?
          </p>
          <p className="text-primary font-mono">
            &gt; contact_for_collaboration()
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
