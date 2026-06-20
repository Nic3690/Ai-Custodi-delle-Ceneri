import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  COOKIE_SETTINGS_EVENT,
  getConsent,
  setConsent,
  type Consent,
} from "@/lib/consent";

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
    const open = () => setVisible(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  if (!visible) return null;

  const choose = (value: Consent) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Preferenze cookie"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">
          Questo sito usa cookie tecnici necessari e, <strong className="text-foreground font-medium">solo previo
          tuo consenso</strong>, strumenti di analisi (Google Analytics e Microsoft
          Clarity) per capire come viene usato il sito.{" "}
          <Link
            to="/cookie-policy"
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            Cookie Policy
          </Link>{" "}
          ·{" "}
          <Link
            to="/privacy-policy"
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            Privacy Policy
          </Link>
        </p>

        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="flex-1 md:flex-none border border-border text-foreground/80 px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-colors hover:bg-foreground/5"
          >
            Rifiuta
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="flex-1 md:flex-none border border-accent bg-accent text-background px-5 py-2.5 text-xs tracking-[0.15em] uppercase transition-opacity hover:opacity-90"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
};
