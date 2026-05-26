import { Lock } from "lucide-react";
import GradientText from "@/components/text/GradientText";
import Typewriter from "@/components/text/Typewriter";
import { useIsMobile } from "@/hooks/use-mobile";

const Secret = () => {
  const isMobile = useIsMobile();
  return (
    <div className="h-full overflow-y-auto">
      <div className="min-h-full flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 md:py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 md:mb-12">
              <Lock className="h-24 w-24 mx-auto text-primary mb-6 icon-glitch" />
            </div>

            <GradientText
              className="text-lg sm:text-2xl md:text-4xl font-bold mb-4 md:mb-8 uppercase tracking-widest whitespace-nowrap"
              colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
              animationSpeed={6}
              style={{ fontFamily: "'Bruno Ace SC', sans-serif" }}
            >
              [RICHIESTA RESPINTA]
            </GradientText>

            <div className="p-4 md:p-12 mb-4 md:mb-8">
              <p className="text-xl md:text-2xl text-primary mb-6 md:mb-8">
                <Typewriter text="ACCESSO NEGATO" delay={300} eager={isMobile} />
              </p>

              <div className="border-l-4 pl-6 text-left max-w-2xl mx-auto" style={{ borderColor: '#ff5657' }}>
                <p className="text-lg mb-4" style={{ color: '#b7e2e5' }}>
                  <Typewriter text="Qualcosa di più grande sta arrivando." delay={1000} eager={isMobile} />
                </p>
                <p className="text-lg mb-4" style={{ color: '#b7e2e5' }}>
                  <Typewriter text="Non una storia. Non un avvertimento. Un mondo completo." delay={2500} eager={isMobile} />
                </p>
                <p className="text-lg" style={{ color: '#ff5657' }}>
                  <Typewriter text="Un romanzo che renderà i racconti frammenti di una realtà più grande..." delay={4500} eager={isMobile} />
                </p>
              </div>

              <div className="pt-6 md:pt-12">
                <p className="text-2xl text-primary mb-4">
                  <Typewriter text="STATUS: CLASSIFICATO" delay={7000} eager={isMobile} />
                </p>
                <p className="text-sm text-muted-foreground">
                  <Typewriter text="DATA DI RILASCIO: DA DEFINIRE" delay={8500} eager={isMobile} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secret;
