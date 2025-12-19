import GradientText from "@/components/text/GradientText";
import Typewriter from "@/components/text/Typewriter";

// Typing speed in ms per character
const TYPING_SPEED = 15;
// Buffer between paragraphs in ms
const BUFFER = 1200;

// Calculate delay based on when previous text finishes
const calcDelay = (prevDelay: number, prevTextLength: number): number => {
  return prevDelay + (prevTextLength * TYPING_SPEED) + BUFFER;
};

// Text content
const texts = {
  t1: "L'Autore",
  t2: "Naq Evius è il nome iniziatico di Alessio Salvati. Autore di narrativa e musica, nasce a Roma nel 1988. Da sempre affascinato dall'arte, affonda le radici in contesti gremiti di creatività fin dall'adolescenza, arrivando a inquadrare al meglio il proprio estro nella maturità.",
  t3: "Nel mezzo della crisi di mezza età decide che le sue idee non possono restare in un cassetto e torna a esercitare sia musica che scrittura, puntando sull'autoproduzione e la diffusione delle sue opere sfruttando qualcosa che prima non aveva: i social network e nuovi capaci collaboratori.",
  t4: "Il Progetto",
  t5: "Ai Custodi delle Ceneri è una saga Sci-Fi di ampio respiro, contaminata da vari sottogeneri e stili. Corale, pulp, moderna, con un worldbuilding dettagliato e realistico. L'elaborazione dell'universo narrativo ha richiesto più di vent'anni di tentativi e riscritture,",
  t6: "fino ad arrivare alla forma attuale. Tutti i racconti sono collegati da dettagli più o meno nascosti e tutti fungono da preludio a qualcosa di più grande.",
  t7a: `"C'è vita su Marte? Nel 2088 la risposta era un secco `,
  t7b: "bù",
  t7c: `, cioè 'no' in cinese."`,
  t7d: "— La grande pesca",
  t8a: `"Si ricordò che era venuto fin lì non per vedere ciò che già sapeva, ma per andare oltre."`,
  t8b: "— La grande pesca",
};

// Calculate sequential delays
const d1 = 300;
const d2 = calcDelay(d1, texts.t1.length);
const d3 = calcDelay(d2, texts.t2.length);
const d4 = calcDelay(d3, texts.t3.length);
const d5 = calcDelay(d4, texts.t4.length);
const d6 = calcDelay(d5, texts.t5.length);
const d7a = calcDelay(d6, texts.t6.length);
const d7b = d7a + (texts.t7a.length * TYPING_SPEED);
const d7c = d7b + (texts.t7b.length * TYPING_SPEED);
const d7d = d7c + (texts.t7c.length * TYPING_SPEED) + 300;
const d8a = calcDelay(d7d, texts.t7d.length);
const d8b = d8a + (texts.t8a.length * TYPING_SPEED) + 300;

const Bio = () => {
  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <GradientText
            className="text-5xl md:text-8xl font-bold mb-12 uppercase tracking-widest"
            colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
            animationSpeed={6}
            style={{ fontFamily: "'Equinox', sans-serif" }}
          >
            BIOGRAFIA
          </GradientText>
        </div>

        <p className="text-sm md:text-base leading-relaxed mb-14 text-card-foreground text-center data-line">
          <Typewriter text={texts.t1} delay={d1} />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:mb-14 text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter text={texts.t2} delay={d2} />
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter text={texts.t3} delay={d3} />
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base leading-relaxed mb-14 text-center" style={{ color: '#ff5657' }}>
          <Typewriter text={texts.t4} delay={d4} />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter text={texts.t5} delay={d5} />
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter text={texts.t6} delay={d6} />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 pt-14 text-left">
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter text={texts.t7a} delay={d7a} className="italic" />
              <Typewriter text={texts.t7b} delay={d7b} />
              <Typewriter text={texts.t7c} delay={d7c} className="italic" />
            </p>
            <p className="text-xs text-card-foreground text-right">
              <Typewriter text={texts.t7d} delay={d7d} />
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm md:text-base leading-snug text-muted-foreground italic">
              <Typewriter text={texts.t8a} delay={d8a} />
            </p>
            <p className="text-xs text-card-foreground text-right">
              <Typewriter text={texts.t8b} delay={d8b} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
