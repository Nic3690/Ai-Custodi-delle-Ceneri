import { useRef, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import GradientText from "@/components/text/GradientText";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSnapScroll } from "@/hooks/use-snap-scroll";
import { ScrollReveal } from "@/components/ScrollReveal";

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
    primaEdizione: "2026",
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

const StoryCard = ({ story }: { story: Story }) => (
  <Card className="bg-card border-border hover:border-primary transition-all duration-300 group flex flex-col overflow-hidden">
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
      <span
        className="absolute top-2 right-2 text-xs font-mono px-2 py-1 bg-background/80"
        style={{ color: "#fe4a00" }}
      >
        Free Download
      </span>
    </div>
    <CardHeader className="py-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors tracking-wider">
          {story.title}
        </CardTitle>
        <FileText className="h-5 w-5 flex-shrink-0" style={{ color: "#fe4a00" }} />
      </div>
    </CardHeader>
    <CardContent className="flex-1 space-y-1 py-0">
      <div className="flex items-center gap-1">
        <p className="text-xs font-mono text-muted-foreground">
          Anno di stesura: {story.annoStesura}
        </p>
        <Popover>
          <PopoverTrigger>
            <Info className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-help" />
          </PopoverTrigger>
          <PopoverContent className="max-w-xs text-xs">
            Per rispettare l'evoluzione stilistica e le previsioni dell'autore, si
            è scelto di esplicitare anche l'anno di stesura dei racconti.
          </PopoverContent>
        </Popover>
      </div>
      <p className="text-xs font-mono text-muted-foreground">
        Prima edizione: {story.primaEdizione}
      </p>
      <p className="text-xs font-mono text-muted-foreground">{story.pages}</p>
    </CardContent>
    <CardFooter className="pt-3">
      {story.pdf ? (
        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/80 text-primary-foreground"
        >
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
);

const STORIES_SNAPS = [0, 0.5, 1.0];

const DesktopStories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleStyle, setTitleStyle] = useState<React.CSSProperties>({});
  const [contentStyle, setContentStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: "translateY(30px)",
  });

  const snapIndex = useSnapScroll(containerRef, STORIES_SNAPS, (p) => {
    setTitleStyle(
      p > 0.25 ? { opacity: Math.max(0, 1 - (p - 0.25) / 0.25) } : {}
    );
    setContentStyle(revealStyle(p, 0.5, 1.0));
  }, { freeAfterLast: true });

  return (
    <div ref={containerRef} className="relative cursor-default">
      <ScrollIndicator visible={snapIndex === 0} />

      {/* Title - absolute overlay, doesn't affect flow */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex items-start justify-center pt-8 pointer-events-none transition-opacity duration-500"
        style={{ height: "calc(100dvh - 5rem)", ...titleStyle }}
      >
        <GradientText
          className="text-2xl sm:text-3xl md:text-6xl font-bold uppercase tracking-widest"
          colors={["#164747", "#41b4a0", "#7ED4C2", "#41b4a0", "#164747"]}
          animationSpeed={6}
          style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          E-BOOK
        </GradientText>
      </div>

      {/* Content - normal flow, revealed by snap */}
      <div style={contentStyle}>
        <div className="pt-4 md:pt-8 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {stories.map((story, index) => (
                <StoryCard key={index} story={story} />
              ))}
            </div>
          </div>
        </div>

        <div className="py-8 text-center px-6">
          <p className="text-sm text-muted-foreground">
            Racconto e illustrazioni sono condivisi secondo i termini della
            licenza Creative Commons CC BY-NC-ND 4.0.
          </p>
        </div>
      </div>
    </div>
  );
};

const MobileStories = () => (
  <div className="px-4 pt-4 pb-16">
    <div className="space-y-8">
      {stories.map((story, index) => (
        <ScrollReveal key={index}>
          <StoryCard story={story} />
        </ScrollReveal>
      ))}
    </div>

    <div className="mt-10 text-center">
      <p className="text-sm text-muted-foreground">
        Racconto e illustrazioni sono condivisi secondo i termini della licenza
        Creative Commons CC BY-NC-ND 4.0.
      </p>
    </div>
  </div>
);

const Stories = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return <DesktopStories />;

  return (
    <div>
      <div className="pt-8 pb-4 text-center animate-fade-in-up">
        <GradientText
          className="text-2xl sm:text-3xl font-bold uppercase tracking-widest"
          colors={["#164747", "#41b4a0", "#7ED4C2", "#41b4a0", "#164747"]}
          animationSpeed={6}
          style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          E-BOOK
        </GradientText>
      </div>
      <MobileStories />
    </div>
  );
};

export default Stories;
