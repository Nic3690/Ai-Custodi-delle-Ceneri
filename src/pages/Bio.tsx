const Bio = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center hologram">
          <span className="neon-text">BIO</span>
        </h1>
        
        <div className="space-y-8">
          {/* Author Name Section */}
          <div className="cyber-glow bg-card p-8 md:p-12 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary font-mono">
              NAQ_EVIUS.exe
            </h2>
            <p className="text-lg leading-relaxed text-card-foreground mb-4">
              Naq Evius is not just a name—it's a signal broadcast from the margins 
              of a collapsing world. Behind the pen name exists a writer who chronicles 
              the slow decay of our present and the violent birth of possible futures.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The stories you'll find here aren't escapism. They're warnings, predictions, 
              and sometimes—if we're lucky—blueprints for survival.
            </p>
          </div>

          {/* Intentions Section */}
          <div className="cyber-glow bg-card p-8 md:p-12 rounded-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-secondary font-mono">
              THE_PROJECT
            </h2>
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-card-foreground">
                <span className="text-primary font-mono">&gt;</span> An anthology of short stories exploring 
                fragmented realities and technological dystopias
              </p>
              <p className="text-card-foreground">
                <span className="text-primary font-mono">&gt;</span> A long-form novel in development—something 
                bigger, darker, more complete
              </p>
              <p className="text-card-foreground">
                <span className="text-primary font-mono">&gt;</span> All freely available because knowledge 
                shouldn't be paywalled when the future is at stake
              </p>
            </div>
          </div>

          {/* Publisher Bio */}
          <div className="cyber-glow bg-card p-8 md:p-12 rounded-lg border-l-4 border-primary">
            <h3 className="text-xl font-bold mb-4 text-primary font-mono">
              // OFFICIAL_BIO
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground italic">
              Naq Evius writes science fiction and dystopian literature that examines 
              the intersection of technology, power, and human consciousness. With a 
              focus on near-future scenarios and societal collapse, their work has been 
              submitted to various publishers while building a direct connection with 
              readers through freely distributed digital content.
            </p>
          </div>

          {/* Call to action */}
          <div className="text-center pt-8">
            <p className="text-xl font-mono text-primary animate-flicker">
              &gt; MORE_STORIES.loading()...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
