import { Lock } from "lucide-react";
import Typewriter from "@/components/text/Typewriter";
import { ScanBars } from "@/components/ScanBars";
import { InitCounter } from "@/components/InitCounter";
import { MouseCoords } from "@/components/MouseCoords";
import { Timestamp } from "@/components/Timestamp";
import { useIsMobile } from "@/hooks/use-mobile";

const MASK =
  "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

const Secret = () => {
  const isMobile = useIsMobile();
  return (
    <div className="min-h-full flex items-center justify-center px-5 md:px-8 py-12 relative z-[1]">
      {/* HUD: bottom readouts */}
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

      <div className="max-w-2xl w-full">
        <Lock
          className="h-12 w-12 mb-8 icon-glitch"
          style={{ color: "#fe4a00" }}
        />

        <div
          className="flex items-center gap-3 mb-5 font-mono text-xs tracking-[0.3em]"
          style={{ color: "#fe4a00" }}
        >
          <span>[RICHIESTA RESPINTA]</span>
          <ScanBars />
          <InitCounter />
        </div>

        <h1 className="text-4xl md:text-6xl font-normal tracking-tight uppercase text-foreground mb-10">
          <Typewriter text="Accesso negato" delay={300} eager={isMobile} />
        </h1>

        <div
          className="border-l-2 pl-6 space-y-4"
          style={{ borderColor: "#fe4a00" }}
        >
          <p className="text-base md:text-lg leading-relaxed text-foreground">
            <Typewriter
              text="Qualcosa di più grande sta arrivando."
              delay={1000}
              eager={isMobile}
            />
          </p>
          <p className="text-base md:text-lg leading-relaxed text-foreground">
            <Typewriter
              text="Non una storia. Non un avvertimento. Un mondo completo."
              delay={2500}
              eager={isMobile}
            />
          </p>
          <p className="text-base md:text-lg leading-relaxed text-foreground">
            <Typewriter
              text="Un romanzo che renderà i racconti frammenti di una realtà più grande..."
              delay={4500}
              eager={isMobile}
            />
          </p>
        </div>

        <div className="mt-12 space-y-2">
          <p className="font-mono text-sm text-foreground">
            <Typewriter text="STATUS: CLASSIFICATO" delay={7000} eager={isMobile} />
          </p>
          <p className="font-mono text-sm text-foreground">
            <Typewriter
              text="DATA DI RILASCIO: DA DEFINIRE"
              delay={8500}
              eager={isMobile}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Secret;
