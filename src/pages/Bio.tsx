import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { User, Instagram, Facebook, Twitter, Globe, Youtube, Mail } from "lucide-react";
import GradientText from "@/components/text/GradientText";
import ScrollIndicator from "@/components/ScrollIndicator";

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
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-2.871L17.084 1.917A2.43 2.43 0 0 0 14.92.581h-3.787l12.331 21.353 2.515-4.355c.241-.43.247-.872.021-1.728zm-10.84.971l-3.32-5.748-3.32 5.748h6.64z" />
  </svg>
);

const BehanceIcon: IconComponent = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
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

const SocialLinks = ({ links, style }: { links: SocialLink[]; style?: React.CSSProperties }) => {
  if (links.length === 0) {
    return (
      <p className="text-xs font-mono text-muted-foreground" style={style}>
        // link in arrivo
      </p>
    );
  }
  return (
    <div className="flex gap-6" style={style}>
      {links.map((link, i) => {
        const Icon = socialIcons[link.platform];
        const label = platformLabels[link.platform];
        return (
          <a
            key={i}
            href={link.url}
            target={link.platform === "email" ? undefined : "_blank"}
            rel={link.platform === "email" ? undefined : "noopener noreferrer"}
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label={label}
            title={label}
          >
            <Icon className="h-7 w-7" />
          </a>
        );
      })}
    </div>
  );
};

const PersonPhoto = ({
  src,
  alt,
  objectPosition = "center",
}: {
  src: string | null;
  alt: string;
  objectPosition?: "top" | "center";
}) => (
  <div className="max-w-sm mx-auto md:max-w-none md:mx-0">
    <div className="aspect-square overflow-hidden border border-border bg-muted rounded-lg">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${objectPosition === "top" ? "object-top" : "object-center"}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
          <User className="h-16 w-16 opacity-50" />
          <span className="font-mono text-sm">// FOTO IN ARRIVO</span>
        </div>
      )}
    </div>
  </div>
);

interface Collaborator {
  name: string;
  photo: string | null;
  bio: string[];
  socials: SocialLink[];
}

function revealStyle(progress: number, start: number, end: number) {
  const t = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  return {
    opacity: t,
    transform: `translateY(${30 * (1 - t)}px)`,
  };
}

interface PersonSectionProps {
  title: string;
  photo: string | null;
  alt: string;
  objectPosition?: "top" | "center";
  socials: SocialLink[];
  bio: string[];
}

