import { useEffect, useRef, useState, useCallback } from "react";

interface GridLine {
  type: "h" | "v";
  pos: number;
  threshold: number;
  origin: string;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

const FULL_REVEAL_PX = 120;

const GridOverlay = () => {
  const [lines, setLines] = useState<GridLine[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScroll = useRef(-1);

  useEffect(() => {
    const generate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const newLines: GridLine[] = [];
      let seed = 42;

      for (let y = 50; y < h; y += 50) {
        const fromRight = seededRandom(seed++) > 0.5;
        newLines.push({
          type: "h",
          pos: y,
          threshold: seededRandom(seed++) * FULL_REVEAL_PX,
          origin: fromRight ? "right" : "left",
        });
      }
      for (let x = 50; x < w; x += 50) {
        const fromBottom = seededRandom(seed++) > 0.5;
        newLines.push({
          type: "v",
          pos: x,
          threshold: seededRandom(seed++) * FULL_REVEAL_PX,
          origin: fromBottom ? "bottom" : "top",
        });
      }

      setLines(newLines);
    };

    generate();

    let timeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(generate, 300);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timeout);
    };
  }, []);

  const setRef = useCallback((el: HTMLDivElement | null, i: number) => {
    lineRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || lines.length === 0) return;

    let frameId: number;

    const tick = () => {
      frameId = requestAnimationFrame(tick);
      const s = main.scrollTop;
      if (s === lastScroll.current) return;
      lastScroll.current = s;

      for (let i = 0; i < lines.length; i++) {
        const el = lineRefs.current[i];
        if (!el) continue;
        const line = lines[i];
        const isH = line.type === "h";
        const visible = s >= line.threshold;

        el.style.transform = visible
          ? "scale(1)"
          : isH ? "scaleX(0)" : "scaleY(0)";
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [lines]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {lines.map((line, i) => {
        const isH = line.type === "h";
        return (
          <div
            key={i}
            ref={(el) => setRef(el, i)}
            className="absolute"
            style={{
              backgroundColor: "hsl(181 69% 44% / 0.14)",
              transition: "transform 1s ease-out",
              transform: isH ? "scaleX(0)" : "scaleY(0)",
              transformOrigin: line.origin,
              ...(isH
                ? { left: 0, right: 0, top: line.pos, height: 1 }
                : { top: 0, bottom: 0, left: line.pos, width: 1 }),
            }}
          />
        );
      })}
    </div>
  );
};

export default GridOverlay;
