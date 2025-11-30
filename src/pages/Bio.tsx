import GradientText from "@/components/text/GradientText";

const Bio = () => {
  return (
    <div className="container mx-auto px-6 py-12 md:py-32">
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
          L'Autore
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-14 text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              Naq Evius è il nome iniziatico di Alessio Salvati. Autore di narrativa e musica, nasce a Roma nel 1988. Da sempre affascinato dall'arte, prova a farne parte fin dall'adolescenza, con risultati miseri. Nel mezzo della crisi di mezza età decide che le sue idee non possono
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              restare in un cassetto e torna a esercitare sia musica che scrittura, puntando sull'autoproduzione e la diffusione delle sue opere sfruttando qualcosa che prima non aveva: i social network e nuovi capaci collaboratori.
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base leading-relaxed mb-14 text-center" style={{ color: '#ff5657' }}>
          Il Progetto
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-14 text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              Ai Custodi delle Ceneri è una saga Sci-Fi di ampio respiro, contaminata da vari sottogeneri e stili. Corale, pulp, moderna, con un worldbuilding dettagliato e realistico. L'elaborazione dell'universo narrativo ha richiesto più di vent'anni di tentativi e riscritture, fino ad
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              arrivare alla forma attuale. Tutti i racconti sono collegati da dettagli più o meno nascosti e tutti fungono da preludio al romanzo che costituirà il cuore della storia.
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base leading-snug text-card-foreground text-center coords">
          ...in costruzione
        </p>
      </div>
    </div>
  );
};

export default Bio;
