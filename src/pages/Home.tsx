import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import GradientText from "@/components/text/GradientText";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useIsMobile } from "@/hooks/use-mobile";

const textBlocks = [
  "Questa è una storia costruita per frammenti.",
  "La storia dell'umanità nell'arco di più di due secoli. Da domani al XXIII secolo. Ogni frammento è un racconto, ogni racconto è ambientato in un tempo e in un luogo diversi.",
  "Cambiamenti climatici, guerre per le risorse, migrazioni di massa e altri disastri spingono i popoli verso i poli del pianeta, ma soprattutto verso l'orbita terrestre, la Luna e infine Marte.",
  "Ma, ahimè, è impossibile fuggire da se stessi, e l'umanità porta via con sé l'egoismo e le paure che l'hanno sempre accompagnata, e forse sempre lo faranno.",
  "Così le colonie spaziali crescono avidamente e si arricchiscono a discapito del pianeta, fino a rendersi indipendenti e metterlo in scacco. Un nuovo equilibrio sembra essersi stabilito dopo una crisi che sembrava senza fine.",
  "Finché…",
];

const FRAME_COUNT_DESKTOP = 300;
const FRAME_COUNT_MOBILE = 125;
const LERP_SPEED_DESKTOP = 0.06;
const LERP_SPEED_MOBILE = 0.3;

const DESKTOP = {
  SCROLL_HEIGHT: "1000vh",
  VIDEO_FORWARD_END: 0.22,
  TITLE_START: 0.19,
  TITLE_SOLID: 0.25,
  TEXT_ZONE_START: 0.28,
  TEXT_ZONE_END: 0.68,
  CTA_START: 0.70,
  CTA_SOLID: 0.76,
  VIDEO_REVERSE_START: 0.28,
  VIDEO_REVERSE_END: 0.68,
};

const MOBILE = {
  SCROLL_HEIGHT: "500vh",
  VIDEO_FORWARD_END: 0.08,
  TITLE_START: 0.06,
  TITLE_SOLID: 0.10,
  TEXT_ZONE_START: 0.13,
  TEXT_ZONE_END: 0.55,
  CTA_START: 0.57,
  CTA_SOLID: 0.63,
  VIDEO_REVERSE_START: 0.13,
  VIDEO_REVERSE_END: 0.55,
};

function getTextStyle(progress: number, index: number, total: number, zoneStart: number, zoneEnd: number) {
  const windowSize = (zoneEnd - zoneStart) / total;
  const start = zoneStart + index * windowSize;
  const fadeInEnd = start + windowSize * 0.25;
  const fadeOutStart = start + windowSize * 0.7;
  const end = start + windowSize;

  let opacity = 0;
  let y = 30;

  if (progress < start) {
    opacity = 0;
    y = 30;
  } else if (progress < fadeInEnd) {
    const t = (progress - start) / (fadeInEnd - start);
    opacity = t;
    y = 30 * (1 - t);
  } else if (progress < fadeOutStart) {
    opacity = 1;
    y = 0;
  } else if (progress < end) {
    const t = (progress - fadeOutStart) / (end - fadeOutStart);
    opacity = 1 - t;
    y = -20 * t;
  } else {
    opacity = 0;
    y = -20;
  }

  return {
    opacity,
    transform: `translateY(${y}px)`,
  };
}

