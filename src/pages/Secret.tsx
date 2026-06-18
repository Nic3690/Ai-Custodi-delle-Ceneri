import { Lock } from "lucide-react";
import Typewriter from "@/components/text/Typewriter";
import { useIsMobile } from "@/hooks/use-mobile";

const Secret = () => {
  const isMobile = useIsMobile();
  return (
    <div className="min-h-full flex items-center justify-center px-6 md:px-10 lg:px-16 py-20 relative z-[1]">
      <div className="max-w-2xl w-full">
        <Lock
          className="h-12 w-12 mb-8 icon-glitch"
          style={{ color: "#fe4a00" }}
        />

        <p
          className="font-mono text-xs tracking-[0.3em] mb-5"
          style={{ color: "#fe4a00" }}
        >
          [RICHIESTA RESPINTA]
        </p>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground mb-10">
          <Typewriter text="Accesso negato" delay={300} eager={isMobile} />
        </h1>

        <div
          className="border-l-2 pl-6 space-y-4"
          style={{ borderColor: "#fe4a00" }}
        >
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            <Typewriter
              text="Qualcosa di più grande sta arrivando."
              delay={1000}
              eager={isMobile}
            />
          </p>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            <Typewriter
              text="Non una storia. Non un avvertimento. Un mondo completo."
              delay={2500}
              eager={isMobile}
            />
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "#fe4a00" }}>
            <Typewriter
              text="Un romanzo che renderà i racconti frammenti di una realtà più grande..."
              delay={4500}
              eager={isMobile}
            />
          </p>
        </div>

        <div className="mt-12 space-y-2">
          <p className="font-mono text-sm text-primary">
            <Typewriter text="STATUS: CLASSIFICATO" delay={7000} eager={isMobile} />
          </p>
          <p className="font-mono text-xs text-muted-foreground">
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
