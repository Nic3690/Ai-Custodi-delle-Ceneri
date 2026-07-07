import { useEffect, useRef, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { findStoryBySlug, countTavole } from "@/data/artworks";
import { ScrollRuler } from "@/components/ScrollRuler";
import { MouseCoords } from "@/components/MouseCoords";
import { Timestamp } from "@/components/Timestamp";

interface FlatTavola {
  src: string;
  pieceTitle: string;
  pieceIndex: number;
  imageIndex: number;
}

const filename = (src: string): string => {
  const parts = src.split("/");
  return parts[parts.length - 1] || "tavola";
};

const MASK =
  "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

const StoryGallery = () => {
  const { slug } = useParams<{ slug: string }>();
  const story = findStoryBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [percent, setPercent] = useState(0);
  const lastPct = useRef(0);
  const stripRef = useRef<HTMLDivElement>(null);

  // Wheel -> horizontal scroll, and track horizontal scroll progress
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? Math.round((el.scrollLeft / max) * 100) : 0;
      if (p !== lastPct.current) {
        lastPct.current = p;
        setPercent(p);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [slug]);

  if (!story) {
    return <Navigate to="/gallery" replace />;
  }

  const flat: FlatTavola[] = story.pieces.flatMap((piece, pieceIndex) =>
    piece.images.map((src, imageIndex) => ({
      src,
      pieceTitle: piece.title,
      pieceIndex,
      imageIndex,
    }))
  );

  const total = countTavole(story);
  const quote = story.pieces.map((p) => p.title).find(Boolean);

  const artists: { name: string; link: string }[] = [];
  const seen = new Set<string>();
  story.pieces.forEach((p) =>
    p.artists.forEach((a) => {
      if (!seen.has(a.name)) {
        seen.add(a.name);
        artists.push(a);
      }
    })
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevTavola = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + flat.length) % flat.length));
  const nextTavola = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % flat.length));

  const current = lightboxIndex !== null ? flat[lightboxIndex] : null;

  return (
    <div className="h-full flex flex-col relative pt-14 md:pt-16 pb-14">
      {/* HUD: horizontal progress bar + bottom readouts */}
      <ScrollRuler percent={percent} horizontal />
      <MouseCoords />
      <Timestamp />

      {/* Vertical grid lines, like the homepage */}
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-1/4 -translate-x-1/2 w-px bg-foreground/15 -z-10"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-3/4 -translate-x-1/2 w-px bg-foreground/15 -z-10"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      />

      {/* top: back + count */}
      <div className="shrink-0 px-5 md:px-8 flex items-center justify-between">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-accent hover:opacity-80 transition-colors text-xs tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna alla galleria
        </Link>
        <span className="font-mono text-[10px] md:text-xs text-muted-foreground">
          {total} {total === 1 ? "tavola" : "tavole"}
        </span>
      </div>

      {/* centered title */}
      <h1 className="shrink-0 mt-10 md:mt-4 text-center font-light text-base md:text-lg tracking-wide uppercase text-foreground">
        {story.story}
      </h1>

      {/* gallery block: caption stuck above the images, centered as a group */}
      <div className="flex-1 min-h-0 flex flex-col justify-center gap-3">
        {/* quote (left) + artists (right) — 50/50 on mobile */}
        <div className="shrink-0 mt-8 md:mt-0 px-5 md:px-8 flex items-start justify-between gap-4 md:gap-8">
        <div className="w-1/2 md:w-auto md:max-w-xs">
          {quote && (
            <p className="text-sm italic text-muted-foreground">«{quote}»</p>
          )}
          <p className="mt-1 font-mono text-[10px] text-muted-foreground/70">
            CC BY-NC-ND 4.0
          </p>
        </div>
        <div className="w-1/2 md:w-auto flex flex-col items-end gap-1 text-right">
          {artists.map((artist, i) => (
            <a
              key={i}
              href={artist.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent hover:opacity-80 transition-colors"
            >
              {artist.name}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      </div>

      {/* horizontal strip of tavole */}
      {total === 0 ? (
        <div className="shrink-0 text-center text-muted-foreground">
          // dati in arrivo
        </div>
      ) : (
        <div
          ref={stripRef}
          data-lenis-prevent
          className="no-scrollbar shrink-0 min-h-0 flex items-center overflow-x-auto px-5 md:px-8"
        >
          {flat.map((tavola, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openLightbox(i)}
              className="group h-[52vh] aspect-[16/9] shrink-0 overflow-hidden bg-muted"
              aria-label={`Apri tavola ${i + 1}`}
            >
              <img
                src={tavola.src}
                alt={`${story.story} - tavola ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
      </div>

      {/* Lightbox */}
      <Dialog
        open={lightboxIndex !== null}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent className="max-w-[95vw] xl:max-w-[88vw] p-0 bg-background border-primary/50 [&>button]:hidden">
          {current && (
            <div className="relative">
              <img
                src={current.src}
                alt={current.pieceTitle}
                className="w-full max-h-[88vh] object-contain bg-background"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="bg-background/80 hover:bg-primary hover:text-primary-foreground"
                >
                  <a
                    href={current.src}
                    download={filename(current.src)}
                    aria-label="Scarica tavola"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={closeLightbox}
                  className="bg-background/80 hover:bg-primary hover:text-primary-foreground"
                  aria-label="Chiudi"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {flat.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={prevTavola}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-primary hover:text-primary-foreground"
                    aria-label="Tavola precedente"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={nextTavola}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-primary hover:text-primary-foreground"
                    aria-label="Tavola successiva"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  {current.pieceTitle} · {lightboxIndex! + 1} / {flat.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoryGallery;
