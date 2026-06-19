import { useEffect, useState } from "react";

interface InitCounterProps {
  duration?: number;
  className?: string;
}

/** Counts 0 → 100% on mount, like a sci-fi initialization sequence. */
export const InitCounter = ({ duration = 1200, className = "" }: InitCounterProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return <span className={className}>{String(value).padStart(3, "0")}%</span>;
};
