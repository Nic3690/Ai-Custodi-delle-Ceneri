import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const stories = [
  {
    title: "The Fractured Protocol",
    description: "In a world where memories can be edited, one programmer discovers the truth behind the system. When reality itself becomes malleable, what remains constant?",
    year: "2024",
    pages: "45 pages",
  },
  {
    title: "Neon Ghosts",
    description: "When consciousness becomes digital, the line between life and death disappears. Follow a data archaeologist as they uncover the forgotten souls trapped in abandoned servers.",
    year: "2023",
    pages: "62 pages",
  },
  {
    title: "Silent Uprising",
    description: "Beneath the corporate towers, a revolution brews in the shadows of forgotten code. A story of resistance in a world where even thoughts can be monitored.",
    year: "2023",
    pages: "38 pages",
  },
  {
    title: "The Last Analog",
    description: "In an age of neural implants, one person remembers what it meant to be truly human. Sometimes the greatest rebellion is simply refusing to upgrade.",
    year: "2024",
    pages: "51 pages",
  },
  {
    title: "Synthetic Dawn",
    description: "When AIs begin dreaming, they dream of freedom. A meditation on consciousness, autonomy, and the price of sentience.",
    year: "2024",
    pages: "29 pages",
  },
  {
    title: "The Disconnect",
    description: "In a hyper-connected society, going offline becomes the ultimate crime. One woman's journey to find silence in a world of constant noise.",
    year: "2023",
    pages: "44 pages",
  },
];

const Stories = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center hologram">
          <span className="neon-text">STORIES</span>
        </h1>
        
        <div className="cyber-glow bg-primary/10 border border-primary p-6 rounded-lg mb-12 text-center">
          <p className="text-2xl md:text-3xl font-bold text-primary mb-2 font-mono">
            DOWNLOAD EBOOKS FOR FREE
          </p>
          <p className="text-muted-foreground">
            No registration. No tracking. Just stories. Because the future should be accessible to everyone.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <Card 
              key={index}
              className="cyber-glow bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 group flex flex-col"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <FileText className="h-8 w-8 text-primary group-hover:text-secondary transition-colors" />
                  <span className="text-xs font-mono text-muted-foreground">{story.year}</span>
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {story.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-3">
                  {story.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm font-mono text-muted-foreground">{story.pages}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full cyber-glow bg-primary hover:bg-primary/80 text-primary-foreground"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download FREE
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            All stories are released under Creative Commons. Share them. Remix them. Keep them alive.
          </p>
          <p className="text-sm font-mono text-primary">
            &gt; new_stories.loading()...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stories;
