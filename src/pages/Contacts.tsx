import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import contactsHero from "@/assets/contacts-hero.jpg";
import { ScrollRuler } from "@/components/ScrollRuler";
import { RulerAxis } from "@/components/RulerAxis";
import { MouseCoords } from "@/components/MouseCoords";
import { Timestamp } from "@/components/Timestamp";

const MASK =
  "linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

type IconProps = { className?: string; style?: CSSProperties };

const MailFilled = ({ className, style }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v.31l-9.75 5.78L2.25 7.06v-.31Z" />
    <path d="M21.75 8.69 12.4 14.23a.75.75 0 0 1-.8 0L2.25 8.69v8.56A2.25 2.25 0 0 0 4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V8.69Z" />
  </svg>
);

const InstagramFilled = ({ className, style }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const contactMethods = [
  {
    icon: MailFilled,
    title: "Email",
    value: "aicustodidelleceneri@gmail.com",
    link: "mailto:aicustodidelleceneri@gmail.com",
    description: "Per richieste, collaborazioni o semplicemente per salutare",
  },
  {
    icon: InstagramFilled,
    title: "Instagram",
    value: "@ai.custodi.delle.ceneri.saga",
    link: "https://www.instagram.com/ai.custodi.delle.ceneri.saga",
    description: "Per news, anteprime, approfondimenti, eventi",
  },
];

const Contacts = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);
  const lastPct = useRef(0);

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
    <div ref={rootRef} className="pb-32 md:pb-40 relative">
      {/* HUD */}
      <ScrollRuler percent={percent} />
      <RulerAxis />
      <MouseCoords />
      <Timestamp />

      {/* Vertical grid lines, like the homepage */}
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-1/4 -translate-x-1/2 w-px bg-foreground/15 -z-10"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none fixed top-0 bottom-0 left-3/4 -translate-x-1/2 w-px bg-foreground/15 -z-10"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      />

      {/* hero image at the very top */}
      <img
        src={contactsHero}
        alt=""
        className="w-full h-[38vh] md:h-auto object-cover object-left block"
      />

      <div className="max-w-6xl mx-auto w-full px-5 md:px-8 pt-12 md:pt-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
          {contactMethods.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <div key={contact.title} className={i === 1 ? "md:w-[28rem]" : ""}>
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-3 w-3" style={{ color: "#fe4a00" }} />
                  <h2 className="text-xl font-medium text-foreground">
                    {contact.title}
                  </h2>
                </div>
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-foreground hover:opacity-80 transition-colors break-words"
                >
                  {contact.value}
                </a>
                <p className="mt-2 text-sm text-muted-foreground">
                  {contact.description}
                </p>
              </div>
            );
          })}
        </div>

        <section className="mt-16 md:mt-20 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12">
          <h2 className="shrink-0 text-2xl md:text-3xl font-light uppercase text-foreground">
            Scrivimi
          </h2>
          <p className="md:max-w-md text-base md:text-lg leading-relaxed text-muted-foreground">
            Tutte le comunicazioni sono benvenute. Che tu sia un lettore,
            artista, editore o semplicemente curioso.
          </p>
        </section>

        <section className="mt-14 md:mt-16 pt-12 border-t border-border/40 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12">
          <h2 className="shrink-0 text-2xl md:text-3xl font-light uppercase text-foreground">
            Sostieni il progetto
          </h2>
          <div className="md:max-w-md">
            <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8">
              Se ti piace quello che faccio, puoi supportare il progetto con una
              donazione libera.
            </p>
            <a
              href="https://paypal.me/naqevius"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="text-base px-7 py-6 hover:opacity-90"
                style={{ backgroundColor: "#fe4a00", color: "#fff" }}
              >
                <Heart className="mr-2 h-5 w-5" />
                Dona con PayPal
              </Button>
            </a>
            <p className="mt-6 text-sm text-muted-foreground">
              Ogni contributo aiuta a mantenere vivo questo universo narrativo.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contacts;
