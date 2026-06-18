import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import logoTitle from "@/assets/logo-title.png";

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

const DESKTOP = {
  VIDEO_FORWARD_END: 0.22,
  TITLE_START: 0.19,
  TITLE_SOLID: 0.25,
  TEXT_ZONE_START: 0.28,
  TEXT_ZONE_END: 0.68,
  CTA_START: 0.70,
  CTA_SOLID: 0.76,
  SNAP_ANIM_BASE: 500,
  SNAP_ANIM_RATE: 2200,
};

const MOBILE = {
  VIDEO_FORWARD_END: 0.10,
  TITLE_START: 0.08,
  TITLE_SOLID: 0.12,
  TEXT_ZONE_START: 0.15,
  TEXT_ZONE_END: 0.70,
  CTA_START: 0.73,
  CTA_SOLID: 0.80,
  SNAP_ANIM_BASE: 450,
  SNAP_ANIM_RATE: 2000,
};

function getTextStyle(
  progress: number,
  index: number,
  total: number,
  zoneStart: number,
  zoneEnd: number
) {
  const windowSize = (zoneEnd - zoneStart) / total;
  const start = zoneStart + index * windowSize;
  const fadeInStart = start - windowSize * 0.25;
  const fadeInEnd = start + windowSize * 0.45;
  const fadeOutStart = start + windowSize * 0.6;
  const end = start + windowSize;

  const TRAVEL = 100;

  let opacity = 0;
  let y = -TRAVEL;

  if (progress < fadeInStart) {
    opacity = 0;
    y = -TRAVEL;
  } else if (progress < fadeInEnd) {
    const t = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
    opacity = t;
    y = -TRAVEL * (1 - t);
  } else if (progress < fadeOutStart) {
    opacity = 1;
    y = 0;
  } else if (progress < end) {
    const t = (progress - fadeOutStart) / (end - fadeOutStart);
    opacity = 1 - t;
    y = TRAVEL * t;
  } else {
    opacity = 0;
    y = TRAVEL;
  }

  return { opacity, transform: `translateY(${y}px)` };
}

