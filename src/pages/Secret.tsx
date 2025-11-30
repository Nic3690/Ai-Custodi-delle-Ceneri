import { Lock } from "lucide-react";
import GradientText from "@/components/text/GradientText";

const Secret = () => {
  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Lock className="h-24 w-24 mx-auto text-primary mb-6" />
          </div>

          <GradientText
            className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-widest"
            colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
            animationSpeed={6}
            style={{ fontFamily: "'Equinox', sans-serif" }}
          >
            [REDACTED]
          </GradientText>

          <div className="p-8 md:p-12 mb-8">
            <p className="text-xl md:text-2xl text-primary mb-8">
              ACCESSO NEGATO
            </p>

            <div className="border-l-4 pl-6 text-left max-w-2xl mx-auto" style={{ borderColor: '#ff5657' }}>
              <p className="text-lg text-card-foreground mb-4">
                Qualcosa di più grande sta arrivando.
              </p>
              <p className="text-lg text-card-foreground mb-4">
                Non una storia. Non un avvertimento. Un mondo completo.
              </p>
              <p className="text-lg" style={{ color: '#ff5657' }}>
                Un romanzo che renderà i racconti brevi frammenti di una verità più grande...
              </p>
            </div>

            <div className="pt-12">
              <p className="text-2xl text-primary mb-4">
                STATUS: CLASSIFICATO
              </p>
              <p className="text-sm text-muted-foreground">
                DATA DI RILASCIO: DA DEFINIRE
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secret;
