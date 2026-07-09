import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  Youtube,
  Mail,
} from "lucide-react";
import { ScrollRuler } from "@/components/ScrollRuler";
import { RulerAxis } from "@/components/RulerAxis";
import { MouseCoords } from "@/components/MouseCoords";
import { Timestamp } from "@/components/Timestamp";

type SocialPlatform =
  | "instagram"
  | "facebook"
  | "twitter"
  | "website"
  | "youtube"
  | "email"
  | "artstation"
  | "behance";

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

type IconComponent = React.ComponentType<{ className?: string }>;

const ArtstationIcon: IconComponent = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-2.871L17.084 1.917A2.43 2.43 0 0 0 14.92.581h-3.787l12.331 21.353 2.515-4.355c.241-.43.247-.872.021-1.728zm-10.84.971l-3.32-5.748-3.32 5.748h6.64z" />
  </svg>
);

const BehanceIcon: IconComponent = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M7.799 5.698c.589 0 1.12.051 1.606.156.484.102.9.273 1.248.507.343.235.612.55.804.938.187.392.281.871.281 1.443 0 .619-.141 1.137-.421 1.551-.284.413-.7.751-1.255 1.014.756.218 1.317.6 1.689 1.146.374.546.557 1.205.557 1.975 0 .622-.12 1.16-.359 1.612a3.123 3.123 0 0 1-.972 1.114c-.41.29-.876.507-1.4.65-.516.143-1.051.214-1.605.214H0V5.698h7.799zm-.394 4.872c.483 0 .881-.114 1.196-.343.312-.229.466-.602.466-1.119 0-.286-.052-.522-.155-.71a1.073 1.073 0 0 0-.423-.434 1.83 1.83 0 0 0-.608-.214 3.829 3.829 0 0 0-.71-.063H3.494v2.883h3.911zm.216 5.121c.265 0 .518-.025.76-.077.243-.052.457-.137.643-.256.186-.12.333-.282.444-.486.108-.205.163-.467.163-.787 0-.628-.176-1.076-.528-1.347-.353-.27-.818-.405-1.398-.405H3.494v3.358h4.127zm9.353-.061c.488.49 1.196.733 2.124.733.665 0 1.236-.171 1.711-.512.476-.343.768-.706.875-1.094h2.971c-.475 1.464-1.207 2.51-2.187 3.144-.985.633-2.169.951-3.548.951-.96 0-1.829-.152-2.604-.46a5.587 5.587 0 0 1-1.97-1.297c-.544-.56-.965-1.226-1.247-2.005-.286-.78-.428-1.633-.428-2.564 0-.901.142-1.738.428-2.515.286-.776.687-1.446 1.208-2.011a5.673 5.673 0 0 1 1.952-1.314c.764-.323 1.611-.484 2.55-.484 1.049 0 1.965.205 2.748.612a5.443 5.443 0 0 1 1.918 1.628c.494.681.852 1.46 1.083 2.34.231.881.314 1.796.249 2.751h-8.974c0 .96.323 1.86.811 2.351zm3.787-6.477c-.42-.471-1.105-.726-1.943-.726-.546 0-1.001.094-1.366.276a2.847 2.847 0 0 0-.886.671c-.225.272-.385.555-.484.866a3.07 3.07 0 0 0-.156.838h5.701c-.085-.864-.349-1.453-.866-1.925zm-2.677-4.135h7.027v1.711h-7.027V4.018z" />
  </svg>
);

const socialIcons: Record<SocialPlatform, IconComponent> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  website: Globe,
  youtube: Youtube,
  email: Mail,
  artstation: ArtstationIcon,
  behance: BehanceIcon,
};

const platformLabels: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "Twitter",
  website: "Website",
  youtube: "YouTube",
  email: "Email",
  artstation: "ArtStation",
  behance: "Behance",
};