const PersonSection = ({
  title,
  photo,
  alt,
  objectPosition,
  socials,
  bio,
}: PersonSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [titleStyle, setTitleStyle] = useState<React.CSSProperties>({ opacity: 0, transform: "translateY(30px)" });
  const [photoStyle, setPhotoStyle] = useState<React.CSSProperties>({ opacity: 0, transform: "translateY(30px)" });
  const [textStyle, setTextStyle] = useState<React.CSSProperties>({ opacity: 0, transform: "translateY(30px)" });
  const [socialsStyle, setSocialsStyle] = useState<React.CSSProperties>({ opacity: 0, transform: "translateY(30px)" });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollEl: HTMLElement | Window = container.closest("main") || window;
    let rafId: number | null = null;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const viewportH =
        scrollEl === window
          ? window.innerHeight
          : (scrollEl as HTMLElement).clientHeight;
      const scrollable = container.offsetHeight - viewportH;
      if (scrollable <= 0) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));

      setTitleStyle(revealStyle(p, 0, 0.15));
      setPhotoStyle(revealStyle(p, 0.12, 0.38));
      setTextStyle(revealStyle(p, 0.38, 0.60));
      setSocialsStyle(revealStyle(p, 0.60, 0.75));
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "250vh" }}>
      <section className="sticky top-0 h-screen-safe flex flex-col justify-center pb-20 bg-background px-6">
        <div className="max-w-5xl mx-auto w-full">

          <p
            className="text-sm md:text-base leading-relaxed mb-10 text-center tracking-widest uppercase"
            style={{ color: "#ff5657", ...titleStyle }}
          >
            {title}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div style={photoStyle}>
              <PersonPhoto src={photo} alt={alt} objectPosition={objectPosition} />
            </div>
            <div className="flex flex-col h-full">
              <div className="space-y-6" style={textStyle}>
                {bio.map((paragraph, i) => (
                  <p key={i} className="text-sm md:text-base leading-snug text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-auto pt-6">
                <SocialLinks links={socials} style={socialsStyle} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const authorSocials: SocialLink[] = [
  { platform: "instagram", url: "https://www.instagram.com/ai.custodi.delle.ceneri.saga" },
  { platform: "email", url: "mailto:aicustodidelleceneri@gmail.com" },
];

const collaborators: Collaborator[] = [
  {
    name: "Walter Pilato",
    photo: "/images/bio/walter.jpg",
    bio: ["Romano, classe '99, segue una formazione artistica multiforme: passando dalla pittura al graphic design, decide infine di concentrarsi sull'illustrazione per il visual storytelling, nello specifico sulla progettazione e realizzazione di visual narrativi fantascientifici. Dimensione, quest'ultima, in cui trova il pieno della sua espressione artistica e professionale."],
    socials: [
      { platform: "instagram", url: "https://www.instagram.com/pil_wal_art" },
      { platform: "artstation", url: "https://artstation.com/alterian" },
      { platform: "behance", url: "#" },
      { platform: "email", url: "mailto:walterpilato02@gmail.com" },
    ],
  },
  {
    name: "Elisa Guglielmi",
    photo: "/images/bio/elisa.jpg",
    bio: ["Classe 1995, si forma principalmente tra la capitale e il nord della Francia. Il percorso di studi universitario in Lingue, Letterature straniere e Traduzione e la successiva specializzazione nei mestieri dell'Editoria e della Grafica editoriale le consentono di approfondire, dal punto di vista teorico e pratico, le discipline che maggiormente stimolano la sua curiosità e i suoi interessi. Dopo diversi anni di professione nella redazione di un'agenzia letteraria, avvia il proprio service CoLibrì servizi editoriali tramite il quale affianca autori e autrici di tutta Italia nella realizzazione, pubblicazione e promozione dei loro libri."],
    socials: [
      { platform: "instagram", url: "https://www.instagram.com/colibri_servizieditoriali" },
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
  t8a: `"Si ricordò che era venuto fin lì non per vedere ciò che già sapeva, ma per andare oltre."`,
  t8b: "— La grande pesca",
};

const Bio = () => {
  return (
    <div>
      <ScrollIndicator />
      {/* Page title — CSS animation on mount */}
      <div className="pt-8 md:pt-12 pb-4 text-center animate-fade-in-up">
        <GradientText
          className="text-3xl sm:text-4xl md:text-7xl font-bold uppercase tracking-widest"
          colors={["#326266", "#23babd", "#b7e2e5", "#23babd", "#326266"]}
          animationSpeed={6}
          style={{ fontFamily: "'Equinox', sans-serif" }}
        >
          BIOGRAFIA
        </GradientText>
      </div>

      <PersonSection
        title="L'Autore"
        photo="/images/bio/alessio.jpg"
        alt="Alessio Salvati - Naq Evius"
        objectPosition="top"
        socials={authorSocials}
        bio={[
          "Naq Evius è il nome iniziatico di Alessio Salvati. Autore di narrativa e musica, nasce a Roma nel 1988. Da sempre affascinato dall'arte, affonda le radici in contesti gremiti di creatività fin dall'adolescenza, arrivando a inquadrare al meglio il proprio estro nella maturità.",
          "Nel mezzo della crisi di mezza età decide che le sue idee non possono restare in un cassetto e torna a esercitare sia musica che scrittura, puntando sull'autoproduzione e la diffusione delle sue opere sfruttando qualcosa che prima non aveva: i social network e nuovi capaci collaboratori.",
        ]}
      />

      {collaborators.map((collab) => (
        <PersonSection
          key={collab.name}
          title={collab.name}
          photo={collab.photo}
          alt={collab.name}
          socials={collab.socials}
          bio={collab.bio}
        />
      ))}

      <div className="container mx-auto px-6 min-h-[100dvh] flex items-center" style={{ minHeight: "100vh" }}>
        <div className="max-w-5xl mx-auto w-full">
          <section className="mb-14">
            <p
              className="text-sm md:text-base leading-relaxed mb-10 text-center tracking-widest uppercase"
              style={{ color: "#ff5657" }}
            >
              Il Progetto
            </p>

            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                {texts.t5} {texts.t6}
              </p>
            </div>
          </section>

          <div className="max-w-4xl mx-auto text-center space-y-12 pt-14">
            <div className="space-y-4">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                <span className="italic">{texts.t7a}</span>
                {texts.t7b}
                <span className="italic">{texts.t7c}</span>
              </p>
              <p className="text-sm text-card-foreground">
                <Link to="/stories" className="hover:opacity-80 transition-opacity" style={{ color: "#ff5657" }}>
                  {texts.t7d}
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground italic">
                {texts.t8a}
              </p>
              <p className="text-sm text-card-foreground">
                <Link to="/stories" className="hover:opacity-80 transition-opacity" style={{ color: "#ff5657" }}>
                  {texts.t8b}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
