import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MouseCoords } from "@/components/MouseCoords";
import { Timestamp } from "@/components/Timestamp";

const MASK =
  "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

export const LegalLayout = ({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) => (
  <div className="min-h-full px-5 md:px-8 pt-16 md:pt-20 pb-32 md:pb-40 relative z-[1]">
    <MouseCoords />
    <Timestamp />

    {/* Vertical grid lines, like the rest of the site */}
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

    <article className="max-w-2xl mx-auto">
      <Link
        to="/contacts"
        className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Contatti
      </Link>
      <h1 className="mt-6 text-3xl md:text-4xl font-normal uppercase tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        Ultimo aggiornamento: {updated}
      </p>
      <div className="mt-10 space-y-5 text-sm md:text-base leading-relaxed text-muted-foreground legal-content">
        {children}
      </div>
    </article>
  </div>
);
