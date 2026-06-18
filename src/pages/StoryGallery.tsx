import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink, User, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { findStoryBySlug, countTavole } from "@/data/artworks";

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

const StoryGallery = () => {
  const { slug } = useParams<{ slug: string }>();
  const story = findStoryBySlug(slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevTavola = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + flat.length) % flat.length));
  const nextTavola = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % flat.length));

  const current = lightboxIndex !== null ? flat[lightboxIndex] : null;

  return (
    <div className="px-6 md:px-10 lg:px-16 py-12 md:py-20 relative z-[1]">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-10 font-mono text-xs tracking-widest"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna alla galleria
        </Link>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
          {story.story}
        </h1>

        <p className="mt-4 mb-12 md:mb-16 font-mono text-sm text-muted-foreground">
          {total} {total === 1 ? "tavola" : "tavole"} · {story.pieces.length}{" "}
          {story.pieces.length === 1 ? "collaborazione" : "collaborazioni"}
        </p>

        {total === 0 ? (
          <div className="text-center py-16 border border-dashed border-border">
            <p className="text-muted-foreground font-mono">// DATI IN ARRIVO</p>
          </div>
        ) : (
          <div className="space-y-12">
            {story.pieces.map((piece, pieceIndex) => {
              if (piece.images.length === 0) return null;
              return (
                <section key={pieceIndex}>
                  <Card className="bg-card border-border mb-6">
                    <CardHeader>
                      {piece.title && (
                        <p className="text-sm italic text-muted-foreground">{piece.title}</p>
                      )}
                      {piece.description && (
                        <p className="text-sm italic text-muted-foreground">{piece.description}</p>
                      )}
                    </CardHeader>
                    <CardContent>
                      {piece.artists.map((artist, artistIndex) => (
                        <a
                          key={artistIndex}
                          href={artist.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-1 last:mb-0"
                        >
                          <User className="h-4 w-4" />
                          <span>{artist.name}</span>
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {piece.images.map((src, imageIndex) => {
                      const flatIndex = flat.findIndex(
                        (f) => f.pieceIndex === pieceIndex && f.imageIndex === imageIndex
                      );
                      return (
                        <div
                          key={imageIndex}
                          className="group relative bg-muted border border-border hover:border-primary transition-all overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => openLightbox(flatIndex)}
                            className="block w-full aspect-square overflow-hidden"
                            aria-label={`Apri tavola ${imageIndex + 1}`}
                          >
                            <img
                              src={src}
                              alt={`${piece.title} - tavola ${imageIndex + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </button>
                          <a
                            href={src}
                            download={filename(src)}
                            className="absolute bottom-2 right-2 p-2 bg-background/80 hover:bg-primary hover:text-primary-foreground transition-colors"
                            aria-label="Scarica tavola"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            Tavole condivise secondo i termini della licenza Creative Commons CC BY-NC-ND 4.0.
          </p>
        </div>
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-5xl p-0 bg-background border-primary/50 [&>button]:hidden">
          {current && (
            <div className="relative">
              <img
                src={current.src}
                alt={current.pieceTitle}
                className="w-full max-h-[80vh] object-contain bg-black"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  asChild
                  size="icon"
                  variant="ghost"
                  className="bg-background/80 hover:bg-primary hover:text-primary-foreground"
                >
                  <a href={current.src} download={filename(current.src)} aria-label="Scarica tavola">
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
                <p className="font-mono text-sm text-muted-foreground">
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