const Home = () => {
  const isMobile = useIsMobile();
  const cfg = isMobile ? MOBILE : DESKTOP;
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;
  const isMobileRef = useRef(isMobile);
  isMobileRef.current = isMobile;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameIdx = useRef(-1);
  const smoothProgress = useRef(0);
  const targetProgress = useRef(0);
  const [titleOpacity, setTitleOpacity] = useState(0);
  const [textStyles, setTextStyles] = useState(
    textBlocks.map(() => ({ opacity: 0, transform: "translateY(30px)" }))
  );
  const [ctaOpacity, setCtaOpacity] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(1);

  const frameCount = isMobile ? FRAME_COUNT_MOBILE : FRAME_COUNT_DESKTOP;
  const framePath = isMobile ? "/images/luna-frames-mobile" : "/images/luna-frames";

  useEffect(() => {
    const frames: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${framePath}/${String(i).padStart(4, "0")}.jpg`;
      frames.push(img);
    }
    framesRef.current = frames;
  }, [frameCount, framePath]);

  const drawFrame = useCallback((index: number) => {
    if (index === lastFrameIdx.current) return;
    const canvas = canvasRef.current;
    const frame = framesRef.current[index];
    if (!canvas || !frame || !frame.complete || !frame.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth * dpr;
    const h = canvas.offsetHeight * dpr;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    const scale = Math.max(w / frame.naturalWidth, h / frame.naturalHeight);
    const fw = frame.naturalWidth * scale;
    const fh = frame.naturalHeight * scale;
    ctx.drawImage(frame, (w - fw) / 2, (h - fh) / 2, fw, fh);
    lastFrameIdx.current = index;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollEl: HTMLElement | Window =
      container.closest("main") || window;

    let animId: number;
    let running = true;

    const readScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportH =
        scrollEl === window
          ? window.innerHeight
          : (scrollEl as HTMLElement).clientHeight;
      const scrollable = container.offsetHeight - viewportH;
      if (scrollable <= 0) return 0;
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / scrollable));
    };

    const tick = () => {
      if (!running) return;

      targetProgress.current = readScroll();
      const c = cfgRef.current;
      const mobile = isMobileRef.current;

      const diff = targetProgress.current - smoothProgress.current;
      const lerp = mobile ? LERP_SPEED_MOBILE : LERP_SPEED_DESKTOP;
      smoothProgress.current += diff * lerp;
      if (Math.abs(diff) < 0.0001) {
        smoothProgress.current = targetProgress.current;
      }

      const p = smoothProgress.current;
      const fc = framesRef.current.length || 1;

      let frameIndex: number;
      if (p <= c.VIDEO_FORWARD_END) {
        const vp = p / c.VIDEO_FORWARD_END;
        frameIndex = Math.min(fc - 1, Math.floor(vp * (fc - 1)));
      } else if (p >= c.VIDEO_REVERSE_START && p <= c.VIDEO_REVERSE_END) {
        const rp = (p - c.VIDEO_REVERSE_START) / (c.VIDEO_REVERSE_END - c.VIDEO_REVERSE_START);
        frameIndex = Math.min(fc - 1, Math.floor((1 - rp) * (fc - 1)));
      } else if (p > c.VIDEO_FORWARD_END && p < c.VIDEO_REVERSE_START) {
        frameIndex = fc - 1;
      } else {
        frameIndex = 0;
      }
      drawFrame(frameIndex);

      if (p >= c.TITLE_START && p < c.TEXT_ZONE_START) {
        const t = Math.min(1, (p - c.TITLE_START) / (c.TITLE_SOLID - c.TITLE_START));
        setTitleOpacity(t);
      } else if (p >= c.TEXT_ZONE_START && p < c.TEXT_ZONE_START + 0.04) {
        const t = 1 - (p - c.TEXT_ZONE_START) / 0.04;
        setTitleOpacity(Math.max(0, t));
      } else {
        setTitleOpacity(0);
      }

      const newStyles = textBlocks.map((_, i) =>
        getTextStyle(p, i, textBlocks.length, c.TEXT_ZONE_START, c.TEXT_ZONE_END)
      );
      setTextStyles(newStyles);

      if (p >= c.VIDEO_REVERSE_END) {
        const t = Math.max(0, 1 - (p - c.VIDEO_REVERSE_END) / (c.CTA_START - c.VIDEO_REVERSE_END));
        setVideoOpacity(t);
      } else {
        setVideoOpacity(1);
      }

      if (p >= c.CTA_START) {
        const t = Math.min(1, (p - c.CTA_START) / (c.CTA_SOLID - c.CTA_START));
        setCtaOpacity(t);
      } else {
        setCtaOpacity(0);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
    };
  }, [drawFrame]);

  return (
    <>
    <ScrollIndicator />
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: cfg.SCROLL_HEIGHT }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: videoOpacity }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "hsl(0 0% 8% / 0.35)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(0 0% 8%))",
          }}
        />

        {/* Title */}
        <div
          className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none px-4"
          style={{ opacity: titleOpacity }}
        >
          <div className="pb-40 md:pb-36 w-full text-center">
            <GradientText
              className="text-5xl md:text-8xl font-bold uppercase tracking-widest"
              colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
              animationSpeed={6}
              style={{ fontFamily: "'Equinox', sans-serif" }}
            >
              AI CUSTODI DELLE CENERI
            </GradientText>
          </div>
        </div>

        {/* Text blocks — centered, one at a time */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none pt-24 pb-16 md:pt-32 md:pb-0">
          <div className="max-w-3xl mx-auto px-8 text-center">
            {textBlocks.map((text, i) => (
              <p
                key={i}
                className={`absolute inset-x-0 mx-auto max-w-3xl px-8 text-center ${
                  i === 0
                    ? "text-base md:text-lg leading-relaxed text-card-foreground"
                    : i === textBlocks.length - 1
                    ? "text-base md:text-lg leading-relaxed text-card-foreground coords"
                    : "text-base md:text-lg leading-relaxed text-muted-foreground"
                }`}
                style={textStyles[i]}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto"
          style={{ opacity: ctaOpacity }}
        >
          <Link
            to="/stories"
            className="text-2xl tracking-wide font-mono blink-cursor text-center hover:opacity-80 transition-opacity"
            style={{ color: "#ff5657" }}
          >
            Scopri gli E-Book
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
