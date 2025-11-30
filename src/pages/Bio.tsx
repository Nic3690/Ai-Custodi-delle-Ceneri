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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base leading-relaxed mb-14 text-center" style={{ color: '#ff5657' }}>
          Il Progetto
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-14 text-left">
          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>

            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
            </p>

            <p className="text-sm md:text-base leading-snug text-muted-foreground">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.
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
