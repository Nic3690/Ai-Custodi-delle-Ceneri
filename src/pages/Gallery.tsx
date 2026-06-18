import { ArrowRight, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { artworks, countTavole } from "@/data/artworks";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PageHeader } from "@/components/PageHeader";

const GalleryCard = ({ storyArt }: { storyArt: typeof artworks[number] }) => {
  const tavoleCount = countTavole(storyArt);
  const hasContent = tavoleCount > 0;
  const artists = [
    ...new Set(storyArt.pieces.flatMap((p) => p.artists.map((a) => a.name))),
  ].join(", ");

  const inner = (
    <div className="group">
      <div className="aspect-[4/3] bg-muted overflow-hidden relative">
        {storyArt.cover ? (
          <img
            src={storyArt.cover}
            alt={storyArt.story}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-sm">
            // dati in arrivo
          </div>
        )}
        <span className="absolute top-3 right-3 text-xs font-mono px-2 py-1 bg-background/70 flex items-center gap-1 text-muted-foreground">
          <ImageIcon className="h-3 w-3" />
          {tavoleCount}
        </span>
      </div>

      <div className="mt-4">
        <h3 className="text-lg md:text-xl font-medium text-foreground group-hover:text-primary transition-colors">
          {storyArt.story}
        </h3>
        {artists && (
          <p className="mt-1 text-sm text-muted-foreground">{artists}</p>
        )}
        {hasContent ? (
          <span
            className="mt-3 inline-flex items-center gap-2 text-sm font-mono transition-all group-hover:gap-3"
            style={{ color: "#fe4a00" }}
          >
            Visualizza tavole
            <ArrowRight className="h-4 w-4" />
          </span>
        ) : (
          <span className="mt-3 inline-block text-sm font-mono text-muted-foreground">
            In arrivo
          </span>
        )}
      </div>
    </div>
  );

  return hasContent ? (
    <Link to={`/gallery/${storyArt.slug}`} className="block">
      {inner}
    </Link>
  ) : (
    <div className="opacity-60 cursor-default">{inner}</div>
  );
};

const Gallery = () => (
  <div className="pb-24 md:pb-32 relative z-[1]">
    <PageHeader
      kicker="02 — Galleria"
      title="Galleria"
      intro="Interpretazioni visive ispirate agli scritti della saga."
    />

    <div className="max-w-6xl mx-auto w-full px-6 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16">
        {artworks.map((storyArt) => (
          <ScrollReveal key={storyArt.slug}>
            <GalleryCard storyArt={storyArt} />
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-24 md:mt-32 pt-10 border-t border-border/40 text-center">
        <p className="text-base md:text-lg text-muted-foreground mb-3">
          Vuoi contribuire con le tue opere?
        </p>
        <Link
          to="/contacts"
          className="hover:opacity-80 transition-opacity"
          style={{ color: "#fe4a00" }}
        >
          Contattami per collaborare
        </Link>
      </div>
    </div>
  </div>
);

export default Gallery;
