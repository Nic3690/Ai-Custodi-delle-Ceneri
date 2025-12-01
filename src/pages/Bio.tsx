import GradientText from "@/components/text/GradientText";
import Typewriter from "@/components/text/Typewriter";

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
          <Typewriter text="L'Autore" delay={300} />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-14 text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter
                text="Naq Evius è il nome iniziatico di Alessio Salvati. Autore di narrativa e musica, nasce a Roma nel 1988. Da sempre affascinato dall'arte, prova a farne parte fin dall'adolescenza, con risultati miseri. Nel mezzo della crisi di mezza età decide che le sue idee non possono"
                delay={700}
              />
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter
                text="restare in un cassetto e torna a esercitare sia musica che scrittura, puntando sull'autoproduzione e la diffusione delle sue opere sfruttando qualcosa che prima non aveva: i social network e nuovi capaci collaboratori."
                delay={5000}
              />
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base leading-relaxed mb-14 text-center" style={{ color: '#ff5657' }}>
          <Typewriter text="Il Progetto" delay={9000} />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-14 text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter
                text="Ai Custodi delle Ceneri è una saga Sci-Fi di ampio respiro, contaminata da vari sottogeneri e stili. Corale, pulp, moderna, con un worldbuilding dettagliato e realistico. L'elaborazione dell'universo narrativo ha richiesto più di vent'anni di tentativi e riscritture, fino ad"
                delay={9500}
              />
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter
                text="arrivare alla forma attuale. Tutti i racconti sono collegati da dettagli più o meno nascosti e tutti fungono da preludio al romanzo che costituirà il cuore della storia."
                delay={14000}
              />
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base leading-snug text-card-foreground text-center coords">
          <Typewriter text="...in costruzione" delay={17000} />
        </p>
      </div>
    </div>
  );
};

export default Bio;
