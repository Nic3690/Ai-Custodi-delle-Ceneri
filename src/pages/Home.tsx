import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  return (
    <div className="relative min-h-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50 animate-distort"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-bg opacity-50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-darker-bg via-transparent to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-8 glitch neon-text animate-flicker"
            data-text="NAQ EVIUS"
          >
            NAQ EVIUS
          </h1>
          
          <div className="cyber-glow bg-card/30 backdrop-blur p-8 md:p-12 rounded-lg mb-8 animate-distort">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 hologram animate-flicker">
              <span className="text-primary neon-text">PREFACE</span>
            </h2>
            
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-card-foreground">
              In the shadow of collapsing civilizations and fractured realities, 
              stories emerge that challenge our perception of what's possible. 
            </p>
            
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Each narrative explores the boundaries between human and machine, 
              freedom and control, truth and manufactured reality. Through dystopian 
              landscapes and speculative futures, these tales ask: What does it mean 
              to be human when humanity itself is being redefined?
            </p>
          </div>
          
          <p className="text-xl text-primary font-mono animate-flicker">
            &gt; WELCOME TO THE EDGE OF TOMORROW_
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