function buildSnapPoints(cfg: typeof DESKTOP): number[] {
  const points: number[] = [0];
  points.push(cfg.TITLE_SOLID);

  const windowSize =
    (cfg.TEXT_ZONE_END - cfg.TEXT_ZONE_START) / textBlocks.length;
  for (let i = 0; i < textBlocks.length; i++) {
    const start = cfg.TEXT_ZONE_START + i * windowSize;
    points.push(start + windowSize * 0.475);
  }

  points.push(cfg.CTA_SOLID);
  return points;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const COOLDOWN_MS = 150;
const WHEEL_THRESHOLD = 30;
const TOUCH_THRESHOLD = 50;

const Home = () => {
  const isMobile = useIsMobile();
  const cfg = isMobile ? MOBILE : DESKTOP;
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameIdx = useRef(-1);
  const smoothProgress = useRef(0);

  const snapPointsRef = useRef(buildSnapPoints(cfg));
  const currentSnap = useRef(0);
  const isAnimating = useRef(false);
  const animStartTime = useRef(0);
  const animFrom = useRef(0);
  const animTo = useRef(0);
  const cooldownUntil = useRef(0);

  const [titleOpacity, setTitleOpacity] = useState(0);
  const [textStyles, setTextStyles] = useState(
    textBlocks.map(() => ({ opacity: 0, transform: "translateY(30px)" }))
  );
  const [ctaOpacity, setCtaOpacity] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const [arrowOpacity, setArrowOpacity] = useState(1);

  const frameCount = isMobile ? FRAME_COUNT_MOBILE : FRAME_COUNT_DESKTOP;
  const framePath = isMobile
    ? "/images/luna-frames-mobile"
    : "/images/luna-frames";

  useEffect(() => {
    snapPointsRef.current = buildSnapPoints(cfg);
    const p = smoothProgress.current;
    let closest = 0;
    let minDist = Infinity;
    snapPointsRef.current.forEach((sp, i) => {
      const d = Math.abs(sp - p);
      if (d < minDist) {
        minDist = d;
        closest = i;
      }
    });
    currentSnap.current = closest;
  }, [cfg]);

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

  const goToSnap = useCallback((index: number) => {
    const points = snapPointsRef.current;
    if (index < 0 || index >= points.length) return;
    if (index === currentSnap.current && !isAnimating.current) return;

    currentSnap.current = index;
    isAnimating.current = true;
    animFrom.current = smoothProgress.current;
    animTo.current = points[index];
    animStartTime.current = performance.now();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      if (performance.now() < cooldownUntil.current) return;
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;

      if (e.deltaY > 0) goToSnap(currentSnap.current + 1);
      else goToSnap(currentSnap.current - 1);
    };

    let touchStartY = 0;
    let touchHandled = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchHandled = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchHandled || isAnimating.current) {
        e.preventDefault();
        return;
      }
      if (performance.now() < cooldownUntil.current) {
        e.preventDefault();
        return;
      }

      const dy = touchStartY - e.touches[0].clientY;
      if (Math.abs(dy) > TOUCH_THRESHOLD) {
        e.preventDefault();
        touchHandled = true;
        if (dy > 0) goToSnap(currentSnap.current + 1);
        else goToSnap(currentSnap.current - 1);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [goToSnap]);

  useEffect(() => {
    let animId: number;
    let running = true;

    const tick = () => {
      if (!running) return;
      const c = cfgRef.current;

      if (isAnimating.current) {
        const elapsed = performance.now() - animStartTime.current;
        const distance = Math.abs(animTo.current - animFrom.current);
        const duration = c.SNAP_ANIM_BASE + distance * c.SNAP_ANIM_RATE;
        const t = Math.min(1, elapsed / duration);
        smoothProgress.current =
          animFrom.current +
          (animTo.current - animFrom.current) * easeInOutCubic(t);

        if (t >= 1) {
          isAnimating.current = false;
          smoothProgress.current = animTo.current;

          cooldownUntil.current = performance.now() + COOLDOWN_MS;
        }
      }

      const p = smoothProgress.current;
      const fc = framesRef.current.length || 1;

      let frameIndex: number;
      if (p <= c.VIDEO_FORWARD_END) {
        const vp = p / c.VIDEO_FORWARD_END;
        frameIndex = Math.min(fc - 1, Math.floor(vp * (fc - 1)));
      } else {
        frameIndex = fc - 1;
      }
      drawFrame(frameIndex);

      if (p >= c.TITLE_START && p < c.TEXT_ZONE_START) {
        const t = Math.min(
          1,
          (p - c.TITLE_START) / (c.TITLE_SOLID - c.TITLE_START)
        );
        setTitleOpacity(t * t * t);
      } else if (p >= c.TEXT_ZONE_START && p < c.TEXT_ZONE_START + 0.02) {
        const t = 1 - (p - c.TEXT_ZONE_START) / 0.02;
        setTitleOpacity(Math.max(0, t));
      } else {
        setTitleOpacity(0);
      }

      // Scroll-down arrow: visible through the intro (video + logo), fades as text begins
      if (p < c.TEXT_ZONE_START) {
        setArrowOpacity(1);
      } else {
        setArrowOpacity(Math.max(0, 1 - (p - c.TEXT_ZONE_START) / 0.02));
      }

      setTextStyles(
        textBlocks.map((_, i) =>
          getTextStyle(
            p,
            i,
            textBlocks.length,
            c.TEXT_ZONE_START,
            c.TEXT_ZONE_END
          )
        )
      );

      if (p >= c.TITLE_SOLID) {
        const t = Math.max(
          0,
          1 - (p - c.TITLE_SOLID) / (c.TEXT_ZONE_START - c.TITLE_SOLID)
        );
        setVideoOpacity(t);
      } else {
        setVideoOpacity(1);
      }

      if (p >= c.CTA_START) {
        const t = Math.min(
          1,
          (p - c.CTA_START) / (c.CTA_SOLID - c.CTA_START)
        );
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
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ overscrollBehavior: "none" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: videoOpacity }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "hsl(0 0% 8% / 0.35)" }}
        />
        {/* Very light tint to bring the video toward the text color */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "hsl(var(--foreground))",
            opacity: 0.08,
            mixBlendMode: "soft-light",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, hsl(0 0% 8%))",
          }}
        />

        {/* Title */}
        <div
          className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none px-4"
          style={{ opacity: titleOpacity }}
        >
          <div className="pb-40 md:pb-36 w-full flex justify-center">
            <div
              role="img"
              aria-label="AI Custodi delle Ceneri"
              className="w-72 h-36 md:w-[36rem] md:h-72 animate-gradient"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #164747, #41b4a0, #7ED4C2, #41b4a0, #164747)",
                backgroundSize: "300% 100%",
                WebkitMaskImage: `url(${logoTitle})`,
                maskImage: `url(${logoTitle})`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          </div>
        </div>

        {/* Scroll-down arrow: scroll cue through the intro */}
        <div
          className="absolute inset-x-0 z-10 flex justify-center pointer-events-none transition-opacity duration-300"
          style={{
            opacity: arrowOpacity,
            bottom: "max(2rem, env(safe-area-inset-bottom, 0px) + 1rem)",
          }}
        >
          <svg
            className="scroll-arrow"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fe4a00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
            <polyline points="6 14 12 20 18 14" opacity="0.5" />
          </svg>
        </div>

        {/* Text blocks */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none pt-24 pb-16 md:pt-32 md:pb-0">
          {textBlocks.map((text, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center px-8"
              style={textStyles[i]}
            >
              <p
                className={`max-w-3xl text-center text-2xl md:text-4xl leading-relaxed text-foreground ${
                  i === textBlocks.length - 1 ? "coords" : ""
                }`}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pb-16 md:pb-0 pointer-events-auto"
          style={{ opacity: ctaOpacity }}
        >
          <Link
            to="/stories"
            className="text-2xl tracking-wide font-mono blink-cursor text-center hover:opacity-80 transition-opacity"
            style={{ color: "#fe4a00" }}
          >
            Scopri gli E-Book
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
