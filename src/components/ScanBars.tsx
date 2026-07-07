interface ScanBarsProps {
  count?: number;
  /** When set (0–1), shows a static bar filled to this fraction instead of the
   *  sweeping pulse — the leading bars stay lit, the rest dim. */
  fill?: number;
  className?: string;
}

/** Sci-fi loading bars |||||||| — a bright pulse sweeps left to right, or a
 *  static fill level when `fill` is provided. */
export const ScanBars = ({ count = 14, fill, className = "" }: ScanBarsProps) => {
  const lit = fill == null ? -1 : Math.round(count * fill);
  return (
    <span className={`scan-bars ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) =>
        fill == null ? (
          <i key={i} style={{ animationDelay: `${i * 0.07}s` }} />
        ) : (
          <i key={i} style={{ animation: "none", opacity: i < lit ? 1 : 0.2 }} />
        )
      )}
    </span>
  );
};
