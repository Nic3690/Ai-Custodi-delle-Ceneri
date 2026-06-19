interface ScanBarsProps {
  count?: number;
  className?: string;
}

/** Sci-fi loading bars |||||||| — a bright pulse sweeps left to right. */
export const ScanBars = ({ count = 14, className = "" }: ScanBarsProps) => (
  <span className={`scan-bars ${className}`} aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <i key={i} style={{ animationDelay: `${i * 0.07}s` }} />
    ))}
  </span>
);
