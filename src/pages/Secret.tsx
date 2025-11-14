import { Lock } from "lucide-react";

const Secret = () => {
  return (
    <div className="relative min-h-full flex items-center justify-center overflow-hidden">
      {/* Intense noise overlay */}
      <div className="absolute inset-0 noise-bg opacity-70 animate-flicker" />
      
      {/* Multiple scan lines for extra glitch */}
      <div className="scan-line" />
      <div className="scan-line" style={{ animationDelay: "2s", animationDuration: "4s" }} />
      <div className="scan-line" style={{ animationDelay: "1s", animationDuration: "5s" }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 animate-flicker">
            <Lock className="h-24 w-24 mx-auto text-primary mb-6 animate-pulse glitch-hover" />
          </div>
          
          <h1 
            className="text-6xl md:text-8xl font-bold mb-8 glitch neon-text animate-flicker"
            data-text="[REDACTED]"
          >
            [REDACTED]
          </h1>
          
          <div className="cyber-glow bg-card/20 backdrop-blur p-8 md:p-12 rounded-lg mb-8 border-2 border-primary animate-distort">
            <div className="space-y-6 font-mono">
              <p className="text-xl md:text-2xl text-primary">
                &gt; ACCESS_DENIED
              </p>
              
              <p className="text-lg text-muted-foreground">
                // FILE: THE_NOVEL.encrypted
              </p>
              
              <div className="border-l-4 border-secondary pl-6 text-left">
                <p className="text-lg text-card-foreground mb-4">
                  Something bigger is coming.
                </p>
                <p className="text-lg text-card-foreground mb-4">
                  Not a story. Not a warning. A complete world.
                </p>
                <p className="text-lg text-secondary">
                  A novel that will make the short stories look like fragments of a larger truth...
                </p>
              </div>
              
              <div className="pt-8">
                <p className="text-2xl text-primary glitch mb-4" data-text="STATUS: CLASSIFIED">
                  STATUS: CLASSIFIED
                </p>
                <p className="text-sm text-muted-foreground">
                  ESTIMATED_RELEASE: [ERROR_404_TIMELINE_NOT_FOUND]
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-muted-foreground font-mono text-sm">
            <p>&gt; authenticating...</p>
            <p>&gt; scanning neural patterns...</p>
            <p>&gt; [PERMISSION_DENIED]</p>
            <p className="text-primary animate-flicker">&gt; try_again.later()_</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secret;
