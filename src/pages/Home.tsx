import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import GradientText from "@/components/text/GradientText";
import Typewriter from "@/components/text/Typewriter";
import { useIsMobile } from "@/hooks/use-mobile";

const LiquidEther = lazy(() => import("@/components/backgrounds/LiquidEther"));

// Typing speed in ms per character
const TYPING_SPEED = 15;
// Buffer between paragraphs in ms
const BUFFER = 800;

// Calculate delay based on when previous text finishes
const calcDelay = (prevDelay: number, prevTextLength: number): number => {
  return prevDelay + (prevTextLength * TYPING_SPEED) + BUFFER;
};

// Text content
const texts = {
  t1: "Questa è una storia costruita per frammenti.",
  t2: "La storia dell'umanità nell'arco di più di due secoli. Da oggi al XXIII secolo. Ogni frammento è un racconto, ogni racconto è ambientato in un tempo e in un luogo diverso.",
  t3: "Cambiamento climatico, guerre per le risorse, migrazioni di massa e altri disastri spingeranno i popoli verso i poli del pianeta, ma soprattutto verso l'orbita terrestre, la luna e infine Marte.",
  t4: "Ma aimè non si può scappare da se stessi, e l'umanità porta via con sé l'egoismo e le paure che l'hanno sempre accompagnata, e forse sempre lo faranno.",
  t5: "Così le colonie spaziali crescono avidamente e si arricchiscono a discapito del pianeta, fino a rendersi indipendenti e metterlo in scacco. Un nuovo equilibrio sembra essersi stabilito dopo una crisi che sembrava senza fine.",
  t6: "Finché…",
};

// Calculate sequential delays
const d1 = 300;
const d2 = calcDelay(d1, texts.t1.length);
const d3 = calcDelay(d2, texts.t2.length);
const d4 = calcDelay(d3, texts.t3.length);
const d5 = calcDelay(d4, texts.t4.length);
const d6 = calcDelay(d5, texts.t5.length);

const Home = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative min-h-full flex items-center justify-center overflow-hidden">
      {/* Liquid Ether Background - hidden on mobile */}
      {!isMobile && (
        <Suspense fallback={null}>
          <div className="absolute inset-0">
            <LiquidEther
              colors={["#326266", "#23babd", "#b7e2e5"]}
              mouseForce={35}
              cursorSize={200}
              resolution={0.4}
              autoIntensity={3.5}
              autoSpeed={0.8}
              isViscous={false}
              iterationsPoisson={12}
              BFECC={false}
              targetFPS={30}
              className="w-full h-full"
            />
          </div>
        </Suspense>
      )}

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
            <Typewriter text={texts.t1} delay={d1} eager={isMobile} />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mb-14 text-left">
            <div className="space-y-6">
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                <Typewriter text={texts.t2} delay={d2} eager={isMobile} />
              </p>

              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                <Typewriter text={texts.t3} delay={d3} eager={isMobile} />
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                <Typewriter text={texts.t4} delay={d4} eager={isMobile} />
              </p>

              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                <Typewriter text={texts.t5} delay={d5} eager={isMobile} />
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base leading-relaxed text-card-foreground text-center coords mb-12">
            <Typewriter text={texts.t6} delay={d6} eager={isMobile} />
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
