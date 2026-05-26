import { useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import GradientText from "@/components/text/GradientText";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSnapScroll } from "@/hooks/use-snap-scroll";
import { artworks, countTavole } from "@/data/artworks";
import { ScrollReveal } from "@/components/ScrollReveal";

function revealStyle(progress: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  return {
    opacity: t,
    transform: `translateY(${30 * (1 - t)}px)`,
  };
}

const GalleryCard = ({ storyArt }: { storyArt: typeof artworks[number] }) => {
  const tavoleCount = countTavole(storyArt);
  const hasContent = tavoleCount > 0;

  const card = (
    <Card className="bg-card border-border hover:border-primary transition-all duration-300 group h-full flex flex-col overflow-hidden">
      <div className="aspect-[4/3] bg-muted overflow-hidden relative">
        {storyArt.cover ? (
          <img
            src={storyArt.cover}
            alt={storyArt.story}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-sm">
            // DATI IN ARRIVO
          </div>
        )}
        <span className="absolute top-2 right-2 text-xs font-mono px-2 py-1 bg-background/80 flex items-center gap-1">
          <ImageIcon className="h-3 w-3" />
          {tavoleCount} {tavoleCount === 1 ? "tavola" : "tavole"}
        </span>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
          {storyArt.story}
        </CardTitle>
        <CardDescription>
          {[...new Set(storyArt.pieces.flatMap(p => p.artists.map(a => a.name)))].join(", ")}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        {hasContent ? (
          <span className="inline-flex items-center gap-2 text-primary group-hover:gap-3 transition-all font-mono text-sm">
            Visualizza tavole
            <ArrowRight className="h-4 w-4" />
          </span>
        ) : (
          <span className="text-muted-foreground font-mono text-sm">
            In arrivo
          </span>
        )}
      </CardContent>
    </Card>
  );

  return hasContent ? (
    <Link to={`/gallery/${storyArt.slug}`} className="block">
      {card}
    </Link>
  ) : (
    <div className="opacity-70 cursor-default">
      {card}
    </div>
  );
};

const GALLERY_SNAPS = [0, 0.5, 1.0];

const DesktopGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleStyle, setTitleStyle] = useState<React.CSSProperties>({});
  const [contentStyle, setContentStyle] = useState<React.CSSProperties>({
    opacity: 0,
    transform: "translateY(30px)",
  });

  const snapIndex = useSnapScroll(containerRef, GALLERY_SNAPS, (p) => {
    setTitleStyle(
      p > 0.5 ? { opacity: Math.max(0, 1 - (p - 0.5) / 0.25) } : {}
    );
    setContentStyle(revealStyle(p, 0.5, 1.0));
  }, { freeAfterLast: true, animBase: 500, animRate: 1200 });

  return (
    <div ref={containerRef} className="relative cursor-default">
      <ScrollIndicator visible={snapIndex === 0} />

      {/* Title - absolute overlay, doesn't affect flow */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex items-start justify-center pt-8 pointer-events-none transition-opacity duration-500"
        style={{ height: "calc(100dvh - 5rem)", ...titleStyle }}
      >
        <GradientText
          className="text-3xl sm:text-4xl md:text-7xl font-bold uppercase tracking-widest"
          colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
          animationSpeed={6}
          style={{ fontFamily: "'Equinox', sans-serif" }}
        >
          GALLERIA
        </GradientText>
      </div>

      {/* Content - normal flow, revealed by snap */}
      <div style={contentStyle}>
        <div className="pt-8 md:pt-16 px-6">
          <div className="max-w-6xl mx-auto w-full">
            <p className="text-center text-muted-foreground mb-6 md:mb-12 text-lg">
              Interpretazioni visive ispirate agli scritti della saga.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {artworks.map((storyArt) => (
                <GalleryCard key={storyArt.slug} storyArt={storyArt} />
              ))}
            </div>
          </div>
        </div>

        <div className="py-12 text-center px-6">
          <p className="text-lg text-card-foreground mb-4">
            Vuoi contribuire con le tue opere?
          </p>
          <Link
            to="/contacts"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "#ff5657" }}
          >
            Contattami per collaborare
          </Link>
        </div>
      </div>
    </div>
  );
};

const MobileGallery = () => (
  <div className="px-4 pt-4 pb-16">
    <ScrollReveal>
      <p className="text-center text-muted-foreground mb-8 text-base">
        Interpretazioni visive ispirate agli scritti della saga.
      </p>
    </ScrollReveal>

    <div className="space-y-8">
      {artworks.map((storyArt) => (
        <ScrollReveal key={storyArt.slug}>
          <GalleryCard storyArt={storyArt} />
        </ScrollReveal>
      ))}
    </div>

    <div className="mt-10 text-center">
      <p className="text-lg text-card-foreground mb-4">
        Vuoi contribuire con le tue opere?
      </p>
      <Link
        to="/contacts"
        className="hover:opacity-80 transition-opacity"
        style={{ color: "#ff5657" }}
      >
        Contattami per collaborare
      </Link>
    </div>
  </div>
);

const Gallery = () => <DesktopGallery />;

export default Gallery;
