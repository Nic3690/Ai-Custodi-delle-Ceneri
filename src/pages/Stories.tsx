import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import GradientText from "@/components/text/GradientText";
import ScrollIndicator from "@/components/ScrollIndicator";

function revealStyle(progress: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  return {
    opacity: t,
    transform: `translateY(${30 * (1 - t)}px)`,
  };
}

interface Story {
  title: string;
  description: string;
  annoStesura: string;
  primaEdizione: string;
  pages: string;
  image: string | null;
  pdf: string | null;
  downloadFilename?: string;
}

const stories: Story[] = [
  {
    title: "La grande pesca",
    description: `"Si ricordò che era venuto fin lì non per vedere ciò che già sapeva, ma per andare oltre."`,
    annoStesura: "2022",
    primaEdizione: "2025",
    pages: "45 pagine",
    image: "/images/la_grande_pesca.png",
    pdf: "/ebooks/la-grande-pesca.pdf",
    downloadFilename: "La Grande Pesca - Naq Evius.pdf",
  },
  {
    title: "La Stazione del Ritorno",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    annoStesura: "—",
    primaEdizione: "—",
    pages: "62 pagine",
    image: null,
    pdf: null,
  },
];

const Stories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardsStyle, setCardsStyle] = useState<React.CSSProperties>({ opacity: 0, transform: "translateY(30px)" });
  const [footerStyle, setFooterStyle] = useState<React.CSSProperties>({ opacity: 0, transform: "translateY(30px)" });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollEl: HTMLElement | Window = container.closest("main") || window;
    let rafId: number | null = null;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const viewportH =
        scrollEl === window
          ? window.innerHeight
          : (scrollEl as HTMLElement).clientHeight;
      const scrollable = container.offsetHeight - viewportH;
      if (scrollable <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));

      setCardsStyle(revealStyle(p, 0, 0.4));
      setFooterStyle(revealStyle(p, 0.4, 0.7));
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div>
      <ScrollIndicator />
      {/* Page title — CSS animation on mount */}
      <div className="pt-8 md:pt-12 pb-4 text-center animate-fade-in-up">
        <GradientText
          className="text-3xl sm:text-4xl md:text-7xl font-bold uppercase tracking-widest"
          colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
          animationSpeed={6}
          style={{ fontFamily: "'Equinox', sans-serif" }}
        >
          E-BOOK
        </GradientText>
      </div>

      {/* Cards — scroll reveal */}
      <div ref={containerRef} style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen-safe flex flex-col justify-start pt-8 bg-background px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={cardsStyle}>
              {stories.map((story, index) => (
                <Card
                  key={index}
                  className="bg-card border-border hover:border-primary transition-all duration-300 group flex flex-col overflow-hidden"
                >
                  <div className="bg-muted overflow-hidden relative">
                    {story.image ? (
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="aspect-[2/3] w-full flex items-center justify-center text-muted-foreground font-mono text-sm">
                        // DATI IN ARRIVO
                      </div>
                    )}
                    <span className="absolute top-2 right-2 text-xs font-mono px-2 py-1 bg-background/80" style={{ color: '#ff5657' }}>
                      Free Download
                    </span>
                  </div>
                  <CardHeader className="py-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors tracking-wider">
                        {story.title}
                      </CardTitle>
                      <FileText className="h-5 w-5 flex-shrink-0" style={{ color: '#ff5657' }} />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-1 py-0">
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
                    <p className="text-xs font-mono text-muted-foreground">{story.pages}</p>
                  </CardContent>
                  <CardFooter className="pt-3">
                    {story.pdf ? (
                      <Button asChild className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                        <a href={story.pdf} download={story.downloadFilename}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    ) : (
                      <Button disabled className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        In arrivo
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center" style={footerStyle}>
              <p className="text-sm text-muted-foreground">
                Racconto e illustrazioni sono condivisi secondo i termini della licenza Creative Commons CC BY-NC-ND 4.0.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
