import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { artworks, countTavole } from "@/data/artworks";
import { ScrollRuler } from "@/components/ScrollRuler";
import { RulerAxis } from "@/components/RulerAxis";
import { MouseCoords } from "@/components/MouseCoords";
import { Timestamp } from "@/components/Timestamp";

const MASK =
  "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

// Irregular vertical offsets, one per cover (cycles if there are more)
const OFFSETS = [
  "md:mt-0",
  "md:mt-44",
  "md:mt-24",
  "md:mt-64",
  "md:mt-12",
  "md:mt-52",
];

const GalleryCard = ({
  storyArt,
  index,
}: {
  storyArt: (typeof artworks)[number];
  index: number;
}) => {
  const tavoleCount = countTavole(storyArt);
  const hasContent = tavoleCount > 0;
  const artists = [
    ...new Set(storyArt.pieces.flatMap((p) => p.artists.map((a) => a.name))),
  ].join(", ");

  const inner = (
    <>
      <div className="aspect-[4/3] bg-muted overflow-hidden relative">
        {storyArt.cover ? (
          <img
            src={storyArt.cover}
            alt={storyArt.story}
            className="w-full h-full object-cover transition-transform ease-out group-hover:scale-125"
            style={{ transitionDuration: "2500ms" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
            // in arrivo
          </div>
        )}
        <span className="absolute top-3 left-3 font-mono text-xs text-foreground/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="text-lg md:text-xl font-light uppercase tracking-wide text-foreground">
          {storyArt.story}
        </h3>
        <span className="font-mono text-[10px] md:text-xs text-muted-foreground whitespace-nowrap">
          {tavoleCount} {tavoleCount === 1 ? "tavola" : "tavole"}
        </span>
      </div>
      {artists && (
        <p className="mt-1 text-sm text-muted-foreground">{artists}</p>
      )}
    </>
  );

  const offset = OFFSETS[index % OFFSETS.length];
  const cls = `group block ${offset}`;

  return hasContent ? (
    <Link to={`/gallery/${storyArt.slug}`} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={`${cls} cursor-default`}>{inner}</div>
  );
};

const Gallery = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const lastPct = useRef(0);

  useEffect(() => {
    const scroller = rootRef.current?.closest("main");
    if (!scroller) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = scroller.scrollHeight - scroller.clientHeight;
      const p = max > 0 ? Math.round((scroller.scrollTop / max) * 100) : 0;
      if (p !== lastPct.current) {
        lastPct.current = p;
        setPercent(p);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full min-h-full">
      {/* HUD */}
      <ScrollRuler percent={percent} />
      <RulerAxis />
      <MouseCoords />
      <Timestamp />

      {/* Vertical grid lines */}
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-1/4 -translate-x-1/2 w-px bg-foreground/15 z-0"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-3/4 -translate-x-1/2 w-px bg-foreground/15 z-0"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      />

      {/* Focus grid: hovered cover enlarges & lights up, the others dim */}
      <div className="relative z-[1] max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-32 md:py-0 md:min-h-screen md:flex md:items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 items-start gap-x-10 gap-y-12 md:gap-x-16 md:gap-y-16">
          {artworks.map((storyArt, i) => (
            <GalleryCard key={storyArt.slug} storyArt={storyArt} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
