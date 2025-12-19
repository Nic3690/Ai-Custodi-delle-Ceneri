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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:mb-14 text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter
                text="Naq Evius è il nome iniziatico di Alessio Salvati. Autore di narrativa e musica, nasce a Roma nel 1988. Da sempre affascinato dall'arte, affonda le radici in contesti gremiti di creatività fin dall'adolescenza, arrivando a inquadrare al meglio il proprio estro nella maturità."
                delay={500}
              />
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter
                text="Nel mezzo della crisi di mezza età decide che le sue idee non possono restare in un cassetto e torna a esercitare sia musica che scrittura, puntando sull'autoproduzione e la diffusione delle sue opere sfruttando qualcosa che prima non aveva: i social network e nuovi capaci collaboratori."
                delay={4800}
              />
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base leading-relaxed mb-14 text-center" style={{ color: '#ff5657' }}>
          <Typewriter text="Il Progetto" delay={9300} />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter
                text="Ai Custodi delle Ceneri è una saga Sci-Fi di ampio respiro, contaminata da vari sottogeneri e stili. Corale, pulp, moderna, con un worldbuilding dettagliato e realistico. L'elaborazione dell'universo narrativo ha richiesto più di vent'anni di tentativi e riscritture,"
                delay={9500}
              />
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter
                text="fino ad arrivare alla forma attuale. Tutti i racconti sono collegati da dettagli più o meno nascosti e tutti fungono da preludio a qualcosa di più grande."
                delay={13700}
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 pt-14 text-left">
          <div className="space-y-4">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              <Typewriter
                text={`"C'è vita su Marte? Nel 2088 la risposta era un secco `}
                delay={16200}
                className="italic"
              />
              <Typewriter
                text="bù"
                delay={17010}
              />
              <Typewriter
                text={`, cioè 'no' in cinese."`}
                delay={17040}
                className="italic"
              />
            </p>
            <p className="text-xs text-card-foreground text-right">
              <Typewriter text="— La grande pesca" delay={17400} />
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm md:text-base leading-snug text-muted-foreground italic">
              <Typewriter
                text={`"Si ricordò che era venuto fin lì non per vedere ciò che già sapeva, ma per andare oltre."`}
                delay={17700}
              />
            </p>
            <p className="text-xs text-card-foreground text-right">
              <Typewriter text="— La grande pesca" delay={19100} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
