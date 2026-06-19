import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollRuler } from "@/components/ScrollRuler";
import { RulerAxis } from "@/components/RulerAxis";
import { MouseCoords } from "@/components/MouseCoords";
import { Timestamp } from "@/components/Timestamp";
import introImg from "@/assets/intro.jpg";
import logoTitle from "@/assets/logo-title.png";
import scatter1 from "@/assets/scatter-1.jpg";
import scatter2 from "@/assets/scatter-2.jpg";
import scatter3 from "@/assets/scatter-3.jpg";
import scatter4 from "@/assets/scatter-4.jpg";

const textBlocks = [
  "Questa è una storia costruita per frammenti.",
  "La storia dell'umanità nell'arco di più di due secoli. Da domani al XXIII secolo. Ogni frammento è un racconto, ogni racconto è ambientato in un tempo e in un luogo diversi.",
  "Cambiamenti climatici, guerre per le risorse, migrazioni di massa e altri disastri spingono i popoli verso i poli del pianeta, ma soprattutto verso l'orbita terrestre, la Luna e infine Marte.",
  "Ma, ahimè, è impossibile fuggire da se stessi, e l'umanità porta via con sé l'egoismo e le paure che l'hanno sempre accompagnata, e forse sempre lo faranno.",
  "Così le colonie spaziali crescono avidamente e si arricchiscono a discapito del pianeta, fino a rendersi indipendenti e metterlo in scacco. Un nuovo equilibrio sembra essersi stabilito dopo una crisi che sembrava senza fine.",
  "Finché…",
];

const MAX_ZOOM = 2.6;

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

const scatters = [
  { src: scatter1, cls: "ml-[46%]" },
  { src: scatter2, cls: "ml-[26%]" },
  { src: scatter3, cls: "ml-[38%]" },
  { src: scatter4, cls: "ml-[44%] md:ml-[62%]" },
];

