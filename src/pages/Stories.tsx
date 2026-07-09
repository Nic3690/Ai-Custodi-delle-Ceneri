import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { ScrollRuler } from "@/components/ScrollRuler";
import { RulerAxis } from "@/components/RulerAxis";
import { MouseCoords } from "@/components/MouseCoords";
import { Timestamp } from "@/components/Timestamp";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

interface Story {
  title: string;
  description: string;
  annoStesura: string;
  primaEdizione: string;
  pages: string;
  image: string | null;
  pdf: string | null;
  downloadFilename?: string;
  epub?: string | null;
  epubFilename?: string;
}

// Registra il download su Microsoft Clarity (evento filtrabile + tag titolo e formato)
const trackDownload = (story: Story, format: "pdf" | "epub") => {
  if (typeof window.clarity !== "function") return;
  window.clarity("event", "ebook_download");
  window.clarity("set", "ebook", story.title);
  window.clarity("set", "format", format);
};

// Pulsanti di download: PDF ed EPUB affiancati, oppure "In arrivo" se non disponibili.
const DownloadButtons = ({ story }: { story: Story }) => {
  if (!story.pdf) {
    return (
      <span className="inline-flex items-center gap-2 border border-border text-muted-foreground px-5 py-2.5 text-xs md:text-sm tracking-[0.2em] uppercase">
        <Download className="h-4 w-4" />
        In arrivo
      </span>
    );
  }
  const btn =
    "pointer-events-auto inline-flex items-center gap-2 border border-accent text-accent px-5 py-2.5 text-xs md:text-sm tracking-[0.2em] uppercase transition-colors hover:bg-accent hover:text-background";
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={`${story.pdf}?v=3`}
        download={story.downloadFilename}
        onClick={() => trackDownload(story, "pdf")}
        className={btn}
      >
        <Download className="h-4 w-4" />
        PDF
      </a>
      {story.epub && (
        <a
          href={`${story.epub}?v=3`}
          download={story.epubFilename}
          onClick={() => trackDownload(story, "epub")}
          className={btn}
        >
          <Download className="h-4 w-4" />
          EPUB
        </a>
      )}
    </div>
  );
};

const stories: Story[] = [
  {
    title: "La grande pesca",
    description: `"Si ricordò che era venuto fin lì non per vedere ciò che già sapeva, ma per andare oltre."`,
    annoStesura: "2022",
    primaEdizione: "2026",
    pages: "27 pagine",
    image: "/images/la_grande_pesca.jpg",
    pdf: "/ebooks/la-grande-pesca.pdf",
    downloadFilename: "La Grande Pesca - Naq Evius.pdf",
    epub: "/ebooks/la-grande-pesca.epub",
    epubFilename: "La Grande Pesca - Naq Evius.epub",
  },
  {
    title: "La Stazione del Ritorno",
    description: `"«Cosa vedi intorno a te, adesso?» Bisogna trascinarlo via dai vecchi ricordi, il signor Gamper, altrimenti si perderà."`,
    annoStesura: "2022",
    primaEdizione: "2026",
    pages: "25 pagine",
    image: "/images/la_stazione_del_ritorno.jpg",
    pdf: "/ebooks/la-stazione-del-ritorno.pdf",
    downloadFilename: "La Stazione del Ritorno - Naq Evius.pdf",
    epub: "/ebooks/la-stazione-del-ritorno.epub",
    epubFilename: "La Stazione del Ritorno - Naq Evius.epub",
  },
  {
    title: "Efren tra i lupi",
    description: "",
    annoStesura: "—",
    primaEdizione: "—",
    pages: "—",
    image: null,
    pdf: null,
  },
];

