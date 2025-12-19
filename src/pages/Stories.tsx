import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import GradientText from "@/components/text/GradientText";

const stories = [
  {
    title: "La grande pesca",
    description: `"Si ricordò che era venuto fin lì non per vedere ciò che già sapeva, ma per andare oltre."`,
    annoStesura: "2022",
    primaEdizione: "2025",
    pages: "45 pagine",
    image: "/images/la_grande_pesca.png",
  },
  {
    title: "Efren tra i lupi",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    annoStesura: "—",
    primaEdizione: "—",
    pages: "62 pagine",
    image: null,
  },
];

const Stories = () => {
  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <GradientText
            className="text-4xl md:text-6xl font-bold uppercase tracking-widest"
            colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
            animationSpeed={6}
            style={{ fontFamily: "'Equinox', sans-serif" }}
          >
            E-BOOK
          </GradientText>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary transition-all duration-300 group flex flex-col overflow-hidden"
            >
              <div className="aspect-[2/3] bg-muted overflow-hidden relative">
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-sm">
                    // IMMAGINE IN ARRIVO
                  </div>
                )}
                <span className="absolute top-2 right-2 text-xs font-mono px-2 py-1 bg-background/80" style={{ color: '#ff5657' }}>
                  Free Download
                </span>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <FileText className="h-5 w-5" style={{ color: '#ff5657' }} />
                </div>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors tracking-wider">
                  {story.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-3">
                  {story.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-1">
                <div className="flex items-center gap-1">
                  <p className="text-xs font-mono text-muted-foreground">Anno di stesura: {story.annoStesura}</p>
                  <Popover>
                    <PopoverTrigger>
                      <Info className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </PopoverTrigger>
                    <PopoverContent className="max-w-xs text-xs">
                      Per rispettare l'evoluzione stilistica e le previsioni dell'autore, si è scelto di esplicitare anche l'anno di stesura dei racconti.
                    </PopoverContent>
                  </Popover>
                </div>
                <p className="text-xs font-mono text-muted-foreground">Prima edizione: {story.primaEdizione}</p>
                <p className="text-sm font-mono text-muted-foreground mt-2">{story.pages}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Racconto e illustrazioni sono condivisi secondo i termini della licenza Creative Commons CC BY-NC-ND 4.0.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stories;
