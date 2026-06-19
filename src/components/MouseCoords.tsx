import { useEffect, useState } from "react";

/** Live mouse coordinates readout (HUD telemetry), bottom-left. */
export const MouseCoords = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPos({ x: clientX, y: clientY });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-3 left-5 md:left-8 z-20 font-mono text-[10px] md:text-xs tracking-widest text-foreground/70">
      X {String(pos.x).padStart(4, "0")} · Y {String(pos.y).padStart(4, "0")}
    </div>
  );
};