const Stories = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [percent, setPercent] = useState(0);
  const [active, setActive] = useState(0);
  const lastPct = useRef(0);
  const lastActive = useRef(0);

  useEffect(() => {
    const scroller = rootRef.current?.closest("main");
    if (!scroller) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = scroller.scrollHeight - scroller.clientHeight;
      const p = max > 0 ? Math.round((scroller.scrollTop / max) * 100) : 0;
      if (p !== lastPct.current) {
        lastPct.current = p;
        setPercent(p);
      }
      const vc = window.innerHeight / 2;
      let best = 0;
      let bestD = Infinity;
      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - vc);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best !== lastActive.current) {
        lastActive.current = best;
        setActive(best);
      }
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

  const cur = stories[active];

  return (
    <div ref={rootRef} className="relative w-full pb-24 md:pb-0">
      {/* HUD */}
      <ScrollRuler percent={percent} />
      <RulerAxis />
      <MouseCoords />
      <Timestamp />

      {/* Vertical grid lines, like the homepage */}
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-1/4 -translate-x-1/2 w-px bg-foreground/15 z-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-[58%] w-px bg-foreground/15 z-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)",
        }}
      />

      {/* Fixed right side: active e-book's quote + info (changes on scroll) */}
      <div className="hidden md:flex fixed left-[58%] right-8 top-0 h-full z-[1] items-center pl-10 pointer-events-none">
        <div
          key={active}
          className="max-w-sm w-full h-[62vh] flex flex-col animate-fade-in-up"
        >
          {/* top: title + metadata + download */}
          <div>
            <h3 className="text-2xl md:text-3xl font-medium uppercase text-foreground">
              {cur.title}
            </h3>

            <div className="mt-4 font-mono text-[10px] md:text-xs text-muted-foreground space-y-1">
              <p>{cur.pages}</p>
              <p>Anno di stesura — {cur.annoStesura}</p>
              <p>Prima edizione — {cur.primaEdizione}</p>
            </div>

            <div className="mt-7">
              <DownloadButtons story={cur} />
            </div>
          </div>

          {/* bottom: quote */}
          <p className="mt-auto text-xl md:text-2xl leading-snug italic text-muted-foreground">
            {cur.description}
          </p>
        </div>
      </div>

      {/* E-books: scroll vertically on the left, one at a time */}
      <div className="md:w-1/2 relative z-[1]">
        {stories.map((story, i) => (
          <section
            key={i}
            className={
              i < stories.length - 1
                ? "md:h-[130vh] border-b border-border/40"
                : "md:h-screen"
            }
          >
            <div
              ref={(el) => (sectionRefs.current[i] = el)}
              className="md:sticky md:top-0 md:h-screen flex flex-col md:flex-row items-center md:justify-center gap-8 px-6 md:px-10 py-16 md:py-0"
            >
            <div className="w-full max-w-sm md:w-auto md:max-w-none flex gap-4 md:gap-6 md:shrink-0">
              {/* number — desktop only */}
              <span className="hidden md:block font-mono text-xs text-muted-foreground pt-1 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* cover */}
              <div className="w-full md:w-auto bg-muted overflow-hidden">
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-auto md:h-[62vh] md:w-auto block"
                  />
                ) : (
                  <div className="w-full md:w-auto aspect-[2/3] md:h-[62vh] flex items-center justify-center text-xs text-muted-foreground">
                    in arrivo
                  </div>
                )}
              </div>
            </div>

            {/* Mobile-only info (desktop uses the fixed right column) */}
            <div className="md:hidden w-full max-w-sm text-left">
              <h3 className="text-2xl font-medium uppercase text-foreground">
                {story.title}
              </h3>
              <div className="mt-4 font-mono text-[10px] text-muted-foreground space-y-1 text-left">
                <p>{story.pages}</p>
                <p>Anno di stesura — {story.annoStesura}</p>
                <p>Prima edizione — {story.primaEdizione}</p>
              </div>
              <div className="mt-6 text-left">
                <DownloadButtons story={story} />
              </div>
              <p className="mt-6 text-center text-lg leading-snug italic text-muted-foreground">
                {story.description}
              </p>
            </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Stories;
