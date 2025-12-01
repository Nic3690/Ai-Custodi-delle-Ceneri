import { Link } from "react-router-dom";
import LiquidEther from "@/components/backgrounds/LiquidEther";
import GradientText from "@/components/text/GradientText";
import Typewriter from "@/components/text/Typewriter";

const Home = () => {
  return (
    <div className="relative min-h-full flex items-center justify-center overflow-hidden">
      {/* Liquid Ether Background */}
      <div className="absolute inset-0">
        <LiquidEther
          colors={["#326266", "#23babd", "#b7e2e5"]}
          mouseForce={35}
          cursorSize={200}
          resolution={0.7}
          autoIntensity={3.5}
          autoSpeed={0.8}
          isViscous={true}
          viscous={20}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <GradientText
            className="text-5xl md:text-8xl font-bold mb-12 uppercase tracking-widest"
            colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
            animationSpeed={6}
            style={{ fontFamily: "'Equinox', sans-serif" }}
          >
            AI CUSTODI DELLE CENERI
          </GradientText>
        </div>

        <div className="max-w-5xl mx-auto px-8">
          <p className="text-sm md:text-base leading-relaxed mb-14 text-card-foreground text-center data-line">
            <Typewriter text="Questa è una storia costruita per frammenti." delay={300} />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-14 text-left">
            <div className="space-y-6">
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                <Typewriter
                  text="La storia dell'umanità nell'arco di più di due secoli. Da oggi al XXIII secolo. Ogni frammento è un racconto, ogni racconto è ambientato in un tempo e in un luogo diverso."
                  delay={1200}
                />
              </p>

              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                <Typewriter
                  text="Cambiamento climatico, guerre per le risorse, migrazioni di massa e altri disastri spingeranno i popoli verso i poli del pianeta, ma soprattutto verso l'orbita terrestre, la luna e infine Marte."
                  delay={4500}
                />
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                <Typewriter
                  text="Ma aimè non si può scappare da se stessi, e l'umanità porta via con sé l'egoismo e le paure che l'hanno sempre accompagnata, e forse sempre lo faranno."
                  delay={8000}
                />
              </p>

              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                <Typewriter
                  text="Così le colonie spaziali crescono avidamente e si arricchiscono a discapito del pianeta, fino a rendersi indipendenti e metterlo in scacco. Un nuovo equilibrio sembra essersi stabilito dopo una crisi che sembrava senza fine."
                  delay={11000}
                />
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-card-foreground text-center coords mb-12">
            <Typewriter text="Finché…" delay={15000} />
          </p>

          <Link to="/stories" className="text-2xl tracking-wide font-mono blink-cursor text-center hover:opacity-80 transition-opacity" style={{ color: '#ff5657' }}>
            Scopri gli E-Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
