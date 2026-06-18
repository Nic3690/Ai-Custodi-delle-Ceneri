import { Button } from "@/components/ui/button";
import { Download, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHeader } from "@/components/PageHeader";

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
  <div className="group flex flex-col">
    <div className="bg-muted overflow-hidden relative">
      {story.image ? (
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="aspect-[2/3] w-full flex items-center justify-center text-muted-foreground font-mono text-sm">
          // in arrivo
        </div>
      )}
      <span
        className="absolute top-3 right-3 text-xs font-mono px-2 py-1 bg-background/70"
        style={{ color: "#fe4a00" }}
      >
        Free Download
      </span>
    </div>

    <div className="mt-4 flex-1 flex flex-col">
      <h3 className="text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors">
        {story.title}
      </h3>

      <div className="mt-2 space-y-1 text-xs font-mono text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span>Anno di stesura: {story.annoStesura}</span>
          <Popover>
            <PopoverTrigger>
              <Info className="h-3 w-3 text-muted-foreground hover:text-foreground cursor-help" />
            </PopoverTrigger>
            <PopoverContent className="max-w-xs text-xs">
              Per rispettare l'evoluzione stilistica e le previsioni dell'autore,
              si è scelto di esplicitare anche l'anno di stesura dei racconti.
            </PopoverContent>
          </Popover>
        </div>
        <p>Prima edizione: {story.primaEdizione}</p>
        <p>{story.pages}</p>
      </div>

      <div className="mt-5">
        {story.pdf ? (
          <Button
            asChild
            variant="outline"
            className="border-border hover:border-primary hover:text-primary"
          >
            <a href={story.pdf} download={story.downloadFilename}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        ) : (
          <Button disabled variant="outline">
            <Download className="mr-2 h-4 w-4" />
            In arrivo
          </Button>
        )}
      </div>
    </div>
  </div>
);

const Stories = () => (
  <div className="pb-24 md:pb-32 relative z-[1]">
    <PageHeader
      kicker="01 — E-Book"
      title="E-Book"
      intro="Racconti scaricabili liberamente. Ogni frammento, un preludio."
    />

    <div className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16">
        {stories.map((story, index) => (
          <ScrollReveal key={index}>
            <StoryCard story={story} />
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-24 md:mt-32 pt-10 border-t border-border/40 text-center">
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Racconto e illustrazioni sono condivisi secondo i termini della licenza
          Creative Commons CC BY-NC-ND 4.0.
        </p>
      </div>
    </div>
  </div>
);

export default Stories;