// Scattered image: same size, dark overlay, gently grows as you scroll down.
const ScatterImg = ({ src, className }: { src: string; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const scroller = el?.closest("main");
    if (!el || !scroller) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2;
      // 0 when at the bottom of the viewport, 1 near the top → grows as you scroll down
      const p = Math.max(0, Math.min(1, (vh - center) / vh));
      el.style.transform = `scale(${(1 + p * 0.45).toFixed(3)})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`relative z-10 w-40 md:w-56 will-change-transform ${className ?? ""}`}
      style={{ transformOrigin: "center" }}
    >
      <img src={src} alt="" loading="lazy" className="block w-full h-auto" />
      <span className="pointer-events-none absolute inset-0 bg-black/20" />
    </div>
  );
};

const Home = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  const [titleOpacity, setTitleOpacity] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [imgTransform, setImgTransform] = useState("scale(1)");
  const [scrollPercent, setScrollPercent] = useState(0);
  const lastPctRef = useRef(0);

  const textRefs = useRef<(HTMLElement | null)[]>([]);

  const renderWords = (text: string, color: string) =>
    text.split(" ").map((w, j) => (
      <span key={j} className="cw" style={{ color }}>
        {w}{" "}
      </span>
    ));

  // Scroll-driven intro (image zoom + logo + hero fade) and progress
  useEffect(() => {
    const scroller = rootRef.current?.closest("main");
    if (!scroller) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const pinPx = vh; // intro pin lasts ~1 screen of scroll
      const scrollTop = scroller.scrollTop;

      const pPin = clamp01(scrollTop / pinPx);
      const p = smoothstep(0, 1, pPin);
      const s = 1 + p * (MAX_ZOOM - 1);
      // pan the sphere (origin ~54% 46%) toward the center as it zooms
      setImgTransform(`translate(${-4 * p}%, ${4 * p}%) scale(${s})`);
      setTitleOpacity(smoothstep(0.55, 0.98, pPin));

      // Hero scrolls away & fades after the pin; comes back scrolling up
      const away = clamp01((scrollTop - pinPx) / pinPx);
      setHeroOpacity(1 - away);

      const max = scroller.scrollHeight - scroller.clientHeight;
      const pct = max > 0 ? Math.round((scrollTop / max) * 100) : 0;
      if (pct !== lastPctRef.current) {
        lastPctRef.current = pct;
        setScrollPercent(pct);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => onScroll();

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll-linked word-by-word reveal (smooth, no scroll hijack)
  useEffect(() => {
    const scroller = rootRef.current?.closest("main");
    if (!scroller) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const A = vh * 0.85; // start composing when the text is here…
      const B = vh * 0.55; // …fully composed by here (just before center, so end texts complete)
      textRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return;
        const center = r.top + r.height / 2;
        const p = Math.max(0, Math.min(1, (A - center) / (A - B)));
        const words = el.querySelectorAll<HTMLElement>(".cw");
        const n = words.length;
        for (let j = 0; j < n; j++) {
          words[j].style.opacity = String(
            0.2 + 0.8 * Math.max(0, Math.min(1, p * n - j))
          );
        }
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full">
      {/* HUD — fixed, persists across the whole page */}
      <ScrollRuler percent={scrollPercent} />
      <RulerAxis />
      <MouseCoords />
      <Timestamp />

      {/* Intro: pinned planet + logo, then scrolls away */}
      <section className="relative h-[200vh]">
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{ opacity: heroOpacity }}
        >
          <img
            src={introImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
            style={{ transform: imgTransform, transformOrigin: "54% 46%" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "hsl(0 0% 8% / 0.35)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "hsl(var(--foreground))",
              opacity: 0.08,
              mixBlendMode: "soft-light",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-64 md:h-80 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, hsl(var(--background)))",
            }}
          />

          {/* Title logo */}
          <div
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4"
            style={{ opacity: titleOpacity }}
          >
            <div className="w-full flex justify-center">
              <div
                role="img"
                aria-label="AI Custodi delle Ceneri"
                className="w-72 h-36 md:w-[36rem] md:h-72 animate-gradient"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #f2faef, #f2faef, #f2faef, #f2faef, #f2faef)",
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
        </div>
      </section>

      {/* Scattered narrative texts — zig-zag, connected by subtle vertical lines */}
      <div className="relative">
        {/* Connecting lines: left column @25%, right column @75% — masked at the ends */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 left-1/4 -translate-x-1/2 w-px bg-foreground/15"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 bottom-0 left-3/4 -translate-x-1/2 w-px bg-foreground/15"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
          }}
        />

        {textBlocks.slice(0, 5).map((text, i) => {
          const left = i % 2 === 0;
          return (
            <div key={i}>
            <section
              className="relative min-h-[80vh] flex items-center"
            >
              {/* horizontal connector: from the text across to the opposite vertical line */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-1/4 right-1/4 h-px bg-foreground/15"
              />
              <div
                className={`w-3/4 md:w-1/2 flex justify-center px-6 md:px-10 ${
                  left ? "" : "ml-auto"
                }`}
              >
                <div className="relative z-10 bg-background px-4 py-6">
                  <p
                    ref={(el) => (textRefs.current[i] = el)}
                    className={`max-w-md text-2xl md:text-4xl leading-snug ${
                      left ? "text-left" : "text-right"
                    }`}
                  >
                    {renderWords(text, "#f2faef")}
                  </p>
                </div>
              </div>
            </section>
            {scatters[i] && (
              <ScatterImg src={scatters[i].src} className={scatters[i].cls} />
            )}
            </div>
          );
        })}
      </div>

      {/* "Finché…" — centered (index 5) */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="relative z-10 bg-background px-4 py-6">
          <p
            ref={(el) => (textRefs.current[5] = el)}
            className="max-w-2xl text-center text-3xl md:text-5xl leading-snug"
          >
            {renderWords(textBlocks[5], "#f2faef")}
          </p>
        </div>
      </section>

      {/* CTA — centered exactly at the end of the scroll (index 6) */}
      <section className="h-screen flex items-center justify-center px-6">
        <Link
          to="/stories"
          ref={(el) => (textRefs.current[6] = el)}
          className="inline-block text-2xl md:text-3xl tracking-wide uppercase blink-cursor text-center hover:opacity-80 transition-opacity"
          style={{ color: "#fe4a00" }}
        >
          {renderWords("Scopri gli E-Book", "#fe4a00")}
        </Link>
      </section>
    </div>
  );
};

export default Home;
