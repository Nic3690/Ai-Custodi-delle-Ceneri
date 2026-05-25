import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import GradientText from "@/components/text/GradientText";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
import { artworks, countTavole } from "@/data/artworks";

function revealStyle(progress: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  return {
    opacity: t,
    transform: `translateY(${30 * (1 - t)}px)`,
  };
}

function ScrollReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ opacity: 0, transform: "translateY(40px)" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const scrollEl = el.closest("main") || window;
    let rafId: number | null = null;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = scrollEl === window
        ? window.innerHeight
        : (scrollEl as HTMLElement).clientHeight;

      const entry = rect.top / viewportH;
      const progress = Math.max(0, Math.min(1, (1 - entry) / 0.5));

      setStyle({
        opacity: progress,
        transform: `translateY(${40 * (1 - progress)}px)`,
      });
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
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
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
          {storyArt.pieces.length} {storyArt.pieces.length === 1 ? "collaborazione" : "collaborazioni"}
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
    <div className="opacity-70 cursor-not-allowed">
      {card}
    </div>
  );
};

const DesktopGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [subtitleStyle, setSubtitleStyle] = useState<React.CSSProperties>({ opacity: 0, transform: "translateY(30px)" });
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

      setSubtitleStyle(revealStyle(p, 0, 0.15));
      setCardsStyle(revealStyle(p, 0.1, 0.4));
      setFooterStyle(revealStyle(p, 0.4, 0.6));
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
    <div ref={containerRef} style={{ height: "125vh" }}>
      <div className="sticky top-0 h-screen-safe flex flex-col justify-center pt-16 bg-background px-6">
        <div className="max-w-6xl mx-auto w-full">
          <p className="text-center text-muted-foreground mb-12 text-lg" style={subtitleStyle}>
            Interpretazioni visive ispirate agli scritti della saga.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6" style={cardsStyle}>
            {artworks.map((storyArt) => (
              <GalleryCard key={storyArt.slug} storyArt={storyArt} />
            ))}
          </div>

          <div className="mt-16 text-center" style={footerStyle}>
            <p className="text-lg text-card-foreground mb-4">
              Vuoi contribuire con le tue opere?
            </p>
            <Link to="/contacts" className="hover:opacity-80 transition-opacity" style={{ color: "#ff5657" }}>
              Contattami per collaborare
            </Link>
          </div>
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
      <Link to="/contacts" className="hover:opacity-80 transition-opacity" style={{ color: "#ff5657" }}>
        Contattami per collaborare
      </Link>
    </div>
  </div>
);

const Gallery = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <ScrollIndicator />

      <div className="pt-8 md:pt-12 pb-4 text-center animate-fade-in-up">
        <GradientText
          className="text-3xl sm:text-4xl md:text-7xl font-bold uppercase tracking-widest"
          colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
          animationSpeed={6}
          style={{ fontFamily: "'Equinox', sans-serif" }}
        >
          GALLERIA
        </GradientText>
      </div>

      {isMobile ? <MobileGallery /> : <DesktopGallery />}
    </div>
  );
};

export default Gallery;