const SocialLinks = ({ links }: { links: SocialLink[] }) => {
  if (links.length === 0) {
    return <p className="text-sm text-muted-foreground">// link in arrivo</p>;
  }
  return (
    <div className="flex gap-8">
      {links.map((link, i) => {
        const Icon = socialIcons[link.platform];
        const label = platformLabels[link.platform];
        return (
          <a
            key={i}
            href={link.url}
            target={link.platform === "email" ? undefined : "_blank"}
            rel={link.platform === "email" ? undefined : "noopener noreferrer"}
            className="text-accent hover:opacity-80 transition-colors"
            aria-label={label}
            title={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
};

interface PersonData {
  title: string;
  photo: string | null;
  alt: string;
  objectPosition?: "top" | "center";
  bio: string[];
  socials: SocialLink[];
}

const authorSocials: SocialLink[] = [
  {
    platform: "instagram",
    url: "https://www.instagram.com/ai.custodi.delle.ceneri.saga",
  },
  { platform: "email", url: "mailto:aicustodidelleceneri@gmail.com" },
];

const persons: PersonData[] = [
  {
    title: "L'Autore",
    photo: "/images/bio/alessio.jpg",
    alt: "Alessio Salvati - Naq Evius",
    objectPosition: "top",
    bio: [
      "Naq Evius è il nome iniziatico di Alessio Salvati. Autore di narrativa e musica, nasce a Roma nel 1988. Da sempre affascinato dall'arte, affonda le radici in contesti gremiti di creatività. Ma è solo nella mezza età che trova la strada giusta per arrivare al suo pubblico, sfruttando qualcosa che prima non aveva: i social network e nuovi capaci collaboratori.",
    ],
    socials: authorSocials,
  },
  {
    title: "Walter Pilato",
    photo: "/images/bio/walter.jpg",
    alt: "Walter Pilato",
    bio: [
      "Romano, classe '99, segue una formazione artistica multiforme: passando dalla pittura al graphic design, decide infine di concentrarsi sull'illustrazione per il visual storytelling, nello specifico sulla progettazione e realizzazione di visual narrativi fantascientifici. Dimensione, quest'ultima, in cui trova il pieno della sua espressione artistica e professionale.",
    ],
    socials: [
      { platform: "instagram", url: "https://www.instagram.com/alteriandesign" },
      { platform: "artstation", url: "https://artstation.com/alterian" },
      { platform: "behance", url: "https://www.behance.net/alterian" },
      { platform: "email", url: "mailto:walterpilato02@gmail.com" },
    ],
  },
  {
    title: "Elisa Guglielmi",
    photo: "/images/bio/elisa.jpg",
    alt: "Elisa Guglielmi",
    objectPosition: "top",
    bio: [
      "Classe 1995, si forma principalmente tra la capitale e il nord della Francia. Il percorso di studi universitario in Lingue, Letterature straniere e Traduzione e la successiva specializzazione nei mestieri dell'Editoria e della Grafica editoriale le consentono di approfondire, dal punto di vista teorico e pratico, le discipline che maggiormente stimolano la sua curiosità e i suoi interessi. Dopo diversi anni di professione nella redazione di un'agenzia letteraria, avvia il proprio service CoLibrì servizi editoriali tramite il quale affianca autori e autrici di tutta Italia nella realizzazione, pubblicazione e promozione dei loro libri.",
    ],
    socials: [
      {
        platform: "instagram",
        url: "https://www.instagram.com/colibri_servizieditoriali",
      },
      { platform: "email", url: "mailto:colibriservizieditoriali@gmail.com" },
    ],
  },
];

const texts = {
  t5: "Ai Custodi delle Ceneri è una saga Sci-Fi di ampio respiro, contaminata da vari sottogeneri e stili. Corale, epica, moderna, con un worldbuilding dettagliato e realistico. L'elaborazione dell'universo narrativo",
  t6: "ha richiesto più di vent'anni di tentativi e riscritture, fino ad arrivare alla forma attuale. Tutti i racconti sono collegati da dettagli più o meno nascosti e tutti fungono da preludio a qualcosa di più grande.",
  t7a: `"C'è vita su Marte? Nel 2088 la risposta era un secco `,
  t7b: "bù",
  t7c: `, cioè 'no' in cinese."`,
  t7d: "— La grande pesca",
  t8a: "«Cosa vedi intorno a te, adesso?» Bisogna trascinarlo via dai vecchi ricordi, il signor Gamper, altrimenti si perderà.",
  t8b: "— La stazione del ritorno",
};

const MASK =
  "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

// ─── Bio (E-book base: photos scroll left, info fixed right) ────

const Bio = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [percent, setPercent] = useState(0);
  const [active, setActive] = useState(0);
  const [rightOpacity, setRightOpacity] = useState(1);
  const lastPct = useRef(0);
  const lastActive = useRef(0);
  const lastOp = useRef(1);

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
      const vh = window.innerHeight || 1;
      const vc = vh / 2;
      // active = nearest person section (the project section is handled separately)
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < persons.length; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - vc);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (best !== lastActive.current) {
        lastActive.current = best;
        setActive(best);
      }
      // fade the right column near every transition (between people and into the project):
      // full opacity while the active person's section is centred, fading out toward the edges
      const op = Math.max(0, Math.min(1, (vh * 0.5 - bestD) / (vh * 0.2)));
      const opR = Math.round(op * 100) / 100;
      if (opR !== lastOp.current) {
        lastOp.current = opR;
        setRightOpacity(opR);
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

  const cur = persons[Math.min(active, persons.length - 1)];

  return (
    <div ref={rootRef} className="relative w-full">
      {/* HUD */}
      <ScrollRuler percent={percent} />
      <RulerAxis />
      <MouseCoords />
      <Timestamp />

      {/* Vertical grid lines */}
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-1/4 -translate-x-1/2 w-px bg-foreground/15 z-0"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-[58%] w-px bg-foreground/15 z-0"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      />

      {/* Fixed right: active person's info (hidden on the project section) */}
      {rightOpacity > 0.01 && (
        <div
          className="hidden md:flex fixed left-[58%] right-8 top-0 h-full z-[1] items-center pl-10 pointer-events-none"
          style={{ opacity: rightOpacity }}
        >
          <div key={active} className="max-w-sm w-full">
            <h3
              className="text-2xl md:text-3xl font-medium tracking-wide uppercase"
              style={{ color: "#f2faef" }}
            >
              {cur.title}
            </h3>
            <div className="mt-5 space-y-4">
              {cur.bio.map((paragraph, j) => (
                <p
                  key={j}
                  className="text-base md:text-lg leading-relaxed text-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 pointer-events-auto">
              <SocialLinks links={cur.socials} />
            </div>
          </div>
        </div>
      )}

      {/* Left: person photos, scroll one at a time */}
      <div className="md:w-1/2 relative z-[1]">
        {persons.map((person, i) => (
          <section
            key={i}
            ref={(el) => (sectionRefs.current[i] = el)}
            className="min-h-screen flex flex-col md:flex-row items-center md:justify-center gap-8 px-6 md:px-10 py-16 md:py-0"
          >
            <div className="w-full max-w-sm md:w-auto md:max-w-none flex gap-4 md:gap-6 md:shrink-0">
              <span className="hidden md:block font-mono text-xs text-muted-foreground pt-1 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="w-full md:w-auto aspect-[3/4] md:h-[62vh] overflow-hidden bg-muted">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.alt}
                    className={`w-full h-full object-cover ${
                      person.objectPosition === "top"
                        ? "object-top"
                        : "object-center"
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                    <User className="h-12 w-12 opacity-50" />
                    <span className="text-xs">// foto in arrivo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile-only info (desktop uses the fixed right column) */}
            <div className="md:hidden w-full max-w-sm">
              <h3
                className="text-2xl font-medium tracking-wide uppercase"
                style={{ color: "#f2faef" }}
              >
                {person.title}
              </h3>
              <div className="mt-4 space-y-3">
                {person.bio.map((paragraph, j) => (
                  <p
                    key={j}
                    className="text-base leading-relaxed text-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <SocialLinks links={person.socials} />
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Project — full-width centered */}
      <section
        ref={(el) => (sectionRefs.current[persons.length] = el)}
        className="min-h-screen flex flex-col md:flex-row md:items-center md:justify-between gap-12 md:gap-16 px-10 md:px-20 lg:px-28 pt-24 pb-32 md:py-24 relative z-[1]"
      >
        {/* left: intro */}
        <div className="max-w-2xl space-y-8">
          <p
            className="text-base font-medium tracking-wide"
            style={{ color: "#f2faef" }}
          >
            Il Progetto
          </p>
          <p className="text-2xl md:text-4xl leading-snug text-foreground">
            {texts.t5} {texts.t6}
          </p>
        </div>

        {/* right: quotes, right-aligned, smaller, italic */}
        <div className="md:w-64 lg:w-72 md:shrink-0 space-y-10 text-right">
          <div className="space-y-2">
            <p className="text-base lg:text-lg italic leading-snug text-muted-foreground">
              {texts.t7a}
              <span className="not-italic">{texts.t7b}</span>
              {texts.t7c}
            </p>
            <p className="text-xs text-card-foreground">
              <Link
                to="/stories"
                className="hover:opacity-80 transition-opacity"
                style={{ color: "#fe4a00" }}
              >
                {texts.t7d}
              </Link>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-base lg:text-lg italic leading-snug text-muted-foreground">
              {texts.t8a}
            </p>
            <p className="text-xs text-card-foreground">
              <Link
                to="/stories"
                className="hover:opacity-80 transition-opacity"
                style={{ color: "#fe4a00" }}
              >
                {texts.t8b}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bio;
